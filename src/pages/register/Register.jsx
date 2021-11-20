import { useRef } from "react";
import {useNavigate } from "react-router-dom"
import axios from "axios";
import "./register.css"

export default function Register() {
    const email = useRef();
    const username = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate ();

    const handleClick = async (e) => {
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Les mots de passe doivent être identiques !")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post("/users/register", user);
                navigate("/login")
            } catch (err) {
                console.log(err)
            };
        }
        // loginCall({email:email.current.value, password:password.current.value}, dispatch)
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
                        <input placeholder="Email" required ref={email} type='email' className="loginInput" />
                        <input placeholder="Nom d'utilisateur" required ref={username} className="loginInput" />
                        <input placeholder="Mot de passe" required ref={password} type='password' minLength="8" className="loginInput" />
                        <input placeholder="Saisissez à nouveau votre mot de passe" type='password' minLength="8" required ref={passwordAgain} className="loginInput" />
                        <button className="loginButton" type="submit">S'inscrire</button>
                        <button className="loginRegisterButton">Se connecter</button>
                    </form>
                </div>   
            </div>            
        </div>
    )
}
