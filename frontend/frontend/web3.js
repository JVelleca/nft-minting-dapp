import { ethers } from "ethers";
import MyNFT from "./MyNFT.json";

// TODO: replace this with your deployed contract address
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";

export async function getContract() {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(CONTRACT_ADDRESS, MyNFT.abi, signer);
}
