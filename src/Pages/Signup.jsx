import '../assets/css/Signup.css';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import images from '../assets/images/images.json'

import { useAuth } from "../ContextAPI/useAuth";

// eslint-disable-next-line react/prop-types
const Signup = () => {

  const default_user = images.default_user[0];

  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const redirect = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { setAuth, login } = useAuth();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setProfileImage(selectedImage);
  };

  const signinSubmit = async () => {

    try {
      const formData = new FormData();
      formData.append("file", profileImage);
      let server = await fetch(`${import.meta.env.VITE_App_API_URL}/shop/v1/store-image`, {
        method: 'POST',
        headers: {
          Accept: "application/octet-stream",
        },
        body: formData

      })
      if (server.status == 200) {
        const response = await server.json()
        const { name, email, password } = getValues();

        const result = await fetch(`${import.meta.env.VITE_App_API_URL}/shop/v1/user`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            filename: response.filename
          })
        });

        const data = await result.json();

        if (data.id > 0) {
          login(data)
          setAuth(true)
          setSuccessMessage("Login successful")
          setTimeout(() => {
            redirect("/home");
          }, 1000);
        } else {
          setErrorMessage("Failed to register user")
          setTimeout(() => {
            setErrorMessage(errorMessage)
          }, 3000);
        }
      }

    } catch (error) {
      console.error(error);
    }
  }



  return (
    <>
      <div className='wrapper-container'>
        <main className="main-wrapper">
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
          <form onSubmit={handleSubmit(signinSubmit)} encType="multipart/form-data">
            <div className="image">
              {profileImage ? (
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="user"
                  className="preview-image"
                />
              ) : (
                <img
                  src={`${default_user.url}`}
                  alt="default user"
                  className="default-image"
                />
              )}
            </div>
            <label htmlFor="file-upload" className='custom-file-upload'>
              <span className='image-button'>Upload an image</span>
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <div className="form-controls">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" placeholder="Name" id="name" {...register("name")} required />
            </div>
            <div className="form-controls">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" placeholder="Email" id="email" {...register("email", { pattern: /^\S+@\S+$/i })} required />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="form-controls">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" placeholder="Password" {...register("password")} required />
              {errors.password && <p>{errors.password.message}</p>}
              <i className="bi bi-eye-slash" id="togglePassword"></i>
            </div>

            <button type="submit" className="submit">Log in</button>

            <p>

              <Link to="/login">
                Already have an account? Log in
              </Link>
            </p>
          </form>


        </main>
      </div >
    </>
  )
}

export default Signup
