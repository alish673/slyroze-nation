import Image from 'next/image';

export default function NationMapOverlay() {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full">
      {/* Nation PNG Map Background */}
      <Image
        src="/slyroze-nation-map.png"
        alt="Slyroze Nation Map"
        fill
        className="object-cover pointer-events-none"
        priority
      />

      {/* Overlay Hex Pattern & Glow Effects */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <pattern id="hexPattern" patternUnits="userSpaceOnUse" width="60" height="52">
            <path d="M30,0 L60,15 L60,45 L30,60 L0,45 L0,15 Z"
              stroke="url(#hexGradient)" strokeWidth="1" fill="transparent" />
          </pattern>
          <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#32E875" stopOpacity="0.5" />
          </linearGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blurred" />
            <feMerge>
              <feMergeNode in="blurred" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1200" height="800" fill="url(#hexPattern)" filter="url(#softGlow)" opacity="0.15" />

        {/* Floating Neon Particles */}
        <circle cx="200" cy="150" r="4" fill="#32E875" opacity="0.6" className="animate-bounce-slow" />
        <circle cx="1000" cy="400" r="3" fill="#FF4FCC" opacity="0.5" className="animate-float" />
        <circle cx="600" cy="650" r="5" fill="#5CFFFF" opacity="0.5" className="animate-float delay-300" />
        <circle cx="850" cy="200" r="2" fill="#C084FC" opacity="0.4" className="animate-float delay-500" />
      </svg>
    </div>
  );
                }
