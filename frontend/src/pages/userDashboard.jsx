import { useEffect,useState } from "react"
import { checkLoggedIn } from "../functions/checkLoggedIn"
import Navbar from "../components/navbar"
import EditUserForm from "../components/editUserForm"
import Dashboard from "../assets/dashboard.png"

export default function UserDashboard() {
    
    const [userDetails,setUserDetails]=useState({})
    const [edit,setEdit]=useState(false)
    const inputStyle="bg-transparent text-white pb-2 font-normal  opacity-80 w-80 focus:outline-none  border-solid border-white border-b-[1px] border-opacity-30 focus:border-opacity-100 hover:border-opacity-100 w-full"

    const inputLabelContainer="flex flex-col gap-1"
    useEffect(()=>{
        try{    
            try{
                const checkUser=window.sessionStorage.getItem("user")
                setUserDetails(JSON.parse(checkUser))
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

    const editUserDetails=()=>{
        if (edit===true){

        }
        setEdit(!edit)
    }

    return(
        <div className="h-screen w-screen bg-gradient-to-r from-[#3c4c64] to-[#242c44]  ">
            <Navbar
                loggedIn={true}
                dashboard={true}
            />
            <div className="flex">

                <div className="px-20 w-1/2">
                    <div className="flex justify-left  gap-10 p-2">
                        <img src={userDetails.image} className="h-72" alt="" />
                        <div className="grid grid-cols-2 justify-between p-2">

                        {
                            !edit ?
                            <div className="text-lg text-gray-100 grid grid-cols-2  xl:gap-5 2xl:gap-6 min-[1919px]:gap-10 font-poppins w-max">
                                <div className={inputLabelContainer}>
                                    <label>FULL NAME</label>
                                    <input type="" id="name" name="name"  defaultValue={userDetails.name} readOnly className={inputStyle}
                                        />
                                </div>
                                <div className={inputLabelContainer}>
                                    <label>EMAIL</label>
                                    <input id="email" name="email"  defaultValue={userDetails.email} readOnly className={inputStyle}
                                        />
                                </div>
                                <div className={inputLabelContainer}>
                                    <label>PHONE NUMBER</label>
                                    <input id="number" name="number"  defaultValue={userDetails.number}  readOnly className={inputStyle}
                                        />
                                </div>
                                
                                {
                                    !edit &&
                                    <button className="text-[#242c44] px-4 py-2 rounded-full shadow-2xl text-lg font-medium bg-gradient-to-r from-[#6de4cc] to-[#52c3bA] hover:from-[#52c3bA] hover:to-[#6de4cc] hover:shadow-none hover:cursor-pointer h-fit" onClick={editUserDetails}>
                                        Edit
                                    </button>
                                }
                            </div> :
                            <EditUserForm
                                userDetails={userDetails}
                                manage={false}
                            />
                        }
                        </div>
                    </div>
                </div>
                <div className="p-24 mt-16">
                    <img src={Dashboard} className="h-[400px] min-[1919px]:h-[600px]" alt="" />
                </div>
            </div>
        </div>
    )
}