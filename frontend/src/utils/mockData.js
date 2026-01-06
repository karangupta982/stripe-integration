import chargingcableImg from '../assets/chargingcable.png';
import headphone from '../assets/headphone.jpg';
import keyboard from '../assets/keyboard.jpg';
import laptopstand from '../assets/laptopstand.jpg';
import lightbar from '../assets/lightbar.jpg';
import mouse from '../assets/mouse.jpg';
import ssd from '../assets/ssd.jpg';
import webcam from '../assets/webcam.jpg';


export const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    price: 149.99,
    image: headphone,
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'USB-C Charging Cable',
    description: 'Fast charging 2-meter USB-C cable compatible with all devices',
    price: 12.99,
    image:chargingcableImg,
    category: 'Accessories',
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with customizable switches',
    price: 89.99,
    image: keyboard,
    category: 'Electronics',
  },
  {
    id: 4,
    name: 'Laptop Stand',
    description: 'Adjustable aluminum laptop stand for improved ergonomics',
    price: 34.99,
    image: laptopstand,
    category: 'Accessories',
  },
  {
    id: 5,
    name: '4K Webcam',
    description: 'Ultra HD webcam with auto-focus and built-in microphone',
    price: 129.99,
    image: webcam,
    category: 'Electronics',
  },
  {
    id: 6,
    name: 'Portable SSD 1TB',
    description: 'High-speed external solid state drive with USB 3.2 interface',
    price: 99.99,
    image: ssd,
    category: 'Storage',
  },
  {
    id: 7,
    name: 'Wireless Mouse',
    description: 'Precision optical mouse with extended battery life',
    price: 24.99,
    image: mouse,
    category: 'Accessories',
  },
  {
    id: 8,
    name: 'Monitor Light Bar',
    description: 'Smart LED monitor light bar for reduced eye strain',
    price: 59.99,
    image: lightbar,
    category: 'Accessories',
  },
];
