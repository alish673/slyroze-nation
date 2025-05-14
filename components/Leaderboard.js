export default function Leaderboard({ data = [] }) {
  if (!data.length) {
    return (
      <div className="text-gray-400 text-center mt-4">
        No leaderboard data yet.
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((user, index) => (
          <li
            key={index}
            className="bg-gray-800 p-4 rounded-xl shadow-neon hover:scale-105 transition-transform"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">{user.alias || "Unnamed"}</span>
              <span className="text-slyrozePink">{user.slyp} SLYP</span>
            </div>
            {user.lands?.length > 0 && (
              <p className="text-sm text-gray-400">
                Zones: {user.lands.join(', ')}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
