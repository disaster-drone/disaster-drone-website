import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf"

import DocumentForm from '../components/DocumentForm'
import IndividualClaim from '../components/IndividualClaim'
import Loader from '../components/Loader'

import sfddlogo from '../images/DD1.png'
import './DocumentPage.css'
import { handle } from 'express/lib/router';


function DocumentPage(){
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

    const container = React.useRef(null);
    const pdfExportComponent = React.useRef(null);
    const exportPDFWithMethod = () => {
        let element = container.current || document.body;
        savePDF(element, {
        paperSize: "auto",
        margin: 40,
        fileName: `Report for ${allImages[0].name.split('/', 1)[0]} ${ new Date().getFullYear()}`,
        });
    };

    const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };

    return (
        <>
            <div className="bg-white w-screen h-screen font-[Inter]">
                    <div className='flex flex-col max-w-[1420px] mx-auto py-16  justify-center items-center'>
                        <p className="  md:text-[4em] sm:text-[3em] text-[2em] font-bold">Download Case Form</p>
                            <PDFExport
                                ref={pdfExportComponent}
                                paperSize="auto"
                                margin={40}
                                fileName={`Report for ${new Date().getFullYear()}`}
                                author="DiasterDrone">
                            <section className="documentpage-form">
                                <span className="pdfstuff">
                                    <img src={sfddlogo} alt="Disaster Drone Logo" className="documentpage-logo"/>
                                    <p id="title-text">StateFarm Disaster Drone Case Document</p>
                                    <p id="p-text">This case was made using the Diaster Drone website, by the insurance agent
                                    billy bob for carlos who is insured by StateFarm Insurance. There are some legals words 
                                    that might be able to go in here to make the document look a little more professional. </p>
                                    <div className="h-[1px] bg-[#D62311] w-[72em] m-[1em]"></div>
                                </span>
                                <span className="indiv-claims"> 
                                    {allImages.filter((image) => csvImageNames.includes(image.name)).map(image => (
                                        <IndividualClaim url={image.url} key={image.name} alt={image.name}/>
                                    ))}
                                </span>
                            </section>
                            </PDFExport>
                    </div>
                    <div className="flex flex-col justify-center items-center pb-8">
                        <button
                            className="flex flex-row h-16 w-72 justify-center items-center text-center bg-[#D62311] rounded-lg text-white font-bold text-[2em] hover:bg-[#FF0000]"
                            onClick={exportPDFWithComponent}>
                            Download PDF
                        </button>
                    </div>
                </div>    
        </>

    )
}
export default DocumentPage;