import React, {useState}from 'react';
import "./register.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const registerUser = () => {
        const { username, email, password, confirmPassword } = user;

        if(username && password && confirmPassword && email && confirmPassword === password){
            axios.post("https://g-auth-nasa-react-node.vercel.app/register", user)
            .then((res)=>{
                alert( res.data.message)
                if(res.data.message !== "ERR") {
                  console.log('Creation Success', res.status)
                  navigate('/login')
                }
                else {
                  console.log('OUT')
                  navigate('/register')
                }
              })
        }
        else{
            alert("Please give the correct details");
        }
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUser({
            ...user, 
            [name] :value
        })
    }

  return (
    <div className='register'>
      <h1>Register</h1>
      {console.log(user)}
      <input type = "text" name = "username" value={user.username} placeholder='Username' onChange = {handleChange}></input>
      <input type = "text" name = "email" value={user.email} placeholder= "Enter your email" onChange = {handleChange}></input>
      <input type = "password" name = "password" value={user.password} placeholder="Enter your password" onChange = {handleChange}></input>
      <input type = "password" name = "confirmPassword" value={user.confirmPassword} placeholder="Re-Enter your password" onChange = {handleChange}></input>
      <div className='button' onClick = {registerUser}>Register</div>
      <div>or</div>
      <div className='button' onClick = {() => {navigate("/login")}}>Login</div>
    </div>
  )
}

export default Register;