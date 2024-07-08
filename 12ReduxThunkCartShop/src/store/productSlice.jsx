import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
    status:"idle"
}

const fetchProducts=()=>{
    return axios.get('http://localhost:3000/products')
}

export const fetchAsync = createAsyncThunk(
    'product/fetchProduct',
    async () => {
      const response = await fetchProducts();
      console.log(response.data)
      return response.data;
      
    }
  );
  


const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAsync.pending, (state)=>{
            state.status='loading';
        })
        .addCase(fetchAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.products  = action.payload;
           
          });
    }
})

/* export const {  } = productSlice.actions */
export default productSlice.reducer;