import Navbar from '../components/Navbar'
import DocumentForm from '../components/DocumentForm'
import IndividualClaim from '../components/IndividualClaim'
import './DocumentPage.css'

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
                        <IndividualClaim />
                    </section>  
                </div>
            </div>        
        </>

    )
}
export default DocumentPage;