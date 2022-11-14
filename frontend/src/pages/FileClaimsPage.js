import './FileClaimsPage.css';
import ClaimButton from '../components/ClaimButton';
import Navbar from '../components/Navbar';

const FileClaimsPage = () => {
    return (
        <div className="file-claims-page">
            <Navbar/>
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
                    <ClaimButton className="claim-btn"/>
                </section>
            </div>
        </div>
    )
}
export default FileClaimsPage;