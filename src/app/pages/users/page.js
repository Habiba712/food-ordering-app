'use client';
import { use, useEffect, useState } from "react";
import UserTabs from "../../component/userTabs";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import EditIcon from "../../component/icons/edit";
export default function UsersPage() {
//   http://localhost:3000/pages/users/editUser?id=681e86da3d698d1d63d32e48
// http://localhost:3000/pages/menuElements/editElement/6840780365a54c16cf95a53e

    const session = useSession();
    const status = session.status;
    const [users, setUsers] = useState([]);
    const [admin, setAdmin] = useState();

    const getUsersData = async () => {
        const userData = await fetch('http://localhost:3000/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json().then((data) => {
                console.log('data', data);
                setUsers(data);
            })

        }).catch((err) => {
            return new Error(err);
        })

    }

     const getUserData = async () =>{
        const userData = await fetch('http://localhost:3000/api/profile',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {  
            return res.json().then((data)=>{
                console.log('data', data);
                // setUserName(data.name)
                // setUserEmail(data.email)
                // setSavedImage(data.image)
                // setPhone(data.phone)
                // setStreet(data.street)
                // setCountry(data.country)
                // setCity(data.city)
                // setPostCode(data.postCode)
             
            })
            
        }).catch((err)=>{
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
console.log('users', users);
    return (
        <section className="mt-10">
            { admin ? <UserTabs /> : ''}
            <div className="mt-3 ">
                   {users ? (
                     users.map((user, index) => (
                        <div 
                        key={index || user._id}
                        className="flex justify-between border rounded-lg px-4 py-3 mb-3">
                            <div className="grid grid-cols-3 gap-2 grow">
                                <div className="italic text-gray-600">{user?.name || 'No name'}</div>
                                <div className="">{user?.email}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link href={`/pages/users/editUser/${user._id}`}>
                                <EditIcon />
                                </Link>

                            </div>
                        </div>
                      
                     ))
                   )
                    : 
                    <h3>No users found</h3>
                    }
            </div>   
        </section>
    )
}                                                   