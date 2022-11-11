import './LoginPage.css';

const LoginPage = () => {
    return(
        <div className="loginpage-container">
            <section className="login-hero">
                <span className="login-hero-title">DisasterDrone</span>
                <span className="login-hero-desc">A UTA Senior Design,</span>
                <span className="login-hero-desc">StateFarm sponsored project.</span>
            </section>
            <section className="login-form">
                <form action="#">
                    <input type="text" placeholder="StateFarm Username"></input>
                    <input type="password" placeholder="Password"></input>
                    <button type="submit">Log In</button>
                    <a href="#">Forgotten Password</a>
                </form>

            </section>
        </div>  
    )
}
export default LoginPage;