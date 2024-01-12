import { useEffect,useState } from "react"

export default function UserDashboard() {
    
    const [userDetails,setUserDetails]=useState({})

    function checkLoggedIn() {
        try{
            const token=document.cookie.split('; ').find(row => row.startsWith('LOGIN_INFO')).split('=')[1];
            fetch('http://localhost:3000/checkUser', {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': token
                },
            })
            .then(res => res.json())
            .then(res=>{
                if (res.error){
                    alert(res.error,"error")
                    return false
                }
                else{
                    console.log(res.user,"res")
                    const user=JSON.stringify(res.user)
                    return user
                }
                
            })
            .catch(err =>{  
                console.log(err,"err")
                alert(err,"err")
                return false
            })
        }   
        catch(err){
            console.log(err,"err")
            window.location.href="/authenticate"
            return false
        }
    }
    



    useEffect(()=>{
        try{    
            const hehe=checkLoggedIn()
            console.log(hehe,"hehe")
        }
        catch(err){
            window.location.href="/authenticate"
            console.log("Not Logged In")
        }
    },[])

    return(
        <div>
            userDashboard
        </div>
    )
}