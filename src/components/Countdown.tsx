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
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
      <div className="flex gap-4 sm:gap-8">
        {units.map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 sm:px-8 sm:py-6 border border-white/20"
          >
            <span className="text-4xl sm:text-6xl font-bold tabular-nums text-white">
              {String(value).padStart(2, '0')}
            </span>
            <span className="text-sm sm:text-base text-white/80 uppercase tracking-wider mt-1">
              {label}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-8 text-white/90 text-lg sm:text-xl font-medium">
        Lancement lundi 23 mars à 19h
      </p>
    </div>
  );
}
