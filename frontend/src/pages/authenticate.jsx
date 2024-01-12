import React, { useEffect, useState } from "react";
import Login from "../components/loginForm"
import SignUp from "../components/signUpForm"
import Album from "../assets/album.jpg"

export default function Authenticate() {

    const [page,setPage]=useState(true)
    const switchButtonStyle="text-white hover:bg-[#6de4cc]  hover:cursor-pointer p-1 pb-2 px-4 duration-300 text-lg font-extralight"
    const bgColor="bg-[#66d8c5]"
    const [loginStyle,setLoginStyle]=useState("bgColor")
    const [signUpStyle,setSignUpStyle]=useState("")
    
    useEffect(()=>{
        page ? setLoginStyle(bgColor) : setSignUpStyle(bgColor)    
    },[])

    const loginClicked=()=>{
        setPage(true)
        setSignUpStyle("")
        setLoginStyle(bgColor)
    }
    const signUpClicked=()=>{
        setPage(false)
        setLoginStyle("")
        setSignUpStyle(bgColor)
    }


    return (
        <div className="bg-black flex h-screen w-full">
            
            <div className="w-2/3 h-full bg-gradient-to-r from-[#6de4cc] to-[#52c3b9] flex justify-center items-end ">
                <img src={Album} className="" alt="NOt Image" />
            </div>
            {/* <div className="h-full w-0 shadow-2xl shadow-cyan-500/50">
                
            </div> */}
            <div className="bg-gradient-to-r from-[#3c4c64] to-[#242c44] w-1/2 p-10">
                <div className="button w-full text-2xl  h-fit flex justify-end">
                    <div className="flex items-center bg-[#4c5d72] rounded-full ">
                        <div onClick={loginClicked} className={`${loginStyle} ${switchButtonStyle} rounded-l-full pl-5`}>login</div>
                        <div onClick={signUpClicked} className={`${signUpStyle} ${switchButtonStyle} rounded-r-full pr-5`}>SignUp</div>
                    </div>
                </div>
                
                {
                    page ? <Login /> : <SignUp />
                }
            </div>

        </div>
    )
}