import React, { useState, useEffect } from 'react'
import { axiosInstance } from '../lib/axios'

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

  const handleLogOut = () => {
    localStorage.removeItem("adminToken");
    window.location.reload();
  }

  return (
    <div>
      <button onClick={handleLogOut}>Log Out</button>
      <h1>Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : orders.map(order => (
            <div key={order.id}>
              <h2>Order ID: {order.id}</h2>
              <p>Name: {order.customer_name}</p>
              <p>Address: {order.customer_address}</p>
              <p>Total: ${order.total_price}</p>
              <p>Created: {new Date(order.created_at).toLocaleString()}</p>
              <h3>Items:</h3>
              <ul>
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.name} - Quantity: {item.quantity} - Instructions: {item.instruction || 'None'}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders