import './FileClaimsPage.css';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Papa from 'papaparse';
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
  const [allImages, setAllImages] = useState([]); // images is an array of objects by default is set empty.
  const [csvImageNames, setCsvImageNames] = useState([]); // pinnedImages is an array of objects by default is set empty.
  const [filteredImages, setFilteredImages] = useState([]); // filterdImages is an array of objects by default is set empty.
  const [zipFiles, setZipFiles] = useState([]);

  // this functions get an array of image objects and loads them into the "images" array.
  const getImages = async () => {
      const allImagesResult = await axios.get(`${apiRoot}/files/listimages`)
      setAllImages(allImagesResult.data)
      //console.log('this is the array of all images', allImages)
  }

  // this function gets the csv download link and then parses the csv file into an array of image names.
  const getCsvData = async () => {
      const csvData = await axios.get(`${apiRoot}/files/getpins`)
      const cvsUrl = await csvData.data[0].url
      Papa.parse(cvsUrl, {
          download: true,
          header: false,
          complete: function(data) {
              setCsvImageNames(data.data.map((image) => image[0]))
          }   
      })
      //console.log('this is the array of image names from the csv file', csvImageNames)
  }

  const downloadZip = async () => {
    const zipResult = await axios.get(`${apiRoot}/files/getzip`)
    const zipUrl = await zipResult.data[0].url
    setZipFiles(zipUrl)
    //console.log('this is the link to the zip array updated', zipFiles)
  }
  
  useEffect(() => {
      getImages()
      getCsvData()
      downloadZip()
  }, []);

    const settings = {
        //className: "center",
        //centerMode: true,
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

    //<p> Case ID: {image.name.split('/', 3)[2]}</p> THIS ONLY GETS THE PURE NAME OF THE IMAGES.

    // right now, the slider is mapping over the images array to show the functionality of the carousel 
    // but the it is only images from one case and not multiple cases.

    return (
        <div className="file-claims-page">
            <div className="file-claims-page-container">
                <span className="file-claims-page-title">FILE CLAIM</span>
                <span className="file-claims-page-subtitle">Select a case</span>
                  <div className="carousel-container">
                      <Slider {...settings}>
                      {allImages.map((image) => (
                          <div className="card">
                              <div className="card-top">
                                  <img src={image.url} alt={image.name} />    
                              </div>
                              <div className="card-bottom">
                                  <p> Case ID: {image.name.split('/', 1)[0]}</p>
                                  <p> Customer: Faith G</p>
                                  <a className="download-link" href={zipFiles} target="_blank" rel="noopener noreferrer"> 
                                    <button className="Download">1. Download VR enviorment</button>
                                  </a>
                                  <Link id='link' to ="/dash/GalleryPage">
                                      <button className="Screenshots">2. Preview pinpoints</button>
                                  </Link>
                                  <Link id='link' to="/dash/DocumentPage">
                                      <button className="Document">3. Create case document</button>
                                  </Link>
                  
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