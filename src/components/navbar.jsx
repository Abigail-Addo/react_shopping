import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../ContextAPI/useAuth';

const Navbar = () => {

    const { cartCount } = useAuth();
    const redirect = useNavigate();

    const cart = () => {
        redirect("/cart");
    }


    return (
        <>
            <nav className="py-2 bg-body-tertiary">
                <div className="container d-flex flex-wrap align-items-center">
                    <ul className="nav me-auto">
                        <li className="nav-item">
                            <Link to="" className="nav-link link-body-emphasis px-2" aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-dark" to="" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Account
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to=""> <button type="button"
                                    className="btn btn-warning d-flex justify-content-center w-100">SIGN UP</button></Link></li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li><Link className="dropdown-item" to=""><span><i className="fa fa-user"
                                    aria-hidden="true"></i></span>My Account</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-dark" to="" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Product
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to=""><i className="fa fa-shopping-bag"
                                    aria-hidden="true"></i>Orders</Link></li>
                                <li><Link className="dropdown-item" to=""><i className="fa fa-heart" aria-hidden="true"></i>Saved
                                    Items</Link></li>
                            </ul>
                        </li>

                    </ul>
                    <div onClick={cart} className='d-flex flex-column' title='Cart'>
                        <span>{cartCount}</span>
                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
