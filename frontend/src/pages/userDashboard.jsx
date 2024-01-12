import { useEffect,useState } from "react"
import { checkLoggedIn } from "../functions/checkLoggedIn"
import Navbar from "../components/navbar"

export default function UserDashboard() {
    
    const [userDetails,setUserDetails]=useState({})

    useEffect(()=>{
        try{    
            try{
                const checkUser=window.sessionStorage.getItem("user")
                setUserDetails(JSON.parse(checkUser))
                console.log(userDetails,"usesssr")
            }
            catch(err){
                const loggedIn=checkLoggedIn()
                if (loggedIn!==false){
                    const checkAgain=window.sessionStorage.getItem("user")
                    // setUserDetails(JSON.parse(checkAgain))
                }
            }
        }
        catch(err){
            window.location.href="/authenticate"
            console.log("Not Logged In")
        }
    },[])

    return(
        <div className="h-screen w-screen bg-gradient-to-r from-[#3c4c64] to-[#242c44]  ">
            <Navbar
                loggedIn={true}
                dashboard={true}
            />
        </div>
    )
}