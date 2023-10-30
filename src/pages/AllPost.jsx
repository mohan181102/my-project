import React, {useState,useEffect} from "react";
import Postcard from "../components/Poscard";
import authconfig from "../Appwrite/Config";
import { Container } from "postcss";

function Allpost(){
    const [post,setpost] = useState([])
    useEffect(()=>{},[])
    authconfig.allpost().then((post)=>setpost(post.documents))

    return(
        <div className={`w-full py-8`}>
            <Container>
                <div className={`flex flex-wrap`}>
                    {post.map((post)=>(
                        <div key={post.$id} className={`p-2 w-1`}>
                            <Postcard post={post}/>
                        </div>
                    ))}
                </div>
            </Container>

        </div>
    )

}

export default Allpost