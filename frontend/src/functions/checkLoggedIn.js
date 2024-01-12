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
                alert(res.error,"error")
                return false
            }
            else{
                return true
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
            return false
    }
}
