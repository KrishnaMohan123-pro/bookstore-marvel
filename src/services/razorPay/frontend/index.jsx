import React from "react";
import { Button } from "@material-ui/core";
import config from "../config/config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./styles.css";
export default function RazorPay() {
  const name = useSelector((state) => state.auth.user.fname);
  const email = useSelector((state) => state.auth.user.email);
  const phone = useSelector((state) => state.auth.user.phone);
  async function loadRazorPay(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function displayRazorPay() {
    const res = await loadRazorPay(config.razorPay.checkOutLink);
    if (!res) {
      console.log("Offline");
    }
    const data = await fetch("http://localhost:4000/razorpay", {
      method: "POST",
    }).then((doc) => {
      return doc.json();
    });
    const options = {
      key: config.razorPay.testKeyId,
      amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      order_id: data.id,
      name: name,
      description: "Test Transaction",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/0/04/MarvelLogo.svg",

      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        toast.success("Payment Successful");
      },
      prefill: {
        name: name,
        email: email,
        contact: phone,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
      toast.error("Payment Failed");
    });
    paymentObject.open();
  }

  return (
    <Button className="pay-button" onClick={displayRazorPay}>
      CHECK OUT
    </Button>
  );
}
