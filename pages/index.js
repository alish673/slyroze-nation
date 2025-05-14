import { useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import Header from '../components/Header';
import HeroBackground from '../components/HeroBackground';
import AuthModal from '../components/AuthModal';
import { connectWallet } from '../utils/wallet';
import { getSlypBalance } from '../utils/slyp';
import { mintPassport } from '../utils/passport';
import { claimZone } from '../utils/land';
import { getLeaderboard } from '../utils/leaderboard';
import { setUserAlias } from '../utils/nickname';
import { deleteUserAccount } from '../utils/deleteUser';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");
  const [slypBalance, setSlypBalance] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [nicknameInput, setNicknameInput] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

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

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    alert("Logged out successfully.");
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

      <main className="container mx-auto p-4 sm:p-6 md:p-8 text-center space-y-6">
        <h1 className="text-3xl font-bold">Welcome to Slyroze Nation</h1>
        <p>Mint. Claim. Earn Monthly SLYP Rewards.</p>

        <div className="flex justify-center space-x-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-neonPurple hover:bg-neonGreen text-black py-2 px-4 rounded"
            >
              Login / Sign Up
            </button>
          )}
          <button
            onClick={handleConnectWallet}
            className="bg-slyrozePink hover:bg-slyrozeBlue text-white py-2 px-4 rounded"
          >
            Connect Wallet
          </button>
        </div>

        {walletAddress && (
          <div className="bg-gray-800 p-4 rounded shadow-lg space-y-4">
            <div>
              <p className="text-green-400">Connected Wallet:</p>
              <p className="break-words text-sm">{walletAddress}</p>
            </div>
            <div>
              <p className="text-purple-400">SLYP Balance:</p>
              <p>{slypBalance} SLYP</p>
            </div>

            <button
              onClick={handleMintPassport}
              disabled={!!loadingMessage}
              className="bg-neonPurple text-white py-2 px-4 rounded shadow-neon"
            >
              Mint Passport (200 SLYP)
            </button>

            <button
              onClick={handleClaimZone}
              disabled={!!loadingMessage}
              className="bg-neonGreen text-black py-2 px-4 rounded shadow-neon"
            >
              Claim Zone (Dynamic SLYP)
            </button>

            <div>
              <h2 className="text-xl font-semibold mb-2">Set Your Nickname</h2>
              <input
                type="text"
                className="w-full max-w-xs p-2 rounded text-black"
                placeholder="Enter nickname"
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
              />
              <button
                onClick={handleSetAlias}
                disabled={!!loadingMessage}
                className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded mt-2"
              >
                Save Nickname
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={!!loadingMessage}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mt-4"
              >
                Delete My Account
              </button>
            </div>
          </div>
        )}

        {/* Ecosystem Buttons Placeholder */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <button className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded">About Slyroze</button>
          <button className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded">Disclaimer</button>
          <button className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded">My Stats</button>
          <button className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded">SlyPass Mint</button>
          <button className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded">Land Market</button>
          <button className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded">Leaderboard</button>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-2">Leaderboard</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {leaderboard.map((user, index) => (
              <li key={index} className="bg-gray-700 p-3 rounded shadow">
                <div className="flex justify-between">
                  <span>{user.alias}</span>
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

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
          }
