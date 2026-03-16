interface LogoProps {
  size?: number;
  className?: string;
  color?: 'black' | 'white' | 'current';
}

export default function Logo({ size = 24, className = '', color = 'current' }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        d="M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z"
        fill={color === 'current' ? 'currentColor' : color}
      />
      <path
        d="M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z"
        transform="translate(0, 8)"
        fill={color === 'current' ? 'currentColor' : color}
      />
    </svg>
  );
}
