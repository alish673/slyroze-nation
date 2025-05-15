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
        <meta name="robots" content="index, follow" />
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
              <Link href="/index" passHref>
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
<div className="flex justify-center gap-6 mt-8 text-3xl">
              <a href="https://x.com/slyroze" target="_blank" className="hover:text-slyrozePink hover:scale-125 transition-all"><FaTwitter /></a>
              <a href="https://t.me/+L2sVdT1egVRiOTM1" target="_blank" className="hover:text-neonGreen hover:scale-125 transition-all"><FaTelegram /></a>
              <a href="https://t.me/slyrozetoken" target="_blank" className="hover:text-purple-400 hover:scale-125 transition-all"><FaTelegram /></a>
              <a href="https://www.instagram.com/slyroze" target="_blank" className="hover:text-yellow-300 hover:scale-125 transition-all"><FaInstagram /></a>
            </div>
          </section>

<!-- (keep all your Tokenomics, Roadmap, Litepaper unchanged here) -->

          <section className="space-y-10">
            <h2 className="text-3xl font-semibold">Get Involved</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/index" passHref>
                <a className="bg-slyrozeBlue text-black font-semibold py-3 px-6 rounded-xl shadow hover:scale-105 transition">
                  Enter Slyroze Nation
                </a>
              </Link>
              <Link href="/airdrop" passHref>
                <a className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-xl shadow hover:scale-105 transition">
                  Claim Airdrop
                </a>
              </Link>
              <a href="https://t.me/slyroze" target="_blank" className="bg-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow hover:scale-105 transition">
                Join Telegram Group
              </a>
              <a href="https://t.me/slyrozetoken" target="_blank" className="bg-purple-400 text-white font-semibold py-3 px-6 rounded-xl shadow hover:scale-105 transition">
                Telegram Channel
              </a>
            </div>
          </section>

          <footer className="text-center text-sm text-gray-500 mt-16 space-y-2">
            <p>&copy; 2025 Slyroze. All rights reserved.</p>
            <div className="flex justify-center gap-6 mt-2 text-2xl">
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
