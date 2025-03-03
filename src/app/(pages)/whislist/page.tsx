
import { Title } from "@/app/components/TitleHeader/Title";
import type { Metadata } from "next";
import { WishList } from "./WishList";

export const metadata: Metadata = {
  title: "Web nghe nhạc trực tuyến",
  description: "Website nghe nhạc onlie",
};

export default function WhistLishPage() {


  return (
    <>
      <div className="inner-wrap">
        <Title title="Bài hát yêu thích" />
        <WishList/>
      </div>
    </>
  );
} 