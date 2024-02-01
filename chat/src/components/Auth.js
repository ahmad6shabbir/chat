import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../firebase-config'
import Cookies from 'universal-cookie'
const cookies = new Cookies();
export const Auth = ({ setIsAuth }) => {
    const signInWithGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        cookies.set("auth-token", result.user.refreshToken);
        setIsAuth(true);
      } catch (err) {
        console.error(err);
      }
    };
    return (
        <div className='auth'>
            <p>Sign In with Google To Continue</p>
            <button onClick={signInWithGoogle} class="login-with-google-btn" >
                Sign in with Google
            </button>
        </div>
    )
}
