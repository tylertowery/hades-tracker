'use client';

import NavBar from '../components/navbar';
import { useRef } from 'react';
import Link from 'next/link';

export default function CreateAccount() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const displayNameRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("creating account");
  }

  return (
    <div className='account-background'>
      <NavBar />
      <div className='account-container'>
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit} className='account-form'>
          <div className='input-group'>
            <input id='create-email' className='account-input' type='email' ref={emailRef} required />
            <label htmlFor='create-email'>Email</label>
          </div>
          <div className='input-group'>
            <input id='create-password' className='account-input' type='password' ref={passwordRef} required />
            <label htmlFor='create-password'>Password</label>
          </div>
          <div className='input-group'>
            <input id='create-display-name' className='account-input' type='text' ref={displayNameRef} required />
            <label htmlFor='create-display-name'>Display Name</label>
          </div>
          <button className='account-button' type='submit'>Create Account</button>
        </form>
        <Link className='link' href='/sign-in'>Already have an account?</Link>
      </div>
    </div>
  );
}