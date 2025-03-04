"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"; // Thêm useEffect và useState
import { CardItem } from "@/app/components/Card/CardItem";
import { Title } from "@/app/components/TitleHeader/Title";
import { firebaseData } from "@/app/fireBaseConfig";
import { onValue, ref } from "firebase/database";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Web nghe nhạc trực tuyến",
//   description: "Website nghe nhạc online",
// };

export default function SingPage() {
  // Sử dụng useState để lưu trữ dữ liệu
  const [data3, setData3] = useState<any[]>([]);

  // Sử dụng useEffect để fetch dữ liệu từ Firebase
  useEffect(() => {
    const SingeriesRef = ref(firebaseData, 'singers');

    // Lắng nghe sự thay đổi dữ liệu từ Firebase
    const unsubscribe = onValue(SingeriesRef, (items) => {
      const newData: any[] = [];
      items.forEach((item) => {
        const key = item.key;
        const datafb = item.val();

        if (newData.length < 5) { // Giới hạn chỉ lấy 5 ca sĩ
          newData.push({
            id: key,
            img: datafb.image,
            title: datafb.title,
            desc: datafb.description,
            link: `sing/${key}`,
          });
        }
      });

      // Cập nhật state với dữ liệu mới
      setData3(newData);
    });

    // Hủy đăng ký lắng nghe khi component unmount
    return () => unsubscribe();
  }, []); // Dependency array rỗng để chỉ chạy một lần khi component mount

  return (
    <>
      <div className="inner-wrap text-white my-[30px]">
        <Title title="Danh sách ca sĩ" />
        <div className="box grid grid-cols-5 gap-x-[10px] gap-y-[20px]">
          {data3.map((item, index) => (
            <CardItem key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}