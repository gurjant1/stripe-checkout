import { useState, useEffect } from "react";
import "./App.css";

const ProductDisplay = () => (
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
        <h3>Test Attachments</h3>
        <h5>$20.00</h5>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch("http://localhost:4242/create-checkout-session", {
            method: "POST",
          })
            .then((res) => res.json())
            .then((data) => {
              window.location = data.url;
              // console.log(data);
            });
        }}
      >
        <button type="submit">Checkout</button>
      </form>
    </div>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? <Message message={message} /> : <ProductDisplay />;
}
