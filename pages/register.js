import Head from 'next/head'
import Layout from '../pages/layout/layout'
import { useState } from 'react'
import { HiEyeOff,HiAtSymbol, HiOutlineUser} from "react-icons/hi";

import Link from 'next/link'
import styles from '../styles/form.module.css'
import Image from 'next/image'
import{useFormik} from 'formik';
import {Register_validate} from '../lib/validate'
import { useRouter } from 'next/router';





export default function Register(){

    const router =useRouter()
    const [Show,setShow]=useState({password:false,cpassword:false})
    const formik =useFormik({
        initialValues:{
            Username:'',
            email:'',
            password:'',
            cpassword:''
        },
        validate:Register_validate,
        onSubmit
    })
    async function onSubmit(values){
        console.log(values)
        const options={
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(values)
        }
        await fetch('http://localhost:3000/api/auth/signup',options)
        .then(res=>res.json)
        .then((data)=>{
            if(data) router.push('http://localhost:3000')
        })
    }
    return (
        <Layout>
            <section className='w-3/4 mx-auto flex flex-col gap-10'>
                <div className='title'>
                    <h1 className='text-gray-800 text-4xl font-bold py-4'>Register</h1>
                    <p className='w-3/4 mx-a text-gray-400'>haiii</p>
                </div>
                {/* {form} */}
                <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>

                    <div className={`${styles.input_group} ${formik.errors.Username && formik.touched.Username  ? 'border-rose-600':''}`}>
                        <input type='Text' name='Username'{...formik.getFieldProps('Username')} placeholder='Username' className={styles.input_text} />
                        <span className='icon flex items-center px-4'><HiOutlineUser size={25}/></span>
                    </div>
                    {/* {formik.errors.Username && formik.touched.Username ? <span className='text-rose-500'>{formik.errors.Username}</span>:<></>} */}


                    <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email  ? 'border-rose-600':''}`}>
                        <input type='email' name='email' {...formik.getFieldProps('email')} placeholder='Email' className={styles.input_text} />
                        <span className='icon flex items-center px-4'><HiAtSymbol size={25}/></span>
                    </div>
                    {/* {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span>:<></>} */}


                    <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password  ? 'border-rose-600':''}`}>
                        <input type={`${Show.password ? "text":"password"}`} {...formik.getFieldProps('password')}name='password' placeholder='password' className={styles.input_text}/>
                        <span className='icon flex items-center px-4' onClick={()=> setShow({...Show,password:!Show.password})}><HiEyeOff size={25}/></span>
                    </div>
                    {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span>:<></>} */}

                    <div className={`${styles.input_group} ${formik.errors.cpassword && formik.touched.cpassword  ? 'border-rose-600':''}`}>
                        <input type={`${Show.cpassword ? "text":"password"}`} {...formik.getFieldProps('cpassword')} name='cpassword' placeholder=' Confirm password' className={styles.input_text}/>
                        <span className='icon flex items-center px-4' onClick={()=> setShow({...Show,cpassword:!Show.cpassword})}><HiEyeOff size={25}/></span>
                    </div>
                    {/* {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span>:<></>} */}


                    {/* {login button} */}
                    <div className='input-button'>
                        <button type='submit' className={styles.button}>
                            SignUp
                        </button>
                        
                    </div>
                </form>
                <p className='text-center text-gray-400'>
                    Already have account click link <Link legacyBehavior href={'/login'}><a className='text-blue-700'>Sign In</a></Link>
                </p>
                {}


            </section>
        </Layout>
    )
}