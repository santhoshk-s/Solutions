import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import styles from '../styles/Register.module.css';
import { profileValidation} from '../helper/validate';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import convertToBase64 from '../helper/convert';
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper'



export default function Profile() {

  const navigate = useNavigate()
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();

  const formik = useFormik({
    initialValues : {
      firstName : apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address : apiData?.address || ''
    },
    enableReinitialize: true,
    validate : profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, { profile : file || apiData?.profile || ''})
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success : <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>
      });

    }
  })
  useGSAP(() => {
    gsap.to('#text', { opacity: 1,y:50, delay: 1 })
    gsap.to('#btn', { opacity: 1, y:220, delay: .5 })
  }, [])

  /** formik doensn't support file upload so we need to create this handler */
  let onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>


  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-4xl font-bold pt-5 pb-2'>Profile</h4>
            <span className='py-1 text-xl w-2/3 text-center text-gray-500'>
                Happy to join you!
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                  <label htmlFor="profile">
                    <img src={apiData?.profile || file || avatar} className={styles.profile_img} alt="avatar" />
                  </label>
                  
                  <input onChange={onUpload} type="file" id='profile' name='profile' />
              </div>

              <div className="textbox flex flex-col items-center gap-6 relative">

               <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('firstname')} className={styles.textbox} type="text" placeholder='Firstname' />
                  <input {...formik.getFieldProps('lastname')} className={styles.textbox} type="text" placeholder='Lastname' />
                </div>

                <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('mobile')} className={styles.textbox} type="text" placeholder='Mobile No' />
                  <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email' />
                </div>

                <input {...formik.getFieldProps('address')} className={styles.textbox} type="text" placeholder='Address' />
                <button id='btn' className={styles.btn} type='submit'>Update</button>

                 
              </div>

              <div className="text-center relative py-4">
                <span id='text' className='text-gray-500  opacity-0 '>Hey! need to Sign off? <button onClick={userLogout} className='text-red-500' to="/">Log Out</button></span>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}

