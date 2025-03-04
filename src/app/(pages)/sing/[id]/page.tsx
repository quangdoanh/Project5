"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
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

export default function SingDetailPage(props: any) {
  const { id } = props.params;

  // Sử dụng useState để lưu trữ dữ liệu
  const [data, setData] = useState<any[]>([]);
  const [data1, setData1] = useState<any[]>([]);

  // Sử dụng useEffect để fetch dữ liệu từ Firebase
  useEffect(() => {
    // Fetch dữ liệu của ca sĩ
    const singerRef = ref(firebaseData, '/singers/' + id);
    const unsubscribeSinger = onValue(singerRef, (item) => {
      const datafb = item.val();
      const newData = [{
        img: datafb.image,
        title: datafb.title,
        desc: datafb.description,
      }];
      setData(newData); // Cập nhật state data

      // Fetch dữ liệu bài hát của ca sĩ
      const songsRef = ref(firebaseData, '/songs');
      const unsubscribeSongs = onValue(songsRef, (song) => {
        const newData1: any[] = [];
        song.forEach((item1) => {
          const dataSong = item1.val();
          const key = item1.key;

          // Kiểm tra xem bài hát có thuộc về ca sĩ này không
          if (dataSong.singerId.includes(id)) {
            newData1.push({
              id: key,
              img: dataSong.image,
              namesong: dataSong.title,
              singer: datafb.title,
              link: `/song/${key}`,
              audio: dataSong.audio,
              wishlist: dataSong.wishlist,
            });
          }
        });

        // Cập nhật state data1
        setData1(newData1);
      });

      // Hủy đăng ký lắng nghe khi component unmount
      return () => unsubscribeSongs();
    });

    // Hủy đăng ký lắng nghe khi component unmount
    return () => unsubscribeSinger();
  }, [id]); // Dependency array với id để fetch lại dữ liệu khi id thay đổi

  return (
    <>
      {/* Section 1: Hiển thị thông tin ca sĩ */}
      <div className="inner-wrap flex mb-[30px] items-center gap-[20px]">
        {data.map((item, index) => (
          <CardHeader key={index} item={item} />
        ))}
      </div>

      {/* Section 2: Hiển thị danh sách bài hát của ca sĩ */}
      <div className="inner-wrap">
        <Title title="Danh Sách Bài hát" />
        <div className="box">
          {data1.map((item, index) => (
            <CardSong key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}