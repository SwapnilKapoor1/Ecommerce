import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { deleteProduct, updateProduct } from '../api/productsApi';
import './ProductCard.css';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleDelete = async () => {
    try {
      //await deleteProduct(product.id);
      dispatch({ type: 'DELETE_PRODUCT', payload: product.id });
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete product.");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      //await updateProduct(editedProduct.id, editedProduct);  // required in real case but as API is dummy, will throw error
      dispatch({ type: 'UPDATE_PRODUCT', payload: editedProduct });
      setIsEditing(false);
      toast.success("Product updated successfully!");
    } catch (error) {
      toast.error("Failed to update product.");
    }
  };
  const handleCancel=()=>{
    setIsEditing(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleAdd=()=>{
      try{
        dispatch({ type: 'ADD_TO_CART', payload: product });
        toast.success("Product added to cart successfully!");
         } catch (error) {
         toast.error("Failed to add product.");
        }
  };

  // Helper function to render rating stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating-1) {
        stars.push(<span key={i}>&#9733;</span>); // filled star
      } else {
        stars.push(<span key={i}>&#9734;</span>); // empty star
      }
    }
    return stars;
  };

  return (
    <div className="product-card">
      <div className="product-card-content">
        <img src={product.images} alt={product.name} className="product-image" />
        <div className="product-info">
          {isEditing ? (
            <>
              <input
                type="text"
                name="title"
                value={editedProduct.title}
                onChange={handleChange}
                className="edit-input"
              />
              <input
                type="number"
                name="price"
                value={editedProduct.price}
                onChange={handleChange}
                className="edit-input"
              />
              <label for="rating">Rating</label>
              <input
                type="number"
                name="rating"
                value={editedProduct.rating}
                onChange={handleChange}
                className="edit-input"
              />
               <input
                type="text"
                name="description"
                value={editedProduct.description}
                onChange={handleChange}
                className="edit-input"
              />
              <button onClick={handleSave} className="save-button">Save</button>
              <button onClick={handleCancel} className="cancel-button">Cancel</button>
            </>
          ) : (
            <>
              <h3>{product.title}</h3>
              <p>Rs {product.price}</p>
              <div className="product-rating">{renderStars(product.rating)}</div>
              <p className="product-description">{product.description}</p>
            </>
          )}
          
        </div>
      </div>
      <div className="container">
        <div className="product-actions">
          <button onClick={handleEdit} className="edit-button">Edit</button>
          <button onClick={handleAdd} className="add-button">Add to Cart</button>
          <button onClick={handleDelete} className="delete-button">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
