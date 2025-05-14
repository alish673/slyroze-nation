import Head from 'next/head';
import Link from 'next/link';
import HeroBackground from '../components/HeroBackground';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
      <Head>
        <title>Slyroze - Decentralized Nation</title>
        <meta name="description" content="Join the Slyroze Nation. Mint Passports, Claim Land Zones, Earn SLYP Rewards & be part of the ecosystem." />
      </Head>

      <HeroBackground />

      <main className="container mx-auto p-6 text-center space-y-12">
        <section className="space-y-6">
          <h1 className="text-4xl font-extrabold">Welcome to Slyroze</h1>
          <p className="text-lg text-gray-300">A decentralized Nation powered by SlyPass Token & NFT Ecosystem.</p>
          <div className="flex justify-center space-x-4">
            <Link href="/nation">
              <a className="bg-neonPurple hover:bg-neonGreen text-black py-3 px-6 rounded text-lg shadow-lg">Enter Nation</a>
            </Link>
            <Link href="#about">
              <a className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded text-lg">Learn More</a>
            </Link>
          </div>
        </section>
  <section id="about" className="space-y-8 mt-16">
          <h2 className="text-3xl font-bold">What is Slyroze Nation?</h2>
          <p className="text-md text-gray-400 max-w-2xl mx-auto">
            Slyroze Nation is a futuristic digital ecosystem where you can mint NFTs, claim land zones, set your Nation identity, and earn SLYP rewards monthly.
            Each land claim and passport mint strengthens your presence in the Slyroze metaverse.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-gray-800 p-6 rounded shadow-lg">
              <h3 className="text-xl font-semibold mb-2">SlyPass Token (SLYP)</h3>
              <p className="text-sm text-gray-300">The official utility token used for all transactions — minting passports, claiming land zones, and more.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded shadow-lg">
              <h3 className="text-xl font-semibold mb-2">NFT Passport</h3>
              <p className="text-sm text-gray-300">Mint your digital passport to become a verified citizen and unlock exclusive rewards and identity perks.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Land Zones</h3>
              <p className="text-sm text-gray-300">Claim unique zones in the Nation, show your ownership on-chain, and grow your influence on the leaderboards.</p>
            </div>
          </div>
        </section>
  <section id="ecosystem" className="space-y-8 mt-16">
          <h2 className="text-3xl font-bold">Explore the Ecosystem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-gray-900 p-6 rounded shadow-md">
              <h3 className="text-lg font-semibold mb-2">Nation Map</h3>
              <p className="text-sm text-gray-300 mb-4">Interactive zone grid with live land claims and SLYP-powered ownership.</p>
              <a href="/nation" className="inline-block bg-slyrozePink hover:bg-slyrozeBlue text-white py-2 px-4 rounded">Enter Nation</a>
            </div>
            <div className="bg-gray-900 p-6 rounded shadow-md">
              <h3 className="text-lg font-semibold mb-2">Leaderboard</h3>
              <p className="text-sm text-gray-300 mb-4">Track top players and contributors based on land zones and Passport mints.</p>
              <a href="/leaderboard" className="inline-block bg-neonGreen text-black py-2 px-4 rounded">View Leaderboard</a>
            </div>
            <div className="bg-gray-900 p-6 rounded shadow-md">
              <h3 className="text-lg font-semibold mb-2">Mint Passport</h3>
              <p className="text-sm text-gray-300 mb-4">Become a citizen by minting your Passport NFT — your key to Slyroze Nation rewards.</p>
              <a href="/passport" className="inline-block bg-neonPurple text-white py-2 px-4 rounded">Mint Now</a>
            </div>
          </div>
        </section>

      </main>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showAboutPanel && <AboutPanel onClose={() => setShowAboutPanel(false)} />}
      {showDisclaimer && <DisclaimerPanel onClose={() => setShowDisclaimer(false)} />}
      {showNicknameModal && <NicknameModal isOpen={showNicknameModal} onClose={() => setShowNicknameModal(false)} onSave={handleSetAlias} />}

      {loadingMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <p className="text-xl text-white animate-pulse">{loadingMessage}</p>
        </div>
      )}

    </div>
  );
    }
