import './FileClaimsPage.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Papa from 'papaparse';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import test from '../images/DD1.png';
import blank from '../images/blank.png';
const mongoose = require('mongoose');
//const Case = require('../models/Case');


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
  const [allCases, setAllCases] = useState([]);
  const [click, setClick] = useState(0);

  const createObjects = async () => {
    await axios.get(`${apiRoot}/files/createcases`)
  }

  const getAllCases = async () => {
    const cases = await axios.get(`${apiRoot}/cases/getall`)
    .then(res => {
      setAllCases(res.data)
      console.log('this is what i get from the /getall route', res.data)
    })
  }

  function handleClick() {
    setClick(click + 1);
  }

  useEffect(() => {
    createObjects();
    getAllCases();
  }, [click]);

    const settings = {
        //className: "center",
        //centerMode: true,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
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

    //<p> Case ID: {image.name.split('/', 3)[2]}</p> THIS ONLY GETS THE PURE NAME OF THE IMAGES.

    // right now, the slider is mapping over the images array to show the functionality of the carousel 
    // but the it is only images from one case and not multiple cases.

    return (
      <div className="flex flex-row w-screen h-screen bg-cover overflow-hidden font-[Inter]">
        <div className="max-w-[1240px] mx-auto flex flex-col pt-16">
          <p className=" ml-4 mb-0 p-0 md:text-[1.5em] sm:text-6xl text-4xl font-bold">FILE A CASE</p>
          <button className="ml-4 mb-0 mt-2 bg-[#D62311] w-[8em] rounded-lg font-bold text-white" onClick={handleClick}>reload cases</button>
            <div className="flex flex-col justify-center items-center m-1 p-0">
              <Slider {...settings}>
                {allCases.map((c) => 
                  <div className="card">
                    <div className="card-top">
                      {console.log(`printing the cases: ${c.name}`)}
                      { c.images.length === 0 ? <img src={blank} alt='alt' /> : <img src={c.images[0].url} alt={"alt"} /> }
                    </div>
                    <div className="flex flex-col justify-center items-center text-[1em] text-black no-underline">
                      <p className='p-0 m-0'> Case ID: {c.name.split('/', 1)[0]}</p>
                      <p className='p-0 m-0'> Customer: {c.name}</p>
                      <a className="download-link" href={c.zipUrl} target="_blank" rel="noopener noreferrer"> 
                        <button className="flex flex-row h-6 w-64 justify-center items-center text-center bg-[#D62311] rounded-lg text-white font-bold text-sm my-2 hover:bg-[#FF0000]">1. Download VR enviorment</button>
                      </a>
                      <Link id='link' to ={{ pathname:'/dash/GalleryPage', state: {c} }} >
                        <button className="flex flex-row h-6 w-64 justify-center items-center text-center bg-[#D62311] rounded-lg text-white font-bold text-sm my-2 hover:bg-[#FF0000]">2. Preview pinpoints</button>
                      </Link>
                      <Link id='link' to="/dash/DocumentPage">
                        <button className="flex flex-row h-6 w-64 justify-center items-center text-center bg-[#D62311] rounded-lg text-white font-bold text-sm my-2 hover:bg-[#FF0000]">3. Create case document</button>
                      </Link>
                    </div>
                  </div>
                )}
              </Slider>
            </div>
          </div>
      </div>
    )
}
export default FileClaimsPage;