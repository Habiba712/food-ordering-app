'use client';

import { useContext, useEffect, useState } from "react";
import SectionHeaders from "../../component/layout/SectionHeaders";
import { CartContext } from "../../component/AppContext";
import Image from "next/image";
import TrashIcon from "../../component/icons/trash";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { resolve } from "path";
import { set } from "mongoose";
import { redirect } from "next/navigation";

export default function CartPage() {
    const { cartItems, removeItem, clearCart, updateQuantity } = useContext(CartContext);
    const [city, setCity] = useState('');
    const [postCode, setPostCode] = useState('');
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [phone, setPhone] = useState('');
    const [newQuantity, setNewQuantity] = useState(1);


    let amountToPay = 0;
    let deliveryFee = 5;
    const session = useSession();
    const userEmail = session?.data?.user?.email;

     const userData = session.data?.user;
        const status = session?.status;    
       
         if (status === "unauthenticated") {
            redirect("/pages/login")
          }
        

    console.log('userEmail', userEmail);



    const amountToPayPerItem = (cartItems) => {
        let amountToPay = 0;
        for (const element of cartItems) {
            // console.log('element', element);
            amountToPay += totalPricePerItem(element) * element.quantity; //times the quantity of the element;
        }

        return amountToPay;
    };

    const removeItemFromCart = (item) => {
        // console.log('item id', item.id);
        removeItem(item.id, item);
        toast.success('Item Removed from Cart');
    }
    const totalPricePerItem = (item) => {

        let totalPrice = 0;
        totalPrice += item.itemBasePrice;
        if (item.size) {
            totalPrice = item.size.price
        }
        if (item.extras) {
            totalPrice += item.extras.reduce((acc, extra) => acc + extra.price, 0)
        }
        return totalPrice;

    }

    const handleQuantity = (e, num, item) => {
        e.preventDefault();
        console.log('item', item.quantity);
        // setNewQuantity(item.quantity);
        let shit;
        if (num === 1) {
            shit = item.quantity + 1;
            updateQuantity(item, shit);


            // console.log('newQuantity in pos case', shit);
            // return updateQuantity(item, shit);
        }
        else if (num === -1) {
            if (item.quantity > 1) {

                shit = item.quantity - 1;
                updateQuantity(item, shit);
            }
            else {
                shit = 1;
                updateQuantity(item, shit);
            }

        }







    }


    console.log('newQuantity', newQuantity);

    const getUserData = async () => {
        const userData = await fetch('/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json().then((data) => {
                console.log('data', data);

                setPhone(data.phone)
                setStreet(data.street)
                setCountry(data.country)
                setCity(data.city)
                setPostCode(data.postCode)


            })

        }).catch((err) => {
            return new Error(err);
        })

    }

    const movetoCheckout = async (e) => {
        e.preventDefault();
        console.log('cartItems', cartItems);
        const data = cartItems;

        const adress = {
            phone,
            street,
            country,
            city,
            postCode,
            userEmail,
        }
        const amountToPay = amountToPayPerItem(cartItems) + deliveryFee;

        const res = new Promise(async (resolve, reject) => {
            await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data, adress, amountToPay
                })
            }).then(async res => {
                if (res.ok) {
                    clearCart();
                    console.log('get the URL res', res);
                    window.location = await res.json()


                }
            }).catch(err => {
                reject(err)
            })
        })

        await toast.promise(res, {
            loading: 'Checkout...',
            success: 'Checkout Successful',
            error: 'Something went wrong'
        })



    }

    useEffect(() => {
        getUserData();

    }, [])

    if(status === 'loading'){
        return(
          <div>
            <h3 className="text-center text-xl font-semibold text-gray-700 mt-10">Loading cart....</h3>
          </div>
        )
    } if(!userData){
        return(
            <div>
                <h3 className="text-center text-xl font-semibold text-gray-700 mt-10">Login to see your cart</h3>
            </div>
        )
    }

