import './GalleryPage.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CloudImage from '../components/CloudImage';
import { Link, useParams, useLocation} from 'react-router-dom';

function GalleryPage({currentCase}){

    const [caseImages, setCaseImages] = useState([])
    const [caseCSVNames, setCaseCSVNames] = useState([])

    useEffect(() => {
        setCaseImages(currentCase.images)
        setCaseCSVNames(currentCase.csvNames)
    }, [currentCase])

    console.log('GalleryPage caseImages -> ', caseImages)
    console.log('GalleryPage caseCSVNames -> ', caseCSVNames)

    return (
        <>  
        <div className="bg-white w-screen h-screen font-[Inter]">
            <div className='flex flex-col max-w-[1512px] mx-auto py-16  justify-center items-center'>
            <p className="  md:text-[4em] sm:text-[3em] text-[1.25em] font-bold">Gallery of Pinned Images</p>
                <section className='max-w-[1512px] mx-auto flex flex-row'>
                        <div className="flex flex-wrap md:max-w-[1080px] md:max-h-[720px] sm:max-w-[720px] sm:max-h-[500px] max-w-[500px] max-h-[320px]">
                            {caseImages.filter((image) => caseCSVNames.includes(image.name)).map(image => (
                                <CloudImage url={image.url} key={image.id} alt={image.name}/>
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