export default function ZoneGrid({ zones = [], onClaimZone }) {
  if (!zones.length) {
    return (
      <div className="text-gray-400 text-center mt-4">
        No zones to display.
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Slyroze Nation Map</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {zones.map((zone) => (
          <div
            key={zone.id}
            onClick={() => !zone.claimed && onClaimZone(zone.id)}
            className={`relative cursor-pointer group p-4 rounded-xl border-2 text-center
              ${zone.claimed ? 'border-green-400 bg-gradient-to-br from-green-700 to-green-900' : 'border-neonPurple bg-gradient-to-br from-gray-800 to-gray-900'}
              transition-transform transform hover:scale-105 shadow-md shadow-neon
              ${zone.claimed ? 'animate-pulse-slow' : 'hover:shadow-lg hover:shadow-slyrozePink'}
              `}
          >
            <p className="text-lg font-semibold">{zone.id.replace('zone-', 'Z-')}</p>
            {zone.claimedBy && (
              <p className="text-xs text-gray-300 mt-1">By: {zone.claimedBy}</p>
            )}
            {!zone.claimed && (
              <div className="absolute inset-0 rounded-xl group-hover:ring-2 group-hover:ring-slyrozeBlue transition-all opacity-10 group-hover:opacity-30"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
              }
