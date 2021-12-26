import {React, useState, useRef} from 'react'
import { NavLink } from 'react-router-dom'
import "./comment.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrashAlt, faEllipsisV } from "@fortawesome/free-solid-svg-icons"
import { toast, ToastContainer } from "react-toastify";
import authHeader from '../../authHeader'
import axios from 'axios'

export default function Comment({comment, username, profileImg, commentInfos}) {

    const [toggleIcons, setToggleIcons] = useState(false)
    const [input, setInput] = useState(comment.comment)
    const editCommentInput = useRef();
    const [toggleEditInput, setToggleEditInput] = useState(false)


    const editCommentHandler = async(e) => {
        e.preventDefault();
        try {
            const token = authHeader();
            const newComment = {
                comment: editCommentInput.current.value
            }
            await axios.put('/posts/comment/'+ comment.id, newComment, {headers: token})
            .then(function(res) {
                const validateEditComment = res.data.message
                toast(validateEditComment)
                setTimeout(() => {window.location.reload()}, 2000);
            })
        } catch(error) {
            toast(error.response.data.message)
            setTimeout(() => {window.location.reload()}, 2000);
        }
    }

    const deleteCommentHandler = async(e) => {
        e.preventDefault();
        try {
            const token = authHeader();
            await axios.delete('/posts/comment/'+ comment.id , {headers: token})
                .then(function(res) {
                const validateDeleteComment = res.data.message
                toast(validateDeleteComment)
                setTimeout(() => {window.location.reload()}, 2000);
                })
        } catch(error) {
            toast(error.response.data.message)
        }
    }

    const showIconsHandler = async (e) => {
        setToggleIcons(previousState => !previousState)
    }

    const showEditInputHandler = async (e) => {
        setToggleEditInput(previousState => !previousState)
    }

    return (
    <div className="commentWrapper">
        <div className='commentTop'>
            <div className='commentTopLeft'>
                <span className='userInfos'>
                    <img src={profileImg} alt='profileImg' className="commentProfileImg"></img>
                    <NavLink to={`/profile/${username}`} className="commentUserUsername">{username}</NavLink>
                </span>
            </div>
            <div className="commentTopRight">
            <div className="postOptions" style={{display: toggleIcons ? 'flex' : 'none'}}>
                <button className="editIcon" onClick={showEditInputHandler}>
                    <FontAwesomeIcon icon={faEdit}/> 
                </button>
                <button className="deleteIcon" onClick={deleteCommentHandler}>
                    <FontAwesomeIcon icon={faTrashAlt}/>
                </button>
            </div>
            <div className="toggleIconsContainer">
                <button className="toggleIcons" onClick={showIconsHandler}>
                    <FontAwesomeIcon icon={faEllipsisV}/>
                </button>
            </div>
            </div>
        </div>
        <div className='commentText'>
            <p style={{display: toggleEditInput ? 'none' : 'flex'}}>{comment.comment}</p>
            <form className="editComment" onSubmit={editCommentHandler} style={{display: toggleEditInput ? 'flex' : 'none'}}>
                <input className='editCommentInput' ref={editCommentInput} type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
                <button type='submit' className='submitEditButton'>Valider</button>
            </form>
        </div>
        <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />
    </div>
    )
}