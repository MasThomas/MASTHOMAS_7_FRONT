import "./NotFound.css"
import Topbar from "../../components/topbar/Topbar"
import { Link } from "react-router-dom"

import React from 'react'

export default function NotFound() {
    return (
        <div>
            <Topbar/>
            <div className="notFoundWrapper">
                <div className="notFoundContainer">
                    <p className="notFoundText">Page introuvable !</p>
                    <p className="notFoundText">La page que vous recherchez ne semble pas exister</p>
                    <Link className="btnLink" to='/'>
                        <button  className="backHomeBtn">Retourner à la page d'accueil</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
