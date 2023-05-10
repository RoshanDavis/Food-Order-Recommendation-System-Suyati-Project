import React,{useState,useEffect,useRef} from 'react'
import Navbar2 from './Navbar2'
import Footer from './Footer'
import './Restaurant.css'
import selected from './ItemTestData.json'
import FoodItem from './FoodItem'
import ProductSlider from './ProductSlider'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Restaurant = () => {
    
    const [scrollPosition, setScrollPosition] = useState(0);
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    setShowButton(scrollPosition > 0);
  }, [scrollPosition]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

    const menuRef = useRef(null);
    const handleScroll = (ref) => {
        window.scrollTo({
          top: ref.current.offsetTop,
          behavior: "smooth"
        });
      }

      
    const [menu, setmenu] = useState([]);
    const fetchItems=async()=>{
        try{
            const response=await axios.get("http://127.0.0.1:8000/api/food/");
            if (response && response.data) { // Check if response and response.data exist
              setmenu(response.data);
                
            }
            
        }
        catch (error) {
            console.log(error);
          }
      }
    
      useEffect(()=>{
        fetchItems()
        },[]);

  return (
    <div>
        <nav>
            <Navbar2/>
        </nav>
        <body>
            
            <div className='restaurant'>
                <h1 className='restaurant-name ps-3'>Burger Corner</h1>
                <div className="row">
                    <div className='col ps-4'>
                        <img className='restaurant-img img-fluid rounded ps-1' src='https://static2.therichestimages.com/wordpress/wp-content/uploads/2014/02/21_1_Toul.jpg' alt=''></img>
                        <div className="restaurant-details d-flex flex-column justify-content-center ps-2 pt-3">
                            
                            <h2 className='restaurant-details'>Louis Lane, Pandit Karuppan Road, Perumanoor Thevera, Kochi</h2>
                            <h3 className='restaurant-contact'>Call : +919633276393</h3>
                        </div>
                    </div>
                    
                    
                    <div className='selected-item d-flex flex-column gap-5 pt-3  align-items-center col'>
                        <FoodItem data={selected}/>
                        <div className='d-flex flex-column gap-3'>

                            <Link to='' class="btn custom-button btn-lg ">Proceed to Checkout</Link>
                            <div className='d-flex flex-row justify-content-around gap-5'>
                                <div to='' class="btn  restaurant-btn" onClick={() => handleScroll(menuRef)}>Menu</div>
                                <Link to='' class="btn  restaurant-btn">Review</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="menu" ref={menuRef}>
                <div className="container pb-5">
                <h2 className='pt-5'>Menu</h2>
                <div className="container p-0 m-0">
                    <ProductSlider data={menu}/>
                </div>
                </div>
            </div>
            <div className='d-flex justify-content-center p-5'>
                <Link to='' class="btn custom-button btn-lg center-button" >Proceed to Checkout</Link>
            </div>
            {showButton && (
                <button className="scroll-to-top btn custom-button btn-lg center-button" onClick={scrollToTop}>
                    Scroll to top
                </button>
                )}

        </body>
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}

export default Restaurant