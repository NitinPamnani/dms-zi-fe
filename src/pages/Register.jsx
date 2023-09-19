import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='auth'>
      <h1>Register</h1>
      <form>
        <input required type="text" placeholder="username"/>
        <input required type="email" placeholder="email"/>
        <input type="password" placeholder="password"/>
        <p>Error here!</p>
        <span>Do you have an account? <Link to="/login">Login</Link></span>
        <button>Register</button>
      </form>
    </div>
  )
}

export default Register  