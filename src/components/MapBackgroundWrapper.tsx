'use client';

import dynamic from 'next/dynamic';

const MapBackground = dynamic(() => import('@/components/MapBackground'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-zinc-900" style={{ zIndex: 0 }} />
  ),
});

export default function MapBackgroundWrapper() {
  return (
    <div className="fixed inset-0" style={{ zIndex: 0 }}>
      <MapBackground />
    </div>
  );
}
