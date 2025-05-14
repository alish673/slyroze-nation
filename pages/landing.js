import Head from 'next/head';

export default function Landing() {
  return (
    <div className="bg-black text-white font-sans">
      <Head>
        <title>Slyroze | Crypto Ecosystem & Nation</title>
        <meta name="description" content="Slyroze - Explore the Slyroze Nation, claim land, mint NFTs & engage with the SLYP and SlyPass tokens." />
      </Head>

      <header className="text-center py-8 bg-gradient-to-r from-pink-600 via-purple-700 to-blue-500 shadow-lg">
        <h1 className="text-4xl font-bold">Welcome to Slyroze</h1>
        <p className="mt-2 text-lg">The Meme Ecosystem with Real Utility</p>
        <div className="mt-4 space-x-4">
          <a href="/nation" className="inline-block bg-neonPurple text-black px-6 py-2 rounded shadow hover:scale-105 transition">Visit Slyroze Nation</a>
          <a href="#buy" className="inline-block bg-slyrozePink text-white px-6 py-2 rounded shadow hover:scale-105 transition">How to Buy</a>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold mb-6">What is Slyroze?</h2>
        <p className="max-w-2xl mx-auto text-gray-300">
          Slyroze is a blockchain-powered meme token ecosystem where community engagement meets real utility.
          With the SLYP token, SlyPass utility token, and the Slyroze Nation virtual land claiming system,
          holders can participate, earn rewards, and grow with the ecosystem.
        </p>
      </section>
  <section id="ecosystem" className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-6">Slyroze Nation Ecosystem</h2>
        <p className="max-w-2xl mx-auto text-gray-300 text-center">
          The Slyroze Nation is a digital metaverse where users can claim land zones as NFTs, earn SLYP rewards, and interact with the community.
          Powered by SlyPass tokens for land claims and Slyroze NFTs for identity, it's a gamified and rewarding experience.
        </p>
      </section>

      <section id="slypass" className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-6">SlyPass Utility Token</h2>
        <p className="max-w-2xl mx-auto text-gray-300 text-center">
          SlyPass (SLYP) is used to mint NFTs, claim Nation Zones, and participate in governance. It fuels the core utility of the Slyroze ecosystem.
          Holders can spend SLYP for exclusive benefits, staking, and future platform utilities.
        </p>
      </section>

      <section id="tokenomics" className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-6">Tokenomics</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          <div className="bg-gray-800 p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Supply: 100 Million SLY</h3>
            <p>Fixed total supply with no burn or tax.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">SlyPass Utility</h3>
            <p>10,000 initial supply used for minting, land claiming, and governance.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Community Rewards</h3>
            <p>Monthly SLYP distributions to active Nation participants & holders.</p>
          </div>
        </div>
      </section>
  <section id="roadmap" className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-6">Roadmap</h2>
        <ul className="space-y-4 text-gray-300">
          <li>Q2 2025: Launch SlyPass, Passport NFTs, and Nation Zone Claims</li>
          <li>Q3 2025: Slyroze Nation Map Expansion, Leaderboard Competitions</li>
          <li>Q4 2025: Partnerships, SLYP Staking, Governance Launch</li>
          <li>2026: Metaverse integrations, Mobile App, Slyroze DAO</li>
        </ul>
      </section>

      <section id="litepaper" className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-6">Litepaper</h2>
        <p className="max-w-2xl mx-auto text-gray-300 text-center">
          Explore our detailed Litepaper to understand how Slyroze Nation operates, token economics, utilities, and future vision.
        </p>
        <div className="text-center mt-6">
          <a href="/litepaper.pdf" target="_blank" className="bg-neonPurple hover:bg-neonGreen text-black py-3 px-6 rounded">Read Litepaper</a>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-center">
        <a href="https://pancakeswap.finance/" target="_blank" className="bg-slyrozePink hover:bg-slyrozeBlue text-white py-3 px-6 rounded shadow">Buy on PancakeSwap</a>
        <a href="#claim-airdrop" className="bg-neonGreen hover:bg-neonPurple text-black py-3 px-6 rounded shadow">Claim Airdrop</a>
        <a href="https://t.me/slyroze" target="_blank" className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded shadow">Join the Community</a>
        <a href="/nation" className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded shadow">Enter Nation Page</a>
      </section>

      <footer className="bg-black text-center py-6 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Slyroze. All rights reserved. | Powered by SlyPass.
      </footer>
    </div>
  );
    }
