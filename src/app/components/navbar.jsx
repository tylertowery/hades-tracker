'use client'

import { useRouter } from 'next/navigation';

export default function NavBar() {
  const router = useRouter();

  const handleHome = () => {
    router.push('/');
  }

  const handleSignIn = () => {
    router.push('/sign-in');
  }

  return (
    <div className='nav-bar'>
      <h2 onClick={handleHome}>Home</h2>
      <h2 onClick={handleSignIn}>sign in</h2>
    </div>
  );
}