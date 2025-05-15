import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { FaTelegram, FaTwitter, FaInstagram, FaGlobe } from 'react-icons/fa';
import HeroBackground from '../components/HeroBackground';
import Header from '../components/Header';
import AuthModal from '../components/AuthModal';

export default function Landing() {
  const [showLitepaper, setShowLitepaper] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [showTokenomics, setShowTokenomics] = useState(false);

  return (
    <>
      <Head>
        <title>Slyroze | Blockchain NFT Nation & SlyPass Token</title>
        <meta name="description" content="Slyroze Nation - NFT land zones, SlyPass utility token, rewards & community-driven ownership." />
        <meta name="keywords" content="Slyroze, SlyPass, NFT Land, Crypto, Blockchain Nation, Token, Airdrop, Web3" />
        <meta property="og:title" content="Slyroze Nation" />
        <meta property="og:description" content="Mint. Claim. Earn with SlyPass in the Slyroze Nation." />
        <meta property="og:image" content="/og-image.png" />
        <link rel="canonical" href="https://slyroze.com/" />
      </Head>

      <div className="relative overflow-hidden min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
        <HeroBackground />
        <Header />

        <main className="container mx-auto px-4 sm:px-6 md:px-8 text-center space-y-14">
          <section className="space-y-6 pt-10">
            <h1 className="text-5xl font-bold">Welcome to <span className="text-neonPurple">Slyroze</span></h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-300">
              Redefining digital ownership with NFTs, land zones, SlyPass utility, and community-driven rewards.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://pancakeswap.finance/" target="_blank" className="bg-neonGreen text-black py-3 px-6 rounded shadow hover:scale-105 transition">
                Buy on PancakeSwap
              </a>
              <Link href="/nation" className="bg-slyrozeBlue text-black py-3 px-6 rounded shadow hover:scale-105 transition">
                Enter Slyroze Nation
              </Link>
              <Link href="/airdrop" className="bg-yellow-400 text-black py-3 px-6 rounded shadow hover:scale-105 transition">
                Claim Airdrop
              </Link>
            </div>
            <div className="flex justify-center gap-6 mt-6 text-2xl">
              <a href="https://x.com/slyroze" target="_blank" className="hover:text-slyrozePink hover:scale-125 transition"><FaTwitter /></a>
              <a href="https://t.me/slyroze" target="_blank" className="hover:text-neonGreen hover:scale-125 transition"><FaTelegram /></a>
              <a href="https://www.instagram.com/slyroze" target="_blank" className="hover:text-yellow-300 hover:scale-125 transition"><FaInstagram /></a>
              <a href="https://slyroze.com" target="_blank" className="hover:text-neonPurple hover:scale-125 transition"><FaGlobe /></a>
            </div>
          </section>
  <section className="space-y-10">
            <div className="space-y-4">
              <button onClick={() => setShowTokenomics(!showTokenomics)} className="w-full bg-gray-800 py-3 px-6 rounded shadow hover:bg-gray-700 transition text-left">
                <h2 className="text-3xl font-semibold flex justify-between items-center">
                  Tokenomics <span>{showTokenomics ? '-' : '+'}</span>
                </h2>
              </button>
              {showTokenomics && (
                <div className="bg-gray-900 rounded p-4 text-gray-300 space-y-2">
                  <p>Total Supply: 100 Million SLY</p>
                  <p>SlyPass Supply: 10,000</p>
                  <p>No taxes, fair distribution.</p>
                  <p>Designed for sustainable growth & community incentives.</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <button onClick={() => setShowRoadmap(!showRoadmap)} className="w-full bg-gray-800 py-3 px-6 rounded shadow hover:bg-gray-700 transition text-left">
                <h2 className="text-3xl font-semibold flex justify-between items-center">
                  Roadmap Highlights <span>{showRoadmap ? '-' : '+'}</span>
                </h2>
              </button>
              {showRoadmap && (
                <ul className="bg-gray-900 rounded p-4 text-gray-300 list-disc list-inside space-y-2 text-left">
                  <li>Phase 1: Token Launch & Community Building</li>
                  <li>Phase 2: Interactive Nation Map & NFT Land Claims</li>
                  <li>Phase 3: SlyPass Minting & Airdrops</li>
                  <li>Phase 4: Marketplace & UBI Features</li>
                </ul>
              )}
            </div>

            <div className="space-y-4">
              <button onClick={() => setShowLitepaper(!showLitepaper)} className="w-full bg-gray-800 py-3 px-6 rounded shadow hover:bg-gray-700 transition text-left">
                <h2 className="text-3xl font-semibold flex justify-between items-center">
                  Litepaper <span>{showLitepaper ? '-' : '+'}</span>
                </h2>
              </button>
              {showLitepaper && (
                <div className="bg-gray-900 rounded p-4 text-gray-300 space-y-2 text-left">
                  <p>Slyroze Litepaper outlines the full ecosystem, token utility, roadmap, and vision for decentralized digital ownership.</p>
                  <p>Focus: NFT zones, community rewards, SlyPass integration, long-term growth.</p>
                  <p>Download: <a href="/litepaper.pdf" className="underline text-neonPurple" target="_blank">Litepaper PDF</a></p>
                </div>
              )}
            </div>
          </section>

          <section className="space-y-10">
            <h2 className="text-3xl font-semibold">Meme Tracker (Instagram Latest)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <a key={item} href="https://www.instagram.com/slyroze" target="_blank" rel="noopener noreferrer" className="block rounded overflow-hidden shadow hover:scale-105 transition">
                  <img src={`/memes/meme-${item}.jpg`} alt={`Meme ${item}`} className="w-full h-auto object-cover rounded" />
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-400">Follow us on Instagram for fresh memes and community moments.</p>
          </section>
<section className="space-y-10">
            <h2 className="text-3xl font-semibold">Get Involved</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/nation" className="bg-slyrozeBlue text-black py-3 px-6 rounded shadow hover:scale-105 transition">
                Enter Slyroze Nation
              </Link>
              <Link href="/airdrop" className="bg-yellow-400 text-black py-3 px-6 rounded shadow hover:scale-105 transition">
                Claim Airdrop
              </Link>
              <a href="https://t.me/slyroze" target="_blank" className="bg-purple-600 text-white py-3 px-6 rounded shadow hover:scale-105 transition">
                Join Telegram Community
              </a>
            </div>
          </section>

          <footer className="text-center text-sm text-gray-500 mt-16 space-y-2">
            <p>&copy; 2025 Slyroze. All rights reserved.</p>
            <div className="flex justify-center gap-6 mt-2 text-xl">
              <a href="https://x.com/slyroze" target="_blank" className="hover:text-slyrozePink hover:scale-125 transition"><FaTwitter /></a>
              <a href="https://t.me/slyroze" target="_blank" className="hover:text-neonGreen hover:scale-125 transition"><FaTelegram /></a>
              <a href="https://t.me/slyrozetoken" target="_blank" className="hover:text-purple-400 hover:scale-125 transition"><FaTelegram /></a>
              <a href="https://www.instagram.com/slyroze" target="_blank" className="hover:text-yellow-300 hover:scale-125 transition"><FaInstagram /></a>
            </div>
          </footer>
        </main>

        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </div>
    </>
  );
                }
