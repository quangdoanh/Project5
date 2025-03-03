
import type { Metadata } from "next";
import { FormRegister } from "./Formregister";

export const metadata: Metadata = {
  title: "Web nghe nhạc trực tuyến",
  description: "Website nghe nhạc onlie",
};

export default function SearchPage() {
  
  return (
      <>
        <div className=" w-[500] mt-[60px] mx-[auto]">
         <FormRegister/>
        </div>
      </>
  );
} 