'use client';
import React, { useContext } from 'react'
import Link from "next/link";
import { getSession, useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import { CartContext } from '../../component/AppContext';
import { useEffect, useState, useRef } from 'react';
import CartIcon from '../icons/cart';
import HamburgerMenu from '../icons/hamburgerMenu';

export default function Header() {


    const session = useSession();
    const status = session.status;
    const { cartItems } = useContext(CartContext);
    const [showMenu, setShowMenu] = useState(false);

    const userData = session.data?.user;
    const userEmail = userData?.email;
    const userName = userData?.name || userData?.email
    const [cartItemsLocal, setCartItemsLocal] = useState([]);
    const menuRef = useRef(null);

    // Sync context cartItems to local state so it triggers re-renders properly
    useEffect(() => {

        if (cartItems) {
            setCartItemsLocal(cartItems);
        }
    }, [cartItems]);

      useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
    console.log('cartItemsLocal', cartItemsLocal);
    return (
        <>
            {/* // mobile header */}
 <header className="hero-section-desktop w-full px-2 py-2  
        ">
            <div className=' w-full'>
                <div className="flex justify-between
               
                ">
                    <div className='flex justify-start'>
                        <Link className="text-red-700 flex font-bold text-2xl " href="/">
                           LOGO
                        </Link>

                    </div>

                    <div className=" w-50 text-red-700 cursor-pointer"
                       
                    >
                        <div className="flex justify-end items-center gap-3 text-black">
                            <Link
                                className="flex relative" href={'/pages/cart'}>
                                <CartIcon className="" />
                                {(cartItemsLocal && cartItemsLocal?.filter((item)=> item?.userEmail === userEmail)?.length > 0 && status === 'authenticated') &&
                                    <span
                                        className="absolute flex justify-center items-center  -top-2 -right-2 text-white  rounded-full font-bold px-1 py-1 text-xs leading-3 bg-red-600 "
                                    >
                                        {cartItemsLocal?.filter((item)=> item?.userEmail === userEmail)?.length}
                                    </span>
                                }
                            </Link>
                            <button className="cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
                            <HamburgerMenu  className="w-8 h-8" />

                            </button>
                        </div>


                    </div>
                </div>

                <div className=''>

                    {
                        showMenu &&
                        <div 
                         ref={menuRef}
                        className={`
                            mx-6
                            fixed top-16 left-1/2 -translate-x-1/2 z-100 border border-gray-200 bg-white rounded-lg w-80 shadow-sm md:hidden
                            flex flex-col  gap-4 rounded-lg p-2
                   
  }`
                        } >
                            <Link className="hover:text-red-800"  onClick={() => setShowMenu(false)}href={'/'}>Home</Link>

                            <Link onClick={() => setShowMenu(false)} className="hover:text-red-800" href={'/pages/menu'}>Menu</Link>
                            <Link onClick={() => setShowMenu(false)} className="hover:text-red-800" href={'/pages/orders'}>Orders</Link>
                            <Link onClick={() => setShowMenu(false)} className="hover:text-red-800" href={'/#about'}>About</Link>
                            <Link onClick={() => setShowMenu(false)} className="hover:text-red-800" href={'/#contact'}>Contact</Link>
                            <hr className='border-gray-300 w-full' />
                            {
                                status === 'authenticated' ?
                                    <div className='flex justify-between  w-full gap-4 '>
                                        <Link onClick={() =>
                                          setShowMenu(false)
                                    } 
                                        href={'/pages/profile'}
                                        
                                        >{userName}</Link>
                                        
                                     
                                        <button
                                           
                                            className='bg-red-600 rounded-full text-white px-8 py-2 cursor-pointer'>
                                            <Link onClick={() => {
                                                
                                                signOut()
                                                setShowMenu(false)
                                            }
                                            } href={'/pages/login'}>Logout</Link>
                                        </button>




                                    </div>

                                    :
                                   
                        
                        <div className='flex justify-between  w-full gap-4 '>
                            <button onClick={() => setShowMenu(false)}>
                                <Link className="bg-white rounded-full flex shrink items-center justify-center border-1 border-red-600 text-red-600 px-8 py-2" href={'/pages/login'}>Login</Link>
                            </button>
                              <button onClick={() => setShowMenu(false)}>
                                 <Link

                                className="bg-red-600 rounded-full text-white px-8 py-2" href={'/pages/register'}>Register</Link>

                              </button>
                           
                        </div>
                          
                        
                            }

                        </div>
                    }
                </div>


            </div>







           


         
        </header>


        {/* // desktop header */}
        <header className="hidden md:grid grid-cols-3 gap-7 w-fill
        
        ">
            <div className='flex justify-center items-center'>
              
                    <div className='flex justify-start  items-center w-full'>
                        <Link className="text-red-700  font-bold text-2xl mr-2 ml-3" href="/">
                            LOGO
                        </Link>

                    </div>

                 
                

            

            </div>







            <nav className="flex items-center  w-full  justify-center gap-4 grow-1 text-gray-700 font-bold font-sans-serif
           
            ">
                <Link href={'/'}>Home</Link>
                <Link href={'/pages/menu'}>Menu</Link>
                <Link href={'/pages/orders'}>Orders</Link>
                <Link href={'/#about'}>About</Link>
                <Link href={'/#contact'}>Contact</Link>

            </nav>


            <nav className="flex w-full items-center gap-2 text-gray-500  rounded p-1">
                {
                    status === 'authenticated' ?
                        <>
                         
                          
                                   <Link className="bg-white rounded-full 
                                   flex shrink items-center justify-center
                                   
                            border-1
                            border-red-600
                            text-red-600 px-8 py-2 whitespace-nowrap " href={'/pages/profile'}>{userName}</Link>
                           

                            <button
                                onClick={() => {
                                    setShowMenu(false)
                                    signOut()
                                    redirect('/pages/login')
                                       
                                }
                                }
                                className='bg-red-600 rounded-full text-white cursor-pointer px-8 py-2 '>
                                Logout
                            </button>

                            <Link
                                    onClick={() => setShowMenu(false)}

                                className="flex relative w-fit flex shrink items-center justify-center" href={'/pages/cart'}>
                                <CartIcon className="text-balck-800" color="black" />
                                {(cartItemsLocal && cartItemsLocal?.filter((item)=> item?.userEmail === userEmail)?.length > 0) &&
                                    <span
                                        className="absolute flex justify-center items-center -top-2 -right-3 text-white bg-red-600 rounded-full font-bold px-1 py-1 text-xs leading-3 "
                                    >
                                        {cartItemsLocal?.filter((item)=> item?.userEmail === userEmail)?.length}
                                    </span>
                                }
                            </Link>


                        </>


                        : status === 'unauthenticated' &&
                        <>
                            <Link
                            onClick={() => setShowMenu(false)}  
                            className="bg-white rounded-full flex shrink items-center justify-centerborder-1 border-red-600 text-red-600 px-8 py-2" href={'/pages/login'}>Login</Link>
                            <Link
                            onClick={() => setShowMenu(false)}  

                                className="bg-red-600 rounded-full text-white px-8 py-2" href={'/pages/register'}>Register</Link>

                        </>
                }


            </nav>

        </header>



        </>

    

    )
}

