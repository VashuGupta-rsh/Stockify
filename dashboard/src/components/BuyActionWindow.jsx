import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";
import { useHoldings } from "./HoldingsContext";
import { watchlist } from "../data/data";

import "./BuyActionWindow.css";

import { toast } from "react-toastify";

const BuyActionWindow = ({ uid }) => {
  
  const [stockQuantity, setStockQuantity] = useState(1);
  const [livePrice, setLivePrice] = useState(null);
  
  const generalContext = useContext(GeneralContext);
  const { fetchHoldings } = useHoldings();
  
  
  useEffect(() => {
    // Find the static price from the watchlist
    const stock = watchlist.find((item) => item.name === uid);
    if (stock) {
      setLivePrice(stock.price);
    } 
  }, [uid]);

  const handleBuyClick = async () => {
    
    const totalCost = livePrice * stockQuantity;
    const res = await axios.get("http://localhost:3002/getUserFunds", { withCredentials: true });
  
    if (res.data.funds < totalCost) {
      toast.error("Insufficient funds. Please add more to your wallet.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3002/stockBuy", 
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(livePrice),
        },
        { withCredentials: true }
      );
  
      if (response.data.success) {
        toast.success(response.data.message);
        fetchHoldings();
        generalContext.closeBuyWindow();
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.error("Error purchasing stock:", error);
      toast.error("Error purchasing stock. Please try again.");
    }

  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Live Price</legend>
            <input    
              type="text"
              value={livePrice ? `₹${livePrice.toFixed(2)}` : "Loading..."}
              readOnly
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons"> 
        <span>
          Estimated price ₹
          {livePrice ? (livePrice * stockQuantity).toFixed(2) : "Loading..."}
        </span>
        <div>
          <button className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
          {/* <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
