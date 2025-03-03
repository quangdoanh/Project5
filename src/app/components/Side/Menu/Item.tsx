/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/alt-text */
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Item = (props: any) => {
    const { item, isLogin } = props;
    const pathname = usePathname();
    return (
        <>
            {(item.isLogin === undefined || item.isLogin === isLogin) &&
            (<li className="mb-[30px]">
                <Link
                    href={item.href}
                    className={"flex gap-x-[20px] items-center pl-[20px] hover:text-[#00ADEF] " + (pathname == item.href ? "text-[#00ADEF]" : "text-white")}
                >
                    <span className="font-[700] text-[22px]">{item.icon}</span>
                    <span className="font-[700] text-[16px]">{item.title}</span>
                </Link>
            </li>)}
            
        </>
    )

}