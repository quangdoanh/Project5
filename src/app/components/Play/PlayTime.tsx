"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
export const PlayTime = () => {
  const handleChange = (event : any) => {
    const elementPlay: any = document.querySelector(".play-audio");
    const elementAudio = elementPlay?.querySelector(".audio")
    const elementTotal = event.target;
    const value = parseInt(elementTotal.value)
    elementAudio.currentTime = value;
  }
    return (
        <>
            <div className="mt-[12px] inner-left relative inner-play-time ">
              <div className="h-[4px] w-[0] bg-[#00ADEF] rounded-[50px] absolute left-0 top-[14px] inner-current-time"></div>
                <input
                type="range"
                min ={0}
                max={0}
                defaultValue={0}
                className="appearance-none rounded-[50px] w-full h-[4px] cursor-pointer bg-[#FFFFFF0A] range-sm inner-total-time"
                onChange={handleChange}
                />
                
              </div>
        </>
    )
}