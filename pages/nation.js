import { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged, deleteUser } from "firebase/auth";
import { collection, getDocs, doc, deleteDoc, query, where } from "firebase/firestore";
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
    setCustomAlert("Token ID copied!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-gray-900 text-white p-6 rounded-xl shadow-xl w-[90%] max-w-md text-center border border-purple-500">
        <h2 className="text-xl font-bold mb-3">Passport Minted</h2>
        <p className="text-sm mb-2">Your Passport Token ID:</p>
        <div className="text-2xl font-mono text-green-400 mb-3">{tokenId}</div>
        <p className="text-xs text-yellow-300 mb-4">Save this ID to import your Passport NFT to your wallet later.</p>
        <div className="flex justify-center gap-3">
          <button onClick={copyToClipboard} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Copy ID</button>
          <button onClick={onClose} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">Close</button>
        </div>
      </div>
    </div>
  );
}

function AlertModal({ message, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg w-[90%] max-w-sm text-center border border-red-500">
        <h2 className="text-lg font-semibold mb-3">Notice</h2>
        <p className="text-sm mb-4">{message}</p>
        <button onClick={onClose} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white">OK</button>
      </div>
    </div>
  );
}

async function fetchPassport(uid, setPassportId, setPassportImage) {
  try {
    const q = query(collection(db, "passports"), where("ownerUid", "==", uid));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const docData = snapshot.docs[0].data();
      const id = String(docData.tokenId).trim();
      if (!/^\d+$/.test(id)) throw new Error("Invalid tokenId: " + id);

      setPassportId(Number(id));

      const res = await fetch(`https://slyroze.com/metadata/passport/${id}.json`);
      const json = await res.json();

      setPassportImage(json.image || null);
    } else {
      setPassportId(null);
      setPassportImage(null);
    }
  } catch (err) {
    console.error("fetchPassport failed:", err.message);
    setPassportId(null);
    setPassportImage(null);
  }
    }
