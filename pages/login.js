import Head from 'next/head'
import Layout from './layout/layout'
import Link from 'next/link'
import styles from '../styles/form.module.css'
import Image from 'next/image'
import { useState } from 'react'
import { HiEyeOff,HiAtSymbol} from "react-icons/hi";
import {  signIn, signOut } from "next-auth/react"
import{useFormik} from 'formik';
import login_validate from '../lib/validate'

import { useRouter } from 'next/router'






export default function login(){

const router =useRouter()
    const[Show,setShow]=useState(false)
    //formik hook
    const formik =useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validate:login_validate,
        onSubmit
    })



    async function onSubmit(values){
        const status = await signIn('credentials',{
            redirect:false,
            email:values.email,
            password:values.password,
            callbackUrl:"/"
        })
        console.log(status)

        if(status.ok)router.push(status.url)
    }

    // google handler function
    async function handleGoogleSignin(){
        signIn('google',{callbackUrl:"http://localhost:3000"})
    }
    // 
    async function handleGithubSignin(){
        signIn('github',{callbackUrl:"http://localhost:3000"})
    }


    return (
        <Layout>

            <Head>
                <title>login</title>
            </Head>
            <section className='w-3/4 mx-auto flex flex-col gap-10'>
                <div className='title'>
                    <h1 className='text-gray-800 text-4xl font-bold py-4'>explore</h1>
                    <p className='w-3/4 mx-a text-gray-400'>haiii</p>
                </div>
                {/* {form} */}
                <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
                    <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600':''}`}>
                        <input type='email' 
                        name='email'
                         placeholder='Email' 
                         {...formik.getFieldProps('email')}
                        // onChange={formik.handleChange} value={formik.values.email}
                         className={styles.input_text} />
                        <span className='icon flex items-center px-4'><HiAtSymbol size={25}/></span>
                        
                    </div>
                    {/* {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span>:<></>} */}
                    <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600':''}`}>
                        <input type={`${Show ? "text":"password"}`} 
                        name='password' 
                        placeholder='password'
                        //  onChange={formik.handleChange} value={formik.values.password} 
                        {...formik.getFieldProps('password')}
                         className={styles.input_text}/>
                        <span className='icon flex items-center px-4' onClick={()=> setShow(!Show)}><HiEyeOff size={25}/></span>
                        
                    </div>
            {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span>:<></>} */}
                    {/* {login button} */}
                    <div className='input-button'>
                        <button type='submit' className={styles.button}>
                            Login
                        </button>
                        <div className='input-button'>
                        <button type='button' onClick={handleGoogleSignin} className={styles.button_custom}>
                        Sign in With Google<Image src={'/assets/image4.png'} width='20' height={20}></Image>
                        </button>
                        </div>
                        <div className='input-button'>
                        <button type='button'  onClick={handleGithubSignin} className={styles.button_custom}>
                        Sign in With Github<Image src={'/assets/image6.png'} width='20' height={20}></Image>
                        </button>
                        </div>
                    </div>
                </form>
                <p className='text-center text-gray-400'>
                    dont have account click link <Link legacyBehavior href={'/register'}><a className='text-blue-700'>Sign Up</a></Link>
                </p>
                {}


            </section>
        </Layout>
    )
}