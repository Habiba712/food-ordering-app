'use client';
import Image from "next/image"
import googleIcon from "../../../../public/images/googIcon.webp"
import { signIn } from "next-auth/react";
import { React, useState } from 'react'
import { redirect } from 'next/navigation'
import Link from "next/link";
export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [createduser, setCreatedUser] = useState(false)
    const [userCreation, setUserCreation] = useState(false)

    async function handleSubmit(e) {
        setUserCreation(true)
        e.preventDefault();
        if (email === '' || password === '') {
            setError('Please fill in all fields')
        } else {
            setError('')
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            }
            )

            //* When we use the internal api we need to check the terminal, the status coede won't appear in the network tab
            //* To be able to check the status in the network tab we need to use the external api aka the full url : http://localhost:3000/api/signin
            //* in my case, they both work, I just had to unable the 3rd pardy requests in the netrwork tab

            if (res.status === 200) {
                setCreatedUser(true)
                setUserCreation(false)

                // redirect('/')
            }
            else {
                //* handle error

                setError('Something went wrong')
            }

        }

    }

    return (
        <div>
            <h1 className="text-center text-red-700 text-2xl font-semibold mt-3">Register</h1>
            <div className="text-center text-green-700 my-3">
                {createduser &&
                    <>
                        user is created, proceed to <Link className="underline" href="/pages/login">login</Link>
                    </>


                }

            </div>
            <form className="flex flex-col w-sm mx-auto p-3 justify-center gap-4" onSubmit={handleSubmit}>
                <div className="text-center text-red-500 text-sm mt-3">
                    {error}
                </div>
                <input type="email" placeholder="email"
                    disabled={userCreation}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}

                />
                <input type="password" placeholder="password"
                    disabled={userCreation}

                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    disabled={userCreation}

                    type="submit">
                    Register
                </button>
                <div className="text-center text-gray-500 text-sm mt-3">
                    Or login using a social provider
                </div>
                <button
                    type='button'
                    onClick={()=>signIn('google', {callbackUrl:'/profile'} )}
                    className="flex justify-center items-center gap-2 bg-white rounded-full border-1 border-red-600 text-gray-600 text-sm px-4 py-1 cursor-pointer">
                    <Image src={googleIcon} width={35} height={35} alt={'google'} />

                    Login with google
                </button>
            </form>

        </div>
    )
}