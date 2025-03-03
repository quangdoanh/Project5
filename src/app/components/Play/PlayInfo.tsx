/* eslint-disable @next/next/no-img-element */
export const PlayInfo = () => {
    return ( 
    <>
         <div className=" flex  items-center gap-[12px] w-[218px]">
                <div className="rounded-[15px] aspect-square ">
                  <img
                  src="/"
                  alt="/"
                  className="w-100% h-[49px] object-contain inner-image "/>
                </div>
                <div className="text-white font-[700]  inner-content flex-1">
                    <div className="nameSong text-[14px] text-white line-clamp-1 inner-title inline-block animate-marquee"></div>
                    <div className="nameSong line-clamp-1 text-[12px] font-[300] inner-singer"></div>
                </div>
              </div>
    </>
    )
}