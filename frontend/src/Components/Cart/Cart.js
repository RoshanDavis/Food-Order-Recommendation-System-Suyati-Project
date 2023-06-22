


import React, {createContext, useEffect, useReducer, useState} from 'react'
import "./Cart.css";
import fetchProducts   from './Products';

import ContextCart from './ContextCart';
import {reducer} from "./Reducer";
import axios from 'axios';
export const CartContext = createContext();


let products = []; // Define an initial empty array
let initialState={
    item: products,
    totalAmount:0,
    totalItem:0,
}

fetchProducts()
  .then(fetchedProducts => {
    // Assign the fetched products to the 'products' variable
    products = fetchedProducts;
     initialState={
        item: products,
        totalAmount:0,
        totalItem:0,
    }
    // Use the fetched products here
    // console.log(products);
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error(error);
  });



const Cart = () => {

    console.log(products)
    
    const fetchItems=async()=>{
        try{
            const response=await axios.get("http://127.0.0.1:8000/cart/");
            if (response && response.data) {
            
            }
            
        }
        catch (error) {
            console.log(error);
        
      }
    
    }
    useEffect(()=>{
        fetchItems()
        },[]);
        
    // const initialState={
    //     item: products,
    //     totalAmount:0,
    //     totalItem:0,
    // }
// const [item,setItem]=useState(Products);
const [state, dispatch] = useReducer(reducer, initialState);
//to delete the indivisual elements from an item cart
const removeItem=(id)=>{
    return dispatch({
        type:"REMOVE_ITEM",
        payload: id,
    })
};
// clear the cart
const clearCart=()=>{
    return dispatch({
        type:"CLEAR_CART"
    });
};
// increment the item
const increment=(id)=>{
    return dispatch({
        type: "INCREMENT",
        payload: id,
    });
};
// decrement the item
const decrement=(id)=>{
    return dispatch({
        type: "DECREMENT",
        payload: id,
    });
};

// useEffect to update the data
useEffect(() => {
 dispatch({type:"GET_TOTAL"});
   
}, [state.item]);

  return (
    <>
    <CartContext.Provider value ={{...state, removeItem,clearCart, increment, decrement}}>
    <ContextCart />
    </CartContext.Provider>
    

   
    </>
  )
}

export default Cart