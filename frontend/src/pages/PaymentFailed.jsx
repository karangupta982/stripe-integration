import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { updateOrderStatus } from '../services/api';



export default function PaymentFailed({ onNavigate }) {
  const handleTryAgain = () => {
    onNavigate('checkout');
  };

  const handleBackToProducts = () => {
    onNavigate('products');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md animate-slideUp">
        <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-white text-5xl">❌</span>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Payment Failed</h2>
        
        <p className="text-gray-600 mb-4">
          We were unable to process your payment. This could be due to insufficient funds, 
          incorrect card details, or a temporary issue with your bank.
        </p>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-700">
            💡 Please check your payment method and try again. If the problem persists, 
            contact your bank or try a different payment method.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 active:scale-95 transition-all shadow-lg"
            onClick={handleTryAgain}
          >
            Try Again
          </button>
          <button 
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 active:scale-95 transition-all"
            onClick={handleBackToProducts}
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}
