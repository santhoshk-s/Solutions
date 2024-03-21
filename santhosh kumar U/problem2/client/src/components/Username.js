import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { usernameValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';


import styles from '../styles/Username.module.css';

export default function Username() {

  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);


  const formik = useFormik({
    initialValues:{
      username:''
    },
    validate:usernameValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit : async values => {
      setUsername(values.username);
      navigate('/password')
    }
  })

  useGSAP(() => {
    gsap.to('#text', { opacity: 1,y:70, delay: 1 })
    gsap.to('#btn', { opacity: 1, y: 70, delay: .2 })
  }, [])

  return (
    <div className="container mx-auto">
       
       <Toaster position='bottom-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen '>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Hello Again!</h4>
            <span className='pt-4 pb-1 text-xl w-2/3 text-center text-gray-500'>
              Tired of Taking Notes. Don't Worry Now!!
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit} >
              <div className='profile flex justify-center py-4'>
                  <img src={avatar} className={styles.profile_img} alt="avatar" />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' />
                  <button id='btn' className={styles.btn} type='submit'>Let's Go</button>
              </div>

              <div className="text-center flex align-middle justify-center py-4">
                <span  id='text' className='text-gray-500 absolute opacity-0'>Not a Member <Link className='text-red-500' to="/register">Register Now</Link></span>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}
