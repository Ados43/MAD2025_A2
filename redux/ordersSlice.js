import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
  },
  reducers: {
    addOrder: (state, action) => {
      const newOrder = {
        id: Date.now().toString(),
        status: 'new', 
        items: Array.isArray(action.payload) ? action.payload : Object.values(action.payload),
      };
      state.orders.push(newOrder);
    },

    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find((o) => o.id === orderId);
      if (order) {
        order.status = status;
      }
    },
  },
});

export const { addOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
