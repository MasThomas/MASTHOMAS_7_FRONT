import React from 'react'

export default function Comment({comment, username}) {
    return (
    <div className="commentWrapper">
        {username}
        {comment}
    </div>
    )
}
