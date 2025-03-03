/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import { authDatabase, firebaseData } from "@/app/fireBaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { ref, runTransaction } from "firebase/database";
import { useEffect, useState } from "react";
import { IoMdHeart } from "react-icons/io"
export const ButtonHeart = (props: any) => {
    const { item, className } = props;

    const [isWishlist, setIsWishlist] = useState(false);

    // lưu trữ các bài hát yêu thích
    useEffect(() => {
        onAuthStateChanged(authDatabase, (user) => {
           if (user) {
             const userId = user.uid;
          //    const wishlist = item.wishlist;
             if(item.wishlist[userId]){
                  setIsWishlist(true);
             }
           }
        });
     }, []);

    const handleUpWishlist = () => {
        const userid = authDatabase?.currentUser?.uid; 
        console.log(userid)

        
           
        // thêm  và  bỏ vào danh sách yêu thích
        if (item.id && userid) {
            const SongRef = ref(firebaseData, `/songs/${item.id}`);

            runTransaction(SongRef, (song) => {
                if (song) {
                    if (song.wishlist && song.wishlist[userid]) {
                        song.wishlist[userid] = null;
                        setIsWishlist(false);
                    } else {
                        if (!song.wishlist) {
                            song.wishlist = {};
                        }
                        setIsWishlist(true);
                        song.wishlist[userid] = true;
                    }
                }
                return song;
            })
        }
    }
    return (
        <>
            <button  className={`${className}${isWishlist ? " border-[#00ADEF] bg-[#00ADEF]" : ""}`}>
                <IoMdHeart onClick={handleUpWishlist} />
            </button>
        </>
    )
}