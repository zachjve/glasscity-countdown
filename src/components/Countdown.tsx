'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(targetDate: Date): TimeLeft {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Cible : lundi 23 mars 2026 à 19h heure française (Paris)
    const targetDate = new Date('2026-03-23T19:00:00+01:00');

    const update = () => setTimeLeft(getTimeLeft(targetDate));
    update();

    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft === null) return null;

  const units = [
    { value: timeLeft.days, label: 'jours' },
    { value: timeLeft.hours, label: 'heures' },
    { value: timeLeft.minutes, label: 'min' },
    { value: timeLeft.seconds, label: 'sec' },
  ];

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 w-full max-w-full overflow-hidden">
      <div className="flex flex-row gap-1 sm:gap-6 md:gap-8 w-full max-w-full sm:max-w-none sm:w-auto justify-center flex-nowrap">
        {units.map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-lg sm:rounded-2xl px-2 py-2 sm:px-6 sm:py-4 md:px-8 md:py-6 border border-white/20 min-w-0 flex-1 sm:flex-initial"
          >
            <span className="text-lg sm:text-4xl md:text-6xl font-bold tabular-nums text-white">
              {String(value).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-sm md:text-base text-white/80 uppercase tracking-wider mt-0.5 sm:mt-1">
              {label}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-6 sm:mt-8 text-white/90 text-sm sm:text-lg md:text-xl font-medium text-center px-2">
        Lancement lundi 23 mars à 19h
      </p>
    </div>
  );
}
