'use client'

import NavBar from '../components/navbar';
import { useRef } from 'react';
import Link from 'next/link';

export default function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing in");
  }

  return (
    <div className='account-background'>
      <NavBar />
      <div className='account-container'>
        <h1>Sign In</h1>
        <form onSubmit='handleSubmit' className='account-form'>
          <div className='input-group'>
            <input className='account-input' type='email' ref={emailRef} required />
            <label htmlFor='email'>Email</label>
          </div>
          <div className='input-group'>
            <input className='account-input' type='password' ref={passwordRef} required />
            <label htmlFor='password'>Password</label>
          </div>
          <button className='account-button' type='submit'>Sign In</button>
        </form>
        <Link className='link' href='/create-account'>Don't have an account already?</Link>
      </div>
    </div>
  )
}