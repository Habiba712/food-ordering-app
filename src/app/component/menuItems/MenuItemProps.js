import { useState } from "react"
import PlusSingIcon from "../icons/plus_sing"
import TrashIcon from "../icons/trash"
import ChevronUpIcon from "../icons/chevron_up"
import ChevronDownIcon from "../icons/chevron_down"

export default function MenuItemProps({ props, setProps, name, label, onDelete }) {

    const [open, setOpen] = useState(false)
    const addProp = () => {
       
        setProps(prev => {
            return [...prev, {
                name: '',
                price: ''
            }]
        })
 setOpen(true)
    }
    const editProp = (e, index, prop) => {

        setProps(prev => {

            const oldprops = [...prev]
            oldprops[index][prop] =  e.target.value
        
            return oldprops;
        })

    }
console.log('toggle', open)
    

    return (
        <div className="bg-white-300 py-2 rounded-md  mb-2 ">
            <div className={"flex items-center justify-between"}>
                <label className="text-gray-700 py-2 "> {label}s  ({props?.length || 0})</label>
                    <button 
                    type="button"
                    onClick={()=> setOpen(prev => !prev)}>
                            {
                                open 
                                ? 
                                <ChevronDownIcon className="w-5 h-5 cursor-pointer"/>
                                : 
                                 <ChevronUpIcon className="w-5 h-5 cursor-pointer "/>

                            }
                    </button>
            </div>
            {props?.length > 0 &&
                props.map((item, index) => (
                    <div className={"flex gap-2 bg-gray-200 p-2 rounded-lg  mb-2 " + (open ? "" : "hidden")} 
                    key={index}>     
                        <div>
                            <label>{label}</label>
                            <input
                                value={item.name}
                                onChange={(e) => editProp(e, index, 'name')}
                                placeholder={`${label} `}
                                type="text"
                            />
                        </div>
                        <div>
                            <label>Additional Price</label>
                            <input
                                value={item.price}
                                onChange={(e) => editProp(e, index, 'price')}

                                placeholder={`${label} Price `} type="number" />
                        </div>
                        <button
                        type="button"
                        onClick={()=> onDelete(item._id, label)}
                        className={"flex flex-end justify-end items-center mt-2"}
                        >
                            <TrashIcon className="w-5 h-5 text-red-600 cursor-pointer" />
                        </button>
                    </div>

                ))

            }

            <button type="button"
                className="flex items-center justify-center hover:font-bold px-4 py-2 w-full border"
                onClick={addProp}
            >
                <span>Add {label}</span>
                <PlusSingIcon className={"w-9 h-5 font-bold"}
                />

            </button>


        </div>
    )
}