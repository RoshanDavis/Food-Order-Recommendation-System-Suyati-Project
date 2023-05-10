import React,{useState} from 'react'
import imgGirl from '../Assets/Icon.png';

const FoodItem = ({data}) => {
    const [defaultImage, setDefaultImage] = useState({});
    const handleErrorImage = (data) => {
        setDefaultImage((prev) => ({
            ...prev,
            [data.target.alt]: data.target.alt,
            linkDefault: imgGirl,
        }));
        };
  return (
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
        </div>
        ))}
    </div>
  )
}

export default FoodItem