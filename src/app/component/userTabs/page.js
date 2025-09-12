'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export function UserTabs() {
    const pathname = usePathname();
    return (

        <div>
            <div className="flex gap-4 justify-center items-center tabs max-w-mdmx-auto mt-8">
                <Link
                    href={'/pages/profile'}

                    className={`${pathname === '/pages/profile' ? 'active' : ''}`}>Profile</Link>
                <Link href={'/pages/categories'}

                    className={`${pathname === '/pages/categories' ? 'active' : ''}`}

                >Categories</Link>
                <Link href={'/pages/menuElements'} className={`${pathname.includes('/menuElements') ? 'active' : ''}`}>Menu Items</Link>
                <Link href={'/pages/users'} className={`${pathname.includes('users') ? 'active' : ''}`}>Users</Link>
                <Link href={'/pages/orders'} className={`${pathname === '/pages/orders' ? 'active' : ''}`}>Orders</Link>
            </div>
        </div>




    )
}