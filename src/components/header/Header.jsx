import React from "react";
import Container from "../Container";
import Logo from "../Logo";
import Logoutbtn from "./Logoutbtn";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
   const authstatus = useSelector((state) => state.auth.status)
   const navigate = useNavigate()
   const navitem = [
      {
         name: 'Home',
         slug: '/',
         active: true
      },
      {
         name: 'Login',
         slug: '/login',
         active: !authstatus
      },
      {
         name: 'Singup',
         slug: '/singup',
         active: authstatus
      },
      {
         name: 'All post',
         slug: '/allpost',
         active: authstatus
      },
      {
         name: 'Add Post',
         slug: '/add-post',
         active: authstatus,
      }
   ]



   return (
      <>
         <header className='py-3 shadow bg-gray-400' >
            <Container>
               <nav className='flex'>
                  <div className='mr-4'>
                     <Link to='/'>
                        <Logo/>
                     </Link>
                  </div>

                  <ul className='flex ml-auto'>
                     {navitem.map((item)=>
                        item.active? (
                           <li key={item.name}>
                              <button onClick={()=>navigate(item.slug)}
                              className='inline-block px-6 py-2 duration-150 rounded-full'
                              >
                                 {item.name}
                              </button>
                           </li>
                        ): null
                     )}

                     {authstatus && (
                        <li>
                           <Logoutbtn/>
                        </li>
                     )}
                  </ul>
               </nav>

            </Container>

         </header>
      </>
   )
}

export default Header