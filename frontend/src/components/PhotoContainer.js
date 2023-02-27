import { de } from 'date-fns/locale';
import React from 'react';
import Photo from './Photo'
import './PhotoContainer.css'

const PhotoContainer = (props) => {

    const displayPhotos = () => {
        return props.photos.map((photo) => {
            return <Photo url={photo.url} key={photo.name} />
        })
    };

    return(
        <>
        <section>{displayPhotos()}</section>
        </>
    )
}
export default PhotoContainer;