// import { useState } from 'react';
// import './CheckoutForm.css';

// /**
//  * CheckoutForm Component
//  * Collects customer email before processing payment
//  */

// export default function CheckoutForm({
//   cartItems,
//   totalAmount,
//   onSubmit,
//   onCancel,
// }) {
//   // State for email input and validation
//   const [email, setEmail] = useState('');
//   const [emailError, setEmailError] = useState('');

//   /**
//    * Handle email input change
//    * Updates email state and clears error message
//    */
//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     setEmailError(''); // Clear error when user starts typing
//   };

//   /**
//    * Validate email format
//    * Checks if email is not empty and matches valid email pattern
//    * @returns {boolean} True if email is valid, false otherwise
//    */
//   const validateEmail = () => {
//     // Check if email is empty
//     if (!email.trim()) {
//       setEmailError('Email is required');
//       return false;
//     }

//     // Regular expression for valid email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(email)) {
//       setEmailError('Please enter a valid email address');
//       return false;
//     }

//     return true;
//   };

//   /**
//    * Handle form submission
//    * Validates email and calls onSubmit with checkout data
//    */
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate email before proceeding
//     if (!validateEmail()) {
//       return;
//     }

//     // Call onSubmit with checkout data
//     onSubmit({
//       email,
//       items: cartItems,
//       totalAmount,
//     });
//   };

//   return (
//     <div className="checkout-form">
//       {/* Form Title */}
//       <h2>Checkout</h2>

//       {/* Cart Items Summary */}
//       <div className="checkout-summary">
//         <h3>Order Summary</h3>
//         <div className="checkout-items">
//           {cartItems.map((item) => (
//             <div key={item.id} className="checkout-item">
//               <span className="checkout-item-name">{item.name}</span>
//               <span className="checkout-item-qty">x{item.quantity}</span>
//               <span className="checkout-item-price">
//                 ${(item.price * item.quantity).toFixed(2)}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Total Amount */}
//         <div className="checkout-total">
//           <span className="checkout-total-label">Total:</span>
//           <span className="checkout-total-amount">
//             ${totalAmount.toFixed(2)}
//           </span>
//         </div>
//       </div>

//       {/* Checkout Form */}
//       <form onSubmit={handleSubmit} className="checkout-form-fields">
//         {/* Email Input */}
//         <div className="form-group">
//           <label htmlFor="email">Email Address</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={handleEmailChange}
//             placeholder="your.email@example.com"
//             className={`form-input ${emailError ? 'error' : ''}`}
//           />

//           {/* Email Error Message */}
//           {emailError && (
//             <span className="error-message">{emailError}</span>
//           )}
//         </div>

//         {/* Form Action Buttons */}
//         <div className="form-buttons">
//           <button
//             type="button"
//             className="btn-cancel"
//             onClick={onCancel}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="btn-payment"
//             disabled={!email}
//           >
//             Proceed to Payment
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }












import {useState} from 'react';

export default function CheckoutForm({ cartItems, totalAmount, onSubmit, onCancel }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError('Email is required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail()) return;
    onSubmit({ email, items: cartItems, totalAmount });
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto animate-slideUp">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h2>

      {/* Order Summary */}
      <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
        <div className="space-y-3 mb-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-sm bg-white rounded-lg p-3">
              <span className="text-gray-700 flex-1 font-medium">{item.name}</span>
              <span className="text-gray-600 mx-4 bg-gray-100 px-3 py-1 rounded-full">x{item.quantity}</span>
              <span className="font-bold text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-blue-200 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-800">Total:</span>
          <span className="text-3xl font-bold text-blue-600">
            ${totalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Email Input */}
      <div className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="your.email@example.com"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
              emailError 
                ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }`}
          />
          {emailError && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm animate-shake">
              <span>⚠️</span>
              <span>{emailError}</span>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 active:scale-95 transition-all"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!email}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed active:scale-95 transition-all shadow-lg"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}