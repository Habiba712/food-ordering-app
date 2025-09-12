import { useState, useEffect } from "react"

export default function DeleteModal({ label, onDelete, closeModal }) {

    const [open, setOpen] = useState(true)

    useEffect(()=>{
        setOpen(true)
    },[])
    return(
       open && (
         <div 
            className="h-full w-full fixed top-0 left-0 flex justify-center items-center"
             style={{
                "background":"linear-gradient(135deg,rgba (255,255,255,0.1),rgba(255,255,255,0))",
                "WebkitBackdropFilter": "blur(20px)",
                "backdropFilter":"blur(20px)",
                "boxShadow":"0 8px 20px 0 rgba(0, 0, 0, 0.37)",
                "border":"1px solid rgba(255,255,255,0.18)",
                "borderRadius":"20px",
            }}
         >
            <div className="flex gap-3 bg-white p-10 rounded-lg shadow-xl">
                <button
                type="button"
                className="bg-red-600 text-white rounded-lg px-4 py-2 "
                onClick={()=>{
                     setOpen(false),
                     onDelete()
                }}
                >Yes, Delete {label}</button>
                <button
                type="button"
                className="border border-gray-600 px-4 py-2 text-gray-600"
                onClick={()=> {
                   setOpen(false) 
                   closeModal(false)
                }}
                >No, Cancel</button>
            </div>
        </div>
       )
       
    )

}