import { ethers } from "ethers";

// Updated Passport Contract Address
const PASSPORT_CONTRACT_ADDRESS = "0xfd3BC111A9f4A0d86875f6B4Ca4Df592179CE0ca";

// SLYP Contract remains the same
const SLYP_CONTRACT_ADDRESS = "0x8E750e6E68f1378fEe36fEb74d8d28818b3B37b7";

const SLYP_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address sender, address recipient, uint256 amount) returns (bool)",
  "function burn(uint256 amount) returns (bool)"
];

const PASSPORT_ABI = [
  "function mintPassport(address to) returns (uint256)"
];

export async function mintPassport(signer, userAddress) {
  const slyp = new ethers.Contract(SLYP_CONTRACT_ADDRESS, SLYP_ABI, signer);
  const passport = new ethers.Contract(PASSPORT_CONTRACT_ADDRESS, PASSPORT_ABI, signer);

  const cost = ethers.utils.parseUnits("200", 18);

  const allowance = await slyp.allowance(userAddress, PASSPORT_CONTRACT_ADDRESS);
  if (allowance.lt(cost)) {
    const approveTx = await slyp.approve(PASSPORT_CONTRACT_ADDRESS, cost);
    await approveTx.wait();
  }

  const transferTx = await slyp.transferFrom(userAddress, PASSPORT_CONTRACT_ADDRESS, cost);
  await transferTx.wait();

  const mintTx = await passport.mintPassport(userAddress);
  await mintTx.wait();

  const burnTx = await slyp.burn(ethers.utils.parseUnits("2", 18));
  await burnTx.wait();

  return true;
}
