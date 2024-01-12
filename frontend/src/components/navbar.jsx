import { useEffect,useState } from "react"
import {logout} from "../functions/logout"

export default function Navbar(props){
    console.log(props,"props")
    const navbarButton="text-[#242c44] px-4 py-2 rounded-full shadow-2xl text-lg font-medium text-white bg-gradient-to-r from-[#6de4cc] to-[#52c3bA] hover:from-[#52c3bA] hover:to-[#6de4cc] hover:shadow-none hover:cursor-pointer h-fit"
    const [loggedIn,setLoggedIn]=useState(false)

    useEffect(()=>{
        setLoggedIn(props.loggedIn)
    },[props.loggedIn])

    const logoutClicked=()=>{
        logout()
        window.location.href="/"
    }

    

    return(
        <div className="px-20">
            <div className="flex justify-between py-3 px-2 font-poppins font-light text-xl">
                <div className="border-[#242c44] border-2 bg-[#52c3ba] p-1  flex">
                    <div className="bg-[#242c44] p-2 text-[#52c3ba] text-2xl">
                        ACCESS
                    </div>
                    <div className="p-2 font-extrabold text-[#242c44] text-2xl">
                        MASTER
                    </div>
                </div>
                {
                    props.loggedIn ?
                    <>
                    <div className="flex gap-4 justify-center items-center  ">
                        <div className={navbarButton} onClick={logoutClicked}>Logout</div>
                        <div className={navbarButton}>Manage Users</div>
                        <div className={navbarButton}>My Dashboard</div>
                    </div>
                    </>
                    :   
                    <>
                        <a href="/authenticate" className="flex items-center">
                            <div className={navbarButton}>Login</div>
                        </a>
                    </>
                }
            </div>
            <hr className="border-b-1 opacity-30 h-0"/>

        </div>
    )
}