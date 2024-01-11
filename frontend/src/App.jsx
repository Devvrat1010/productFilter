import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
// import Home from './pages/Home'
import Login from './pages/login'
import SignUp from './pages/signUp'
import { useEffect,useState } from 'react'

function App() {

    const [loggedIn,setLoggedIn]=useState(false)


    return (
        <div>
            {
                loggedIn?
                    <Router>
                        <Routes>
                            <Route path='/login' element={<Login />} />
                            <Route path='/signUp' element={<SignUp />} />
                        </Routes>
                    </Router>
                :
                <div >
                    <Login/>
                </div>
            }
        </div>
    )
}

export default App
