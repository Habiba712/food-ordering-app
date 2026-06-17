
 'use client'
 import { useEffect, useState } from "react";
import ImageUpload from "../../../component/imageUploads";
import toast from "react-hot-toast";
import UserTabs from "../../../component/userTabs";
import Link from "next/link";
import ArrowRight from "../../../component/icons/arrow_right";
import MenuFormPage from "../../../component/menuForm";
 
export default function NewElementPage() {
       const [userData, setUserData] = useState('')
    const [itemName, setItemName] = useState('')
    const [itemBasePrice, setItemBasePrice] = useState('')
    const [itemProperties, setItemProperties] = useState('')
    const [itemImage, setItemImage] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')

    const getUserData = async () => {
        const userData = await fetch('/api/profile', {
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
    const { props, ...data } = res;
    console.log('Sending payload data:', data);

    // 1. Define the fetch operation directly as a standard Promise sequence
    const createItemPromise = fetch('/api/menuItems', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data, props })
    }).then(async (response) => {
        if (!response.ok) {
            // Read error text or fallback to generic reject message
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Server error occurred');
        }
        return response.json(); // Clean fulfillment link for toast success tracking
    });

    // 2. Pass the direct fetch Promise chain straight to your hot toast handler
    try {
        await toast.promise(createItemPromise, {
            loading: 'Creating Item...',
            success: 'Item Created!',  
            error: (err) => err.message || 'Something went wrong'
        });
    } catch (error) {
        console.error('Item creation pipeline crashed:', error);
    }
};
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