'use client';
import React, { useContext } from 'react'
import Link from "next/link";
import { getSession, useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import { CartContext } from '../../component/AppContext';
import { useEffect, useState } from 'react';
import CartIcon from '../icons/cart';
export default function Header() {


    const session = useSession();
    const status = session.status;
    const { cartItems } = useContext(CartContext);

    const userData = session.data?.user;
    const userName = userData?.name || userData?.email
      const [cartItemsLocal, setCartItemsLocal] = useState([]);

    // Sync context cartItems to local state so it triggers re-renders properly
    useEffect(() => {
        if (cartItems) {
            setCartItemsLocal(cartItems);
        }
    }, [cartItems]);
    console.log('cartItemsLocal', cartItemsLocal);
     return (
 
        <header className="flex items-center justify-between max-w-4xl mx-auto">
            {/* //* The logo in seperated form the nav */}
            <Link className="text-red-700 font-semibold text-2xl mr-2" href="/">
                Annyeong Kitchen
            </Link>
            <nav className="flex items-center gap-6 text-gray-500 
            
            ">
                <Link href={'/'}>Home</Link>
                <Link href={'/pages/menu'}>Menu</Link>
                <Link href={'/pages/orders'}>Orders</Link>
                <Link href={'/#about'}>About</Link>
                <Link href={'/#contact'}>Contact</Link>

            </nav>
            <nav className="flex items-center gap-4 text-gray-500">
                {
                    status === 'authenticated' ?
                        <>
                            <Link className="bg-white rounded-full 
                            border-1
                            border-red-600
                            text-red-600 px-8 py-2" href={'/pages/profile'}>{userName}</Link>

                            <button
                                onClick={() => {
                                    signOut(),
                                        redirect('http://localhost:3000/pages/login')
                                }
                                }
                                className='bg-red-600 rounded-full text-white px-8 py-2 cursor-pointer'>
                                Logout
                            </button>
                           
                                <Link
                                    className="flex relative" href={'/pages/cart'}>
                                    <CartIcon className="text-balck-800" color="black" />
 {(cartItemsLocal && cartItemsLocal?.length > 0) &&
                                    <span
                                        className="absolute flex justify-center items-center -top-2 -right-3 text-white bg-red-600 rounded-full font-bold px-1 py-1 text-xs leading-3 "
                                    >
                                        {cartItemsLocal?.length}
                                    </span>
                                     }
                                </Link>
                                
                               
                        </>


                        : status === 'unauthenticated' &&
                        <>
                            <Link className="bg-white rounded-full border-1 border-red-600 text-red-600 px-8 py-2" href={'/pages/login'}>Login</Link>
                            <Link 
                            
                            className="bg-red-600 rounded-full text-white px-8 py-2" href={'/pages/register'}>Register</Link>

                        </>
                }


            </nav>

        </header>

    )
}

