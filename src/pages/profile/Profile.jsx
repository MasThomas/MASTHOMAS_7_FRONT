import "../../assets/reset.css"
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/Sidebar";
import defaultPicture from "../../assets/default.png"
import "./profile.css"
import {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {

    const [user, setUser] = useState({});
    const username = useParams().username;


    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users/profile?username=${username}`);
            console.log(res)
            setUser(res.data)
        };
        fetchUser();
    },[username])

    return (
        <>
            <Topbar/>
            <div className="profile">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profilePictureImg" src={user.imageUrl ? user.imageUrl : defaultPicture} alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoUsername">{user.username}</h4>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                    </div>
                </div>
            </div>
        </>
    )
}