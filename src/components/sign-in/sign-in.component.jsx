import React, { useState} from 'react';

import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

const SignIn = ({emailSignInStart, isGoogleSignIn}) => {

    const [userCredentials, setCredentials] = useState({email: '', password: ''});
    const {email, password} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: email, password: password})
        } catch (error){
            console.error(error);
        }
    }

    const handleChange = event => {
        const {value, name} = event.target;

        setCredentials({...userCredentials, [name]: value})
    }

    return (
        <div className='sign-in'>
            <h2> I already have an account</h2>
            <span> Sign in with your email and password </span>
            <form onSubmit={handleSubmit}>
                <FormInput name='email' type='email' label='Email' handleChange={handleChange} value={email} required />
                <FormInput name='password' type='password' label='Password' handleChange={handleChange} value={password} required />
                <div className='buttons'>
                    <CustomButton type='submit' > Sign in </CustomButton>
                    <CustomButton onClick ={signInWithGoogle} isGoogleSignIn > Sign in with Google</CustomButton>
                </div>
            </form>
        </div>
    )
}


export default SignIn;