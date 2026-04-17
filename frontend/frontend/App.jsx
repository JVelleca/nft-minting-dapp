import { useState } from "react";
import { ethers } from "ethers";
import { getContract } from "./web3";

function App() {
  const [account, setAccount] = useState(null);
  const [txHash, setTxHash] = useState("");
  const [minting, setMinting] = useState(false);

  async function connectWallet() {
    if (!window.ethereum) {
      alert("MetaMask is required.");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setAccount(accounts[0]);
  }

  async function mintNFT() {
    try {
      setMinting(true);
      setTxHash("");

      const contract = await getContract();
      const tx = await contract.mintNFT();
      await tx.wait();

      setTxHash(tx.hash);
    } catch (err) {
      console.error(err);
      alert("Minting failed. Check console for details.");
    } finally {
      setMinting(false);
    }
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>NFT Minting DApp</h1>

      {!account ? (
        <button onClick={connectWallet}>Connect MetaMask</button>
      ) : (
        <p>Connected: {account}</p>
      )}

      <button onClick={mintNFT} disabled={!account || minting}>
        {minting ? "Minting..." : "Mint NFT"}
      </button>

      {txHash && (
        <p>
          NFT Minted! Tx:{" "}
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
          >
            {txHash}
          </a>
        </p>
      )}
    </div>
  );
}

export default App;
