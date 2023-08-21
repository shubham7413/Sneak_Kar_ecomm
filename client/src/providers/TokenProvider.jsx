
import { useState } from "react";
import TokenContext from "../context/TokenContext";

/*
{
    time:
    hash:
    value
}
*/
const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(0);
    const [address, setAddress] = useState(null);
    const [payments, setPayments] = useState([])

    const value = {
        token,
        setToken,
        address,
        setAddress,
        payments,
        setPayments
    }
    
    return (
        <TokenContext.Provider value = {value}>
            {children}
        </TokenContext.Provider>
    );

};

export default TokenProvider;