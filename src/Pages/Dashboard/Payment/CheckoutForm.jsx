import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { authContext } from "../../../Providers/AuthProvider";

const CheckoutForm = ({price}) => {

    const stripe = useStripe();
    const elements = useElements();
    const [cardError,setCardError] = useState('');
    const [axiosSecure] = useAxiosSecure();
    const [clientSecret,setClientSecret] = useState('');
    const {user} = useContext(authContext);
    
    useEffect(()=>{
      axiosSecure.post('/create-payment-intent', {price})
      .then(res => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret)
      })
    },[])

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if (!stripe || !elements) {
            return;
          }

          const card = elements.getElement(CardElement);
          if(card === null){
            return;
          }
         
          const {error,paymentMethod} = await stripe.createPaymentMethod({
            type:'card',
            card
          })
          if(error){
            console.log('error', error);
            setCardError(error.message);
          }
          else{
            setCardError('');
            console.log('paymentMethod', paymentMethod);
          }

          const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: user?.name || 'anonymous',
                  email: user?.email || 'unknown',
                },
              },
            },
          );
          if(confirmError){
            console.log(confirmError);
          }
          console.log(paymentIntent);
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button className="btn btn-primary btn-sm mt-4" type="submit" disabled={!stripe || !clientSecret} >
          Pay
        </button>
      </form>
      { cardError && <p className="text-red-600 mt-2">{cardError}</p>}
    </div>
  );
};

export default CheckoutForm;
