import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux'
import { axiosInstance } from '../lib/axios';
import { clearCart } from '../store/cartSlice';
import { toast } from 'react-toastify';

const Checkout = ({ open, onClose }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const handlePlaceOrder = async () => {
        try {
            const response = await axiosInstance.post('/orders', {
                customer_name: name,
                customer_address: address,
                customer_email: email,
                items: cartItems,
            });
            if (response.status === 201) {
                toast.success("✅ Order placed successfully!");
                onClose();
                dispatch(clearCart());
            }
        } catch (error) {
            console.error("Error placing order:", error)
            alert("Something went wrong. Please try again.")
        }
    }
    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Complete Your Order</DialogTitle>
                <DialogContent>
                <h3 className="font-semibold mt-4 mb-4">Customer Information</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Full Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Address"
                        fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {cartItems.length > 0 && (
                        <div className="mt-8">
                            <h3 className="font-semibold mb-2">Order Summary</h3>
                            <ul>
                                {cartItems.map((item) => (
                                    <li key={`${item.menu_item_id}-${item.instruction || 'none'}`} className="mb-1">
                                        {item.name} x {item.quantity} {item.instruction && `(${item.instruction})`}
                                    </li>
                                ))}
                            </ul>
                            <p className="font-semibold mt-4">
                                Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                            </p>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handlePlaceOrder}>Place Order</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Checkout