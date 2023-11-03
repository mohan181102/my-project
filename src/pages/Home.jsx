import React, { useEffect, useState } from "react";
import authconfig from "../Appwrite/Config";
import Container from "../components/Container";
import Postcard from "../components/Poscard";



function Home(){
    const [post,setpost] = useState([])

    useEffect(()=>{
        authconfig.allpost().then((post)=>{
            if(post){
                setpost(post.documents)
            }
        })
    },[])

    if(post.length==0){
        return(
            <div className={`w-full py-8 mt-4 text-center`}>
                <Container >
                    <div className={`flex flex-wrap `}>
                        <div className="py-2 w-full ">
                            <h1 className="text-2xl font-bold hover:text-gray-200">
                                Login to read posts
                            </h1>
                        
                        </div>
                    </div>

                </Container>
                
            </div>
            
        )
    }
    else{
    return(
            <div className="w-full py-8 ">
                <Container>
                    <div className="flex flex-wrap">
                        {post.map((post)=>{
                            <div className="p-2 w-1/4" key={post.$id}>
                                <Postcard {...post}/>
                            </div>
                        })}
                    </div>
                </Container>
            </div>
        )
    }
}


export default Home