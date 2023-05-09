import React, { useState, useEffect } from 'react';
import { PDFExport } from "@progress/kendo-react-pdf"
import IndividualClaim from '../components/IndividualClaim'
import sfddlogo from '../images/DD1.png'
import './DocumentPage.css'
import { PDFExport } from "@progress/kendo-react-pdf"
import IndividualClaim from '../components/IndividualClaim'
import sfddlogo from '../images/DD1.png'
import './DocumentPage.css'

// Document Page, this the page when you click on 'Case Document' on the carousel of cases on the cases page
// This is the 'Final' Report that the agent is able to download and then submit.

// This does use KendoReact to create the PDF, but it is not a paid version
// It does need a license key to work, which is in the eviroment variables
// It is available to use in testing but not in production
// It was used to created a PDF of the Document.

function DocumentPage({currentCase}){
    const [caseImages, setCaseImages] = useState([])
    const [caseCSVNames, setCaseCSVNames] = useState([])

    useEffect(() => {
        setCaseImages(currentCase.images)
        setCaseCSVNames(currentCase.csvNames)
    }, [currentCase])

    const pdfExportComponent = React.useRef(null);
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
                                    {caseImages.filter((image) => caseCSVNames.includes(image.name)).map(image => (
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