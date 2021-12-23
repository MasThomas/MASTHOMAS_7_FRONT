import "./share.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera, faWindowClose } from "@fortawesome/free-solid-svg-icons"
import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import authHeader from "../../authHeader"
import { toast, ToastContainer } from "react-toastify";
import FormData from "form-data"

export default function Share() {

    const { user } = useContext(AuthContext)
    const content = useRef();

    const [file, setFile] = useState(null)

    const submitHandler = async (e) => {
        e.preventDefault()

        const form = new FormData();
        form.append("UserId", user.userId)

        if(!file && !((content.current.value).length > 2)) {
            toast("Vous ne pouvez pas poster un message vide ou trop court !")
        } else {
            if(file) {
                const fileName = Date.now() + file.name
                form.append("name", fileName)
                form.append("file", file)
            }
            if((content.current.value).length > 2) {
                form.append("content", content.current.value)
            }
            try {
                await axios.post("/posts/", form, {headers: authHeader(), "Content-type" : "multipart/form-data"});
                toast("Post créé avec succès !" )
                setTimeout(() => {
                    window.location.reload()
                }, 2000); ;
            } catch(error) {
                toast(error.response.data.message)
            
            }
        }
    }


    return (
        <div className="share">
            <div className="shareWrapper">
                <form className="shareBottom" onSubmit={submitHandler} encType="multipart/form-data">
                    <div className="shareTop">
                        <img src={user.imageUrl} alt="" className="shareProfileImg" />
                        <input type="text" placeholder={"Que souhaitez-vous partager " + user.username + "?" } className="shareInput" ref={content}/>
                    </div>
                    <hr className="shareHr" />
                    {file && (
                        <div className="shareImgContainer">
                            <img className="shareImg" src={URL.createObjectURL(file)} alt=""/>
                            <FontAwesomeIcon className="shareCancelImg" icon={faWindowClose} onClick={() => setFile(null)} /> 
                        </div>
                    )}
                    <label htmlFor="file" className="shareOptions">
                        <div className="shareOption">
                            <FontAwesomeIcon className="shareIcon" icon={faCamera} /> 
                            <span className="shareOptionText">Ajouter une Image</span>
                            <input style={{display:"none"}} type="file" id="file" accept=".png,.jpg,.jpeg,.gif" onChange={(e) =>setFile(e.target.files[0])} />
                        </div>
                    </label>
                    <button className="shareButton" type="submit">Partager</button>
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