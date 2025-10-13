'use client'
import Image from "next/image"
import salad_image1 from "../../../../public/images/sallad1.png"
import salad_image2 from "../../../../public/images/sallad2.png"
import salad_image from "../../../../public/images/salad_leaf.png"
import cheese1 from "../../../../public/images/cheese1.jpeg"
import cornDog from "../../../../public/images/koreanCornDog.png"
import pizza_hero from "../../../../public/images/pizza-hero.png"
import chopsticks_Up from "../../../../public/images/newKimbab1.png"
import MenuItem from "../menuItems/MenuItem"
import SectionHeaders from "./SectionHeaders"
import { useEffect, useState } from "react";
import ArrowRight from "../icons/arrow_right"
import Link from "next/link"


export default function HomeMenu() {

    const [allItems, setAllItems] = useState([])
    const getAllItems = async () => {
        await fetch('/api/menuItems').then(res => {
            if (res.ok) {
                return res.json().then(data => {
                    setAllItems(data.slice(0, 3))
                })
            }

        })
    }

    useEffect(() => {
        getAllItems();
    }, [])

    console.log('allItems', allItems)
    return (
        <section className="">

            <div className="absolute h-full left-0 right-0 w-full justify-start" >

                {/* <div className="absolute -left-10 -top-60 text-left -z-1 rotate-160">
                    <Image src={cornDog} width={200} height={90} alt={'salad_leaf'} />
                </div> */}

             <div className="fixed top-60 left-0 -rotate-90 p-0 -z-1">
                    <Image src={chopsticks_Up} width={400} height={395} alt={'salad_leaf'} />
                </div>
            </div>
            <div className="text-center mt-10">
                <SectionHeaders subHeader={'CHECK HERE'} mainHeader={'Our Best Sellers'} />

            </div>
            <div className="md:grid grid-cols-3 gap-4">
                {
                    allItems?.map((item, index) => {
                        return (

                            <MenuItem key={index || item._id} item={item} />


                        )
                    })
                }

            </div>
            <div className="flex justify-self-center justify-between items-center mt-4 py-2 px-6 text-red-600 bg-white border border-red-600 rounded-full w-fit">
                <Link href="/pages/menu" className="font-semibold cursor-pointer text-red-600 hover:text-red-700 transition duration-300 ease-in-out z-100">

                    See More

                </Link>
                <ArrowRight className="ml-3 w-5 h-6" />
            </div>

        </section>
    )
}