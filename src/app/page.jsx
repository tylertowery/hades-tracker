'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from "./components/navbar.jsx";

export default function Home() {
  const [signedIn, setSignedIn] = useState(false);

  const router = useRouter();

  const handleCreate = () => {
    router.push('/create-account');
  }

  const handleSignIn = () => {
    router.push('/sign-in');
  }

  return (
    <div className='home-background'>
      <NavBar />
      <div className='welcome'>
        <h1>Welcome to Hades Tracker</h1>
        <h3>The best place to keep track of your feats during your travels through the Underworld. </h3>
        <div className='welcome-buttons'>
          <button onClick={handleCreate}>Create Account</button>
          <button onClick={handleSignIn}>Sign In</button>
        </div>
      </div>
    </div>
  );
}
