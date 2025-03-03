
import { PlayInfo } from "./PlayInfo"
import { PlayAction } from "./PlayAction"
import { PlayTime } from "./PlayTime"
import { PlayVolume } from "./PlayVolume"

/* eslint-disable @next/next/no-img-element */
export const  Play = () => {
  return (
    <>
       <div className="bg-[#212121] w-full fixed left-0 py-[20px] bottom-0 border-t border-[#494949] play-audio hidden">
        <audio className="hidden audio">
          <source src="/"/>
        </audio>
        <div className="container mx-auto flex items-center justify-between"> 
          {/* right-title */}
             <PlayInfo />
          {/* center-play */}
           <div className=" flex-1 mx-[66px]">
             <PlayAction/>
              <PlayTime/>
           </div>
            {/* lefft- volum- */}
            <PlayVolume/>
        </div>
       </div>
    </>
  )
}