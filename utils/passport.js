import { ethers } from "ethers";
import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

// Your real contract details here
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
  const tx = await passport.mintPassport(userAddress);
  const receipt = await tx.wait();

  const transferEvent = receipt.events.find(e => e.event === "Transfer");
  const tokenId = transferEvent?.args?.tokenId?.toString();

  if (!tokenId) {
    alert("Minted but tokenId missing.");
    return null;
  }

  // ✅ Save to Firestore
  await setDoc(doc(db, "passports", tokenId), {
    tokenId,
    ownerUid,
    wallet: userAddress,
    timestamp: Date.now()
  });

  return tokenId;
}
