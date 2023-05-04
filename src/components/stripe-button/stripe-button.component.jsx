import { useState } from 'react';
import {  useStripe, useElements, PaymentElement,handleError } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import CustomButton from '../custom-button/custom-button.component';

import { FormContainer } from './stripe-button.styles';


import { PaymentButton, PaymentFormContainer } from './stripe-button.styles';

const StripeCheckoutButton = ({price}) => {
  const stripe = useStripe();
  const elements = useElements();
  // const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessingPayment(true);

  const {error: submitError} = await elements.submit();
  if (submitError) {
    handleError(submitError);
    return;
  }

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: price  }),
    }).then((res) => {
      return res.json();
    });

    const clientSecret = response.paymentIntent.client_secret;

    const paymentResult = await stripe.confirmSetup({
    elements,
    clientSecret,
    confirmParams: {
      return_url: 'https://example.com/order/123/complete',
    },
    // Uncomment below if you only want redirect for redirect-based payments
    redirect: "if_required",
  });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment Successful!');
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <PaymentElement/>
        <PaymentButton
          buttonType={CustomButton}
          isLoading={isProcessingPayment}
        >
          Pay Now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};
export default StripeCheckoutButton;
