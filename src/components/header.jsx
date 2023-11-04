import image from '../assets/logo.png'
import { useAuth } from '../Context/useAuth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {

    const { currentUser, auth, logout } = useAuth();
    const redirect = useNavigate();

    const onLogout = () => {
        logout()
        redirect("/login");
    }
    return (
        <>
            <header className="py-2 border-bottom bg-white">
                <div className="container d-flex justify-content-center">
                    <ul className= 'nav d-flex justify-content-center align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis '>
                        <li className='nav-item image'>
                                    <img
                                        src={image}
                                        alt="logo"
                                    />
                        </li>
                    </ul>

                    {
                        auth ? (<ul className="nav d-flex justify-content-end align-items-center mb-3 mb-lg-0 link-body-emphasis users">
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

                    {/* <form className="col-12 col-lg-auto mb-3 mt-2 mb-lg-0 search" role="search">
                        <input
                            type="search"
                            className="form-control d-flex justify-content-center"
                            placeholder="Search products..."
                            aria-label="Search"
                        />
                        <button type="button" className="btn btn-outline-warning d-flex justify-content-center">
                            Search
                        </button>
                    </form> */}
                </div>
            </header>
        </>
    );
}

export default Header;
