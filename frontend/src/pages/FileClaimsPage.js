import './FileClaimsPage.css';
import ClaimButton from '../components/ClaimButton';
import Navbar from '../components/Navbar';

const FileClaimsPage = () => {
    return (
        <>
        <Navbar/>
        <div className="fileclaim-container">
            <section className="fileclaim-title">
                <span>FILE A CLAIM</span>
                <span> Uploaded Claims</span>
            </section>
            <section className="fileclaim-form">
                <ClaimButton/>
                <ClaimButton/>
            </section>
        </div>
        </>
    )
}
export default FileClaimsPage;