import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
{/*
    My approach is to create a registration form which consists of the following features:
    1. User registration form with form validations like required
    2. Upon successfully filling the form the data is sent to the backend to store it in the database
    3. If successfully registered , then I invoked alert using alert() function to update the user that successfully registered
    4. Then navigating to the home page upon successful registration    
*/}

function Register() {
    let { register, handleSubmit, formState: { errors } } = useForm()
    const navigate=useNavigate()
    let registerUser=async(userObj)=>{
        console.log(userObj)
        await axios.post('http://localhost:4900/user/register',userObj)
        .then((res)=>{ 
            console.log(res)
            alert("Registered successfully")
            navigate('/home')
        })
        .catch((err)=>console.log(err))
    }
  return (
    <div className='row d-block'>
        <h4 className='text-center fw-bold fs-1 mt-5'>Task Rabbit</h4>
        <form className='form col-sm-6 col-md-10 col-lg-5 mx-auto border shadow mt-4 p-3 rounded' onSubmit={handleSubmit(registerUser)}>
            <div className='mt-2'>
            <label htmlFor='username'>Username</label>
            <input type='text' id='username' className='form-control'  {...register('username', { required: true })}></input>
            </div>
            <div className='mt-2'>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' className='form-control'  {...register('password', { required: true })}></input>
            </div>
            <div className='mt-2'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' className='form-control'  {...register('email', { required: true })}></input>
            </div>
            <button className='btn btn-dark mt-4 d-block mx-auto' type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Register