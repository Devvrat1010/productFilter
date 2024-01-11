import React, { useState } from "react";

export default function Login() {

    const [credentials,setCredentials]=useState({email:'',password:'',name:'',number:'',profilePic:''})

    const inputStyle="bg-[#1b1b1b] rounded-md text-white px-2 p-1 w-80 focus:outline-none border-solid border-white border-[1px] border-opacity-50 focus:border-opacity-100 hover:border-opacity-100 font-normal "

    const inputLabelContainer="flex flex-col gap-1"
    
    const [loginMessageStyle,setLoginMessageStyle]=useState("hidden")

    const signUpUser=()=>{
        console.log(credentials,"credentials")
        fetch('https://localhost:3000/signUp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email : credentials.email,
                password : credentials.password,
                name : credentials.name,
                number : credentials.number,
                image : credentials.image
             })
        })
        .then(res => res.json())
        .then(res=>{
            document.cookie = "LOGIN_INFO="+ res.token +";max-age=60*60;path=/"
        })
        .catch(err => console.log(err))

        console.log(document.cookie)
    }

    return (
        <div className="bg-black flex m-auto justify-center items-center h-screen">


            <form action="" id="formData" className="bg-[#1b1b1b] flex flex-col w-fit p-5 rounded-md gap-3 text-white font-medium" >
                <h1 className="text-white mb-3 text-2xl font-bold">Login</h1>
                
                <div className={inputLabelContainer}>
                    <label>Name</label>
                    <input type="text" id="name" name="name" placeholder="" className={inputStyle}
                        onChange={(e)=>setCredentials({...credentials,name:e.target.value})}/>
                </div>

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
                
                <div className={inputLabelContainer}>
                    <label>Phone Number</label>
                    <input type="number" id="number" name="number" placeholder="" className={inputStyle}
                        onChange={(e)=>setCredentials({...credentials,number:e.target.value})}/>
                </div>
                <div className={inputLabelContainer}>
                    <label>Profile Pic</label>
                    <input type="file" id="profilePic" name="profilePic" placeholder="" className={inputStyle}
                        onChange={(e)=>setCredentials({...credentials,profilePic:e.target.value})}/>
                </div>
                
                <div className="bg-[#0c34c3] mt-5 hover:bg-[#142776] p-2 rounded-md text-center font-normal text-md hover:cursor-pointer" onClick={signUpUser}>
                    Continue
                </div>
                <div id="message" className={loginMessageStyle} >

                </div>

                <div className="opacity-90">
                    Already Have an Account ?
                    <a href="/login" className="text-blue-500 hover:underline"> Signup </a>
                </div>
                    
            </form>
        </div>
    )
}