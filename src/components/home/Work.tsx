import React, { useEffect, useMemo, useState } from 'react';
import { Play, Search, X } from 'lucide-react';
import { Button } from '../Button';

interface WorkVideo {
  id: string;
  title: string;
  category: string;
  folderPath: string;
  lastModified: string;
  viewUrl: string;
  previewUrl: string;
  thumbnailUrl: string;
}

interface WorkVideosPayload {
  videos?: WorkVideo[];
}

const PAGE_SIZE = 24;
const IFRAME_LOAD_TIMEOUT_MS = 9000;

function buildDriveStreamCandidates(videoId: string) {
  const id = encodeURIComponent(videoId);
  return [
    `https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t`,
    `https://drive.google.com/uc?export=download&confirm=t&id=${id}`,
    `https://drive.usercontent.google.com/uc?id=${id}&export=download`,
  ];
}

function parseWorkVideos(payload: unknown): WorkVideo[] {
  let items: unknown[] = [];

  if (Array.isArray(payload)) {
    items = payload;
  } else if (
    payload &&
    typeof payload === 'object' &&
    Array.isArray((payload as WorkVideosPayload).videos)
  ) {
    items = (payload as WorkVideosPayload).videos as unknown[];
  }

  const unique = new Map<string, WorkVideo>();
  for (const item of items) {
    if (!item || typeof item !== 'object') {
      continue;
    }

    const video = item as Partial<WorkVideo>;
    if (!video.id || !video.title || !video.previewUrl || !video.thumbnailUrl) {
      continue;
    }

    unique.set(video.id, {
      id: video.id,
      title: video.title,
      category: video.category || 'Uncategorized',
      folderPath: video.folderPath || 'Work',
      lastModified: video.lastModified || 'Recently',
      viewUrl: video.viewUrl || `https://drive.google.com/file/d/${video.id}/view`,
      previewUrl: video.previewUrl,
      thumbnailUrl: video.thumbnailUrl,
    });
  }

  return Array.from(unique.values());
}

function compactPath(path: string) {
  const pieces = path.split(' / ');
  if (pieces.length <= 2) {
    return path;
  }
  return `${pieces[pieces.length - 2]} / ${pieces[pieces.length - 1]}`;
}

