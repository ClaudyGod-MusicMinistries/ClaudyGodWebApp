import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const SuccessPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:10000/api/order/${orderId}`);
        const data = await res.json();
        
        if (res.ok) {
          setOrder(data);
        } else {
          setError(data.error || "Failed to load order details");
        }
      } catch (err) {
        setError("Network error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900">Order Confirmed!</h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your order #{orderId} has been confirmed.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-3">
          {order.items.map((item: any) => (
            <div key={item.productId} className="flex justify-between">
              <span>{item.name} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          
          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Name</p>
            <p>{order.shippingInfo.firstName} {order.shippingInfo.lastName}</p>
          </div>
          <div>
            <p className="font-medium">Email</p>
            <p>{order.shippingInfo.email}</p>
          </div>
          <div>
            <p className="font-medium">Phone</p>
            <p>{order.shippingInfo.phone}</p>
          </div>
          <div>
            <p className="font-medium">Address</p>
            <p>{order.shippingInfo.address}</p>
          </div>
          <div>
            <p className="font-medium">City</p>
            <p>{order.shippingInfo.city}</p>
          </div>
          <div>
            <p className="font-medium">State</p>
            <p>{order.shippingInfo.state}</p>
          </div>
          <div>
            <p className="font-medium">Country</p>
            <p>{order.shippingInfo.country}</p>
          </div>
          <div>
            <p className="font-medium">Nearest Location</p>
            <p>{order.shippingInfo.nearestLocation}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => window.location.href = "/"}
          className="bg-purple-700 text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;