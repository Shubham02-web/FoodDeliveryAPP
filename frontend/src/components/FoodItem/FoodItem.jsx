import { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext"; // Import context

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext); // Access context values

  const itemCount = cartItems[id] || 0; // Get the count for this specific item

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={url + "/image/" + image}
          alt={name}
        />
        {itemCount === 0 ? (
          <img
            className="add"
            onClick={() => addToCart(id)} // Add item to cart
            src={assets.add_icon_white}
            alt="Add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)} // Remove item from cart
              src={assets.remove_icon_red}
              alt="Remove"
            />
            <p>{itemCount}</p>
            <img
              onClick={() => addToCart(id)} // Increment item count
              src={assets.add_icon_green}
              alt="Add"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
