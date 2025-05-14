import Header from '../components/Header';
import { connectWallet } from '../utils/wallet';
import { getSlypBalance } from '../utils/slyp';
import { mintPassport } from '../utils/passport';
import { useState } from 'react';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");
  const [slypBalance, setSlypBalance] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const handleConnectWallet = async () => {
    const result = await connectWallet();
    if (result) {
      setWalletAddress(result.address);
      setProvider(result.provider);
      setSigner(result.signer);
      const balance = await getSlypBalance(result.provider, result.address);
      setSlypBalance(balance);
    }
  };

  const handleMintPassport = async () => {
    if (!signer || !walletAddress) return alert("Connect Wallet first.");
    try {
      alert("Minting Passport...");
      await mintPassport(signer, walletAddress);
      alert("Passport Minted Successfully!");
      const balance = await getSlypBalance(provider, walletAddress);
      setSlypBalance(balance);
    } catch (err) {
      console.error(err);
      alert("Minting failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Header />
      <main className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Slyroze Nation</h1>
        <p className="mb-6">Mint. Claim. Earn Monthly SLYP Rewards.</p>

        {walletAddress ? (
          <div className="bg-gray-800 p-4 rounded shadow-lg space-y-4">
            <div>
              <p className="text-green-400">Connected Wallet:</p>
              <p className="break-all">{walletAddress}</p>
            </div>
            <div>
              <p className="text-purple-400">SLYP Balance:</p>
              <p>{slypBalance} SLYP</p>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              onClick={handleMintPassport}
            >
              Mint Passport (200 SLYP)
            </button>
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
