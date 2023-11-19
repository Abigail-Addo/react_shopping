import image from '../assets/images/logo.png'
import { useAuth } from '../Context/useAuth';
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
            <header className="py-2 border-bottom bg-white">
                <div className="container d-flex justify-content-center">
                    <ul className='nav d-flex justify-content-center align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis '>
                        <li className='nav-item image'>
                            <img
                                src={image}
                                alt="logo"
                            />
                        </li>
                    </ul>

                    {
                        auth ? (
                            <ul className="nav d-flex justify-content-end align-items-center mb-3 mb-lg-0 link-body-emphasis users">
                                <li className="nav-item user d-flex justify-content-end w-25">
                                    <img
                                        src={currentUser.profile_photo}
                                        alt="logo"
                                    />
                                </li>
                                <li className="nav-item user px-2">
                                    {currentUser.name}
                                </li>
                                <li className="nav-item" onClick={onLogout}>
                                    <i className="bi bi-box-arrow-right"></i>
                                </li>
                            </ul>
                        ) : (
                            <ul className="nav d-flex align-items-center mb-3 mb-lg-0 link-body-emphasis">
                                <Link to="/login">
                                    <li className="nav-item">
                                        <i className="bi bi-box-arrow-in-right"></i>
                                    </li>
                                </Link>
                            </ul>
                        )
                    }
                </div>
            </header>
        </>
    );
}

export default Header;
