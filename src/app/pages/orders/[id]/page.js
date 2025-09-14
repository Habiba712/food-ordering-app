'use client'

import { useParams } from "next/navigation";
import SectionHeaders from "../../../component/layout/SectionHeaders";
import AdressBox from "../../../component/AdressBox";
import { useState, useEffect } from "react";

import { useContext } from "react";
import { CartContext } from "../../../component/AppContext";
import OrderItemBox from "../../../component/OrderItemBox";

export default function OrdersPage() {

    const [city, setCity] = useState('');
    const [postCode, setPostCode] = useState('');
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [phone, setPhone] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [currentOrder, setCurrentOrder] = useState(null);

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

    const getUserData = async () => {
        const userData = await fetch('http://localhost:3000/api/profile', {
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
        const userData = await fetch('http://localhost:3000/api/orders' + `?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        }).then((res) => {
            return res.json().then((data) => {
                setTotalPrice(data.amountToPay)
                // console.log('data order', typeof(data))
                setCurrentOrder(data)
            })

        }).catch((err) => {
            return new Error(err);
        })

    }
    useEffect(() => {
        getOrder();
        getUserData();
    }, []);
    console.log('currentOrder in page', currentOrder?.amountToPay)

    return (
        <section className="mt-10">
            <div className="text-center">
                <SectionHeaders mainHeader={'Your Order'} />

                <div className="mt-4 grid grid-cols-2 gap-4 mt-8" style={{ width: '100%' }}>
                    <div>

                        <OrderItemBox
                            currentOrder={currentOrder?.[0]?.cartItems || []}

                        />
                    </div>
                    <AdressBox
                        data={addressBoxData}
                        functions={adressBoxFunctions}
                    />



                </div>
            </div>
        </section>
    )
}