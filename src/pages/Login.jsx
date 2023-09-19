import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AuthContext } from '../context/AuthContext.js';

const Login = () => {

  const [inputs, setInputs] = useState({
    email:"",
    password:""
  });

  const[err, setError] = useState(null);

  const navigate = useNavigate()

  const {currentUser, login, logout} = useContext(AuthContext)

  const handleChange = (e) => {
    setInputs((prev) => ({...prev, [e.target.name]:e.target.value }));
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      await login(inputs);
      navigate("/root")
    } catch (err) {
      setError(err)
    }
  }

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input type='"email' placeholder="email" name='email' onChange={handleChange}/>
        <input type="password" placeholder="password" name='password' onChange={handleChange}/>
        {err && <p>{err}</p>}
        <span>Don't you have an account? <Link to="/register">Register</Link></span>
        <button onClick={handleSubmit}>Login</button>
      </form>
    </div>
  )
}

export default Login  