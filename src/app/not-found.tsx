import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
    title : "404 Not Found Doanh",
    description: "không tìm thấy trang này"
}


export default function NotFoundPage() {
    return (
        <>
            <h1 className="text-[32px] font-[700] text-center mt-[50px]">
              404 NOT FOUND  
            </h1>  

            <div>
                <Link href="/" className="bg-black text-white p-[10px] ">
                  Trờ về trang chủ
                </Link>
            </div>      
        </>
    )
}