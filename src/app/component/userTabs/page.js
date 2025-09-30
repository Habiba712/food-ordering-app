'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
export function UserTabs() {

    const [isAdmin, setIsAdmin] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const getUserData = async () => {
        const userData = await fetch('http://localhost:3000/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json().then((data) => {
                console.log('data from userTabs', data)
                setUserEmail(data.email)
                setIsAdmin(data.admin)

            })

        }).catch((err) => {
            return new Error(err);
        })

    }

    useEffect(() => {
        getUserData();

    }, [])

    const pathname = usePathname();
    return (

        <div>
            <div className="text-sm flex md:flex gap-4 justify-center items-center tabs max-w-md mx-auto mt-8">

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