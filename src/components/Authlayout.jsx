import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function Protected({children, authentication=true}){
    const navigate = useNavigate()
    const [loader,setloader] = useState(true)
    const authstatus = useSelector(state => state.auth.status)

    useEffect(()=>{
        if(authentication && authstatus !== authentication){
            navigate('/login')
        }else if(!authentication && authstatus !== authentication){
            navigate('/')
        }
        children? setloader(false) : ""
        
    },[authstatus, navigate, authentication])

    return loader? <h1>loader....</h1> : <>{children}</>

}