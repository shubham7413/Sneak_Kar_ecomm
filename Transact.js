import React, { useState } from 'react';
import useToken from './client/src/hooks/useToken';

const { ethers } = require('ethers');

// yea kyu kiya??
const valueInWei = ethers.utils.parseEther('2.5'); 
const formatEther = ethers.utils.formatEther(valueInWei);
 
const Transact = () => {
  const {address, setAddress, token, setToken} = useToken();
    const [errorMessage, setErrorMessage] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');
 
    const accountChangeHandler = async (newAccount) => {
        setAddress(newAccount);
        // getUserBalance(newAccount.toString());
        const balance = await contract.balanceOf(address);
      console.log(`Balance of tokens at address : ${balance.toString()}`);

      setToken(balance);
    };
 
    const getUserBalance = (address) => {
        window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] })
            .then(balance => {
                setToken(formatEther(balance));
            })
    };
 
    const chainChangeHandler = () => {
        window.location.reload();
    }
 
    window.ethereum.on('accountChange', accountChangeHandler);
 
    window.ethereum.on('chainChanged', chainChangeHandler);
 
 
    const connectWalletHandler = () => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(result => {
                    accountChangeHandler(result[0]);
                })
        } else {
            setErrorMessage("Install MetaMask");
        }
    };
 
    return (
      <div className="walletCard">
        <h4>{"Connection to MetaMask using window.ethereum methods"}</h4>
        <button onClick={connectWalletHandler}>{connButtonText}</button>
        <div className="accountDisplay">
            <h3>Address: {address}</h3>
        </div>
        {errorMessage}
      </div>
    );
}
 
export default Transact;



// const ethers = require('ethers');
 
// // import { ethers } from 'ethers';
// // Replace with your actual private key
// const privateKey = '24f17f06fca6eae7f28b581eaf83ec23ee62004f027bed726798ac2b22cae7ae';
 
// // Replace with the contract address and ABI
// const nike = '0x9e84dc3b653E63806FFA245f52ba49C0c3A959e8';
// const puma = '0x3Bbc06863d2cF4E49C7510947BdBcE2d30B757AF';
// const ads = '0xC8E81fe181ce5f426e4Dd14134Edf744beB182e8';
// const rbk = '0x1570F2dA362840Ca18f01A0F6bC0bBb671E86e0A';
// const skt = '0xA242C57922e5e18A532f201945be4e3bC3465897';
// const contractABI = require('./ABI.json');
 
// // Create a wallet instance from the private key
// const wallet = new ethers.Wallet(privateKey);
 
// // Set up the provider (Ethereum node)
// const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth_goerli');
 
// // Connect the wallet to the provider
// const connectedWallet = wallet.connect(provider);
 
// // Create a contract instance
// const contract = new ethers.Contract(nike, contractABI, connectedWallet);
 
// (async () => {
//     try {
//         // Call a specific function of the contract
//         const transactionResponse = await contract.mint('0x57012F9656E7d918964bbF8acA22de688867dADa', 20); // yaha pe uska addresss aa jayega
 
//         // Wait for the transaction to be mined and confirmed
//         const receipt = await transactionResponse.wait();
 
//         console.log('Transaction receipt:', receipt);
//     } catch (error) {
//         console.error('Error calling function:', error);
//     }
// })();
 
 
// // (async () => {
// //     try {
// //       // Replace with the actual Ethereum address for which you want to check the balance
// //       const targetAddress = 'TARGET_ADDRESS';
  
// //       // Call the balanceOf function of the ERC-20 contract
// //       const balance = await contract.balanceOf(targetAddress);
  
// //       console.log('Balance:', balance.toString());
// //     } catch (error) {
// //       console.error('Error calling balanceOf function:', error);
// //     }
// //   })();