import React, { useEffect, useState } from "react";
import Loader from "react-js-loader";

export default function Login() {

    const [credentials,setCredentials]=useState({password:'',email:''})

    const inputStyle="bg-transparent text-white pb-2 font-extralight opacity-80 w-80 focus:outline-none  border-solid border-white border-b-[1px] border-opacity-30 focus:border-opacity-100 hover:border-opacity-100 font-normal w-full"

    const inputLabelContainer="flex flex-col gap-1"
    
    const [loginMessageStyle,setLoginMessageStyle]=useState("hidden")
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
        try{
            const loggedIn=checkLoggedIn()
            if (loggedIn!==false){
                window.location.href="/userDashboard"
            }
        }
        catch(err){
            console.log("Not Logged In")
        }
    },[])

    const loginUser=(e)=>{
        setLoading(true)
        e.preventDefault()
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email : credentials.email,
                password : credentials.password,
             })
        })
        .then(res => res.json())
        .then(res=>{
            if (res.error){
                setLoginMessageStyle("text-red-500")
                document.getElementById("message").innerHTML=res.error
                setLoading(false)
                return
            }
            else{
                document.cookie = "LOGIN_INFO="+ res.token +";max-age=60*60*24;path=/"
                window.location.href="/"
            }
        })
        .catch(err => console.log(err))

    }

    return (
        <form action="" id="formData" className="p-20 pr-32 pt-16 pb-0 h-fit rounded-md font-poppins gap-3 text-white " >
            <h1 className="text-white mb-3 text-3xl font-extralight flex gap-2 ">
                <span className="underline underline-offset-[14px] decoration-1 decoration-[#5bc7b5]">Login</span>
                <span className="text-2xl flex items-center w-min opacity-30"> or </span> 
                <span className="opacity-30 "> Sign Up </span>
            </h1>

            <div className="mt-10 text-lg font-light text-gray-100 flex flex-col gap-10">
                <div className={inputLabelContainer}>
                    <label>Email</label>
                    <input type="email" id="email" name="email" className={inputStyle} 
                        onChange={(e)=>setCredentials({...credentials,email:e.target.value})}/>
                </div>

                <div className={inputLabelContainer}>
                    <label>Password</label>
                    <input type="password" id="password" name="password" placeholder="" className={inputStyle}
                        onChange={(e)=>setCredentials({...credentials,password:e.target.value})}/>
                </div>
                
                <div id="message" className={loginMessageStyle} >
                </div>
            </div>
            <div className="flex items-center gap-5 mt-10">
                <button className="w-fit px-10 rounded-full hover:bg-[#50ad9e] p-3 text-center font-normal text-md hover:cursor-pointer bg-[#5bc7b5] shadow-2xl" onClick={loginUser}>

                    Login
                </button>

                <div className="opacity-90">
                    <a href="/login">
                        <div className="underline opacity-50 hover:opacity-100 underline-offset-4">New Here ?</div>
                    </a>
                </div>
            </div>
            <div className="absolute right-10 bottom-10">
                {
                    loading &&
                    <Loader type="bubble-scale" bgColor="#52c3b0" color="red" size={100} />
                }
            </div>
        </form>
    )
}