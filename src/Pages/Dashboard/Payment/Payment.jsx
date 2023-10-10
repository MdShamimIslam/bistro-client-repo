import React from "react";
import SectionTitle from "../../../Components/SectionTitle";
import { Helmet } from "react-helmet";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Token);

const Payment = () => {
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
          <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
