'use client';
import { useState, useEffect } from "react";
import  UserTabs from "../../component/userTabs";
import { get } from "http";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import TrashIcon from "../../component/icons/trash";
import EditIcon from "../../component/icons/edit";
import DeleteModal from "../../component/modals/deleteModal";
import { set } from "mongoose";

export default function CategoriesPage() {

    const [userData, setUserData] = useState('')
    const [categories, setCategories] = useState([])
    const [categoryName, setCategoryName] = useState('')
    const [editCategory, setEditCategory] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('')


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

    const handleNewCategory = async (e) => {

        e.preventDefault();

        const newCategory = new Promise(async (resolve, reject) => {

            await fetch('http://localhost:3000/api/category', {
                method: editCategory ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: categoryName,
                    _id: editCategory?._id
                })
            }).then((res) => {
                if (res.ok === true) {

                    setCategoryName('')
                    resolve(res);
                    setEditCategory('')
                    fetchCategories()
                }
                else {
                    reject(res);
                }
            })
        })


        toast.promise(newCategory, {
            loading: editCategory ? "Updating Category..." : "Creating Category...",
            success: editCategory ? "Category Updated  !" : "Category Created !",
            error: "Something went wrong"
        })

        // fetchCategories();

    }

    const fetchCategories = async () => {
        const categories = await fetch('http://localhost:3000/api/category', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json().then((data) => {
                setCategories(data)
            })
        }).catch((err) => {
            return new Error(err);
        })

    }


    const handleDeleteCategory = async (id) => {
        const deteCategory = new Promise(async (resolve, reject) => {
            const res = await fetch(`http://localhost:3000/api/category/?id=${id}`, {
                method: 'DELETE'
            }).then((res) => {
                if (res.ok) {
                    resolve(res)
                }
            }).catch((err) => {
                reject(err)
            })
        })

        await toast.promise(deteCategory, {
            loading: 'Deleting Category...',
            success: 'Category Deleted !',
            error: 'Something went wrong'
        })

        fetchCategories();
    }
    console.log('categories', categories)

    useEffect(() => {
        getUserData();
        fetchCategories();
    }, [])


    if (userData.Admin === false) {

        return redirect('/')
    }
    return (
        <section className="mt-10">

            <UserTabs />

            <form className="mt-8" onSubmit={handleNewCategory}>
                <div className="flex gap-2 max-w-md mx-auto  items-center">
                    <div className="grow">
                        <label>
                            {editCategory ? <>
                                Edit : <b>{editCategory.name}</b>
                            </>
                                :
                                'Add New Category'}
                        </label>
                        <input
                            type="text"
                            onChange={e => {

                                setCategoryName(e.target.value)
                            }
                            }
                            value={categoryName} placeholder="category name" />
                    </div>
                    <div className="flex gap-2">

                        <button type="submit" className="cursor-pointer">
                            {editCategory ? <>
                                Update
                            </>
                                :
                                'Create'}
                        </button>
                        {
                            editCategory &&
                            <button type="button"
                                onClick={() => {
                                    setEditCategory('')
                                    setCategoryName('')
                                }}
                                className="border border-gray-500 mt-3 py-1 px-4 rounded-full "
                            >
                                Cancel
                            </button>
                        }
                    </div>
                </div>


            </form>
            <div className="max-w-2xl mx-auto mt-4">
                <h2 className="text-gray-500 text-sm ">
                    Edit categories
                </h2>
                {categories.map((cat, index) => (
                    <>
                        <div key={index} className="categories flex justify-between  text-start px-4 py-2 rounded-full border border-gray-400 mb-3 "


                        >
                            <div className="flex items-center">
                                <h4>{cat.name}</h4>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    className=" w-full cursor-pointer flex-start text-start"
                                    onClick={() => {

                                        setEditCategory(cat)
                                        setCategoryName(cat.name)
                                    }}
                                >
                                    <EditIcon />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowDeleteModal(true),
                                            setSelectedCategory({
                                                'id': cat._id,
                                                'name': cat.name
                                            })
                                    }
                                        // console.log('delete', cat._id, cat.name)
                                    }
                                >

                                    <TrashIcon

                                        className="w-5 h-5 text-red-600 cursor-pointer" />


                                </button>


                            </div>


                        </div>

                    </>

                ))}

                {
                    showDeleteModal &&
                    (
                        <DeleteModal
                            label={`${selectedCategory.name} category`}
                            closeModal={setShowDeleteModal}
                            onDelete={() => {
                                handleDeleteCategory(selectedCategory.id)
                                setShowDeleteModal(false)
                            }}
                        />
                    )
                }

            </div>
        </section>
    )
}