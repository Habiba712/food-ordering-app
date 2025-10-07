'use client'

import { useEffect, useState } from "react"
import UserTabs from "../../component/userTabs"
import { get } from "http"
import ViewDetails from "../../component/icons/details"
import { redirect } from "next/navigation"
import FilterIcon from "../../component/icons/filter"
import { useSession } from "next-auth/react"
 
export default function OrdersPage() {


    
 const session = useSession();
 const userData = session.data?.user;
    const status = session.status;    
   
    
  
  const [orders, setOrders] = useState([])
  const getOrders = async () => {
    await fetch('/api/orders').then((res) => {
      console.log('res f', res)
      // if(res.status === loading){
      //   setLoading(true)
      // }
      if (res.ok) {
        return res.json().then(data => {
          setOrders(data.reverse())
          console.log('data', data)
        })
      }
      else {

        redirect('/pages/login')
       
      }
    }


    )


  }
 
  useEffect(() => {
    
    getOrders()
  }, [])
  if(status === 'loading'){
    return(
      <div>
        <h3 className="text-center text-xl font-semibold text-gray-700 mt-10">Loading orders....</h3>
      </div>
    )
  }
  if(!userData){
    return(
      <div>
        <h3 className="text-center text-xl font-semibold text-gray-700 mt-10">Login to see your orders</h3>
      </div>
    )
  }


  return (
    
      <section className="mt-10 max-w-5xl mx-auto">
      <div className="text-center">
        <UserTabs />
      </div>

      {/* Desktop version */}

      <div className="hidden md:grid grid-cols-7 gap-3
            border-t border-b border-gray-300 text-sm mt-7 
            bg-gray-50 px-4 py-3 ml-2 text-gray-700">
        <div className="text-gray-500  border-gray-300border-r border-gray-300">Order ID</div>
        <div className="text-gray-500 ">Date</div>
        <div className="text-gray-500 ">Customer</div>
        <div className="text-gray-500 ">Payment</div>
        <div className="text-gray-500 ">Total</div>
        <div className="text-gray-500 ">Items</div>
        <div className="text-gray-500 ">Action</div>

      </div>

      <h3 className="block md:hidden text-center font-semibold text-xl text-gray-700 sm:hidden ">Orders</h3>
      <div className="flex justify-end items-center">
          <div className="w-6 cursor-pointer flex justify-end mr-4 mb-3 md:hidden text-align-right">
        <FilterIcon className="w=[10px] h=[20px]"/>
      </div>
      </div>
    

      <div className="hidden md:block text-left ">
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

      {/* Mobile version */}

      {orders.map((order, index) => (
        <div key={index || order._id} className="w-100 mx-auto border-t border-gray-200 flex flex-cols grid grid-cols-1 gap-4 py-3 text-sm md:hidden mb-5">

          <div className="flex justify-between">
            <div>
                {order.paid ? (
              <span className="bg-green-700 text-white font-semibold border text-center border-green-700 px-4 py-1 text-sm rounded-full w-20">
                Success
              </span>
            ) : (
              <span className=" w-20 text-center bg-red-700 text-white font-semibold border border-red-700 px-4 py-1 rounded-full">
                Failed
              </span>
            )}
            </div>
          
            <div className="flex justify-center items-center gap-2 flex justify-start items-center">
              <button
                className="cursor-pointer"
                onClick={() =>
                  redirect(`/pages/orders/${order._id}`)
                }
              >
                View Details
              </button>
            </div>

          

          </div>

          <div className="flex flex-col">
              <div className="">
              {order.userEmail}
            </div>
            <div className="text-sm text-gray-400">
              {order.createdAt.replace("T", " ").slice(0, 16)}
            </div>

          </div>

              <div className="text-sm text-gray-800 ">
                {
                  order.cartItems.map((item, index) => (
                    <span key = {index || item.id} className="mr-2">
                     {item.quantity}x {item.itemName}
                    </span>
                  ))
                }
              </div>
       <hr className="w-80 mx-auto border-1 border-gray-200 "></hr>
         <div className="flex justify-between ">
          <span className="text-lg font-semibold text-gray-700">
             Total: $ {order.amountToPay}
          </span>
          <button className="text-red-700 font-semibold border border-red-700 rounded-lg px-3 py-2 cursor-pointer">
            Re-Order
          </button>
         
        </div>
        </div>
      
        
      

      ))

      

      }



    </section>
  )
}