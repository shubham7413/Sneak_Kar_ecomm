import React, { useState } from "react";
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { useDispatch } from "react-redux";
import { makeRequest } from "../../makeRequest";
import { loadStripe } from "@stripe/stripe-js";
import useToken from '../../hooks/useToken';
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const { ethers } = require('ethers');
 
// import { ethers } from 'ethers';
// Replace with your actual private key
const privateKey = '24f17f06fca6eae7f28b581eaf83ec23ee62004f027bed726798ac2b22cae7ae';
 
// Replace with the contract address and ABI
const nike = '0x9e84dc3b653E63806FFA245f52ba49C0c3A959e8';
const puma = '0x3Bbc06863d2cF4E49C7510947BdBcE2d30B757AF';
const ads = '0xC8E81fe181ce5f426e4Dd14134Edf744beB182e8';
const rbk = '0x1570F2dA362840Ca18f01A0F6bC0bBb671E86e0A';
const skt = '0xA242C57922e5e18A532f201945be4e3bC3465897';
const contractABI = require('../../ABI.json');
 
// Create a wallet instance from the private key
const wallet = new ethers.Wallet(privateKey);
 
// Set up the provider (Ethereum node)
const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth_goerli');
 
// Connect the wallet to the provider
const connectedWallet = wallet.connect(provider);
 
// Create a contract instance
const contract = new ethers.Contract(nike, contractABI, connectedWallet);
 
 
const Cart = ({setOpen}) => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
 
  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  const {address, setAddress, token, setToken, payments, setPayments} = useToken();
  const [applied, setApplied] = useState(true)
  const navigate=useNavigate();



 
  const handlePayment = async () => {
    setOpen(false)
    try {
      // const stripe = await loadStripe(
        //   "pk_test_51NekqASJQ667AMLho75IXiOnIS3qfsX6arxvo1lllNo9nqGagV9ODEM0LmpXJFR5eUxYIoGxWry3y8xNXkxLI3j600Hw2X00ci"
        // );
        
        // Call a specific function of the contract
        
        // Burning
        // await contract.burn(address, Math.min(100, parseInt(Math.min(100, parseInt(token)))));
        
        
        // always being called.
        
        if (applied) {
          const burnTransaction = await contract.burn(address, Math.min(100, parseInt(token)));
          console.log(burnTransaction);
          const item1 = {
            hash: burnTransaction.hash,
            time: new Date().toLocaleString(),
            value: -parseInt(Math.min(100, parseInt(token))),
            comment: "Burned"
          };
          setPayments(prevArray => [item1, ...prevArray]);
          await new Promise(resolve => setTimeout(resolve, 8000));
        }


    // Minting
    const transactionResponse = await contract.mint(address, Math.min(50, parseInt((totalPrice() - Math.min(100, parseInt(token))*10)/100)));
    console.log("Minting start...");
    console.log(transactionResponse);

    // Wait for the transaction to be mined and confirmed
    const receipt = await transactionResponse.wait();
    const balance = await contract.balanceOf(address);
    setToken(parseInt(balance));

    console.log('Transaction receipt:', receipt);

    const item2 = {
      hash:transactionResponse.hash,
      time: new Date().toLocaleString(),
      value: Math.min(50, parseInt((totalPrice() - Math.min(100, parseInt(token))*10)/100)),
      comment: "Minted"
    };

    setPayments(prevArray => [item2, ...prevArray]);

    const res = await makeRequest.post("/orders", {
      products,
    });

      // navigate("/")
 
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {products?.map((item) => (
        <div className="item" key={item.id}>
          <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt="" />
          <div className="details">
            <h1>{item.title}</h1>
            <p>{item.desc?.substring(0, 100)}</p>
            <div className="price">
              {item.quantity} x ₹{item.price}
            </div>
          </div>
          <DeleteOutlinedIcon
            className="delete"
            onClick={() => dispatch(removeItem(item.id))}
          />
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <div className="total-side">
        <div>₹{totalPrice()}</div>
        {
          applied && <>
            <div> - ₹{Math.min(100, parseInt(token))*10}</div>
            <div>₹{totalPrice() - Math.min(100, parseInt(token))*10}</div>
          </>
        }
        </div>
        
        
      </div>
      <FormGroup>
      <FormControlLabel control={<Checkbox value={applied} onClick={()=>setApplied(!applied)} defaultChecked />} label="Apply SneaKoins" />
    </FormGroup>
      <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
      <span className="reset" onClick={() => dispatch(resetCart())}>
        Reset Cart
      </span>
    </div>
  );
};
 
export default Cart;

// const { ethers } = require('ethers');
 
// // import { ethers } from 'ethers';
// // Replace with your actual private key
// const privateKey = '24f17f06fca6eae7f28b581eaf83ec23ee62004f027bed726798ac2b22cae7ae';
 
// // Replace with the contract address and ABI
// const nike = '0x9e84dc3b653E63806FFA245f52ba49C0c3A959e8';
// const puma = '0x3Bbc06863d2cF4E49C7510947BdBcE2d30B757AF';
// const ads = '0xC8E81fe181ce5f426e4Dd14134Edf744beB182e8';
// const rbk = '0x1570F2dA362840Ca18f01A0F6bC0bBb671E86e0A';
// const skt = '0xA242C57922e5e18A532f201945be4e3bC3465897';
// const contractABI = require('../../ABI.json');
 
// // Create a wallet instance from the private key
// const wallet = new ethers.Wallet(privateKey);
 
// // Set up the provider (Ethereum node)
// // const provider = new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID');

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
 
 
// (async () => {
//     try {
//       // Replace with the actual Ethereum address for which you want to check the balance
//       const targetAddress = 'TARGET_ADDRESS';
  
//       // Call the balanceOf function of the ERC-20 contract
//       const balance = await contract.balanceOf(targetAddress);
  
//       console.log('Balance:', balance.toString());
//     } catch (error) {
//       console.error('Error calling balanceOf function:', error);
//     }
//   })();