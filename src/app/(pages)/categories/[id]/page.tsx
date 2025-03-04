"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react"; // Thêm useEffect và useState
import { CardHeader } from "@/app/components/Card/CardHeader";
import { CardSong } from "@/app/components/Card/CardSong";
import { Title } from "@/app/components/TitleHeader/Title";
import { firebaseData } from "@/app/fireBaseConfig";
import { onValue, ref } from "firebase/database";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Web nghe nhạc trực tuyến",
//   description: "Website nghe nhạc online",
// };

export default function CategoriesDetailPage(props: any) {
  const { id } = props.params;

  // Sử dụng useState để lưu trữ dữ liệu
  const [data, setData] = useState<any[]>([]);
  const [data1, setData1] = useState<any[]>([]);

  // Sử dụng useEffect để fetch dữ liệu từ Firebase
  useEffect(() => {
    // Fetch dữ liệu category
    const categoryRef = ref(firebaseData, '/categories/' + id);
    const unsubscribeCategory = onValue(categoryRef, (item) => {
      const datafb = item.val();
      const newData = [{
        img: datafb.image,
        title: datafb.title,
        desc: datafb.description,
      }];
      setData(newData); // Cập nhật state data

      // Fetch dữ liệu songs
      const songsRef = ref(firebaseData, '/songs');
      const unsubscribeSongs = onValue(songsRef, (song) => {
        const newData1: any[] = [];
        song.forEach((item1) => {
          const dataSong = item1.val();
          const key = item1.key;

          if (dataSong.categoryId === id) {
            // Fetch dữ liệu singer
            const singerRef = ref(firebaseData, '/singers/' + dataSong.singerId[0]);
            const unsubscribeSinger = onValue(singerRef, (singer) => {
              const dataSing = singer.val();
              newData1.push({
                id: key,
                img: dataSong.image,
                namesong: dataSong.title,
                singer: dataSing.title,
                viewer: dataSong.listen,
                link: `/song/${key}`,
                audio: dataSong.audio,
                wishlist: dataSong.wishlist,
              });
              setData1([...newData1]); // Cập nhật state data1
            });

            return () => unsubscribeSinger(); // Hủy đăng ký lắng nghe singer
          }
        });
      });

      return () => unsubscribeSongs(); // Hủy đăng ký lắng nghe songs
    });

    return () => unsubscribeCategory(); // Hủy đăng ký lắng nghe category
  }, [id]); // Dependency array với id để fetch lại dữ liệu khi id thay đổi

  return (
    <>
      {/* Section-1 */}
      <div className="inner-wrap flex mb-[30px] items-center gap-[20px]">
        {data.map((item, index) => (
          <CardHeader key={index} item={item} />
        ))}
      </div>

      {/* Section2 */}
      <div className="inner-wrap">
        <Title title="Danh sách bài hát" />
        <div className="box">
          {data1.map((item, index) => (
            <CardSong key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}