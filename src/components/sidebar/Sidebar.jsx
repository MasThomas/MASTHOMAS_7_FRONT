import "./sidebar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRss, faUsers, faUserCircle } from "@fortawesome/free-solid-svg-icons"

export default function leftbar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItems">
                        <FontAwesomeIcon className="sidebarIcon" icon={faRss} /> 
                        <span className="sidevbarListItemsText">Fil d'actualité</span>
                    </li>
                    <li className="sidebarListItems">
                        <FontAwesomeIcon className="sidebarIcon" icon={faUsers} /> 
                        <span className="sidevbarListItemsText">Liste des utilisateurs</span>
                    </li>
                    <li className="sidebarListItems">
                        <FontAwesomeIcon className="sidebarIcon" icon={faUserCircle} /> 
                        <span className="sidevbarListItemsText">Accès à votre profil</span>
                    </li>
                </ul>
            </div>
        </div>
    )
};