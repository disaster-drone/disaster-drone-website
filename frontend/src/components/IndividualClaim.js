import React, { useState } from 'react'
import CloudImage from './CloudImage'
import jake from '../images/jake.png'
import './IndividualClaim.css'

const IndividualClaim = ({image}) => {
  return (
    <div className="claim-content">
        <span className="claim number">Claim #1</span>
        <span className="claim-image.">
            <CloudImage url={jake} key="jake-pic"/>
        </span>
        <span className="claim-description">
            <form className="desc-form-title">
                Description of claim. 
                <input className= "desc-form" type="text" name="claim-description" placeholder='Enter a detailed description of the current claim.'/> 
            </form>
        </span>
    </div>
  )
}
export default IndividualClaim
