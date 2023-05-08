
import React,{useState} from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './ProductSlider.css';
import imgGirl from '../Assets/Icon.png';
import { Link } from 'react-router-dom';



function CustomNextArrow(props) {
    const { className,  onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick}
      />
    );
  }
  
  function CustomPrevArrow(props) {
    const { className,  onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick}
      />
    );
  }

const ProductSlider = ({ data }) => {
    const [defaultImage, setDefaultImage] = useState({});
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleErrorImage = (data) => {
    setDefaultImage((prev) => ({
      ...prev,
      [data.target.alt]: data.target.alt,
      linkDefault: imgGirl,
    }));
  };

 

  return (
    <div className="ProductSlider">
      <Slider {...settings}>
        {data.map((item) => (
          <Link to="" className="card">
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
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default ProductSlider