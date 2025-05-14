import { ethers } from "ethers";

const LAND_CONTRACT_ADDRESS = "0x03d33d8638AE00bA8C21Af490E9F4205E027e10c";
const SLYP_CONTRACT_ADDRESS = "0x8E750e6E68f1378fEe36fEb74d8d28818b3B37b7";

const SLYP_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address sender, address recipient, uint256 amount) returns (bool)",
  "function burn(uint256 amount) returns (bool)"
];

const LAND_ABI = [
  "function mintZone(string zoneId, string metadataURI) returns (bool)"
];

export async function claimZone(signer, provider, userAddress, zoneNumber) {
  const slyp = new ethers.Contract(SLYP_CONTRACT_ADDRESS, SLYP_ABI, signer);
  const land = new ethers.Contract(LAND_CONTRACT_ADDRESS, LAND_ABI, signer);

  const claimedCount = 1000; // Placeholder: Replace with dynamic Firestore count later.
  const dynamicPrice = 100 + Math.floor(claimedCount / 100);
  const price = ethers.utils.parseUnits(dynamicPrice.toString(), 18);

  const allowance = await slyp.allowance(userAddress, LAND_CONTRACT_ADDRESS);
  if (allowance.lt(price)) {
    const approveTx = await slyp.approve(LAND_CONTRACT_ADDRESS, price);
    await approveTx.wait();
  }

  const transferTx = await slyp.transferFrom(userAddress, LAND_CONTRACT_ADDRESS, price);
  await transferTx.wait();

  const metadataURI = `https://api.slyroze.com/metadata/zone-${zoneNumber}.json`;
  const mintTx = await land.mintZone(`zone-${zoneNumber}`, metadataURI);
  await mintTx.wait();

  const burnTx = await slyp.burn(price.div(100));
  await burnTx.wait();

  return dynamicPrice;
}
