// Chunk 1 of 3: Nation.js updates to show passport image + tokenId

import { useEffect, useState } from 'react'; import { signOut, onAuthStateChanged, deleteUser } from "firebase/auth"; import { collection, getDocs, doc, deleteDoc, getDoc } from "firebase/firestore"; import { auth, db } from '../utils/firebase'; import Header from '../components/Header'; import HeroBackground from '../components/HeroBackground'; import NationMapOverlay from '../components/NationMapOverlay'; import AuthModal from '../components/AuthModal'; import AboutPanel from '../components/AboutPanel'; import DisclaimerPanel from '../components/DisclaimerPanel'; import NicknameModal from '../components/NicknameModal'; import StatsCard from '../components/StatsCard'; import Leaderboard from '../components/Leaderboard'; import ZoneGrid from '../components/ZoneGrid'; import { connectWallet } from '../utils/wallet'; import { getSlypBalance } from '../utils/slyp'; import { mintPassport } from '../utils/passport'; import { claimZoneWithSlyPass } from '../utils/zone'; import { getLeaderboard } from '../utils/leaderboard'; import { setUserAlias } from '../utils/nickname'; import { FaTelegram, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Nation() { const [walletAddress, setWalletAddress] = useState(""); const [slypBalance, setSlypBalance] = useState(""); const [provider, setProvider] = useState(null); const [signer, setSigner] = useState(null); const [leaderboard, setLeaderboard] = useState([]); const [loadingMessage, setLoadingMessage] = useState(""); const [user, setUser] = useState(null); const [showAuthModal, setShowAuthModal] = useState(false); const [showAboutPanel, setShowAboutPanel] = useState(false); const [showDisclaimer, setShowDisclaimer] = useState(false); const [showNicknameModal, setShowNicknameModal] = useState(false); const [showHowNationWorks, setShowHowNationWorks] = useState(false); const [stats, setStats] = useState({ users: 0, zones: 0, passports: 0 }); const [passportId, setPassportId] = useState(null);

useEffect(() => { const unsubscribe = onAuthStateChanged(auth, setUser); return () => unsubscribe(); }, []);

useEffect(() => { async function loadLeaders() { const data = await getLeaderboard(); setLeaderboard(data); } async function loadStats() { const usersSnap = await getDocs(collection(db, "users")); const zonesSnap = await getDocs(collection(db, "claimed_zones")); const passportsSnap = await getDocs(collection(db, "passports")); setStats({ users: usersSnap.size, zones: zonesSnap.size, passports: passportsSnap.size }); } loadLeaders(); loadStats(); }, []);
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

          {/* Display user's Passport if minted */}
          {passportId && (
            <div className="mt-10 text-center">
              <h3 className="text-xl font-semibold mb-2">Your Passport</h3>
              <img
                src={`https://slyroze.com/metadata/passport/${passportId}.json`}
                alt={`Passport NFT ${passportId}`}
                className="mx-auto rounded-lg shadow-lg w-64 h-auto border border-gray-700"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fallback-passport.png";
                }}
              />
              <p className="text-sm text-gray-400 mt-2">Token ID: {passportId}</p>
            </div>
          )}
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
      {showNicknameModal && <NicknameModal isOpen={showNicknameModal} onClose={() => setShowNicknameModal(false)} onSave={handleSetAlias} />}

      {/* Nation Map Background Overlay */}
      <NationMapOverlay />
    </div>
  );
          }
