import '../assets/css/Login.css'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../Context/useAuth";

const Login = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const redirect = useNavigate();
    const email = watch("email"); 
    const password = watch("password");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { login, setAuth } = useAuth();

    const loginSubmit = async () => {

        try {
            const result = await fetch(`http://localhost:7272/shop/v1/login`, {
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
                    <form onSubmit={handleSubmit(loginSubmit)}>
                        <div className="form-controls">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })} placeholder="Email" id="email" required />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                        <div className="form-controls">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" {...register("password", { required: "Password is required" })} placeholder="Password" required />
                            {errors.password && <p>{errors.password.message}</p>}
                            <i className="bi bi-eye-slash" id="togglePassword"></i>
                        </div>

                        <button type="submit" className="submit">Log in</button>

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
