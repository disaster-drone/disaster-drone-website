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
        <div className="bg-white w-screen h-screen font-[Inter]">
            <div className='flex flex-col max-w-[1512px] mx-auto py-16  justify-center items-center'>
            <p className="  md:text-[4em] sm:text-[3em] text-[1.25em] font-bold">Gallery of Pinned Images</p>
                <section className='max-w-[1512px] mx-auto flex flex-row'>
                        <div className="flex flex-wrap md:max-w-[1080px] md:max-h-[720px] sm:max-w-[720px] sm:max-h-[500px] max-w-[500px] max-h-[320px]">
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