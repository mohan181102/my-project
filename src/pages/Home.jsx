import React, { useEffect, useState } from "react";
import authservice from "../Appwrite/Auth";
import Container from "../components/Container";



function Home(){
    const [user,setuser] = useState('')

    useEffect(()=>{
         authservice.getcurrentuser().then((value)=>{
            if(value){
                setuser(value.name)            
            }
        })
    },[])

    if(user==''){
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
    
    return(
            
            <div className="w-full py-8 text-center">
                <Container>
                    <div className="flex flex-wrap w-full">
                        <h1 className={`text-2xl font-bold hover:text-gray-200 w-full items-center`}>
                            Welcome {user}&#128591;
                        </h1>               
                    </div>
                </Container>
            </div>
    )
    
}


export default Home