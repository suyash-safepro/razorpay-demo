import "./App.css";
import { useEffect, useState } from "react";
import Tab from "./Tab";
import axios from "axios";

function App() {
  const checkoutHandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get("http://localhost:4000/api/v1/user/get_key");

    const {
      data: { order },
    } = await axios.post("http://localhost:4000/api/v1/user/order", {
      amount,
    });

    const options = {
      key: key,
      amount: order.amount,
      currency: "INR",
      name: "Safepro AI Video Research Lab Pvt. Ltd.",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "http://localhost:4000/api/v1/user/payment_verify",
      // prefill: {
      //   name: "Gaurav Kumar",
      //   email: "gaurav.kumar@example.com",
      //   contact: "9000090000",
      // },

      notes: {
        address: "Razorpay Corporate Office",
      },
      modal: {
        animation: true,
      },
      theme: {
        color: "#1A1A1A",
      },
    };
    var razor = new window.Razorpay(options);
    razor.open();
  };
  return (
    <div class="container">
      <div class="imgBx">
        <img
          src="https://github.com/anuzbvbmaniac/Responsive-Product-Card---CSS-ONLY/blob/master/assets/img/jordan_proto.png?raw=true"
          alt="Nike Jordan Proto-Lyte Image"
        />
      </div>
      <div class="details">
        <div class="content">
          <h2>
            Jordan Proto-Lyte <br />
            <span>Running Collection</span>
          </h2>
          <p>
            Featuring soft foam cushioning and lightweight, woven fabric in the
            upper, the Jordan Proto-Lyte is made for all-day, bouncy comfort.
            Lightweight Breathability: Lightweight woven fabric with real or
            synthetic leather provides breathable support. Cushioned Comfort: A
            full-length foam midsole delivers lightweight, plush cushioning.
            Secure Traction: Exaggerated herringbone-pattern outsole offers
            traction on a variety of surfaces.
          </p>
          <p class="product-colors">
            Available Colors:
            <span
              class="black active"
              data-color-primary="#000"
              data-color-sec="#212121"
              data-pic="https://github.com/anuzbvbmaniac/Responsive-Product-Card---CSS-ONLY/blob/master/assets/img/jordan_proto.png?raw=true"
            ></span>
            <span
              class="red"
              data-color-primary="#7E021C"
              data-color-sec="#bd072d"
              data-pic="https://github.com/anuzbvbmaniac/Responsive-Product-Card---CSS-ONLY/blob/master/assets/img/jordan_proto_red_black.png?raw=true"
            ></span>
            <span
              class="orange"
              data-color-primary="#CE5B39"
              data-color-sec="#F18557"
              data-pic="https://github.com/anuzbvbmaniac/Responsive-Product-Card---CSS-ONLY/blob/master/assets/img/jordan_proto_orange_black.png?raw=true"
            ></span>
          </p>
          <h3>Rs. 12,800</h3>
          <button class="buyBtn" onClick={() => checkoutHandler(500)}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
