import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const LogIn = (props) => {
    let navigate = useNavigate();
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate("/");
        }
    }, [navigate]);
    const [credentials, setCredentials] = useState({ email: "", password: "", loginType: "user" });
    let history = useNavigate();

    const redirecttolocal = (PORT) => {
        window.location.href = `http://localhost:${PORT}`;
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Here we check", credentials);
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });


        const json = await response.json();

        console.log(json);
        console.log("Rattu thiis is credential type value", credentials.loginType);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            console.log(credentials.loginType);
            if (credentials.loginType === 'user') {
                redirecttolocal(5500);
            }
            else if (credentials.loginType === 'shopkeeper') {
                redirecttolocal(6000);
            }
            else if (credentials.loginType === 'devboy') {
                redirecttolocal(7000);
            }
            else {
                navigate("/");
            }
        }
        else {
            // alert("Invalid Credentials");
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }
    return (
        <div className='container my-3'>
            <h3> LogIn to Continue </h3>
            <form onSubmit={handleLogin}>
                <select className="form-control" id="loginType" name="loginType" onChange={onchange}>
                    <option value="user">user</option>
                    <option value="shopkeeper">shopkeeper</option>
                    <option value="devboy">deliveryboy</option>
                </select>


                <div className="form-group " >
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} onChange={onchange} name='email' aria-describedby="emailHelp" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onchange} name='password' id="password" />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>


        </div>
    )
}

export default LogIn