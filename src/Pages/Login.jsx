import './Login.css'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../Context/useAuth";

const Login = () => {

    const redirect = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { login, setAuth } = useAuth();

    const loginBtn = async (e) => {
        e.preventDefault();

        if (email === "" || email === null || password === "" || password === null) {
            setErrorMessage("Please fill all fields!!!")
            setTimeout(() => {
                setErrorMessage(errorMessage)
            }, 2000);
            return
        }

        try {
            const result = await fetch(`http://localhost:7070/api/login`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            })

            const data = await result.json();
            if (data.id > 0) {
                login(data)
                setAuth(true)
                setSuccessMessage("Login successful")
                setTimeout(() => {
                    redirect("/home");
                }, 1000);
                console.log(data.id);
            } else {
                setErrorMessage("Invalid username or password")
                setTimeout(() => {
                    setErrorMessage(errorMessage)
                }, 3000);

            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>

            <div className='con'>
                <main className="wrapper">
                    <h2>Welcome </h2>
                    {errorMessage && (
                        <div className="errorMessage">
                            <p>{errorMessage}</p>
                        </div>
                    )
                    }
                    {successMessage && (
                        <div className="successMessage">
                            <p>{successMessage}</p>
                        </div>
                    )
                    }
                    <form>
                        <div className="form-controls">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" placeholder="Email" id="email" onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-controls">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                            <i className="bi bi-eye-slash" id="togglePassword"></i>
                        </div>

                        <button type="submit" className="submit" onClick={loginBtn}>Log in</button>

                        <p>
                          
                            <Link to="/signup">
                            Dont have an account? Sign up
                            </Link>
                        </p>
                    </form>


                </main>
            </div >
        </>

    )
}

export default Login
