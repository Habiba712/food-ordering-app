'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
export default function UserTabs() {

    const [isAdmin, setIsAdmin] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const getUserData = async () => {
        const userData = await fetch('/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json().then((data) => {
                console.log('data from userTabs', data)
                setUserEmail(data.email)
                setIsAdmin(data.Admin)

            })

        }).catch((err) => {
            return new Error(err);
        })

    }
    console.log('isAdmin', isAdmin)

    useEffect(() => {
        getUserData();

    }, [])

    const pathname = usePathname();
    return (

        <div className="w-full  ">
            <div className="w-full text-2xl grid grid-cols-5  sm:flex sm:flex-row text-sm gap-3 md:flex tabs  mt-8">

                {isAdmin ? (
                    <>
                        <Link
                            href={'/pages/profile'}

                            className={`${pathname === '/pages/profile' ? 'active' : ''}`}>Profile
                        </Link>

                        <Link href={'/pages/categories'}

                            className={`${pathname === '/pages/categories' ? 'active' : ''}`}

                        >Categories
                        </Link>


                        <Link href={'/pages/menuElements'} className={`${pathname.includes('/menuElements') ? 'active' : ''}`}>Menu Items
                        </Link>

                        <Link href={'/pages/users'} className={`${pathname.includes('users') ? 'active' : ''}`}>Users
                        </Link>

                        <Link href={'/pages/orders'} className={`${pathname === '/pages/orders' ? 'active' : ''}`}>Orders
                        </Link>
                    </>



                )
                    :
                    <> <Link
                        href={'/pages/profile'}

                        className={`${pathname === '/pages/profile' ? 'active' : ''}`}>Profile
                    </Link>


                        <Link href={'/pages/orders'} className={`${pathname === '/pages/orders' ? 'active' : ''}`}>Orders
                        </Link>

                    </>

                }




            </div>
        </div>




    )
}