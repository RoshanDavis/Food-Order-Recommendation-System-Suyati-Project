import React,{useState,useRef} from 'react'
import Navbar2 from './Navbar2'
import Footer from './Footer'
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from 'react-router-dom';
import './Review.css';
import reviewData from'./ReviewTestData'

let rating = 3;

const Review = () => {

    

    const [number, setNumber] = useState(0);
    const [hoverStar, setHoverStar] = useState(undefined);

    const reviewRef = useRef(null);
    const handleScroll = (ref) => {
        window.scrollTo({
          top: ref.current.offsetTop,
          behavior: "smooth"
        });
      }

     
    
  return (
    <div>
        <nav>
            <Navbar2/>
        </nav>

        <body>
            
            <div className='restaurant'>
                
                <div className="row">
                    <div className='col ps-4'>
                        <img className='restaurant-img'
                        src= "https://img2.10bestmedia.com/Images/Photos/226509/p-DSC-0595Final_54_990x660_201404240828.jpg"
                        alt=""
                        />
                        
                    </div>
                    <div className=" d-flex flex-column justify-content-center align-items-center ps-2 pt-3 col ">
                        <h1 className='restaurant-name ps-3'>Burger Corner</h1>
                        <h2 className='restaurant-details'>Louis Lane, Pandit Karuppan Road, Perumanoor Thevera, Kochi</h2>
                        <h2 className='restaurant-details'>Call : +919633276393</h2>
                        <div className='text-center card rate-card m-5'>
                            <h1>Rate us</h1>
                            <div className="star-rating">
                                {Array(5)
                                .fill()
                                .map((_, index) =>
                                    number >= index + 1 || hoverStar >= index + 1 ? (
                                    <AiFillStar
                                        onMouseOver={() => !number && setHoverStar(index + 1)}
                                        onMouseLeave={() => setHoverStar(undefined)}
                                        style={{ color: "orange", fontSize: "3.7rem" }}
                                        onClick={() => setNumber(index + 1)}
                                    />
                                    ) : (
                                    <AiOutlineStar
                                        onMouseOver={() => !number && setHoverStar(index + 1)}
                                        onMouseLeave={() => setHoverStar(undefined)}
                                        style={{ color: "orange", fontSize: "3.6rem" }}
                                        onClick={() => setNumber(index + 1)}
                                    />
                                    )
                                )}
                            </div>
                        </div>
                        <div className='d-flex flex-column gap-3 '>
                            <div to='' class="btn  restaurant-btn btn-lg center-btn" onClick={() => handleScroll(reviewRef)}>Leave a Review</div>
                            <Link to='' class="btn restaurant-btn btn-lg center-btn">Continue Browsing</Link>    
                        </div>
                        
                    </div>
                </div>
                <div className="container pb-5">
                    <h2 className='pt-5'>Reviews</h2>
                    <div className="Review" ref={reviewRef}>
                        <ReviewCard/>
                    </div> 
                </div>

                
                
                <div className="write-review ms-5 me-5 mb-5">
                    <div className='card review-card ps-5 pt-3 pb-2'>
                        
                        <div className="card-top d-flex flex-row gap-3 align-items-center">
                                <div>
                                    <div>Current User</div>
                                    <textarea name="write-review-area"  cols="150" rows="3"></textarea>
                                </div>
                                
                                <div className='w-25 d-flex flex-row justify-content-end pe-5'>  
                                {Array(5)
                                    .fill()
                                    .map((_, index) =>
                                        number >= index + 1 || hoverStar >= index + 1 ? (
                                        <AiFillStar
                                            onMouseOver={() => !number && setHoverStar(index + 1)}
                                            onMouseLeave={() => setHoverStar(undefined)}
                                            style={{ color: "orange", fontSize: "3.1rem" }}
                                            onClick={() => setNumber(index + 1)}
                                        />
                                        ) : (
                                        <AiOutlineStar
                                            onMouseOver={() => !number && setHoverStar(index + 1)}
                                            onMouseLeave={() => setHoverStar(undefined)}
                                            style={{ color: "orange", fontSize: "3rem" }}
                                            onClick={() => setNumber(index + 1)}
                                        />
                                        )
                                    )}
                                </div>
                            
                        </div>
                        
                    </div>   
                </div>
            </div>
        </body>

        <footer>
            <Footer/>
        </footer>
    </div>
  )
}

const ReviewCard= () => {
    return(
        
            
                <div className='card review-card ps-5 pt-3 pb-2'>
                    <div className="card-top d-flex flex-row gap-3">
                        <div>Name</div>
                        <div>
                            {
                            Array(5)
                            .fill()
                            .map((_, index) =>
                                rating >= index + 1 ? (
                                <AiFillStar
                                    style={{ color: "orange", fontSize: "1.51rem" }}
                                    
                                />
                                ) : (
                                <AiOutlineStar
                                    style={{ color: "orange", fontSize: "1.51rem" }}
                                    
                                />
                                )
                            )
                            }
                        </div>
                        
                        
                    </div>
                    <div className="card-bottom">Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae maiores voluptatum dicta 
                    quae libero autem aliquid voluptas id neque saepe facere magni aliquam, nostrum unde.
                    </div>
                </div>       
            
        
    )
}
export default Review