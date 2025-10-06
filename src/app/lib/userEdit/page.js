'use client'
 import ImageUpload from "../../lib/imageUploads";


export default function UserEditPage({userInfo, userInfoFunctions, onSave}) {
   
        console.log('initial admin', userInfo.initialAdmin);

    console.log('user Info Admin', userInfo.admin);
    return (
        <form className=" md:flex gap-2 max-w-2xl mx-auto mt-4" onSubmit={onSave}>

                <div className="flex flex-col  gap-2">

                   <ImageUpload link={userInfo.savedImage} setLink={userInfoFunctions.setSavedImage} />
                    
                </div>

                <div className="flex flex-col grow" >
                    <label className="text-sm font-semibold">First and Last name</label>
                     <input
                        value={userInfo.userName}
                        onChange={(e) => userInfoFunctions.setUserName(e.target.value)}
                        type="text" placeholder="Enter your First and Last name" />
                    <label className="text-sm font-semibold">Email</label>   
                    <input
                        disabled={true}
                        value={userInfo.userEmail}
                        type="email" placeholder="Email"
                    />
                    <label className="text-sm font-semibold">Phone</label>
                    <input value={userInfo.phone} onChange={(e) => userInfoFunctions.setPhone(e.target.value)} type="tel" placeholder="Phone" />
                    <label className="text-sm font-semibold">Street</label>
                    <input value={userInfo.street} onChange={(e) => userInfoFunctions.setStreet(e.target.value)} type="text" placeholder="Street" />
                    <label className="text-sm font-semibold">Country</label>    
                    <input value={userInfo.country} onChange={(e) => userInfoFunctions.setCountry(e.target.value)} type="text" placeholder="Country" />
                    <div className="flex gap-2">
                        <div>
                            <label className="text-sm font-semibold">City</label>
                            <input value={userInfo.city} onChange={(e) => userInfoFunctions.setCity(e.target.value)} type="text" placeholder="City" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold">Post Code</label>
                            <input value={userInfo.postCode} onChange={(e) => userInfoFunctions.setPostCode(e.target.value)} type="text" placeholder="Post Code" />
                        </div>
                    </div>
                    {
                        userInfo.initialAdmin && 
                        (
                            <div className="flex items-center ml-3">
                    <input type = "checkbox" id="admin" checked={userInfo.admin} 
                     className="mr-2"
                     onChange = {(e) => {
                        userInfoFunctions.setAdmin(e.target.checked)
                        console.log('Admin status changed:', e.target.checked);
                     }
                    }
                    
                    /> 
                     <label  htmlFor="admin"className="text-sm font-semibold">Admin</label>    
   
                    </div>
                        )  
                         
                    }
                   
                    <button className="" type="submit">Save </button>
                </div>

            </form>
    )
}