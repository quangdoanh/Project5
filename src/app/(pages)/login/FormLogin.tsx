/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"


import { authDatabase } from "@/app/fireBaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"

import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

export const FormLogin = () => {

    const router = useRouter();
    const handleLog = (event: any) => {

        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;



        if (email && password) {
            signInWithEmailAndPassword(authDatabase, email, password)

                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    if (user) {
                        router.push("/");
                    }
                })
                .catch((error) => {
                    console.log(error)
                    Swal.fire({
                        title: 'Thật bại!',
                        text: 'Sai mật khẩu or email',
                        icon: 'error',
                        confirmButtonText: 'Đăng nhập lại'
                    })

                });
        }
    }
    return (
        <>
            <form className="flex flex-col items-center gap-[15px]" onSubmit={handleLog}>

                <div className="email flex flex-col  items-start gap-[5px]">
                    <label htmlFor="" className="text-[14px]  text-white  font-[600]">Email
                        <span className="text-[#F21D2F] ml-[5px]">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Ví dụ:levana@gmail.com"
                        className="bg-white appearance-none w-[500px] p-[16px] rounded-[6px] "
                        required={true}
                    />
                </div>
                <div className="password flex flex-col items-start gap-[5px]">
                    <label htmlFor="" className="text-[14px]  text-white  font-[600]">Mật Khẩu
                        <span className="text-[#F21D2F] ml-[5px]">*</span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="bg-white appearance-none w-[500px] p-[16px] rounded-[6px] "
                        required={true}
                    />
                </div>
                <div className="button bg-[#00ADEF]  w-[500px] p-[16px] rounded-[6px] flex items-center justify-center">
                    <button className="font-[700]  text-white  text-[16px]">Đăng nhập</button>
                </div>
            </form>
        </>
    )
}