import { useEffect, useState } from 'react'; import { signOut, onAuthStateChanged, deleteUser } from "firebase/auth"; import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; import { auth, db } from '../utils/firebase'; import Header from '../components/Header'; import HeroBackground from '../components/HeroBackground'; import NationMapOverlay from '../components/NationMapOverlay'; import AuthModal from '../components/AuthModal'; import AboutPanel from '../components/AboutPanel'; import DisclaimerPanel from '../components/DisclaimerPanel'; import NicknameModal from '../components/NicknameModal'; import StatsCard from '../components/StatsCard'; import Leaderboard from '../components/Leaderboard'; import ZoneGrid from '../components/ZoneGrid'; import { connectWallet } from '../utils/wallet'; import { getSlypBalance } from '../utils/slyp'; import { mintPassport } from '../utils/passport'; import { claimZoneWithSlyPass } from '../utils/zone'; import { getLeaderboard } from '../utils/leaderboard'; import { setUserAlias } from '../utils/nickname'; import { FaTelegram, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Nation() { const [walletAddress, setWalletAddress] = useState(""); const [slypBalance, setSlypBalance] = useState(""); const [provider, setProvider] = useState(null); const [signer, setSigner] = useState(null); const [leaderboard, setLeaderboard] = useState([]); const [loadingMessage, setLoadingMessage] = useState(""); const [user, setUser] = useState(null); const [showAuthModal, setShowAuthModal] = useState(false); const [showAboutPanel, setShowAboutPanel] = useState(false); const [showDisclaimer, setShowDisclaimer] = useState(false); const [showNicknameModal, setShowNicknameModal] = useState(false); const [showHowNationWorks, setShowHowNationWorks] = useState(false); const [stats, setStats] = useState({ users: 0, zones: 0, passports: 0 }); const [passportTokenId, setPassportTokenId] = useState(null);

useEffect(() => { const unsubscribe = onAuthStateChanged(auth, setUser); return () => unsubscribe(); }, []);

useEffect(() => { async function loadLeaders() { const data = await getLeaderboard(); setLeaderboard(data); } async function loadStats() { const usersSnap = await getDocs(collection(db, "users")); const zonesSnap = await getDocs(collection(db, "claimed_zones")); const passportsSnap = await getDocs(collection(db, "passports")); setStats({ users: usersSnap.size, zones: zonesSnap.size, passports: passportsSnap.size }); } loadLeaders(); loadStats(); }, []);

const handleConnectWallet = async () => { const result = await connectWallet(); if (result) { setWalletAddress(result.address); setProvider(result.provider); setSigner(result.signer); const balance = await getSlypBalance(result.provider, result.address); setSlypBalance(balance); } };

<div className="flex justify-center flex-wrap gap-4 mt-6">
          {user ? (
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">Logout</button>
          ) : (
            <button onClick={() => setShowAuthModal(true)} className="bg-neonPurple hover:bg-neonGreen text-black py-2 px-4 rounded">Login / Sign Up</button>
          )}
          <button onClick={handleConnectWallet} className="bg-slyrozePink hover:bg-slyrozeBlue text-white py-2 px-4 rounded">Connect Wallet</button>
        </div>

        {walletAddress && <StatsCard walletAddress={walletAddress} slypBalance={slypBalance} />}

        {passportTokenId && (
          <div className="mt-6 text-sm text-green-400">
            Passport Minted! Token ID: <strong>{passportTokenId}</strong>
            <br />
            <img
              src={`https://slyroze.com/metadata/passport/${passportTokenId}.png`}
              alt="Your Passport"
              className="mx-auto mt-3 rounded-lg border border-purple-600 shadow-lg w-40"
            />
          </div>
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

        {/* How Nation Works Section */}
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

        {/* Real-time Nation Stats */}
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

        {/* Top 5 Zone Holders */}
        <Leaderboard data={leaderboard.slice(0, 5)} />

        {/* Social Icons */}
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

      {/* Map Background Overlay */}
      <NationMapOverlay />
    </div>
  );
                  }
