/* eslint-disable @next/next/no-img-element */
import Link from "next/link"

import { ButtonPlay } from "../Button/ButtonPlay"
import { ButtonHeart } from "../Button/ButtonHeart"

/* eslint-disable @typescript-eslint/no-explicit-any */
export const CardSong = (props : {item : any}) => {
    const {item} = props
    return(
        <>
            <div className="mb-[10px] item flex items-center justify-between bg-[#212121] rounded-[15px] p-[10px]">
                <div className="inner-left w-[153px] flex gap-[10px] items-center">
                    <ButtonPlay item = {item} className = "inline-flex text-[24px] text-white" />
               
                    <Link className="img w-[42px] h-[42px] aspect-square" href={item.link}>
                    <img src={item.img}
                    alt=""
                    className="w-100% h-100% object-contain rounded-[10px] overflow-hidden"
                        />         
                    </Link>
                    <div className="header text-[14px] font-[700] text-white ml-[5px] whitespace-nowrap ">
                    {item.namesong}
                    </div>
                </div>

                <div className=" text-white text-[14px] font-[700]">{item.singer}
                </div>
                

                <div className=" inner-right flex items-center gap-[18px] ">
                    <div className="time text-white text-[14px] font-[400]">4:32</div>
                    <ButtonHeart item ={item} className="h-[34px] w-[34px]
                           rounded-full solid  border-[1px] border-white text-white flex justify-center items-center " />
                </div>
            </div>
        </>
    )
}