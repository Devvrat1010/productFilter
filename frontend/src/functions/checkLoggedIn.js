export function checkLoggedIn() {
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
                return false
            }
            else{
                const check=window.sessionStorage.getItem("user")
                if (check){
                    return true
                }
                else{
                    window.sessionStorage.setItem("user",JSON.stringify(res.user))
                }
                return true
            }
            
        })
        .catch(err =>{  
            console.log(err,"err")
            return false
        })
    }
    catch(err){
        console.log(err,"err")
            return false
    }
}
