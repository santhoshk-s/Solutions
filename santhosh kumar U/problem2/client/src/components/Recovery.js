import React from 'react'
import { Link } from 'react-router-dom'
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { passwordValidate } from '../helper/validate';

 
import styles from '../styles/Recovery.module.css';

export default function Recovery() {

  const formik = useFormik({
    initialValues:{
      password:''
    },
    validate:passwordValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async values =>{
      console.log(values)
    }
  })

  useGSAP(() => {
    gsap.to('#text', { opacity: 1,y:90, delay: 1.5 })
    gsap.to('#btn', { opacity: 1, y: 110, delay: .5 })
  }, [])

  return (
    <div className="container mx-auto">
       
       <Toaster position='bottom-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen '>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Recovery</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Enter OTP to recover password.
            </span>
          </div>

          <form onSubmit={formik.handleSubmit} >

              <div className="textbox flex flex-col items-center gap-6">
                <div className="input text-center">
                <span className='text-sm text-left text-gray-500'>
                  Enter 6 digit OTP sent to your email address.
                </span>
                  <input  className={styles.textbox} type="password" placeholder='enter your OTP' />
                </div>
                  <button id='btn' className={styles.btn} type='submit'>Recover</button>
                </div>

              <div className="text-center flex align-middle justify-center py-4">
                <span  id='text' className='text-gray-500 absolute opacity-0'>Can't get OTP? <button className='text-red-500'>Resend</button></span>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}
