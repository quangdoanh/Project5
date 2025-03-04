"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { CardItem } from "./components/Card/CardItem";
import { SongItem } from "./components/Song/SongItem";
import { Title } from "./components/TitleHeader/Title";
import { firebaseData } from "./fireBaseConfig";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [data2, setData2] = useState<any[]>([]);
  const [data3, setData3] = useState<any[]>([]);

  // Section 1: Fetch songs data
  useEffect(() => {
    const SongRef = ref(firebaseData, 'songs');
    const unsubscribe = onValue(SongRef, (items) => {
      const newData: any[] = [];
      items.forEach((item) => {
        const key = item.key;
        const datafb = item.val();

        onValue(ref(firebaseData, '/singers/' + datafb.singerId[0]), (singer) => {
          const dataSing = singer.val();
          if (newData.length < 3) {
            newData.push({
              id: key,
              img: datafb.image,
              namesong: datafb.title,
              singer: dataSing.title,
              viewer: datafb.listen,
              link: `/song/${key}`,
              audio: datafb.audio,
              wishlist: datafb.wishlist
            });
          }
        });
      });
      setData(newData);
    });

    return () => unsubscribe();
  }, []);

  // Section 2: Fetch categories data
  useEffect(() => {
    const CategoriesRef = ref(firebaseData, 'categories');
    const unsubscribe = onValue(CategoriesRef, (items) => {
      const newData: any[] = [];
      items.forEach((item) => {
        const key = item.key;
        const datafb = item.val();

        if (newData.length < 5) {
          newData.push({
            id: key,
            img: datafb.image,
            title: datafb.title,
            desc: datafb.description,
            link: `categories/${key}`
          });
        }
      });
      setData2(newData);
    });

    return () => unsubscribe();
  }, []);

  // Section 3: Fetch singers data
  useEffect(() => {
    const SingeriesRef = ref(firebaseData, 'singers');
    const unsubscribe = onValue(SingeriesRef, (items) => {
      const newData: any[] = [];
      items.forEach((item) => {
        const key = item.key;
        const datafb = item.val();

        if (newData.length < 5) {
          newData.push({
            id: key,
            img: datafb.image,
            title: datafb.title,
            desc: datafb.description,
            link: `sing/${key}`
          });
        }
      });
      setData3(newData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* Section 1 */}
      <div className="inner-wrap flex gap-[20px] text-white ">
        <div className="inner-left w-[60%] flex items-center gap-[33px] pl-[23px] bg-cover rounded-[15px] pt-[40px]"
          style={{ backgroundImage: "url(/bg-1.png)" }}
        >
          <div className="w-[231px]">
            <h2 className="title text-[32px] font-[700]">Nhạc EDM</h2>
            <p className="desc text-[14px] font-[500]">Top 100 Nhạc Electronic/Dance Âu Mỹ là danh sách 100 ca khúc hot nhất hiện tại của thể loại Top 100 Nhạc Electronic/Dance Âu Mỹ</p>
          </div>
          <div className="h-[321px]">
            <img
              src="/avatar.png"
              alt="EDM"
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="inner-right w-[40%]">
          <Title title="Nghe Nhiều" />
          <div className="box grid grid-flow-col-1 gap-y-[10px]">
            {data.map((item, index) => (
              <SongItem key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
      {/* Section 2 */}
      <div className="inner-wrap text-white my-[30px]">
        <Title title="Nhạc Trẻ" />
        <div className="box grid grid-cols-5 gap-[10px]">
          {data2.map((item, index) => (
            <CardItem key={index} item={item} />
          ))}
        </div>
      </div>
      {/* Section 3 */}
      <div className="inner-wrap text-white my-[30px]">
        <Title title="Ca sĩ nổi bật" />
        <div className="box grid grid-cols-5 gap-[10px]">
          {data3.map((item, index) => (
            <CardItem key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  )
};