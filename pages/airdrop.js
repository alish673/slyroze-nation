import Head from 'next/head';
import Header from '../components/Header';
import HeroBackground from '../components/HeroBackground';

export default function Airdrop() {
  return (
    <>
      <Head>
        <title>Slyroze Airdrop</title>
        <meta name="description" content="Participate in the Slyroze airdrop. Complete the tasks and submit your wallet address." />
      </Head>

      <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
        <HeroBackground />
        <Header />

        <main className="container mx-auto px-4 sm:px-6 md:px-8 text-center space-y-10 pt-12">
          <h1 className="text-4xl font-bold">Slyroze Airdrop</h1>
          <p className="max-w-xl mx-auto text-lg text-gray-300">
            Complete the steps below to participate:
          </p>
          <ol className="list-decimal text-left max-w-2xl mx-auto text-gray-300 space-y-2">
            <li>Follow <a href="https://twitter.com/slyroze" target="_blank" className="text-neonPurple underline">Slyroze on Twitter</a></li>
            <li>Join our <a href="https://t.me/+L2sVdT1egVRiOTM1" target="_blank" className="text-neonGreen underline">Telegram Group</a></li>
            <li>Join the <a href="https://t.me/slyrozetoken" target="_blank" className="text-slyrozePink underline">Telegram Channel</a></li>
            <li>Submit your Wallet Address & Social Handles below</li>
            <li>Note: SLYROZE tokens will be distributed after official launch</li>
          </ol>
  <div className="mt-10 space-y-6">
            <h2 className="text-2xl font-semibold">Airdrop Submission Form</h2>

            {/* Embed Google Form */}
            <div className="relative overflow-hidden rounded-xl shadow-lg bg-gray-900 border border-gray-700">
              <iframe
                src="https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform?embedded=true"
                width="100%"
                height="700"
                frameBorder="0"
                className="w-full h-[700px]"
                title="Slyroze Airdrop Form"
              >
                Loading…
              </iframe>
            </div>

            <p className="text-sm text-gray-500">
              By submitting, you acknowledge that SLYROZE tokens will be distributed post-launch.
            </p>
          </div>
        </main>
  <footer className="mt-16 text-center text-gray-500 text-sm space-y-2">
          <p>&copy; 2025 Slyroze. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-xl">
            <a href="https://x.com/slyroze" target="_blank" className="hover:text-slyrozePink hover:scale-125 transition">Twitter</a>
            <a href="https://t.me/+L2sVdT1egVRiOTM1" target="_blank" className="hover:text-neonGreen hover:scale-125 transition">Telegram Group</a>
            <a href="https://t.me/slyrozetoken" target="_blank" className="hover:text-purple-400 hover:scale-125 transition">Telegram Channel</a>
          </div>
        </footer>
      </div>
    </>
  );
    }
