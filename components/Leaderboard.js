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
          <li key={index} className="bg-gray-700 p-3 rounded shadow transition-transform hover:scale-105">
            <div className="flex justify-between items-center">
              <span className="text-white">{user.alias || "Unnamed"}</span>
              <span className="text-purple-300">{user.slyp} SLYP</span>
            </div>
            {user.lands && user.lands.length > 0 && (
              <p className="text-sm text-gray-400">Zones: {user.lands.join(', ')}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
                  }
