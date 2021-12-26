import "./post.css"
import Comment from "../comment/Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrashAlt, faEllipsisV } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js'
import fr from 'timeago.js/lib/lang/fr';
import {Link} from "react-router-dom"
import authHeader from "../../authHeader";
import { toast, ToastContainer } from "react-toastify";
timeago.register('fr', fr);


export default function Post({post}) {
    const [user, setUser] = useState({});
    const comment = useRef()
    const [toggleComments, setToggleComments] = useState(false)
    const [toggleIcons, setToggleIcons] = useState(false)
    const [toggleEditInput, setToggleEditInput] = useState(false)
    const editPostInput = useRef();
    const [input, setInput] = useState(post.content)
    
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users/profils/id/${post.User.id}`, { headers: authHeader()});
            setUser(res.data)
        };

        fetchUser();
    },[post])

    const comments = post.Comments.map(comment => <Comment key={comment.id} comment={comment} username={comment.User.username} profileImg={comment.User.imageUrl} />)

    const showCommentsHandler = async (e) => {
        setToggleComments(previousState => !previousState)
    }

    const showIconsHandler = async (e) => {
        setToggleIcons(previousState => !previousState)
    }

    const commentSubmitHandler = async (e) => {
        e.preventDefault()
        if(comment === "") {
            toast('Veuillez indiquer un commentaire valide')
        } else {
            try {
                const token = authHeader();
                const newComment = {
                    comment : comment.current.value,
                    UserId: user.id, 
                    PostId: post.id
                }
                await axios.post('/posts/comment/'+ post.id, newComment, {headers: token})
                .then(function(res) {
                    const validateComment = (res.data.message)
                    toast(validateComment)
                    setTimeout(() => {window.location.reload()}, 2000)
                })
            } catch(error){
                toast(error)
            }
        }
    }


    const showEditInputHandler = async (e) => {
        setToggleEditInput(previousState => !previousState)
    }

    const editPostHandler = async(e) => {
        e.preventDefault();
        try {
            const token = authHeader();
            const newPost = {
                content : editPostInput.current.value
            }
            await axios.put('/posts/'+ post.id, newPost, {headers: token})
            .then(function(res) {
                const validateEditPost = res.data.message
                toast(validateEditPost)
                setTimeout(() => {window.location.reload()}, 2000);
            })
        } catch(error) {
            toast(error.response.data.message)
            setTimeout(() => {window.location.reload()}, 2000);
        }
    }

    const deletePostHandler = async(e) => {
        e.preventDefault();
        try {
            const token = authHeader();
            await axios.delete('/posts/'+ post.id , {headers: token})
                .then(function(res) {
                const validateDeletePost = (res)
                toast(validateDeletePost)
                setTimeout(() => {window.location.reload()}, 2000);
                })
        } catch(error) {
            toast(error.response.data.message)
        }
    }



    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link className="postTopLeft" to={`/profile/${user.username}`}>
                            <img className="postProfileImg" src={user.imageUrl} alt="" />
                        </Link>
                        <Link className="postTopLeft" to={`/profile/${user.username}`}>
                            <span className="postUsername">{user.username}</span>
                            <span className="postUserRole">{user.companyRole}</span>
                        </Link>
                        <span className="postDate"><TimeAgo datetime={new Date(post.createdAt)} locale='fr'/></span>
                    </div>
                    <div className="postTopRight">
                        <div className="postOptions" style={{display: toggleIcons ? 'block' : 'none'}}>
                            <button className="editIcon" onClick={showEditInputHandler}>
                                <FontAwesomeIcon icon={faEdit}/> 
                            </button>
                            <button className="deleteIcon" onClick={deletePostHandler}>
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

                <div className="postCenter">
                    <div className="postText" style={{display: toggleEditInput ? 'none' : 'flex'}}>{post?.content}</div>
                    <form className="editPost" onSubmit={editPostHandler} style={{display: toggleEditInput ? 'flex' : 'none'}}>
                        <input className='editPostInput' ref={editPostInput} type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
                        <button type='submit' className='submitEditButton'>Valider</button>
                    </form>
                    <img className="postImg" src={post?.imageUrl} alt="" />
                </div>

                <div className="postBottom">
                    <div className="postBottomRight">
                        <div className="postCommentText" onClick={showCommentsHandler}>{post.Comments.length === 0 ? 'Aucun commentaire à afficher' : `${toggleComments ? `Cacher` : `Afficher`} ${post.Comments.length} ${post.Comments.length > 1 ? `commentaires` : `commentaire`}`}</div>
                    </div>
                </div>
            </div>
            <div className="commentContainer" style={{display: toggleComments? 'block' : 'none'}}>
                {comments}
            </div>
            <div className="addComment">
                <form className="commentInput" onSubmit={commentSubmitHandler} >
                    <input type="text" className="shareInput" placeholder="Ajouter un commentaire" ref={comment}/>
                    <button className="shareButton" type="submit">Envoyer le commentaire</button>
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
};