import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import '../assets/css/Checkout.css'

const CheckoutForm = () => {
    const redirect = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsProcessing(true);


        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: redirect("/home"),
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occured.");
        }

        setIsProcessing(false);
    };

    const clearOrder = async () => {
        let user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
            console.error("User not found in localStorage");
            return;
        }
        let userId = user.id;
        try {
            let confirmed = confirm('Are you sure you want to proceed?');
            if (confirmed) {
                if (userId > 0) {
                    // First, fetch all orders for the customer
                    let result = await fetch(`http://localhost:7272/shop/v1/orders?user_id=${userId}`);
                    let response = await result.json();
                    console.log(response);

                    if (result.status === 200) {
                        // If orders were fetched successfully, proceed with bulk deletion
                        let deleteResponse = await fetch(`http://localhost:7272/shop/v1/deleteOrders?user_id=${userId}`, {
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
            <ToastContainer />

            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" />
                <button type="button" disabled={isProcessing || !stripe || !elements} id="submit" onClick={clearOrder}>
                    <span id="button-text">
                        {isProcessing ? "Processing ... " : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </>

    );
}

export default CheckoutForm


