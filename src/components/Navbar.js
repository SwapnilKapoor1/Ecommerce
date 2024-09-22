import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';

const Navbar = () => {
  const cartItemCount = useSelector((state) => state.cart.cartItems.length);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">eCommerce</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Products</Link>
        <Link to="/add-product">Add a product</Link>
        <Link to="/cart">Cart ({cartItemCount})</Link>
      </div>
    </nav>
  );
};

export default Navbar;
