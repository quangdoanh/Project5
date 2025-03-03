import { Title } from "@/app/components/TitleHeader/Title";
import type { Metadata } from "next";
import { FormLogin } from "./FormLogin";

export const metadata: Metadata = {
  title: "Web nghe nhạc trực tuyến",
  description: "Website nghe nhạc onlie",
};

export default function LoginPage() {
  
  return (
    <>
    <div className="mt-[60px] w-[500px] mx-auto">
      <Title title="Đăng nhập tài khoản" classname="text-center"/>
      <FormLogin/>
    </div>
    </>
);
} 