import React from 'react'

import './Homepage.css';
import jake from '../images/jake5.png';



const Homepage = () => {
  return (
    <>  
      <div className="homepage">
        <div className="homepage-content">
            <section className="homepage-left">  
              <span className="homepage-title-bot">DISASTER DRONE</span>
              <span className="homepage-subtitle"> A StateFarm Sponsored Project</span>
              <span className="homepage-divider"></span>
              <span className="homepage-description"> Making insurance claims from disaster sights possible without putting anyone at risk. </span>
            </section>
            <section className="homepage-right"> 
            </section>
        </div> 
      </div>
      <div>
        <img src={jake} alt="jake" className="jake"/>
      </div>
    </>
  )
}
export default Homepage