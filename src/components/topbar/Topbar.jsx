import "./topbar.css"
import logo from "../../assets/icon.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import {Link, NavLink} from "react-router-dom"
import { useContext } from "react"
import { AuthContext} from "../../context/AuthContext"

export default function Topbar() {
    
    const {user} = useContext(AuthContext);

    function signoutHandler(e) {
        e.preventDefault();
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}} className="topbarLeft">
                <span className="logoPngContainer"><img className="logoPng" src={logo} alt="Logo Groupomania"/></span>
                <span className="logoName">Groupomania</span>
                </Link>
            </div>

            <div className="topbarCenter">
            </div>
            
            <div className="topbarRight">
                <span className="topbarProfile">
                    <div className="profileImgContainer" title="Aller sur votre page de profil">
                        <NavLink to={`/profile/${user.username}`}>
                            <img className="profileImg" src={user.imageUrl} alt="Accéder à votre profil"/>
                            <span className="usernameName">{user.username}</span>
                        </NavLink>
                    </div>
                <div className="signoutContainer"  title="Se déconnecter">
                    <FontAwesomeIcon className="signoutIcon fa-lg" icon={faSignOutAlt} onClick={signoutHandler}/> 
                </div>
                </span>
            </div>
        </div>
    )
}