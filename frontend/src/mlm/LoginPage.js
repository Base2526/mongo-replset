import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useApolloClient } from "@apollo/client";
import { useDeviceData } from "react-device-detect";
import _ from "lodash";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from '@mui/icons-material/Lock';

import { mutationLogin } from "../apollo/gqlQuery"
import { setCookie, getHeaders, handlerErrorApollo } from "../util"

const LoginPage = (props) => {
    const deviceData = useDeviceData();
    const navigate = useNavigate();
    const location = useLocation();

    let { user, updateProfile, onRefresh } = props

    console.log("props :", props)

    let [input, setInput]   = useState({ username: "",  password: ""});
    const [onLogin, resultLogin] = useMutation(mutationLogin, { 
        context: { headers: getHeaders(location) },
        onCompleted: async(datas)=>{
            console.log("onCompleted :", datas)
            let {status, data, sessionId} = datas.login
            if(status){
                // localStorage.setItem('usida', sessionId)
                setCookie('usida', sessionId)
                updateProfile(data)
            }

            navigate("/")
            onRefresh()
        },
        onError(err){
            console.log("onError :", err)
            handlerErrorApollo(props, err)
        }
    });

    // const handleLogin = () => {
    //     if (username === 'user' && password === 'password') {
    //     localStorage.setItem('auth', 'true');
    //     navigate('/');
    //     } else {
    //     alert('Invalid credentials');
    //     }
    // };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
          ...prev,
          [name]: value
        }));
    };

    const handleSubmit = (event) =>{
        event.preventDefault();    

        onLogin({ variables: { input: { username: input.username,  password: input.password, deviceAgent: JSON.stringify(deviceData) }} })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {/* <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /> */}
                {/* <button onClick={handleLogin}>Login</button> */}
                <div className="d-flex form-input">
                    <label>Username </label>
                    <div className="position-relative wrapper-form">
                        <input type="text" name="username" className="input-bl-form" value={input.username} onChange={onInputChange} required />
                        <AccountCircle />
                    </div>
                </div>
                <div className="d-flex form-input">
                    <label>Password </label>
                    <div className="position-relative wrapper-form">
                        <input type="password" name="password" className="input-bl-form" value={input.password} onChange={onInputChange} required />
                        <LockIcon/>
                    </div>
                </div>
                <button type="submit">Login</button> 
            </form>
        </div>
    );
}

export default LoginPage;