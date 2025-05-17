import { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged, deleteUser } from 'firebase/auth';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';
import Header from '../components/Header';
import NationMapOverlay from '../components/NationMapOverlay';
import AuthModal from '../components/AuthModal';
import AboutPanel from '../components/AboutPanel';
import DisclaimerPanel from '../components/DisclaimerPanel';
import NicknameModal from '../components/NicknameModal';
import StatsCard from '../components/StatsCard';
import Leaderboard from '../components/Leaderboard';
import ZoneGrid from '../components/ZoneGrid';
import { connectWallet } from '../utils/wallet';
import { getSlypBalance } from '../utils/slyp';
import { mintPassport } from '../utils/passport';
import { claimZoneWithSlyPass } from '../utils/zone';
import { getLeaderboard } from '../utils/leaderboard';
import { setUserAlias } from '../utils/nickname';
import { FaTelegram, FaTwitter, FaInstagram } from 'react-icons/fa';

function MintSuccessModal({ tokenId, onClose }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(tokenId);
    alert('Token ID copied!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-gray-800 border border-purple-500 rounded-xl shadow-xl p-6 w-[90%] max-w-md text-white text-center">
        <h2 className="text-xl font-bold mb-2">Passport Minted!</h2>
        <p className="text-sm mb-2">Your Token ID:</p>
        <div className="text-2xl font-mono text-green-400 mb-3">{tokenId}</div>
        <p className="text-xs text-yellow-300 mb-4">
          Save this to import your Passport into your wallet later.
        </p>
        <div className="flex justify-center gap-3">
          <button onClick={copyToClipboard} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">
            Copy ID
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
    }
export default function Nation() {
  const [user, setUser] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [signer, setSigner] = useState(null);
  const [slypBalance, setSlypBalance] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [passportId, setPassportId] = useState(null);
  const [showMintModal, setShowMintModal] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) setUser(authUser);
      else setUser(null);
    });
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const data = await getLeaderboard();
    setLeaderboardData(data);
  };

  const handleWalletConnect = async () => {
    const { signer, walletAddress } = await connectWallet();
    setSigner(signer);
    setWalletAddress(walletAddress);
    const balance = await getSlypBalance(signer.provider, walletAddress);
    setSlypBalance(balance);
  };

  const handleMintPassport = async () => {
    if (!signer || !walletAddress) return alert("Connect Wallet first.");
    if (passportId) return alert("You already have a Passport.");
    try {
      setLoadingMessage("Minting Passport...");
      const tokenId = await mintPassport(signer, walletAddress, user?.uid);
      const balance = await getSlypBalance(signer.provider, walletAddress);
      setSlypBalance(balance);
      setPassportId(tokenId);
      setShowMintModal(true);
    } catch (err) {
      alert("Minting failed: " + err.message);
    } finally {
      setLoadingMessage("");
    }
  };
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Header onConnectWallet={handleWalletConnect} walletAddress={walletAddress} />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            {user ? (
              <button
                onClick={() => signOut(auth)}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
              >
                Log In
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowNicknameModal(true)}
              className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
            >
              Set Nickname
            </button>
            <button
              onClick={handleMintPassport}
              className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
            >
              Mint Passport
            </button>
            <button
              onClick={() => claimZoneWithSlyPass(user, signer, walletAddress)}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Claim Zone
            </button>
          </div>
        </div>

        <StatsCard balance={slypBalance} />
        <ZoneGrid />
        <NationMapOverlay />
        <Leaderboard data={leaderboardData} />

        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
        {showNicknameModal && <NicknameModal onClose={() => setShowNicknameModal(false)} />}
        {showAbout && <AboutPanel onClose={() => setShowAbout(false)} />}
        {showDisclaimer && <DisclaimerPanel onClose={() => setShowDisclaimer(false)} />}
        {showMintModal && (
          <MintSuccessModal tokenId={passportId} onClose={() => setShowMintModal(false)} />
        )}
      </main>
    </div>
  );
                }
