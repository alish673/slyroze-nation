import Header from '../components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Header />
      <main className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Slyroze Nation</h1>
        <p className="mb-6">Mint. Claim. Earn Monthly SLYP Rewards.</p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded">Connect Wallet</button>
      </main>
    </div>
  );
}
