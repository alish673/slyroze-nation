import { ethers } from "ethers";
import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

// Your deployed Passport contract address
const PASSPORT_CONTRACT_ADDRESS = "0xfd3BC111A9f4A0d86875f6B4Ca4Df592179CE0ca";

const PASSPORT_ABI = [
  {
    "inputs": [{ "internalType": "address", "name": "to", "type": "address" }],
    "name": "mintPassport",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "from", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "to", "type": "address" },
      { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    ],
    "name": "Transfer",
    "type": "event"
  }
];

export async function mintPassport(signer, walletAddress, ownerUid) {
  try {
    // Ensure address is raw string and NOT ENS
    const address = walletAddress || (signer.getAddress ? await signer.getAddress() : signer.address);

    const passport = new ethers.Contract(PASSPORT_CONTRACT_ADDRESS, PASSPORT_ABI, signer);
    const tx = await passport.mintPassport(address);
    const receipt = await tx.wait();

    const transferEvent = receipt.events?.find(e => e.event === "Transfer");
    const tokenId = transferEvent?.args?.tokenId?.toString();

    if (!tokenId) {
      console.warn("Transfer event missing or malformed:", receipt.events);
      alert("Passport minted but tokenId not found in the logs.");
      return null;
    }

    // Save to Firestore
    await setDoc(doc(db, "passports", tokenId), {
      tokenId,
      wallet: address,
      ownerUid,
      timestamp: Date.now()
    });

    alert(`Passport minted! Token ID: ${tokenId}`);
    return tokenId;
  } catch (err) {
    console.error("Passport mint failed:", err);
    alert("Minting failed: " + (err.message || "Unknown error"));
    throw err;
  }
}
