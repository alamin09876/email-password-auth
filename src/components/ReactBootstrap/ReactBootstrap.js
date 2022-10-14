import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import app from '../../firebase/firebase.init';
import { Link } from 'react-router-dom';


const auth = getAuth(app)


const ReactBootstrap = () => {

    const [passwordExpression, setPasswordExpression] = useState('');
    const [success, setSuccess] = useState(false);
    const handleSubmit = (event) =>{
    
        event.preventDefault();
        setSuccess(false)
        const from = event.target; 
        const email = from.email.value;
        const password = from.password.value;

        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setPasswordExpression("Please set at least two uppercase");
            return
        }
        if(password.length < 6){
            setPasswordExpression("Please insert at least 6 charchater")
            return
        }
        if(!/(?=.*[!#$%&? "])/.test(password)){
            setPasswordExpression("Please set at least one special charcter");
            return
        }
        setPasswordExpression('');
        createUserWithEmailAndPassword(auth, email, password)
        .then (result => {
            const user = result.user;
            setSuccess(true)
            console.log(user);
            from.reset();
            emailVarification();
            
        })
        .catch (error =>{
            console.error('error', error);
            setPasswordExpression(error.message)
        })
        console.log(email, password);
      }

      const emailVarification = () =>{
        sendEmailVerification(auth.currentUser)
        .then( ()=>{
            alert("Please check your email and verified it")
        })
    }

    return (
        <div className = "mx-auto w-50">
            <Form className = "mx-auto w-50" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name ="email" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name ="password" required />
                </Form.Group>
                <p className="text-danger">{passwordExpression}</p>
                {
                    success && <p className ="text-success">user created succesfully</p>
                }
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            <p><small>Heve any acount please login . Go to <Link to='/login'>Login</Link></small></p>
            </Form>
        </div>
    );
};

export default ReactBootstrap;