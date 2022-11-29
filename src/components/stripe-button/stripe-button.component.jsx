import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_51M8eltSFj9ogYNB3zYeMqU8Dc3DMeaEcMb3UmljL9fXruenMynP5JEaETeccFg4IhSbvQyhsSsoH2Gc6jrq2FKCe001t8xQ4iJ";

    const onToken =  token =>{
        console.log(token);
        alert("Payment Succesful");
    }

    return (
        <StripeCheckout
        label="Pay NOw"
        name="CRWN Clothing Ltd."
        billingAddress
        shippingAddress
        image='http://svgshare.com/i/CUz.svg'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel="Pay Now"
        token={onToken}
        stripeKey={publishableKey}
        />
    )
}
export default StripeCheckoutButton;

