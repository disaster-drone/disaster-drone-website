import './FileClaimsPage.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import blank from '../images/blank.png';


// Arrow for the carousel
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
  
// Arrow for the carousel
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


/* File Claims Page, This is the page that shows the carousel of all the cases that
  are in the mongodb database. This page also calls the function that checks the cloud for new cases and 
  adds them to the database. That is why there is a reload function because the carousel sometime does not
  update when a new case is added automatically 
*/
const FileClaimsPage = ({setCurrentCase}) => {

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
    })
  }

  function handleClick() {
    setClick(click + 1);
  }

  useEffect(() => {
    createObjects();
    getAllCases();
  }, [click]);

  function handleClick(casee) {
    setCurrentCase(casee);
  }

  console.log('these are all the cases in the allCases array -> ', allCases)

    const settings = {
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

    return (
      <div className="flex flex-row w-screen h-screen bg-cover overflow-hidden font-[Inter]">
        <div className="max-w-[1240px] mx-auto flex flex-col pt-16">
          <p className=" ml-4 mb-0 p-0 md:text-[1.5em] sm:text-6xl text-4xl font-bold">FILE A CASE</p>
          <button className="ml-4 mb-0 mt-2 bg-[#D62311] w-[8em] rounded-lg font-bold text-white" onClick={handleClick}>reload cases</button>
            <div className="flex flex-col justify-center items-center m-1 p-0">
              <Slider {...settings}>
                {allCases.map((casee) => 
                  <div className="card">
                    <div className="card-top">
                      { casee.images.length === 0 ? <img key={casee.name} src={blank} alt='alt' /> : <img src={casee.images[0].url} alt={"alt"} /> }
                    </div>
                    <div className="flex flex-col justify-center items-center text-[1em] text-black no-underline">
                      <p className='p-0 m-0'> Case ID: {casee.name.split('/', 1)[0]}</p>
                      <p className='p-0 m-0'> Customer: {casee.client}</p>
                      <a className="download-link" href={casee.zipUrl} target="_blank" rel="noopener noreferrer"> 
                        <button className="flex flex-row h-6 w-64 justify-center items-center text-center bg-[#D62311] rounded-lg text-white font-bold text-sm my-2 hover:bg-[#FF0000]">1. Download VR enviorment</button>
                      </a>
                      <Link id='link' to ='/dash/GalleryPage/'>
                        <button onClick={()=>handleClick(casee)} className="flex flex-row h-6 w-64 justify-center items-center text-center bg-[#D62311] rounded-lg text-white font-bold text-sm my-2 hover:bg-[#FF0000]">2. Preview pinpoints</button>
                      </Link>
                      <Link id='link' to='/dash/DocumentPage/'>
                        <button onClick={()=>handleClick(casee)} className="flex flex-row h-6 w-64 justify-center items-center text-center bg-[#D62311] rounded-lg text-white font-bold text-sm my-2 hover:bg-[#FF0000]">3. Create case document</button>
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