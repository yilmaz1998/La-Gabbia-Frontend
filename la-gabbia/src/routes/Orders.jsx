import React, { useState, useEffect } from 'react'
import { axiosInstance } from '../lib/axios'
import Button from '@mui/material/Button';
import { IoFastFoodOutline } from "react-icons/io5";
import io from "socket.io-client";
import notificationSoundFile from '../sound/notification.mp3';

const notificationSound = new Audio(notificationSoundFile);

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/admin/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE_URL);
  
    socket.on("connect", () => {
      console.log("Socket connected", socket.id);
    });
  
    const handleNewOrder = (newOrder) => {
      setOrders(prev => [newOrder, ...prev]);
      notificationSound.play().catch(err => console.log("Sound play error:", err));
    }
  
    socket.on("new-order", handleNewOrder);
  
    return () => {
      socket.off("new-order", handleNewOrder);
      socket.disconnect();
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  }

  const handleUpdateStatus = async (orderId) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/orders/${orderId}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          }
        }
      );
        setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId
            ? { ...order, status: getNextStatus(order.status) }
            : order
        )
      );
      console.log(response.data.message);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  
  const getNextStatus = (currentStatus) => {
    const sequence = ['pending', 'preparing', 'out for delivery'];
    const currentIndex = sequence.indexOf(currentStatus);
    return currentIndex < sequence.length - 1
      ? sequence[currentIndex + 1]
      : currentStatus;
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axiosInstance.delete(
        `/admin/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          }
        }
      );
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
      console.log('Order deleted successfully');
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  }

  const newOrdersCount = orders.filter(order => order.status === "pending").length;

  useEffect(() => {
    if (newOrdersCount > 0) {
      document.title = `(${newOrdersCount}) New Orders - La Gabbia`;
    } else {
      document.title = 'La Gabbia';
    }
  }, [newOrdersCount]);

  return (
    <div>
      <header className="flex px-4 py-4 items-center justify-between bg-gray-900">
        <h1 className="text-3xl text-white flex gap-1"><IoFastFoodOutline />La Gabbia</h1>
        <Button onClick={handleLogOut}>Log Out</Button>
      </header>
      <div className='p-4'>
      <h1 className="text-center mt-8 text-4xl flex justify-center items-center gap-3">
        Orders
      {newOrdersCount > 0 && (
      <span className="text-base font-medium bg-red-500 text-white px-3 py-1 rounded-full shadow-md">
      {newOrdersCount} New
      </span>
      )}
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : orders.map(order => (
            <div key={order.id} className={`mt-6 border rounded px-4 py-4 ${
              order.status === "pending" ? "bg-red-300" :
              order.status === "preparing" ? "bg-amber-300" :
              order.status === "out for delivery" ? "bg-green-300" :
              ""
            }`}>
              <h2 className="text-lg font-semibold text-blue-800">Order ID: {order.id}</h2>
              <p><span className="font-semibold text-blue-800">Name:</span> {order.customer_name}</p>
              <p><span className="font-semibold text-blue-800">Address:</span> {order.customer_address}</p>
              <p><span className="font-semibold text-blue-800">Email:</span> {order.customer_email}</p>
              <p><span className="font-semibold text-blue-800">Total:</span> ${order.total_price}</p>
              <p><span className="font-semibold text-blue-800">Created:</span> {new Date(order.created_at).toLocaleString()}</p>
              <h3 className='font-semibold text-blue-800'>Items:</h3>
              <ul>
              {order.items && order.items.map(item => (
                  <li key={item.id}>
                    {item.quantity} x {item.name} {item.instruction && `(${item.instruction})`}
                  </li>
                ))}
              </ul>
              <div className='mt-2'>
              <Button variant='contained' onClick={() => handleUpdateStatus(order.id)} 
              disabled={order.status === "out for delivery"}>
                 {order.status === "pending"
                 ? "Mark as Preparing"
                 : order.status === "preparing"
                 ? "Mark as Out for Delivery"
                 : "Delivered"}
              </Button>
              <Button sx={{ml: 1}} variant="contained" color='error' onClick={() => handleDeleteOrder(order.id)}>Delete Order</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  )
}

export default Orders