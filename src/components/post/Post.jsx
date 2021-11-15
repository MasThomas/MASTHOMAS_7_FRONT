import "./post.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons"
import {Users} from "../../dummyData"

export default function Post({post}) {
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className="postProfileImg" src={Users.filter(u => u.id === post.userId)[0].profilePicture} alt="" />
                        <span className="postUsername">{Users.filter(u => u.id === post.userId)[0].username}</span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                    <FontAwesomeIcon className="moreIcon" icon={faEllipsisV} /> 
                    </div>
                </div>

                <div className="postCenter">
                    <span className="postTitle">{post.title}</span>
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={post?.photo} alt="" />
                </div>

                <div className="postBottom">
                    <div className="postBottomRight">
                        <div className="postCommentText">{post.comment} Comments</div>
                    </div>
                </div>
            </div>
        </div>
    )
};