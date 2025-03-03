
"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoPlay } from "react-icons/io5";

export const ButtonPlay = (props: any) => {
    const { item,className } = props
    
    // console.log(props);

    const handlePlay = () => {

        // xu ly video
        const elementPlay: any = document.querySelector(".play-audio");
        const elementAudio = elementPlay?.querySelector(".audio")
        const elementPlayAudio = elementAudio?.querySelector("source")
        if (elementPlayAudio) {
            elementPlayAudio.src = item.audio;
        }
        if (elementAudio) {
            elementAudio.load();
            elementAudio.play();
        }

        // xu ly thanh play
        elementPlay.classList.remove("hidden")

        // xu ly hien thi anh
        const elementImage: any = elementPlay?.querySelector(".inner-image")
        elementImage.src = item.img;

        elementImage.alt = item.namesong;
        //todo
        const elementContent: any = elementPlay?.querySelector(".inner-content")

        // xu ly hien thi title
        const elementTitle = elementContent?.querySelector(".inner-title")
        console.log(item.namesong)
        elementTitle.innerHTML = item.namesong

        // xu ly hien thi singer
        const elementHeader = elementContent?.querySelector(".inner-singer")
        elementHeader.innerHTML = item.singer
        // hiển thị nút pause
        const elementbuttonPlay = elementPlay.querySelector(".inner-button-play");
        elementbuttonPlay.classList.add("play");


        // lấy time cho audio
        const elementTimeTotal = elementPlay.querySelector(".inner-play-time .inner-total-time")
        const elementCurrentTime = elementPlay.querySelector(".inner-play-time .inner-current-time")
        elementAudio.onloadedmetadata = () => {
            const totalTime = elementAudio.duration;
            elementTimeTotal.max = totalTime;

            // lấy thời gian hiện tại
            elementAudio.ontimeupdate = () => {
                const currentTime = elementAudio.currentTime;
                const percent = currentTime * 100 / totalTime;
                elementCurrentTime.style.width = `${percent}%`;
                elementTimeTotal.value = currentTime-1;
            }
        }
        //Xóa class có active bài hát trước chạy
        const elementPlayOld = document.querySelector(`[song-id].active`)
        if(elementPlayOld){
            elementPlayOld.classList.remove("active")
        }

        // Đánh dấu bài hát đang chạy
        const elementPlayCurrent = document.querySelector(`[song-id = "${item.id}"]`)
        
        elementPlayCurrent?.classList.add("active")
    }
    return (
        <>
            <button className= {className}
                onClick={handlePlay}>
                <IoPlay />
            </button>
        </>
    )
}