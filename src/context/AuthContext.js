import { createContext, useEffect, useState  } from "react";
import {UserLogInRequest} from '../client/generated/dms_pb.js';
import client from '../client/generated/gRPCClient/client.js'
import cookies from './CookieManager.js'

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null )

    const login = async(inputs) => {

        let userLogInrequest = new UserLogInRequest();
        console.log(inputs)
        userLogInrequest.setEmail(inputs.email);
        userLogInrequest.setPassword(inputs.password);
    
        client.logInUser(userLogInrequest, {}, (err,userLogInResponse) => {
            if(userLogInResponse && userLogInResponse.getSuccess()) {
                cookies.set('access_token', userLogInResponse.getToken())
                //localStorage.setItem('token', userLogInResponse.getToken())
                setCurrentUser(userLogInResponse.getToken())
                //setCurrentUser(dataJWT);
            } 
        })
    }

    const logout = async(inputs) => {
        cookies.remove("access_token")
        setCurrentUser(null);

    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);


    return ( 
      <AuthContext.Provider value={{ currentUser, login, logout }}>
        {children}
      </AuthContext.Provider>
    )
}