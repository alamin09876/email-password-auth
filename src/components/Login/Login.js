import React, { useState } from 'react';
import app from '../../firebase/firebase.init';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link } from 'react-router-dom';

const auth = getAuth(app)

const Login = () => {
    const [success, setSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const handleLogin = (event) =>{
        event.preventDefault();
        setSuccess(false);
        const from = event.target;
        const name = from.name.value;
        const email = from.email.value;
        const password = from.password.value;
        console.log(email, password, name)

        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const user = result.user;
            console.log(user);
            setSuccess(true)
            from.reset();
            updateUserProfile(name);
        })
        .catch(error =>{
            console.error('error', error)
        })
    }

    const handlerBlurResetPassword = (event) =>{
        
        const email = event.target.value;
        setUserEmail(email)
        console.log(email)
    }
    const handleResetPassword = () =>{
        if(!userEmail){
            alert ("Please enter your email address..")
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
        .then(() =>{
            alert("Sent password email sent. Check Your email")
        })
        .catch(error =>{
            console.log('error', error);
        })
    }

    const updateUserProfile = (name) =>{
        updateProfile(auth.currentUser, {
            displayName : name
        })
        .then (() =>{
            console.log("Display name update")
        })
        .catch(error =>{
            console.error('error', error)
        })
    }
    
    return (
        <div className="w-50 mx-auto">
            <h2>Please Login</h2>
            <form onSubmit= {handleLogin}>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
                    <input type="text" onBlur={handlerBlurResetPassword} name="name" className="form-control" id="formGroupExampleInput" placeholder="Your Name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Email</label>
                    <input type="email" onBlur={handlerBlurResetPassword} name="email" className="form-control" id="formGroupExampleInput" placeholder="Your Email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="formGroupExampleInput2" placeholder="Your Password" required/>
                </div>
                <button type="submit" className="btn btn-success">Success</button>
                {
                    success && <p className ="text-success">user created succesfully</p>
                }
            </form>
            <p><small>New please register . Go to <Link to='/register'>Register</Link></small></p>
            <p><small>Forget Password<button type="button" className="btn btn-link" onClick={handleResetPassword}>Reset Password</button></small></p>
        </div>
    );
};

export default Login;