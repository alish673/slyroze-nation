import Header from '../components/Header';
import NationMapOverlay from '../components/NationMapOverlay';

export default function Nation() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />
      <main className="relative z-10 container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center">Welcome to Slyroze Nation</h1>
        <p className="text-center mt-2">Claim zones, mint your passport, and earn SLYP rewards.</p>
      </main>
      <NationMapOverlay />
    </div>
  );
}
