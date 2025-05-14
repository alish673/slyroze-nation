import { ethers } from "ethers";
import SlyPassABI from '../abis/SlyPassABI.json'; // ERC-20 ABI
import LandABI from '../abis/LandABI.json'; // Your Zone claiming contract ABI

const SLYPASS_ADDRESS = "0xYourSlyPassTokenAddress";  // Replace with actual address
const LAND_ADDRESS = "0xYourLandContractAddress";     // Replace with actual land contract

export async function claimZoneWithSlyPass(signer, zoneId, priceInSlyp) {
  const slyPassContract = new ethers.Contract(SLYPASS_ADDRESS, SlyPassABI, signer);
  const landContract = new ethers.Contract(LAND_ADDRESS, LandABI, signer);

  // Approve spending SlyPass tokens
  const approvalTx = await slyPassContract.approve(LAND_ADDRESS, ethers.utils.parseUnits(priceInSlyp.toString(), 18));
  await approvalTx.wait();

  // Call claimZone on Land Contract
  const claimTx = await landContract.claimZone(zoneId);
  await claimTx.wait();

  return claimTx.hash;
}
