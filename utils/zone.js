import { ethers } from "ethers";
import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

// SlyPass Token Contract Info
const SLYPASS_ADDRESS = "0x8E750e6E68f1378fEe36fEb74d8d28818b3B37b7";
const SLYPASS_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)"
];

// Main Claim Zone Logic
export async function claimZoneWithSlyPass(signer, zoneId, slypPrice) {
  const userAddress = await signer.getAddress();
  const slypassContract = new ethers.Contract(SLYPASS_ADDRESS, SLYPASS_ABI, signer);

  // Dynamic decimals support
  const decimals = await slypassContract.decimals();
  const slypAmount = ethers.utils.parseUnits(slypPrice.toString(), decimals);

  // Check Balance
  const balance = await slypassContract.balanceOf(userAddress);
  if (balance.lt(slypAmount)) {
    throw new Error("Insufficient SlyPass balance.");
  }

  // Transfer SLYP to Treasury
  const TREASURY_WALLET = "0x99ef45f8959c2dc025a97f2b94bc4c8a7de336b6";
  const tx = await slypassContract.transfer(TREASURY_WALLET, slypAmount);
  await tx.wait();

  // Save claim to Firestore with alias slice
  const zoneRef = doc(db, "zones", zoneId);
  await setDoc(zoneRef, {
    owner: userAddress,
    ownerAlias: userAddress.slice(0, 6),
    timestamp: Date.now()
  });

  return `Zone ${zoneId} claimed for ${slypPrice} SLYP!`;
}
