export async function connectWallet() {
  if (typeof window === "undefined" || typeof window.ethereum === "undefined") {
    alert("MetaMask is not available. Please install MetaMask.");
    return null;
  }

  try {
    const { ethers } = await import("ethers"); // dynamic import prevents SSR crash
    const provider = new ethers.providers.Web3Provider(window.ethereum);
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
