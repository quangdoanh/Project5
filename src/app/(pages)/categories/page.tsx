/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardItem } from "@/app/components/Card/CardItem";
import { Title } from "@/app/components/TitleHeader/Title";
import { firebaseData } from "@/app/fireBaseConfig";
import { onValue, ref } from "firebase/database";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web nghe nhạc trực tuyến",
  description: "Website nghe nhạc onlie",
};

export default function CategoriesPage() {
  const data2 :any[] = [];
        const CategoriesRef = ref(firebaseData, 'categories');
         onValue(CategoriesRef, (items) => {
        items.forEach((item) => {
          const key = item.key;
          const datafb = item.val();
  
         
            data2.push(
              {
              id:key,
              img: datafb.image,
              title: datafb.title,
              desc: datafb.description,
              link:`/categories/${key}`,
              audio: datafb.audio   
              }
            )
            
          
        })
    });

    
  return (
      <>
       <div className="inner-wrap text-white my-[30px]">
          <Title title="Danh mục bài hát"/>
          <div className="box grid grid-cols-5 gap-x-[10px] gap-y-[20px] ">
            {data2.map((item,index)=>(
              <CardItem key={index} item={item}/>  
            ))}
          </div>
          
        </div>
      </>
  );
} 