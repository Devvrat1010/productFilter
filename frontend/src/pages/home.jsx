import { useEffect, useState } from "react"
import { checkLoggedIn } from "../functions/checkLoggedIn"
import Navbar from "../components/navbar"
import Hero from "../assets/hero.png"
export default function Home() {

    const [loggedIn,setLoggedIn]=useState(false)

    useEffect(()=>{
        try{
            const check=checkLoggedIn()
            if (check!==false){
                setLoggedIn(true)
            }
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
            <div className="px-24 font-poppins flex">
                <div className="text-[#52c3ba] min-[1919px]:w-1/2 w-3/5 ">
                    <div className="text-8xl mt-24">
                        Access Master: 
                        <div className="text-4xl mt-3">
                            Empowering Effortless User Management  
                        </div>
                    </div>
                    <div className="mt-12 text-lg opacity-80 w-5/6">
                        Streamline your website's user administration with our intuitive platform. Gain complete control over user access, permissions, and profiles. Simplify user onboarding, monitor activities, and enhance security seamlessly. Experience a centralized hub for efficient, hassle-free user management.
                    </div>
                </div>
                <div className="min-[1919px]:p-24 pt-24">
                    <img src={Hero} className="2xl:h-[600px] h-[450px]" alt="" />
                </div>
            </div>
        </div>
    )
}