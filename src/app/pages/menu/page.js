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

            <div className="mx-auto mt-4">
                 
                  <h1 className="text-4xl font-semibold leading-normal">
                <span className="text-red-500 text-3xl font-semibold">안녕하세요! </span>
                Welcome to our restaurant !!
            </h1>
            {categories.length > 0 && (
                <div className="text-center">
                    {categories.map((cat, index)=>(
                        <div key={index || cat._id} className="mt-10">
                              <SectionHeaders key={index || cat._id}
                            mainHeader={cat.name}/>
                            <div className="md:grid grid-cols-3 gap-4 mt-4">
                                {items.filter((item)=> item.category === cat._id).map((item, i)=>(
                                     <div className="mx-auto w-80 md:flex flex-col 
                                                justify-content  duration-300 ease-in
                                                mb-3
                                                "
                                                key={i || item._id}
                                                style={{
                                                    "background":"linear-gradient(135deg,rgba (255,255,255,0.1),rgba(255,255,255,0))",
                                                    "WebkitBackdropFilter": "blur(20px)",
                                                    "backdropFilter":"blur(20px)",
                                                    "boxShadow":"0 8px 20px 0 rgba(0,0,0,0.37)",
                                                    "border":"1px solid rgba(255,255,255,0.18)",
                                                    "borderRadius":"20px",
                                                }}
                                                >
                                                   <div className="w-[200px] h-[200px] relative mt-4 mx-auto">
                                                                   <Image
                                                                     src={item.itemImage}
                                                                     alt="userImage"
                                                                     fill
                                                                     className="object-cover rounded-lg"
                                                                   />
                                                                 </div>
                                                    <h4 className="text-xl font-semibold text-center mb-2">{item.itemName}</h4>
                                                    <p className="text-gray-700 text-sm mb-3 text-center mx-14 line-clamp-3 ">{item.itemProperties}</p>
                                                    <button className="text-white font-semibold bg-red-600 rounded-full px-6 py-3 mb-3 w-fit block mx-auto text-center flex justify-around"
                                                    type="button"
                                                    onClick={() => 
                                                        openAddToCartModal(item)
                                                    }
                                                    > Add to cart {item.itemBasePrice} £</button>
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
                    <AddToCartModal closeModal={setOpenModal} item={selectedItem} 
                    handleAddToCart={handleAddtocart}
                    />
                )
            }

        </section>
    )
}