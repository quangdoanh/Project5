/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Title } from "@/app/components/TitleHeader/Title"
import { authDatabase, firebaseData } from "@/app/fireBaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { set, ref } from "firebase/database"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

export const FormRegister = () => {

    const router = useRouter();
    const handleReg = (event: any) => {

        event.preventDefault();
        const fullname = event.target.fullname.value;
        const email = event.target.email.value;
        const password = event.target.password.value;



        if (fullname && email && password) {

            // Bắt lỗi mật khẩu
            const passWordNoSpace = password.replace(/\s/g, '');

            if (passWordNoSpace.length < 6) {
                Swal.fire({
                    icon: "error",
                    title: " Mật khẩu không hợp lệ",
                    text: "Mật khẩu phải từ 6 ký tự trở lên (không tính khoảng trắng)!",
                    footer: "Vui lòng thử lại",
                });
                return; // Dừng lại nếu mật khẩu không hợp lệ
            }
            createUserWithEmailAndPassword(authDatabase, email, password)

                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    if (user) {
                        set(ref(firebaseData, 'users/' + user.uid), {
                            username: fullname,
                            email: email,
                            password: password
                        }).then(() => {
                            router.push("/");
                        })
                    }
                })
                .catch((error) => {
                    console.log(error)
                    Swal.fire({
                        icon: "error",
                        title: "Email đã tồn tại",
                        footer: "Vui lòng thử lại",
                    });
                });
        }
    }

    return (
        <>
            <form className="flex flex-col items-center gap-[15px]" onSubmit={handleReg}>
                <Title title="Đăng ký tài khoản" classname="text-center" />
                <div className="name flex flex-col items-start gap-[5px]">
                    <label htmlFor="" className="text-[14px]  text-white  font-[600]">Họ Tên
                        <span className="text-[#F21D2F] ml-[5px]">*</span>
                    </label>
                    <input
                        type="text"
                        name="fullname"
                        id="full name"
                        placeholder="Ví dụ: Le Van A"
                        className="bg-white appearance-none w-[500px] p-[16px] rounded-[6px] "
                        required={true}
                    />
                </div>
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
                    <button className="font-[700]  text-white  text-[16px]">Đăng Ký</button>
                </div>
            </form>
        </>
    )
}