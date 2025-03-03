/* eslint-disable @typescript-eslint/no-explicit-any */
"use client" // API or DOM
import { FaPause } from "react-icons/fa"
import { FaPlay } from "react-icons/fa6"
import { IoPlaySkipBack, IoPlaySkipForwardSharp } from "react-icons/io5"
export const PlayAction = () => {

    const handlePlay = () => {
        const elementPlay: any = document.querySelector(".play-audio");
        const elementbuttonPlay = elementPlay.querySelector(".inner-button-play");
        const elementAudio = elementPlay?.querySelector(".audio")
        if (elementbuttonPlay.classList.contains("play")) {
            elementbuttonPlay.classList.remove("play")
            elementAudio.pause();
        } else {
            elementbuttonPlay.classList.add("play")
            elementAudio.play();
        }

    }
    const handleNext = () => {
        const elementCurrent = document.querySelector("[song-id].active");
        if (elementCurrent) {
            const elementNextSong = elementCurrent.nextElementSibling;
            if (elementNextSong) {
                const buttonPlay: any = elementNextSong.querySelector(".inner-button-play");
                buttonPlay.click();
            }
        }
    }
    const handlePre = () => {
        const elementCurrent = document.querySelector("[song-id].active");
        const preSong = elementCurrent?.previousElementSibling;
        const buttonPlay: any = preSong?.querySelector(".inner-button-play");
        buttonPlay.click();
    }
    return (
        <>
            <div className=" flex justify-center gap-[42px] text-white text-[16px] items-center">
                <button>
                    <IoPlaySkipBack onClick={handlePre} />
                </button>
                <button className="w-[32px] h-[32px] inline-flex justify-center items-center rounded-full bg-[#00ADEF] inner-button-play "
                    onClick={handlePlay}>
                    <FaPlay className=" text-[16px] inner-icon-play " />
                    <FaPause className=" text-[16px] inner-icon-pause " />
                </button>
                <button>
                    <IoPlaySkipForwardSharp onClick={handleNext} />
                </button>
            </div>
        </>
    )
}