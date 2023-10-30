import React from "react";
import { useDispatch } from "react-redux";
import authservice from "../../Appwrite/Auth";
import { logout } from "../../store/authslice";


function Logoutbtn(){
    
    const dispatch = useDispatch()
    const logoutbtn = ()=>{
        authservice.Logout().then(()=>{
            dispatch(logout())
        })
    }
    return (
        <div className='inline-block px-6 py-2 duration-150 hover:bg-blue-200 rounded-full'>
        Logout</div>
    )
}

export default Logoutbtn