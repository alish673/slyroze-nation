import { ethers } from "ethers";

const SLYP_CONTRACT_ADDRESS = "0x8E750e6E68f1378fEe36fEb74d8d28818b3B37b7";
const SLYP_ABI = [
  "function balanceOf(address account) external view returns (uint256)"
];

export async function getSlypBalance(provider, address) {
  const contract = new ethers.Contract(SLYP_CONTRACT_ADDRESS, SLYP_ABI, provider);
  const balance = await contract.balanceOf(address);
  return ethers.utils.formatUnits(balance, 18);
}
