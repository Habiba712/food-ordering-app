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

        <div className="w-[70%]  flex justify-center md:w-full " >
            <div className="w-full flex flex-col items-center md:flex-col w-50">
                {(currentOrder && currentOrder.length > 0) &&

                    currentOrder.map((item, index) => (

                        <div key={index || item.id}
                            className="w-[70%] flex flex-col justify-center items-center md:items-start border border-gray-100 rounded-lg p-3">

                            <div className="w-full flex justify-center md:justify-start">
                                <Image
                                    src={item.itemImage}
                                    alt="userImage"
                                    width={200}
                                    height={200}
                                    className="object-cover aspect-square rounded-lg"
                                />

                            </div>



                            <div className="md:w-full">

                                  <div className="w-full ">
                                                <h3 className="font-semibold mb-2 py-1 text-lg text-start">{item.itemName}</h3>
                                                <div className="flex flex-col gap-2">

                                                    <div className="flex justify-between">

                                                        <p className="text-sm font-semibold">Price: </p>
                                                        <p className="text-md font-semibold text-green-500"> ${item.itemBasePrice}</p>

                                                    </div>


                                                    <div className="flex justify-between">
                                                        <p className="text-sm font-semibold">Size: </p>
                                                        <p className="whitespace-normal break-words text-sm font-semibold text-gray-500"> {
                                                            item?.size?.name ? `${item?.size?.name} $ ${item?.size?.price}` : 'Regular'
                                                        }</p>

                                                    </div>

                                                    <div className="flex justify-between gap-1">
                                                        <div ><p className="text-sm font-semibold" >Extras: </p></div>
                                                        
                                                        <div >
                                                            {item?.extras?.length > 0 ? item.extras.map((extra, index) => (
                                                                <p 
                                                                key={index || extra.name}
                                                                className="whitespace-normal break-words  flex justify-end items-center">
                                                                    <span className="text-gray-500 text-sm font-semibold">{extra.name} </span> <span className="text-sm font-semibold text-gray-500"> +${extra.price}
                                                                        </span>

                                                                </p>
                                                            )
                                                            ) :
                                                              <p className="whitespace-normal break-words "><span className="text-gray-500 text-sm font-semibold">No Extras</span></p>}
                                                        </div>

                                                    </div>



                                                </div>
                                            </div>





                            </div>
                        </div>

                    ))
                }

             

            </div>



        </div>
    )
}