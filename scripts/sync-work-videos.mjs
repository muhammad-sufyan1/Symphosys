import fs from 'node:fs/promises';
import path from 'node:path';

const rootFolderId = process.argv[2] || process.env.WORK_DRIVE_FOLDER_ID || '1Qgrh9bFRSWSXo2Nan-BgPU3dVaSxqkwK';
const outputPath = path.resolve(process.cwd(), 'public', 'work-videos.json');

const VIDEO_EXTENSIONS = /\.(mp4|mov|m4v|webm|avi|mkv)$/i;

function decodeHtml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&#39;', "'")
    .replaceAll('&quot;', '"');
}

function parseEntries(html) {
  const entries = [];
  const entryRegex =
    /(<div class="flip-entry" id="entry-([^"\s]+)"[\s\S]*?<a href="([^"]+)"[\s\S]*?<div class="flip-entry-title">([\s\S]*?)<\/div>[\s\S]*?<div class="flip-entry-last-modified"><div>([\s\S]*?)<\/div>)/g;
  let match;

  while ((match = entryRegex.exec(html)) !== null) {
    const block = match[1];
    const href = decodeHtml(match[3]);
    const title = decodeHtml(match[4].replace(/<[^>]+>/g, '').trim());
    const lastModified = decodeHtml(match[5].replace(/<[^>]+>/g, '').trim());

    const folderMatch = href.match(/\/drive\/folders\/([A-Za-z0-9_-]+)/);
    const fileMatch = href.match(/\/file\/d\/([A-Za-z0-9_-]+)/);
    const isFolder = Boolean(folderMatch);
    const isFile = Boolean(fileMatch);
    const isVideo =
      /alt="Video"/i.test(block) ||
      /type\/video\//i.test(block) ||
      VIDEO_EXTENSIONS.test(title);

    entries.push({
      id: folderMatch?.[1] || fileMatch?.[1] || match[2],
      title,
      href,
      lastModified,
      isFolder,
      isFile,
      isVideo,
    });
  }

  return entries;
}

async function fetchFolderHtml(folderId) {
  const url = `https://drive.google.com/embeddedfolderview?id=${folderId}#list`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch folder ${folderId}: HTTP ${response.status}`);
  }

  return response.text();
}

async function crawlDriveFolder(rootId) {
  const queue = [{ id: rootId, path: ['Portfolio'] }];
  const visited = new Set();
  const videos = [];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current || visited.has(current.id)) {
      continue;
    }

    visited.add(current.id);

    let html;
    try {
      html = await fetchFolderHtml(current.id);
    } catch (error) {
      console.error(`Skipping folder ${current.id}: ${error.message}`);
      continue;
    }

    const entries = parseEntries(html);

    for (const entry of entries) {
      if (entry.isFolder) {
        queue.push({
          id: entry.id,
          path: [...current.path, entry.title],
        });
        continue;
      }

      if (!entry.isFile || !entry.isVideo) {
        continue;
      }

      videos.push({
        id: entry.id,
        title: entry.title,
        category: current.path[current.path.length - 1],
        folderPath: current.path.join(' / '),
        lastModified: entry.lastModified,
        viewUrl: entry.href,
        previewUrl: `https://drive.google.com/file/d/${entry.id}/preview`,
        thumbnailUrl: `https://drive.google.com/thumbnail?id=${entry.id}&sz=w1200`,
      });
    }
  }

  const deduped = Array.from(
    videos.reduce((map, video) => {
      map.set(video.id, video);
      return map;
    }, new Map()).values(),
  );

  deduped.sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));

  const categoriesMap = deduped.reduce((map, video) => {
    map.set(video.category, (map.get(video.category) || 0) + 1);
    return map;
  }, new Map());

  const categories = Array.from(categoriesMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  return {
    rootFolderId: rootId,
    generatedAt: new Date().toISOString(),
    totalVideos: deduped.length,
    categories,
    videos: deduped,
  };
}

async function main() {
  const result = await crawlDriveFolder(rootFolderId);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');

  console.log(
    `Saved ${result.totalVideos} videos across ${result.categories.length} categories to ${outputPath}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
