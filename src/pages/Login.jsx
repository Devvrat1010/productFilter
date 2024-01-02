import React from "react";

export default function Login() {
    return (
        <div>
            
            <form action="" id="formData" class="formData" >
                <div class="formHeading">
                    Log in
                </div>
                <div class="fieldContainer">
                    <label for="email">Email</label>
                    
                    
                </div>
                <div class="fieldContainer">
                    <label for="email">Password</label>
                    <input type="password" class="inputField" id="password" />
                </div>
                <div class="fieldContainer">
                    <a href="">
                        <input type="submit" class="btn loginButton" id="submitButton" value="Sign In"/>
                    </a>
                </div>

                <div id="message" >
                    
                </div>
            </form>
        </div>
    )
}