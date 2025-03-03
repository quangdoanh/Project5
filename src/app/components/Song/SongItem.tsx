/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";

import { ButtonPlay } from "../Button/ButtonPlay";
import { ButtonHeart } from "../Button/ButtonHeart";

export const SongItem = (props : { item : any}) => {
    const { item } = props;
    return (
        <>
            <div className="box-product flex justify-between items-center bg-[#212121] rounded-[15px] p-[10px] w-[400px]" song-id={item.id} >
                           <Link href= {item.link} className="w-[76px] h-[76px] aspect-square">
                           <div className="img mr-[6px]  ">
                           <img 
                           src={item.img} 
                           alt="" 
                           className="w-[100%] h-[100%] object-contain rounded-[10px] overflow-hidden"
                           />
                           </div>
                           </Link >
                           <div className="text ">
                           <div className="text-[16px] font-[600] mb-[5px]">{item.namesong}</div>
                           <div className="text-[12px] font-[400] mb-[8px]">
                               {item.singer}
                           </div>
                           <div className="text-[12px] font-[400]">
                               {item.viewer.toLocaleString()+" "}
                                lượt nghe</div>
                           </div>
                           <div className="gap-[10px] flex flex-1 justify-end ">
                           <ButtonPlay item = {item} className="h-[34px] w-[34px] rounded-full solid  border-[1px] border-white flex justify-center items-center inner-button-play "/>
                           
                           <ButtonHeart item = {item} className ="h-[34px] w-[34px]
                           rounded-full solid  border-[1px] border-white flex justify-center items-center "/>
               
                           </div>
                       </div>
        </>

    )
}