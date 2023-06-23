import React,{useState,useEffect} from 'react'
import Navbar2 from './Navbar2'
import Footer from './Footer'
import axios from 'axios'
import ProductSlider from './ProductSlider'
import Stepper from './Stepper'
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
const Order = () => {

  const handleClickCancel = () => {
        
        /*     Api need to be created for truncating cart*/
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

  const [orders, setorders] = useState([]);
  const [prevOrders, setprevOrders] = useState([]);
  const [showCancelButton, setShowCancelButton] = useState(true);
  const fetchItems=async()=>{
    try{
        const response=await axios.get("http://127.0.0.1:8000/cart/");
        if (response && response.data) { // Check if response and response.data exist
          setorders(response.data);
        }
        
    }
    catch (error) {
        console.log(error);
      }
    try{
      const response=await axios.get("http://127.0.0.1:8000/cart/");
      if (response && response.data) { // Check if response and response.data exist
        setprevOrders(response.data);
          
      }
        
    }
    catch (error) {
        console.log(error);
      }

    
  }

  useEffect(()=>{
    fetchItems()
    },[]);

    const handleStepChange = (nextStep) => {
        setShowCancelButton(nextStep<3); // Update showCancelButton state based on currentStep
        if(!showCancelButton){
          console.log(products)
          axios.post('http://127.0.0.1:8000/order/', products)
            .then(response => {
            console.log(response);
            })
            .catch(error => {
            // Handle any errors that occur during the request
            });
        }
      };
  return (
    <div>
        <nav>
            <Navbar2/>
        </nav>
        <body>
            {orders.length>0?(
            <div className="container pb-5">
              <h2 className='pt-5'>Orders on the way</h2>
                <div className="container">
                    <Stepper onStepChange={handleStepChange} />
                </div>
              <div className="container p-0 m-0">
                
                <ProductSlider data={orders} showCancelButtonProp={showCancelButton} />
              </div>
              {showCancelButton &&
              <div className="item-count d-flex flex-row justify-content-around pt-3 pb-3" style={{fontSize: '3rem'}}>
                            <button className='btn custom-button' onClick={handleClickCancel}>Cancel</button>
              </div>
              }
            </div>
            ):(
                <div className="container pb-5">
                    <h2 className='pt-5'>Orders on the way</h2>
                    <h4 className='d-flex flex-row justify-content-center' style={{color:"gray"}}>You have no current orders :)</h4>
                </div>
            )
            }
            {prevOrders.length>0?(
            <div className="container pb-5">
              <h2 className='pt-5'>Previous Orders</h2>
              <div className="container p-0 m-0">
                <ProductSlider data={prevOrders}/>
              </div>
              
            </div>
            ):
            (
                <div className="container pb-5">
                    <h2 className='pt-5'>Previous Orders</h2>
                    <h4 className='d-flex flex-row justify-content-center' style={{color:"gray"}}>You have no previous orders :)</h4>
                </div>
            )
        }
        </body>
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}

export default Order