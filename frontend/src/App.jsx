import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import ContractABI from "./ContractABI.json";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [auctionContract, setAuctionContract] = useState(null);
  const [bidValue, setBidValue] = useState(0);

  const contractAddress = "0x3626e062bE8E31d326CB101A5C5e854E0DC74F63";
  const contractABI = ContractABI.abi;

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const providerInstance = new ethers.providers.Web3Provider(
          window.ethereum
        );
        const signerInstance = providerInstance.getSigner();

        const auctionContractInstance = new ethers.Contract(
          contractAddress,
          contractABI,
          signerInstance
        );

        setProvider(providerInstance);
        setSigner(signerInstance);
        setAuctionContract(auctionContractInstance);
      } else {
        alert("Please install MetaMask!");
      }
    };

    init();
  }, []);

  const placeBid = async () => {
    try {
      if (!auctionContract) return;

      const weiValue = ethers.utils.parseEther(bidValue.toString());
      const tx = await auctionContract.placeBid({ value: weiValue });

      // Wait for the transaction to be confirmed
      await tx.wait();
      alert("Bid placed successfully!");
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };

  return (
    <>
      <div></div>
      <h1>AUCTION DAPP MANTLE</h1>
      <div className="card">
        <input
          type="text"
          placeholder="Bid amount in ETH"
          value={bidValue}
          onChange={(e) => setBidValue(e.target.value)}
        />
        <button onClick={placeBid}>Place Bid</button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
