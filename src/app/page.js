'use client'

import { useState } from 'react';
import NavBar from "./components/navbar.jsx";

export default function Home() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <div className='home-background'>
      <NavBar />
      <div className='welcome'>
        <h1>Welcome to Hades Tracker</h1>
        <h3>The best place to keep track of your feats during your travels through the Underworld. </h3>
        <div className='welcome-buttons'>
          <button>Create Account</button>
          <button>Sign In</button>
        </div>
      </div>
    </div>
  );
}
