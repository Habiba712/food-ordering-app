

export default function AdressBox({data, functions})  {
    console.log('data', data)

    return( 
         <div className="w-100 flex flex-col bg-gray-100 p-4 h-fit ml-4 rounded-lg">
                        <div>
                            <form className="flex gap-2 max-w-2xl mx-auto mt-4"
                                
                            >

                                <div className="flex flex-col grow" >


                                    <label className="text-sm font-semibold">Phone</label>
                                    <input disabled type="tel" placeholder="Phone" value={data.phone} onChange={(e) => functions.setPhone(e.target.value)} />
                                    <label className="text-sm font-semibold">Street</label>
                                    <input disabled type="text" placeholder="Street" value={data.street} onChange={(e) => functions.setStreet(e.target.value)} />
                                    <label className="text-sm font-semibold">Country</label>
                                    <input disabled type="text" placeholder="Country" value={data.country} onChange={(e) => functions.setCountry(e.target.value)} />
                                    <div className="flex gap-2">
                                        <div>
                                            <label className="text-sm font-semibold">City</label>
                                            <input disabled type="text" placeholder="City" value={data.city} onChange={(e) => functions.setCity(e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold">Post Code</label>
                                            <input disabled type="text" placeholder="Post Code" value={data.postCode} onChange={(e) => functions.setPostCode(e.target.value)} />
                                        </div>
                                    </div>


                                    <button  className="bg-gray-600 cursor-not-allowed text-white font-semibold rounded-full px-6 py-3 mb-3 w-full block mx-auto text-center flex justify-around ">
                                        TOTAL {data.currentOrder?.[0]?.amountToPay} $
                                    </button>
                                </div>

                            </form>
                        </div>

                    </div>
    )
}