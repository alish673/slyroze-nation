import { useState } from 'react';
import Link from 'next/link';
import HeroBackground from '../components/HeroBackground';
import Header from '../components/Header';
import AuthModal from '../components/AuthModal';

export default function Landing() {
  const [showLitepaper, setShowLitepaper] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <HeroBackground />
      <Header />

      <main className="container mx-auto p-4 sm:p-6 md:p-8 text-center space-y-10">
        <section className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold">Welcome to Slyroze</h1>
          <p className="max-w-xl mx-auto text-gray-300">
            A blockchain-powered ecosystem redefining digital ownership. Explore, earn, and grow with Slyroze Nation and the SlyPass utility token.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://pancakeswap.finance/" target="_blank" rel="noopener noreferrer" className="bg-neonGreen text-black py-2 px-6 rounded shadow hover:scale-105 transition">
              Buy on PancakeSwap
            </a>
            <a href="https://t.me/slyroze" target="_blank" rel="noopener noreferrer" className="bg-slyrozePink text-white py-2 px-6 rounded shadow hover:scale-105 transition">
              Join the Community
            </a>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">SlyPass & Slyroze Token</h2>
          <p className="max-w-xl mx-auto text-gray-300">
            SlyPass (SLYP) fuels interactions within Slyroze Nation — from minting passports to claiming land zones. Slyroze Token (SLY) rewards contributors and supports ecosystem growth.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Ecosystem & Utility</h2>
          <p className="max-w-xl mx-auto text-gray-300">
            Slyroze Nation offers land zones as NFTs, leaderboards, and dynamic airdrops. Engage, climb the ranks, and own digital territory with real utility.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Tokenomics</h2>
          <p className="max-w-xl mx-auto text-gray-300">
            Total Supply: 100 Million SLY | 10,000 SlyPass | No taxes, fair distribution. Designed for sustainable growth and community incentives.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Roadmap Highlights</h2>
          <ul className="max-w-xl mx-auto text-left text-gray-300 list-disc list-inside space-y-2">
            <li>Phase 1: Token Launch & Community Building</li>
            <li>Phase 2: Slyroze Nation Interactive Map & NFT Land Claims</li>
            <li>Phase 3: SlyPass Minting & Airdrops</li>
            <li>Phase 4: Marketplace & UBI Features</li>
          </ul>
        </section>
  <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Litepaper</h2>
          <button
            onClick={() => setShowLitepaper(!showLitepaper)}
            className="bg-slyrozeBlue text-black py-2 px-6 rounded shadow hover:scale-105 transition"
          >
            {showLitepaper ? 'Hide Litepaper' : 'View Litepaper'}
          </button>
          {showLitepaper && (
            <div className="max-w-2xl mx-auto bg-gray-900 p-4 rounded shadow text-left text-gray-300 space-y-2">
              <p>Slyroze Litepaper outlines the full ecosystem, token utility, roadmap, and vision for decentralized digital ownership.</p>
              <p>Focus areas include land NFT zones, community rewards, SlyPass integration, and long-term sustainability.</p>
              <p>Download full version: <a href="/litepaper.pdf" className="underline text-neonPurple" target="_blank">Litepaper PDF</a></p>
            </div>
          )}
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">How to Buy SLY & SlyPass</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://pancakeswap.finance/swap?outputCurrency=0x8E750e6E68f1378fEe36fEb74d8d28818b3B37b7" target="_blank" rel="noopener noreferrer" className="bg-neonGreen text-black py-2 px-6 rounded shadow hover:scale-105 transition">
              Buy SlyPass on PancakeSwap
            </a>
            <a href="https://pancakeswap.finance/swap?outputCurrency=SLY" target="_blank" rel="noopener noreferrer" className="bg-slyrozePink text-white py-2 px-6 rounded shadow hover:scale-105 transition">
              Buy SLY Token
            </a>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Get Involved</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/nation" className="bg-slyrozeBlue text-black py-2 px-6 rounded shadow hover:scale-105 transition">
              Enter Slyroze Nation
            </Link>
            <Link href="/airdrop" className="bg-yellow-400 text-black py-2 px-6 rounded shadow hover:scale-105 transition">
              Claim Airdrop
            </Link>
            <a href="https://t.me/slyroze" target="_blank" rel="noopener noreferrer" className="bg-purple-600 text-white py-2 px-6 rounded shadow hover:scale-105 transition">
              Join Telegram Community
            </a>
          </div>
        </section>

        <footer className="text-sm text-gray-500 mt-10">
          &copy; 2025 Slyroze. All rights reserved.
        </footer>
      </main>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
          }
