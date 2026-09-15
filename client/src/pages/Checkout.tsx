import { FormEvent, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { clearCart, readCart } from "../lib/cart";

export default function Checkout() {
  const [, navigate] = useLocation();
  const items = useMemo(() => readCart(), []);
  const [complete, setComplete] = useState(false);
  const [payment, setPayment] = useState<"card" | "paypal">("card");
  const [expiry, setExpiry] = useState("");
  const total = items.reduce((sum, item) => sum + Number(item.price.replace(/[^0-9.]/g, "")) * item.quantity, 0);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (payment === "card") {
      const expiryInput = event.currentTarget.elements.namedItem("expiry") as HTMLInputElement | null;
      const validExpiry = /^(0[1-9]|1[0-2]) \/ [0-9]{2}$/.test(expiry);
      if (!validExpiry) {
        expiryInput?.setCustomValidity("Enter a valid expiry as MM / YY.");
        expiryInput?.reportValidity();
        return;
      }
      expiryInput?.setCustomValidity("");
    }
    clearCart(); setComplete(true);
  };

  const updateExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    setExpiry(digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits);
  };

  if (complete) return <main className="checkout-page"><div className="checkout-frame checkout-success"><span className="mono-label">ORDER CONFIRMED / 04—{Math.floor(1000 + Math.random() * 9000)}</span><h1>Thanks for<br /><em>wandering.</em></h1><p>Your Paper Trail parcel is being prepared. We’ll send a dispatch note when it starts its journey.</p><Link className="pill-button" href="/">BACK TO THE ISSUE ↗</Link></div></main>;
  if (!items.length) return <main className="checkout-page"><div className="checkout-frame checkout-success"><span className="mono-label">CHECKOUT / NO ITEMS</span><h1>Your cart<br /><em>is quiet.</em></h1><p>Add something from the shop before checking out.</p><Link className="pill-button" href="/shop">GO TO SHOP ↗</Link></div></main>;

  return <main className="checkout-page"><div className="checkout-frame"><header className="checkout-header"><Link href="/bag">← CART</Link><span>PAPER TRAIL / CHECKOUT</span><Link href="/">ISSUE 04</Link></header><div className="checkout-grid"><section><span className="mono-label">01 / YOUR DETAILS</span><h1>Make it<br /><em>official.</em></h1><form onSubmit={submit}><label>EMAIL<input type="email" required placeholder="you@example.com" /></label><div className="checkout-two"><label>FIRST NAME<input required placeholder="Your name" /></label><label>LAST NAME<input required placeholder="Your surname" /></label></div><label>ADDRESS<input required placeholder="Street and number" /></label><div className="checkout-two"><label>CITY<input required placeholder="City" /></label><label>POSTCODE<input required placeholder="00000" /></label></div><span className="mono-label checkout-payment-label">02 / PAYMENT</span><div className="payment-options"><label><input type="radio" name="payment" checked={payment === "card"} onChange={() => setPayment("card")} /> CARD</label><label><input type="radio" name="payment" checked={payment === "paypal"} onChange={() => setPayment("paypal")} /> PAYPAL</label></div>{payment === "card" && <div className="card-fields"><label>CARDHOLDER NAME<input required placeholder="Name on card" autoComplete="cc-name" /></label><label>CARD NUMBER<input required inputMode="numeric" pattern="[0-9 ]{12,23}" maxLength={23} placeholder="1234 5678 9012 3456" autoComplete="cc-number" /></label><div className="checkout-two"><label>EXPIRY<input required name="expiry" inputMode="numeric" value={expiry} onChange={(event) => { updateExpiry(event.target.value); event.target.setCustomValidity(""); }} placeholder="MM / YY" pattern="(0[1-9]|1[0-2]) \/ [0-9]{2}" maxLength={7} autoComplete="cc-exp" /></label><label>CVV<input required inputMode="numeric" pattern="[0-9]{3,4}" maxLength={4} placeholder="123" autoComplete="cc-csc" /></label></div></div>}{payment === "paypal" && <p className="payment-note">You’ll be redirected to PayPal in a real checkout. This prototype keeps the payment step local.</p>}<button className="pill-button checkout-submit" type="submit">PLACE ORDER <span>↗</span></button></form></section><aside className="checkout-summary"><span className="mono-label">YOUR PAPER TRAIL</span>{items.map((item) => <div className="checkout-item" key={item.title}>{item.image ? <img className="checkout-item-image" src={item.image} alt="" /> : <span className="checkout-swatch" style={{ background: item.color }} />}<div><strong>{item.title}</strong><small>{item.quantity} × {item.price}</small></div></div>)}<div className="checkout-total"><span>TOTAL</span><strong>${total.toFixed(2)}</strong></div><p>Shipping is free. This is a demo checkout. Card details are not stored or sent anywhere.</p></aside></div></div></main>;
}
