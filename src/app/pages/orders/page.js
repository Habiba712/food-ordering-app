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
                    setOrders(data.reverse())
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
        <section className="mt-10 max-w-5xl mx-auto">
            <div className="text-center">
                <UserTabs />
            </div>

            <div className="mt-7 grid grid-cols-7 gap-3
            border-t border-b border-gray-300 text-sm
            bg-gray-50 px-4 py-3 ml-2 text-gray-700">
                <div className="text-gray-500  border-gray-300border-r border-gray-300">Order ID</div>
                <div className="text-gray-500 ">Date</div>
                <div className="text-gray-500 ">Customer</div>
                <div className="text-gray-500 ">Payment</div>
                <div className="text-gray-500 ">Total</div>
                <div className="text-gray-500 ">Items</div>
                <div className="text-gray-500 ">Action</div>

            </div>

            <div className="text-left ">
                   {orders.map((order) => (
  <div
    key={order._id}
    className="grid grid-cols-7 gap-3 border-b border-gray-300 text-sm text-gray-700 bg-gray-10 p-4"
  >
    <div className="flex justify-start items-center">
      #{order._id.slice(0, 10)}
    </div>

    <div className=" text-sm whitespace-normal break-words flex justify-start items-center">
      {order.createdAt.replace("T", " ").slice(0, 16)}
    </div>

    <div className="text-sm whitespace-normal break-words flex justify-start items-center">
      {order.userEmail}
    </div>

    <div className="flex justify-center items-center gap-2 flex justify-start items-center">
      {order.paid ? (
        <span className="text-green-700 bg-green-100 font-semibold border text-center border-green-700 px-4 py-1 rounded-full w-20">
          Success
        </span>
      ) : (
        <span className=" w-20 text-center text-red-700 bg-red-100 font-semibold border border-red-700 px-4 py-1 rounded-full">
          Failed
        </span>
      )}
    </div>

    <div className="flex justify-center items-center gap-2 flex justify-start items-center">
      <span>{order.amountToPay}
        </span>
         {/* <span>💲</span> */}
    </div>

    <div className="flex justify-start items-center gap-2 flex justify-start items-center">
      {order.cartItems.length}
    </div>

    <div className="flex justify-center items-center gap-2 flex justify-start items-center">
      <button
        className="cursor-pointer"
        onClick={() =>
          redirect(`/pages/orders/${order._id}`)
        }
      >
        <ViewDetails className="w-8 h-8" />
      </button>
    </div>
  </div>
))}
            </div>
          
        

        </section>
    )
}