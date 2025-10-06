
'use client'
import { useEffect, useState } from "react";
import ImageUpload from "../../../../lib/imageUploads";
import toast from "react-hot-toast";
import { UserTabs } from "../../../../component/userTabs/page";
import Link from "next/link";
import ArrowRight from "../../../../component/icons/arrow_right";
import { useParams } from "next/navigation";
import { redirect } from "next/navigation";
import MenuFormPage from "../../../../lib/menuForm/page";

export default function NewElementPage() {
    const [userData, setUserData] = useState('')
    const [itemName, setItemName] = useState('')
    const [itemBasePrice, setItemBasePrice] = useState('')
    const [itemProperties, setItemProperties] = useState('')
    const [itemImage, setItemImage] = useState('')
    const [itemSizes, setItemSizes] = useState([])
    const [itemIngredients, setItemIngredients] = useState([])
    const [category, setCategory] = useState('')
    const [getItemById, setGetItemById] = useState('')
    const [props, setProps] = useState([])



    const { id } = useParams()

    const getUserData = async () => {
        const userData = await fetch('http://localhost:3000/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json().then((data) => {

                setUserData(data)
            })

        }).catch((err) => {
            return new Error(err);
        })

    }

    const handleDeleteMenuItem = async (id) => {
        console.log('we are here', id)
        const deleteItem = new Promise(async (resolve, reject) => {
            const response = await fetch('http://localhost:3000/api/menuItems/?id=' + id, {
                method: 'DELETE',
            }).then(res => {
                if (res.ok) {
                    resolve(res)
                }
            }).catch((err) => {
                reject(err)
            })
            await toast.promise(deleteItem, {
                loading: 'Deleting Item...',
                success: 'Item Deleted !',
                error: 'Something went wrong'
            })

            redirect('/menuElements');
        })
    }

    const handleDeleteProp = async (prop_id, label) => {
        console.log('we are here', prop_id, label)
        const menuItemId = id;
        const propId = prop_id;

        let key;

        if (label.toLowerCase() === 'size' || label.toLowerCase() === 'sizes') {
            key = 'sizes';
        } else if (label.toLowerCase() === 'ingredient' || label.toLowerCase() === 'ingredients') {
            key = 'ingredients';
        }

        
        if (!props[key]?.some(i => i._id === propId)) {
            return toast.error('This prop does not exist in this item')
        }

        const deleteItem = new Promise(async (resolve, reject) => {
            const response = await fetch(`http://localhost:3000/api/menuItems/?id=${id}&label=${label}&prop_id=${propId}`, {
                method: 'DELETE',

            }).then(res => {
                if (res.ok) {
                    resolve(res)
                }
            }).catch((err) => {
                reject(err)
            })
            await toast.promise(deleteItem, {
                loading: 'Deleting Prop Item...',
                success: 'Item Prop Deleted !',
                error: 'Something went wrong'
            })

            redirect('/pages/menuElements');
        })
        console.log('id', id)
        console.log('prop', label)
    }
    const handleEditedItem = async (ev, res) => {

        ev.preventDefault();

        const { props, ...data } = res
        const newItem = new Promise(async (resolve, reject) => {
            await fetch('http://localhost:3000/api/menuItems', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,

                    data,
                    props
                })
            }).then(res => {
                if (res.ok) {
                    resolve(res)
                }
                else {
                    reject(res);
                }
            })

        })

        await toast.promise(newItem, {
            loading: 'Updating Item...',
            success: 'Item Updated !',
            error: 'Something went wrong'
        })
    }

    const getItem = async () => {

        await fetch('http://localhost:3000/api/menuItems/', {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',

            }
        }).then(res => {
            if (res.ok) {
                return res.json().then(data => {
                    setItemImage(data.find(i => i._id === id).itemImage)
                    setItemName(data.find(i => i._id === id).itemName)
                    setItemBasePrice(data.find(i => i._id === id).itemBasePrice)
                    setItemProperties(data.find(i => i._id === id).itemProperties)
                    setItemSizes(data.find(i => i._id === id).additionalProps.sizes)
                    setItemIngredients(data.find(i => i._id === id).additionalProps.ingredients)
                    setCategory(data.find(i => i._id === id).category)
                    setProps(data.find(i => i._id === id).additionalProps)

                })
            }

        })
    }
    console.log('props', props)

    const menuItem = {
        id,
        itemName,
        itemBasePrice,
        itemProperties,
        itemImage,
        itemSizes,
        itemIngredients,
        category
    }

    useEffect(() => {
        getUserData()
        getItem()

    }, [])
    console.log('item', menuItem)
    if (userData.Admin === false) {

        return redirect('/')
    }


    return (
        <section className="mt-8">
            <UserTabs />
            <div className="max-w-md mx-auto mt-8 flex justify-center items-center gap-4 border border-2 rounded-full py-2 hover:border-green-500 cursor-pointer">
                <Link
                    href={"/pages/menuElements"}
                >
                    Go to Items List
                </Link>
                <ArrowRight />
            </div>
            <MenuFormPage
                onSubmit={handleEditedItem}
                menuItem={menuItem}
                onDelete={handleDeleteMenuItem}
                onPropDelete={handleDeleteProp}
            />
        </section>
    )
}