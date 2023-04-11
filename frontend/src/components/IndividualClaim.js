import React, { useState } from 'react'
import CloudImage from './CloudImage'
import demo from '../images/demo.JPG'
import './IndividualClaim.css'

const IndividualClaim = ({url, key, name}) => {
  return (
    <div className="flex flex-col mx-[2em] font-[Inter]">
        <section className="flex flex-row">
          <span className="flex max-w-[25em mb-[1em]">
            <CloudImage url={url} key={key} alt={name}/>
          </span>
          <span className="claim-info">
            <p id="mt-[1em] text-[1.5em]">This is claim {name} from the VR enviornment.</p>
            <form className="claim-desc-form">
                  <p id="m-0 text-[1em] p-0 ">Description of claim of claim entered by agent</p>
                  <textarea className= "desc-form-box" type="text" name="claim-description" placeholder='Enter a detailed description of the current claim.'/> 
              </form>
          </span>
        </section>
      <div className="h-[1px] bg-[#D62311] w-full m-[1em]"></div>
    </div>
  )
}
export default IndividualClaim
