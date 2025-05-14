import Header from '../components/Header';
import { connectWallet } from '../utils/wallet';
import { getSlypBalance } from '../utils/slyp';
import { mintPassport } from '../utils/passport';
import { claimZone } from '../utils/land';
import { getLeaderboard } from '../utils/leaderboard';
import { setUserAlias } from '../utils/nickname';
import { getAuth } from "firebase/auth";
import { useEffect, useState } from 'react';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");
  const [slypBalance, setSlypBalance] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [nicknameInput, setNicknameInput] = useState("");

  const handleConnectWallet = async () => {
    const result = await connectWallet();
    if (result) {
      setWalletAddress(result.address);
      setProvider(result.provider);
      setSigner(result.signer);
      const balance = await getSlypBalance(result.provider, result.address);
      setSlypBalance(balance);
    }
  };

  const handleMintPassport = async () => {
    if (!signer || !walletAddress) return alert("Connect Wallet first.");
    try {
      alert("Minting Passport...");
      await mintPassport(signer, walletAddress);
      alert("Passport Minted Successfully!");
      const balance = await getSlypBalance(provider, walletAddress);
      setSlypBalance(balance);
    } catch (err) {
      console.error(err);
      alert("Minting failed: " + err.message);
    }
  };

  const handleClaimZone = async () => {
    if (!signer || !walletAddress) return alert("Connect Wallet first.");
    try {
      const zoneNumber = prompt("Enter Zone Number to Claim (e.g., 1001):");
      if (!zoneNumber) return;

      alert("Claiming Zone...");
      const price = await claimZone(signer, provider, walletAddress, zoneNumber);
      alert(`Zone ${zoneNumber} claimed for ${price} SLYP!`);

      const balance = await getSlypBalance(provider, walletAddress);
      setSlypBalance(balance);
    } catch (err) {
      console.error(err);
      alert("Claim failed: " + err.message);
    }
  };

  const handleSetAlias = async () => {
    if (!walletAddress) return alert("Connect Wallet first.");
    if (!nicknameInput) return alert("Enter a nickname.");

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return alert("You need to be logged in with Firebase.");

      await setUserAlias(user.uid, nicknameInput);
      alert("Nickname set successfully!");

      const data = await getLeaderboard();
      setLeaderboard(data);
    } catch (err) {
      console.error(err);
      alert("Failed to set nickname: " + err.message);
    }
  };

  useEffect(() => {
    async function loadLeaders() {
      const data = await getLeaderboard();
      setLeaderboard(data);
    }
    loadLeaders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Header />
      <main className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Slyroze Nation</h1>
        <p className="mb-6">Mint. Claim. Earn Monthly SLYP Rewards.</p>

        {walletAddress ? (
          <div className="bg-gray-800 p-4 rounded shadow-lg space-y-4">
            <div>
              <p className="text-green-400">Connected Wallet:</p>
              <p className="break-all">{walletAddress}</p>
            </div>
            <div>
              <p className="text-purple-400">SLYP Balance:</p>
              <p>{slypBalance} SLYP</p>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              onClick={handleMintPassport}
            >
              Mint Passport (200 SLYP)
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
              onClick={handleClaimZone}
            >
              Claim Zone (Dynamic SLYP)
            </button>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Set Your Nickname</h2>
              <input
                type="text"
                className="w-full max-w-xs p-2 rounded text-black"
                placeholder="Enter nickname"
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
              />
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded mt-2"
                onClick={handleSetAlias}
              >
                Save Nickname
              </button>
            </div>
          </div>
        ) : (
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </button>
        )}

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-2">Leaderboard</h2>
          <ul className="space-y-2">
            {leaderboard.map((user, index) => (
              <li key={index} className="bg-gray-700 p-3 rounded shadow">
                <div className="flex justify-between items-center">
                  <span className="text-white">{user.alias}</span>
                  <span className="text-purple-300">{user.slyp} SLYP</span>
                </div>
                {user.lands.length > 0 && (
                  <p className="text-sm text-gray-400">Zones: {user.lands.join(', ')}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
        }
