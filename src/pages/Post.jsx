import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import authconfig from '../Appwrite/Config';
import { Container } from 'postcss';
import Button from '../components/Buttn';


export default function Post(){
    const [post,setpost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    const userData = useSelector((state)=>state.auth.userdata);
    
    const isauthor = post && userData ? post.userId === userData.$id :false;

    useEffect(()=>{
        if(slug){
            authconfig.getpost(slug).then((post)=>{
                if(post) setpost(post);
                else navigate('/');
            })
        }else navigate('/')
    },[slug,navigate]);

    return post? (
        <div className='py-8'>
            <Container>
                <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
                    <img className='rounded-xl'
                    src={authconfig.getfile(post.featuredimage)}
                    alt={post.title}
                    />

                    {isauthor && (
                        <div className='absolute right-6 top-6'>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgcolor='bg-red-400' onClick={deletePost}>
                                    Delete
                                </Button>
                            </Link>
                        </div>
                    )}
                    <div className='w-full mb-6'>
                        <h1 className='text-2xl font-bold'>{post.title}</h1>
                    </div>

                </div>
                
            </Container>
        </div>
    ):null
}