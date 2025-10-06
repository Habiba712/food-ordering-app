'use client'

import { redirect } from "next/navigation"
import ArrowRight from "../../component/icons/arrow_right"
import UserTabs from "../../component/userTabs"
import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function MenuItemsPage() {

  const [allItems, setAllItems] = useState()

  const getAllItems = async () => {
    await fetch('/api/menuItems').then(res => {
      if (res.ok) {
        return res.json().then(data => {
          setAllItems(data)
        })
      }

    })
  }

  console.log('allItems', allItems)

  useEffect(() => {
    getAllItems();
  }, [])

  return (
    <section classname="mt-8">
      <UserTabs />

      <div className="max-w-md mx-auto mt-8 flex justify-center items-center gap-4 border border-2 rounded-full py-2 hover:border-green-500 cursor-pointer mb-6">
        <Link
          href={"/pages/menuElements/newElement"}
        >
          Add New Item to Your Menu
        </Link>
        <ArrowRight />
      </div>

      <div className="sm:flex flex-col md:grid md:grid-cols-3 md:gap-3 md:mt-8 md:max-w-2xl md:mx-auto">
        {allItems?.map((item, index) => (
          <Link key={index || item._id}
            href={
              `/pages/menuElements/editElement/${item._id}`
            }
          >
            <div
              className="flex text-center justify-center mb-4  flex-col  gap-3 border-gray-100 hover:border-3  border rounded-lg py-2 px-3 cursor-pointer">
              <div className="w-[200px] h-[200px] relative right-1 mx-auto">
                <Image
                  src={item.itemImage}
                  alt="userImage"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>




              <h3>{item.itemName}</h3>
              <span className="text-gray-500 line-clamp-3">{item.itemProperties}</span>

              <span className="text-300 text-xl italic font-semibold"> {item.itemBasePrice}</span>
            </div>

          </Link>

        ))}
      </div>
    </section>
  )
}
