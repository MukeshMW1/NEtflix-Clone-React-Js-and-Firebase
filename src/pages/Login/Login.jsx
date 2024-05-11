import React, { useEffect, useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signUp } from '../../firebase.js'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {
    const [signState, setSignState] = useState("Sign In");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loader, setLoader] = useState(false);







    const user_auth = async (event) => {
        event.preventDefault();
        setLoader(true);
        if (signState === "Sign In") {
            await login(email, password);


        }
        else {
            await signUp(name, email, password);
        }
        setLoader(false);

    }



    return (


        loader ? <div className="login-spinner">
            <img src={netflix_spinner} alt="" />


        </div > :



            <div className='login'>

                <img src={logo} alt="" className='login-logo' />


                <div className="login-form">
                    <h1>{signState}</h1>
                    <form >
                        {signState === "Sign Up" ? <input type="text" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} /> : null}

                        <input type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        <button onClick={user_auth} type='submit'>
                            {signState}
                        </button>


                        <div className="form-help">

                            <div className="remember">
                                <input type="checkbox" />
                                <label>Remember Me</label>
                            </div>
                            <p>Need Help ?</p>
                        </div>
                    </form>
                    <div className="form-switch">
                        {signState === "Sign In" ? <p>New To Netflix ? <span onClick={() => setSignState("Sign Up")}> Sign Up Now</span></p>
                            : <p>Already have an Account ?<span onClick={() => setSignState("Sign In")}> Sign In Now</span></p>
                        }
                    </div>
                </div>
            </div>
    )
}

export default Login
