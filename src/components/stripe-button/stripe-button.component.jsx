// import React from 'react';
// import StripeCheckout from 'react-stripe-checkout';
// import axios from 'axios';

// const StripeCheckoutButton = ({ price }) => {
//   const priceForStripe = price * 100;
//   const publishableKey = 'pk_test_b7a3hFL5nC3qlBCZ6bQACpez00gyMMP52H';

//   const onToken = token => {
//     axios({
//       url: 'payment',
//       method: 'post',
//       data: {
//         amount: priceForStripe,
//         token
//       }
//     })
//       .then(response => {
//         alert('succesful payment');
//       })
//       .catch(error => {
//         console.log('Payment Error: ', error);
//         alert(
//           'There was an issue with your payment! Please make sure you use the provided credit card.'
//         );
//       });
//   };

//   return (
//     <StripeCheckout
//       label='Pay Now'
//       name='CRWN Clothing Ltd.'
//       billingAddress
//       shippingAddress
//       image='https://svgshare.com/i/CUz.svg'
//       description={`Your total is $${price}`}
//       amount={priceForStripe}
//       panelLabel='Pay Now'
//       token={onToken}
//       stripeKey={publishableKey}
//     />
//   );
// };

// export default StripeCheckoutButton;
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import CustomButton from '../custom-button/custom-button.component';

import { FormContainer } from './stripe-button.styles';


import { PaymentButton, PaymentFormContainer } from './stripe-button.styles';

const StripeCheckoutButton = ({price}) => {
  const stripe = useStripe();
  const elements = useElements();
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessingPayment(true);
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: price * 100 }),
    }).then((res) => {
      return res.json();
    });

    const clientSecret = response.paymentIntent.client_secret;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Anirudh',
        },
      },
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
        <h2>Credit Card Payment:</h2>
        <CardElement />
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
