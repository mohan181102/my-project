import React, { useState, useEffect } from "react";
import Postcard from "../components/Poscard";
import authconfig from "../Appwrite/Config";
import Container from "../components/Container";
import { useSelector } from "react-redux";


function Allpost() {
    const [post, setpost] = useState([])
    const select = useSelector((state)=>state.POST.userdata)
    console.log(select)
    useEffect(() => { }, [])

    // authconfig.allpost().then((pos) => {
    //     if (pos) {
    //         setpost(pos.documents)
    //     }
    // })

    // SECOND APPROCH




    return select ? (
        <div className={`w-full py-8`}>
            <Container>
                <div className={`flex flex-wrap`}>
                    {select.map((pos) => (

                        <div key={pos.$id} className={`p-2 w-1/4`}>
                            <Postcard {...pos} />
                        </div>

                    ))}
                </div>
            </Container>

        </div>
    ) : 'post something'

}

export default Allpost