'use client';
import { use, useEffect, useState } from "react";
import  UserTabs from "../../../../component/userTabs";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import UserEditPage from "../../../../component/userEdit";
import toast from "react-hot-toast";

export default function UserPage() {

    const session = useSession();
 
    const {update} = useSession()

    const status = session.status;
    const [users, setUsers] = useState([]);
    const [admin, setAdmin] = useState();
    const [user, setUser] = useState({});

    const [userEmail, setUserEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [city, setCity] = useState('');
    const [postCode, setPostCode] = useState('');
    const [country, setCountry] = useState('');
    const [savedImage, setSavedImage] = useState('');
    const [street, setStreet] = useState('');
    const [phone, setPhone] = useState('');
    const [initialAdmin, setInitialAdmin] = useState(false);
    const { id } = useParams();
    console.log('id', id)

     

    async function handleEditUser(e) {
        e.preventDefault();
        const savingPromise = new Promise((resolve, reject) => {
            fetch('http://localhost:3000/api/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
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
 

    }

 



    const getUsersData = async () => {
        const userData = await fetch('http://localhost:3000/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json().then((data) => {
                console.log('data', data);
                setUserEmail(data.find(i => i._id === id).email)
                setUserName(data.find(i => i._id === id).name)
                setSavedImage(data.find(i => i._id === id).image)
                setPhone(data.find(i => i._id === id).phone)
                setStreet(data.find(i => i._id === id).street)
                setCountry(data.find(i => i._id === id).country)
                setCity(data.find(i => i._id === id).city)
                setPostCode(data.find(i => i._id === id).postCode)
                setAdmin(data.find(i => i._id === id).admin)

            })

        }).catch((err) => {
            return new Error(err);
        })

    }

    const getUserData = async () => {
        const userData = await fetch('http://localhost:3000/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json().then((data) => {
                 
                setInitialAdmin(data.admin)
                // setUserName(data.name)
                // setUserEmail(data.email)
                // setSavedImage(data.image)
                // setPhone(data.phone)
                // setStreet(data.street)
                // setCountry(data.country)
                // setCity(data.city)
                // setPostCode(data.postCode)

            })

        }).catch((err) => {
            return new Error(err);
        })

    }


    useEffect(() => {
        getUsersData();
        getUserData()

    }, [])

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
        admin, initialAdmin
    }

    const userInfoFunctions = {
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
    console.log('user Info', userInfo);
    return (
        <section className="mt-10">
            {admin ? <UserTabs /> : ''}
            <UserEditPage
                userInfo={userInfo}
                userInfoFunctions={userInfoFunctions}
                onSave={handleEditUser}
            />

        </section>
    )
}