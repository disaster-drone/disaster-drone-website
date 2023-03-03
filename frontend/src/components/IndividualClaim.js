import React, { useState } from 'react'
import CloudImage from './CloudImage'
import demo from '../images/demo.JPG'
import './IndividualClaim.css'

const IndividualClaim = ({image}) => {
  return (
    <div className="claim-content">
        <span className="claim-number">This is Claim #1 from the Disaster Drone app.</span>
        <section className="claim-img-desc-container">
          <span className="claim-image">
              <CloudImage url={demo} key="jake-pic"/>
          </span>
          <span className="claim-desc-span">
              <form className="claim-desc-form">
                  <p>Description of claim.</p>
                  <input className= "desc-form" type="text" name="claim-description" placeholder='Enter a detailed description of the current claim.'/> 
              </form>
          </span>
        </section> 

    </div>
  )
}
export default IndividualClaim
