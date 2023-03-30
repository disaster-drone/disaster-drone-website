import './Aboutpage.css'
import dronePic from '../images/sf-drone-about.svg'

const AboutPage = () => {
    return(
        <>
        <div className="aboutpage">
            <div className="aboutpage-content">
                <section className="aboutpage-top">
                    <span className="aboutpage-top-title">The Mission</span>
                    <span className="about-mission">In certain disaster scenarios
                        sending a person to check on an insurance claim might be
                        impractical or infeasible depending on the where damage
                        is and how much damage occurred. The purpose of this project
                        is to help State Farm develop and test the idea of creating
                        something where a State Farm insurance Specialist or State Farm
                        Agent would not have to be physically at the insurance claim
                        site to validate the extent of the damage and file a claim.</span>
                </section>
                <section className="aboutpage-bottom">
                    <img src={dronePic} alt="drone" className="aboutpage-bottom-img"/>
                    <section className="aboutpage-bottom-text">
                        <span className="aboutpage-bottom-title">The Solution</span>
                        <span className="about-solution">There will be photos taken of a disaster site with a drone.
                            Then we will use photogrammetry software to create a 3D model and render that model into a
                            virtual reality environment. Then, once in the virtual environment, the insurance agent will be
                            able to walkaround and take screenshots of certain damage points as if they were at the disaster
                            site in person. This will then be uploaded to a website that will automate
                            the process of creating the insurance claim document.
                        </span>
                    </section>
                </section>
            </div>
        </div>
        </>
    )
}
export default AboutPage;