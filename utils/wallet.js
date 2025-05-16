export async function connectWallet() {
  // Ensure we're in a browser and MetaMask is available
  if (typeof window === "undefined" || typeof window.ethereum === "undefined") {
    alert("MetaMask is not available. Please install MetaMask.");
    return null;
  }

  try {
    // Dynamically import ethers (required for Next.js or SSR environments)
    console.log("Importing ethers...");
    const ethers = await import("ethers"); // NOT destructured

    // Basic validation
    if (!ethers || !ethers.providers) {
      alert("Ethers failed to load. Please check your build.");
      return null;
    }

    // Initialize provider and signer
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    // Return wallet connection result
    return { provider, signer, address };
  } catch (err) {
    console.error("Wallet connection error:", err);
    alert("Wallet connection failed: " + (err.message || err));
    return null;
  }
}
