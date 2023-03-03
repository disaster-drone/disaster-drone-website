import Navbar from '../components/Navbar'
import DocumentForm from '../components/DocumentForm'
import IndividualClaim from '../components/IndividualClaim'
import './DocumentPage.css'

import sfddlogo from '../images/DD1.png'

const DocumentPage = () => {
    return (
        <>
            <div className="documentpage">
                <div className="documentpage-container">
                    <section className="documentpage-title">
                        <span className="documentpage-main-title">DOCUMENT FORM</span>
                        <span className="documentpage-desc" >View Form and Download</span>
                    </section>
                    <section className="documentpage-form">
                        <span className="pdfstuff">
                            <img src={sfddlogo} alt="Disaster Drone Logo" className="documentpage-logo"/>
                            <p id="title-text">StateFarm Disaster Drone Case Document</p>
                            <p id="p-text">This case was made using the Diaster Drone website, by the insurance agent
                            billy bob for carlos who is insured by StateFarm Insurance. There are some legals words 
                            that might be able to go in here to make the document look a little more professional. </p>
                        </span>
                        <span className="indiv-claims"> 
                            <IndividualClaim />
                            <IndividualClaim />
                            <IndividualClaim />
                        </span>
                    </section>  
                </div>
            </div>        
        </>

    )
}
export default DocumentPage;