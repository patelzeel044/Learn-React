import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status:'idle',
    totalitem: 0,
    amount: 0,
    shipping:0,
    tax: 0,
    total: 0,
}

const fetchItems=()=>{
    return axios.get('http://localhost:3000/cart')
}

const addItems=(item)=>{
    return axios.post('http://localhost:3000/cart',item)
}

const updateItems=(id, quantity)=>{
    return axios.patch(`http://localhost:3000/cart/${id}`,{quantity})
}

const deleteItems=(id)=>{
    return axios.delete(`http://localhost:3000/cart/${id}`)
}


export const fetchAsync = createAsyncThunk(
    'cart/fetchItem',
    async () => {
      const response = await fetchItems();
      console.log(response.data)
      return response.data;
    }
  );

  export const addAsync = createAsyncThunk(
    'cart/addItems',
    async (item) => {
        const {id,title,image,price} = item;
      const response = await addItems({id,title,image,price,quantity:1});
      console.log(response.data)
      return response.data;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'cart/deleteItems',
    async (id) => {
    await deleteItems(id);
      return id
    }
  );

  export const updateAsync = createAsyncThunk(
    'cart/updateItems',
    async ({id,quantity}) => {
      const response = await updateItems(id, quantity);
      console.log(response.data)
      return response.data;
    }
  );
  


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      /*   additem: (state, action) => {
            const itemexist = state.cartitems.find((item) => (item.id === action.payload.id))

            if (itemexist) {
                state.cartitems.forEach(item => {
                    if (item.id === action.payload.id) item.quantity++;
                })
            }
            else {
                state.cartitems.push(action.payload)
            }
        },
        decrementitem: (state, action) => {
           const item= state.cartitems.find((i)=>(i.id===action.payload.id))
           if(item.quantity>1) item.quantity--;
        },
        deleteitem: (state, action) => {
            state.cartitems = state.cartitems.filter((i)=>(i.id!==action.payload.id))
         },*/
         calculateitem: (state) => {
            let sum=0
            let q=0;
           state.items.forEach((i)=>(q=q+(i.quantity)))
          state.items.forEach((i)=>(sum=sum+(i.price*i.quantity)))
          state.totalitem=q;
          state.amount=sum;
          state.shipping=(state.amount>1000 || state.amount==0)?0:200;
          state.tax=+(state.amount*0.18).toFixed();
          state.total=state.amount + state.tax + state.shipping;
          console.log(state.totalitem)
          console.log(q)
         }, 
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchAsync.fulfilled, (state,action) => {
            state.status = 'idle';
            state.items=action.payload;
          })
          .addCase(addAsync.fulfilled, (state,action) => {
            state.status = 'idle';
            state.items.push(action.payload)
          })
          .addCase(deleteAsync.fulfilled, (state,action) => {
            state.status = 'idle';
            state.items = state.items.filter((i)=>(i.id!==action.payload))
          })
          .addCase(updateAsync.fulfilled, (state,action) => {
            state.status = 'idle';
            const index =state.items.findIndex(item=>item.id===action.payload.id)
        console.log(index,action.payload)
        state.items.splice(index,1, action.payload);
          })


        }
})

 export const { calculateitem } = cartSlice.actions

export default cartSlice.reducer;