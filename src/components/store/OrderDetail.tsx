/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  CheckCircle,
  Truck,
  CreditCard,
  MapPin,
  User,
  Mail,
  Phone,
} from 'lucide-react';

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:10000/api/order/${orderId}`);
        const data = await res.json();

        if (res.ok) {
          setOrder(data);
        } else {
          setError(data.error || 'Failed to load order details');
        }
      } catch (err) {
        setError('Network error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading)
    return <div className="text-center py-20">Loading order details...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!order) return <div className="text-center py-20">Order not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 py-12">
      <div className="text-center mb-12">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900">
          Order #{order.orderId} Confirmed
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your order details are below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-6">
            <Truck className="h-8 w-8 text-purple-600 mr-3" />
            <h2 className="text-xl font-semibold">Order Summary</h2>
          </div>

          <div className="space-y-4">
            {order.items.map((item: any) => (
              <div
                key={item.productId}
                className="flex justify-between pb-3 border-b"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${order.tax?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center">
            <CreditCard className="h-6 w-6 text-gray-500 mr-2" />
            <div>
              <p className="font-medium">Payment Method</p>
              <p className="capitalize">{order.paymentInfo.method}</p>
              {order.paymentInfo.zelleConfirmation && (
                <p className="text-sm">
                  Confirmation: {order.paymentInfo.zelleConfirmation}
                </p>
              )}
              {order.paymentInfo.paypalTxnId && (
                <p className="text-sm">
                  Transaction ID: {order.paymentInfo.paypalTxnId}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-6">
            <MapPin className="h-8 w-8 text-purple-600 mr-3" />
            <h2 className="text-xl font-semibold">Shipping Details</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <User className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Name</p>
                <p>
                  {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Email</p>
                <p>{order.shippingInfo.email}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Phone</p>
                <p>{order.shippingInfo.phone}</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Address</p>
                <p>{order.shippingInfo.address}</p>
                <p>
                  {order.shippingInfo.city}, {order.shippingInfo.state}
                </p>
                <p>{order.shippingInfo.country}</p>
                <p className="mt-2">
                  <span className="font-medium">Nearest Location:</span>
                  {order.shippingInfo.nearestLocation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => (window.location.href = '/store')}
          className="bg-purple-700 text-white px-8 py-3 rounded-lg hover:bg-purple-800 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
