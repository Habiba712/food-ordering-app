import Image from "next/image"
import { useState, useEffect } from "react"

export default function AddToCartModal({ item, closeModal, handleAddToCart }) {

    const [open, setOpen] = useState(true)
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedExtras, setSelectedExtras] = useState([])
    const [addToCartPrice, setAddToCartPrice] = useState(0)

    console.log('item', item)
    console.log('selectedSize', selectedSize)
    console.log('selectedExtras', selectedExtras)

    const handleTotalPrice = () => {
        let totalPrice = 0;
        if (selectedSize) {
            totalPrice += Number(selectedSize.price);
        }
        if (selectedExtras.length > 0) {
            totalPrice += selectedExtras.map(i => i.price).reduce((a, b) => a + b, 0);
        }

        setAddToCartPrice(totalPrice)
    }
    useEffect(() => {
        handleTotalPrice()
        setOpen(true)
    }, [selectedExtras, selectedSize])
    return (
        open && (
            <div
                className="h-full w-full fixed top-0 left-0 flex justify-center items-center"
                style={{
                    "background": "linear-gradient(135deg,rgba (255,255,255,0.1),rgba(255,255,255,0))",
                    "WebkitBackdropFilter": "blur(20px)",
                    "backdropFilter": "blur(20px)",
                    "boxShadow": "0 8px 20px 0 rgba(0, 0, 0, 0.37)",
                    "border": "1px solid rgba(255,255,255,0.18)",
                    "borderRadius": "20px",
                }}
            // onClick={() => {
            //     setOpen(false)
            //     closeModal(false)
            // }}
            >
                <div className="w-90 md:w-100 flex flex-col overflow-y-scroll max-h-[80vh] p-4 
             scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
                    style={{
                        "background": "white",

                        "boxShadow": "0 8px 20px 0 rgba(0,0,0,0.37)",
                        "border": "1px solid rgba(255,255,255,0.18)",
                        "borderRadius": "20px",
                    }}
                >
                    <div className="w-[200px] h-[200px] relative mt-4 mx-auto flex-shrink-0">
                        <Image
                            src={item.itemImage}
                            alt="userImage"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                    <h4 className="text-xl font-semibold text-center mb-2">{item.itemName}</h4>
                    <p className="text-gray-700 text-sm mb-3 text-center mx-auto px-4">{item.itemProperties}</p>

                    <div className="flex flex-col gap-3 mb-3 mx-auto">
                        <h3>Pick Your Size</h3>
                        {
                            item.additionalProps.sizes.length > 0 && (
                                <div>
                                    {
                                        item.additionalProps.sizes.map((size, index) => (
                                            <div>
                                                <input
                                                    type="radio"
                                                    id={size.name}
                                                    name="size"
                                                    value={size.name}
                                                    checked={selectedSize?.name === size.name}
                                                    onChange={(e) => setSelectedSize({
                                                        "name": size.name,

                                                        "price": Number(size?.price) + Number(item?.itemBasePrice)
                                                    })
                                                    }

                                                />
                                                <label htmlFor={size.name} >{size.name} $ {Number(size?.price) + Number(item?.itemBasePrice)}</label>


                                            </div>
                                        ))
                                    }
                                </div>

                            )
                        }

                        <h3>Want any extras ? </h3>
                        {
                            item.additionalProps.ingredients.length > 0 && (
                                <div>
                                    {
                                        item.additionalProps.ingredients.map((ingredient, index) => (
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    id={ingredient.name}
                                                    name="size"

                                                    checked={selectedExtras.some(extra =>
                                                        extra.name === ingredient.name
                                                    )}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedExtras(prev =>
                                                                [...prev, {
                                                                    "name": ingredient.name,
                                                                    "price": Number(ingredient?.price)
                                                                }]
                                                            )
                                                        } else {
                                                            setSelectedExtras(prev =>
                                                                prev.filter((extra, index) => extra.name !== ingredient.name)
                                                            )
                                                        }


                                                    }
                                                    }
                                                />
                                                <label htmlFor={ingredient.name} >{ingredient.name} + ${Number(ingredient?.price)}</label>


                                            </div>
                                        ))
                                    }
                                </div>

                            )
                        }
                    </div>



                    <button className="text-white 
                                        min-w-[200px] font-semibold bg-red-600 rounded-full px-6 py-3 mb-3 block mx-auto text-center flex justify-around"
                        type="button"
                        onClick={() => {
                            handleAddToCart(
                                item,
                                selectedSize,
                                selectedExtras
                            )
                            setOpen(false)
                            closeModal(false)
                        }

                        }

                    > Add to cart
                        {addToCartPrice}
                        £</button>

                    <button
                        type="button"
                        className="text-red-600 font-semibold border border-red-600 rounded-full px-6 py-3 mb-3  block mx-auto text-center flex justify-around min-w-[200px]"
                        onClick={() => {
                            setOpen(false)
                            closeModal(false)
                        }}
                    >Cancel</button>
                </div>

            </div>
        )

    )

}