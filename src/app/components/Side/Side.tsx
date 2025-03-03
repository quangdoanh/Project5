"use client"

/* eslint-disable jsx-a11y/alt-text */
import Link from "next/link"
import { MenuItem } from "./Menu/menu"


/* eslint-disable @next/next/no-img-element */
export const Side = () => {

  
  return (
    <>
      <div className="bg-[#212121] h-[100vh] fixed w-[280px]">
        <div className="logo w-[280px] h-[92px] py-[25px] px-[20px] bg-[#1C1C1C] ">
          <Link href="/">
            <img
              src="/Logo.svg"
              alt="Logo"
              className="w-auto h-100%"
            />
          </Link>
        </div>
        {/* Menu */}
        <MenuItem />
      </div>
    </>
  )
}