import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import { useEffect,useState } from 'react'

function App() {

    const [loggedIn,setLoggedIn]=useState(false)

    useEffect(() => {
        let check=document.cookie ;
        console.log(check)
        let check2=check.split(';')
        let cookies={}
        for (let i=0;i<check2.length;i++){
            let check3=check2[i].split('=')
            cookies[check3[0]]=check3[1]
        }
        console.log(cookies)
        if (cookies.LOGIN_INFO){
            setLoggedIn(true)
        }
    },[])

  return (
    <div>
        {
            loggedIn?
            <Router>
                <Routes>
                    <Route
                        path='/' element={<Home />}
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
