export function checkLoggedIn() {
    try{
        const token=document.cookie.split('; ').find(row => row.startsWith('LOGIN_INFO')).split('=')[1];
        fetch('https://backend-productfilter.onrender.com/checkUser', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': token
            },
        })
        .then(res => res.json())
        .then(res=>{
            if (res.error){
                window.sessionStorage.removeItem("user")
                return false
            }
            else{
                window.sessionStorage.setItem("user",JSON.stringify(res.user))
                return true
            }
            
        })
        .catch(err =>{  
            window.sessionStorage.removeItem("user")
            // console.log(err,"err")
            return false
        })
    }
    catch(err){
        window.sessionStorage.removeItem("user")
        // console.log(err,"err")
        return false
    }
}
