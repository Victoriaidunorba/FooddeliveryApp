import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
        //REDUCERS ARE tHE ACtions that allow us to modify that global store
      state.items = [...state.items, action.payload];
      //this means keep whatever is in the current basket but also add whatever the payload is
    },
    removeFromBasket: (state, action) => { 
      const index = state.items.findIndex((item) => item.id === action.payload.id);

      let newBasket =  [...state.items];

      if( index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
            `Can't remove product (id: ${action.payload.id}) as its not in basket!`
        );
      }

      state.items = newBasket;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions

export const selectBasketItems = (state) => state.basket.items

export const selectBasketItemswithId = (state, id) =>
    state.basket.items.filter((item) => item.id === id);

export const selectBasketTotal = (state) => 
state.basket.items.reduce((total, item) => (total += item.price), 0)

export default basketSlice.reducer;