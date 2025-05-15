import { ethers } from "ethers";
import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

// SlyPass Token Contract
const SLYPASS_ADDRESS = "0x8E750e6E68f1378fEe36fEb74d8d28818b3B37b7";
const SLYPASS_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)"
];

// SlyrozeLand Contract (New)
const LAND_CONTRACT_ADDRESS = "0x03d33d8638AE00bA8C21Af490E9F4205E027e10c";
const LAND_ABI = [
  "function mintZone(string zoneId, string metadataURI) returns (bool)"
];

// Main Claim Zone Logic
export async function claimZoneWithSlyPass(signer, zoneId, slypPrice) {
  const userAddress = await signer.getAddress();
  const slypassContract = new ethers.Contract(SLYPASS_ADDRESS, SLYPASS_ABI, signer);
  const landContract = new ethers.Contract(LAND_CONTRACT_ADDRESS, LAND_ABI, signer);

  // Dynamic decimals support
  const decimals = await slypassContract.decimals();
  const slypAmount = ethers.utils.parseUnits(slypPrice.toString(), decimals);

  // Check SLYP Balance
  const balance = await slypassContract.balanceOf(userAddress);
  if (balance.lt(slypAmount)) {
    throw new Error("Insufficient SlyPass balance.");
  }

  // Transfer SLYP to Treasury Wallet
  const TREASURY_WALLET = "0x99ef45f8959c2dc025a97f2b94bc4c8a7de336b6";
  const tx = await slypassContract.transfer(TREASURY_WALLET, slypAmount);
  await tx.wait();

  // Mint Zone NFT (on-chain)
  const metadataURI = `https://api.slyroze.com/metadata/${zoneId}.json`;
  const mintTx = await landContract.mintZone(zoneId, metadataURI);
  await mintTx.wait();

  // Save claim to Firestore
  const zoneRef = doc(db, "zones", zoneId);
  await setDoc(zoneRef, {
    owner: userAddress,
    ownerAlias: userAddress.slice(0, 6),
    timestamp: Date.now()
  });

  return `Zone ${zoneId} claimed for ${slypPrice} SLYP! NFT minted on-chain.`;
}
