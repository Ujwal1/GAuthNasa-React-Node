import React, {useState} from 'react';
import axios from 'axios';
import "./login.css";
import { useNavigate } from "react-router-dom";
import { navigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email:"",
    password:"",
})

const userLogin = () => {
  
  axios.post("http://g-auth-nasa-react-node.vercel.app/login", user)
  .then((res)=>{
    alert( res.data.message)
    if(res.data.message !== "Password didn't match") {
      console.log('IN',)
      navigate('/homepage')
    }
    else {
      console.log('OUT')
      navigate('/login')
    }
  })
  

}

const handleChange = (e) =>{
    const {name, value} = e.target;
    setUser({
        ...user, 
        [name] :value
    })
}

const responseMessage = (response) => {
  console.log(response);
};
const errorMessage = (error) => {
  console.log(error);
};
  return (
    <div className='login'>
      <h1>Login</h1>
      <input type = "text" name = "email" value={user.email} placeholder= "Enter your email" onChange = {handleChange}></input>
      <input type = "password" name = "password" value={user.password} placeholder="Enter your password" onChange = {handleChange}></input>
      <div className='button' onClick={userLogin}>Login</div>
      <GoogleLogin onSuccess={userLogin} onError={errorMessage} size="large" width="400px" shape="pill"/>
      <div>or</div>
      <div className='button' onClick = {() => {navigate("/register")}}>Register</div>
      <span></span>
      
    </div>
  )
}

export default Login
