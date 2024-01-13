import React,{useEffect, useState} from 'react'    
import { checkLoggedIn } from '../functions/checkLoggedIn'

export default function EditUserForm(props) {

    const [credentials,setCredentials]=useState({name:'',profilePic:''})

    const inputStyle="bg-transparent text-white pb-2 font-extralight opacity-80 w-80 focus:outline-none border-solid border-white border-b-[1px] border-opacity-30 focus:border-opacity-100 hover:border-opacity-100 font-normal w-full"

    const inputLabelContainer="flex flex-col gap-1"

    const formStyle=props.manage ? "text-lg text-gray-100 flex flex-col xl:gap-5 2xl:gap-6 min-[1919px]:gap-10" :
    "text-lg text-gray-100 flex xl:gap-5 2xl:gap-6 min-[1919px]:gap-10"

    const reader = new FileReader()
    const uploadProfilePic=(e)=>{
        reader.onload=(e)=>{
            setCredentials({...credentials,profilePic:e.target.result})
        }
        const f=e.target.files[0];
        const check=reader.readAsDataURL(f);
    }

    useEffect(()=>{
        setCredentials({name:props.userDetails.name,profilePic:props.userDetails.image})
    },[props.userDetails])

    const updateDetails=async (e)=>{
        e.preventDefault()
        // console.log(credentials,"credentials")
        fetch('http://localhost:3000/update',
        {
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name:credentials.name,
                image:credentials.profilePic,
                email:props.userDetails.email
            })
        })
        .then(res=>res.json())
        .then(async res=>{
            if (res.error){
                alert(res.error)
                return
            }
            else{
                window.sessionStorage.removeItem("user")
                checkLoggedIn()
                // window.location.href="/userDashboard"
            }
        })
        .catch(err=>{
            console.log(err,"this erro")
        })
    }



    return (
        <form className=' h-fit rounded-md font-poppins gap-3 text-white'>

            <div className='text-lg text-gray-100 flex flex-col xl:gap-5 2xl:gap-6 min-[1919px]:gap-10'>
                <div className={inputLabelContainer}>
                    <label>FULL NAME</label>
                    <input type="text" id="name" name="name" placeholder="Enter Your Name"  defaultValue={props.userDetails.name} className={inputStyle}
                        onChange={(e)=>setCredentials({...credentials,name:e.target.value})}/>
                </div>

                <div className={inputLabelContainer}>
                    <label>PROFILE PIC</label>
                    
                    <input type="file" id="profilePic" name="profilePic" placeholder="" className={inputStyle}
                        onChange={uploadProfilePic} />
                </div>
                <div className='flex gap-2 mt-10'>

                    <button className="w-fit px-10 rounded-full hover:bg-[#50ad9e] p-3 text-center font-normal text-md hover:cursor-pointer bg-[#5bc7b5] shadow-2xl " onClick={updateDetails}>
                        Save
                    </button>
                    
                    <a href="/userDashboard">
                        <button className="w-fit px-10 rounded-full hover:bg-[#50ad9e] p-3 text-center font-normal text-md hover:cursor-pointer bg-[#5bc7b5] shadow-2xl " >
                            Done
                        </button>
                    </a>
                </div>
            </div>
        </form>
    )
}