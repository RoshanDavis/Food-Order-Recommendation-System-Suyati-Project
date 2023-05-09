import React,{useState} from 'react'
import imgGirl from '../Assets/Icon.png';

const FoodItem = ({data,showItemCountProp}) => {

    const [defaultImage, setDefaultImage] = useState({});

    const [count, setCount] = useState(0);
  
    const handleIncrement = () => {
        setCount(count + 1);
    };
    
    const handleDecrement = () => {
        if(count>0)
        setCount(count - 1);
    };
    
    const handleErrorImage = (data) => {
        setDefaultImage((prev) => ({
            ...prev,
            [data.target.alt]: data.target.alt,
            linkDefault: imgGirl,
        }));
        };
  return (
    <div>
        <div style={{ width: '300px' }}>
            {data.map((item) => (
            <div className="card">
                <div className="card-top">
                <img
                    src={
                    defaultImage[item.restaurant] === item.restaurant
                        ? defaultImage[item.restaurant] === defaultImage["'" + item.restaurant + "'"]? defaultImage.linkDefault: item.linkImg
                        : item.linkImg
                    }
                    alt={item.restaurant}
                    onError={handleErrorImage}
                />
                    
                </div>
                <div className="card-bottom">
                <h1 className='card-bottom-restuarant-name'>{item.restaurant}</h1>
                <div className="rating ">
                    <div className="rating-bg-color  d-flex flex-row rounded ps-2 pe-2 ">
                    <h1 className={`${ item.rating && item.rating.toString().length === 1 ? 'rating--large' : 'rating--small'}`}>{item.rating}</h1> 
                    
                    <img className='pt-1 ps-1' src={require('../Assets/Star.png')} alt="" />
                    </div>
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
            </div>
            
            ))}
                
        </div>
        
    </div>
  )
}

export default FoodItem