import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../api/productsApi';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [sorted, setSorted] = useState(false);
  const [originalProducts, setOriginalProducts] = useState([]);

  useEffect(() => {
    if (products.length === 0) { // Fetch only if products array is empty
      const getProducts = async () => {
        try {
          const response = await fetchProducts();
          dispatch({ type: 'SET_PRODUCTS', payload: response.data });
          setOriginalProducts(response.data); // Store original products
        } catch (error) {
          console.error("Failed to fetch products", error);
        }
      };
      getProducts();
    } else if(products.length!=originalProducts.length){
      setOriginalProducts(products); // Use existing products in store
    }
  }, [products]);

  const handleSortByPrice = () => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    dispatch({ type: 'SET_PRODUCTS', payload: sortedProducts });
    setSorted(true);
  };

  const handleRemoveSort = () => {
    dispatch({ type: 'SET_PRODUCTS', payload: originalProducts }); // Reset products to original
    setSorted(false);
  };

  return (
    <div className="product-list">
      <div className="sort-button-container">
        {sorted ? (
          <button className="sort-button" onClick={handleRemoveSort}>Remove Sort</button>
        ) : (
          <button className="sort-button" onClick={handleSortByPrice}>Sort by Price</button>
        )}
      </div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
