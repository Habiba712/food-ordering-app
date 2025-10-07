'use client'
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ImageUpload({ link, setLink }) {


    async function handleImageUplaod(e) {

        const files = e.target.files[0];


        const data = new FormData();
        data.append('file', files);

        for (let [key, value] of data.entries()) {
            console.log(`${key}:`, value);
        }

        const imageUploadPromise =

            fetch('/api/upload', {
                method: 'POST',
                body: data,

            }).then(response => {
                if (response.ok) {
                    return response.json().then(link => {
                        setLink(link.url)
                    })
                }
                throw new Error('Image upload failed');
            })


        await toast.promise(imageUploadPromise, {
            loading: "Uploading...",
            success: "Uploaded !",
            error: "Something went wrong"
        })

    }

    return (
        <>
            <div className="flex flex-col  gap-2">

                <div className="flex justify-center items-center">
                    <Image
                        className="rounded-full bg-gray-100 text-center"
                        src={link
                            ? link : "/images/imagePlaceholder.jpg"
                        } width={100} height={100} alt="userImage" />
                </div>
                <div className="cursor-pointer  flex justify-center items-center">




                </div>
            </div>
            <div className="cursor-pointer  flex justify-center items-center">


                <input
                    onChange={handleImageUplaod}
                    className="cursor-pointer w-30 border text-sm rounded-full px-4 py-2"
                    type="file" />



            </div>

        </>

    )

}