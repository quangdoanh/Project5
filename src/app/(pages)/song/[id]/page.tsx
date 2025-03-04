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

export default function SongDetailPage(props: any) {
  const { id } = props.params;

  // Sử dụng useState để lưu trữ dữ liệu
  const [data, setData] = useState<any[]>([]);
  const [data1, setData1] = useState<any[]>([]);
  const [lyricdata, setLyricdata] = useState<string | null>(null); // Lưu trữ lời bài hát

  // Sử dụng useEffect để fetch dữ liệu từ Firebase
  useEffect(() => {
    // Fetch dữ liệu bài hát
    const songRef = ref(firebaseData, '/songs/' + id);
    const unsubscribeSong = onValue(songRef, (song) => {
      const dataSong = song.val();
      setLyricdata(dataSong.lyric); // Cập nhật lời bài hát

      // Fetch thông tin ca sĩ
      const singerRef = ref(firebaseData, '/singers/' + dataSong.singerId[0]);
      const unsubscribeSinger = onValue(singerRef, (singer) => {
        const dataSing = singer.val();

        // Cập nhật thông tin bài hát và ca sĩ
        setData([{
          img: dataSong.image,
          title: dataSong.title,
          desc: dataSing.title,
        }]);

        // Fetch danh sách bài hát liên quan
        const songsRef = ref(firebaseData, '/songs');
        const unsubscribeSongs = onValue(songsRef, (song1) => {
          const newData1: any[] = [];
          song1.forEach((item1) => {
            const dataSong1 = item1.val();
            const key1 = item1.key;

            // Kiểm tra bài hát cùng category và khác ID
            if (dataSong1.categoryId === dataSong.categoryId && key1 !== id) {
              newData1.push({
                id1: key1,
                img: dataSong1.image,
                namesong: dataSong1.title,
                singer: dataSing.title,
                link: `/song/${key1}`,
                audio: dataSong1.audio,
                wishlist: dataSong1.wishlist,
              });
            }
          });

          // Cập nhật danh sách bài hát liên quan
          setData1(newData1);
        });

        // Hủy đăng ký lắng nghe khi component unmount
        return () => unsubscribeSongs();
      });

      // Hủy đăng ký lắng nghe khi component unmount
      return () => unsubscribeSinger();
    });

    // Hủy đăng ký lắng nghe khi component unmount
    return () => unsubscribeSong();
  }, [id]); // Dependency array với id để fetch lại dữ liệu khi id thay đổi

  return (
    <>
      {/* Section-1: Hiển thị thông tin bài hát và ca sĩ */}
      <div className="inner-wrap flex mb-[30px] items-center gap-[20px]">
        {data.map((item, index) => (
          <CardHeader key={index} item={item} />
        ))}
      </div>

      {/* Section-2: Hiển thị lời bài hát */}
      <div className="inner-wrap mb-[30px]">
        <Title title="Lời bài hát" />
        <p className="desc text-white text-[14px] font-[500] bg-[#212121] rounded-[15px] p-[20px] whitespace-pre-line">
          {lyricdata}
        </p>
      </div>

      {/* Section-3: Hiển thị danh sách bài hát liên quan */}
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