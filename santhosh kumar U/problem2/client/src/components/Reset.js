import React from 'react'
import { Link } from 'react-router-dom'
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { resetPasswordValidation } from '../helper/validate';

 
import styles from '../styles/Username.module.css';

export default function Reset() {

  const formik = useFormik({
    initialValues:{
      password:'',
      confirm_pwd:''
    },
    validate:resetPasswordValidation,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async values =>{
      console.log(values)
    }
  })

  useGSAP(() => {
    gsap.to('#text', { opacity: 1,y:70, delay: 1.5 })
    gsap.to('#btn', { opacity: 1, y: 160, delay: .5 })
  }, [])

  return (
    <div className="container mx-auto">
       
       <Toaster position='bottom-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen '>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Reset?</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Tired of Taking Notes. Don't Worry Now!!
            </span>
          </div>

          <form className='pt-3 pb-4' onSubmit={formik.jhandleSubmit} >

              <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='New Password' />
                  <input {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} type="password" placeholder='Repeat Password' />
                  <button id='btn' className={styles.btn} type='submit'>Reset</button>
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
