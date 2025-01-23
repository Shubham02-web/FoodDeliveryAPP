import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);
const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1, // Update specific item count
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] === 1) {
        delete updatedCart[itemId]; // Remove item if count is 1
      } else {
        updatedCart[itemId] -= 1; // Decrease count
      }
      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (let item in cartItems) {
      if (cartItems[item] > 0) {
        let item_info = food_list.find((product) => product._id === item);
        totalAmount += item_info.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
