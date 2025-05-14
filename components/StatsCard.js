export default function StatsCard({ walletAddress, slypBalance, district = "N/A" }) {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-lg space-y-4 transition-transform hover:scale-105">
      <div>
        <p className="text-green-400">Connected Wallet:</p>
        <p className="break-words text-sm">{walletAddress || "Not Connected"}</p>
      </div>
      <div>
        <p className="text-purple-400">SLYP Balance:</p>
        <p>{slypBalance || "0"} SLYP</p>
      </div>
      <div>
        <p className="text-blue-400">District:</p>
        <p>{district}</p>
      </div>
    </div>
  );
  }
