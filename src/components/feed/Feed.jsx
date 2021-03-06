import { useState, useEffect } from "react"; 
import "./feed.css"
import Share from "../share/Share"
import Post from "../post/Post"
import axios from "axios"
import authHeader from "../../authHeader";

export default function Feed({username}) {
    
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = username 
            ? await axios.get("/posts/wall/"+ username, {headers : authHeader()})
            : await axios.get("/posts/", {headers: authHeader()})
            setPosts(res.data.sort((p1,p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt); 
            }));
        };
        fetchPosts();
    },[username])

    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share/>
                {posts.map((p) => (
                    <Post key={p.id} post={p}/>
                ))}
            </div>
        </div>
    )
}