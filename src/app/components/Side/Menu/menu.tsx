/* eslint-disable react/jsx-key */
"use client"



import { FaHeart, FaMusic, FaSignOutAlt, FaUser, FaUserPlus } from "react-icons/fa"
import { SiAirplayaudio } from "react-icons/si"
import { TiHome } from "react-icons/ti"
// import { usePathname } from "next/navigation";

import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { authDatabase } from "@/app/fireBaseConfig";
import { Item } from "./Item"


export const MenuItem = () => {

   const [isLogin, setLogin] = useState<boolean>();
   useEffect(() => {
      onAuthStateChanged(authDatabase, (user) => {
         if (user) {
            setLogin(true)
         } else {
            setLogin(false)
         }
      });
   }, []);

   console.log(isLogin)

   

   const menu = [

      {
         icon: <TiHome />,
         title: 'Trang chủ',
         href: '/'
      },
      {
         icon: <FaMusic />,
         title: 'Danh mục bài hát',
         href: '/categories'
      },
      {
         icon: <SiAirplayaudio />,
         title: 'Ca sĩ',
         href: '/sing'
      },
      {
         icon: <FaHeart />,
         title: 'Bài hát yêu thích',
         href: '/whislist',
         isLogin:true
      },
      {
         icon: <FaSignOutAlt />,
         title: 'Đăng xuất',
         href: '/logout',
         isLogin:true
      },
      {
         icon: <FaUser />,
         title: 'Đăng nhập',
         href: '/login',
         isLogin:false
      },
      {
         icon: <FaUserPlus />,
         title: 'Đăng ký ',
         href: '/register',
         isLogin:false
      }
   ]




   return (
      <>
         <nav className="menu">
            <ul className="">
               {menu.map((item, index) => (
                  <Item item = {item} isLogin = {isLogin} key = {index}/>
               ))}
            </ul>
         </nav>
      </>
   )
}