import { ethers } from "ethers";
import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

// Replace with your actual deployed contract address
const PASSPORT_CONTRACT_ADDRESS = "0xYourPassportContractAddressHere";

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

export async function mintPassport(signer, userAddress, ownerUid) {
  const passport = new ethers.Contract(PASSPORT_CONTRACT_ADDRESS, PASSPORT_ABI, signer);

  try {
    // Call the contract to mint
    const tx = await passport.mintPassport(userAddress);
    const receipt = await tx.wait();

    // Extract the tokenId from Transfer event
    const transferEvent = receipt.events.find(e => e.event === "Transfer");
    const tokenId = transferEvent?.args?.tokenId?.toString();

    if (!tokenId) {
      alert("Passport minted but tokenId was not found in the event log.");
      return null;
    }

    // ✅ Save the passport to Firestore
    await setDoc(doc(db, "passports", tokenId), {
      tokenId,
      wallet: userAddress,
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
