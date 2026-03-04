import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

type StructuredData = Record<string, unknown>;
type MetaAttribute = 'name' | 'property';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  structuredData?: StructuredData | StructuredData[];
}

const DEFAULT_SITE_URL = 'https://symphosys.com';
const DEFAULT_OG_IMAGE = '/logo.png';

function toAbsoluteUrl(value: string, siteUrl: string) {
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  if (value.startsWith('//')) {
    return `https:${value}`;
  }

  if (!value.startsWith('/')) {
    return `${siteUrl}/${value}`;
  }

  return `${siteUrl}${value}`;
}

function upsertMetaTag(attribute: MetaAttribute, key: string, content?: string) {
  const existing = document.head.querySelector(
    `meta[${attribute}="${key}"]`,
  ) as HTMLMetaElement | null;

  if (!content) {
    if (existing?.dataset.seoManaged === 'true') {
      existing.remove();
    }
    return;
  }

  const meta = existing ?? document.createElement('meta');
  meta.setAttribute(attribute, key);
  meta.setAttribute('content', content);
  meta.dataset.seoManaged = 'true';

  if (!existing) {
    document.head.appendChild(meta);
  }
}

function upsertLinkTag(rel: string, href?: string) {
  const existing = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;

  if (!href) {
    if (existing?.dataset.seoManaged === 'true') {
      existing.remove();
    }
    return;
  }

  const link = existing ?? document.createElement('link');
  link.setAttribute('rel', rel);
  link.setAttribute('href', href);
  link.dataset.seoManaged = 'true';

  if (!existing) {
    document.head.appendChild(link);
  }
}

export function SEO({
  title,
  description,
  keywords,
  canonicalPath,
  image,
  type = 'website',
  noindex = false,
  structuredData,
}: SEOProps) {
  const location = useLocation();

  const serializedStructuredData = useMemo(() => {
    if (!structuredData) {
      return '[]';
    }

    const entries = Array.isArray(structuredData) ? structuredData : [structuredData];
    return JSON.stringify(entries);
  }, [structuredData]);

  const canonicalUrl = useMemo(() => {
    const path = canonicalPath ?? location.pathname;
    return toAbsoluteUrl(path, DEFAULT_SITE_URL);
  }, [canonicalPath, location.pathname]);

  const imageUrl = useMemo(() => {
    return toAbsoluteUrl(image ?? DEFAULT_OG_IMAGE, DEFAULT_SITE_URL);
  }, [image]);

  const robotsValue = noindex ? 'noindex, nofollow' : 'index, follow';

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    upsertMetaTag('name', 'description', description);
    upsertMetaTag('name', 'keywords', keywords);
    upsertMetaTag('name', 'robots', robotsValue);
    upsertMetaTag('property', 'og:title', title);
    upsertMetaTag('property', 'og:description', description);
    upsertMetaTag('property', 'og:type', type);
    upsertMetaTag('property', 'og:url', canonicalUrl);
    upsertMetaTag('property', 'og:site_name', 'Symphosys');
    upsertMetaTag('property', 'og:image', imageUrl);
    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:title', title);
    upsertMetaTag('name', 'twitter:description', description);
    upsertMetaTag('name', 'twitter:image', imageUrl);
    upsertLinkTag('canonical', canonicalUrl);
  }, [canonicalUrl, description, imageUrl, keywords, robotsValue, title, type]);

  useEffect(() => {
    document.querySelectorAll('script[data-seo-jsonld="true"]').forEach((node) => node.remove());

    const entries = JSON.parse(serializedStructuredData) as StructuredData[];
    for (const entry of entries) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoJsonld = 'true';
      script.textContent = JSON.stringify(entry);
      document.head.appendChild(script);
    }

    return () => {
      document.querySelectorAll('script[data-seo-jsonld="true"]').forEach((node) => node.remove());
    };
  }, [serializedStructuredData]);

  return null;
}
