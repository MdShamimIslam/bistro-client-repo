import React from "react";
import SectionTitle from "../../../Components/SectionTitle";
import { Helmet } from "react-helmet";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../../hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Token);

const Payment = () => {

  const [cart] = useCart();
  const total = cart.reduce((sum, item) =>  sum + item.price, 0);
  const price = parseFloat(total.toFixed(2));

  return (
    <div className="mt-5 lg:ml-20">
      <Helmet>
        <title>Bistro-Boss || Payment</title>
      </Helmet>
      <SectionTitle
        heading="PAYMENT"
        subHeading="Please process"
      ></SectionTitle>
      <div className="mt-5">
        <Elements stripe={stripePromise}>
          <CheckoutForm price={price}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
