import React,{useState,useEffect} from 'react'
import Navbar from '../components/navbar'
import EditUserForm from '../components/editUserForm'
export default function ManageUsers() {
    
    const [userDetails,setUserDetails]=useState({})
    const [allUsers,setAllUsers]=useState([])
    const [edit,setEdit]=useState(false)
    const [selectedUser,setSelectedUser]=useState({})

    const buttonStyle="text-[#242c44] px-4 py-2 rounded-full shadow-2xl text-lg font-medium text-white bg-gradient-to-r from-[#6de4cc] to-[#52c3bA] hover:from-[#52c3bA] hover:to-[#6de4cc] hover:shadow-none hover:cursor-pointer h-fit"

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

            fetch('http://localhost:3000/getAllUsers', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(res=>{
                console.log(res,"res")
                if (res.error){
                    alert(res.error)
                    return
                }
                else{
                    setAllUsers(res)
                }
            })
            .catch(err =>{ 
                console.log(err)
                alert(err)
            })
        }
        catch(err){
            window.location.href="/authenticate"
            console.log("Not Logged In")
        }
    },[])

    const editSelectedUser=(e)=>{
        setEdit(!edit)
        const curr=e.target.parentElement.parentElement.childNodes[0].childNodes[1].childNodes[1].innerHTML
        setSelectedUser(allUsers.filter((user)=>user.email===curr)[0])
        console.log(selectedUser,"edit")
    }
    
    const deleteSelectedUser=(e)=>{
        const curr=e.target.parentElement.parentElement.childNodes[0].childNodes[1].childNodes[1].innerHTML
        setSelectedUser(allUsers.filter((user)=>user.email===curr)[0])
        fetch('http://localhost:3000/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email : selectedUser.email
             })
        })
        console.log("delete")
    }

    return (
        <div className="h-screen w-screen bg-gradient-to-r from-[#3c4c64] to-[#242c44] ">
            <Navbar
                loggedIn={true}
                manageUsers={true}
            />
            <div className='flex flex-col px-20 py-5'>

            {
                allUsers.map((user)=>{
                    return(
                        <div key={user._id}>
                            <div className="flex justify-between items-center p-2" >
                                <div className="flex gap-4">
                                    <img src={user.image} className="h-20 w-20" alt="" />
                                    <div className="flex flex-col gap-2">
                                        <div className="text-xl text-white font-poppins font-light">
                                            {user.name}
                                        </div>
                                        <div className="text-lg text-white font-poppins font-light">
                                            {user.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    {
                                        edit &&
                                        <EditUserForm
                                        userDetails={selectedUser}
                                        />
                                        
                                    }
                                    <div className={buttonStyle} onClick={editSelectedUser}>
                                        {
                                            edit ? "Done" : "Edit"
                                        }
                                    </div>
                                    <div className={buttonStyle} onClick={deleteSelectedUser}>
                                        Delete
                                    </div>
                                </div>
                            </div>
                            <hr />  
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}