export function logout(){
    window.sessionStorage.removeItem("user")
    document.cookie = "LOGIN_INFO=;max-age=0;path=/"
    window.location.href="/"
}