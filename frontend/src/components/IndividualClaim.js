import React, { useState } from 'react'
import CloudImage from './CloudImage'
import demo from '../images/demo.JPG'
import './IndividualClaim.css'

const IndividualClaim = ({image}) => {
  return (
    <div className="claim-container">
        <section className="claim-content">
          <span className="claim-image">
            <CloudImage url={demo} key="jake-pic"/>
          </span>
          <span className="claim-info">
            <p id="claim-id">This is claim number __ from the VR enviornment.</p>
            <form className="claim-desc-form">
                  <p id="desc-title">Description of claim of claim entered by agent</p>
                  <textarea className= "desc-form-box" type="text" name="claim-description" placeholder='Enter a detailed description of the current claim.'/> 
              </form>
          </span>
        </section>
      <div className="seperation-bar"></div>
    </div>
  )
}
export default IndividualClaim
