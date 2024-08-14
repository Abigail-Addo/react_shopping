import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";


import { ToastContainer, toast } from 'react-toastify';
import '../assets/css/Checkout.css'

const CheckoutForm = () => {
    // const redirect = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.log('stripe.js is not loaded yet');
            return;
        }

        setIsProcessing(true);

        try {
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/home`,
                },
                deleteorder: clearOrder()
            });

            if (error && (error.type === "card_error" || error.type === "validation_error")) {
                setMessage(error.message);
                setIsProcessing(false);
                return;
            }

            setIsProcessing(false);
        } catch (error) {
            console.error(error.message);
            setIsProcessing(false);
        }
    };

    const clearOrder = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
            console.error("User not found in localStorage");
            return;
        }

        const userId = user.id;

        if (userId > 0) {
            // First, fetch all orders for the customer
            let result = await fetch(`https://shopping-backend-mhxl.onrender.com/api/v1/orders?user_id=${userId}`);
            let response = await result.json();
            console.log(response);

            if (result.status === 200) {
                // If orders were fetched successfully, proceed with bulk deletion
                let deleteResponse = await fetch(`https://shopping-backend-mhxl.onrender.com/api/v1/deleteOrders?user_id=${userId}`, {
                    method: 'DELETE',
                    headers: {
                        "content-type": "application/json"
                    }
                });

                if (deleteResponse.status === 200) {
                    console.log("Orders deleted successfully");
                    localStorage.removeItem('totalPrice');
                    toast.success("Your order has been placed successfully");
                } else {
                    toast.error("Failed to place your order");
                }

            }
        }
    }


    return (
        <>
            <ToastContainer />

            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" />
                <button type="submit" disabled={isProcessing || !stripe || !elements} id="submit">
                    <span>
                        {isProcessing ? "Processing ... " : "Pay now"}
                    </span>
                </button>
                {message && <div id="payment-message">{message}</div>}
            </form>
        </>

    );
}

export default CheckoutForm


