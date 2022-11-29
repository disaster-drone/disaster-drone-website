import './ClosedClaimsPage.css';
import ClaimButton from '../components/ClaimButton';
import Navbar from '../components/Navbar';

const ClosedClaimsPage = () => {
    return (
        <>
        <div className="fileclaim-container">
            <section className="fileclaim-title">
                <span className="fileclaim-main-title">CLOSED CLAIMS</span>
                <span className="fileclaim-desc" > View or reopen a previous claim</span>
            </section>
            <section className="fileclaim-form">
                <ClaimButton className="claim-btn" />
                <ClaimButton className="claim-btn"/>
                <ClaimButton className="claim-btn"/>
                <ClaimButton className="claim-btn"/>
                <ClaimButton className="claim-btn"/>
            </section>
        </div>
        </>
    )
}
export default ClosedClaimsPage;