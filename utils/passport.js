import { ethers } from "ethers";
import { db } from "./firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";

const PASSPORT_CONTRACT_ADDRESS = "0xfd3BC111A9f4A0d86875f6B4Ca4Df592179CE0ca";
const SLYP_CONTRACT_ADDRESS = "0x8E750e6E68f1378fEe36fEb74d8d28818b3B37b7";

const SLYP_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)"
];

const PASSPORT_ABI = [
  "function currentPrice() view returns (uint256)",
  "function mintPassport()",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

export async function mintPassport(signer, userAddress, userUid) {
  const slyp = new ethers.Contract(SLYP_CONTRACT_ADDRESS, SLYP_ABI, signer);
  const passport = new ethers.Contract(PASSPORT_CONTRACT_ADDRESS, PASSPORT_ABI, signer);

  const price = await passport.currentPrice();
  const allowance = await slyp.allowance(userAddress, PASSPORT_CONTRACT_ADDRESS);

  if (allowance.lt(price)) {
    const approveTx = await slyp.approve(PASSPORT_CONTRACT_ADDRESS, price);
    await approveTx.wait();
  }

  const tx = await passport.mintPassport();
  const receipt = await tx.wait();

  const transferEvent = receipt.events.find(
    e => e.event === "Transfer" && e.args.to.toLowerCase() === userAddress.toLowerCase()
  );

  const tokenId = transferEvent?.args?.tokenId?.toString();
  if (!tokenId) throw new Error("Mint succeeded but token ID not found");

  // Write passport to Firestore
  await setDoc(doc(db, "passports", tokenId), {
    tokenId,
    wallet: userAddress,
    ownerUid: userUid,
    timestamp: Date.now()
  });

  // Mark user as having a passport
  await updateDoc(doc(db, "users", userUid), {
    hasPassport: true
  });

  // Let frontend sync and fetch metadata
  await new Promise(res => setTimeout(res, 1000));

  return tokenId;
}
