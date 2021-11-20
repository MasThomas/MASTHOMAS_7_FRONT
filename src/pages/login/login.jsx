import "./login.css";
import { useContext, useRef } from "react";
import {loginCall} from "../../apiCalls"
import {AuthContext} from "../../context/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Login() {

    const email  = useRef();
    const password  = useRef();

    const {isFetching, dispatch} = useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({email:email.current.value, password:password.current.value}, dispatch)
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Groupomania</h3>
                    <span className="loginDescription">Connectez-vous pour rejoindre vos collègues de Groupomania</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input 
                            placeholder="Votre adresse mail" 
                            type='email'
                            required
                            className="loginInput" 
                            ref={email}
                        />
                        <input 
                            placeholder="Mot de passe" 
                            type="password"
                            required
                            minLength="6"
                            className="loginInput" 
                            ref={password} 
                        />
                        <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? <FontAwesomeIcon className="fa-spin svg-inline--fa" icon={faSpinner} /> : "Se connecter"}</button>
                        <button className="loginRegisterButton" type="submit" disabled={isFetching}>{isFetching ? <FontAwesomeIcon className="fa-spin svg-inline--fa" icon={faSpinner} /> : "S'inscrire"}</button>
                    </form>
                </div>   
            </div>            
        </div>
    )
}
