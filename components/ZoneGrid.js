import { useEffect, useState } from 'react';
import { claimZoneWithSlyPass } from '../utils/zone';
import { db } from '../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getSlypBalance } from '../utils/slyp';

export default function ZoneGrid({ signer, provider, walletAddress }) {
  const [zones, setZones] = useState([]);
  const [loadingZone, setLoadingZone] = useState(null);

  useEffect(() => {
    async function fetchZones() {
      const zoneSnapshot = await getDocs(collection(db, 'zones'));
      const zoneData = zoneSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setZones(zoneData);
    }
    fetchZones();
  }, []);

  const handleClaim = async (zoneId) => {
    try {
      setLoadingZone(zoneId);
      const slypPrice = 50; // Example fixed price per zone

      const result = await claimZoneWithSlyPass(signer, zoneId, slypPrice);
      alert(result);

      const updatedZones = await getDocs(collection(db, 'zones'));
      setZones(updatedZones.docs.map(doc => ({ id: doc.id, ...doc.data() })));
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
      <div className="grid grid-cols-5 gap-4">
        {zones.slice(0, 40).map((zone) => (
          <div
            key={zone.id}
            className={`relative p-4 rounded-lg text-center transition-transform hover:scale-105 cursor-pointer 
            ${zone.claimed ? 'bg-neonGreen text-black' : 'bg-gray-800 text-white'} 
            ${loadingZone === zone.id ? 'opacity-50' : ''}`}
            onClick={() => !zone.claimed && handleClaim(zone.id)}
          >
            <div className="text-sm font-semibold">{zone.id}</div>
            {zone.claimed ? (
              <div className="mt-2 text-xs">
                Claimed by: {zone.ownerAlias || 'Unknown'}
              </div>
            ) : (
              <div className="mt-2 text-xs text-gray-400">Available</div>
            )}
          </div>
        ))}
      </div>
      {/* Pagination placeholder */}
    </div>
  );
}
