import { useEffect, useState } from "react"
import { checkLoggedIn } from "../functions/checkLoggedIn"
import Navbar from "../components/navbar"
export default function Home() {

    const [loggedIn,setLoggedIn]=useState(false)

    useEffect(()=>{
        try{
            const check=checkLoggedIn()
            if (check!==false){
                setLoggedIn(true)
            }
            console.log(check,"check")
        }
        catch(err){
            console.log(err ,"err")
            console.log("Not Logged In")
        }
    },[])

    return (
        <div className="h-screen w-screen bg-gradient-to-r from-[#3c4c64] to-[#242c44]  ">
            <Navbar
                loggedIn={loggedIn}
            />
        </div>
    )
}