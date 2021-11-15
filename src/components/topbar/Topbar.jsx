import "./topbar.css"
import logo from "../../assets/icon.png"
import defaultPicture from "../../assets/default.png"

export default function Topbar() {
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logoPngContainer"><img className="logoPng" src={logo} alt="Logo Groupomania"/></span>
                <span className="logoName">Groupomania</span>
            </div>

            <div className="topbarCenter">
            </div>
            
            <div className="topbarRight">
                <span className="topbarProfile">
                    <div className="profileImgContainer">
                        <img className="profileImg" src={defaultPicture} alt="Accéder à votre profil"/>
                    </div>
                </span>
            </div>
        </div>
    )
}