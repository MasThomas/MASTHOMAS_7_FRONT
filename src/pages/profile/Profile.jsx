import "./profile.css"
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/Sidebar";
import defaultPicture from "../../assets/default.png"

export default function Profile() {
    return (
        <>
            <Topbar/>
            <div className="profile">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profilePictureImg" src={defaultPicture} alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoUsername">My UserName</h4>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed/>
                    </div>
                </div>
            </div>
        </>
    )
}