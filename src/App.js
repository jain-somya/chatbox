import logo from "./logo.svg";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
//import "./App.css"

import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import ChatTail from "./components/ChatTail";
import Chatroom from "./components/Chatroom"

firebase.initializeApp({
  apiKey: "AIzaSyBaCksES75bNuOYl5V9nQy_2J-pdh1bHdU",
  authDomain: "chatbox-14965.firebaseapp.com",
  projectId: "chatbox-14965",
  storageBucket: "chatbox-14965.appspot.com",
  messagingSenderId: "915985757500",
  appId: "1:915985757500:web:4bfa981ea1dafda2d4da39",
});
const auth = getAuth();
const firestore = firebase.firestore();
function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header></header> 
      {/* <ChatTail/> */}
      <section>{user ? <Chatroom firestore={firestore} firebase={firebase} auth={auth} /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  return <button onClick={signInWithGoogle}>Sign in</button>;
}


export default App;
