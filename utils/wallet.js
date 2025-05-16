import { ethers } from "ethers";

export async function connectWallet() {
  if (typeof window === "undefined" || !window.ethereum) {
    alert("MetaMask is not installed. Please install it to continue.");
    return null;
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = accounts[0];
    return { provider, signer, address };
  } catch (error) {
    console.error("Wallet connection error:", error);
    alert("Wallet connection failed: " + (error.message || error));
    return null;
  }
}
