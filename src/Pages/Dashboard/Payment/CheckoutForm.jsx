import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { authContext } from "../../../Providers/AuthProvider";
import useCart from "../../../hooks/useCart";
// import './CheckoutForm.css';

const CheckoutForm = ({price}) => {

    const stripe = useStripe();
    const elements = useElements();
    const [cardError,setCardError] = useState('');
    const [axiosSecure] = useAxiosSecure();
    const [clientSecret,setClientSecret] = useState('');
    const {user} = useContext(authContext);
    const [processing,setProcessing] = useState(false);
    const [transactionId,setTransactionId] = useState('');
    const [cart] = useCart();
    
    useEffect(()=>{
      if(price > 0){
        axiosSecure.post('/create-payment-intent', {price})
      .then(res => {
        setClientSecret(res.data.clientSecret)
      })
      }
    
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
         
          const {error} = await stripe.createPaymentMethod({
            type:'card',
            card
          })
          if(error){
            console.log('error', error);
            setCardError(error.message);
          }
          else{
            setCardError('');
            
          }
          setProcessing(true)
          const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: user?.displayName || 'anonymous',
                  email: user?.email || 'unknown',
                },
              },
            },
          );
          if(confirmError){
            console.log(confirmError);
          }
          setProcessing(false);
          if(paymentIntent.status === 'succeeded'){
            setTransactionId(paymentIntent.id);

            const payment = {
              email : user?.email,
              price,
              transactionId : paymentIntent.id,
              quantity : cart.length,
              date : new Date(),
              status : 'service pending',
              cartItemsId : cart.map(item => item._id),
              menuItemsId : cart.map(item => item.menuItemId),
              itemsName : cart.map(item => item.name)
            }

            // save payment data in server side
            axiosSecure.post('/payment', payment)
            .then(data => {
              console.log(data.data);
              // if(data.data.insertedId){

              // }
            })

          }
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
        <button className="btn btn-primary btn-sm mt-4" type="submit" 
        disabled={!stripe || !clientSecret || processing} >
          Pay
        </button>
      </form>
      { cardError && <p className="text-red-600 mt-2">{cardError}</p>}
      {
        transactionId && <p className="text-green-600 mt-2">Your Transaction Id : ({transactionId}) </p>
      }
    </div>
  );
};

export default CheckoutForm;
