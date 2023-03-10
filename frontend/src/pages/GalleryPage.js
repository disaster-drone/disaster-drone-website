import './GalleryPage.css';
import Navbar from '../components/Navbar';
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';


import InfiniteScroll from 'react-infinite-scroll-component';

import Loader from '../components/Loader';
import CloudImage from '../components/CloudImage';

import stlyed from 'styled-components';

function GalleryPage(){
    const [images, setImages] = useState([]); // images is an array of objects by default is set empty.
    const [pins, setPins] = useState([]); // pins is an array of objects by default is set empty.
    const [pinnedImages, setPinnedImages] = useState([]); // pinnedImages is an array of objects by default is set empty.

//     useEffect(() => { 
//         const apiRoot = 'http://localhost:3500';
//         axios
//             .get(`${apiRoot}/files/getpins`)
//             .the(let blob = new Blob([res.data], {type: 'text/csv'}));
// }, [])

console.log('these are the pins being set. ', pins)

    useEffect(() => {
        const apiRoot = 'http://localhost:3500';
        axios
            .get(`${apiRoot}/files/listimages`)
            .then(res => setImages([...images, ...res.data]))
    }, [])


    // if in images and in pins, then add to pinnedImages
    // useEffect(() => {
    //     const pinnedImages = images.filter(image => pins.some(pin => pin.name === image.name))
    //     setPinnedImages(pinnedImages)
    // }, [images, pins])

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
                            {images.map(image => (
                                <CloudImage url={image.url} key={image.name} />
                            ))}
                        </div>
                    </section>
                </div>
                <div>
                </div>
            </div>        
            </>
        

)};
export default GalleryPage;