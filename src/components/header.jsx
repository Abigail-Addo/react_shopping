// import React from 'react'

import image from '../assets/logo.png'

const header = () => {
    return (
        <>
            <header className="py-3 border-bottom">
                <div className="container d-flex flex-wrap justify-content-center">
                    <a href="index.html" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none">
                        <span className="fs-4">
                            <img
                                src={image}
                                alt="logo"
                                style={{ height: '10%', width: '10%' }}
                            />
                        </span>
                    </a>
                    <form className="col-12 col-lg-auto mb-3 mt-2 mb-lg-0 search" role="search">
                        <input
                            type="search"
                            className="form-control d-flex justify-content-center"
                            placeholder="Search products..."
                            aria-label="Search"
                        />
                        <button type="button" className="btn btn-outline-warning d-flex justify-content-center">
                            Search
                        </button>
                    </form>
                </div>
            </header>
        </>
    );
}

export default header;
