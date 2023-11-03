import React, {useState,useEffect} from "react";
import Postcard from "../components/Poscard";
import authconfig from "../Appwrite/Config";
import Container from "../components/Container";
function Allpost(){
    const [post,setpost] = useState([])
    useEffect(()=>{},[])
    authconfig.allpost().then((pos)=>{
        if(pos){
            {setpost(pos.documents)}
        }
    })

    return(
        <div className={`w-full py-8`}>
            <Container>
                <div className={`flex flex-wrap`}>
                    {post.map((pos)=> (
                        <div key={pos.$id} className={`p-2 w-1/4`}>
                            <Postcard {...pos}/>
                        </div>
                    ))}
                </div>
            </Container>

        </div>
    )

}

export default Allpost