export function Work() {
  const [videos, setVideos] = useState<WorkVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Work');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedVideo, setSelectedVideo] = useState<WorkVideo | null>(null);
  const [playerMode, setPlayerMode] = useState<'native' | 'iframe'>('native');
  const [streamCandidateIndex, setStreamCandidateIndex] = useState(0);
  const [isNativeReady, setIsNativeReady] = useState(false);
  const [iframeTimedOut, setIframeTimedOut] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadVideos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/work-videos.json', { cache: 'force-cache' });
        if (!response.ok) {
          throw new Error(`Failed to load work videos: ${response.status}`);
        }

        const payload = (await response.json()) as unknown;
        const parsed = parseWorkVideos(payload);

        if (isMounted) {
          setVideos(parsed);
          setLoadError('');
        }
      } catch (error) {
        if (isMounted) {
          setLoadError('Unable to load videos right now. Please refresh and try again.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadVideos();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    if (!selectedVideo) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedVideo(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [selectedVideo]);

  useEffect(() => {
    if (!selectedVideo) {
      return;
    }

    setPlayerMode('native');
    setStreamCandidateIndex(0);
    setIsNativeReady(false);
    setIframeTimedOut(false);
  }, [selectedVideo]);

  useEffect(() => {
    if (playerMode !== 'native') {
      return;
    }
    setIsNativeReady(false);
  }, [playerMode, streamCandidateIndex, selectedVideo?.id]);

  useEffect(() => {
    if (playerMode !== 'iframe' || !selectedVideo) {
      return;
    }

    setIframeTimedOut(false);
    const timeoutId = window.setTimeout(() => {
      setIframeTimedOut(true);
    }, IFRAME_LOAD_TIMEOUT_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [playerMode, selectedVideo]);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const video of videos) {
      counts.set(video.category, (counts.get(video.category) || 0) + 1);
    }

    return [
      { name: 'All Work', count: videos.length },
      ...Array.from(counts.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ name, count })),
    ];
  }, [videos]);

  const filteredVideos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return videos.filter((video) => {
      const categoryMatch = activeCategory === 'All Work' || video.category === activeCategory;
      const queryMatch =
        query.length === 0 ||
        video.title.toLowerCase().includes(query) ||
        video.category.toLowerCase().includes(query) ||
        video.folderPath.toLowerCase().includes(query);

      return categoryMatch && queryMatch;
    });
  }, [videos, activeCategory, searchQuery]);

  const visibleVideos = useMemo(
    () => filteredVideos.slice(0, visibleCount),
    [filteredVideos, visibleCount],
  );

  const hasMore = visibleCount < filteredVideos.length;
  const streamCandidates = useMemo(
    () => (selectedVideo ? buildDriveStreamCandidates(selectedVideo.id) : []),
    [selectedVideo],
  );
  const activeStreamUrl = streamCandidates[streamCandidateIndex] || '';
  const previewSrc = selectedVideo
    ? `${selectedVideo.previewUrl}${selectedVideo.previewUrl.includes('?') ? '&' : '?'}autoplay=1`
    : '';

  const resetNativePlayer = () => {
    setPlayerMode('native');
    setStreamCandidateIndex(0);
    setIsNativeReady(false);
  };

  const handleNativePlaybackError = () => {
    if (streamCandidateIndex < streamCandidates.length - 1) {
      setStreamCandidateIndex((previous) => previous + 1);
      return;
    }
    setPlayerMode('iframe');
  };

  return (
    <>
      <section id="work" className="pt-32 pb-24 md:pt-36 md:pb-28 bg-bg text-ink relative overflow-hidden px-6 md:px-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-accent/10 blur-[120px]" />
          <div className="absolute bottom-[-15%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-ink/5 blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#11111112_1px,transparent_1px),linear-gradient(to_bottom,#11111112_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>

        <div className="max-w-screen-2xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-12 md:mb-14">
            <div className="lg:col-span-8">
              <p className="text-xs uppercase tracking-[0.28em] font-bold text-ink/50 mb-5">Symphosys Proof Of Work</p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[6.4vw] uppercase leading-[0.86] tracking-tight">
                Video Work <span className="text-accent">Library</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl max-w-3xl font-medium text-ink/70">
                Every project in one place. Explore by category and watch instantly without leaving the website.
              </p>
            </div>

            <div className="lg:col-span-4 lg:justify-self-end">
              <div className="bg-surface border border-ink/10 rounded-3xl p-5 md:p-6 min-w-[280px]">
                <p className="text-xs uppercase tracking-[0.2em] text-ink/50 font-bold mb-2">Total Videos</p>
                <p className="font-display text-5xl text-accent leading-none">{videos.length}</p>
                <p className="text-sm text-ink/60 mt-2">Public Google Drive portfolio synced</p>
              </div>
            </div>
          </div>

          <div className="mb-7">
            <label htmlFor="work-search" className="sr-only">Search videos</label>
            <div className="relative max-w-xl">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
              <input
                id="work-search"
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by title, category, or folder..."
                className="w-full rounded-2xl border border-ink/10 bg-surface pl-12 pr-4 py-3 text-base font-medium placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((category) => {
              const isActive = category.name === activeCategory;
              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setActiveCategory(category.name)}
                  className={`rounded-full border px-4 py-2 text-sm font-bold tracking-wide transition-colors ${
                    isActive
                      ? 'bg-ink text-bg border-ink'
                      : 'bg-surface text-ink/75 border-ink/10 hover:border-accent/40 hover:text-accent'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              );
            })}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-[4/5] rounded-3xl bg-surface border border-ink/10 animate-pulse"
                />
              ))}
            </div>
          ) : loadError ? (
            <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-red-600 font-medium">
              {loadError}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {visibleVideos.map((video) => (
                  <button
                    type="button"
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className="group text-left"
                  >
                    <article className="relative aspect-[4/5] rounded-[28px] overflow-hidden border border-ink/10 bg-surface">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#f27d2640,transparent_45%),radial-gradient(circle_at_80%_100%,#00000040,transparent_42%)]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent z-[3]" />

                      <div className="absolute inset-0 z-[1] flex items-center justify-center">
                        <span className="font-display text-6xl text-bg/15 uppercase">
                          {video.category.slice(0, 1)}
                        </span>
                      </div>

                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={(event) => {
                          event.currentTarget.style.opacity = '0';
                        }}
                        className="absolute inset-0 w-full h-full object-cover z-[2] transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute top-4 left-4 z-[4] max-w-[70%]">
                        <span className="inline-flex rounded-full bg-bg/90 text-ink px-3 py-1 text-[10px] md:text-xs uppercase tracking-[0.16em] font-bold">
                          {video.category}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4 z-[4]">
                        <span className="inline-flex rounded-full bg-ink/65 text-bg/90 px-3 py-1 text-[10px] md:text-xs uppercase tracking-[0.12em] font-bold">
                          {video.lastModified}
                        </span>
                      </div>

                      <div className="absolute inset-0 z-[4] flex items-center justify-center">
                        <span className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center shadow-xl scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                          <Play size={26} fill="currentColor" />
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 z-[4] p-5 md:p-6">
                        <h3 className="font-display text-xl md:text-2xl uppercase text-bg leading-tight mb-2">
                          {video.title}
                        </h3>
                        <p className="text-xs md:text-sm text-bg/70 uppercase tracking-[0.12em] font-medium">
                          {compactPath(video.folderPath)}
                        </p>
                      </div>
                    </article>
                  </button>
                ))}
              </div>

              {filteredVideos.length === 0 ? (
                <div className="mt-10 rounded-3xl border border-ink/10 bg-surface p-8 md:p-10 text-center">
                  <p className="font-display text-3xl uppercase mb-3">No Match Found</p>
                  <p className="text-ink/70 font-medium">Try a different search term or change category.</p>
                </div>
              ) : null}

              {hasMore ? (
                <div className="mt-12 text-center">
                  <Button
                    type="button"
                    size="lg"
                    onClick={() => setVisibleCount((previous) => previous + PAGE_SIZE)}
                    className="px-10"
                  >
                    Load More Videos
                  </Button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      {selectedVideo ? (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm p-4 md:p-8"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="max-w-6xl mx-auto h-full flex flex-col justify-center gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 text-bg">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-bg/60 font-bold mb-2">{selectedVideo.category}</p>
                <h2 className="font-display text-2xl md:text-4xl uppercase leading-tight">
                  {selectedVideo.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-bg flex items-center justify-center shrink-0 transition-colors"
                aria-label="Close video player"
              >
                <X size={20} />
              </button>
            </div>

            <div className="rounded-3xl overflow-hidden border border-white/15 bg-black">
              <div className="aspect-video relative">
                {playerMode === 'native' ? (
                  <>
                    <video
                      key={activeStreamUrl}
                      src={activeStreamUrl}
                      poster={selectedVideo.thumbnailUrl}
                      className="w-full h-full object-contain bg-black"
                      crossOrigin="anonymous"
                      controls
                      playsInline
                      autoPlay
                      preload="metadata"
                      onCanPlay={() => setIsNativeReady(true)}
                      onLoadedData={() => setIsNativeReady(true)}
                      onError={handleNativePlaybackError}
                    />
                    {!isNativeReady ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-bg/80 pointer-events-none">
                        <span className="w-10 h-10 rounded-full border-2 border-bg/40 border-t-bg animate-spin" />
                        <p className="text-xs md:text-sm uppercase tracking-[0.14em] font-semibold">
                          Loading Video Player...
                        </p>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <>
                    <iframe
                      title={selectedVideo.title}
                      src={previewSrc}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                    {iframeTimedOut ? (
                      <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-amber-300/40 bg-amber-500/20 backdrop-blur-sm p-4 text-amber-100">
                        <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.12em]">
                          Google Drive player is still loading.
                        </p>
                        <p className="text-xs md:text-sm text-amber-100/85 mt-1">
                          This can happen when Drive blocks embeds or third-party cookies are restricted.
                        </p>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm">
              {playerMode === 'native' ? (
                <button
                  type="button"
                  onClick={() => setPlayerMode('iframe')}
                  className="rounded-full border border-bg/25 text-bg/90 px-4 py-2 font-semibold uppercase tracking-[0.12em] hover:bg-bg/10 transition-colors"
                >
                  Try Drive Player
                </button>
              ) : (
                <button
                  type="button"
                  onClick={resetNativePlayer}
                  className="rounded-full border border-bg/25 text-bg/90 px-4 py-2 font-semibold uppercase tracking-[0.12em] hover:bg-bg/10 transition-colors"
                >
                  Try Native Player
                </button>
              )}

              <a
                href={selectedVideo.viewUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-bg/25 text-bg/90 px-4 py-2 font-semibold uppercase tracking-[0.12em] hover:bg-bg/10 transition-colors"
              >
                Open in Drive
              </a>

              <p className="text-bg/60 font-medium">
                Source {Math.min(streamCandidateIndex + 1, streamCandidates.length)} of {streamCandidates.length}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
