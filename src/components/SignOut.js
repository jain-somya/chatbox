import React from 'react'
import { signOut } from "firebase/auth";

export default function SignOut({auth}) {
  
    return (
        auth.currentUser && <button onClick={() => signOut()}>Sign Out</button>
      );
  
}
