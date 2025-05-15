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
          <h2 className="text-3xl font-semibold">Explore the Slyroze Ecosystem</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/nation" className="bg-slyrozeBlue text-black py-3 px-6 rounded shadow hover:scale-105 transition">
              Enter Slyroze Nation
            </Link>
            <Link href="/airdrop" className="bg-yellow-400 text-black py-3 px-6 rounded shadow hover:scale-105 transition">
              Claim Airdrop
            </Link>
            <a href="/litepaper.pdf" target="_blank" className="bg-neonPurple text-white py-3 px-6 rounded shadow hover:scale-105 transition">
              View Litepaper
            </a>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Meme Tracker (Latest Instagram)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <a key={item} href="https://www.instagram.com/slyroze" target="_blank" rel="noopener noreferrer" className="block rounded overflow-hidden shadow hover:scale-105 transition">
                <img src={`/memes/meme-${item}.jpg`} alt={`Meme ${item}`} className="w-full h-auto object-cover" />
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-400">Follow us on Instagram for the latest memes and community updates.</p>
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
  );
    }
import Head from 'next/head';

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
        <meta name="robots" content="index, follow" />
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
