'use client';
import { useState } from 'react'
import googleIcon from "../../../../public/images/googIcon.webp"
import Image from "next/image"
import { signIn } from "next-auth/react";

export default function LoginPage () {

     const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginInProgress, setLoginInProgress] = useState(false)
    async function handleFormSubmit(e) {
        e.preventDefault();
        setLoginInProgress(true)

        await signIn('credentials',{email, password, callbackUrl:'/pages/profile'})
        // const res = await fetch('/api/signin', {
       

       
        setLoginInProgress(false)
    }
    return(
        <section>
            <h1 className="text-center text-red-700 text-2xl font-semibold mt-3">Login</h1>

            <form className="flex flex-col w-sm mx-auto p-3 justify-center gap-4" onSubmit={handleFormSubmit}>
            <input type="email" placeholder="email" name="email"
                    disabled={loginInProgress}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}

                />
                <input type="password" placeholder="password" name="password"
                    disabled={loginInProgress}

                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' disabled={loginInProgress}>Login</button>
                <div className="text-center text-gray-500 text-sm mt-3">
                    Or login using a social provider
                </div>
                <button
                type='button'
                onClick={()=>signIn('google', {callbackUrl:'/pages/profile'} )}
                className="flex justify-center items-center gap-2 bg-white rounded-full border-1 border-red-600 text-gray-600 text-sm px-4 py-1 cursor-pointer">
                    <Image src={googleIcon} width={35} height={35} alt={'google'} />

                    Login with google
                </button>
            </form>
            </section>
    )
}