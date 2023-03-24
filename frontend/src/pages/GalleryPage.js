import './GalleryPage.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import CloudImage from '../components/CloudImage';
import { get, set } from 'mongoose';
import { addSeconds } from 'date-fns';


function GalleryPage(){

    const apiRoot = 'http://localhost:3500';
    const [images, setImages] = useState([]); // images is an array of objects by default is set empty.
    const [pinnedImages, setPinnedImages] = useState([]); // pinnedImages is an array of objects by default is set empty.
    const [filterdImages, setFilterdImages] = useState([]); // filterdImages is an array of objects by default is set empty.

    const getImages = async () => {
        const imageResult = await axios.get(`${apiRoot}/files/listimages`)
        setImages(imageResult.data)
    }

    const getCsvData = async () => {
        const pinsResult = await axios.get(`${apiRoot}/files/getpins`)
        const cvsUrl = await pinsResult.data[0].url
        Papa.parse(cvsUrl, {
            download: true,
            header: false,
            complete: function(data) {
                setPinnedImages(data.data)
            }
        })

        const tempFilterdImages = await filterImages(pinnedImages, images)
        setFilterdImages(tempFilterdImages)
    }
    
    const filterImages = async(array1, array2) => {
        const tempFilterdImages = []
        array1.forEach((pinnedImage) => {
            array2.forEach((image) => {
                //console.log('Comparing pinned image', pinnedImage[0], 'with image', image.name)
                if(pinnedImage[0] === image.name){
                    //console.log('FOUND A MATCH! adding ', image, ' to filterdImages')
                    tempFilterdImages.push(image)
                }
            })  
        })
        return tempFilterdImages
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
                    <span className="gallerypage-desc" >View all images</span>
                </section>
                <section className="gallerypage-gallery">
                        <div className="wrapper-image">
                            {filterdImages.map(image => (
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