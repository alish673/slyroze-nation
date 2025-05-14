import { useEffect, useState } from 'react';
import { claimZoneWithSlyPass } from '../utils/zone';
import { db } from '../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function ZoneGrid({ signer, walletAddress }) {
  const [zones, setZones] = useState([]);
  const [loadingZone, setLoadingZone] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const zonesPerPage = 40;

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
      const slypPrice = 50; // Dynamic pricing logic later
      const result = await claimZoneWithSlyPass(signer, zoneId, slypPrice);
      alert(result);

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

  const paginatedZones = zones.slice((currentPage - 1) * zonesPerPage, currentPage * zonesPerPage);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Nation Zones</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-4">
        {paginatedZones.map(zone => {
          const isClaimed = !!zone.owner;

          return (
            <div
              key={zone.id}
              className={`relative p-4 rounded-lg text-center transition-transform hover:scale-105 cursor-pointer
              ${isClaimed ? 'bg-neonGreen text-black shadow-[0_0_15px_rgba(50,232,117,0.7)]' : 'bg-gray-900 text-white hover:border-slyrozePink border border-gray-700'}
              ${loadingZone === zone.id ? 'opacity-50' : ''}`}
              onClick={() => !isClaimed && handleClaim(zone.id)}
            >
              <div className="text-xs font-semibold">{zone.id}</div>
              {isClaimed ? (
                <div className="mt-1 text-xs">Owner: {zone.ownerAlias || zone.owner?.slice(0, 6)}</div>
              ) : (
                <div className="mt-1 text-xs text-gray-400">Available</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="text-white">Page {currentPage}</span>
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={zones.length <= currentPage * zonesPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
        }
