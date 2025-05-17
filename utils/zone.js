import { ethers } from "ethers";
import { db } from "./firebase";
import { doc, setDoc, getDoc, increment } from "firebase/firestore";

// SlyPass Token Contract
const SLYPASS_ADDRESS = "0x8E750e6E68f1378fEe36fEb74d8d28818b3B37b7";
const SLYPASS_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)"
];

// SlyrozeLand Contract
const LAND_CONTRACT_ADDRESS = "0x03d33d8638AE00bA8C21Af490E9F4205E027e10c";
const LAND_ABI = [
  "function mintZone(string zoneId, string metadataURI) returns (bool)"
];

export async function claimZoneWithSlyPass(signer, zoneId, slypPrice) {
  const userAddress = await signer.getAddress();
  const slypassContract = new ethers.Contract(SLYPASS_ADDRESS, SLYPASS_ABI, signer);
  const landContract = new ethers.Contract(LAND_CONTRACT_ADDRESS, LAND_ABI, signer);

  const decimals = await slypassContract.decimals();
  const slypAmount = ethers.utils.parseUnits(slypPrice.toString(), decimals);

  const balance = await slypassContract.balanceOf(userAddress);
  if (balance.lt(slypAmount)) {
    throw new Error("Insufficient SlyPass balance.");
  }

  const TREASURY_WALLET = "0x99ef45f8959c2dc025a97f2b94bc4c8a7de336b6";
  const tx = await slypassContract.transfer(TREASURY_WALLET, slypAmount);
  await tx.wait();

  const metadataURI = `https://api.slyroze.com/metadata/${zoneId}.json`;
  const mintTx = await landContract.mintZone(zoneId, metadataURI);
  await mintTx.wait();

  // Save zone claim to Firestore
  const zoneRef = doc(db, "zones", zoneId);
  await setDoc(zoneRef, {
    owner: userAddress,
    ownerAlias: userAddress.slice(0, 6),
    timestamp: Date.now()
  });

  // Fetch existing nickname from users collection (if set)
  let nickname = userAddress.slice(0, 6);
  const userRef = doc(db, "users", userAddress);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists() && userSnap.data().nickname) {
    nickname = userSnap.data().nickname;
  }

  // Update leaderboard entry
  const leaderboardRef = doc(db, "leaderboard", userAddress);
  await setDoc(leaderboardRef, {
    address: userAddress,
    nickname: nickname,
    count: increment(1),
    lastClaimed: Date.now()
  }, { merge: true });

  return `Zone ${zoneId} claimed for ${slypPrice} SLYP! NFT minted on-chain.`;
}
