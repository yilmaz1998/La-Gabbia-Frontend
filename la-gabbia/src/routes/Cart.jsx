import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { removeItem, updateQuantity, clearCart } from '../store/cartSlice';
import Checkout from '../components/Checkout';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleRemoveItem = (item) => {
    dispatch(removeItem({ menu_item_id: item.menu_item_id, instruction: item.instruction }));
  }

  const handleUpdateQuantity = (item, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ menu_item_id: item.menu_item_id, instruction: item.instruction, quantity }));
  }

  const handleClearCart = () => {
    dispatch(clearCart());
  }

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="text-center px-4 sm:px-6 md:px-12 lg:px-24 xl:px-64 mx-auto max-w-4x mt-12">
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <>
        <List>
          {cartItems.map((item) => (
            <React.Fragment key={`${item.menu_item_id}-${item.instruction || 'none'}`}>
              <ListItem alignItems="center">
                <ListItemAvatar>
                  <Avatar alt={item.name} src={item.image_url} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${item.name} - Quantity: ${item.quantity}`}
                  secondary={`Instructions: ${item.instruction || 'None'}`}
                />
                <Button onClick={() => handleUpdateQuantity(item, item.quantity - 1)}>-</Button>
                <Button onClick={() => handleUpdateQuantity(item, item.quantity + 1)}>+</Button>
                <Button onClick={() => handleRemoveItem(item)}>Remove</Button>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
    
        <div className="mt-4">
        <Typography variant="h6" sx={{ mb: 2 }}>
            Total Price: ${totalPrice.toFixed(2)}
          </Typography>
          <Button onClick={handleClearCart} variant="outlined" color="error">
            Clear Cart
          </Button>
          <Button
              onClick={() => setOpen(true)}
              variant="outlined"
              sx={{ ml: 2 }}
            >
              Complete Order
            </Button>
        </div>
        <Checkout
            open={open}
            onClose={() => setOpen(false)}
          />
      </>
      )}
    </div>
  )
}

export default Cart