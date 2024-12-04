import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MyTokenABI from './contracts/MyTokenABI.json';

function App() {
  const [tokenData, setTokenData] = useState({
    name: '',
    symbol: '',
    totalSupply: '',
  });
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [transferAddress, setTransferAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [tokenContract, setTokenContract] = useState(null);
  
  const tokenAddress = process.env.REACT_APP_TOKEN_ADDRESS;

  useEffect(() => {
    if (window.ethereum) {
      loadBlockchainData();
    } else {
      alert('Please install MetaMask to use this dApp!');
    }
  }, []);

  async function loadBlockchainData() {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const accountAddress = await signer.getAddress();
      setAccount(accountAddress);

      const tokenContract = new ethers.Contract(tokenAddress, MyTokenABI, signer);
      setTokenContract(tokenContract);
      const name = await tokenContract.name();
      const symbol = await tokenContract.symbol();
      const totalSupply = await tokenContract.totalSupply();

      setTokenData({
        name,
        symbol,
        totalSupply: ethers.formatEther(totalSupply),
      });
      const userBalance = await tokenContract.balanceOf(accountAddress);
      setBalance(ethers.formatEther(userBalance));
    } catch (error) {
      console.error('Error loading blockchain data:', error);
      console.log('MyTokenABI:', MyTokenABI);
      console.log('MyTokenABI ABI:', MyTokenABI.abi);

    }
  }
  async function transferTokens(event) {
    event.preventDefault();
    if (tokenContract && transferAddress && transferAmount) {
      try {
        const tx = await tokenContract.transfer(
          transferAddress,
          ethers.parseEther(transferAmount)
        );
        await tx.wait();
        alert('Transfer successful!');
        // Update balance
        const userBalance = await tokenContract.balanceOf(account);
        setBalance(ethers.formatEther(userBalance));
      } catch (error) {
        console.error('Transfer failed:', error);
        alert('Transfer failed!');
      }
    }
  }
  return (
    <div className="container mt-5">
      <h1 className="text-center">
        {tokenData.name} ({tokenData.symbol})
      </h1>
      <p className="text-center">Total Supply: {tokenData.totalSupply}</p>
      <p className="text-center">Your Account: {account}</p>
      <p className="text-center">Your Balance: {balance} {tokenData.symbol}</p>
    
    
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={transferTokens}>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Recipient Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={transferAddress}
                onChange={(e) => setTransferAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Amount to Transfer
              </label>
              <input
                type="number"
                step="any"
                className="form-control"
                id="amount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Transfer Tokens
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
