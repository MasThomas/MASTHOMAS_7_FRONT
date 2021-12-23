import React from 'react'
import { NavLink } from 'react-router-dom'
import "./comment.css"

export default function Comment({comment, username, profileImg}) {
    return (
    <div className="commentWrapper">
        <span className='userInfos'>
            <img src={profileImg} alt='profileImg' className="commentProfileImg"></img>
            <NavLink to={`/profile/${username}`} className="commentUserUsername">{username}</NavLink>
        </span>
            {comment}
    </div>
    )
}