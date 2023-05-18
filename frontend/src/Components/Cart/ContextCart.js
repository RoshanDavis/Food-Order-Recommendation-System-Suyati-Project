import React, {useContext} from 'react';
import {Scrollbars} from 'react-custom-scrollbars-2';
import Items from './Items';
import { CartContext } from './Cart';

const ContextCart = () => {

    const {item , clearCart,totalAmount}= useContext(CartContext);
    if(item.length === 0){
        return(
            <>
            
            <div className="Cart-Container">

            
     <header>
            
        <div className='continue-shopping'>
            <img src={require('../../Assets/arrow.png')} alt="arrow" className='arrow-icon' />
            <h3>Continue Shopping</h3>
            <div className='cart-icon'>
                <img src={require('../../Assets/cart.png')} alt="cart" />
                <p>0</p>
            </div>
            
            
        </div>
    </header>
    <section className='main-cart-section'>
        <h1> Your Ordered Food </h1>
        <p className='total items'>you have <span className='total-items-count'></span> items in your cart</p>
        </section>
        </div>
        
            </>

        )
    }
  return (
    <>
    
    <div className="Cart-Container ">
     <header>
            
        <div className='continue-shopping'>
            <img src={require('../../Assets/arrow.png')} alt="arrow" className='arrow-icon' />
            <h3>Continue Shopping</h3>
            <div className='cart-icon'>
                <img src={require('../../Assets/cart.png')} alt="cart" />
                
                <p>2</p>
            </div>
            
        </div>
    </header>
    <section className='main-cart-section'>
        <h1>Shopping cart</h1>
        <p className='total items'>you have <span className='total-items-count'>7</span> items in your cart</p>

        <div className='cart-items w-90'>
            <div className='cart-items-container'>
                <Scrollbars>
                    {
                        item.map((curItem)=>{
                            return <Items key={ curItem.id}{...curItem} />

                        })

                    }
                        

                </Scrollbars>  
            </div>
        </div>
        <div className='card-total pb-5'>
            <h3>cart Total: <span>Rs {totalAmount}</span></h3>
            <button>Checkout</button>
            <button className='clear-cart' onClick={clearCart}>Clear Cart</button>
        </div>
    </section>
    </div>
    
    </>
  )
}

export default ContextCart