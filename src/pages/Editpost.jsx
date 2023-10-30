import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import Postform from "../components/Postform/Postform";
import authconfig from "../Appwrite/Config";
import { useNavigate, useParams } from "react-router-dom";


function Editpost() {
    const [post,setpost] = useState([])
    const {url} = useParams()
    const navigate = useNavigate()    

    useEffect(()=>{
        if(url){
            authconfig.getpost(url).then((post)=>setpost(post))
        }else{
            navigate('/')
        }
    },[url,navigate])
    
    return post?(
        <div className="py-8">
            <Container>
                <Postform post={post}/>
            </Container>
        </div>
    ) : null

}


export default Editpost