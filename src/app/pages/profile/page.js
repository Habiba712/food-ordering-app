'use client';
import { set } from "mongoose";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserTabs } from "../../component/userTabs/page";
import ImageUpload from "../../lib/imageUpload/page";
import UserEditPage from "../../lib/userEdit/page";
 

export default function ProfilePage() {

    const session = useSession();
    const status = session.status;
    console.log('session', session)

    const [userEmail, setUserEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [city, setCity] = useState('');
    const [postCode, setPostCode] = useState('');
    const [country, setCountry] = useState('');
    const [savedImage, setSavedImage] = useState('');
    const [street, setStreet] = useState('');
    const [phone, setPhone] = useState('');
    const [initialAdmin, setInitialAdmin] = useState(false);

    const [admin, setAdmin] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const {update} = useSession();
    
    const getUserData = async () =>{
        const userData = await fetch('http://localhost:3000/api/profile',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {  
            return res.json().then((data)=>{
                console.log('data', data);
                setUserName(data.name)
                setUserEmail(data.email)
                setSavedImage(data.image)
                setPhone(data.phone)
                setStreet(data.street)
                setCountry(data.country)
                setCity(data.city)
                setPostCode(data.postCode)
                setAdmin(data.admin)
                setInitialAdmin(data.admin);
               
            })
            
        }).catch((err)=>{
            return new Error(err);
        })
        
    }
     
   
    async function handleUserInfo(e) {
        e.preventDefault();

          const savingPromise = new Promise((resolve, reject) => {
            fetch('http://localhost:3000/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                     name: userName,
                     image: savedImage,
                    email: userEmail,   
                     phone: phone,
                     street: street,
                        city: city,
                        postCode: postCode,
                        country: country,
                        admin: admin

                    })
            }).then((res) => {
                 
                if (res.ok === true) {

                    
                    resolve(res);
                }
            }).catch((err) => {
                reject(err);
            })
        })
        await toast.promise(savingPromise, {
            loading: "Saving...",
            success: "Saved !",
            error: "Something went wrong"
        })
      await update({
  user: {
    name: userName,
    email: userEmail,
  }
});


    
    }

    useEffect(() => {
       
       getUserData();
        setUserName(session?.data?.user?.name)
        setUserEmail(session?.data?.user?.email)
        setSavedImage(session?.data?.user?.image)
 
    }, [session])

    if (status === 'loading') {
        return "Loading..."

    }
    else if (status === 'unauthenticated') {
        return redirect('/pages/login');
    }
 
    const userInfo = {
        userName,
        userEmail,
        savedImage,
        phone,
        street,
        city,
        postCode,
        country,
        admin,
        initialAdmin
    }
     
    const userInfoFunctions ={
        setUserName,
        setUserEmail,
        setSavedImage,
        setPhone,
        setStreet,
        setCity,
        setPostCode,
        setCountry,
        setAdmin
    }

    // async function handleImageUplaod(e) {

    //     const files = e.target.files[0];

    //     console.log('files', files);
    //     const data = new FormData();
    //     data.append('file', files);

    //     for (let [key, value] of data.entries()) {
    //         console.log(`${key}:`, value);
    //     }

    //     const imageUploadPromise =

    //         fetch('http://localhost:3000/api/upload', {
    //             method: 'POST',
    //             body: data,

    //         }).then(response => {
    //             if (response.ok) {
    //                 return response.json().then(link => {
    //                     console.log('link', link);
    //                     setSavedImage(link.url)
    //                 })
    //             }
    //             throw new Error('Image upload failed');
    //         })


    //     await toast.promise(imageUploadPromise, {
    //         loading: "Uploading..." ,
    //         success: "Uploaded !",
    //         error: "Something went wrong"
    //     })
    // }
    return (
        <section className="mt-10">
            
             <UserTabs /> 
            <UserEditPage 
            userInfo={userInfo} 
            userInfoFunctions={userInfoFunctions} 
            onSave={handleUserInfo}
            />
        </section>
    )
}