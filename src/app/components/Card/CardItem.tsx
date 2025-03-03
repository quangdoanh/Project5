/* eslint-disable @next/next/no-img-element */

import Link from "next/link"

/* eslint-disable @typescript-eslint/no-explicit-any */
export const CardItem = (props:{item : any}) => {
    const {item} = props
    return (
        <>
            <div className="item ">
            <Link className="img w-[180px] h-[180px] aspect-square" href={item.link}>
              <img
              src={item.img}
              alt=""
              className="w-100% h-100% object-contain rounded-[10px] overflow-hidden"
              />
            </Link>
            <div className="content text-[14px] font-[700]  ">{item.title}</div> 
            <div className="desc mt-[10px] text-[12px] font-[400] line-clamp-1">{item.desc}</div>
          </div>
        </>
    )
}