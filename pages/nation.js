import { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged, deleteUser } from "firebase/auth";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
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
import { ethers } from "ethers";

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      if (usr) fetchPassport(usr.uid);
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
      alert("Wallet connect failed. " + err.message);
    }
  };

  async function fetchPassport(uid) {
    try {
      const passSnap = await getDocs(collection(db, "passports"));
      let found = null;
      passSnap.forEach((doc) => {
        if (doc.data().ownerUid === uid) found = doc;
      });
      if (found) {
        const id = found.data().tokenId || found.id;
        setPassportId(id);
        const res = await fetch(`https://slyroze.com/metadata/passport/${id}.json`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.image) {
            setPassportImage(data.image);
          } else {
            console.warn("Metadata missing image field:", data);
            setPassportImage(null);
          }
        } else {
          console.warn("Metadata fetch failed:", res.status);
          setPassportImage(null);
        }
      } else {
        setPassportId(null);
        setPassportImage(null);
      }
    } catch (err) {
      console.error("Failed to load passport metadata:", err);
      setPassportId(null);
      setPassportImage(null);
    }
  }

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully.");
  };
  const handleMintPassport = async () => {
    if (!signer || !walletAddress) return alert("Connect Wallet first.");
    try {
      setLoadingMessage("Minting Passport...");
      const tokenId = await mintPassport(signer, walletAddress);
      const balance = await getSlypBalance(provider, walletAddress);
      setSlypBalance(balance);
      if (user) await fetchPassport(user.uid);
    } catch (err) {
      alert("Minting failed: " + err.message);
    } finally {
      setLoadingMessage("");
    }
  };

  const handleClaimZone = async () => {
    if (!signer || !walletAddress) return alert("Connect Wallet first.");
    try {
      const zoneId = prompt("Enter Zone ID to claim (e.g., zone-000001):");
      if (!zoneId) return;
      const slypPrice = 50;
      setLoadingMessage(`Claiming ${zoneId}...`);
      const result = await claimZoneWithSlyPass(signer, zoneId, slypPrice);
      alert(result);
      const updatedLeaderboard = await getLeaderboard();
      setLeaderboard(updatedLeaderboard);
    } catch (err) {
      alert("Claim failed: " + err.message);
    } finally {
      setLoadingMessage("");
    }
  };

  const handleSetAlias = async (nickname) => {
    if (!walletAddress) return alert("Connect Wallet first.");
    try {
      setLoadingMessage("Saving Nickname...");
      if (!user) return alert("Login required.");
      await setUserAlias(user.uid, nickname);
      const data = await getLeaderboard();
      setLeaderboard(data);
      alert("Nickname set successfully!");
    } catch (err) {
      alert("Failed to set nickname: " + err.message);
    } finally {
      setLoadingMessage("");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = prompt("Type 'delete' to confirm account deletion:");
    if (confirmDelete !== 'delete') return alert("Cancelled.");
    try {
      setLoadingMessage("Deleting Account...");
      if (!user) return alert("Login required.");
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);
      alert("Account deleted.");
    } catch (err) {
      alert("Failed to delete: " + err.message);
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
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">Logout</button>
          ) : (
            <button onClick={() => setShowAuthModal(true)} className="bg-neonPurple hover:bg-neonGreen text-black py-2 px-4 rounded">Login / Sign Up</button>
          )}
          <button onClick={handleConnectWallet} className="bg-slyrozePink hover:bg-slyrozeBlue text-white py-2 px-4 rounded">Connect Wallet</button>
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
              <p className="text-gray-400 italic">No Passport found. Mint yours below!</p>
            )}
          </section>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
          <button onClick={() => setShowAboutPanel(true)} className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded">About Slyroze</button>
          <button onClick={() => setShowDisclaimer(true)} className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded">Disclaimer</button>
          {user && (
            <>
              <button onClick={() => setShowNicknameModal(true)} className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded">Set Nickname</button>
              <button onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">Delete Account</button>
            </>
          )}
          <button onClick={handleMintPassport} className="bg-neonPurple text-white py-2 px-4 rounded shadow-neon">Mint Passport</button>
          <button onClick={handleClaimZone} className="bg-neonGreen text-black py-2 px-4 rounded shadow-neon">Claim Zone</button>
        </div>

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

        <section className="mt-10 text-gray-300">
          <h2 className="text-2xl font-semibold mb-4">Nation Stats</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-gray-800 p-4 rounded-xl shadow text-center">
              <p className="text-3xl font-bold">{stats.users}</p>
              <p>Active Users</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl shadow text-center">
              <p className="text-3xl font-bold">{stats.zones}</p>
              <p>Claimed Zones</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl shadow text-center">
              <p className="text-3xl font-bold">{stats.passports}</p>
              <p>Passports Minted</p>
            </div>
          </div>
        </section>

        <Leaderboard data={leaderboard.slice(0, 5)} />

        <div className="flex justify-center gap-6 text-2xl my-8">
          <a href="https://x.com/slyroze" target="_blank" className="hover:text-slyrozePink hover:scale-125 transition"><FaTwitter /></a>
          <a href="https://t.me/+L2sVdT1egVRiOTM1" target="_blank" className="hover:text-neonGreen hover:scale-125 transition"><FaTelegram /></a>
          <a href="https://t.me/slyrozetoken" target="_blank" className="hover:text-purple-400 hover:scale-125 transition"><FaTelegram /></a>
          <a href="https://www.instagram.com/slyroze" target="_blank" className="hover:text-yellow-300 hover:scale-125 transition"><FaInstagram /></a>
        </div>

        <ZoneGrid signer={signer} walletAddress={walletAddress} />
      </main>

      {loadingMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <p className="text-xl text-white animate-pulse">{loadingMessage}</p>
        </div>
      )}

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
