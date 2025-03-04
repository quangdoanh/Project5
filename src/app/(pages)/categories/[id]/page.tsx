/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { CardHeader } from "@/app/components/Card/CardHeader";
import { CardSong } from "@/app/components/Card/CardSong";
import { Title } from "@/app/components/TitleHeader/Title";
import { firebaseData } from "@/app/fireBaseConfig";

import { onValue, ref } from "firebase/database";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web nghe nhạc trực tuyến",
  description: "Website nghe nhạc onlie",
};

export default async function CategoriesDetailPage(props: any) {
  const { id } = await props.params;
  const data: any[] = [];
  const data1: any[] = []


  onValue(ref(firebaseData, '/categories/' + id), (item) => {
    const datafb = item.val();
    data.push(
      {

        img: datafb.image,
        title: datafb.title,
        desc: datafb.description
      }
    )
    onValue(ref(firebaseData, '/songs/'), (song) => {
      song.forEach((item1) => {
        const dataSong = item1.val();
        const key = item1.key;

        if (dataSong.categoryId === id) {
          onValue(ref(firebaseData, '/singers/' + dataSong.singerId[0]), (singer) => {

            const dataSing = singer.val();

            data1.push(
              {
                id: key,
                img: dataSong.image,
                namesong: dataSong.title,
                singer: dataSing.title,
                viewer: dataSong.listen,
                link: `/song/${key}`,
                audio: dataSong.audio,
                wishlist: dataSong.wishlist
              }
            )

          });
        }

      })



    });


  });

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