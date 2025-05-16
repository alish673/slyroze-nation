import { ethers } from "ethers";

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

export async function mintPassport(signer, userAddress) {
  const slyp = new ethers.Contract(SLYP_CONTRACT_ADDRESS, SLYP_ABI, signer);
  const passport = new ethers.Contract(PASSPORT_CONTRACT_ADDRESS, PASSPORT_ABI, signer);

  // Let the smart contract decide price logic
  const price = await passport.currentPrice();

  // Ensure enough allowance
  const allowance = await slyp.allowance(userAddress, PASSPORT_CONTRACT_ADDRESS);
  if (allowance.lt(price)) {
    const approveTx = await slyp.approve(PASSPORT_CONTRACT_ADDRESS, price);
    await approveTx.wait();
  }

  // Mint and capture event
  const tx = await passport.mintPassport();
  const receipt = await tx.wait();

  // Extract tokenId from Transfer event
  const transferEvent = receipt.events?.find((e) => e.event === "Transfer");
  const tokenId = transferEvent?.args?.tokenId?.toString();

  if (!tokenId) {
    throw new Error("Mint succeeded, but no tokenId found in Transfer event.");
  }

  return tokenId;
}
