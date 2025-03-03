/* eslint-disable @typescript-eslint/no-explicit-any */
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

export default async function SingDetailPage(props :any) {
  const {id} = await props.params;
      const data : any[] = [];
      const data1 :any[] = []
    
  
      onValue(ref(firebaseData, '/singers/' + id), (item) => {
              const datafb = item.val();
                data.push(
                  {                  
                    img : datafb.image,
                    title:datafb.title,
                    desc :datafb.description
                  }
                ) 
                onValue(ref(firebaseData, '/songs/' ), (song) => {
                  song.forEach((item1) =>{
                    const dataSong = item1.val();
                    const key = item1.key;

                    console.log(dataSong.singerId)
                    console.log(id)
                    dataSong.singerId.forEach((itemid: any) =>{
                        if(itemid == id){
                          data1.push(
                            {
                            id: key,
                            img: dataSong.image,
                            namesong: dataSong.title,
                            singer: datafb.title,
                            link:`/song/${key}`,
                            audio: dataSong.audio,
                            wishlist: dataSong.wishlist  
                            }
                          ) 
                        }
                    }) 
                  })
                });    
              });
  return (
      <>
          <div className="inner-wrap flex mb-[30px] items-center gap-[20px]">
          {data.map((item,index) => (
              <CardHeader key={index} item={item}/>
          ))}
          </div>

          <div className="inner-wrap">
                   <Title title="Danh Sách Bài hát"/>
                  <div className="box">
                   {data1.map((item,index)=>(
                      <CardSong key={index} item={item} />
                   ))}
                  </div>
                     
                  </div>
      </>
  )
} 