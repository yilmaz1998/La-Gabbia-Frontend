import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find(
                i => i.menu_item_id === item.menu_item_id && i.introduction === item.introduction
              );
        
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push(item);
            }
        },
        removeItem: (state, action) => {
            const { menu_item_id, introduction } = action.payload;
            state.items = state.items.filter(
              i => !(i.menu_item_id === menu_item_id && i.introduction === introduction)
            );
        },
        updateQuantity: (state, action) => {
            const { menu_item_id, introduction, quantity } = action.payload;
            const item = state.items.find(
              i => i.menu_item_id === menu_item_id && i.introduction === introduction
            );
            if (item) {
              item.quantity = quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const { addToCart, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;