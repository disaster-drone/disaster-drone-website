import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf"

import DocumentForm from '../components/DocumentForm'
import IndividualClaim from '../components/IndividualClaim'

import sfddlogo from '../images/DD1.png'
import './DocumentPage.css'
import { handle } from 'express/lib/router';


function DocumentPage(){
    const apiRoot = 'http://localhost:3500';
    const [allImages, setAllImages] = useState([]); // images is an array of objects by default is set empty.
    const [csvImageNames, setCsvImageNames] = useState([]); // pinnedImages is an array of objects by default is set empty.
    const [filteredImages, setFilteredImages] = useState([]); // filterdImages is an array of objects by default is set empty.
    const [text, setText] = useState('');

  
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
        fileName: `Report for ${new Date().getFullYear()}`,
        });
    };

    const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };

    return (
        <>
            <div className="documentpage">
                    <div className="documentpage-container">
                        <section className="documentpage-title">
                            <span className="documentpage-main-title">DOCUMENT FORM</span>
                            <span className="documentpage-desc" >View Form and Download</span>
                        </section>
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
                                <div className="seperation-bar-top"></div>
                            </span>
                            <span className="indiv-claims"> 
                                {allImages.filter((image) => csvImageNames.includes(image.name)).map(image => (
                                    <IndividualClaim url={image.url} key={image.name} alt={image.name}/>
                                ))}
                            </span>
                        </section>
                        </PDFExport>
                    </div>
                    <div className="bottom-button">
                        <button
                            className="pdf-button"
                            onClick={exportPDFWithComponent}>
                            Download PDF
                        </button>
                    </div>
                </div>    
        </>

    )
}
export default DocumentPage;