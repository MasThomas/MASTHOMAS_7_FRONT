import "./post.css"
import defaultPicture from "../../assets/default.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react";
import axios from "axios";
import TimeAgo from 'timeago-react';
import {Link} from "react-router-dom"



export default function Post({post}) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/api/users?=${post.userId}`);
            console.log(res)
            setUser(res.data)
        };
        fetchUser();
    },[post.userId])

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link className="postTopLeft" to={`profile/${user.username}`}>
                            <img className="postProfileImg" src={user.imageUrl || defaultPicture} alt="" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate"><TimeAgo date={post.createdAt}/></span>
                    </div>
                    <div className="postTopRight">
                    <FontAwesomeIcon className="moreIcon" icon={faEllipsisV} /> 
                    </div>
                </div>

                <div className="postCenter">
                    <span className="postTitle">{post.title}</span>
                    <span className="postText">{post?.content}</span>
                    <img className="postImg" src={post?.imageUrl} alt="" />
                </div>

                <div className="postBottom">
                    <div className="postBottomRight">
                        <div className="postCommentText">{post.comment} Commentaires</div>
                    </div>
                </div>
            </div>
        </div>
    )
};