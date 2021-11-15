import "./login.css"

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
                        <input placeholder="Mot de passe" className="loginInput" />
                        <button className="loginButton">Log In</button>
                        <button className="loginRegisterButton">Create New Account</button>
                    </div>
                </div>   
            </div>            
        </div>
    )
}
