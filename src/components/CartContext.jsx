import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a new context
const CartContext = createContext();

function getInitialState(){
    // const cartItems = localStorage.getItem('cartItems')
    const cartItems = sessionStorage.getItem('cartItems')
    return cartItems ? JSON.parse(cartItems) : []
}

// Create a CartProvider component to wrap your app
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getInitialState);

  useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems'))
        // console.log(storedCartItems)
        if(storedCartItems){
            setCartItems(storedCartItems)
        }
        // console.log(storedCartItems)
  }, [])

  useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  // Function to add items to the cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Function to remove items from the cart
  const removeFromCart = (itemToRemove) => {
    const updatedCart = cartItems.filter((item) => item.event_id !== itemToRemove);
    setCartItems(updatedCart);
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  const isItemInCart = (itemId) => {
    return cartItems.some(event => event.event_id === itemId)
  //  return cartItems.includes(itemId)
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, emptyCart, isItemInCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the cart context
export const useCart = () => {
  return useContext(CartContext);
};
