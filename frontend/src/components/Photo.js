import React from 'react';
import './Photo.css';

const Photo = (props) => {
    return(
        <section>
            <img src={props.url} alt = {props.name} className="photos"/>
        </section>
    )
}
export default Photo;