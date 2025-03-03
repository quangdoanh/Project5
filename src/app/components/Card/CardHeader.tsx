/* eslint-disable @next/next/no-img-element */

import Link from "next/link"

/* eslint-disable @typescript-eslint/no-explicit-any */
export const CardHeader = (props : { item: any}) => {
    const {item} = props
    return (
        <>
            <Link href="" className="img w-[180px] h-[180px] aspect-square rounded-[15px] "  >
             <img 
             src={item.img}
             alt="song01"
             className="w-100% h-100% object-contain "
             />
 
           </Link>
           <div className="content text-white">
             <div className="title text-[35px] font-[700] text-[#00ADEF]">{item.title}</div>
             <div className="desc text-[14px] font-[400]">{item.desc}</div>
    
          </div>
        </>
    )
}