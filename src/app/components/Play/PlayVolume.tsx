/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { IoVolumeHighSharp } from "react-icons/io5"

export const PlayVolume = () => {
  const handleChange = (event : any) => {
    const elementPlay: any = document.querySelector(".play-audio");
    const elementAudio = elementPlay?.querySelector(".audio")
    const elementCurrentVolume = elementPlay.querySelector(".inner-volume .inner-current")
    const elementTotal = event.target;
    const value = parseInt(elementTotal.value)
    elementAudio.volume = value/100;
    elementCurrentVolume.style.width = `${value}%`
  }
    return(
        <>
            <div className="flex w-[184px] items-center gap-[8px] inner-volume ">             
                        <button className="text-[20px] text-white">
                        <IoVolumeHighSharp />
                        </button>
                          <div className="relative">
                            <div className="h-[4px] w-[100%] bg-[#00ADEF] rounded-[50px] absolute left-0 top-[14px] inner-current"></div> 
                                <input
                                type="range"
                                min ={0}
                                max={100}
                                defaultValue={100}
                                className="appearance-none rounded-[50px] w-full h-[4px] cursor-pointer bg-[#FFFFFF0A] range-sm inner-total"
                                onChange={handleChange}
                                />
                          </div>
                        </div>        
        </>
    )
}