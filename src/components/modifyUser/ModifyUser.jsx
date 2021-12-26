import {React, useContext, useRef, useState} from 'react';
import "./modifyUser.css";
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import authHeader from '../../authHeader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera, faWindowClose } from "@fortawesome/free-solid-svg-icons"
import FormData from "form-data"



export default function ModifyUser() {

    const {user} = useContext(AuthContext);
    const usernameInput = useRef();
    const companyRoleInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const passwordAgainInput = useRef();
    const userId = user.userId
    const [file, setFile] = useState(null)

    const modifyProfilePictureHandler = async (e) => {
        e.preventDefault()
        if (!file) {
            toast("Veuillez uploader une image avant de valider la modification")
        }
        
        const form = new FormData();
        form.append("UserId", userId)
        const fileName = Date.now() + file.name
        form.append("name", fileName)
        form.append("file", file)
        

        
        try {
            await axios.put('/users/profils/profilepicture/'+ userId, form, {headers: authHeader(), "Content-type" : "multipart/form-data"})
            .then(function(res) {
                let newUserInfos = {
                    username: user.username,
                    companyRole : user.companyRole,
                    email : user.email,
                    userId : user.userId,
                    imageUrl : res.data,
                    token : user.token
                }
                localStorage.setItem('user', JSON.stringify(newUserInfos))
                toast("Votre photo de profil a bien été mis à jour!")
                setTimeout(() => {window.location.reload()}, 3000)
            })
        } catch(err) {
            toast("Erreur lors de la modification de votre photo de profil, veuillez vérifier votre saisie")
        }
    }

    const modifyUsernameHandler = async (e) => {
        e.preventDefault()
        if(usernameInput.current.value === null || usernameInput.current.value === undefined || usernameInput.current.value === "") {  
            toast("Veuillez indiquer un nouveau nom d'utilisateur valide")
        }
        else {
            try {
                const token = authHeader();
                await axios.put("/users/profils/username/"+ userId, {username : usernameInput.current.value}, {headers : token})
                .then(function(res) {
                    let newUserInfos = {
                        username: usernameInput.current.value,
                        companyRole : user.companyRole,
                        email : user.email,
                        userId : user.userId,
                        imageUrl : user.imageUrl,
                        token : user.token
                    }
                    localStorage.setItem('user', JSON.stringify(newUserInfos))
                    const validateUsername = (res.data)
                    toast(validateUsername)
                    setTimeout(() => {window.location.reload()}, 3000)
                })
            } catch (error) {
                toast("Erreur lors de la modification de votre nom d'utilisateur, veuillez vérifier votre saisie")
            }
        }
    }

    const modifyCompanyRoleHandler = async (e) => {
        e.preventDefault()
        if(companyRoleInput.current.value === null || companyRoleInput.current.value === undefined) {
            toast("Veuillez indiquer un nouvel intitulé de poste dans la société valide")
        }
        else {
            try {
                const token = authHeader();
                await axios.put("/users/profils/companyRole/"+ userId, {companyRole : companyRoleInput.current.value}, {headers : token})
                .then(function(res) {
                    let newUserInfos = {
                        username: user.username,
                        companyRole : companyRoleInput.current.value,
                        email : user.email,
                        userId : user.userId,
                        imageUrl : user.imageUrl,
                        token : user.token
                    }
                    localStorage.setItem('user', JSON.stringify(newUserInfos))
                    const validateCompanyRole = (res.data)
                    toast(validateCompanyRole)
                    setTimeout(() => {window.location.reload()}, 3000)
                })
            } catch (e) {
                toast("Erreur lors de la modification de votre intitulé de poste dans la société, veuillez vérifier votre saisie")
            }
        }
    }

    const modifyEmailHandler = async(e) => {
        e.preventDefault()
        if(emailInput.current.value === null || emailInput.current.value === undefined) {
            toast("Veuillez indiquer un nouvel email valide")
        }
        else {
            try {
                const token = authHeader();
                await axios.put("/users/profils/email/"+ userId, {email : emailInput.current.value}, {headers : token})
                .then(function(res) {
                    let newUserInfos = {
                        username: user.username,
                        companyRole : user.companyRole,
                        email : emailInput.current.value,
                        userId : user.userId,
                        imageUrl : user.imageUrl,
                        token : user.token
                    }
                    localStorage.setItem('user', JSON.stringify(newUserInfos))
                    const validateEmail = (res.data)
                    toast(validateEmail)
                    setTimeout(() => {window.location.reload()}, 3000)
                })
            } catch (e) {
                toast("Erreur lors de la modification de l'email, veuillez vérifier votre saisie")
            }
        }
    }

    const modifyPasswordHandler = async(e) => {
        e.preventDefault()
        if(passwordInput.current.value === null || passwordInput.current.value === undefined || passwordAgainInput.current.value === null || passwordAgainInput.current.value === undefined ) {
            toast("Veuillez indiquer un nouveau mot de passe valide")
        }
        else {
            if(passwordInput.current.value !== passwordAgainInput.current.value) {
                toast("Les deux mots de passe saisis doivent être identiques")
            } else {
                try {
                    const token = authHeader();
                    await axios.put("/users/profils/password/"+ userId, {password : passwordInput.current.value}, {headers : token})
                    .then(function(res) {
                            const validatePassword = (res.data)
                        toast(validatePassword)
                        setTimeout(() => {window.location.reload()}, 3000)
                    })
                } catch (e) {
                    toast("Erreur lors de la modification du mot de passe, veuillez vérifier votre saisie")
                }
            }
        }
    }

    const deleteAccountHandler = async(e) => {
        e.preventDefault()
        const token = authHeader();
        console.log(userId)
        await axios.delete('/users/profils/'+userId, {headers:token})
        localStorage.clear();
        window.location.reload()
    }

    return (
        <div className="modifyUser">
            <div className="wrapper">
                <h1 className="modifyTitle">Modifiez les paramètres de votre compte</h1>
                <hr/>

                <div className="userProfilePictureContainer">
                    <h2 className="userProfilePictureTitle">Votre Photo de profil</h2>
                    <img src={`${user.imageUrl}`} alt="" className="userProfilePicture"/>
                

                    <form className="userProfilePictureContainer" onSubmit={modifyProfilePictureHandler} encType="multipart/form-data">
                        {file && (
                            <div className="shareImgContainer">
                                <img className="shareImg" src={URL.createObjectURL(file)} alt=""/>
                                <FontAwesomeIcon className="shareCancelImg" icon={faWindowClose} onClick={() => setFile(null)} /> 
                            </div>
                        )}
                        <label htmlFor="file">
                            <FontAwesomeIcon className="shareIcon" icon={faCamera} /> 
                            <span className='uploadFile'>Uploader une nouvelle photo de profil</span>
                            <input style={{display:"none"}} type="file" id="file" accept=".png,.jpg,.jpeg,.gif" onChange={(e) =>setFile(e.target.files[0])} />
                            <br/>
                        </label>
                        <button className="validateButton" type="submit">Valider la modification de votre photo de profil</button>
                    </form>
                </div>

                <hr/>

                <form className="userUsernameContainer" onSubmit={modifyUsernameHandler}>
                    <h2 className="userUsernameTitle">Votre nom d'utilisateur</h2>
                    <p className="userUsername">Votre nom d'utilisateur actuel : {user.username}</p>
                    <input className='modifyInput' type="text" placeholder="Entrez votre nouveau nom d'utilisateur" ref={usernameInput}></input>
                    <br/>
                    <button className="validateButton" type='submit'>Valider la modification de votre nom d'utilisateur</button>
                </form>
                
                <hr/>

                <form className="userCompanyRoleContainer" onSubmit={modifyCompanyRoleHandler}>
                    <h2 className="userCompanyRoleTitle">Votre poste dans la société</h2>
                    <p className="userCompanyRole">Votre poste actuel : {user.companyRole}</p>
                    <input className='modifyInput'  type="text" placeholder='Entrez votre nouvel intitulé de poste dans la société' ref={companyRoleInput}/>
                    <br/>
                    <button className="validateButton" type='submit'>Valider la modification de votre intitulé de poste dans la société</button>
                </form>

                <hr/>

                <form className="userEmailContainer" onSubmit={modifyEmailHandler}>
                    <h2 className="userEmailTitle">Votre e-mail</h2>
                    <p className="userEmail">Votre e-mail actuel : {user.email}</p>
                    <input className='modifyInput'  type="text" placeholder='Entrez le nouvel email que vous souhaitez associer à votre compte' ref={emailInput}/>
                    <br />
                    <button className="validateButton" type='submit'>Valider la modification de votre email</button>
                </form>

                <hr/>

                <form className="userPasswordContainer" onSubmit={modifyPasswordHandler}>
                    <h2 className="userPasswordTitle">Votre mot de passe</h2>
                    <p> Le nouveau mot de passe doit contenir huit caractères minimum incluant au minimum une majuscule, une minuscule, un chiffre et un caractère spécial </p>
                    <input className='modifyInput'  type="password" placeholder='Entrez votre nouveau mot de passe' ref={passwordInput}/>
                    <br/>
                    <input className='modifyInput'  type="password" placeholder='Entrez à nouveau votre nouveau mot de passe' ref={passwordAgainInput}/>
                    <br/>
                    <button className="validateButton" type='submit'>Valider la modification de votre mot de passe</button>
                </form>

                <hr/>

                <form className="deleteAccountCountainer" onSubmit={deleteAccountHandler}>
                    <h2 className="deleteAccountTitle">Suppression de votre compte</h2>
                    <p>La suppression de votre compte est irréversible</p>
                    <br/>
                    <button className="validateButton redBtn" type='submit'>Valider la suppression du compte</button>
                </form>

                <br/><br/><br/>

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
            </div>
        </div>
    )
}