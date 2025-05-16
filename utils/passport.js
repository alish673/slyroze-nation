import { ethers } from "ethers"; // REQUIRED to avoid "ethers is not defined"

import { SLYP_CONTRACT_ADDRESS, SLYP_ABI } from './slyp';
import { PASSPORT_CONTRACT_ADDRESS, PASSPORT_ABI } from './passportContract';

export async function mintPassport(signer, userAddress) {
  const slyp = new ethers.Contract(SLYP_CONTRACT_ADDRESS, SLYP_ABI, signer);
  const passport = new ethers.Contract(PASSPORT_CONTRACT_ADDRESS, PASSPORT_ABI, signer);

  const mintCost = ethers.utils.parseUnits("200", 18);
  const burnAmount = ethers.utils.parseUnits("2", 18);

  // Check allowance
  const allowance = await slyp.allowance(userAddress, PASSPORT_CONTRACT_ADDRESS);
  if (allowance.lt(mintCost)) {
    const approveTx = await slyp.approve(PASSPORT_CONTRACT_ADDRESS, mintCost);
    await approveTx.wait();
  }

  // Transfer SLYP tokens to contract
  const transferTx = await slyp.transferFrom(userAddress, PASSPORT_CONTRACT_ADDRESS, mintCost);
  await transferTx.wait();

  // Mint the passport NFT
  const mintTx = await passport.mintPassport(userAddress);
  const receipt = await mintTx.wait();

  // Get tokenId from the Transfer event
  const transferEvent = receipt.events.find(e => e.event === "Transfer");
  const tokenId = transferEvent.args.tokenId.toString();

  // Optional: Burn 2 SLYP
  const burnTx = await slyp.burn(burnAmount);
  await burnTx.wait();

  // Notify user
  alert(`Passport Minted Successfully! Token ID: #${tokenId}`);

  return tokenId;
}
