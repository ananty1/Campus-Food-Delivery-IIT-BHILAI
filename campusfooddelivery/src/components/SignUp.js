import React, { useState } from 'react'
import {redirect, useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({username:"",name:"",email:"",password:""});
    let history = useNavigate();
    const handleSignUp=async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({username:credentials.username, name:credentials.name,email:credentials.email,password:credentials.password})
        });

        const json = await response.json();
        
        console.log(json);
        if(json.success){
          localStorage.setItem('token',json.authtoken);
          history("/");
          props.showAlert("You have successfully created an account","success")
        }
        else{
          // alert("invalid Credentials");

          props.showAlert("Invalid Credentials","danger")
        }
        
    }

    const onchange =(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
        
    }



  return (
    <div className='container my-3'>
      <h3> Create An Account to Use Campus Delivery  </h3>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" id="username" name='username' onChange={onchange} aria-describedby="Username"/>
            
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onchange} aria-describedby="name"/>
            
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onchange} aria-describedby="emailHelp"/>
            
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name='password' onChange={onchange} id="password"/>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUp