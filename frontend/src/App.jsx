import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Authenticate from './pages/authenticate'
import UserDashboard from './pages/userDashboard'
import { useEffect,useState } from 'react'
import { checkLoggedIn } from './functions/checkLoggedIn'
import ManageUsers from './pages/manageUsers'

function App() {

    const [loggedIn,setLoggedIn]=useState(false)

    useEffect(()=>{
        try{
            const loggedIn=checkLoggedIn()
            if (loggedIn!==false){
                setLoggedIn(true)
            }
        }
        catch(err){
            console.log("Not Logged In")
        }
    },[])

    return (
        <div>
            {
                <Router>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/userDashboard' element={<UserDashboard/>} />
                        <Route path='/authenticate' element={<Authenticate/>} />
                        <Route path='/manageUsers' element={<ManageUsers/>} />
                    </Routes>
                </Router>
            }
        </div>
    )
}

export default App
