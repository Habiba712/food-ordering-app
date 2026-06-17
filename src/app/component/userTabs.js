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
                setIsAdmin(data.admin)

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

        <div className="w-full flex justify-center items-center  ">
            <div className="w-fit flex mx-auto flex-row text-sm text-2xl  gap-3 md:flex  ">

                {isAdmin ? (
                    <div className="flex justify-center items-center flex-wrap gap-3 ">
                      <div className="tabs">  <Link
                            href={'/pages/profile'}

                            className={`${pathname === '/pages/profile' ? 'active' : ''}`}>Profile
                        </Link></div>
<div className="tabs">

    
                        <Link href={'/pages/categories'}

                            className={`${pathname === '/pages/categories' ? 'active' : ''}`}

                        >Categories
                        </Link>

</div>

                       <div className="tabs">
                         <Link href={'/pages/menuElements'} className={`${pathname.includes('/menuElements') ? 'active' : ''}`}>Menu Items
                        </Link>
                       </div>

                       <div className="tabs">
                         <Link href={'/pages/users'} className={`${pathname.includes('users') ? 'active' : ''}`}>Users
                        </Link>
                        </div>

                        <div className='tabs'>
                            <Link href={'/pages/orders'} className={`${pathname === '/pages/orders' ? 'active' : ''}`}>Orders
                        </Link>
                        </div>
                    </div>



                )
                    :
                    <> 
                <div className="tabs"> <Link
                        href={'/pages/profile'}

                        className={`${pathname === '/pages/profile' ? 'active' : ''}`}>Profile
                    </Link>
                    </div>


                       <div className="tabs">
                         <Link href={'/pages/orders'} className={`${pathname === '/pages/orders' ? 'active' : ''}`}>Orders
                        </Link>
                       </div>

                    </>

                }




            </div>
        </div>




    )
}