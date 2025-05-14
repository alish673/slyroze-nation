export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base Dark Gradient */}
      <div className="bg-gradient-to-b from-black via-gray-900 to-black opacity-90 absolute inset-0"></div>

      {/* Subtle Neon Grid Layer */}
      <div className="grid grid-cols-12 grid-rows-12 absolute inset-0 opacity-10">
        {[...Array(144)].map((_, i) => (
          <div
            key={i}
            className="border border-neonPurple border-opacity-20 hover:border-opacity-40 transition-opacity duration-300 ease-in-out"
          ></div>
        ))}
      </div>

      {/* Radial and Conic Glow Overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-slyrozePink/10 via-transparent to-black animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-gradient-conic from-slyrozeBlue/10 via-transparent to-black animate-pulse-slow delay-200"></div>

      {/* Floating Neon Particles */}
      <div className="absolute inset-0">
        <div className="w-3 h-3 bg-neonGreen rounded-full absolute top-1/3 left-1/4 blur-md opacity-60 animate-float" />
        <div className="w-2 h-2 bg-slyrozePink rounded-full absolute top-2/3 right-1/3 blur-sm opacity-50 animate-float delay-300" />
        <div className="w-4 h-4 bg-slyrozeBlue rounded-full absolute top-1/2 left-2/3 blur-lg opacity-50 animate-float delay-500" />
      </div>
    </div>
  );
}
