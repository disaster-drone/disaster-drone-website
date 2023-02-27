import './GalleryPage.css';
import Navbar from '../components/Navbar';
import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import PhotoContainer from '../components/PhotoContainer';

const images = [];

class GalleryPage extends Component{

    constructor(){
        super();
        this.state = {
            photos: []
        };
    }

    componentDidMount(){
        fetch('http://localhost:3500/files/listfiles')
        .then(response => {
            if(!response.ok){
                throw Error("Error in the componentdidmount 1");
            }
            return response.json();
        })
        .then (allData => {
            this.setState({photos: allData})
        })
        .catch(err => {
            throw Error("Error: in the copmonentDidMount 2")
        });
    }

    render(){
        return (
            <>  
            <div className="gallery-page">
                <div className="gallerypage-container">
                    <section className="gallerypage-title">
                        <span className="gallerypage-main-title">GALLERY</span>
                        <span className="gallerypage-desc" >View all images</span>
                    </section>
                    <section className="gallerypage-gallery">
                        <PhotoContainer photos={this.state.photos}/>
                    </section>
                </div>
                <div>
                </div>
            </div>        
            </>
        )
    }

}
export default GalleryPage;