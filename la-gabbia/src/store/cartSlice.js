import { createSlice } from '@reduxjs/toolkit';

const savedCart = JSON.parse(localStorage.getItem('cart')) || []

const initialState = {
    items: savedCart
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find(
                i => i.menu_item_id === item.menu_item_id && i.instruction === item.instruction
            );

            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                state.items.push({ ...item, quantity: item.quantity });
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeItem: (state, action) => {
            const { menu_item_id, instruction } = action.payload;
            const existingItem = state.items.find(
                i => i.menu_item_id === menu_item_id && i.instruction === instruction
            );
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    state.items = state.items.filter(
                        i => !(i.menu_item_id === menu_item_id && i.instruction === instruction)
                    );
                }
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        updateQuantity: (state, action) => {
            const { menu_item_id, instruction, quantity } = action.payload;
            const item = state.items.find(
                i => i.menu_item_id === menu_item_id && i.instruction === instruction
            );
            if (item) {
                item.quantity = quantity;
            }
            localStorage.setItem('cart', JSON.stringify(state.items))
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem('cart')
        }
    }
});

export const { addToCart, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;