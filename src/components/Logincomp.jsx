import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as storelogin } from "../store/authslice";
import Button from "./Buttn";
import Input from "./Input";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import authservice from "../Appwrite/Auth";
import {useForm} from 'react-hook-form';


function Login(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error,seterror] = useState(null)

    const login = async(data)=>{
        seterror('')
        try {
            const sesion = await authservice.login(data)
            if (sesion){
                const userdata = await authservice.getcurrentuser()
                if (userdata) (dispatch(storelogin(userdata)))
                navigate('/')

            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div
        className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black`}>
                <div className={`mb-2 flex justify-center`}>
                    <span className={`inline-block w-full max-w-[100px]`}>
                        <Logo width="100%"/>
                    </span>
                </div>

                {/* form start from here */}

                <form onSubmit={handleSubmit(login)} className={`mt-8 `}>
                    <div >
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        className='mb-4'
                        {...register('email',{required:true
                        })}/>

                        {/* password */}

                        <Input label="Password: " type='password'  className='mb-4' placeholder='Enter password'
                        {...register("password",{required:true,})}
                        />

                        <Button children={'Sign in'} className='cursor-pointer' type="submit"/>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Login