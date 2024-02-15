import image from '../assets/images/logo.png'
import { useAuth } from '../ContextAPI/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from "react";

const Header = () => {

    const { setCurrentUser, currentUser, setAuth, auth, logout } = useAuth();
    const redirect = useNavigate();

    useEffect(() => {
        const localToken = localStorage.getItem("token");
        if (localToken && localToken.length > 0) {
            setAuth(true);
            let user = JSON.parse(localStorage.getItem("user"));
            setCurrentUser(user);
        } else {
            setAuth(false);
        }
    }
        , [setCurrentUser, setAuth]);

    const onLogout = () => {
        logout()
        redirect("/login");
    }

    return (
        <>
            <div>
                <header className=" bg-white">
                    <div className="container d-flex justify-content-center align-items-center header">
                        <ul className='nav d-flex justify-content-center align-items-center me-lg-auto link-body-emphasis w-100'>
                            <li className='nav-item image'>
                                <img
                                    src={image}
                                    alt="logo"
                                />
                            </li>
                        </ul>
                        {
                            auth ? (
                                <ul className="w-100 nav d-flex justify-content-end align-items-center link-body-emphasis">
                                    <img className="nav-item user d-flex justify-content-end align-items-center"
                                        src={currentUser.picture}
                                        alt="logo"
                                    />
                                    <li className="nav-item px-2 users">
                                        {currentUser.name}
                                    </li>
                                    <li className="nav-item users" onClick={onLogout} title='Log out'>
                                        <i className="bi bi-box-arrow-right"></i>
                                    </li>
                                </ul>
                            ) : (
                                <ul className="nav d-flex align-items-center mb-3 mb-lg-0 link-body-emphasis">
                                    <Link to="/login" title='Log in'>
                                        <li className="nav-item">
                                            <i className="bi bi-box-arrow-in-right"></i>
                                        </li>
                                    </Link>
                                </ul>
                            )
                        }
                    </div>
                </header>
            </div>

        </>
    );
}

export default Header;
