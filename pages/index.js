import Header from '../components/Header';
import HeroBackground from '../components/HeroBackground';
import { connectWallet } from '../utils/wallet';
import { getSlypBalance } from '../utils/slyp';
import { mintPassport } from '../utils/passport';
import { claimZone } from '../utils/land';
import { getLeaderboard } from '../utils/leaderboard';
import { setUserAlias } from '../utils/nickname';
import { deleteUserAccount } from '../utils/deleteUser'; // Fixed casing
import { getAuth } from "firebase/auth";
import { useEffect, useState } from 'react';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");
  const [slypBalance, setSlypBalance] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [nicknameInput, setNicknameInput] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");

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
      setLoadingMessage("Minting Passport...");
      await mintPassport(signer, walletAddress);
      const balance = await getSlypBalance(provider, walletAddress);
      setSlypBalance(balance);
      alert("Passport Minted Successfully!");
    } catch (err) {
      console.error(err);
      alert("Minting failed: " + err.message);
    } finally {
      setLoadingMessage("");
    }
  };

  const handleClaimZone = async () => {
    if (!signer || !walletAddress) return alert("Connect Wallet first.");
    try {
      const zoneNumber = prompt("Enter Zone Number to Claim (e.g., 1001):");
      if (!zoneNumber) return;

      setLoadingMessage(`Claiming Zone ${zoneNumber}...`);
      const price = await claimZone(signer, provider, walletAddress, zoneNumber);
      const balance = await getSlypBalance(provider, walletAddress);
      setSlypBalance(balance);
      alert(`Zone ${zoneNumber} claimed for ${price} SLYP!`);
    } catch (err) {
      console.error(err);
      alert("Claim failed: " + err.message);
    } finally {
      setLoadingMessage("");
    }
  };
  const handleSetAlias = async () => {
    if (!walletAddress) return alert("Connect Wallet first.");
    if (!nicknameInput) return alert("Enter a nickname.");

    try {
      setLoadingMessage("Saving Nickname...");
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return alert("You need to be logged in with Firebase.");

      await setUserAlias(user.uid, nicknameInput);
      const data = await getLeaderboard();
      setLeaderboard(data);
      alert("Nickname set successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to set nickname: " + err.message);
    } finally {
      setLoadingMessage("");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = prompt("Type 'delete' to confirm account deletion:");
    if (confirmDelete !== 'delete') return alert("Deletion cancelled.");

    try {
      setLoadingMessage("Deleting Account...");
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return alert("You need to be logged in with Firebase.");

      await deleteUserAccount(user.uid);
      const data = await getLeaderboard();
      setLeaderboard(data);
      alert("Account deleted successfully from database.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete account: " + err.message);
    } finally {
      setLoadingMessage("");
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
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <HeroBackground />
      <Header />
      <main className="container mx-auto p-4 sm:p-6 md:p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Slyroze Nation</h1>
        <p className="mb-6">Mint. Claim. Earn Monthly SLYP Rewards.</p>

        {walletAddress ? (
          <div className="bg-gray-800 p-4 rounded shadow-lg space-y-4 transition-transform hover:scale-105">
            <div>
              <p className="text-green-400">Connected Wallet:</p>
              <p className="break-words text-sm">{walletAddress}</p>
            </div>
            <div>
              <p className="text-purple-400">SLYP Balance:</p>
              <p>{slypBalance} SLYP</p>
            </div>
            <button
              disabled={!!loadingMessage}
              className={`bg-neonPurple text-white py-2 px-4 rounded shadow-neon transition-transform active:scale-95 ${loadingMessage ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleMintPassport}
            >
              Mint Passport (200 SLYP)
            </button>
            <button
              disabled={!!loadingMessage}
              className={`bg-neonGreen text-black py-2 px-4 rounded shadow-neon transition-transform active:scale-95 ${loadingMessage ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                disabled={!!loadingMessage}
                className={`bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded mt-2 transition-transform active:scale-95 ${loadingMessage ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleSetAlias}
              >
                Save Nickname
              </button>
              <div className="mt-6">
                <button
                  disabled={!!loadingMessage}
                  className={`bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-transform active:scale-95 ${loadingMessage ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleDeleteAccount}
                >
                  Delete My Account
                </button>
                <p className="text-sm text-gray-400 mt-1">
                  Warning: This will remove your data from the leaderboard.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            disabled={!!loadingMessage}
            className={`bg-slyrozePink hover:bg-slyrozeBlue text-white py-2 px-4 rounded shadow-neon transition-transform active:scale-95 ${loadingMessage ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </button>
        )}

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-2">Leaderboard</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {leaderboard.map((user, index) => (
              <li key={index} className="bg-gray-700 p-3 rounded shadow transition-transform hover:scale-105">
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

      {loadingMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <p className="text-xl text-white animate-pulse">{loadingMessage}</p>
        </div>
      )}
    </div>
  );
  }
