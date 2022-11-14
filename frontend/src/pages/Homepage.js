import { Link } from 'react-router-dom';
import React from 'react'
import Navbar from '../components/Navbar';
import './Homepage.css';
import background from '../images/redgrad.svg';
import drone from '../images/drone.png';
import wave from '../images/sf-wave.png';



const Homepage = () => {
  return (
    <>  
      <div className="homepage">
        <Navbar/> 
        <div className="homepage-content">
            <section className="homepage-left">  
              <span className="homepage-title-bot">DISASTER DRONE</span>
              <span className="homepage-subtitle"> A StateFarm Sponsored Project</span>
              <span className="homepage-divider"></span>
              <span className="homepage-description"> Making insurance claims from disaster sights possible without putting anyone at risk. </span>
            </section>
            <section className="homepage-right"> 
              <img src={drone} alt="drone" className="drone"/>
            </section>
        </div> 
      </div>
    </>
  )
}
export default Homepage