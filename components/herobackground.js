export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-gradient-to-b from-black via-gray-900 to-black opacity-80 absolute inset-0"></div>
      <div className="grid grid-cols-12 grid-rows-12 absolute inset-0 opacity-10">
        {[...Array(144)].map((_, i) => (
          <div key={i} className="border border-neonPurple border-opacity-10"></div>
        ))}
      </div>
      <div className="absolute inset-0 animate-pulse-slow">
        <div className="w-3 h-3 bg-neonGreen rounded-full absolute top-1/3 left-1/4 blur-sm opacity-70 animate-float" />
        <div className="w-2 h-2 bg-slyrozePink rounded-full absolute top-2/3 right-1/3 blur-sm opacity-70 animate-float delay-300" />
        <div className="w-4 h-4 bg-slyrozeBlue rounded-full absolute top-1/2 left-2/3 blur-sm opacity-50 animate-float delay-500" />
      </div>
    </div>
  );
        }
