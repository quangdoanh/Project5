"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoSearch } from "react-icons/io5"

export const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams()

  const handleSearch = (event: any) => {
    event.preventDefault();
    const keyword = event.target.keyword.value;
    console.log(keyword);

    router.push(`/search?keyword=${keyword}`)

  }

  const keywordDefault = searchParams.get("keyword") || ""
  return (
    <>

      <form className="gap-[20px] flex py-[16px] px-[30px] items-center bg-[#212121] mt-[20px] sticky top-[20px]  z-[998] rounded-[50px] "
        onSubmit={handleSearch}
      >

        <input
          placeholder="Tìm kiếm..."
          type="text"
          name="keyword"
          className=" order-2 outline-none bg-transparent  text-[16px] font-[600] text-white flex-1 placeholder-white"
          defaultValue={keywordDefault}
        ></input>
        <button
          type="submit"
          className=" order-1 text-white 
                text-[22px]">
          <Suspense>
           <IoSearch/>
          </Suspense>
        </button>
      </form>

    </>
  )
}