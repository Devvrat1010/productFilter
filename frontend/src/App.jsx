import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
// import Home from './pages/Home'
import Login from './pages/Login'
import { useEffect,useState } from 'react'

function App() {

    const [loggedIn,setLoggedIn]=useState(false)


    return (
        <div>
            {
                loggedIn?
                    <Router>
                        <Routes>
                            <Route
                                path='/' element={<Login />}
                                />
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
