import { signIn } from 'next-auth/react';

export default async function handler(req, res) {
  const { provider } = req.query;

  // try {
  //   const result = await signIn(provider, { callbackUrl: `${process.env.NEXT_AUTH_URL}/dashboard` });
  //   console.log('result: ', result);
  //   if (result?.error) {
  //     throw new Error(`OAuth sign in error: ${result.error}`);
  //   }

  //   res.redirect('/');
  // } catch (error) {
  //   console.error('OAuth sign in error message: ', error.message);
  //   res.status(500).send('OAuth callback error');
  // }
}