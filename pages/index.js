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
  const [showWhyChoose, setShowWhyChoose] = useState(false);

  return (
    <>
      <Head>
        <title>Slyroze | NFT Nation & SlyPass Token</title>
        <meta name="description" content="Slyroze Nation - NFT land zones, SlyPass utility token, rewards & community-driven ownership." />
        <meta property="og:title" content="Slyroze Nation" />
        <meta property="og:description" content="Mint. Claim. Earn with SlyPass in the Slyroze Nation." />
        <meta property="og:image" content="/og-image.png" />
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

        {/* Logos */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <img src="/slypass-logo.png" alt="SlyPass" className="h-10 w-10 rounded shadow bg-white/10 p-1" />
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <img src="/slyroze-nation-logo.png" alt="Nation" className="h-10 w-10 rounded shadow bg-white/10 p-1" />
        </div>
        <div className="flex justify-center pt-12">
          <img src="/slyroze-logo.png" alt="Slyroze" className="h-20 w-auto rounded-xl shadow bg-white/10 p-2" />
        </div>

        {/* Main Hero Section */}
        <main className="container mx-auto px-4 sm:px-6 md:px-8 text-center space-y-16 pt-12">
          <section className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              Welcome to <span className="text-neonPurple drop-shadow-glow">Slyroze</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
              Digital ownership with NFTs, SlyPass utility, and a community-driven Nation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://pancakeswap.finance/" target="_blank" className="bg-neonGreen text-black font-semibold py-3 px-6 rounded-xl shadow-xl hover:scale-105 transition">
                Buy on PancakeSwap
              </a>
              <Link href="/index" className="bg-slyrozeBlue text-black font-semibold py-3 px-6 rounded-xl shadow-xl hover:scale-105 transition">
                Enter Nation
              </Link>
              <Link href="/airdrop" className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-xl shadow-xl hover:scale-105 transition">
                Claim Airdrop
              </Link>
            </div>
            <div className="flex justify-center gap-6 mt-8 text-3xl">
              <a href="https://x.com/slyroze" target="_blank" className="hover:text-slyrozePink hover:scale-125 transition"><FaTwitter /></a>
              <a href="https://t.me/+L2sVdT1egVRiOTM1" target="_blank" className="hover:text-neonGreen hover:scale-125 transition"><FaTelegram /></a>
              <a href="https://t.me/slyrozetoken" target="_blank" className="hover:text-purple-400 hover:scale-125 transition"><FaTelegram /></a>
              <a href="https://www.instagram.com/slyroze" target="_blank" className="hover:text-yellow-300 hover:scale-125 transition"><FaInstagram /></a>
            </div>
          </section>
{/* Ecosystem Map Section */}
          <section className="space-y-10">
            <h2 className="text-4xl font-bold">Slyroze Ecosystem Map</h2>
            <div className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl border border-gray-700 bg-gray-800/50 backdrop-blur">
              <img src="/ecosystem.png" alt="Slyroze Ecosystem Map" className="w-full h-auto object-contain" />
            </div>
          </section>

          {/* Why Choose Slyroze Section */}
          <section className="space-y-6">
            <button onClick={() => setShowWhyChoose(!showWhyChoose)} className="w-full bg-gray-800/80 py-4 px-6 rounded-lg hover:bg-gray-700/80 transition">
              <h2 className="text-3xl font-semibold flex justify-between items-center">
                Why Choose Slyroze? <span>{showWhyChoose ? '-' : '+'}</span>
              </h2>
            </button>
            {showWhyChoose && (
              <div className="bg-gray-900/90 rounded-xl p-6 text-gray-300 space-y-3 shadow-lg text-left">
                <p>Verified Contracts with renounced ownership for maximum transparency.</p>
                <p>LP Lock to ensure community trust and long-term stability (coming soon).</p>
                <p>Community-driven Nation with land NFTs, Passport NFTs & utility tokens.</p>
                <p>Fair tokenomics with 1% tax & burn for SLY, and zero-tax SLYP utility token.</p>
                <p>Future Marketplace, UBI Features & DeFi integration planned.</p>
              </div>
            )}
          </section>

          {/* Badges Section */}
          <section className="space-y-6">
            <h2 className="text-3xl font-semibold">Security & Transparency</h2>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-gray-800/80 px-6 py-4 rounded-xl shadow text-center">
                <p className="text-xl font-bold text-neonPurple">Verified Contract</p>
                <p className="text-sm text-gray-400 mt-1">Audited & transparent</p>
              </div>
              <div className="bg-gray-800/80 px-6 py-4 rounded-xl shadow text-center">
                <p className="text-xl font-bold text-neonGreen">LP Lock (Soon)</p>
                <p className="text-sm text-gray-400 mt-1">Liquidity lock planned</p>
              </div>
              <div className="bg-gray-800/80 px-6 py-4 rounded-xl shadow text-center">
                <p className="text-xl font-bold text-yellow-400">Renounced Ownership (Soon)</p>
                <p className="text-sm text-gray-400 mt-1">For full decentralization</p>
              </div>
              <div className="bg-gray-800/80 px-6 py-4 rounded-xl shadow text-center">
                <p className="text-xl font-bold text-slyrozeBlue">Infrastructure & Liquidity</p>
                <p className="text-sm text-gray-400 mt-1">Enhanced (Coming Soon)</p>
              </div>
            </div>
          </section>
{/* Tokenomics Accordion */}
          <section className="space-y-10">
            <button onClick={() => setShowTokenomics(!showTokenomics)} className="w-full bg-gray-800/80 py-4 px-6 rounded-lg hover:bg-gray-700/80 transition">
              <h2 className="text-3xl font-semibold flex justify-between items-center">
                Tokenomics <span>{showTokenomics ? '-' : '+'}</span>
              </h2>
            </button>
            {showTokenomics && (
              <div className="bg-gray-900/90 rounded-xl p-6 text-gray-300 space-y-3 shadow-lg">
                <h3 className="text-2xl font-bold text-neonPurple">SlyRoze Token (SLY)</h3>
                <p>Total Supply: 100 Million SLY</p>
                <p>1% Tax on each transaction</p>
                <p>1% Burn on each transaction</p>
                <h3 className="text-2xl font-bold text-slyrozeBlue mt-4">SlyPass Token (SLYP)</h3>
                <p>Supply: 1 Million SLYP</p>
                <p>No taxes, no burns, pure utility for minting NFTs & claiming zones.</p>
              </div>
            )}

            {/* Roadmap Accordion */}
            <button onClick={() => setShowRoadmap(!showRoadmap)} className="w-full bg-gray-800/80 py-4 px-6 rounded-lg hover:bg-gray-700/80 transition">
              <h2 className="text-3xl font-semibold flex justify-between items-center">
                Roadmap <span>{showRoadmap ? '-' : '+'}</span>
              </h2>
            </button>
            {showRoadmap && (
              <ul className="bg-gray-900/90 rounded-xl p-6 text-gray-300 list-disc list-inside space-y-3 shadow-lg text-left">
                <li>Phase 1: Token Launch & Community Growth</li>
                <li>Phase 2: NFT Land Zones & Interactive Map</li>
                <li>Phase 3: SlyPass Minting & Airdrop Distribution</li>
                <li>Phase 4: UBI & Marketplace Features</li>
              </ul>
            )}

            {/* Litepaper Accordion */}
            <button onClick={() => setShowLitepaper(!showLitepaper)} className="w-full bg-gray-800/80 py-4 px-6 rounded-lg hover:bg-gray-700/80 transition">
              <h2 className="text-3xl font-semibold flex justify-between items-center">
                Litepaper <span>{showLitepaper ? '-' : '+'}</span>
              </h2>
            </button>
            {showLitepaper && (
              <div className="bg-gray-900/90 rounded-xl p-6 text-gray-300 space-y-3 shadow-lg text-left">
                <p>Detailed Slyroze Ecosystem, tokenomics, utility & roadmap.</p>
                <p>Focus: NFTs, SlyPass integration, community rewards.</p>
                <p>Download: <a href="/litepaper.pdf" className="underline text-neonPurple" target="_blank">Litepaper PDF</a></p>
              </div>
            )}
          </section>

          {/* Meme Tracker */}
          <section className="space-y-10">
            <h2 className="text-3xl font-semibold">Meme Tracker (Instagram Latest)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <a key={item} href="https://www.instagram.com/slyroze" target="_blank" rel="noopener noreferrer" className="block rounded-xl overflow-hidden shadow-md hover:scale-105 transition">
                  <img src={`/memes/meme-${item}.jpg`} alt={`Meme ${item}`} className="w-full h-auto object-cover" />
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-400">Follow us on Instagram for latest community memes.</p>
          </section>

          {/* Get Involved */}
          <section className="space-y-10">
            <h2 className="text-3xl font-semibold">Get Involved</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/index" className="bg-slyrozeBlue text-black font-semibold py-3 px-6 rounded-xl shadow hover:scale-105 transition">
                Enter Nation
              </Link>
              <Link href="/airdrop" className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-xl shadow hover:scale-105 transition">
                Claim Airdrop
              </Link>
              <a href="https://t.me/slyroze" target="_blank" className="bg-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow hover:scale-105 transition">
                Telegram Group
              </a>
              <a href="https://t.me/slyrozetoken" target="_blank" className="bg-purple-400 text-white font-semibold py-3 px-6 rounded-xl shadow hover:scale-105 transition">
                Telegram Channel
              </a>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center text-sm text-gray-500 mt-16 space-y-4">
            <div className="flex justify-center items-center gap-6">
              <div className="bg-gray-800/80 p-2 rounded-lg">
                <img src="/slypass-logo.png" alt="SlyPass Logo" className="h-10 w-auto" />
              </div>
              <div className="bg-gray-800/80 p-3 rounded-xl shadow-xl">
                <img src="/slyroze-logo.png" alt="Slyroze Logo" className="h-14 w-auto" />
              </div>
              <div className="bg-gray-800/80 p-2 rounded-lg">
                <img src="/slyroze-nation-logo.png" alt="Slyroze Nation Logo" className="h-10 w-auto" />
              </div>
            </div>
            <p>&copy; 2025 Slyroze. All rights reserved.</p>
            <div className="flex justify-center gap-6 text-2xl">
              <a href="https://x.com/slyroze" target="_blank" className="hover:text-slyrozePink hover:scale-125 transition"><FaTwitter /></a>
              <a href="https://t.me/+L2sVdT1egVRiOTM1" target="_blank" className="hover:text-neonGreen hover:scale-125 transition"><FaTelegram /></a>
              <a href="https://t.me/slyrozetoken" target="_blank" className="hover:text-purple-400 hover:scale-125 transition"><FaTelegram /></a>
              <a href="https://www.instagram.com/slyroze" target="_blank" className="hover:text-yellow-300 hover:scale-125 transition"><FaInstagram /></a>
            </div>
          </footer>
