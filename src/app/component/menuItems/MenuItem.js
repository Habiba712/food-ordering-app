'use client'
import Image from "next/image"
import pizza_hero from "../../../../public/images/pizza-hero.png"
import CartIcon from "../icons/cart"
import { usePathname } from "next/navigation";
export default function MenuItem({item}) {
    console.log('item', item)
    const pathname = usePathname();
    const isMenuPage = pathname && pathname.startsWith('/menu');
    return (
        <>
            <div className="z-1 flex flex-col 
            justify-between  duration-300 ease-in my-3 w-70 mx-auto
            "
            style={{
                "background":"linear-gradient(135deg,rgba (255,255,255,0.1),rgba(255,255,255,0))",
                "WebkitBackdropFilter": "blur(20px)",
                "backdropFilter":"blur(20px)",
                "boxShadow":"0 8px 20px 0 rgba(0,0,0,0.37)",
                "border":"1px solid rgba(255,255,255,0.18)",
                "borderRadius":"20px",
            }}
            >
               <div className=" mx-auto p-4">
                               <Image
                                 width={300}
                                 height={300}
                                 src={item.itemImage}
                                 alt="userImage"
                                 
                                 className="object-cover aspect-square rounded-lg"
                               />
                </div>
                <h4 className=" text-xl font-semibold text-center mb-2 ">{item.itemName}</h4>
                <p className="text-gray-700 text-sm mb-3 text-center mx-14 line-clamp-3 ">{item.itemProperties}</p>
                {isMenuPage && (
                    <button className="text-white font-semibold bg-red-600 rounded-full px-6 py-3 mb-3 w-fit block mx-auto text-center flex justify-around cursor-pointer">
                        Add to cart {item?.itemBasePrice} £
                    </button>
                )}
            </div>
            
        </>
    )
}