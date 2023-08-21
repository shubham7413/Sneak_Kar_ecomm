import React, { useState, useEffect } from 'react';
import './transaction.scss';
import useToken from './hooks/useToken';
import { Button, CircularProgress, LinearProgress } from '@mui/material';
import "./table.css"
const { ethers } = require('ethers');





// yea kyu kiya??




const valueInWei = ethers.utils.parseEther('2.5');
const formatEther = ethers.utils.formatEther(valueInWei);


// import { ethers } from 'ethers';
// Replace with your actual private key
const privateKey = '24f17f06fca6eae7f28b581eaf83ec23ee62004f027bed726798ac2b22cae7ae';

// Replace with the contract address and ABI
const nike = '0x9e84dc3b653E63806FFA245f52ba49C0c3A959e8';
const puma = '0x3Bbc06863d2cF4E49C7510947BdBcE2d30B757AF';
const ads = '0xC8E81fe181ce5f426e4Dd14134Edf744beB182e8';
const rbk = '0x1570F2dA362840Ca18f01A0F6bC0bBb671E86e0A';
const skt = '0xA242C57922e5e18A532f201945be4e3bC3465897';
const contractABI = require('./ABI.json');

// Create a wallet instance from the private key
const wallet = new ethers.Wallet(privateKey);

// Set up the provider (Ethereum node)
const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth_goerli');

// Connect the wallet to the provider
const connectedWallet = wallet.connect(provider);

// Create a contract instance
const contract = new ethers.Contract(nike, contractABI, connectedWallet);

function Transaction() {
    const [accountNumber, setAccountNumber] = useState('--');
    const [balance, setBalance] = useState(0.0);
    const [decaying, setDecaying] = useState(false);
 
    // Decaying function
    // useEffect(() => {
    //     if (!decaying) {
    //         // Run every 15 days (in milliseconds)
    //         // const decayInterval = 15 * 24 * 60 * 60 * 1000;
            
    //         const decayInterval = 300 * 1000;
    //         console.log('decaying');

    //         const decayTimer = setInterval(async () => {
    //             // Calculate the amount to decay (10% of current token balance)
    //             const decayAmount = Math.floor(token * 0.10);
 
    //             if (decayAmount > 0) {
    //                 // Perform the token decay
    //                 const burnTransaction = await contract.burn(address, decayAmount);
 
    //                 // Update token balance
    //                 setToken(token - decayAmount);
 
    //                 // Add the decay transaction to the payments list
    //                 const item1 = {
    //                     hash: burnTransaction.hash,
    //                     time: new Date().toLocaleString(),
    //                     value: -decayAmount,
    //                     comment: 'Token Decay (-10%)',
    //                 };
    //                 setPayments([item1, ...payments]);
 
    //                 console.log("Decayed");
    //             }
    //         }, decayInterval);
 
    //         setDecaying(true);
 
    //         // Clean up the interval when the component unmounts
    //         return () => clearInterval(decayTimer);
    //     }
    // }, [decaying, token, address, payments]);
 

    const [transactionIds, setTransactionIds] = useState([]);

    const { address, setAddress, token, setToken, payments, setPayments} = useToken();
    const [errorMessage, setErrorMessage] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const [loading, setLoading] = useState(false)
    const accountChangeHandler = async (newAccount) => {
        setLoading(true)
        setAddress(newAccount);
        // getUserBalance(newAccount.toString());
        const balance = await contract.balanceOf(address);
        console.log(`Balance of tokens at address : ${balance.toString()}`);

        setToken(parseInt(balance));
        setLoading(false)
    };
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

      // Decay effect
  setInterval(async ()=>{

    const burnTransaction = await contract.burn(address, token/10);
    setToken((9*token)/10)
    console.log("Decaying")
    const item1 = {
      hash: burnTransaction.hash,
      time: new Date().toLocaleString(),
      value: -parseInt(Math.min(100, parseInt(token))),
      comment:"Decayed"
    }
    setPayments([item1, ...payments])
    console.log("Decayed")
}, 300000)

    useState(()=>{
        connectWalletHandler()
        console.log('Onnecting')
    }, [address, token])

    // const getUserBalance = (address) => {
    //     window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] })
    //         .then(balance => {
    //             setToken(formatEther(balance));
    //         })
    // };

    const chainChangeHandler = () => {
        window.location.reload();
    }

    window.ethereum.on('accountChange', accountChangeHandler);

    window.ethereum.on('chainChanged', chainChangeHandler);

    // const data = [
    //     { name: 'John Doe', age: 30, location: 'New York' ,price :90 },
    //     { name: 'Jane Smith', age: 25, location: 'Los Angeles' , price :40 },
    //     // Add more data rows as needed
    // ];
    
    // const item1 = {
    //     hash: burnTransaction.transactionHash,
    //     time: new Date().now(),
    //     value: -parseInt(Math.min(100, parseInt(token)))
    //   }
    console.log(payments);

    return (

        <div>
            <div className="walletCard">
                <h4>{"Connection to MetaMask using window.ethereum methods"}</h4>
                <Button variant='contained' onClick={connectWalletHandler} disabled={token != 0}>
                {connButtonText}
                </Button>
                <div className="accountDisplay">
                    <h3>Address: {address}</h3>
                </div>
                {errorMessage}
            </div>
            <div className="App">
                <header className="App-header">
                    <h1>Account Overview</h1>
                    {
                        loading ? <CircularProgress /> :
                        <div className="account-container">
                        <div className="account-info">
                            <p className="account-label">Wallet Address</p>
                            <p className="account-value">{address || "Please connect your wallet"}</p>
                        </div>
                        <div className="account-info">
                            <p className="account-label">Available Tokens</p>
                            <p className="account-value">{token}</p>
                        </div>
                    </div>
                    }
                    
                    <h2 className="transaction-heading">Transaction IDs</h2>
                    <ul className="transaction-list">
                        {transactionIds.map(transactionId => (
                            <li key={transactionId} className="transaction-item">
                                {transactionId}
                            </li>
                        ))}
                    </ul>

                    {/* <table>
                        <tr>

                        </tr>
                    </table> */}
                    
                </header>
                <div className="table-container">
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>TransactionHash</th>
                        <th>Comments</th>
                        <th>Tokens</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((row, index) => (
                        <tr key={index}>
                            <td>{row.time}</td>
                            <td>{row.hash}</td>
                            <td>{row.comment}</td>
                            <td className={row.value<0 ? 'negative-value': 'positive-value'}>{row.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
            </div>
        </div>
    );
}

export default Transaction;
