'use client'

import { redirect, useParams } from "next/navigation";
import SectionHeaders from "../../../component/layout/SectionHeaders";
import AdressBox from "../../../component/AdressBox";
import { useState, useEffect } from "react";

import { useContext } from "react";
import { CartContext } from "../../../component/AppContext";
import OrderItemBox from "../../../component/OrderItemBox";
import { useSession } from "next-auth/react";

export default function OrdersPage() {

    const [city, setCity] = useState('');
    const [postCode, setPostCode] = useState('');
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [phone, setPhone] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [currentOrder, setCurrentOrder] = useState(null);

        
     const session = useSession();
     const userData = session.data?.user;
        const status = session?.status;   
        
        
     if (status === "unauthenticated") {
    redirect("/pages/login")
  }
    const addressBoxData = {
        phone,
        street,
        country,
        city,
        postCode,
        currentOrder
    }

    const adressBoxFunctions = {
        setPhone,
        setStreet,
        setCountry,
        setCity,
        setPostCode
    }



    const url = useParams();
    const id = url.id;

    console.log('id', id)

    const getUserData = async () => {
        const userData = await fetch('/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json().then((data) => {
                setPhone(data.phone)
                setStreet(data.street)
                setCountry(data.country)
                setCity(data.city)
                setPostCode(data.postCode)


            })

        }).catch((err) => {
            return new Error(err);
        })

    }


    const getOrder = async () => {
        const userData = await fetch('/api/orders' + `?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        }).then((res) => {
            if(res.ok){
                  return res.json().then((data) => {
                setTotalPrice(data.amountToPay)
                console.log('data order', (data.filter(item => item._id === id)))
                setCurrentOrder(data.filter(item => item._id === id))
            })
            }
            else{
                redirect('/pages/login')
            }
          

        }).catch((err) => {
            return new Error(err);
        })

    }
    useEffect(() => {
        getOrder();
        getUserData();
    }, []);
    console.log('currentOrder in page', currentOrder?.amountToPay)
    if(status === 'loading'){
        return(
            <div>
                <h3 className="text-center text-xl font-semibold text-gray-700 mt-10">Loading order....</h3>
            </div>
        )
    } if(!userData){
        return(
            <div>
                <h3 className="text-center text-xl font-semibold text-gray-700 mt-10">Login to see your order</h3>
            </div>
        )
    }

    return (
        <section className="mt-10 overflow-x">
            <div className="text-center max-w-3xl mx-auto ">
                <SectionHeaders  mainHeader={'Your Order'} />

                <div className="flex flex-col items-center justify-center  gap-4 
                md:flex md:flex-row md:w-full md:gap-2 md:items-start md:justify-between
                ">
 
                    <OrderItemBox
                        currentOrder={currentOrder?.[0]?.cartItems || []}
                    />
                    <AdressBox
                        data={addressBoxData}
                        currentOrder={currentOrder?.[0]?.cartItems || []}
                        functions={adressBoxFunctions}
                    />
                </div>
            </div>
        </section>
    )
}