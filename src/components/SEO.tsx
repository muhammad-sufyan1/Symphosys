import { useEffect, useMemo } from 'react';

type StructuredData = Record<string, unknown>;

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  structuredData?: StructuredData | StructuredData[];
}

function upsertMetaTag(name: string, content?: string) {
  const existing = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;

  if (!content) {
    if (existing?.dataset.seoManaged === 'true') {
      existing.remove();
    }
    return;
  }

  const meta = existing ?? document.createElement('meta');
  meta.setAttribute('name', name);
  meta.setAttribute('content', content);

  if (!existing) {
    meta.dataset.seoManaged = 'true';
    document.head.appendChild(meta);
  }
}

export function SEO({ title, description, keywords, structuredData }: SEOProps) {
  const serializedStructuredData = useMemo(() => {
    if (!structuredData) {
      return '[]';
    }

    const entries = Array.isArray(structuredData) ? structuredData : [structuredData];
    return JSON.stringify(entries);
  }, [structuredData]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    upsertMetaTag('description', description);
  }, [description]);

  useEffect(() => {
    upsertMetaTag('keywords', keywords);
  }, [keywords]);

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
