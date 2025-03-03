"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
import { authDatabase } from "@/app/fireBaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        signOut(authDatabase).then(function() {
             router.push("/login")
          }).catch(function(error) {
            console.log(error)
          });
    },[])
  return (
      <>
       
      </>
  );
} 