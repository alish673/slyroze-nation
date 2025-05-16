export async function connectWallet() {
  if (typeof window === "undefined" || typeof window.ethereum === "undefined") {
    alert("MetaMask is not available. Please install MetaMask.");
    return null;
  }

  try {
    // Diagnostic logs
    console.log("About to import ethers dynamically...");
    const ethersImport = await import("ethers");
    console.log("ethersImport result:", ethersImport);

    if (!ethersImport || !ethersImport.ethers || !ethersImport.ethers.providers) {
      alert("Ethers is not loaded properly! Check your build or ethers version.");
      return null;
    }

    const { ethers } = ethersImport;
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    return { provider, signer, address };
  } catch (err) {
    console.error("Wallet connection error:", err);
    alert("Wallet connection failed: " + (err.message || err));
    return null;
  }
}
