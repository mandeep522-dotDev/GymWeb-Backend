import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useLocation } from "react-router-dom";


export default function Payment() {
  const [amount, setAmount] = useState("");
  const [service, setService] = useState("");
  const [method, setMethod] = useState("upi");

  const user = JSON.parse(localStorage.getItem("user"));
  
  const { state } = useLocation();
  useEffect(() => {
    setAmount(state?.amount || "");
    setService(state?.service || "");
  },[state])

  const handlePayment = async () => {
    await api.post("/payment/create", {
      name: service,
      amount,
      method,
      user,
    });

    alert("Payment Successful 🎉");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[380px] bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Complete Payment
        </h2>

        {/* NAME */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            value={service}
            onChange={(e) =>{
                setService(e.target.value)
            }}
            type="text"
            placeholder="Enter your name"
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* PRICE */}
        <div className="flex justify-between items-center mb-4 text-lg">
          <span>Total Amount</span>
          <span className="font-bold">₹{amount}</span>
        </div>

        {/* PAYMENT TABS */}
        <div className="flex gap-2 mb-4">
          {["upi", "card", "netbanking"].map((item) => (
            <button
              key={item}
              onClick={() => setMethod(item)}
              className={`flex-1 py-2 rounded-md border text-sm font-medium
                ${
                  method === item
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700"
                }`}
            >
              {item === "upi"
                ? "UPI"
                : item === "card"
                ? "Card"
                : "Net Banking"}
            </button>
          ))}
        </div>

        {/* UPI */}
        {method === "upi" && (
          <div className="mb-4">
            <label className="block text-sm font-medium">UPI ID</label>
            <input
              type="text"
              placeholder="example@upi"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* CARD */}
        {method === "card" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full mt-1 px-3 py-2 border rounded-md"
              />
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="w-1/2 px-3 py-2 border rounded-md"
              />
              <input
                type="password"
                placeholder="CVV"
                className="w-1/2 px-3 py-2 border rounded-md"
              />
            </div>
          </>
        )}

        {/* NET BANKING */}
        {method === "netbanking" && (
          <div className="mb-4">
            <label className="block text-sm font-medium">Select Bank</label>
            <select className="w-full mt-1 px-3 py-2 border rounded-md">
              <option>SBI</option>
              <option>HDFC</option>
              <option>ICICI</option>
              <option>Axis Bank</option>
            </select>
          </div>
        )}

        {/* PAY BUTTON */}
        <button
          onClick={handlePayment}
          className="w-full bg-green-600 hover:bg-green-800 active:scale-95 text-white py-3 rounded-md font-semibold transition">
          Pay ₹{amount}
        </button>

        <p className="text-center text-xs text-gray-500 mt-3">
          🔒 100% Secure Payment
        </p>
      </div>
    </div>
  );
}
