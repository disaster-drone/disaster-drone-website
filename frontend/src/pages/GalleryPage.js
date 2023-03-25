import './GalleryPage.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import CloudImage from '../components/CloudImage';

function GalleryPage(){

    const apiRoot = 'http://localhost:3500';
    const [allImages, setAllImages] = useState([]); // images is an array of objects by default is set empty.
    const [csvImageNames, setCsvImageNames] = useState([]); // pinnedImages is an array of objects by default is set empty.
    const [filteredImages, setFilteredImages] = useState([]); // filterdImages is an array of objects by default is set empty.


    // this functions get an array of image objects and loads them into the "images" array.
    const getImages = async () => {
        const allImagesResult = await axios.get(`${apiRoot}/files/listimages`)
        setAllImages(allImagesResult.data)
        console.log('this is the array of all images', allImages)
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
        console.log('this is the array of image names from the csv file', csvImageNames)
    }
    
    useEffect(() => {
        getImages()
        getCsvData()
    }, []);

    return (
        <>  
        <div className="gallery-page">
            <div className="gallerypage-container">
                <section className="gallerypage-title">
                    <span className="gallerypage-main-title">GALLERY</span>
                    <span className="gallerypage-desc" >View pin point images</span>
                </section>
                <section className="gallerypage-gallery">
                        <div className="wrapper-image">
                            {allImages.filter((image) => csvImageNames.includes(image.name)).map(image => (
                                <CloudImage url={image.url} key={image.name} alt={image.name}/>
                            ))}
                        </div>
                    </section>
                </div>  
                <div>
            </div>
        </div>        
        </> 
    );
}
export default GalleryPage;