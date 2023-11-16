import { useEffect, useState } from "react";
import { useAuth } from '../Context/useAuth';
import Header from '../components/Header'
import './Checkout.css'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Checkout = () => {

    const redirect = useNavigate();
    const { setCurrentUser, setAuth } = useAuth();
    const [priceTotal, setPriceTotal] = useState(0);

    useEffect(() => {
        const localToken = localStorage.getItem("token");
        if (localToken && localToken.length > 0) {
            setAuth(true);
            let user = JSON.parse(localStorage.getItem("user"));
            setCurrentUser(user);
        } else {
            setAuth(false);
        }
    }, [setCurrentUser, setAuth]);

    useEffect(() => {
        totalPrices();
    });

    const pricesCal = () => {
        const totalPrice = localStorage.getItem('totalPrice');

        return ('GH' + '\u00A2' + ' ' + totalPrice)
    }

    const totalPrices = () => {
        const numberFormat = parseFloat(pricesCal().replace('GH\u00A2 ', '').replace(',', ''));
        const prices = numberFormat + 20;
        const formattedTotalPrice = prices.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        setPriceTotal('GH' + '\u00A2' + ' ' + formattedTotalPrice);

    }

    const clearOrder = async () => {
        let user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
            console.error("User not found in localStorage");
            return;
        }
        let customerId = user.id;
        try {
            let confirmed = confirm('Are you sure you want to proceed?');
            if (confirmed) {
                if (customerId > 0) {
                    // First, fetch all orders for the customer
                    let result = await fetch(`http://localhost:7070/shop/v1/orders?customer_id=${customerId}`);
                    let response = await result.json();
                    console.log(response);

                    if (result.status === 200) {
                        // If orders were fetched successfully, proceed with bulk deletion
                        let deleteResponse = await fetch(`http://localhost:7070/shop/v1/deleteOrders?customer_id=${customerId}`, {
                            method: 'DELETE',
                            headers: {
                                "content-type": "application/json"
                            }
                        });

                        if (deleteResponse.status === 200) {
                            console.log("Orders deleted successfully");
                            localStorage.removeItem('totalPrice');
                            toast.success("Your order has been placed successfully");
                            setTimeout(() => {
                                redirect("/home");
                            }, 8000);
                        } else {
                            toast.error("Failed to place your order");
                        }

                    }
                }
            }
        } catch (error) {
            console.error(error.message);
        }



    }
    return (
        <>
            <Header>
            </Header>

            <ToastContainer />


            <div className="container bg-white py-5 mt-5">
                <main>

                    <div className="row d-flex justify-content-center">
                        <div className="col-md-5 col-lg-4 order-md-last">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-primary">Order Summary</span>
                            </h4>
                            <ul className="list-group mb-3">
                                <li className="list-group-item d-flex justify-content-between lh-sm">
                                    <div>
                                        <h6 className="my-0">Items total</h6>
                                    </div>
                                    <span className="text-body-secondary itemTotal">{pricesCal()}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between lh-sm">
                                    <div>
                                        <h6 className="my-0">Delivery fee</h6>
                                    </div>
                                    <span className="text-body-secondary delivery">GH&cent; 20</span>
                                </li>

                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Total</span>
                                    <strong>{priceTotal}</strong>
                                </li>
                            </ul>
                            <h4 className="mb-3">Billing address</h4>
                            <div className="col-12">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" className="form-control" id="address" required />
                                <div className="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="state" className="form-label">Region</label>
                                <select className="form-select" id="state" required>
                                    <option value="">Choose...</option>
                                    <option>Greater Accra</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please provide a valid region.
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="state" className="form-label">City</label>
                                <select className="form-select" id="state" required>
                                    <option value="">Choose...</option>
                                    <option>Adenta</option>
                                    <option>Cantonments</option>
                                    <option>Dansoman</option>
                                    <option>Gbawe</option>
                                    <option>Kasoa</option>
                                    <option>Labadi</option>
                                    <option>Madina</option>
                                    <option>Nima</option>
                                    <option>Teshie</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please provide a valid city.
                                </div>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="same-address" required />
                                <label className="form-check-label" htmlFor="same-address">Shipping address is the same as my
                                    billing address</label>
                            </div>

                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="save-info" />
                                <label className="form-check-label" htmlFor="save-info">Save this information for next time</label>
                            </div>
                            <hr className="my-4" />
                            <h4 className="mb-3">Payment Method</h4>
                            <div className="my-3">
                                <div className="form-check">
                                    <input id="cash" name="paymentMethod" type="radio" className="form-check-input" required />
                                    <label className="form-check-label" htmlFor="cash">Pay cash on delivery</label>
                                </div>
                                <div className="form-check">
                                    <input id="momo" name="paymentMethod" type="radio" className="form-check-input"
                                        data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
                                        aria-controls="collapseExample" required />
                                    <label className="form-check-label" htmlFor="momo">Mobile money</label>
                                </div>
                            </div>

                            <div className="row gy-3 payment collapse" id="collapseExample">
                                <div className="col-md-6">
                                    <label htmlFor="ac-name" className="form-label">Account Name</label>
                                    <input type="text" name="acname" className="form-control" id="ac-name" />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="ac-number" className="form-label">Account number</label>
                                    <input type="text" name="acnumber" className="form-control" id="ac-number" />
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div className="col-md-6">
                                <p className="w-100 btn btn-primary submit" type="submit" onClick={clearOrder}>Confirm Order</p>
                            </div>

                        </div>
                        {/* <div className="col-md-7 col-lg-8">
                            <h4 className="mb-3">Billing address</h4>
                            <form className="needs-validation" noValidate>
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <label htmlFor="firstName" className="form-label">First name</label>
                                        <input type="text" className="form-control" id="firstName" required />
                                        <div className="invalid-feedback">
                                            Valid first name is required.
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <label htmlFor="lastName" className="form-label">Last name</label>
                                        <input type="text" className="form-control" id="lastName" required />
                                        <div className="invalid-feedback">
                                            Valid last name is required.
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <div className="input-group has-validation">
                                            <span className="input-group-text">@</span>
                                            <input type="text" className="form-control" id="username" required />
                                            <div className="invalid-feedback">
                                                Your username is required.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" required />
                                        <div className="invalid-feedback">
                                            Please enter a valid email address for shipping updates.
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input type="text" className="form-control" id="address" required />
                                        <div className="invalid-feedback">
                                            Please enter your shipping address.
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="state" className="form-label">Region</label>
                                        <select className="form-select" id="state" required>
                                            <option value="">Choose...</option>
                                            <option>Greater Accra</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            Please provide a valid region.
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="state" className="form-label">City</label>
                                        <select className="form-select" id="state" required>
                                            <option value="">Choose...</option>
                                            <option>Adenta</option>
                                            <option>Cantonments</option>
                                            <option>Dansoman</option>
                                            <option>Gbawe</option>
                                            <option>Kasoa</option>
                                            <option>Labadi</option>
                                            <option>Madina</option>
                                            <option>Nima</option>
                                            <option>Teshie</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            Please provide a valid city.
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <label htmlFor="zip" className="form-label">Zip</label>
                                        <input type="text" className="form-control" id="zip" required />
                                        <div className="invalid-feedback">
                                            Zip code required.
                                        </div>
                                    </div>
                                </div>

                                <hr className="my-4" />

                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="same-address" required />
                                    <label className="form-check-label" htmlFor="same-address">Shipping address is the same as my
                                        billing address</label>
                                </div>

                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="save-info" />
                                    <label className="form-check-label" htmlFor="save-info">Save this information for next time</label>
                                </div>
                                <hr className="my-4" />

                                <div className="col-md-6">
                                    <p className="w-100 btn btn-primary btn-lg submit" type="submit">Save Address</p>
                                </div>
                            </form>
                        </div> */}
                    </div>
                </main>
            </div>
        </>
    )
}

export default Checkout
