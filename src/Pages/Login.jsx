import './Login.css'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {

    const redirect = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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

            const response = await result.json();
            if (result.status != 200) {
                setErrorMessage("Invalid username or password")
                setTimeout(() => {
                    setErrorMessage(errorMessage)
                }, 2000);
            }
            if (result.status == 200) {
                redirect("/home");
                console.log(response.id);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='con'>
            <main className="wrapper">
                <h2>Welcome </h2>
                {errorMessage && (
                    <div className="errorMessage">
                        <p>{errorMessage}</p>
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


                    <a href="">Forgot password?</a>
                </form>

                <p>
                    Dont have an account?
                    <Link to="/signup">
                        Sign up
                    </Link>
                </p>
            </main>
        </div >
    )
}

export default Login
