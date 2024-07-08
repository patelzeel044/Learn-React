import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addAsync,updateAsync } from '../store/cartSlice';
import { fetchAsync } from '../store/productSlice';
import { useEffect } from 'react';


function Products() {
   
  const dispatch=useDispatch();
  const products=useSelector((state)=>state.product.products)
  let items = useSelector((state) => state.cart.items);

  useEffect(()=>{
    dispatch(fetchAsync())
  },[])


/* const addtocart=(item)=>{
  dispatch(additem(item))
  dispatch(calculateitem())
  toast.success("added to cart")
 
} */

const handleAddToCart = (i) => {
  const existingItem = items.find((item) => item.id === i.id);

  if (existingItem) {
    // If item already exists in the cart, update its quantity
    dispatch(updateAsync({ id: i.id, quantity: existingItem.quantity + 1 }));
    toast.success('Item quantity updated in cart');
  } else {
    // If item does not exist in the cart, add it
    dispatch(addAsync(i));
    toast.success('Item added to cart');
  }
};

   
  return (
    <div className='flex flex-wrap m-3'>
      {products.map((i)=>(
        <div className="bg-black text-white border-2 cursor-pointer hover:focus-ring w-60 h-64 m-7 p-2 rounded-lg " key={i.id}>
          <div className=''>
            <img className="block bg-gray-600 rounded-lg h-40 w-56 overflow-hidden" src={i.image} alt={i.title}/>
            </div>
            <div className=''>
            <div className='h-14 ml-2 block'>
            <h2 className='h-12 block overflow-hidden'>{i.title}</h2>
            <p className='m-[0.5px] block'>${i.price}</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-800 active:bg-blue-900 text-center mt-9 text-sm h-8 w-20 rounded-lg p-1 m-1" onClick={() => handleAddToCart(i)}>add to cart</button>
          </div>
        </div> 
      ))}
    </div>
  )
}

export default Products
