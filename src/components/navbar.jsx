// import React from 'react'

const navbar = () => {
    return (
        <>
            <nav className="py-2 bg-body-tertiary">
                <div className="container d-flex flex-wrap">
                    <ul className="nav me-auto">
                        <li className="nav-item"><a href="#" className="nav-link link-body-emphasis px-2 active"> <i className="fa fa-bars"
                            aria-hidden="true"></i></a>
                        </li>
                    </ul>
                    <ul className="nav me-auto">
                        <li className="nav-item"><a href="#" className="nav-link link-body-emphasis px-2" aria-current="page">Home</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Account
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#"> <button type="button"
                                    className="btn btn-warning d-flex justify-content-center w-100">SIGN UP</button></a></li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li><a className="dropdown-item" href="#"><span><i className="fa fa-user"
                                    aria-hidden="true"></i></span>My Account</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Product
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#"><i className="fa fa-shopping-bag"
                                    aria-hidden="true"></i>Orders</a></li>
                                <li><a className="dropdown-item" href="#"><i className="fa fa-heart" aria-hidden="true"></i>Saved
                                    Items</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="nav shopping">
                        <li className="nav-item">
                            <a href="cart.html" className="nav-link link-body-emphasis px-2">
                                <div className="increment" id="cart-number"></div>
                                <i className="fa fa-shopping-cart" aria-hidden="true"></i> Cart
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default navbar
