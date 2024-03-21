import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import avatar from '../assets/profile.png';
import toast,{Toaster} from 'react-hot-toast';
import {useFormik} from 'formik'
import useFetch from '../hooks/fetch.hook';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { passwordValidate } from '../helper/validate';
import { useAuthStore } from '../store/store'
import { verifyPassword } from '../helper/helper'
import styles from '../styles/Username.module.css';

export default function Password() {

  
  useGSAP(() => {
    gsap.to('#text', { opacity: 1,y:70, delay: 1.5 })
    gsap.to('#btn', { opacity: 1, y:70, delay: .5 })
  }, [])

  const navigate = useNavigate()
  const { username } = useAuthStore(state => state.auth)
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)

  const formik = useFormik({
    initialValues : {
      password : ''
    },
    validate : passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      
      let loginPromise = verifyPassword({ username, password : values.password })
      toast.promise(loginPromise, {
        loading: 'Checking...',
        success : <b>Login Successfully...!</b>,
        error : <b>Password Not Match!</b>
      });

      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/profile')
      })
    }
  })


  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="container mx-auto">
       
       <Toaster position='bottom-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen '>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Hello {apiData?.firstName||apiData?.username}!</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Tired of Taking Notes. Don't Worry Now!!
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit} >
              <div className='profile flex justify-center py-4'>
                  <img src={apiData?.profile||avatar} className={styles.profile_img} alt="avatar" />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Password' />
                  <button id='btn' className={styles.btn} type='submit'>Sign in</button>
              </div>

              <div className="text-center flex align-middle justify-center py-4">
                <span  id='text' className='text-gray-500 absolute opacity-0'>Forgot Password <Link className='text-red-500' to="/recovery">Recover Now</Link></span>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}
