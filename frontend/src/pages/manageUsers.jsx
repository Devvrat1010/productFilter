import React,{useState,useEffect} from 'react'

export default function ManageUsers() {
    
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
                }
            }
        }
        catch(err){
            window.location.href="/authenticate"
            console.log("Not Logged In")
        }
    },[])

    return (
        <div>

        </div>
    )
}