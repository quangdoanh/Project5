import type { Metadata } from "next";

import "./globals.css";
import { Side } from "./components/Side/Side";
import { Search } from "./components/Search/Search";
import { Play } from "./components/Play/Play";


export const metadata: Metadata = {
  title: "Web nghe nhạc trực tuyến",
  description: "Website nghe nhạc onlie",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="bg-[#292929]">
      
        <div className="container mx-auto">
          <div className="inner-wrap flex  ">
             <div className="w-[280px] mr-[20px]  ">
               <Side/>
             </div>
             <div className="flex-1  ">
               <Search/>
               <main className="mt-[30px] mb-[150px]">
               {children}
               </main>
             </div>
          </div>
        </div>
        <Play/>
      </body>
    </html>
  );
}
