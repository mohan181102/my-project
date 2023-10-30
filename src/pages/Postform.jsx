import React from "react";
import Postform from "../components/Postform/Postform";
import { Container } from "postcss";


function AddPost(){
    return(
        <div className={`py-8`}>
            <Container>
                <Postform/>
            </Container>
        </div>
    )
}

export default AddPost