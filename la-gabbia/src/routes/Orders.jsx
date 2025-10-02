import React, { useState, useEffect } from 'react'
import { axiosInstance } from '../lib/axios'
import Button from '@mui/material/Button';
import { IoFastFoodOutline } from "react-icons/io5";

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
      <header className="flex px-4 py-4 items-center justify-between bg-gray-900">
        <h1 className="text-3xl text-white flex gap-1"><IoFastFoodOutline />La Gabbia</h1>
        <Button onClick={handleLogOut}>Log Out</Button>
      </header>
      <div className='p-4'>
      <h1 className='text-center mt-8 text-4xl'>Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : orders.map(order => (
            <div key={order.id} className='mt-6 border rounded px-4 py-4'>
              <h2 className="text-lg font-semibold text-blue-800">Order ID: {order.id}</h2>
              <p><span className="font-semibold text-blue-800">Name:</span> {order.customer_name}</p>
              <p><span className="font-semibold text-blue-800">Address:</span> {order.customer_address}</p>
              <p><span className="font-semibold text-blue-800">Email:</span> {order.customer_email}</p>
              <p><span className="font-semibold text-blue-800">Total:</span> ${order.total_price}</p>
              <p><span className="font-semibold text-blue-800">Created:</span> {new Date(order.created_at).toLocaleString()}</p>
              <h3 className='font-semibold text-blue-800'>Items:</h3>
              <ul>
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.quantity} x {item.name} {item.instruction && `(${item.instruction})`}
                  </li>
                ))}
              </ul>
              <Button>Update Status</Button>
              <Button>Delete Order</Button>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  )
}

export default Orders