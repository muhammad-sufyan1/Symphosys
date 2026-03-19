import React from 'react';

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(28,27,23,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(28,27,23,0.06) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div
        className="absolute -top-[18vh] -left-[12vw] w-[48vw] h-[48vw] max-w-[640px] max-h-[640px] rounded-full blur-[90px] opacity-60"
        style={{
          background:
            'radial-gradient(circle at 34% 28%, rgba(255,106,61,0.28) 0%, rgba(255,106,61,0.08) 48%, rgba(255,106,61,0.02) 72%, transparent 82%)',
        }}
      />
      <div
        className="absolute -bottom-[22vh] -right-[16vw] w-[50vw] h-[50vw] max-w-[640px] max-h-[640px] rounded-full blur-[100px] opacity-55"
        style={{
          background:
            'radial-gradient(circle at 70% 32%, rgba(28,27,23,0.2) 0%, rgba(28,27,23,0.06) 52%, rgba(28,27,23,0.02) 76%, transparent 84%)',
        }}
      />
      <div
        className="absolute top-[36vh] left-[30vw] w-[30vw] h-[30vw] max-w-[380px] max-h-[380px] rounded-full blur-[70px] opacity-55"
        style={{
          background:
            'radial-gradient(circle at 42% 54%, rgba(255,166,120,0.22) 0%, rgba(255,166,120,0.07) 60%, rgba(255,166,120,0.02) 78%, transparent 86%)',
        }}
      />
    </div>
  );
}
