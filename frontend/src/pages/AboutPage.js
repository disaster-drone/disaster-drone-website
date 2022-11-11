import './Aboutpage.css'
import Navbar from '../components/Navbar';

const AboutPage = () => {
    return(
        <>
            <div className="aboutpage-container">
                <Navbar/>
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
                        <span className="aboutpage-bottom-title">The Solution</span>
                        <span className="about-solution">To solve the problem statement,
                            we going are going to be working with a team of electrical engineers
                            who will build a drone that can fly around the disaster site and take
                            photos of the site. Then we, the computer science engineering team will
                            develop an application that can use photogrammetry software to create a
                            three-dimensional model and render that model into a virtual reality environment.
                            Then, once in the virtual environment, the insurance agent will be able to walk
                            around and take pictures of certain damage points as if they were at the insurance
                            claim site in person. This will then be uploaded to a website that will automate
                            the process of creating the insurance claim document.</span>
                    </section>
                </div>
            </div>
        </>
    )
}
export default AboutPage;