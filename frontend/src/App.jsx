import { useState } from 'react';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import './App.css';


export default function App() {
  const [currentPage, setCurrentPage] = useState('products');
  const [pageData, setPageData] = useState(null);

  const handleNavigate = (page, data = null) => {
    setCurrentPage(page);
    setPageData(data);
  };

  return (
    <div>
      {currentPage === 'products' && (
        <ProductsPage onNavigate={handleNavigate} />
      )}
      
      {currentPage === 'checkout' && (
        <CheckoutPage onNavigate={handleNavigate} cartData={pageData} />
      )}
      
      {currentPage === 'success' && (
        <PaymentSuccess onNavigate={handleNavigate} paymentData={pageData} />
      )}
      
      {currentPage === 'failed' && (
        <PaymentFailed onNavigate={handleNavigate} />
      )}
    </div>
  );
}
