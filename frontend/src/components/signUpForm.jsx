import React, { useEffect, useState } from "react";
import { checkLoggedIn } from "../functions/checkLoggedIn";

export default function Login() {

    const [loggedIn,setLoggedIn]=useState(false)
    const [credentials,setCredentials]=useState({email:'',password:'',name:'',number:'',profilePic:'',admin:false})

    const inputStyle="bg-transparent text-white pb-2 font-extralight opacity-80 w-80 focus:outline-none  border-solid border-white border-b-[1px] border-opacity-30 focus:border-opacity-100 hover:border-opacity-100 font-normal w-full"

    const inputLabelContainer="flex flex-col gap-1"

    const [signUpMessageStyle,setsignUpMessageStyle]=useState("hidden")
    const [errorMessage,setErrorMessage]=useState("")

    const reader = new FileReader()

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

    const uploadProfilePic=(e)=>{
        reader.onload=(e)=>{
            setCredentials({...credentials,profilePic:e.target.result})
        }
        const f=e.target.files[0];
        const check=reader.readAsDataURL(f);
    }
    const signUpUser=(e)=>{
        e.preventDefault()
        // console.log(credentials,"credentials")

        fetch('http://localhost:3000/signUp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email : credentials.email,
                password : credentials.password,
                name : credentials.name,
                number : credentials.number,
                image : credentials.profilePic,
                admin: credentials.admin
             })
        })
        .then(res => res.json())
        .then(res=>{
            console.log(res,"res")
            if (res.error){
                alert(res.error)
                setErrorMessage(res.error)
                return
            }
            else{
                // document.cookie = "LOGIN_INFO="+ res.token +";max-age=60*60;path=/"
                // const checking=checkLoggedIn()
                // if (checking!==false){
                //     window.location.href="/"
                // }
                window.location.href="/"
            }
        })
        .catch(err =>{ 
            console.log(err)
            alert(err)
        })
    }

    return (
        <form action="" id="formData" className="p-12 pb-0 pr-28 pt-12 min-[1919px]:p-20 min-[1919px]:pr-32 min-[1919px]:pt-16  h-fit rounded-md font-poppins gap-3 text-white " >
            <h1 className="text-white mb-3 text-3xl font-extralight flex gap-2">
                <span className="opacity-30"> Login </span>
                <span className="text-2xl flex items-center w-min opacity-30"> or </span> 
                <span className="underline underline-offset-[14px] decoration-1 decoration-[#5bc7b5]">Sign Up</span>
            </h1>

            <div className="mt-10 text-lg font-light text-gray-100 flex flex-col xl:gap-5 2xl:gap-6 min-[1919px]:gap-10"> 

                <div className={inputLabelContainer}>
                    <label>FULL NAME</label>
                    <input type="text" id="name" name="name" placeholder="Enter Your Name" className={inputStyle}
                        onChange={(e)=>setCredentials({...credentials,name:e.target.value})}/>
                </div>

                <div className={inputLabelContainer}>
                    <label>EMAIL</label>
                    <input type="email" id="email" name="email" placeholder="Enter Your Email" className={inputStyle} 
                        onChange={(e)=>setCredentials({...credentials,email:e.target.value})}/>
                </div>

                <div className={inputLabelContainer}>
                    <label>PASSWORD</label>
                    <input type="password" id="password" name="password" placeholder="Enter Your Password" className={inputStyle}
                        onChange={(e)=>setCredentials({...credentials,password:e.target.value})}/>
                </div>
                
                <div className={inputLabelContainer}>
                    <label>PHONE NUMBER</label>
                    <input type="number" id="number" name="number" placeholder="Enter Your Phone Number" className={inputStyle}
                        onChange={(e)=>setCredentials({...credentials,number:e.target.value})}/>
                </div>
                <div className={inputLabelContainer}>
                    <label>PROFILE PIC</label>
                    <input type="file" id="profilePic" name="profilePic" placeholder="" className={inputStyle}
                        onChange={uploadProfilePic}/>
                </div>
                <div className="flex gap-2 px-2">
                    <input className="w-5" type="checkbox" id="admin" name="admin" onChange={e=>{
                        console.log(e.target.checked)
                        setCredentials({...credentials,admin:e.target.checked})
                        }}/>
                    <label htmlFor="admin">Sign In As Admin</label>
                </div>
                <div className="flex items-center gap-5">
                    <button className="w-fit px-10 rounded-full hover:bg-[#50ad9e] p-3 text-center font-normal text-md hover:cursor-pointer bg-[#5bc7b5] shadow-2xl " onClick={signUpUser}>
                        Sign Up
                    </button>
                    <div className="opacity-90">
                        <a href="/login">
                            <div className="underline opacity-50 hover:opacity-100 underline-offset-4">Already A Member ?</div>
                        </a>
                    </div>
                </div>
                <div id="message" className={signUpMessageStyle } >
                    {errorMessage}
                </div>
            </div>
                    
        </form>
    )
}