'use client'

import NavBar from '../components/navbar';
import { useState } from 'react';
import { useRef } from 'react';
import Link from 'next/link';
import { useRouterContext } from '../context/RouterContext.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getUserData } from '../services/boonService.js';
import { auth } from '../../lib/firebase_setup/config.js';
import { useDispatch, useSelector } from 'react-redux';
import { setBoonsData, setWeaponsData } from '../../store/store';

export default function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const router = useRouterContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signing in");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
      const user = userCredential.user;

      const userData = await getUserData(user.uid);
      console.log('user data: ', userData);

      dispatch(setBoonsData(userData.boons));
      dispatch(setWeaponsData(userData.weapons));
      router.push('/');
    } catch (error) {
      console.log('Error signing in: ', error);
      alert(error.message);
    }
  }

  return (
    <div className='account-background'>
      <NavBar />
      <div className='account-container'>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} className='account-form'>
          <div className='input-group'>
            <input className='account-input' id='signin-email' type='signin-' ref={emailRef} tabIndex='1' required />
            <label htmlFor='signin-email'>Email</label>
          </div>
          <div className='input-group'>
            <input className='account-input' id='signin-password' type='password' ref={passwordRef} tabIndex='2' required />
            <label htmlFor='signin-password'>Password</label>
          </div>
          <button className='account-button' type='submit'>Sign In</button>
        </form>
        <Link className='link' href='/create-account'>Don't have an account already?</Link>
      </div>
    </div>
  )
}