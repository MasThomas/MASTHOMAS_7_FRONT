import "./share.css"
import defaultPicture from "../../assets/default.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera } from "@fortawesome/free-solid-svg-icons"


export default function Share() {
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={defaultPicture} alt="" className="shareProfileImg" />
                    <input 
                        type="text"
                        placeholder="What's in your Mind Thomas ?"
                        className="shareInput" 
                        />
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                        <FontAwesomeIcon className="shareIcon" icon={faCamera} /> 
                        <span className="shareOptionText">Photo or Video</span>
                        </div>
                    </div>
                    <button className="shareButton">Share</button>
                </div>
            </div>
        </div>
    )
}