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
  const [showWhy, setShowWhy] = useState(false);

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

        {/* Logo Row */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <img src="/slypass-logo.png" alt="SlyPass Logo" className="h-10 w-10 rounded-lg shadow-lg bg-white/10 p-1" />
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <img src="/slyroze-nation-logo.png" alt="Nation Logo" className="h-10 w-10 rounded-lg shadow-lg bg-white/10 p-1" />
        </div>
        <div className="flex justify-center pt-12">
          <img src="/slyroze-logo.png" alt="Slyroze Logo" className="h-20 w-auto rounded-xl shadow-xl bg-white/10 p-2" />
        </div>

        <main className="container mx-auto px-4 sm:px-6 md:px-8 text-center space-y-16 pt-12">
          <section className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              Welcome to <span className="text-neonPurple drop-shadow-glow">Slyroze</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed">
              Digital ownership with NFTs, SlyPass utility, and a community-driven Nation.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://pancakeswap.finance/" target="_blank" className="bg-neonGreen text-black font-semibold py-3 px-6 rounded-xl shadow-xl hover:scale-105 transition-all">
                Buy on PancakeSwap
              </a>
              <Link href="/nation" passHref>
                <a className="bg-slyrozeBlue text-black font-semibold py-3 px-6 rounded-xl shadow-xl hover:scale-105 transition-all">
                  Enter Nation
                </a>
              </Link>
              <Link href="/airdrop" passHref>
                <a className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-xl shadow-xl hover:scale-105 transition-all">
                  Claim Airdrop
                </a>
              </Link>
            </div>
          </section>
{/* Social Media Icons above Ecosystem section */}
          <div className="flex justify-center gap-6 text-xl mt-8">
            <a href="https://x.com/slyroze" target="_blank" rel="noopener noreferrer" className="hover:text-slyrozePink hover:scale-125 transition"><FaTwitter /></a>
            <a href="https://t.me/+L2sVdT1egVRiOTM1" target="_blank" rel="noopener noreferrer" className="hover:text-neonGreen hover:scale-125 transition"><FaTelegram /></a>
            <a href="https://t.me/slyrozetoken" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 hover:scale-125 transition"><FaTelegram /></a>
            <a href="https://www.instagram.com/slyroze" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 hover:scale-125 transition"><FaInstagram /></a>
          </div>

          {/* Ecosystem Map */}
          <section className="space-y-10">
            <h2 className="text-3xl font-semibold">Slyroze Ecosystem</h2>
            <div className="rounded-xl overflow-hidden shadow-xl border border-gray-700">
              <img src="/ecosystem.png" alt="Slyroze Ecosystem Map" className="w-full object-cover" />
            </div>
          </section>

          {/* Why Choose Slyroze Section */}
          <section className="space-y-6">
            <button onClick={() => setShowWhy(!showWhy)} className="w-full bg-gray-800/80 py-4 px-6 rounded-lg hover:bg-gray-700/80 transition">
              <h2 className="text-3xl font-semibold flex justify-between items-center">
                Why Choose Slyroze <span>{showWhy ? '-' : '+'}</span>
              </h2>
            </button>
            {showWhy && (
              <div className="bg-gray-900/90 rounded-xl p-6 text-gray-300 space-y-3 shadow-lg text-left">
                <ul className="list-disc list-inside space-y-2">
                  <li>Community-driven blockchain ecosystem</li>
                  <li>Utility-backed NFT minting via SlyPass</li>
                  <li>Real-time land ownership and interactive maps</li>
                  <li>UBI & fair airdrops to all participants</li>
                  <li>Transparent, auditable token contracts</li>
                </ul>
              </div>
            )}
          </section>

          {/* Tokenomics Section */}
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
                <hr className="my-4 border-gray-700" />
                <h3 className="text-2xl font-bold text-slyrozeBlue">SlyPass Token (SLYP)</h3>
                <p>Supply: 1 Million SLYP</p>
                <p>No taxes, no burns, direct utility for NFT minting & zone claiming.</p>
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
                <li>Phase 1: Token Launch & Community Building</li>
                <li>Phase 2: Interactive Nation Map & NFT Land Claims</li>
                <li>Phase 3: SlyPass Minting & Airdrops</li>
                <li>Phase 4: Marketplace & UBI Features</li>
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
                <p>The Slyroze Litepaper covers our full vision, ecosystem, roadmap and token utility.</p>
                <p>Includes: NFT zone logic, Passport system, token flows, and UBI mechanics.</p>
                <p>Download: <a href="/litepaper.pdf" className="underline text-neonPurple" target="_blank">Litepaper PDF</a></p>
              </div>
            )}
          </section>

          {/* Trust Badges */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">Verified & Secure</h2>
            <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-300">
              <span className="bg-green-700/60 px-4 py-2 rounded-full">Contract Verified</span>
              <span className="bg-yellow-600/60 px-4 py-2 rounded-full">Liquidity Lock (coming soon)</span>
              <span className="bg-blue-600/60 px-4 py-2 rounded-full">Ownership Renounced (planned)</span>
              <span className="bg-purple-600/60 px-4 py-2 rounded-full">Infrastructure Lock (soon)</span>
            </div>
          </section>

          {/* Footer with Logos */}
          <footer className="text-center text-sm text-gray-500 mt-16 space-y-4">
            <div className="flex justify-center items-center gap-6">
              <div className="bg-gray-800/80 p-2 rounded-lg">
                <img src="/slypass-logo.png" alt="SlyPass Logo" className="h-10 w-auto" />
              </div>
              <div className="bg-gray-800/80 p-3 rounded-xl shadow-xl">
                <img src="/slyroze-logo.png" alt="Slyroze Main Logo" className="h-14 w-auto" />
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
        </main>
      </div>
    </>
  );
  }
