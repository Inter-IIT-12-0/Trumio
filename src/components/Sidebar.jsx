"use client"
import Image from "next/image";
import Trumio_logo from "../../public/Images/Trumio_Logo.svg";
import Trumio_text from "../../public/Images/Trumio_text.svg";
import Projects_Icon from "../../public/Images/Projects_Icon.svg"
import My_Learnings_Icon from "../../public/Images/My_Learnings_Icon.svg"
import Discussion_Icon from "../../public/Images/Discussion_Icon.svg"
import Mentorship_Icon from "../../public/Images/Mentorship_Icon.svg"
import Skill_Test_Icon from "../../public/Images/Skill_Test_Icon.svg"
import Settings_Icon from "../../public/Images/Settings_Icon.svg"


export default function Sidebar() {

    return (
        <div className="w-60 h-full fixed bg-white shadow-2xl pb-3 flex flex-col justify-start pl-5 z-20 transition-all duration-1000">
            <div className="justify-start items-center inline-flex mt-8 gap-4">
                <Trumio_logo />
                <div>
                    <Trumio_text />
                    <div className="w-28 h-2 bg-gradient-to-l from-[#00509f] to-white rounded-[0.1rem] flex flex-row-reverse font-bold font-['Montserrat'] text-white text-[0.3rem] pr-1 items-center" >
                        UNIK
                    </div>
                </div>
            </div>
            <div className="justify-start items-center inline-flex mt-8 gap-6 hover-background transition-all duration-1000">
                <div className="w-6 h-6 justify-center items-center flex">
                    <Projects_Icon />
                </div>
                <div className="text-black text-base font-semibold font-sans">Projects</div>
            </div>
            <div className="justify-start items-center inline-flex hover-background mt-8 gap-6 transition-all duration-1000">
                <div className="w-6 h-6 justify-center items-center flex">
                    <div className="w-6 h-6 relative">
                        <My_Learnings_Icon />
                    </div>
                </div>
                <div className="text-black text-base font-semibold font-sans">My Learnings</div>
            </div>
            <div className="justify-start items-center inline-flex mt-8 gap-6 hover-background transition-all duration-1000">
                <div className="w-6 h-6 justify-center items-center flex">
                    <div className="w-6 h-6 relative">
                        <Discussion_Icon />
                    </div>
                </div>
                <div className="text-black text-base font-semibold font-sans">Discussion</div>
            </div>
            <div className="justify-start items-center inline-flex mt-8 gap-6 hover-background transition-all duration-1000">
                <div className="w-6 h-6 justify-center items-center flex">
                    <div className="w-6 h-6 relative">
                        <Mentorship_Icon />
                    </div>
                </div>
                <div className="text-black text-base font-semibold font-sans">Mentorship</div>
            </div>
            <div className="justify-start items-center inline-flex mt-8 gap-6 hover-background transition-all duration-1000">
                <div className="w-6 h-6 justify-center items-center flex">
                    <div className="w-6 h-6 relative">
                        <Skill_Test_Icon />
                    </div>
                </div>
                <div className="text-black text-base font-semibold font-sans">Skill Test</div>
            </div>
            <div className="left-8 bottom-10 absolute text-black text-base font-semibold font-sans justify-start items-center gap-8 inline-flex hover-background transition-all duration-1000">
                <div className="w-6 h-6 justify-center items-center flex">
                    <div className="w-6 h-6 relative">
                        <Settings_Icon />
                    </div>
                </div>
                <div className="text-black text-base font-semibold font-sans">Settings</div>
            </div>
            <div className="w-60 h-px left-0 bottom-24 absolute border border-stone-300"></div>
        </div>
    );
}
