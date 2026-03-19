import MapBackgroundWrapper from '@/components/MapBackgroundWrapper';
import Countdown from '@/components/Countdown';
import Logo from '@/components/Logo';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <MapBackgroundWrapper />
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        <Logo size={40} className="text-white drop-shadow-lg" color="white" />
        <span className="text-4xl font-bold text-white tracking-tight drop-shadow-lg">
          BlackLayer
        </span>
      </div>
      <Countdown />
    </div>
  );
}
