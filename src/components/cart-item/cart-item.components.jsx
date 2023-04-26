import React from "react";
import { CartItems,ItemDetails,Name } from "./cart-item.styles";

const CartItem = ({item:{imageUrl,price,name,quantity}})=>(
    <CartItems>
        <img src={imageUrl} alt="item" />
       <ItemDetails>
            <Name>{name}</Name>
            <span className="price">
                {quantity} X ${price}
            </span>
       </ItemDetails>
    </CartItems>
)

export default React.memo(CartItem);