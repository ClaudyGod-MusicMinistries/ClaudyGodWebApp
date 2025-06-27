import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const ConfirmPayment = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const paymentMethod = location.state?.paymentMethod;
  const [confirmation, setConfirmation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      const res = await fetch(
        `http://localhost:10000/api/order/${orderId}/confirm-payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            paymentMethod, 
            confirmation 
          })
        }
      );
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Payment confirmation failed");
      
      navigate(`/order-success/${orderId}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        Confirm {paymentMethod === "zelle" ? "Zelle" : "PayPal"} Payment
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">
            {paymentMethod === "zelle" 
              ? "Zelle Confirmation Number" 
              : "PayPal Transaction ID"} *
          </label>
          <input
            type="text"
            required
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder={
              paymentMethod === "zelle" 
                ? "Enter confirmation number" 
                : "Enter transaction ID"
            }
          />
        </div>
        
        {error && <p className="text-red-500">{error}</p>}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-700 text-white py-3 rounded-lg disabled:opacity-50"
        >
          {isSubmitting ? "Processing..." : "Confirm Payment"}
        </button>
      </form>
    </div>
  );
};

export default ConfirmPayment;