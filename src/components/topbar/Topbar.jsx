import "./topbar.css"
import logo from "../../assets/icon.png"
import defaultPicture from "../../assets/default.png"
import {Link} from "react-router-dom"
import { useContext } from "react"
import { AuthContext} from "../../context/AuthContext"

export default function Topbar() {
    
    const {user} = useContext(AuthContext);


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
                    <div className="profileImgContainer">
                        <Link to={`profile/${user.username}`}>
                            <img className="profileImg" src={user.imageUrl ? user.imageUrl : defaultPicture} alt="Accéder à votre profil"/>
                        </Link>
                    </div>
                </span>
            </div>
        </div>
    )
}