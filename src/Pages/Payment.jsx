import { useEffect, useState } from "react";
import { useAuth } from '../Context/useAuth';
import Header from '../components/Header'
import '../assets/css/Checkout.css'
// import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";


const Checkout = () => {

    const { setCurrentUser, setAuth } = useAuth();
    const [priceTotal, setPriceTotal] = useState(0);

    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        const localToken = localStorage.getItem("token");
        if (localToken && localToken.length > 0) {
            setAuth(true);
            let user = JSON.parse(localStorage.getItem("user"));
            setCurrentUser(user);
        } else {
            setAuth(false);
        }

        const totalPrices = () => {
            const numberFormat = parseFloat(pricesCal().replace('GH\u00A2 ', '').replace(',', ''));
            const prices = numberFormat + 20;
            const formattedTotalPrice = prices.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

            setPriceTotal('GH' + '\u00A2' + ' ' + formattedTotalPrice);

        }
        totalPrices();


        (async function () {
            try {
                const result = await fetch('http://localhost:7272/stripe/v1/config')
                const { publishableKey } = await result.json();
                setStripePromise(loadStripe(publishableKey));
            } catch (error) {
                console.log({ message: error.message })
            }
        })();

        (async function () {

            try {
                const result = await fetch('http://localhost:7272/stripe/v1/create-payment-intent', {
                    method: "POST",
                    body: JSON.stringify({
                        amount: priceTotal,
                        currency: "usd",
                    }),
                })
                let { clientSecret } = await result.json();
                setClientSecret(clientSecret);
            } catch (error) {
                console.log({ message: error.message })
            }
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setCurrentUser, setAuth, setPriceTotal]);

    const pricesCal = () => {
        const totalPrice = localStorage.getItem('totalPrice');

        return ('GH' + '\u00A2' + ' ' + totalPrice)
    }





    return (
        <>
            <Header>
            </Header>


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
                            {clientSecret && stripePromise && (
                                <Elements stripe={stripePromise} options={{ clientSecret }}>
                                    <CheckoutForm />
                                </Elements>
                            )}


                            {/* <div className="col-12">
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
                            <hr className="my-4" /> */}
                            {/* <div className="col-md-6">
                                    <p className="w-100 btn btn-primary submit" type="submit" >Confirm Order</p>
                                </div> */}

                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Checkout
