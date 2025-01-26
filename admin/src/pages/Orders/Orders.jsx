import { useState, useEffect } from "react";
import axios from "axios";
import "./Orders.css";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="parcel icon" />
            <div>
              <p className="order-item-food">
                {order.items
                  .map((item) => `${item.name} X ${item.quantity}`)
                  .join(", ")}
              </p>
              <p className="order-item-name">
                {order.address.firstName + "  " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + " , "}</p>
                <p>
                  {order.address.city +
                    " , " +
                    order.address.state +
                    " , " +
                    order.address.country +
                    " , " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items:{order.items.length}</p>
            <p>${order.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
