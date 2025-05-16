import { ethers } from "ethers";

// Correct contract addresses
const PASSPORT_CONTRACT_ADDRESS = "0xfd3BC111A9f4A0d86875f6B4Ca4Df592179CE0ca";
const SLYP_CONTRACT_ADDRESS = "0x8E750e6E68f1378fEe36fEb74d8d28818b3B37b7";

// ABIs
const SLYP_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)"
];

const PASSPORT_ABI = [
  "function currentPrice() view returns (uint256)",
  "function mintPassport()"
];

export async function mintPassport(signer, userAddress) {
  const slyp = new ethers.Contract(SLYP_CONTRACT_ADDRESS, SLYP_ABI, signer);
  const passport = new ethers.Contract(PASSPORT_CONTRACT_ADDRESS, PASSPORT_ABI, signer);

  // Get dynamic mint price from contract
  const price = await passport.currentPrice();

  // Check SLYP allowance
  const allowance = await slyp.allowance(userAddress, PASSPORT_CONTRACT_ADDRESS);
  if (allowance.lt(price)) {
    const approveTx = await slyp.approve(PASSPORT_CONTRACT_ADDRESS, price);
    await approveTx.wait();
  }

  // Mint passport
  const mintTx = await passport.mintPassport();
  await mintTx.wait();

  return true;
}
