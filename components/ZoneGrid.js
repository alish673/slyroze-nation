import { useEffect, useState } from 'react';
import { claimZoneWithSlyPass } from '../utils/zone';
import { db } from '../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function ZoneGrid({ signer, walletAddress }) {
  const [zones, setZones] = useState([]);
  const [loadingZone, setLoadingZone] = useState(null);

  useEffect(() => {
    async function fetchZones() {
      const snapshot = await getDocs(collection(db, 'zones'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setZones(data);
    }
    fetchZones();
  }, []);

  const handleClaim = async (zoneId) => {
    try {
      setLoadingZone(zoneId);
      const slypPrice = 50; // You can later fetch dynamic pricing per zone

      const result = await claimZoneWithSlyPass(signer, zoneId, slypPrice);
      alert(result);

      // Refresh zones after claim
      const snapshot = await getDocs(collection(db, 'zones'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setZones(data);
    } catch (error) {
      console.error(error);
      alert("Failed to claim zone: " + error.message);
    } finally {
      setLoadingZone(null);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Nation Zones</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {zones.slice(0, 40).map(zone => {
          const isClaimed = !!zone.owner;

          return (
            <div
              key={zone.id}
              className={`relative p-4 rounded-lg text-center transition-transform hover:scale-105 cursor-pointer
              ${isClaimed ? 'bg-neonGreen text-black shadow-[0_0_10px_rgba(50,232,117,0.7)]' : 'bg-gray-800 text-white'}
              ${loadingZone === zone.id ? 'opacity-50' : ''}`}
              onClick={() => !isClaimed && handleClaim(zone.id)}
            >
              <div className="text-sm font-semibold">{zone.id}</div>
              {isClaimed ? (
                <div className="mt-2 text-xs">
                  Claimed by: {zone.ownerAlias || zone.owner?.slice(0, 6)}
                </div>
              ) : (
                <div className="mt-2 text-xs text-gray-400">Available</div>
              )}
            </div>
          );
        })}
      </div>
      {/* Future: Pagination controls */}
    </div>
  );
}
