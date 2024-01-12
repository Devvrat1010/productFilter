export function logout(){
    document.cookie = "LOGIN_INFO=;max-age=0;path=/"
    window.location.href="/"
}