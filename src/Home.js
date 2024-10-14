import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
function Home() {
    let { register, handleSubmit, formState: { errors } } = useForm()
    let updateDetails=async(userObj)=>{
        console.log(userObj)
        await axios.post('http://localhost:4900/user/update',userObj)
        .then((res)=>{ 
            console.log(res)
            alert("Updated successfully")
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div className='row'>
        <h3 className='fw-bold text-center mt-5'>Welcome User</h3>
        <div className='col col-lg-6 mx-4 mx-auto'>
            <form className='form border p-5 rounded shadow' onSubmit={handleSubmit(updateDetails)}>
                <div className='mt-3'>
                    <label htmlFor='username' className='d-inline fw-bold'>Username</label>
                    <input type='text' className='form-control' placeholder='hello_world' {...register('username')}></input>
                </div>
                <div className='mt-3'>
                    <label htmlFor='password' className='d-inline fw-bold'>Password</label>
                    <input type='password' placeholder='*********' className='form-control' {...register('password', { required: true })}></input>
                </div>
                <div className='mt-3'>
                    <label htmlFor='email' className='d-inline fw-bold'>Email</label>
                    <input type='email' placeholder='abc@gmail.com' className='form-control' {...register('email', { required: true })}></input>
                </div>
                <button className='btn btn-dark mt-3 d-block mx-auto' type='submit'>Update</button>
            </form>
        </div>
    </div>
  )
}

export default Home