'use client'
import { useEffect, useState } from "react"
import ImageUpload from "../imageUpload/page"
import { set } from "mongoose"
import PlusSingIcon from "../../../app/component/icons/plus_sing"
import MenuItemProps from "../../../app/component/menuItems/MenuItemProps"
import DeleteModal from "../../../app/component/modals/deleteModal"
export default function MenuFormPage({
    onSubmit,
    menuItem,
    onDelete,
    onPropDelete
}) {

    const [itemName, setItemName] = useState('')
    const [itemBasePrice, setItemBasePrice] = useState('')
    const [itemProperties, setItemProperties] = useState('')
    const [itemImage, setItemImage] = useState('')
    const [buttonState, setButtonState] = useState('')
    const [sizes, setSizes] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')

    const fetchCategories = async () => {
        await fetch('http://localhost:3000/api/category', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                    },
                }).then((res) => {
                        return res.json().then((data)=>{
                            setCategories(data)
                        })
                })
    }

console.log('selectedCategory', selectedCategory)
    useEffect(() => {
         fetchCategories()

        if (menuItem) {
            setItemName(menuItem?.itemName || '');
            setItemBasePrice(menuItem?.itemBasePrice || '');
            setItemProperties(menuItem?.itemProperties || '');
            setItemImage(menuItem?.itemImage || '');
            setSizes(menuItem?.itemSizes || []);
            setIngredients(menuItem?.itemIngredients || []);
            setSelectedCategory(
                categories.find(cat => cat._id === menuItem?.category)?._id
           || '');
            

        }
        if (!menuItem.id) {
            setButtonState('Create')
        }
        else
            setButtonState('Update')

           
    }, [menuItem])


    console.log('selected cat', selectedCategory)


    return (
        <form className="mt-8" onSubmit={(ev) => 
            onSubmit(ev, 
                        { itemName, 
                          itemBasePrice, 
                          itemProperties, 
                          itemImage, 
                          selectedCategory,
                          props: 
                                { 
                                  ingredients, 
                                  sizes 
                                }
                        }
                    )}>

            <div className="flex gap-2 max-w-2xl mx-auto">
                <div className="flex flex-col  gap-2 mt-5">

                    <ImageUpload link={itemImage} setLink={setItemImage} />
                </div>
                <div className="flex flex-col gap-2 grow">
                    <label>Name</label>
                    <input
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        placeholder="Name"
                        type="text" />

                    <label>Base Price</label>
                    <input
                        value={itemBasePrice}
                        onChange={(e) => setItemBasePrice(e.target.value)}
                        placeholder="Base Price"
                        type="number" />
                    <label>Category</label>
                    <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                        {
                            categories.length > 0 && (
                                categories.map((item, index) => (
                                    <option value={item._id} key={index}>
                                        {item.name}
                                    </option>
                                )
                            )
                        )
                        }
                    </select>
                    <label>Properties</label>
                    <input
                        value={itemProperties}
                        onChange={(e) => setItemProperties(e.target.value)}
                        placeholder="Properties"
                        type="text" />


                    <MenuItemProps props={sizes} name={'Sizes'} label={'Size'} setProps={setSizes} onDelete={onPropDelete} />
                    <MenuItemProps props={ingredients} name={'Ingredients'} label={'Ingredient'} setProps={setIngredients} onDelete={onPropDelete} />
                    <button type="submit"

                        className="">
                        {
                            buttonState === 'Create' ?
                                'Create'
                                :
                                'Update'
                        }

                    </button>

                    <button type="button"
                            className="border border-red-600 text-red-600 rounded-full px-6 mb-3 w-full text-center flex justify-around"
                            onClick={()=> 
                                // onDelete(menuItem.id)
                                setShowDeleteModal(true)
                            }
                            >
                            Delete
                    </button>
                   { 
                   showDeleteModal && 
                    (
                        <DeleteModal 
                            label={'Menu Item'} 
                            closeModal={setShowDeleteModal}
                            onDelete={() => {
                                onDelete(menuItem.id)
                                setShowDeleteModal(false)
                            }}
                        />
                    )
                    }
                </div>
            </div>

        </form>
    )
}