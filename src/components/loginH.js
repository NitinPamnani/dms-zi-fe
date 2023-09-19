import React, { useContext, useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import {DocumentManagementServiceClient} from '../client/generated/dms_grpc_web_pb.js';
import {UserLogInRequest} from '../client/generated/dms_pb.js';
import { LogInContext } from '../context/AuthContext.js';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function LogInForm() {
  const [usernameOrEmail, setUserNameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckBox] = useState(false);

  const {token, setToken,} = useContext(LogInContext)
  const {message, setMessage,} = useContext(LogInContext)

  if(localStorage.getItem('token')) {
    setToken(localStorage.getItem('token'));
  }

  const postData = () => {

    

    const client = new DocumentManagementServiceClient('http://localhost:8080');
    

    let userLogInrequest = new UserLogInRequest();
    userLogInrequest.setEmail(usernameOrEmail);
    userLogInrequest.setPassword(password);

    client.logInUser(userLogInrequest, {}, (err,userLogInResponse) => {
        if(userLogInResponse && userLogInResponse.getSuccess()) {
            setToken(userLogInResponse.getToken())
            localStorage.setItem('token', userLogInResponse.getToken())
            let props = {header:"LoggedIn", message:"You are successfully logged in!", level:"success"};
            //setMessage(props)
            toast.success(props.message, {
              position: toast.POSITION.TOP_RIGHT,
              toastId: 'sc222'        
            })
            
        } else {
            let props = {header:"Invalid Credentials", message:"Wrong username/email or password", level:"error"};
            //setMessage(props)
            toast.error(props.message, {
              position: toast.POSITION.TOP_RIGHT,
              toastId: 'sc1'        
            })
        }
    })

    console.log(usernameOrEmail);
    console.log(password);
    console.log(checkbox);

  }

  return(
    <div className='main'>
    <Form>
      <Form.Field className='login-form'>
        <label>Username or Email</label>
        <input placeholder='username or email' onChange={(e) => setUserNameOrEmail(e.target.value)}/>
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
      </Form.Field>
      <Form.Field>
        <Checkbox label='I agree to the Terms and Conditions' onChange={(e) => setCheckBox(!checkbox)}/>
      </Form.Field>
      <Button onClick={postData} type='submit'>Submit</Button>
    </Form>
    <ToastContainer/>
    </div>
   )
  }
  

export default LogInForm