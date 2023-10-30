import React, { useContext, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { Context } from "../../utils/context";
import CartItem from "./CartItem/CartItem";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "../../utils/api";

import "./Cart.scss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Cart = ({ setShowCart }) => {
  const { userInfo, cartItems, cartSubTotal } =
    useContext(Context);

  const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  );

  const handlePayment = async () => {
    if (userInfo) {
      try {
        const stripe = await stripePromise;
        const res = await makePaymentRequest.post("/api/orders", {
          products: cartItems,
        });
       
        await stripe.redirectToCheckout({
          sessionId: res.data.stripeSession.id,
        });

      
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please sign in to checkout", {
        hideProgressBar: true,
      });
    }
  };
  return (
    <div className="cart-panel">
      <div className="opac-layer"></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn">
            <MdClose />
            <span className="text" onClick={() => setShowCart(false)}>
              Close
            </span>
          </span>
        </div>
        {!cartItems?.length && (
          <div className="empty-cart">
            <BsCartX />
            <span>No products in the cart.</span>
            <Link to="/" className="custom-link">
              <button className="return-cta" onClick={() => setShowCart(false)}>
                RETURN TO SHOP
              </button>
            </Link>
          </div>
        )}

        {!!cartItems?.length && (
          <>
            <CartItem />
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal</span>
                <span className="text total">&#8377;{cartSubTotal}</span>
              </div>
              <div className="button">
                <button className="checkout-cta" onClick={handlePayment}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
