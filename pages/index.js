import Header from '../components/Header';
import { connectWallet } from '../utils/wallet';
import { useState } from 'react';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");

  const handleConnectWallet = async () => {
    const result = await connectWallet();
    if (result) {
      setWalletAddress(result.address);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Header />
      <main className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Slyroze Nation</h1>
        <p className="mb-6">Mint. Claim. Earn Monthly SLYP Rewards.</p>

        {walletAddress ? (
          <div className="bg-gray-800 p-4 rounded shadow-lg">
            <p className="text-green-400">Connected Wallet:</p>
            <p className="break-all">{walletAddress}</p>
          </div>
        ) : (
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </button>
        )}
      </main>
    </div>
  );
          }
