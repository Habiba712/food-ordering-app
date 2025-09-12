
 'use client'
 import { useEffect, useState } from "react";
import ImageUpload from "../../../lib/imageUpload/page";
import toast from "react-hot-toast";
import { UserTabs } from "../../../component/userTabs/page";
import Link from "next/link";
import ArrowRight from "../../../component/icons/arrow_right";
import MenuFormPage from "../../../lib/menuForm/page";
 
export default function NewElementPage() {
       const [userData, setUserData] = useState('')
    const [itemName, setItemName] = useState('')
    const [itemBasePrice, setItemBasePrice] = useState('')
    const [itemProperties, setItemProperties] = useState('')
    const [itemImage, setItemImage] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')

    const getUserData = async () => {
        const userData = await fetch('http://localhost:3000/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json().then((data) => {

                setUserData(data)
            })

        }).catch((err) => {
            return new Error(err);
        })

    }

    const handleNewItem = async (ev, res) => {
        ev.preventDefault();
        const {props, ...data} = res
        console.log('we re here', data)
        const newItem = new Promise(async (resolve, reject) => {
           await fetch('http://localhost:3000/api/menuItems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({data, props})
            }).then(res =>{
                if(res.ok){
                    resolve(res)
                }
                else{
                    reject(res);
                }
            })

        })

       await  toast.promise(newItem,{
            loading: 'Creating Item...',
            success: 'Item Created !',  
            error: 'Something went wrong'
        })
    }
    const newItem = {
        itemName,
        itemBasePrice,
        itemProperties,
        itemImage,

    }
   
    useEffect(() => {
        getUserData()

    }, [])

    if (userData.Admin === false) {

        return redirect('/')
    }

    return(
         <section className="mt-8">
            <UserTabs />
            <div className="max-w-md mx-auto mt-8 flex justify-center items-center gap-4 border border-2 rounded-full py-2 hover:border-green-500 cursor-pointer">
            <Link 
            href={"/pages/menuElements"}
            >
                Go to Items List
            </Link>
            <ArrowRight/>
        </div>
             <MenuFormPage onSubmit={handleNewItem} menuItem={newItem} />
        </section>
    )
}