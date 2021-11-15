import "./register.css"

export default function login() {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Groupomania</h3>
                    <span className="loginDescription">Connect with your friends on Groupomania</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input placeholder="Email" className="loginInput" />
                        <input placeholder="Username" className="loginInput" />
                        <input placeholder="Mot de passe" className="loginInput" />
                        <input placeholder="Mot de passe again" className="loginInput" />
                        <button className="loginButton">Sign Up</button>
                        <button className="loginRegisterButton">Log into Your Account</button>
                    </div>
                </div>   
            </div>            
        </div>
    )
}
