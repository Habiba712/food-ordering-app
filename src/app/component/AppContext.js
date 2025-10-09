'use client';

import { SessionProvider } from "next-auth/react";
import { createContext, } from "react";
import { useEffect, useState} from "react";

export const CartContext = createContext({});
export function AppProvider({ children }) {
  

  const [cartItems, setCartItems] = useState([]); // safe default

  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

function  addToCart (product, size, extras, userEmail)  {



  const item = {
    itemName: product?.itemName,
    itemImage: product?.itemImage,
    itemProperties: product?.itemProperties,
    itemBasePrice: product?.itemBasePrice,
    extras: extras,
    size: size,
    quantity: product?.quantity,
    userEmail: userEmail,
    id: product?._id
  }
let existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');

  // need to check if the same extras are in both product so we dont add the same one
const existingExtras = (extrasA=[], extrasB=[]) => {
    console.log('extrasA', extrasA?.length);
    console.log('extrasB', extrasB?.length);
     if (extrasA?.length !== extrasB?.length) return false;
    if(extrasA?.length === 0 && extrasB?.length === 0 ) return true;

    // if(extrasA?.length === 0 && extrasB?.length === 0) return true;
    if(extrasA?.length === null && extrasB?.length === null) return true;
    // if(extrasA?.length === undefined && extrasB?.length === undefined) return true;
    
      const namesA = extrasA?.map(e => e?.name).sort()
      const namesB = extrasB?.map(x => x?.name).sort()
      console.log('namesA', namesA);
      console.log('namesB', namesB);


      return namesA?.every((name, n) => name===namesB[n])
      
  }
  




  const existingIndex = cartItems.findIndex((i) => {

    let itemId;
    let itemSize;
    let itemExtras;
    if(i?.id === item?.id && !i?.size && !i?.extras){
      itemId = item?.id;
      console.log('topttt')
      return true;
    }
    else{
      itemId = i?.id === item?.id;
      itemSize = i?.size?.name === item?.size?.name;
      itemExtras = i?.extras === item?.extras;
      console.log('bottom')

      return (itemId && itemSize && existingExtras(i?.extras, item?.extras))
    }
  } 
   
  )
  

console.log('existingIndex', existingIndex);

  if( existingIndex !== -1){

    cartItems[existingIndex].quantity += 1;
    console.log('cartItems[existingIndex].quantity', cartItems[existingIndex].quantity);

    existingCart[existingIndex].quantity += 1;
    console.log('existingCart[existingIndex].quantity', existingCart[existingIndex].quantity);

    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    setCartItems([...cartItems]);
  }
  else
    {
      existingCart.push(item);
      localStorage.setItem('cartItems', JSON.stringify(existingCart));
      setCartItems([...cartItems, item]);
  }



  
  

 
 return existingCart;

}
const updateQuantity = (item, quantity) => {

const clickedItem = item
const clickedItemExtras = item?.extras;
  const clickedItemSize = item?.size?.name;

  const isSameExtra = (extrasA=[], extrasB=[]) => {
    if(extrasA?.length !== extrasB?.length) return false;
    if(extrasA?.length === 0 && extrasB?.length === 0) return true;
    
      const namesA = extrasA?.map(e => e?.name).sort()
      const namesB = extrasB?.map(x => x?.name).sort()
      if(namesA?.every((name, n) => namesB[n]===name))
      return true
      
  }



  setCartItems(cartItems.map((i, index) => {
    // isSameExtra(i?.extras, clickedItemExtras);
    if(!i?.size && !i?.extras && i.id === item.id){

      return { ...i, quantity: quantity };
    }
    if (
       i?.size?.name === clickedItemSize
    && isSameExtra(i?.extras, clickedItemExtras)
    ) {
      
      return { ...i, quantity: quantity };
    }
    return i;
  }));


  localStorage.setItem('cartItems', JSON.stringify(cartItems.map((i, index) => {
     if(!i?.size && !i?.extras && i.id === item.id){

      return { ...i, quantity: quantity };
    }
    if (
       i?.size?.name === clickedItemSize
    && isSameExtra(i?.extras, clickedItemExtras)
    ) {
      
      return { ...i, quantity: quantity };
    }
    return i;
  })));
 
};

const  clearCart = async () =>{
  setCartItems([]);
  localStorage.removeItem('cartItems')
}

const removeItem = async (itemId, item) => {
  console.log('itemId', itemId);
  //! Hmmm what if we go the same item (same ID) just with diffrent extras or size?
  const clickedItem= item;
  const clickedItemSize = cartItems?.find(i => i.id === itemId && i?.size?.name === clickedItem?.size?.name)?.size?.name;
  const clickedItemExtras = clickedItem?.extras;

  const isSameExtra = (extrasA=[], extrasB=[]) => {
    // console.log('extrasA', extrasA?.length);
    // console.log('extrasB', extrasB?.length);
    if(extrasA?.length !== extrasB?.length)return false;
    // if(extrasA?.length === 0 && extrasB?.length === 0) return true;
    // if(extrasA?.length === null && extrasB?.length === null) return true;
    // if(extrasA?.length === undefined && extrasB?.length === undefined) return true;
    
      const namesA = extrasA?.map(e => e?.name).sort()
      const namesB = extrasB?.map(x => x?.name).sort()

      return namesA.every((name, n) => namesB[n]===name)
      
  }
  // const poweir= () =>{
  //   if(clickedItemExtras === null || clickedItemExtras?.length === 0) return true;
  //   for(let i = 0; i < cartItems.length; i++){
  //     if(cartItems[i].id === itemId){
  //       for(let j = 0; j < cartItems[i].extras.length; j++){
  //         for(let k = 0; k < clickedItemExtras.length; k++){
  //           if(cartItems[i].extras[j].name === clickedItemExtras[k].name){
  //             console.log('cartItems[i].extras[j].name', cartItems[i].extras[j].name);
  //             console.log('clickedItemExtras[k].name', clickedItemExtras[k].name);
  //             return true;
  //           }
  //         }
  //       }
  //     }
  //   }

  // }
  
 
// console.log('clickedItemSize', clickedItemSize);
// console.log('clickedItemExtras', clickedItemExtras);

  setCartItems(cartItems.filter(item =>{
   
    const theId = item?.id === itemId;
let isSameSize;
let isSameExtras;
    if(item?.size){
       isSameSize = item?.size?.name === clickedItemSize;
    }
    else{
       isSameSize = true;
    }

    if(item?.extras){
      isSameExtras = isSameExtra(item?.extras, clickedItemExtras);
    }
    else{
      isSameExtras = true;
    }
    
    
   
    console.log('theId', theId);
    console.log('isSameSize', isSameSize);

    return !(theId && isSameSize && isSameExtras) // if the item is the same as the clicked item, we remove it from the cart
    
  }
    
  

));

  localStorage.setItem('cartItems', JSON.stringify(cartItems.filter(item =>  
 {
   const theId = item?.id === itemId;
let isSameSize;
let isSameExtras;
    if(item?.size){
       isSameSize = item?.size?.name === clickedItemSize;
    }
    else{
       isSameSize = true;
    }

    if(item?.extras){
      isSameExtras = isSameExtra(item?.extras, clickedItemExtras);
    }
    else{
      isSameExtras = true;
    }
    
    
   
    console.log('theId', theId);
    console.log('isSameSize', isSameSize);

    return !(theId && isSameSize && isSameExtras) // if the item is the same as the clicked item, we remove it from the cart
    
  }
    
  

)

  ));
}
 useEffect(()=>{
    if(!localStorage.getItem('cartItems')){
      localStorage.setItem('cartItems', JSON.stringify([]));
 }
  },[cartItems]);
  return (
    <SessionProvider>
      <CartContext.Provider value={{
        cartItems,
        setCartItems,
        clearCart,
        addToCart,
        removeItem,
        updateQuantity
      }}>
         {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
