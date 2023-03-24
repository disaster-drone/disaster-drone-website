import Navbar from '../components/Navbar'
import React, { useState, useEffect } from 'react';
import DocumentForm from '../components/DocumentForm'
import IndividualClaim from '../components/IndividualClaim'
import './DocumentPage.css'
import sfddlogo from '../images/DD1.png'
import axios from 'axios';
import Papa from 'papaparse';


function DocumentPage(){

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
            <div className="documentpage">
                <div className="documentpage-container">
                    <section className="documentpage-title">
                        <span className="documentpage-main-title">DOCUMENT FORM</span>
                        <span className="documentpage-desc" >View Form and Download</span>
                    </section>
                    <section className="documentpage-form">
                        <span className="pdfstuff">
                            <img src={sfddlogo} alt="Disaster Drone Logo" className="documentpage-logo"/>
                            <p id="title-text">StateFarm Disaster Drone Case Document</p>
                            <p id="p-text">This case was made using the Diaster Drone website, by the insurance agent
                            billy bob for carlos who is insured by StateFarm Insurance. There are some legals words 
                            that might be able to go in here to make the document look a little more professional. </p>
                            <div className="seperation-bar-top"></div>
                        </span>
                        <span className="indiv-claims"> 
                            {filterdImages.map(image => (
                                <IndividualClaim url={image.url} key={image.name} alt={image.name}/>
                            ))}
                        </span>
                    </section>  
                </div>
            </div>        
        </>

    )
}
export default DocumentPage;