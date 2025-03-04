import { Title } from "@/app/components/TitleHeader/Title";
import type { Metadata } from "next";

import { Section1 } from "./Section1";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Web nghe nhạc trực tuyến",
  description: "Website nghe nhạc onlie",
};

export default function SearchPage() {

  return (
    <>
      <div className="mt-[30px]">
        <Title title="Kết Quả Tìm Kiếm" />

        <div className="grid grid-cols-1 gap-[10px]">
          <Suspense>
            <Section1 />
          </Suspense>
        </div>
      </div>
    </>
  );
} 