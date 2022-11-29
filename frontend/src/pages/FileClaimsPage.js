import './FileClaimsPage.css';
import ClaimButton from '../components/ClaimButton';
import Navbar from '../components/Navbar';
import curve from '../images/claim-curve-real-fr.png';

const FileClaimsPage = () => {
    return (
        <div className="file-claims-page">
            <div className="fileclaim-container">
                <section className="fileclaim-title">
                    <span className="fileclaim-main-title">FILE A CLAIM</span>
                    <span className="fileclaim-desc" > Uploaded Claims</span>
                </section>
                <section className="fileclaim-form">
                    <ClaimButton className="claim-btn" />
                    <ClaimButton className="claim-btn"/>
                    <ClaimButton className="claim-btn"/>
                    <ClaimButton className="claim-btn"/>
                </section>
            </div>
            <div>
                <img src={curve} alt="curve" className="fileclaim-curve"/>
            </div>
        </div>
    )
}
export default FileClaimsPage;