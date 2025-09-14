'use client'

import { useEffect, useState } from "react"
import { UserTabs } from "../../component/userTabs/page"
import { get } from "http"
import ViewDetails from "../../component/icons/details"
import { redirect } from "next/navigation"

export default function OrdersPage() {

    const [orders, setOrders] = useState([])
    const getOrders = async () => {
        await fetch('http://localhost:3000/api/orders').then((res) => {
            if (res.ok) {
                return res.json().then(data => {
                    setOrders(data)
                    console.log('data', data)
                })
            }
        }


        )


    }

    useEffect(() => {
        getOrders()
    }, [])
    console.log('Orders Page')
    return (
        <section className="mt-10 ">
            <div className="text-center">
                <UserTabs />
            </div>

            <div className="mt-7 grid grid-cols-7 gap-3
            border-t border-b border-gray-300
            bg-gray-50 p-4">
                <div className="text-gray-500 border-r border-gray-300border-r border-gray-300">Order ID</div>
                <div className="text-gray-500 border-r border-gray-300">Date</div>
                <div className="text-gray-500 border-r border-gray-300">Customer</div>
                <div className="text-gray-500 border-r border-gray-300">Payment</div>
                <div className="text-gray-500 border-r border-gray-300">Total</div>
                <div className="text-gray-500 border-r border-gray-300">Items</div>
                <div className="text-gray-500 ">Action</div>

            </div>
            <div className="grid grid-cols-7 gap-3
            border-b border-gray-300
            text-sm text-gray-700
            bg-gray-10 p-4">
                {orders.map((order, index) => (
                    <>
                        <div className=" border-r border-gray-300">
                            #{order._id.slice(0, 10)}
                        </div>

                       <div className=" border-r text-sm whitespace-normal break-words border-gray-300">
                            {order.createdAt.replace('T', '').slice(0,15)}
                        </div>  
                        
                       <div className="border-r text-sm border-gray-300 whitespace-normal break-words">
                            {order.userEmail}
                        </div>
                        
                        <div className="border-r border-gray-300 flex justify-center items-center gap-2">
                            {order.paid === false ? (<span className="text-red-700 bg-red-100 font-semibold border  border-red-700 px-4 py-1 rounded-full">
                               Failed
                            </span>): <span
                            className="text-green-700 bg-green-100 font-semibold border  border-green-700 px-4 py-1 rounded-full"
                            >Success</span>
                            
                            }
                        </div>
                        
                        <div className="border-r border-gray-300 flex justify-center items-center gap-2">
                           {order.amountToPay} 💲
                        </div>
                        
                        <div className="border-r border-gray-300 flex justify-start items-center gap-2">
                           
                             {order.cartItems.length}
                        </div>
                        
                        <div className="border-r border-gray-300 flex justify-center items-center gap-2">
                            <button
                            
                            className="cursor-pointer"
                            onClick={() => redirect(`http://localhost:3000/pages/orders/${order._id}`)}
                            >
                                <ViewDetails className="w-8 h-8" />
                            </button>
                         
                        </div>
                    </>

                ))}

            </div>
        </section>
    )
}