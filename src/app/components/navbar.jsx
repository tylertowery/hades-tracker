'use client'

import { useRouterContext } from '../context/RouterContext.js';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase_setup/config.js';
import { useAuthContext } from '../context/AuthContext.js';

export default function NavBar() {
  const router = useRouterContext();
  const { user } = useAuthContext();

  const handleHome = () => {
    router.push('/');
  }

  const handleSignIn = () => {
    router.push('/sign-in');
  }

  const handleSignOut = () => {
    router.push('/');
    signOut(auth)
  }

  return (
    <div className='nav-bar'>
      <h2 onClick={handleHome}>Home</h2>
      {user ?
        <h2 onClick={handleSignOut}>{auth.currentUser?.displayName}</h2>
        :
        <h2 onClick={handleSignIn}>sign in</h2>}
    </div>
  );
}