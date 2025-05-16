// In passport.js or your minting file
export async function mintPassport(signer, userAddress) {
  const slyp = new ethers.Contract(SLYP_CONTRACT_ADDRESS, SLYP_ABI, signer);
  const passport = new ethers.Contract(PASSPORT_CONTRACT_ADDRESS, PASSPORT_ABI, signer);

  const mintCost = ethers.utils.parseUnits("200", 18);
  const burnAmount = ethers.utils.parseUnits("2", 18);

  const allowance = await slyp.allowance(userAddress, PASSPORT_CONTRACT_ADDRESS);
  if (allowance.lt(mintCost)) {
    const approveTx = await slyp.approve(PASSPORT_CONTRACT_ADDRESS, mintCost);
    await approveTx.wait();
  }

  const transferTx = await slyp.transferFrom(userAddress, PASSPORT_CONTRACT_ADDRESS, mintCost);
  await transferTx.wait();

  // MINT and get tokenId from the event log
  const mintTx = await passport.mintPassport(userAddress);
  const receipt = await mintTx.wait();

  // Get Token ID from Transfer event (standard for ERC-721)
  const transferEvent = receipt.events.find(e => e.event === "Transfer");
  const tokenId = transferEvent.args.tokenId.toString();

  // Optional: burn step if needed
  const burnTx = await slyp.burn(burnAmount);
  await burnTx.wait();

  // Show token ID to user
  alert(`Passport Minted Successfully! Token ID: #${tokenId}`);

  return tokenId;
}
