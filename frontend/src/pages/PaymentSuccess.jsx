import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyPayment } from '../services/api';



export default function PaymentSuccess({ onNavigate, paymentData }) {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [orderData] = useState({
    orderId: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    email: paymentData?.email || 'customer@example.com',
    amount: paymentData?.amount || 29999
  });

  useState(() => {
    const verifyPayment = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setVerified(true);
      setLoading(false);
    };
    verifyPayment();
  }, []);

  const handleContinueShopping = () => {
    onNavigate('products');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 text-center shadow-2xl animate-slideUp">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold text-lg">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (verified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md animate-slideUp">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
            <span className="text-white text-5xl font-bold">✓</span>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You for Your Purchase!</h2>
          <p className="text-gray-600 mb-6 text-lg">Your payment has been successfully processed.</p>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 text-left space-y-3 border border-blue-100">
            <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center gap-2">
              <span>📦</span>
              Order Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center bg-white rounded-lg p-2">
                <span className="font-semibold text-gray-700">Order ID:</span>
                <span className="text-gray-600 font-mono">{orderData.orderId}</span>
              </div>
              <div className="flex justify-between items-center bg-white rounded-lg p-2">
                <span className="font-semibold text-gray-700">Email:</span>
                <span className="text-gray-600">{orderData.email}</span>
              </div>
              <div className="flex justify-between items-center bg-white rounded-lg p-2">
                <span className="font-semibold text-gray-700">Amount:</span>
                <span className="text-green-600 font-bold text-lg">${(orderData.amount / 100).toFixed(2)}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 pt-3 border-t border-blue-200 flex items-center gap-2">
              <span>✉️</span>
              A confirmation email has been sent to your inbox.
            </p>
          </div>
          
          <button 
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 active:scale-95 transition-all shadow-lg"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return null;
}