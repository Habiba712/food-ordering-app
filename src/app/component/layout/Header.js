'use client';
import React, { useContext } from 'react'
import Link from "next/link";
import { getSession, useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import { CartContext } from '../../component/AppContext';
import { useEffect, useState } from 'react';
import CartIcon from '../icons/cart';
import HamburgerMenu from '../icons/hamburgerMenu';
export default function Header() {


    const session = useSession();
    const status = session.status;
    const { cartItems } = useContext(CartContext);
    const [showMenu, setShowMenu] = useState(false);

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

        <header className="flex items-center justify-between max-w-4xl mx-auto
        
        ">
            <div className='flex flex-col items-center w-full'>
                <div className="flex justify-between items-center w-full">
                    <div>
                       <Link className="text-red-700 font-semibold text-2xl mr-2 ml-3" href="/">
                        Annyeong Kitchen
                    </Link>
 
                    </div>
                    
                    <div className="sm: text-red-700 md:hidden cursor-pointer"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <div className="flex flex-row items-center gap-3 text-black">
                             <Link
                                className="flex relative" href={'/pages/cart'}>
                                <CartIcon className="text-balck-800" color="black" />
                                {(cartItemsLocal && cartItemsLocal?.length > 0) &&
                                    <span
                                        className="absolute flex justify-center items-center -top-2 -right-3 text-white  rounded-full font-bold px-1 py-1 text-xs leading-3 "
                                    >
                                        {cartItemsLocal?.length}
                                    </span>
                                }
                            </Link>
                            <HamburgerMenu className="w-8 h-8" />
                        </div>

                        
                    </div>
                </div>

<div className='justify w-full'>
    
                {
                    showMenu &&
                    <div className={`flex flex-col  gap-4 bg-white p-4 rounded-lg w-full 
                    transition-all duration-900 ease-in-out
    showMenu ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
  }`
                   } >
                        <Link className="hover:text-red-800" href={'/'}>Home</Link>

                        <Link className="hover:text-red-800" href={'/pages/menu'}>Menu</Link>
                        <Link className="hover:text-red-800" href={'/pages/orders'}>Orders</Link>
                        <Link className="hover:text-red-800" href={'/#about'}>About</Link>
                        <Link className="hover:text-red-800" href={'/#contact'}>Contact</Link>
                        <hr className='border-gray-300 w-full' />
                        {
                            status === 'authenticated' ?
                                <div className='flex justify-between  w-full gap-4 '>
                            <Link className="bg-white 
                            text-red-600 py-2" href={'/pages/profile'}>{userName}</Link>

                            <button
                                onClick={() => {
                                    signOut(),
                                        redirect('http://localhost:3000/pages/login')
                                }
                                }
                                className='bg-red-600 rounded-full text-white px-8 py-2 cursor-pointer'>
                                Logout
                            </button>

                            


                        </div>

                                 : 
                                 ''
                        }

                    </div>
                }
</div>


            </div>







            <nav className="hidden md:flex items-center gap-6 text-gray-500 
            md-screen:hidden 
            ">
                <Link href={'/'}>Home</Link>
                <Link href={'/pages/menu'}>Menu</Link>
                <Link href={'/pages/orders'}>Orders</Link>
                <Link href={'/#about'}>About</Link>
                <Link href={'/#contact'}>Contact</Link>

            </nav>


            <nav className="hidden md:flex items-center gap-4 text-gray-500">
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

