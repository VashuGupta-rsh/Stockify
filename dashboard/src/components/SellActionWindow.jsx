import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import { useHoldings } from "./HoldingsContext";

import { watchlist } from "../data/data";

import "./BuyActionWindow.css"; // Reusing the same styles

import { toast } from "react-toastify";


const SellActionWindow = ({ uid }) => {
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

  const handleSellClick = async () => {

    try {
      const response = await axios.post(
        "http://localhost:3002/stockSell",
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
        generalContext.closeSellWindow();
      } else {
        toast.error(response.data.message);
      }
      
    } catch (error) {
       toast.error(error.response?.data?.message || "Error selling stock");
    }
  };

  const handleCancelClick = () => {
    generalContext.closeSellWindow();
  };

  return (
    <div className="container" id="sell-window" draggable="true">
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
            <legend>Sell Price</legend>
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
          Estimated return ₹
          {livePrice ? (livePrice * stockQuantity).toFixed(2) : "Loading..."}
        </span>
        <div>
          <button className="btn btn-red" onClick={handleSellClick}>
            Sell
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
