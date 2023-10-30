import React from "react";
import { useCallback } from "react";
import {appendErrors, useForm} from 'react-hook-form'
import Button from "../Buttn";
import Input from "../Input";
import Select from "../Select";
import RTE from "../RTE";
import authconfig from "../../Appwrite/Config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { findNonSerializableValue } from "@reduxjs/toolkit";


function Postform({post}){

    const {register, handlesubmit, watch, setvalue, control, getvalue} = useForm({
        defaultValues:{
            title:post?.title||'',
            slug:post?.slug||'',
            content:post?.content||'',
            status:'active'
        }
    })
    const navigate = useNavigate()
    const userData = useSelector((state)=>state.user.userdata)

    const submit = async (data) => {
        if(post){
            const file = data.image[0]? authconfig.uploadfile(data.image[0]) : null
            if(file) authconfig.deletepost(post.featuredimage)  
            
            const dbpost = await authconfig.postupdate(post.$id,{...data, featuredimage: file? file.$id : 'undifiend' })

            if(dbpost){
                navigate(`/post/${dbpost.$id}`)
            }
        }
        else{
            const elsefile = await authconfig.uploadfile(data.image[0]);

            if(elsefile){
                const fileid = elsefile.$id
                data.featuredimage = fileid
                const dbpost = await authconfig.postcreate({
                    ...data,
                    userID:userData.$id,
                })

                if(dbpost) {
                    navigate(`/post/${dbpost.$id}`)
                }
            }
        }

    }

    const slugTransform = useCallback((value)=>{
        if(value && typeof value === 'string')
            return value
            .trim()
            .toLowerCase()
            .replace(/^[a-zA-Z\d\s]+/g, '-')
            
        else return ' '


    },[])

    React.useEffect(()=>{
        const subscription = watch((value,{name})=>{
            if(name=='title'){
                setvalue('slug',slugTransform(value.title,{shouldValidate:true}))
            }
        })

    },[watch,slugTransform,setvalue])

    return (
        <form onSubmit={handlesubmit(submit)} className={`flex flex-wrap `} >
            <div className={`w-2/3 px-2`}>
                <Input
                label='Title'
                className='mb-4 '
                {...register('title',{
                    required:true,

                })}
                />

                <Input
                label='slug'
                placeholder='Slug'
                className='mb-4'
                {...register('slug',{
                    required:true,
                })}
                onInput={(e)=>{
                    setvalue('slug', slugTransform(e.currentTarget.value),{
                        shouldValidate:true
                    })
                }}
                />

                <RTE
                label='content: '
                name='content'
                control={control}
                defaultvalue={getvalue('content')}
                />

            </div>

            <div className={`w-1/3 px-2`}>
                <Input
                label='Featured image :'
                type='file'
                className='mb-4'
                accept='image/png, image/jpg, image/jpeg image/gif'
                {...register('image',{required:!post})}
                />
                
                {post && (
                    <div className="w-full mb-4">
                        <img
                        src={authconfig.getfile(post.featuredimage)}
                        alt={post.title}
                        className="rounded-lg"
                        />

                    </div>
                )}

                <Select
                options={['active','inactive']}
                label='status'
                className='mb-4'
                {...register('status',{required:true})}
                />

                <Button type="submit" bgcolor={post? 'bg-green-500':undefined}
                className="w-full"
                > {post?'Update':'Submit'}</Button>
            </div>


        </form>

    )


}

export default Postform