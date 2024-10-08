import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../api/productsApi';
import './AddProduct.css';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [id, setId] = useState(0);
  const [product, setProduct] = useState({ id: '', title: '', price: '', description: '', rating: '', images: '' });

  useEffect(() => {
    setId(products.length + 1);
  }, [products]);

  useEffect(() => {
    setProduct({ ...product, id });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(product); // Although this won't update the API, it's kept for structure
      dispatch({ type: 'ADD_PRODUCTS', payload: product });
      toast.success("Product added successfully!");
      setProduct({ title: '', price: '', description: '', rating: '', images: '' });
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product.");
    }
  };

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <h2>Add a New Product</h2>
      <input
        type="text"
        name="title"
        placeholder="Product Name"
        value={product.title}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Product Price"
        value={product.price}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Product Description"
        value={product.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="rating"
        placeholder="Ratings"
        value={product.rating}
        onChange={handleChange}
        max='5'
        required
      />
      <input
        type="text"
        name="images"
        placeholder="Image URL"
        value={product.images}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
