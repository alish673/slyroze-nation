import { ethers } from "ethers";
import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

// SlyPass Token Contract Info
const SLYPASS_ADDRESS = "0x8E750e6E68f1378fEe36fEb74d8d28818b3B37b7";
const SLYPASS_ABI = [
  // Only balanceOf and transfer needed
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)"
];

// Main Claim Zone Logic
export async function claimZoneWithSlyPass(signer, zoneId, slypPrice) {
  const userAddress = await signer.getAddress();
  const slypassContract = new ethers.Contract(SLYPASS_ADDRESS, SLYPASS_ABI, signer);

  // Check Balance
  const balance = await slypassContract.balanceOf(userAddress);
  if (balance.lt(ethers.utils.parseUnits(slypPrice.toString(), 18))) {
    throw new Error("Insufficient SlyPass balance.");
  }

  // Transfer SLYP to contract owner or treasury wallet
  const TREASURY_WALLET = "0x99ef45f8959c2dc025a97f2b94bc4c8a7de336b6";
  const tx = await slypassContract.transfer(TREASURY_WALLET, ethers.utils.parseUnits(slypPrice.toString(), 18));
  await tx.wait();

  // Save zone claim in Firestore
  const zoneRef = doc(db, "zones", zoneId);
  await setDoc(zoneRef, {
    owner: userAddress,
    timestamp: Date.now()
  });

  return `Zone ${zoneId} claimed for ${slypPrice} SLYP!`;
}
