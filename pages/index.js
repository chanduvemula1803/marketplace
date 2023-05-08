import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {useState} from 'react'
import { getSession,useSession,signOut} from "next-auth/react"

export default function Home() {
  const{ data:session}=useSession()

function handleSignOut(){
  signOut()
}

  return ( 
    <div className={styles.container}>
      <head>
        <title>Home page</title>
      </head>
    
  
{session ? User({session,handleSignOut}): Guest()}
  
  </div>
  )
}

//Guest
function Guest(){
  return(
    <><main className='container mx-auto text-center py-20'>
      <h3 className='text-4xl font-bold'>Guest Homepage</h3>

      <div className='flex justify-center'>
        <Link href={'/login'}><a className='mt-5 px-10 rounded-sm bg-indigo-500 text-gray'>Sign In</a> </Link>
      </div>
    </main></>
  )
}
//Authorized user

function User( { session,handleSignOut }){
  return(

    <main className='container mx-auto text-center py-20'>
      <h3 className='text-4xl font-bold'>Authorize User Homepage</h3>
      <div className='details'>
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>
      <div className='flex justify-center'>
        <button onClick={handleSignOut} className='mt-5 px-10 rounded-sm bg-indigo-500 bg-gray-50'>Sign Out</button>
      </div>

      <div className='flex justify-center'>
        <Link href={'/profile'}><a className='mt-5 px-10 rounded-sm bg-indigo-500 text-gray'>Profile page</a> </Link>
      </div>
    </main>

  )
}

// unauthorised user

export async function getServerSideProps({req}){
  const session =await getSession({req})
if(!session){
  return{
    redirect:{
      destination:'/login',
      permanent:false
    }
  }
}
  return{
    props:{session}
  }
}