import "./share.css"
import defaultPicture from "../../assets/default.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera, faWindowClose } from "@fortawesome/free-solid-svg-icons"
import { AuthContext } from "../../context/AuthContext"
import { useContext, useRef, useState } from "react"
import axios from "axios"

export default function Share() {

    const {user} = useContext(AuthContext)
    const description = useRef();
    let userInformations = JSON.parse(localStorage.getItem('user'));
    const token = userInformations.token;

    const [file, setFile] = useState(null)

    const submitHandler = async (e) => {
        e.preventDefault()

        const newPost = {
            userId : user.userId,
            content : description.current.value,
            imageUrl : ""
        }

        if(file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("file", file);
            data.append("name", fileName);
            newPost.imageUrl = fileName;
            console.log(newPost)
            try {
                await axios.post('/images', data)
            } catch(err) {
                console.log(err)
            }
        };
        console.log(newPost)
        try {
            await axios.post('/posts/', newPost, { headers: {"Authorization" : `Bearer ${token}`} });
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.imageUrl ? user.imageUrl : defaultPicture} alt="" className="shareProfileImg" />
                            <input 
                            type="text"
                            placeholder={"Que souhaitez-vous partager " + user.username + "?" }
                            className="shareInput" 
                            ref={description}
                            />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)} alt=""/>
                        <FontAwesomeIcon className="shareCancelImg" icon={faWindowClose} onClick={() => setFile(null)} /> 
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <label htmlFor="file" className="shareOptions">
                        <div className="shareOption">
                        <FontAwesomeIcon className="shareIcon" icon={faCamera} /> 
                        <span className="shareOptionText">Ajouter une Photo</span>
                        <input style={{display:"none"}} type="file" id="file" accept=".png,.jpg,.jpeg,.gif" onChange={(e) =>setFile(e.target.files[0])} />
                        </div>
                    </label>
                    <button className="shareButton" type="submit">Partager</button>
                </form>
            </div>
        </div>
    )
}