import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

const getImageData = async() => {
    const apiRoot = 'http://localhost:3500';
    const imageResult = await axios.get(`${apiRoot}/files/listimages`)
    setImages(imageResult.data)
    console.log('this should run first and get all the images: ', images)
    const pinsResult = await axios.get(`${apiRoot}/files/getpins`)
    const cvsUrl = await pinsResult.data[0].url
    Papa.parse(cvsUrl, {
        download: true,
        header: false,
        complete: function(data) {
            setPinnedImages(data.data)
        }
    })
    console.log('this should run second and get the pinned images: ', pinnedImages)

    const tempFilterdImages = []
    pinnedImages.forEach((pinnedImage) => {
        images.forEach((image) => {
            //console.log('Comparing pinned image', pinnedImage[0], 'with image', image.name)
            if(pinnedImage[0] === image.name){
                //console.log('FOUND A MATCH! adding ', image, ' to filterdImages')
                tempFilterdImages.push(image)
            }
        })  
    })
    
    console.log(' there are the temp (filtered) images: ', tempFilterdImages)
    setFilterdImages(tempFilterdImages)
    // console.log('this should run last and filter out the images: ', filterdImages)
}
export default getImageData;