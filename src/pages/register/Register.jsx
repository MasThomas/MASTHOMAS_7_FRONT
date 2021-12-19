import { useRef } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import "./register.css"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Register() {
    const email = useRef();
    const username = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const companyRole = useRef();
    const navigate = useNavigate ();

    const handleClick = async (e) => {
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Les mots de passe doivent être identiques !")
        } else {
            const user = {
                username: username.current.value,
                companyRole: companyRole.current.value,
                email: email.current.value,
                password: password.current.value,
                avatar: "imagesdefault/defaultuseravatar.png"
            }
            try {
                await axios.post("/users/signup", user)
                .then(function (res) {
                const validate = (res.data.message)
                toast(validate)
                setTimeout(() => {navigate("/login")}, 3000);
                })
            } catch (err) {
                console.log(err)
                const err2 = (err.response.data.error)
                toast(err2)
            };
        }
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
                        <input placeholder="Email" required ref={email} type='email' className="registerInput" />
                        <input placeholder="Nom d'utilisateur" required ref={username} className="registerInput" />
                        <input placeholder="Votre poste dans la société" required ref={companyRole} type="text" className="registerInput" />
                        <input placeholder="Mot de passe" required ref={password} type='password' minLength="8" className="registerInput" />
                        <input placeholder="Saisissez à nouveau votre mot de passe" type='password' minLength="8" required ref={passwordAgain} className="registerInput" />
                        <button className="loginButton" type="submit">S'inscrire</button>
                        <Link to ="/login" className="loginRegisterButton">Se connecter</Link>
                        <ToastContainer
                            position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover={false}
                        />
                    </form>
                </div>   
            </div>            
        </div>
    )
}