export default function Nation() {
  const [walletAddress, setWalletAddress] = useState("");
  const [slypBalance, setSlypBalance] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAboutPanel, setShowAboutPanel] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [showHowNationWorks, setShowHowNationWorks] = useState(false);
  const [stats, setStats] = useState({ users: 0, zones: 0, passports: 0 });
  const [passportId, setPassportId] = useState(null);
  const [passportImage, setPassportImage] = useState(null);
  const [showMintModal, setShowMintModal] = useState(false);
  const [customAlert, setCustomAlert] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      if (usr) fetchPassport(usr.uid, setPassportId, setPassportImage);
      else {
        setPassportId(null);
        setPassportImage(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function loadLeaders() {
      const data = await getLeaderboard();
      setLeaderboard(data);
    }
    async function loadStats() {
      const usersSnap = await getDocs(collection(db, "users"));
      const zonesSnap = await getDocs(collection(db, "claimed_zones"));
      const passportsSnap = await getDocs(collection(db, "passports"));
      setStats({ users: usersSnap.size, zones: zonesSnap.size, passports: passportsSnap.size });
    }
    loadLeaders();
    loadStats();
  }, []);

  const handleConnectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask not found");
      const result = await connectWallet();
      if (result) {
        setWalletAddress(result.address);
        setProvider(result.provider);
        setSigner(result.signer);
        const balance = await getSlypBalance(result.provider, result.address);
        setSlypBalance(balance);
      }
    } catch (err) {
      console.error(err);
      setCustomAlert("Wallet connect failed. " + err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setCustomAlert("Logged out successfully.");
  };

  const handleMintPassport = async () => {
    if (!signer || !walletAddress) return setCustomAlert("Connect Wallet first.");
    if (passportId) return setCustomAlert("You already have a Passport.");
    try {
      setLoadingMessage("Minting Passport...");
      const tokenId = await mintPassport(signer, walletAddress, user?.uid);
      const balance = await getSlypBalance(provider, walletAddress);
      setSlypBalance(balance);
      if (user) await fetchPassport(user.uid, setPassportId, setPassportImage);
      setPassportId(tokenId);
      setShowMintModal(true);
    } catch (err) {
      setCustomAlert("Minting failed: " + err.message);
    } finally {
      setLoadingMessage("");
    }
  };

  const handleClaimZone = async () => {
    if (!signer || !walletAddress) return setCustomAlert("Connect Wallet first.");
    try {
      const zoneId = prompt("Enter Zone ID to claim (e.g., zone-000001):");
      if (!zoneId) return;
      const slypPrice = 50;
      setLoadingMessage(`Claiming ${zoneId}...`);
      const result = await claimZoneWithSlyPass(signer, zoneId, slypPrice, user?.uid);
      setCustomAlert(result);
      const updatedLeaderboard = await getLeaderboard();
      setLeaderboard(updatedLeaderboard);
    } catch (err) {
      setCustomAlert("Claim failed: " + err.message);
    } finally {
      setLoadingMessage("");
    }
  };

  const handleSetAlias = async (nickname) => {
    if (!walletAddress) return setCustomAlert("Connect Wallet first.");
    try {
      setLoadingMessage("Saving Nickname...");
      if (!user) return setCustomAlert("Login required.");
      await setUserAlias(user.uid, nickname);
      const data = await getLeaderboard();
      setLeaderboard(data);
      setCustomAlert("Nickname set successfully!");
    } catch (err) {
      setCustomAlert("Failed to set nickname: " + err.message);
    } finally {
      setLoadingMessage("");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = prompt("Type 'delete' to confirm account deletion:");
    if (confirmDelete !== 'delete') return setCustomAlert("Cancelled.");
    try {
      setLoadingMessage("Deleting Account...");
      if (!user) return setCustomAlert("Login required.");
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);
      setCustomAlert("Account deleted.");
    } catch (err) {
      setCustomAlert("Failed to delete: " + err.message);
    } finally {
      setLoadingMessage("");
    }
  };
  return (
    <div className="relative overflow-hidden min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 md:p-8 text-center space-y-6 relative z-10">
        <h1 className="text-4xl font-bold">Slyroze Nation</h1>
        <p>Claim zones, mint your passport, and earn SLYP rewards.</p>

        <div className="flex justify-center flex-wrap gap-4 mt-6">
          {user ? (
            <>
              <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">Logout</button>
              <button onClick={() => setShowNicknameModal(true)} className="bg-yellow-400 text-black py-2 px-4 rounded">Set Nickname</button>
              <button onClick={handleDeleteAccount} className="bg-red-700 text-white py-2 px-4 rounded">Delete Account</button>
            </>
          ) : (
            <button onClick={() => setShowAuthModal(true)} className="bg-neonPurple hover:bg-neonGreen text-black py-2 px-4 rounded">Login / Sign Up</button>
          )}
          <button onClick={handleConnectWallet} className="bg-slyrozePink hover:bg-slyrozeBlue text-white py-2 px-4 rounded">Connect Wallet</button>
          <button onClick={handleMintPassport} className="bg-purple-600 text-white py-2 px-4 rounded">Mint Passport</button>
          <button onClick={handleClaimZone} className="bg-green-500 text-black py-2 px-4 rounded">Claim Zone</button>
        </div>

        {walletAddress && <StatsCard walletAddress={walletAddress} slypBalance={slypBalance} />}

        {user && (
          <section className="flex flex-col items-center mt-8">
            <h2 className="text-2xl font-semibold mb-2">Your Passport</h2>
            {passportImage ? (
              <div className="flex flex-col items-center">
                <img src={passportImage} alt={`Passport #${passportId}`} className="w-40 h-60 rounded-xl border-4 border-yellow-400 shadow-lg mb-2 bg-gray-900 object-cover" />
                <p className="text-yellow-400 font-mono text-sm mb-1">Passport ID: {passportId}</p>
                <a href={`https://slyroze.com/metadata/passport/${passportId}.json`} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-xs underline">View Metadata</a>
              </div>
            ) : (
              <p className="text-gray-400 italic">No Passport found. Mint yours above.</p>
            )}
          </section>
        )}

        <section className="mt-10">
          <button onClick={() => setShowHowNationWorks(!showHowNationWorks)} className="bg-gray-800 py-3 px-6 rounded-lg hover:bg-gray-700 transition text-xl font-semibold">
            How Nation Works {showHowNationWorks ? '▲' : '▼'}
          </button>
          {showHowNationWorks && (
            <div className="mt-4 bg-gray-900 text-left p-6 rounded-lg space-y-3 text-sm text-gray-300">
              <p>Slyroze Nation is a gamified digital territory where users can claim land zones, mint NFT passports, and earn rewards using SLYP tokens.</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Login & connect wallet to begin.</li>
                <li>Claim unique zones using SlyPass tokens.</li>
                <li>Each claim is recorded on-chain and in Firestore.</li>
                <li>Top holders and contributors are ranked in real-time.</li>
                <li>Mint a passport NFT to unlock more ecosystem perks.</li>
              </ul>
            </div>
          )}
        </section>

        <Leaderboard data={leaderboard.slice(0, 5)} />
        <ZoneGrid signer={signer} walletAddress={walletAddress} />

        <div className="flex justify-center gap-6 text-2xl my-8">
          <a href="https://x.com/slyroze" target="_blank" className="hover:text-slyrozePink hover:scale-125 transition"><FaTwitter /></a>
          <a href="https://t.me/+L2sVdT1egVRiOTM1" target="_blank" className="hover:text-neonGreen hover:scale-125 transition"><FaTelegram /></a>
          <a href="https://t.me/slyrozetoken" target="_blank" className="hover:text-purple-400 hover:scale-125 transition"><FaTelegram /></a>
          <a href="https://www.instagram.com/slyroze" target="_blank" className="hover:text-yellow-300 hover:scale-125 transition"><FaInstagram /></a>
        </div>
      </main>

      {loadingMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <p className="text-xl text-white animate-pulse">{loadingMessage}</p>
        </div>
      )}

      {customAlert && <AlertModal message={customAlert} onClose={() => setCustomAlert("")} />}
      {showMintModal && <MintSuccessModal tokenId={passportId} onClose={() => setShowMintModal(false)} />}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showAboutPanel && <AboutPanel onClose={() => setShowAboutPanel(false)} />}
      {showDisclaimer && <DisclaimerPanel onClose={() => setShowDisclaimer(false)} />}
      {showNicknameModal && (
        <NicknameModal
          isOpen={showNicknameModal}
          onClose={() => setShowNicknameModal(false)}
          onSave={handleSetAlias}
        />
      )}
      <NationMapOverlay />
    </div>
  );
            }
