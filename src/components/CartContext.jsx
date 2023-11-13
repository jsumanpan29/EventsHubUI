import { createContext, useContext, useReducer } from 'react';

// Define the initial state of the cart
const initialCartState = {
  cartItems: [],
};

// Create the context
const CartContext = createContext();

// Create a custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// Create a reducer function to handle state changes
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item !== action.payload),
      };
    default:
      return state;
  }
};

// Create the CartProvider component to wrap your app with the context provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  return (
    <CartContext.Provider value={{ cart: state.cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
