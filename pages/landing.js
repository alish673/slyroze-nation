import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import { FaTelegram, FaTwitter, FaInstagram } from 'react-icons/fa';
import HeroBackground from '../components/HeroBackground';
import Header from '../components/Header';

export default function Landing() {
  const [showLitepaper, setShowLitepaper] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [showTokenomics, setShowTokenomics] = useState(false);

  return (
    <>
      <Head>
        <title>Slyroze | NFT Nation & SlyPass Token</title>
        <meta name="description" content="Slyroze Nation - NFT land zones, SlyPass utility token, rewards & community-driven ownership." />
        <meta name="keywords" content="Slyroze, SlyPass, NFT Land, Crypto, Blockchain Nation, Token, Airdrop, Web3" />
        <link rel="canonical" href="https://slyroze.com/" />
      </Head>

      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}
      </Script>

      <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
        <HeroBackground />
        <Header />

        <main className="container mx-auto px-4 sm:px-6 md:px-8 text-center space-y-16 pt-12">
          <section className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              Welcome to <span className="text-neonPurple drop-shadow-glow">Slyroze</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed">
              Digital ownership with NFTs, SlyPass utility, and a community-driven Nation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://pancakeswap.finance/" target="_blank" rel="noopener noreferrer" className="bg-neonGreen text-black font-semibold py-3 px-6 rounded-xl shadow-xl hover:scale-105 transition">
                Buy on PancakeSwap
              </a>
              <Link href="/" className="bg-slyrozeBlue text-black font-semibold py-3 px-6 rounded-xl shadow-xl hover:scale-105 transition">
                Enter Nation
              </Link>
              <Link href="/airdrop" className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-xl shadow-xl hover:scale-105 transition">
                Claim Airdrop
              </Link>
            </div>
<div className="flex justify-center gap-6 mt-8 text-3xl">
              <a href="https://x.com/slyroze" target="_blank" rel="noopener noreferrer" className="hover:text-slyrozePink hover:scale-125 transition"><FaTwitter /></a>
              <a href="https://t.me/+L2sVdT1egVRiOTM1" target="_blank" rel="noopener noreferrer" className="hover:text-neonGreen hover:scale-125 transition"><FaTelegram /></a>
              <a href="https://t.me/slyrozetoken" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 hover:scale-125 transition"><FaTelegram /></a>
              <a href="https://www.instagram.com/slyroze" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 hover:scale-125 transition"><FaInstagram /></a>
            </div>
          </section>

          <section className="space-y-10">
            <div>
              <button onClick={() => setShowTokenomics(!showTokenomics)} className="w-full bg-gray-800/80 py-4 px-6 rounded-lg hover:bg-gray-700/80 transition">
                <h2 className="text-3xl font-semibold flex justify-between items-center">
                  Tokenomics <span>{showTokenomics ? '-' : '+'}</span>
                </h2>
              </button>
              {showTokenomics && (
                <div className="bg-gray-900/90 rounded-xl p-6 text-gray-300 space-y-3">
                  <p>Total Supply: 100 Million SLY</p>
                  <p>SlyPass Supply: 1 Million SLYP</p>
                  <p>No taxes, fair distribution.</p>
                  <p>Community-driven rewards ecosystem.</p>
                </div>
              )}
            </div>

            <div>
              <button onClick={() => setShowRoadmap(!showRoadmap)} className="w-full bg-gray-800/80 py-4 px-6 rounded-lg hover:bg-gray-700/80 transition">
                <h2 className="text-3xl font-semibold flex justify-between items-center">
                  Roadmap Highlights <span>{showRoadmap ? '-' : '+'}</span>
                </h2>
              </button>
              {showRoadmap && (
                <ul className="bg-gray-900/90 rounded-xl p-6 text-gray-300 list-disc list-inside space-y-3 text-left">
                  <li>Phase 1: Token Launch & Community</li>
                  <li>Phase 2: Nation Map & Land Zones</li>
                  <li>Phase 3: SlyPass Minting & Airdrop</li>
                  <li>Phase 4: Marketplace & UBI Features</li>
                </ul>
              )}
            </div>

            <div>
              <button onClick={() => setShowLitepaper(!showLitepaper)} className="w-full bg-gray-800/80 py-4 px-6 rounded-lg hover:bg-gray-700/80 transition">
                <h2 className="text-3xl font-semibold flex justify-between items-center">
                  Litepaper <span>{showLitepaper ? '-' : '+'}</span>
                </h2>
              </button>
              {showLitepaper && (
                <div className="bg-gray-900/90 rounded-xl p-6 text-gray-300 space-y-3 text-left">
                  <p>The Slyroze Litepaper explains the ecosystem, tokenomics, vision, and utility for community ownership.</p>
                  <p>Includes: NFT zones, SlyPass, Rewards, and future roadmap.</p>
                  <p>Download: <a href="/litepaper.pdf" target="_blank" rel="noopener noreferrer" className="underline text-neonPurple">Litepaper PDF</a></p>
                </div>
              )}
            </div>
          </section>
<section className="space-y-10">
            <h2 className="text-3xl font-semibold">Meme Tracker (Instagram Latest)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <a key={item} href="https://www.instagram.com/slyroze" target="_blank" rel="noopener noreferrer" className="block rounded-xl overflow-hidden shadow-md hover:scale-105 transition">
                  <img src={`/memes/meme-${item}.jpg`} alt={`Meme ${item}`} className="w-full h-auto object-cover" />
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-400">Follow us for the latest memes & updates.</p>
          </section>

          <section className="space-y-10">
            <h2 className="text-3xl font-semibold">Get Involved</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/index" className="bg-slyrozeBlue text-black font-semibold py-3 px-6 rounded-xl shadow hover:scale-105 transition">
                Enter Slyroze Nation
              </Link>
              <Link href="/airdrop" className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-xl shadow hover:scale-105 transition">
                Claim Airdrop
              </Link>
              <a href="https://t.me/slyroze" target="_blank" rel="noopener noreferrer" className="bg-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow hover:scale-105 transition">
                Join Telegram Group
              </a>
              <a href="https://t.me/slyrozetoken" target="_blank" rel="noopener noreferrer" className="bg-purple-400 text-white font-semibold py-3 px-6 rounded-xl shadow hover:scale-105 transition">
                Telegram Channel
              </a>
            </div>
          </section>

          <footer className="text-center text-sm text-gray-500 mt-16 space-y-2">
            <p>&copy; 2025 Slyroze. All rights reserved.</p>
            <div className="flex justify-center gap-6 mt-2 text-2xl">
              <a href="https://x.com/slyroze" target="_blank" rel="noopener noreferrer" className="hover:text-slyrozePink hover:scale-125 transition"><FaTwitter /></a>
              <a href="https://t.me/+L2sVdT1egVRiOTM1" target="_blank" rel="noopener noreferrer" className="hover:text-neonGreen hover:scale-125 transition"><FaTelegram /></a>
              <a href="https://t.me/slyrozetoken" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 hover:scale-125 transition"><FaTelegram /></a>
              <a href="https://www.instagram.com/slyroze" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 hover:scale-125 transition"><FaInstagram /></a>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
              }
