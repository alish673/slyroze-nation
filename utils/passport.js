import { ethers } from "ethers";
import { SLYP_CONTRACT_ADDRESS, SLYP_ABI } from './slyp';

// Replace with your real contract address
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

    console.log("Mint receipt:", receipt);  // Helpful debug log

    let tokenId = null;
    if (Array.isArray(receipt?.events)) {
      const transferEvent = receipt.events.find(e => e.event === "Transfer");
      tokenId = transferEvent?.args?.tokenId?.toString();
    }

    if (!tokenId) {
      console.warn("Transfer event not found or tokenId missing in receipt");
    }

    if (slyp.burn) {
      try {
        const burnTx = await slyp.burn(burnAmount);
        await burnTx.wait();
      } catch (burnError) {
        console.warn("Burn failed:", burnError);
      }
    }

    if (tokenId) {
      alert(`Passport Minted Successfully! Token ID: #${tokenId}`);
    } else {
      alert("Passport Minted Successfully (Token ID not found in event)");
    }

    return tokenId;
  } catch (err) {
    console.error("Mint failed:", err);
    alert("Minting failed: " + (err?.message || "Unknown error"));
    throw err;
  }
}
