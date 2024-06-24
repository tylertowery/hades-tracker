'use client'

import { useState } from 'react';
import { useRouterContext } from '../app/context/RouterContext.js';
import { useAuthContext } from '../app/context/AuthContext.js';
import NavBar from './components/navbar.jsx';
import BoonsSection from './components/BoonsSection';
import WeaponsSection from './components/WeaponsSection';

export default function Home() {
  const [signedIn, setSignedIn] = useState(false);

  const router = useRouterContext();
  const user = useAuthContext();

  const handleCreate = () => {
    router.push('/create-account');
  }

  const handleSignIn = () => {
    router.push('/sign-in');
  }

  return (
    <div className={`${user.user ? 'tracker' : 'home'}-background`}>
      <NavBar />
      {user.user ?
        <div className='tracker-page'>
          <div className='tracker-container'>
            <BoonsSection />
            <WeaponsSection />
          </div>
        </div>
        :
        <div className='welcome'>
          <h1>Welcome to Hades Tracker</h1>
          <h3>The best place to keep track of your feats during your travels through the Underworld. </h3>
          <div className='welcome-buttons'>
            <button onClick={handleCreate}>Create Account</button>
            <button onClick={handleSignIn}>Sign In</button>
          </div>
        </div>
      }
    </div>
  );
}
