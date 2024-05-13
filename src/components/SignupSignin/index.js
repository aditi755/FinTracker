import React, { useState }from 'react'
import Input from '../Input'
import { useNavigate } from 'react-router-dom'
import Button from '../Button'
import './styles.css'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword,  signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db, provider } from '../../firebase'
import { doc, setDoc, getDoc} from "firebase/firestore";


const SignupSignin = () => {
  const [loading, setLoading] = useState(false)
  const [loginForm, setLoginForm] = useState(false)
  const [name, setName] = useState("")
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate();

async function createDoc(user) {
  setLoading(true);
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  try {
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      await setDoc(userRef, {
        name: user.displayName ? user.displayName : user.email,
        email: user.email,
        photoUrl: user.photoURL ? user.photoURL : "",
        createdAt: new Date(),
      });
      toast.success("Document created");
    } else {
      toast.error("Document already exists");
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
}

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
      navigate("/dashboard")   
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
  }}
   else{
    toast.error("fill all fields correctly")
    setLoading(false)
  }}


  const loginUsingEmail = () => {
    setLoading(true)
    if(email!=="" && password!==""){
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      toast.success("user logged in")
      console.log("user logged in", user)
      setLoading(false)
      navigate('/dashboard');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setLoading(false)
      toast.error("Provide correct credentials")
    });
  }
  else{
    toast.error("All fields are mandatory")
  }}

const googleAuth = async () => {
  setLoading(true);
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(user);
    createDoc(user)
    toast.success("user authenticated");
    navigate('/dashboard')
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData?.email; // Use optional chaining to avoid error if email is not present in customData
    const credential = GoogleAuthProvider.credentialFromError(error);
    toast.error(errorMessage);
  }
};


  return (
    <>
    {loginForm ? (<div className="signup-wrapper">
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
    onClick={loginUsingEmail}  />
    <p style={{textAlign:"center"}}>or</p>
    <Button text={loading ? "LOADING..." : "Login using Google"} onClick={googleAuth}/>
    <p onClick={() => {setLoginForm(!loginForm)}} style={{textAlign:"center"}} >Or Don't have an account? Click here</p>
    </div>)              
    
    : 
    
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
    <p onClick={() => {setLoginForm(!loginForm)}} style={{textAlign:"center"}} >Or have an account? Click here</p>
    </div>) }</>
    
  ) 
}


export default SignupSignin
