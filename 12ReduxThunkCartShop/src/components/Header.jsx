import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Header() {
    const ti = useSelector((state) => state.cart.totalitem);

    return (
        <div className='bg-black text-white flex p-2'>
            <div className='text-lg text-semibold'>
                CartShop
            </div>
            <Link to='/' className='mx-auto'>
                All Product
            </Link>
            <Link to='/cart' className='flex '>
                <div className='mx-1'>Cart</div>
            <p className=''>({ti})</p>
            </Link>
        </div>
    )
}

export default Header
