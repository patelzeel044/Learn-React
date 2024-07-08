import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteAsync,fetchAsync,updateAsync } from '../store/cartSlice';
import { useEffect } from 'react';

import toast from 'react-hot-toast'
 import { calculateitem} from '../store/cartSlice'; 

function Cart() {

    const dispatch = useDispatch()
    const items = useSelector((state) => state.cart.items);
    const { totalitem,
        amount,
        shipping,
        tax,
        total} = useSelector((state) => state.cart);
    
  useEffect(()=>{
    dispatch(fetchAsync())
    dispatch(calculateitem())
  },[])

   /*  const { cartitems,
          totalitem,
            amount,
            shipping,
            tax,
            total } = useSelector(state => state.cart)
 */

           /*  const incitm=(i)=>{
                dispatch(additem(i))
                dispatch(calculateitem())
               
              }

              const decitm=(i)=>{
                dispatch(decrementitem(i))
                dispatch(calculateitem())
               
              }

              const delitm=(i)=>{
                dispatch(deleteitem(i))
                dispatch(calculateitem())
               
              } */



              useEffect(() => {
                dispatch(calculateitem());
              }, [items]);

    return (
        <div className='container min-h-screen max-h-max'>
            <div>
                <h2 className='text-3xl font-bold p-5 m-5'>Shopping Cart</h2>

            </div>
            <div>
                <div className='flex'>
                    <div>{items.map((i) => {
                   
                             return   <div className='block m-1 p-1  h-56 w-96 flex ' key={i.id}>
                                    <hr className='' />
                                    <div>
                                        <img className='block h-32 w-32 mt-2 m-1 bg-slate-800' src={i.image} alt={i.title} />
                                    </div>

                                    <div className='block h-30 w-30 p-5  ml-auto'>
                                        <p className='font-semibold'>Name: {i.title}</p>
                                        <div>Price: {i.price}</div>

                                        <div className='block py-5 flex text-center'>
                                        <button 
                                        className='bg-blue-500 text-white  hover:bg-blue-800 active:bg-blue-900 text-sm w-5 h-5  rounded-md' 
                                       /*  onClick={()=>(decitm(i))} */
                                       onClick={()=>{if(i.quantity>1)dispatch(updateAsync({id:i.id, quantity:i.quantity-1}))
                                       dispatch(calculateitem())}} >-</button>

                                        <div className='px-2'>{ i.quantity}</div>

                                        <button 
                                        className='bg-blue-500 text-white  hover:bg-blue-800 active:bg-blue-900 text-sm w-5 h-5  rounded-md' 
                                        /* onClick={()=>(incitm(i))} */
                                        onClick={()=>{dispatch(updateAsync({id: i.id, quantity: i.quantity+1}))
                                        dispatch(calculateitem())}} >+</button>

                                        <button 
                                        className=' mx-5 bg-blue-500 text-white  hover:bg-blue-800 active:bg-blue-900 text-sm w-16 h-5  rounded-md' 
                                        onClick={()=>{dispatch(deleteAsync(i.id))
                                            dispatch(calculateitem())}}>Remove</button>

                                        </div>
                                    </div>

                                </div>

                    })}</div>
                        <div className='h-60 w-auto  pl-96 text-lg font-semibold'>
                                    <div>total item: {totalitem}</div>
                                    <div>amount: {amount}</div>
                                    <div>tax: {tax}</div>
                                    <div>shipping: {shipping}</div>
                                    <div>total: {total}</div>
                                </div>
                </div>
            </div>

        </div>
    )
}

export default Cart;
