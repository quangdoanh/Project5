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

export default async function SongDetailPage(props : any) {

  const {id}  = await props.params;
  const data : any[] = [];
  const data1 : any[] = [];
  let lyricdata : any  = null;
  onValue(ref(firebaseData, '/songs/' + id ), (song) => {
    
      const dataSong = song.val();
      lyricdata = dataSong.lyric;

       

     
        onValue(ref(firebaseData, '/singers/' + dataSong.singerId[0]), (singer) => {

          const dataSing = singer.val();

            data.push(
              {
              
              img: dataSong.image,
              title: dataSong.title,
              desc: dataSing.title,
              
              }
            )
            // tìm bài hát theo ID ca sĩ và khác với bài hát hiện tại
            onValue(ref(firebaseData, '/songs/' ), (song1) => {
           song1.forEach((item1) => {
            const dataSong1 = item1.val();
            const key1 = item1.key;

            console.log(dataSong.singerId[0])
           
              if(dataSong1.categoryId == dataSong.categoryId && key1 != id){
                data1.push(
                  {
                  id1: key1,
                  img: dataSong1.image,
                  namesong: dataSong1.title,
                  singer: dataSing.title,
                  link:`/song/${key1}`,
                  audio: dataSong1.audio,
                  wishlist: dataSong1.wishlist  
                  }
                ) 
              }
          
           })
          })
        });
       

   
   
      
     
  });
  

 
  

   
   return (
       <>
       {/* Section-1 */}
         <div className="inner-wrap flex mb-[30px] items-center gap-[20px]">
         {data.map((item,index) => (
             <CardHeader key={index} item={item}/>
         ))}
           
         </div>
       {/* Section-2 */}
         <div className="inner-wrap  mb-[30px] ">
         <Title title="Lời bài hát"/>
         
          <p className="desc text-white text-[14px] font-[500] bg-[#212121] rounded-[15px] p-[20px] whitespace-pre-line">
              {lyricdata}
          </p>
         
           
         </div>

       {/* Section3 */}
        <div className="inner-wrap">
         <Title title="Danh sách bài hát"/>
        <div className="box">
         {data1.map((item,index)=>(
            <CardSong key={index} item={item} />
         ))}
        </div>
           
        </div>
       </>
   );
} 