import "./sidebar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRss, faUserCircle, faCog } from "@fortawesome/free-solid-svg-icons"
import { NavLink, Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"


export default function Sidebar() {

    const {user} = useContext(AuthContext);
    
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItems">
                        <Link to={"/"}>
                            <FontAwesomeIcon className="sidebarIcon" icon={faRss} /> 
                            <span className="sidevbarListItemsText">Fil d'actualité</span>
                        </Link>
                    </li>
                    <li className="sidebarListItems">
                        <NavLink to={`/profile/${user.username}`}>                            
                            <FontAwesomeIcon className="sidebarIcon" icon={faUserCircle} /> 
                            <span className="sidevbarListItemsText">Accès à votre profil</span>
                        </NavLink>
                    </li>
                    <li className="sidebarListItems">
                        <Link to={"/profils/settings"}>
                            <FontAwesomeIcon className="sidebarIcon" icon={faCog} /> 
                            <span className="sidevbarListItemsText">Paramètrez votre profil</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
};