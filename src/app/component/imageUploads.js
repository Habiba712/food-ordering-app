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
                        className="rounded-full bg-gray-100 text-center object-cover aspect-square"
                        src={link
                            ? link : "/images/imagePlaceholder.jpg"
                        } width={100} height={100} alt="userImage" />
                </div>
                <div className="cursor-pointer  flex justify-center items-center">




                </div>
            </div>
            <div className="cursor-pointer  flex justify-center items-center">
 <label
                                    htmlFor="file-upload"
                                    className=" block w-fit rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-400 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300">Upload Image </label>

                <input
                 type="file"
                                    id="file-upload"
                    onChange={handleImageUplaod}
                    className="hidden mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-300"
                                    placeholder="Upload an image"
                    
                    />



            </div>

        </>

    )

}