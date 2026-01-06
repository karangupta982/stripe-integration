// import './CartIcon.css';

// /**
//  * CartIcon Component
//  * Displays a shopping cart icon with item count badge
//  */

// export default function CartIcon({ itemCount, onClick }) {
//   return (
//     <div className="cart-icon" onClick={onClick}>
//       {/* Cart Icon */}
//       <span className="cart-icon-symbol">🛒</span>

//       {/* Item Count Badge - Only show if itemCount > 0 */}
//       {itemCount > 0 && (
//         <span className="cart-badge">{itemCount}</span>
//       )}
//     </div>
//   );
// }



export default function CartIcon({ itemCount, onClick }) {
  return (
    <div 
      className="fixed top-6 right-6 cursor-pointer bg-white rounded-full shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 z-50"
      onClick={onClick}
    >
      <div className="relative">
        <span className="text-3xl">🛒</span>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
            {itemCount}
          </span>
        )}
      </div>
    </div>
  );
}