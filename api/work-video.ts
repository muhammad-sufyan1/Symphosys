import { Readable } from 'node:stream';

const DRIVE_ID_PATTERN = /^[A-Za-z0-9_-]{10,}$/;
const RESOLVE_CACHE_TTL_MS = 15 * 60 * 1000;
const PROBE_TIMEOUT_MS = 8000;
const STREAM_TIMEOUT_MS = 25000;
const RANGE_CACHE_CONTROL = 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400';
const FULL_CACHE_CONTROL = 'public, max-age=0, s-maxage=900, stale-while-revalidate=3600';
const PASSTHROUGH_HEADERS = [
  'content-type',
  'content-length',
  'content-range',
  'accept-ranges',
  'etag',
  'last-modified',
];

type CacheEntry = {
  url: string;
  expiresAt: number;
};

const resolvedUrlCache = new Map<string, CacheEntry>();

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

function getQueryValue(value: unknown): string {
  if (Array.isArray(value)) {
    return typeof value[0] === 'string' ? value[0] : '';
  }
  return typeof value === 'string' ? value : '';
}

function decodeHtml(input: string): string {
  return input
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&#39;', "'")
    .replaceAll('&quot;', '"');
}

function buildDefaultDownloadUrl(fileId: string): string {
  const params = new URLSearchParams({
    id: fileId,
    export: 'download',
    confirm: 't',
  });
  return `https://drive.usercontent.google.com/download?${params.toString()}`;
}

function extractDownloadUrlFromWarningPage(html: string, fileId: string): string {
  const actionMatch = html.match(/<form[^>]+action="([^"]+)"/i);
  const confirmMatch = html.match(/name="confirm"\s+value="([^"]+)"/i);
  const uuidMatch = html.match(/name="uuid"\s+value="([^"]+)"/i);
  const exportMatch = html.match(/name="export"\s+value="([^"]+)"/i);

  const action = actionMatch ? decodeHtml(actionMatch[1]) : 'https://drive.usercontent.google.com/download';
  const params = new URLSearchParams({
    id: fileId,
    export: exportMatch ? decodeHtml(exportMatch[1]) : 'download',
    confirm: confirmMatch ? decodeHtml(confirmMatch[1]) : 't',
  });

  if (uuidMatch) {
    params.set('uuid', decodeHtml(uuidMatch[1]));
  }

  return `${action}?${params.toString()}`;
}

function getCachedResolvedUrl(fileId: string): string | null {
  const cached = resolvedUrlCache.get(fileId);
  if (!cached) {
    return null;
  }
  if (Date.now() >= cached.expiresAt) {
    resolvedUrlCache.delete(fileId);
    return null;
  }
  return cached.url;
}

function setCachedResolvedUrl(fileId: string, url: string): void {
  resolvedUrlCache.set(fileId, {
    url,
    expiresAt: Date.now() + RESOLVE_CACHE_TTL_MS,
  });
}

function getInlineContentDisposition(fileId: string, upstreamHeader: string | null): string {
  const filenameMatch = upstreamHeader?.match(/filename\*?=(?:UTF-8''|")?([^";]+)/i);
  const rawFilename = filenameMatch?.[1] || `${fileId}.mp4`;
  const sanitized = rawFilename.trim().replaceAll('"', '');
  return `inline; filename="${sanitized}"`;
}

async function resolveDriveDownloadUrl(fileId: string, forceRefresh = false): Promise<string> {
  if (!forceRefresh) {
    const cached = getCachedResolvedUrl(fileId);
    if (cached) {
      return cached;
    }
  }

  const initialUrl = `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`;
  const probeResponse = await fetchWithTimeout(initialUrl, {
    method: 'GET',
    redirect: 'follow',
    headers: {
      Range: 'bytes=0-0',
      'User-Agent': 'Mozilla/5.0',
    },
  }, PROBE_TIMEOUT_MS);

  const contentType = (probeResponse.headers.get('content-type') || '').toLowerCase();
  let resolvedUrl = '';

  if (contentType.startsWith('video/')) {
    resolvedUrl = probeResponse.url || buildDefaultDownloadUrl(fileId);
  } else if (contentType.includes('text/html')) {
    const html = await probeResponse.text();
    resolvedUrl = extractDownloadUrlFromWarningPage(html, fileId);
  } else {
    resolvedUrl = buildDefaultDownloadUrl(fileId);
  }

  setCachedResolvedUrl(fileId, resolvedUrl);
  return resolvedUrl;
}

async function fetchDriveVideoResponse(fileId: string, rangeHeader: string | null): Promise<Response> {
  let targetUrl = await resolveDriveDownloadUrl(fileId);

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const upstream = await fetchWithTimeout(targetUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        ...(rangeHeader ? { Range: rangeHeader } : {}),
        'User-Agent': 'Mozilla/5.0',
      },
    }, STREAM_TIMEOUT_MS);

    const contentType = (upstream.headers.get('content-type') || '').toLowerCase();
    if (!contentType.includes('text/html')) {
      return upstream;
    }

    resolvedUrlCache.delete(fileId);
    targetUrl = await resolveDriveDownloadUrl(fileId, true);
  }

  return fetchWithTimeout(targetUrl, {
    method: 'GET',
    redirect: 'follow',
    headers: {
      ...(rangeHeader ? { Range: rangeHeader } : {}),
      'User-Agent': 'Mozilla/5.0',
    },
  }, STREAM_TIMEOUT_MS);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const fileId = getQueryValue(req?.query?.id).trim();
  const isWarmupRequest = getQueryValue(req?.query?.warm).trim() === '1';
  if (!fileId || !DRIVE_ID_PATTERN.test(fileId)) {
    return res.status(400).json({ error: 'Missing or invalid Google Drive file id.' });
  }

  const incomingRangeHeader = typeof req?.headers?.range === 'string' ? req.headers.range : null;
  const rangeHeader = incomingRangeHeader || (req.method === 'HEAD' || isWarmupRequest ? 'bytes=0-0' : null);

  try {
    const upstream = await fetchDriveVideoResponse(fileId, rangeHeader);
    const contentType = (upstream.headers.get('content-type') || '').toLowerCase();

    if (contentType.includes('text/html')) {
      return res.status(502).json({
        error: 'Drive returned a non-streamable response for this video.',
      });
    }

    res.statusCode = upstream.status;
    res.setHeader('x-video-proxy', 'drive');
    res.setHeader('access-control-allow-origin', '*');
    res.setHeader('vary', 'Range');

    const cacheControl = rangeHeader ? RANGE_CACHE_CONTROL : FULL_CACHE_CONTROL;
    res.setHeader('cache-control', cacheControl);
    res.setHeader('CDN-Cache-Control', cacheControl);
    res.setHeader('Vercel-CDN-Cache-Control', cacheControl);

    for (const header of PASSTHROUGH_HEADERS) {
      const value = upstream.headers.get(header);
      if (value) {
        res.setHeader(header, value);
      }
    }

    res.setHeader(
      'content-disposition',
      getInlineContentDisposition(fileId, upstream.headers.get('content-disposition')),
    );

    if (req.method === 'HEAD' || isWarmupRequest || !upstream.body) {
      return res.end();
    }

    Readable.fromWeb(upstream.body as any).pipe(res);
    return;
  } catch (error) {
    console.error('Work video proxy error:', error);
    return res.status(500).json({ error: 'Unable to stream this video right now.' });
  }
}
