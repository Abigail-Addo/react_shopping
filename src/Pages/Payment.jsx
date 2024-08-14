import { useEffect, useState } from "react";
import { useAuth } from '../ContextAPI/useAuth';
import Header from '../components/header'
import '../assets/css/Checkout.css';
import 'react-toastify/dist/ReactToastify.css';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from '../components/CheckoutForm';


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
                const result = await fetch('https://shopping-backend-mhxl.onrender.com/api/stripe/v1/config')
                const { publishableKey } = await result.json();
                setStripePromise(loadStripe(publishableKey));
            } catch (error) {
                console.log({ message: error.message })
            }
        })();

        (async function () {
            const prices = localStorage.getItem("totalPrice");
            const fPrices = prices.replace(/,|\.00/g, "");

            try {
                const result = await fetch('https://shopping-backend-mhxl.onrender.com/api/stripe/v1/create-payment-intent', {
                    method: "POST",
                    body: JSON.stringify({
                        amount: parseInt(fPrices),
                        currency: "usd",
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
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
                        </div>

                        <div className="col-md-7 col-lg-6">
                            <h4 className="mb-3">Payment details</h4>
                            {clientSecret && stripePromise && (
                                <Elements stripe={stripePromise} options={{ clientSecret }}>
                                    <CheckoutForm />
                                </Elements>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Checkout


