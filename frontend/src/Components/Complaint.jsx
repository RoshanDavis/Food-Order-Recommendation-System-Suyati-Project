import React,{useState,useEffect,useRef} from 'react'
import Navbar2 from './Navbar2'
import Footer from './Footer'
import ComplaintFormPopUp from './ComplaintFormPopUp'
import axios from 'axios'
import { ImMenu3 } from 'react-icons/im';
const Complaint = () => {
    

    const [hasComplaint, sethasComplaint] = useState(false)
    const [triggerPopUp,setTriggerPopUp]=useState(false)

    const addComplaint=()=>{
        setTriggerPopUp(true)
        //Add complaint
    }
    

    //Fetching data
    const [items, setitems] = useState([]);
    
    const fetchItems=async()=>{

        //Fetch previous order history
        try{
            const response=await axios.get("http://127.0.0.1:8000/api/food/");
            if (response && response.data.ProductSlider) { // Check if response and response.data exist
                setitems(response.data.ProductSlider);
                
            }
            
        }
        catch (error) {
            console.log(error);
          }
    }
    

    useEffect(()=>{
        fetchItems()
    },[]);

  
    //Filter items
    const [filtered, setfiltered] = useState([]);
    const [search, setsearch] = useState("");

    const searchRef=useRef();

    
    useEffect(() => {
        // setfiltered(items.filter((unit) => unit.restaurant.toLowerCase().includes(search.toLowerCase())));
        setfiltered(items.filter((unit) => unit.restaurant.toLowerCase().includes(search.toLowerCase()) || unit.food.toLowerCase().includes(search.toLowerCase())));

    },[search,items]);
    

    const toggleDropdown=()=>{
        setSearchDropDown(!SearchDropDown)
    }

    const [SearchResults, setSearchResults] = useState({})
    const [SearchDropDown, setSearchDropDown] = useState(false);

    const submitComplaint=()=>{
        //Post complaint to backend
    }
  return (
    <div>
        <nav>
            <Navbar2/>
        </nav>
        <body>
            {!hasComplaint &&
            <div className="complaints-container">
                <div className="container pb-5">
                    <h2 className='pt-5'>Complaints</h2>
                    <h4 className='d-flex flex-row justify-content-center' style={{color:"gray"}}>You have no complaints:)</h4>
                </div>
            </div>
            }
            {hasComplaint &&
            <div className="complaints-container">
                <div className="container pb-5">
                    <h2 className='pt-5'>Complaints</h2>
                    <div className="complaint-cards-container">

                    </div>
                </div>
            </div>
            }
            <div className="complaint-form-pop-up ">
                <ComplaintFormPopUp trigger={triggerPopUp} setTrigger={setTriggerPopUp}>
                    <div  >
                        <h1>Complaint Form</h1>
                        <label className='p-3'>Note: Complaints can only be registered for items that have been ordered before</label>
                        <div>
                            <h5 className=''>Select the item</h5>
                            <div className="search d-flex flex-column border ms-5" style={{ backgroundColor: "white" }}>
                                <div className="search-box d-flex gap-3 align-items-center">
                                    <input className='search-input' type="text"
                                        placeholder='Search for restaurants or dishes...'
                                        onChange={(e)=>setsearch(e.target.value)}
                                        ref={searchRef}
                                        
                                    />
                                    <ImMenu3 onClick={toggleDropdown} className='drop-down-menu-icon' size={37} />
                                </div>
                                {(search.length>0 || SearchDropDown) && 
                                    <div className="search-dropdown d-flex flex-column" >
                                        {filtered.length>0?
                                            filtered.map((result,index)=>{
                                            return(
                                                <div className="search-result-card ps-3" style={{ backgroundColor: "white" }} key={index} 
                                                onClick={(e)=>{
                                                    
                                                    (searchRef.current.value=result.restaurant + '-'+ result.food)
                                                    setsearch('');
                                                    setSearchResults([result]);
                                                    toggleDropdown()
                                                    }}>
                                                    <p className='ps-3'>{result.restaurant}-{result.food}</p>
                                                </div>    
                                            );
                                            }) : (
                                                <p className='ps-4'>Sorry we could not find what you are searching for...</p>
                                            )
                                        }   
                                        
                                    </div>}
                                
                            </div>
                        </div>
                        <div>
                            <h5 className='pt-4'>Please provide a desciption for the complaint</h5>
                            <textarea style={{ height: 'fit-content', width: '100%' }} name="" id="" cols="10" rows="10"></textarea>

                        </div>
                        <div className='btn custom-button d-flex justify-content-center ' onClick={submitComplaint}>
                            Submit
                        </div>
                    </div>
                </ComplaintFormPopUp>
            </div>
            <div className="d-flex flex-row justify-content-around pt-3 pb-3" style={{fontSize: '3rem'}}>
                <button className='btn custom-button' onClick={addComplaint}>Add Complaint</button>
            </div>
            
        </body>
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}

export default Complaint