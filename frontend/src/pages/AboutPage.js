import dronePic from '../images/sf-drone-about.svg'

const AboutPage = () => {
    return(
        <>
        <div className="w-screen h-screen">
            <div className="mx-auto flex flex-col">
                <section className="flex flex-col bg-[#D62311]">
                <div className="mx-auto max-w-[1512px] flex flex-col">
                    <span className="text-4xl font-bold text-white pt-12 px-6">The Mission</span>
                    <span className="text-2xl text-white max-w-[1200px] pb-12 pt-2 px-6">In certain disaster scenarios
                        sending a person to check on an insurance claim might be
                        impractical or infeasible depending on the where damage
                        is and how much damage occurred. The purpose of this project
                        is to help State Farm develop and test the idea of creating
                        something where a State Farm insurance Specialist or State Farm
                        Agent would not have to be physically at the insurance claim
                        site to validate the extent of the damage and file a claim.</span>
                </div>
                </section>  
                <section className="flex flex-col md:flex-row bg-white">
                <div className="mx-auto max-w-[1512px] flex md:flex-row flex-col">
                    <img src={dronePic} alt="drone" className="md:w-[350px] w-[700px] pl-12 pt-12"/>
                    <section className="flex flex-col">
                        <span className="text-4xl font-bold text-[#D62311] px-8 pt-12">The Solution</span>
                        <span className="text-2xl text-[#D62311] px-8 pt-2 pb-12 max-w-[1000px]">There will be photos taken of a disaster site with a drone.
                            Then we will use photogrammetry software to create a 3D model and render that model into a
                            virtual reality environment. Then, once in the virtual environment, the insurance agent will be
                            able to walkaround and take screenshots of certain damage points as if they were at the disaster
                            site in person. This will then be uploaded to a website that will automate
                            the process of creating the insurance claim document.
                        </span>
                    </section>
                </div>
                </section>
            </div>
        </div>
        </>
    )
}
export default AboutPage;