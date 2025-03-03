/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { CardSong } from "@/app/components/Card/CardSong";
import { authDatabase, firebaseData } from "@/app/fireBaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
export const WishList = () => {

    const [dataFinal, setDataFinal] = useState<any>(null);
    useEffect(() => {
        onAuthStateChanged(authDatabase, (user) => {
            if (user) {
                const userId = user.uid;
                const dataSection1: any[] = [];

                const fetchData = async () => {
                    const items = await get(ref(firebaseData, 'songs'));
                    items.forEach((item: any) => {
                        const key = item.key;
                        const data = item.val();
                        const wishlist = data.wishlist
                        if (wishlist && wishlist[userId]) {
                            dataSection1.push(
                                {
                                    id: key,
                                    img: data.image,
                                    title: data.title,
                                    singer: "",
                                    link: `/song/${key}`,
                                    time: "4:32",
                                    singerId: data.singerId,
                                    audio: data.audio,
                                    wishlist: data.wishlist
                                }
                            );
                        }
                    })

                    for (const item of dataSection1) {
                        const itemSinger = await get(ref(firebaseData, '/singers/' + item.singerId[0]));
                        const dataSinger = itemSinger.val();
                        item.singer = dataSinger.title;
                    }

                    setDataFinal(dataSection1);
                }

                fetchData();

            }
        });
    }, []);
    return (
        <>
            <div className="box">
                {dataFinal && (
                    <>
                        {dataFinal.map((item: any, index: number) => (
                            <CardSong key={index} item={item} />
                        ))}
                    </>
                )}
            </div>
        </>
    )
}