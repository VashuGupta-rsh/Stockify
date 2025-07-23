import React, { createContext, useContext, useState, useEffect} from "react";
import axios from 'axios';

const HoldingsContext = createContext();

export const HoldingsProvider = ({ children }) => {

    const [allHoldings, setAllHoldings] = useState([]);

    const fetchHoldings = async () => {
        try {
            const response = await axios.get("http://localhost:3002/allHoldings", {
                withCredentials: true,        
            });
            setAllHoldings(response.data);
        } catch(error) {
            console.log("Error in fetching holdings", error);
        }
    };

    useEffect(() => {
        fetchHoldings();
    }, []);

    return (
        <HoldingsContext.Provider value={{allHoldings, fetchHoldings}}>
            {children}
        </HoldingsContext.Provider>
    );

};

export const useHoldings = () => useContext(HoldingsContext);
