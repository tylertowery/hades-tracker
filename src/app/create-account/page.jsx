'use client';

import NavBar from '../components/navbar';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { createUserDoc, getUserData } from '../services/boonService.js';
import { auth, db } from '../../lib/firebase_setup/config.js';
import { doc, collection, addDoc } from 'firebase/firestore';
import { useRouterContext } from '../context/RouterContext.js';
import { useDispatch, useSelector } from 'react-redux';
import { setBoonsData, setWeaponsData } from '../../store/store.js';

export default function CreateAccount() {
  // const [userData, setUserData] = useState(null);
  const emailRef = useRef();
  const passwordRef = useRef();
  const displayNameRef = useRef();

  const dispatch = useDispatch();
  const router = useRouterContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("creating account");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
      const user = userCredential.user;
      console.log('this is the user now: ', user);

      await updateProfile(auth.currentUser, {
        displayName: displayNameRef.current.value
      });

      await createUserDoc(user.uid, emailRef.current.value);

      const userData = await getUserData(user.uid);

      dispatch(setBoonsData(userData.boons));
      dispatch(setWeaponsData(userData.weapons));

      console.log('successfully signed in');
      setTimeout(() => {
        router.push('/');
      }, 500);

    } catch (error) {
      console.log('error: ', error);
      alert(error.message);
    }
    // createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
    //   .then((userCredential) => {
    //     const user = userCredential.user;
    //     console.log('this is the user now: ', user);

    //     return updateProfile(auth.currentUser, {
    //       displayName: displayNameRef.current.value
    //     })
    //       .then(() => {
    //         return createUserDoc(user.uid, emailRef.current.value);
    //       })
    //       .then(() => {
    //         alert('successfully signed in');
    //         setTimeout(() => {
    //           router.push('/');
    //         }, 500);
    //       })
    //       .catch((error) => {
    //         console.log('Error creating user doc: ', error);
    //         alert('Failed to create user doc');
    //       });
    //   })
    //   .catch((error) => {
    //     console.log('Error updating profile with display name: ', error);
    //     alert('Failed to update user profile with display name');
    //   });
  };



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