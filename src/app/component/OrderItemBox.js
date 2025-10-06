'use client';
import { useState, useEffect, use } from "react";

import { useContext } from "react";
import { CartContext } from "./AppContext";
import Image from "next/image";


export default function OrderItemBox({ currentOrder, amountToPay }) {
    const [currentOrderState, setCurrentOrderState] = useState([])

    //     useEffect(() => {
    //          if (currentOrder?.length > 0 && currentOrder[0]?.cartItems) {
    //     setCurrentOrderState(currentOrder[0]?.cartItems);
    //   }
    //     }, [])
    console.log('currentOrder in OrderItemBox', currentOrder)
    console.log('amountToPay in OrderItemBox', amountToPay)
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

    const amountToPayPerItem = (currentOrder) => {
        // console.log('currentOrder in OrderItemBox', currentOrder)
        let amountToPay = 0;
        for (const element of currentOrder) {
            // console.log('element', element);
            amountToPay += totalPricePerItem(element) * element.quantity; //times the quantity of the element;
        }

        return amountToPay;
    };

    return (

        <div className="flex flex-col items-center md:grid grid-cols-2 gap-4" style={{ width: '100%' }}>
            <div className="w-100  md:flex-col w-50">
                {(currentOrder && currentOrder.length > 0) &&

                    currentOrder.map((item, index) => (

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



                            <div className="w-100 grid grid-cols-3 ml-30 ">

                                <div className=" flex flex-col text-start grow-1 w-50 gap-2">
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






                            </div>

                            <div className="w-100 flex justify-center md:w-100 flex justify-center items-center font-semibold  ">
                                <p>
                                   <span className="text-gray-500">$</span> <span className="text-2xl text-green-700">  {totalPricePerItem(item)}
                                        </span>
                                </p>




                            </div>
                        </div>

                    ))
                }

                <div className="bg-gray-100 mt-4 p-4 text-gray-500 flex w-100 justify-between"> Subtotal:
                    <p className="font-semibold mr-3 justify-end">
                        $ {amountToPayPerItem(currentOrder)}
                    </p>
                </div>
                <div className="bg-gray-100 mt-4 p-4 text-gray-500 flex w-100 justify-between"> Delivery Fee:
                    <p className="font-semibold mr-3 justify-end">
                        $ 5
                    </p>
                </div>
                <div className="bg-gray-100 mt-4 p-4 text-gray-500 flex w-100 justify-between"> Total:
                    <p className="font-semibold mr-3 justify-end">
                        $ {amountToPayPerItem(currentOrder) + 5}
                    </p>
                </div>

                {/* <div className="bg-gray-100 mt-4 p-4 text-gray-500 flex w-100 justify-between"> Subtotal:
                                        <p className="font-semibold mr-3 justify-end">
                                            $ {amountToPayPerItem(cartItemsBox)}
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
                                    </div> */}

            </div>



        </div>
    )
}