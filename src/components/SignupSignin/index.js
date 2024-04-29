import React, { useState }from 'react'
import Input from '../Input'
import { Navigate } from 'react-router-dom'
import Button from '../Button'
import './styles.css'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword,  signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db, provider } from '../../firebase'
import { doc, setDoc } from "firebase/firestore";
import { getDoc } from 'firebase/firestore'

const SignupSignin = () => {
  const [loading,setLoading] = useState(false)
  const [loginForm, setLoginForm] = useState(false)
  const [name, setName] = useState("")
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const signupWithEmail = () => { 
//craete a user with email and password
setLoading(true)
     if(name!=="" && email!=="" && password!=="" && confirmPassword!==""){
   if(password === confirmPassword){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      toast.success("user is created")
      setLoading(false)
      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      createDoc(user)
      Navigate("/dashboard")
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      toast.error(errorMessage)
      setLoading(false)
    });
  } else{
    toast.error("password and confirm password doesn't match")
    setLoading(false)
  }
     }
  
  else{
    toast.error("fill all fields correctly")
    setLoading(false)
  }
  }

  const loginUsingEmail = () => {
    if(email!=="" && password!==""){
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      toast.success("user logged in")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error("Provide correct credentials")
    });
  }
  else{
    toast.error("All fields are mandatory")
  }
  }

  const googleAuth = () => {
    setLoading(true)
    try{
    signInWithPopup(auth, provider)
   
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage)

  })
    } catch(e){
      console.log(e)
    }
  
  

async function createDoc (user) {
    //make sure that doc with the uid doesn;t exist then create a doc
    if(!user) return;
    const userRef = doc(db, "users", user.uid)
    console.log(userRef)
    const userData = await getDoc(userRef);
  console.log(userData)  //print
  if(userData.exists){    //userdata should exists
    console.log(doc)  //no
  try { await setDoc(doc(db, "users", user.uid), {
     name: user.displayName ? user.displayName : name,
     email: user.email,
     photoUrl : user.photoURL ? user.photoURL : "",
     createdAt: new Date()
   });
   console.log(doc)  //no print
   toast.success("doc created")
  }
  catch(e) {
    toast.error(e.message)
  }
  }
  else{
    toast.error("doc already exists") 
  }
} 

  return (
    <>{loginForm ? (<div className="signup-wrapper">
    <h2 className="title">Login on
    <span style={{color: "var(--theme)"}} className=""> FinTracker</span>
    </h2>

    <form>
  <Input label={"Email"}
  state={email}
  setState={setEmail}
  placeholder={"John doe"}
  type="email"/>

  <Input label={"password"}
  state={password}
  setState={setPassword}
  placeholder={"John doe"}
  type="password"/>

    </form>

    <Button disabled={loading} text={loading ? "LOADING...":"Login using email and password"}
    onClick={loginUsingEmail}/>
    <p style={{textAlign:"center"}}>or</p>
    <Button text={loading ? "LOADING..." : "Login using Google"}/>
    <p style={{textAlign:"center"}}>Or Don't have an account? Click here</p>
    </div>)               : 
    
    (<div className="signup-wrapper">
    <h2 className="title"> Sign up on
    <span style={{color: "var(--theme)"}} className=""> FinTracker</span>
    </h2>
    <form>
  <Input label={"Full name"}
  state={name}
  setState={setName}
  placeholder={"John doe"}
  type="name"/>

  <Input label={"Email"}
  state={email}
  setState={setEmail}
  placeholder={"John doe"}
  type="email"/>

  <Input label={"password"}
  state={password}
  setState={setPassword}
  placeholder={"John doe"}
  type="password"/>

<Input label={"Confirm Password"}
  state={confirmPassword}
  setState={setConfirmPassword}
  placeholder={"John doe"} tyoe="password"/>
    </form>

    <Button disabled={loading} text={loading ? "LOADING...":"Signup using email and password"}
    onClick={signupWithEmail}/>
    <p style={{textAlign:"center"}}>or</p>
    <Button text={"Signup using Google"} onClick={googleAuth}/>
    </div>)}</>
    
  )
}
}

export default SignupSignin