import { ethers } from "ethers"; // Required

import { SLYP_CONTRACT_ADDRESS, SLYP_ABI } from './slyp';

// Replace these with your actual deployed Passport contract details
const PASSPORT_CONTRACT_ADDRESS = "0xYourPassportContractAddressHere";
const PASSPORT_ABI = [
  // Paste your actual Passport ABI array here
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" }
    ],
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

export async function mintPassport(signer, userAddress) {
  const slyp = new ethers.Contract(SLYP_CONTRACT_ADDRESS, SLYP_ABI, signer);
  const passport = new ethers.Contract(PASSPORT_CONTRACT_ADDRESS, PASSPORT_ABI, signer);

  const mintCost = ethers.utils.parseUnits("200", 18);
  const burnAmount = ethers.utils.parseUnits("2", 18);

  try {
    const allowance = await slyp.allowance(userAddress, PASSPORT_CONTRACT_ADDRESS);
    if (allowance.lt(mintCost)) {
      const approveTx = await slyp.approve(PASSPORT_CONTRACT_ADDRESS, mintCost);
      await approveTx.wait();
    }

    const transferTx = await slyp.transferFrom(userAddress, PASSPORT_CONTRACT_ADDRESS, mintCost);
    await transferTx.wait();

    const mintTx = await passport.mintPassport(userAddress);
    const receipt = await mintTx.wait();

    const transferEvent = receipt.events.find(e => e.event === "Transfer");
    const tokenId = transferEvent?.args?.tokenId?.toString();

    const burnTx = await slyp.burn(burnAmount);
    await burnTx.wait();

    if (tokenId) {
      alert(`Passport Minted Successfully! Token ID: #${tokenId}`);
    } else {
      alert("Passport Minted Successfully (but Token ID not found in event)");
    }

    return tokenId;
  } catch (err) {
    console.error("Mint failed:", err);
    alert("Minting failed: " + err.message);
    throw err;
  }
}
