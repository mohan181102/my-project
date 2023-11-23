import React, { useState, useEffect } from "react";
import Postcard from "../components/Poscard";
import authconfig from "../Appwrite/Config";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../store/postslice";

function Allpost() {
    const [post, setpost] = useState([])
    const dispatch = useDispatch()
    
    async function loadpost(){
        await authconfig.allpost().then((value)=>{
            dispatch(Post(value.documents))
        })
    }
    loadpost()
    const select = useSelector((state)=>state.POST.userdata)
    console.log(select)
    console.log(post)
    useEffect(() => { }, [])

    // authconfig.allpost().then((pos) => {
    //     if (pos) {
    //         setpost(pos.documents)
    //     }
    // })

    if(select!=[]){
     return(
        <div className={`w-full py-8`}>
            <Container>
                <div className={`flex flex-wrap`}>
                    {select.map((pos) => (

                        <div key={pos.$id} className={`p-2 w-1/4`}>
                            <Postcard {...pos} />
                        </div>

                    ))
                    }
                </div>
            </Container>

        </div>
     )
    } else { return (<h2>'post something'</h2>)}

}

export default Allpost