console.log('test cartItems', cartItems?.filter((item)=> item?.userEmail === userEmail))



    return (


        <section className="md:mt-10 max-w-4xl mx-auto">
            <div className="text-center">
                <SectionHeaders mainHeader={'My Cart'} />

            </div>
            {
                cartItems?.filter((item)=> item?.userEmail === userEmail)?.length === 0 ?
                    <div>
                        <h4 className="text-center text-xl text-gray-500 font-semibold">
                            Your cart is empty 😢</h4>
                    </div>
                    :
                    <div className=" flex flex-col items-center  w-100 md:grid grid-cols-2 gap-4 mt-8 md:flex md:items-start" style={{ width: '100%' }}>
                        <div className="flex-col md:w-100 ">
                            {(cartItems && cartItems?.filter((item)=> item?.userEmail === userEmail)?.length > 0) &&

                                cartItems.map((item, index) => (

                                    <div key={index || item.id}
                                        className="flex grid grid-2  p-4  w-100 
                                border-b border-gray-300 
                                relative min-h-[160px] ">

                                        <div className="mt-4 h-[100px] w-[100px] rounded-lg  absolute ">
                                            <Image
                                                src={item.itemImage}
                                                alt="userImage"
                                                fill
                                                className="object-cover rounded-lg"
                                            />

                                        </div>
                                        {/* mobile version */}
                                        <div className="
                                        grid grid-cols-2 ml-30 gap-25 md:hidden">

                                            <div className="flex flex-col  grow-1 w-50">
                                                <h3 className="font-semibold mb-2">{item.itemName}</h3>
                                                <div className="grid grid-cols-1 gap-2 text-sm text-gray-500 ">
                                                    <div className="grid grid-cols-2">

                                                        <p>Price: </p>
                                                        <p> $ {item.itemBasePrice}</p>

                                                    </div>
                                                    <div className="grid grid-cols-2">
                                                        <p>Size: </p>
                                                        <p className="whitespace-normal break-words"> {
                                                            item?.size?.name ? `${item?.size?.name} $ ${item?.size?.price}` : 'Regular'
                                                        }</p>

                                                    </div>
                                                    <div className="grid grid-cols-2 ">
                                                        <p className="whitespace-normal break-words">Extras: </p>
                                                        <div>
                                                            {item?.extras?.length > 0 ? item.extras.map((extra, index) => (
                                                                <p 
                                                                key={index || extra.name}
                                                                className="whitespace-normal break-words  ">
                                                                    <span className="text-gray-500 font-semibold">{extra.name}</span> +${extra.price}

                                                                </p>
                                                            )
                                                            ) :
                                                                'No Extras'}
                                                        </div>

                                                    </div>



                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center justify-between font-semibold md:hidden">

                                                {/* quantity and trash icon */}
                                                <div className="flex gap-2">

                                                    <div className="border border-gray-400 rounded-lg  flex justify-around items-center px-3 ">
                                                        <button
                                                            className="cursor-pointer"
                                                            onClick={(e) => handleQuantity(e, -1, item)}>
                                                            -</button>

                                                        <label className="text-sm font-semibold mr-2">
                                                            {item.quantity}
                                                        </label>
                                                        <button className="cursor-pointer"
                                                            onClick={(e) => handleQuantity(e, 1, item)}
                                                        >+</button>
                                                    </div>

                                                    <div className="w-fit flex items-center justify-end">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeItemFromCart(item)}
                                                        >
                                                            <TrashIcon

                                                                className="w-5 h-5 cursor-pointer"
                                                            />
                                                        </button>

                                                    </div>



                                                </div>

                                                <div className="text-green-700 flex justify-center  w-fit text-2xl">

                                                    <p>
                                                        ${totalPricePerItem(item)}

                                                    </p>

                                                </div>







                                            </div>
                                        </div>


                                        {/* Desktop version */}
                                        <div className="
                                        hidden
                                        md:grid grid-cols-3 ml-30 w-100 ">

                                            <div className=" flex flex-col  grow-1 w-50 gap-2">
                                                <h3 className="font-semibold mb-2">{item.itemName}</h3>
                                                <div className="grid grid-cols-1 gap-2 text-sm text-gray-500 ">
                                                    <div className="grid grid-cols-2">

                                                        <p>Price: </p>
                                                        <p> $ {item.itemBasePrice}</p>

                                                    </div>
                                                    <div className="grid grid-cols-2">
                                                        <p>Size: </p>
                                                        <p className="whitespace-normal break-words"> {
                                                            item?.size?.name ? `${item?.size?.name} $ ${item?.size?.price}` : 'Regular'
                                                        }</p>

                                                    </div>
                                                    <div className="grid grid-cols-2 ">
                                                        <p className="whitespace-normal break-words">Extras: </p>
                                                        <div>
                                                            {item?.extras?.length > 0 ? item.extras.map((extra, index) => (
                                                                <p 
                                                                key={index || extra.name}
                                                                className="whitespace-normal break-words  ">
                                                                    <span className="text-gray-500 font-semibold">{extra.name}</span> +${extra.price}

                                                                </p>
                                                            )
                                                            ) :
                                                                'No Extras'}
                                                        </div>

                                                    </div>



                                                </div>
                                            </div>

                                            <div className="w-25 flex  items-center font-semibold text-green-700 justify-end">
                                                <p>
                                                    ${totalPricePerItem(item)}
                                                </p>




                                            </div>
                                            <div className="w-fit flex items-center justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => removeItemFromCart(item)}
                                                >
                                                    <TrashIcon

                                                        className="w-5 h-5 cursor-pointer"
                                                    />
                                                </button>

                                            </div>


                                        </div>
                                        <div className="hidden md:flex justify-around mt-4 w-100 ">
                                            <div className="border border-gray-400 rounded-lg w-50 flex justify-around">
                                                <button
                                                    className="cursor-pointer"
                                                    onClick={(e) => handleQuantity(e, -1, item)}>
                                                    -</button>

                                                <label className="text-sm font-semibold">
                                                    {item.quantity}
                                                </label>
                                                <button className="cursor-pointer"
                                                    onClick={(e) => handleQuantity(e, 1, item)}
                                                >+</button>
                                            </div>
                                        </div>

                                    </div>
                                ))
                            }
                            <div className="bg-gray-100 mt-4 p-4 text-gray-500 flex w-100 justify-between"> Subtotal:
                                <p className="font-semibold mr-3 justify-end">
                                    $ {amountToPayPerItem(cartItems)}
                                </p>
                            </div>
                            <div className="bg-gray-100 mt-4 p-4 text-gray-500 flex w-100 justify-between"> Delivery Fee:
                                <p className="font-semibold mr-3 justify-end">
                                    $ 5
                                </p>
                            </div>
                            <div className="bg-gray-100 mt-4 p-4 text-gray-500 flex w-100 justify-between"> Total:
                                <p className="font-semibold mr-3 justify-end">
                                    $ {amountToPayPerItem(cartItems) + deliveryFee}
                                </p>
                            </div>

                        </div>

                        <div className="mr-4 w-100 md:w-100 flex flex-col bg-gray-100 p-4 h-fit ml-4 rounded-lg">
                            <div>
                                <form className="flex gap-2 max-w-2xl mx-auto mt-4"
                                    onSubmit={(e) => movetoCheckout(e)}
                                >



                                    <div className="flex flex-col grow" >


                                        <label className="text-sm font-semibold">Phone</label>
                                        <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                        <label className="text-sm font-semibold">Street</label>
                                        <input type="text" placeholder="Street" value={street} onChange={(e) => setStreet(e.target.value)} />
                                        <label className="text-sm font-semibold">Country</label>
                                        <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                                        <div className="flex gap-2">
                                            <div>
                                                <label className="text-sm font-semibold">City</label>
                                                <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="text-sm font-semibold">Post Code</label>
                                                <input type="text" placeholder="Post Code" value={postCode} onChange={(e) => setPostCode(e.target.value)} />
                                            </div>
                                        </div>


                                        <button className="bg-red-600 cursor-pointer text-white font-semibold rounded-full px-6 py-3 mb-3 w-full block mx-auto text-center flex justify-around">
                                            Checkout {amountToPayPerItem(cartItems) + deliveryFee} $
                                        </button>a
                                    </div>

                                </form>
                            </div>

                        </div>

                    </div>
            }

        </section>
    )
}