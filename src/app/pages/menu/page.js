'use client';
import Image from "next/image";
import SectionHeaders from "../../component/layout/SectionHeaders";
import { useContext } from "react";
import { CartContext } from "../../component/AppContext";
import { useState, useEffect } from "react";
import { set } from "mongoose";
import AddToCartModal from "../../component/modals/addToCartModal";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";


export default function MenuPage() {
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const { addToCart } = useContext(CartContext);
    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const Session = useSession();
const user = Session?.data?.user;
    const getCategories = async () =>{
        await fetch('/api/category').then(res=>{
            if(res.ok){
                return res.json().then(data=>{
                    setCategories(data);
                })
            }
        })
    }

    const getItems = async () =>{
        await fetch('/api/menuItems').then(res=>{
            if(res.ok){
                return res.json().then(data=>{
                    setItems(data)
                })
            }
        })
    }

    const handleAddtocart = (item, selectedSize, selectedExtras) =>{
        console.log('item', item);
        console.log('size', selectedSize);
        console.log('extras', selectedExtras);
        console.log('user', user?.email);
      
        addToCart(item,selectedSize,selectedExtras,user?.email);
        toast.success('Item added to cart successfully!', {
            position: 'top-center',
            duration: 3000,
            style: {
              background: '#22c55e',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '8px',
              padding: '10px',
              boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.2)',
            },
          });
    
        
    }
    const getCaetItem = () =>{
      const cartItems =  localStorage.getItem('cartItem');

      return cartItems ? JSON.parse(cartItems) : [];
    }
    const openAddToCartModal = (item) => {
        console.log('item', item);
        if(item.additionalProps.ingredients.length === 0 || item.additionalProps.sizes.length === 0){
            handleAddtocart(item, null, null);
            return;
        }
        setOpenModal(true);
        setSelectedItem(item);
    }
    useEffect(()=>{
        getCategories();
        getItems();
       console.log('cartItems', getCaetItem());

    },[])

    console.log('items', items)

    return (
        <section className="mt-10">

            <div className="mx-auto mt-4 px-3">
                 
                  <h1 className="text-4xl font-semibold leading-normal text-center">
                <span className="text-red-500 text-3xl font-semibold">안녕하세요! </span>
                Welcome to our restaurant !!
            </h1>
            {categories.length > 0 && (
                <div className="text-center">
                    {categories.map((cat, index)=>(
                        <div key={index || cat._id} className="mt-10">
                              <SectionHeaders key={index || cat._id}
                            mainHeader={cat.name}/>
                            <div className="sm:grid sm:grid-cols-1 md:grid md:grid-cols-3 md:gap-4 md:mt-4 ">
                                {items.filter((item)=> item.category === cat._id).map((item, i)=>(
                                     <div className="flex flex-col gap-1 mb-3"
                                                key={i || item._id}
                                                style={{
                                                    "background":"linear-gradient(135deg,rgba (255,255,255,0.1),rgba(255,255,255,0))",
                                                    "WebkitBackdropFilter": "blur(20px)",
                                                    "backdropFilter":"blur(20px)",
                                                    "boxShadow":"0 8px 20px 0 rgba(0,0,0,0.37)",
                                                    // "border":"1px solid rgba(255,255,255,0.18)",
                                                    "borderRadius":"20px",
                                                }}
                                                >
                                                   
                                                                  <div className="pt-4 px-4 w-full flex justify-center"><Image
                                                                   width={300}
                                                                   height={300}
                                                                     src={item.itemImage}
                                                                     alt="userImage"
                                                                     
                                                                     className="object-cover aspect-square rounded-lg"
                                                                   />
                                                                    </div> 
                                                                
                                                    <h4 className=" font-semibold text-center py-2 text-xl">{item.itemName}</h4>
                                                    <p className="text-gray-700 text-sm px-5 text-center line-clamp-3 ">{item.itemProperties}</p>
                                                    <div className="px-4 flex justify-center items-center py-4 w-full"
                                                    ><button className="w-full text-white font-semibold bg-red-600 rounded-full py-4 px-3 mx-auto text-center text-md"
                                                   
                                                    onClick={() => 
                                                        openAddToCartModal(item)
                                                    }
                                                    > Add to cart {item.itemBasePrice} £</button></div>
                                                    
                                                </div>
                                ))}
                            </div>
                        </div>
                      

                      
                    ))}
                </div>
            )
            }
            


        
            </div>
          
           {
                openModal && (
                    <AddToCartModal 
                    closeModal={setOpenModal} 
                    item={selectedItem} 
                    handleAddToCart={handleAddtocart}
                    />
                )
            }

        </section>
    )
}