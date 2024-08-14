import "../assets/css/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <footer className="py-5 container px-5">
          <div className="row">
            <div className="col-md-6 navLinks">
              <ul className="nav flex-column">
                <h5>Section</h5>
                <li className="nav-item mb-2">
                  <Link to="/" className="nav-link p-0 text-body-secondary">
                    Home
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/" className="nav-link p-0 text-body-secondary">
                    Features
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/" className="nav-link p-0 text-body-secondary">
                    Pricing
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/" className="nav-link p-0 text-body-secondary">
                    FAQs
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/" className="nav-link p-0 text-body-secondary">
                    About
                  </Link>
                </li>
              </ul>
              <div className="px-5">
                <h5>Join us on</h5>
                <div className="gap-3 d-flex justify-content-evenly">
                  <i className="bi bi-twitter-x"></i>
                  <i className="bi bi-facebook"></i>
                  <i className="bi bi-linkedin"></i>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <form>
                <h5>Subscribe to our newsletter</h5>
                <p>Monthly digest of whats new and exciting from us.</p>
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                  <label htmlFor="newsletter1" className="visually-hidden">
                    Email address
                  </label>
                  <input
                    id="newsletter1"
                    type="text"
                    className="form-control"
                    placeholder="Email address"
                  />
                  <button className="btn btn-primary" type="button">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <p>© 2023 Hairbie,. All rights reserved.</p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">
                <Link
                  className="link-body-emphasis"
                  target="_blank"
                  to="https://github.com/Abigail-Addo/react_shopping.git"
                >
                  View source code
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
