import React,{useState,useEffect} from 'react'
import imgGirl from '../Assets/Icon.png';
import axios from 'axios';
import fetchProducts   from './Cart/products';
let products = []; // Define an initial empty array


fetchProducts()
  .then(fetchedProducts => {
    // Assign the fetched products to the 'products' variable
    products = fetchedProducts;

    // Use the fetched products here
    // console.log(products);
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error(error);
  });


const FoodItem = ({data,showItemCountProp,showCancelButtonProp}) => {

    // console.log(data[0].restaurant_id)
    const handleClickCancel = () => {
        console.log(data[0].food+" canceled")
        /*     Api need to be created for canceling item in cart*/
        // // Send a POST request to the backend API using Axios
        // axios
        //   .post("/your-backend-endpoint", JSON.stringify(data))
        //   .then((response) => {
        //     // Handle the response from the backend
        //     console.log("Message sent to backend successfully");
        //   })
        //   .catch((error) => {
        //     console.error("Failed to send message to backend", error);
        //   });
      };

    const [defaultImage, setDefaultImage] = useState({});

    const [count, setCount] = useState(0);

    const getCartCount=async()=>{
       
            if (products) {

              
                // Find the item in the response data with a matching food ID
                const matchingItem = products.find(item => item.food_id === data[0].food_id);
              
                if (matchingItem) {
                  setCount(matchingItem.quantity); // Set count to the quantity if a match is found
                }
              }
            
        }
       
    
    
    useEffect(()=>{
        getCartCount()
        },[]);
    const handleIncrement = () => {
        setCount(count + 1);
        if(count===0)
        {
            axios.post('http://127.0.0.1:8000/cart/', {
                "restaurant_id": data[0].restaurant_id,
                "food_id": data[0].food_id,
                "price":data[0].price ,
                "name": data[0].food,
                "quantity": count+1

            })
            .then(response => {
            console.log(response);
            })
            .catch(error => {
            // Handle any errors that occur during the request
            });
        }
        else{
            console.log(
            {
                "food_id": data[0].food_id,
                "quantity": count+1

            });
            axios.put('http://127.0.0.1:8000/cart/', {
                "food_id": data[0].food_id,
                "quantity": count+1

            })
            .then(response => {
            console.log(response);
            })
            .catch(error => {
            // Handle any errors that occur during the request
            });
        }
        
       
    };
    
    const handleDecrement = () => {
        
        
        if(count>0)
        {
        setCount(count - 1);

        if(count===1){
            
            axios.post('http://127.0.0.1:8000/cart/delete/', {

                "food_id": data[0].food_id

            })
            .then(response => {
            console.log(response);
            })
            .catch(error => {
            // Handle any errors that occur during the request
            });
        }
        else{
            //API for changing
            axios.put('http://127.0.0.1:8000/cart/', {

                "food_id": data[0].food_id,
                "quantity": count-1

            })
            .then(response => {
            console.log(response);
            })
            .catch(error => {
            // Handle any errors that occur during the request
            });
            }
        
        }
    };
    
    const handleErrorImage = (data) => {
        setDefaultImage((prev) => ({
            ...prev,
            [data.target.alt]: data.target.alt,
            linkDefault: imgGirl,
        }));
        };
  return (
    <div className='d-flex flex-row justify-content-center'>
        <div style={{ width: '300px'}}>
            {data.map((item) => (
            <div className="card food-card">
                <div className="card-top food-card-top">
                 {item.linkImg?(    
                <img
                    src={
                    defaultImage[item.restaurant] === item.restaurant
                        ? defaultImage[item.restaurant] === defaultImage["'" + item.restaurant + "'"]? defaultImage.linkDefault: item.linkImg
                        : item.linkImg
                    }
                    alt={item.restaurant}
                    onError={handleErrorImage}
                />
                 ):(
                    <img src={imgGirl} alt={item.restaurant}/>
                 )
                }   
                </div>
                <div className="card-bottom food-card-bottom">
                <h1 className='card-bottom-restuarant-name'>{item.restaurant}</h1>
                
                <div className="rating ">
                    {item.rating &&
                    <div className="rating-bg-color  d-flex flex-row rounded ps-2 pe-2 ">
                    <h1 className={`${ item.rating && item.rating.toString().length === 1 ? 'rating--large' : 'rating--small'}`}>{item.rating}</h1> 
                    
                    <img className='pt-1 ps-1' src={require('../Assets/Star.png')} alt="" />
                    </div>
                    }
                </div>
            
                <h3>{item.food}</h3>
                <h2>Rs.{item.price}</h2>
                </div>
                
                { showItemCountProp &&
                    <div className="item-count d-flex flex-row justify-content-around pt-3 pb-3" style={{fontSize: '3rem'}}>

                        <div onClick={handleDecrement} class="btn  restaurant-btn add-sub-btn p-0" >-</div>
                        <div style={{fontSize: '2rem', color: 'grey'}}>{count}</div>
                        <div onClick={handleIncrement} class="btn  restaurant-btn add-sub-btn p-0">+</div>
                    </div>
                }
                { showCancelButtonProp &&
                    <div className="item-count d-flex flex-row justify-content-around pt-3 pb-3" style={{fontSize: '3rem'}}>
                            <button className='btn custom-button' onClick={handleClickCancel}>Cancel</button>
                    </div>
                }
            </div>
            
            ))}
                
        </div>
        
    </div>
  )
}

export default FoodItem