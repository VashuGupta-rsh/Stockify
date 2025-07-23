import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Funds = () => {
  const [funds, setFunds] = useState(0);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const res = await axios.get("http://localhost:3002/getUserFunds", { withCredentials: true });
        setFunds(res.data.funds);
      } catch (err) {
        toast.error("Failed to load funds");
      }
    };

    fetchFunds();
  }, []);


  const handleTransaction = async (type) => {
    const amt = Number(amount);
    if (!amt || amt <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (type === "withdraw" && amt > funds) {
      toast.error("Insufficient funds");
      return;
    }

    try {
      const url =
        type === "add"
          ? "http://localhost:3002/depositFunds"
          : "http://localhost:3002/withdrawFunds";

      const res = await axios.post(url, { amount: amt }, { withCredentials: true });

      setFunds(res.data.funds);
      toast.success(res.data.msg);
      setAmount("");

    } catch {
       toast.error(err.response?.data?.msg || "Transaction failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "30px auto",
        padding: "50px",
        border: "2px solid #ccc",
        borderRadius: "25px",
      }}
    >
      <h2 style={{ textAlign: "center", padding: "10px" }}>Manage Funds</h2>
      <p style={{ textAlign: "center", fontWeight: "bold", marginBottom: "20px"}}>
        Current Balance: ₹{funds.toFixed(2)}

      </p>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: "94%", padding: "10px", marginBottom: "25px"  }}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button 
          onClick={() => handleTransaction("add")}
          style={{
            width: "45%",
            padding: "8px",
            borderRadius: "15px",
            backgroundColor: "#3898db",
            color: "white",
          }}
        >
          Add
        </button>
        <button 
          onClick={() => handleTransaction("withdraw")}
          style={{
            width: "45%",
            padding: "8px",
            borderRadius: "15px",
            backgroundColor: "#FF3145",
            color: "white",
          }}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default Funds;
