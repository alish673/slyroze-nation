import { db } from "./firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

export async function getLeaderboard() {
  const q = query(collection(db, "users"), orderBy("claimedZones", "desc"), limit(10));
  const snapshot = await getDocs(q);
  const leaders = [];

  snapshot.forEach(doc => {
    const data = doc.data();
    leaders.push({
      alias: data.alias || data.username || "Unnamed",
      claimedZones: data.claimedZones || 0,
      hasPassport: data.hasPassport || false,
      slyp: data.slyp || 0,
      lands: data.lands || []
    });
  });

  return leaders;
}
