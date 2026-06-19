'use client';
import { useState, useEffect } from "react";

import { useContext } from "react";
import { CartContext } from "./AppContext";
import Image from "next/image";

export default function AdressBox({data, functions, currentOrder, amountToPay})  {
    console.log('data', data)
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

    return( 
        <div className="w-[70%]  flex flex-col items-center md:w-full">
           <div className="w-[70%] md:w-full">
                    <div className="bg-gray-100 mt-4 p-4 text-gray-500 flex w-100 justify-between font-semibold text-sm"> Subtotal:
                    <p className="font-semibold mr-3 justify-end">
                        $ {amountToPayPerItem(currentOrder)}
                    </p>
                </div>
                <div className="bg-gray-100 mt-4 p-4 text-gray-500 flex w-100 justify-between font-semibold text-sm"> Delivery Fee:
                    <p className="font-semibold mr-3 justify-end">
                        $ 5
                    </p>
                </div>
                <div className="bg-gray-100 mt-4 p-4 text-gray-500 flex w-100 justify-between font-semibold text-sm"> Total:
                    <p className="font-semibold mr-3 justify-end">
                        $ {amountToPayPerItem(currentOrder) + 5}
                    </p>
                </div>
                </div>

          <div className="w-[70%] flex justify-center items-center md:w-full">
                        <div >
                            <form className="flex gap-2 max-w-2xl mx-auto mt-4 w-100 flex flex-col bg-gray-100 p-3 h-fit "
                                
                            >

                                <div className="flex flex-col grow" >


                                    <label className="text-sm text-start w-full font-semibold">Phone</label>
                                    <input disabled type="tel" placeholder="Phone" value={data.phone} onChange={(e) => functions.setPhone(e.target.value)} />
                                    <label className="text-sm text-start w-full font-semibold">Street</label>
                                    <input disabled type="text" placeholder="Street" value={data.street} onChange={(e) => functions.setStreet(e.target.value)} />
                                    <label className="text-sm text-start w-full font-semibold">Country</label>
                                    <input disabled type="text" placeholder="Country" value={data.country} onChange={(e) => functions.setCountry(e.target.value)} />
                                    <div className="flex gap-2">
                                        <div className="w-full  flex flex-col">
                                            <label className=" text-sm text-start w-full font-semibold">City</label>
                                            <input disabled type="text" placeholder="City" value={data.city} onChange={(e) => functions.setCity(e.target.value)} />
                                        </div>
                                        <div className="w-full flex flex-col">
                                            <label className="text-sm text-start w-full font-semibold">Post Code</label>
                                            <input disabled type="text" placeholder="Post Code" value={data.postCode} onChange={(e) => functions.setPostCode(e.target.value)} />
                                        </div>
                                    </div>


                                    <button  className="bg-gray-600 cursor-not-allowed text-white font-semibold rounded-full px-6 py-3 mb-3 w-full block mx-auto text-center flex justify-around ">
                                        TOTAL {data.currentOrder?.[0]?.amountToPay} $
                                    </button>
                                </div>

                            </form>
                        </div>

                    </div>
        </div>
       
    )
}