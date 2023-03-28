import './FileClaimsPage.css';
import ClaimButton from '../components/ClaimButton';
import Navbar from '../components/Navbar';
import curve from '../images/claim-curve-real-fr.png';
import ClaimsList from '../features/claims/ClaimsList';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "grey" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }


const FileClaimsPage = () => {

    const apiRoot = 'http://localhost:3500';
    const [images, setImages] = useState([]); // images is an array of objects by default is set empty.

    const getImages = async () => {
        const imageResult = await axios.get(`${apiRoot}/files/listimages`)
        setImages(imageResult.data)
        //console.log('images array after getImages() is called: ', images)
    }
    useEffect(() => {
        getImages()
    }, []);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        centerMode: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1
            }
        }
        ]
    };

    return (
        <div className="file-claims-page">
            <span className="file-claims-page-title">File Cases</span>
            <span className="file-claims-page-subtitle">Select a case</span>
            <Slider {...settings}>
            {images.map((image) => (
                <div className="card">
                    <div className="card-top">
                        <img src={image.url} alt={image.name} />    
                    </div>
                    <div className="card-bottom">
                        <p> Case ID: {Math.floor(Math.random() * 10000) + 1}</p>
                        <p> Customer: </p>
                        <p> Updated:  </p>
                        <Link to ="/dash/GalleryPage">
                            <button className="Screenshots">Claim Screenshots</button>
                        </Link>
                        <Link to="/dash/DocumentPage">
                            <button className="Document">Claim Document</button>
                        </Link>
                        <button className="Download">Download</button>
                    </div>
                </div>    
            ))}
            </Slider>
        </div>
    )
}
export default FileClaimsPage;