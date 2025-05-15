import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import HeroBackground from '../components/HeroBackground';
import Header from '../components/Header';
import AuthModal from '../components/AuthModal';

export default function Landing() {
  const [showLitepaper, setShowLitepaper] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <Head>
        <title>Slyroze | Blockchain NFT Nation & SlyPass Token</title>
        <meta name="description" content="Slyroze Nation - Explore digital land zones, mint NFTs, earn rewards with SlyPass token. Join our ecosystem today." />
        <meta name="keywords" content="Slyroze, SlyPass, NFT Land, Crypto, Blockchain Nation, Token, Airdrop, Web3" />
        <meta property="og:title" content="Slyroze Nation" />
        <meta property="og:description" content="Mint. Claim. Earn with SlyPass in the Slyroze Nation." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://slyroze.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://slyroze.com/" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Slyroze",
              "url": "https://slyroze.com",
              "logo": "https://slyroze.com/logo.png",
              "sameAs": [
                "https://www.instagram.com/slyroze",
                "https://x.com/slyroze",
                "https://t.me/slyroze"
              ],
              "description": "Slyroze is a blockchain-powered Nation offering NFT land zones, community rewards, and SlyPass token utility."
            }
          `}
        </script>
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
              <a href="https://pancakeswap.finance/" target="_blank" rel="noopener noreferrer" className="bg-neonGreen text-black py-3 px-6 rounded shadow hover:scale-105 transition">
                Buy on PancakeSwap
              </a>
              <a href="https://t.me/slyroze" target="_blank" rel="noopener noreferrer" className="bg-slyrozePink text-white py-3 px-6 rounded shadow hover:scale-105 transition">
                Join Telegram
              </a>
              <a href="https://x.com/slyroze" target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white py-3 px-6 rounded shadow hover:scale-105 transition">
                Follow on Twitter
              </a>
              <a href="https://www.instagram.com/slyroze" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white py-3 px-6 rounded shadow hover:scale-105 transition">
                Instagram
              </a>
            </div>
          </section>
<section className="space-y-10">
            <h2 className="text-3xl font-semibold">SlyPass & Slyroze Token</h2>
            <p className="max-w-2xl mx-auto text-gray-300">
              SlyPass (SLYP) fuels interactions within Slyroze Nation — from minting passports to claiming land zones.
              Slyroze Token (SLY) rewards contributors and supports ecosystem growth.
            </p>
          </section>

          <section className="space-y-10">
            <h2 className="text-3xl font-semibold">Ecosystem & Utility</h2>
            <p className="max-w-2xl mx-auto text-gray-300">
              Slyroze Nation offers NFT land zones, leaderboards, and dynamic airdrops. Engage, climb ranks, and own digital territory.
            </p>
          </section>

          <section className="space-y-10">
            <h2 className="text-3xl font-semibold">Tokenomics</h2>
            <p className="max-w-xl mx-auto text-gray-300">
              Total Supply: 100 Million SLY | 10,000 SlyPass | No taxes, fair distribution. Sustainable growth & community incentives.
            </p>
          </section>

          <section className="space-y-10">
            <h2 className="text-3xl font-semibold">Roadmap Highlights</h2>
            <ul className="max-w-xl mx-auto text-left text-gray-300 list-disc list-inside space-y-2">
              <li>Phase 1: Token Launch & Community Building</li>
              <li>Phase 2: Interactive Nation Map & NFT Land Claims</li>
              <li>Phase 3: SlyPass Minting & Airdrops</li>
              <li>Phase 4: Marketplace & UBI Features</li>
            </ul>
          </section>

          <section className="space-y-10">
            <h2 className="text-3xl font-semibold">Litepaper</h2>
            <button
              onClick={() => setShowLitepaper(!showLitepaper)}
              className="bg-slyrozeBlue text-black py-2 px-6 rounded shadow hover:scale-105 transition"
            >
              {showLitepaper ? 'Hide Litepaper' : 'View Litepaper'}
            </button>
            {showLitepaper && (
              <div className="max-w-2xl mx-auto bg-gray-900 p-4 rounded shadow text-left text-gray-300 space-y-2">
                <p>Slyroze Litepaper outlines the ecosystem, token utility, roadmap, and vision for decentralized ownership.</p>
                <p>Focus: NFT zones, community rewards, SlyPass integration, and sustainable growth.</p>
                <p>Download: <a href="/litepaper.pdf" className="underline text-neonPurple" target="_blank">Litepaper PDF</a></p>
              </div>
            )}
          </section>

          <section className="space-y-10">
            <h2 className="text-3xl font-semibold">Meme Tracker (Instagram Latest)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <a key={item} href="https://www.instagram.com/slyroze" target="_blank" rel="noopener noreferrer" className="block rounded overflow-hidden shadow hover:scale-105 transition">
                  <img src={`/memes/meme-${item}.jpg`} alt={`Meme ${item}`} className="w-full h-auto object-cover" />
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-400">Follow us on Instagram for fresh memes & updates.</p>
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
              <a href="https://t.me/slyroze" target="_blank" rel="noopener noreferrer" className="bg-purple-600 text-white py-3 px-6 rounded shadow hover:scale-105 transition">
                Telegram Community
              </a>
            </div>
          </section>

          <footer className="text-center text-sm text-gray-500 mt-16 space-y-2">
            <p>&copy; 2025 Slyroze. All rights reserved.</p>
            <div className="flex justify-center gap-6 mt-2">
              <a href="https://x.com/slyroze" target="_blank" className="hover:text-slyrozePink">Twitter</a>
              <a href="https://t.me/slyroze" target="_blank" className="hover:text-neonGreen">Telegram Group</a>
              <a href="https://t.me/slyrozetoken" target="_blank" className="hover:text-purple-400">Telegram Channel</a>
              <a href="https://www.instagram.com/slyroze" target="_blank" className="hover:text-yellow-300">Instagram</a>
            </div>
          </footer>
        </main>

        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </div>
    </>
  );
              }
