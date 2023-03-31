import './FileClaimsPage.css';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoaderExampleInlineCentered from '../components/Loader';


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, background: "grey"}}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, background: "grey ", }}
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
    }
    useEffect(() => {
        getImages()
    }, []);

    const settings = {
        className: "center",
        centerMode: true,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 1,
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


    // right now, the slider is mapping over the images array to show the functionality of the carousel 
    // but the it is only images from one case and not multiple cases.

    // just adding some commment to see if this will help me push to github

    return (
        <div className="file-claims-page">
            <div className="file-claims-page-container">
                <span className="file-claims-page-title">FILE CLAIM</span>
                <span className="file-claims-page-subtitle">Select a case</span>
                  <div className="carousel-container">
                      <Slider {...settings}>
                      {images.map((image) => (
                          <div className="card">
                              <div className="card-top">
                                  <img src={image.url} alt={image.name} />    
                              </div>
                              <div className="card-bottom">
                                  <p> Case ID: {image.name.split('/', 1)}</p>
                                  <p> Customer: </p>
                                  <Link id='link' to ="/dash/GalleryPage">
                                      <button className="Screenshots">Claim Pinpoints</button>
                                  </Link>
                                  <Link id='link' to="/dash/DocumentPage">
                                      <button className="Document">Claim Document</button>
                                  </Link>
                                  <button className="Download">Download</button>
                              </div>
                          </div>
                      ))}
                      </Slider>
                    </div>
            </div>
        </div>
    )
}
export default FileClaimsPage;