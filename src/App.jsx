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
            console.log("No cookie")
            console.log(cookies.LOGIN_INFO,"token")
            fetch('https://dummyjson.com/auth/RESOURCE',{
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZyIsImlhdCI6MTcwNDI4OTkzMSwiZXhwIjoxNzA0MjkzNTMxfQ.grwkxh8xUlLHSrxELFdJQ_myWGdOKJER9ZhC2_3R4yU', 
                    'Content-Type': 'application/json'
                }
            })
            .then(res => console.log(res,"ress"))
            .then(res => res.json())
            .then(res=>{
                console.log(res,"Res")
            })
            .catch(err => console.log(err,"erer"))
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
