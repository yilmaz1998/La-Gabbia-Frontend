import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems);

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - Quantity: {item.quantity} - Instructions: {item.instruction}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Cart