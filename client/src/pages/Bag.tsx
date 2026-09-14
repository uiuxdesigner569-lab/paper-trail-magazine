import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Link, useLocation } from "wouter";
import { useRef } from "react";
import MovingIllustration from "../components/MovingIllustration";
import { usePageMotion } from "../hooks/usePageMotion";
import { cartCount, readCart, removeFromCart, changeQuantity, clearCart, type CartItem } from "../lib/cart";
import { PaperPal } from "./Home";

const palettes = [
  { name: "Butter", accent: "#f4ed36", background: "#f9cc73" },
  { name: "Cherry", accent: "#f8c1ba", background: "#c94245" },
  { name: "Mint", accent: "#b5c995", background: "#61609a" },
  { name: "Cream", accent: "#f9f5f2", background: "#ac4f98" },
];

export default function Bag() {
  const root = useRef<HTMLElement>(null);
  usePageMotion(root);
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [items, setItems] = useState<CartItem[]>(() => readCart());
  const [, navigate] = useLocation();
  const palette = useMemo(() => palettes[paletteIndex], [paletteIndex]);
  const total = items.reduce((sum, item) => sum + Number(item.price.replace(/[^0-9.]/g, "")) * item.quantity, 0);
  useEffect(() => { const sync = () => setItems(readCart()); window.addEventListener("paper-trail-cart", sync); return () => window.removeEventListener("paper-trail-cart", sync); }, []);

  return (
    <main ref={root} className="bag-page" style={{ "--bag-accent": palette.accent, "--bag-paper": palette.background } as CSSProperties}>
      <div className="bag-frame">
        <div className="bag-topline"><span>PAPER TRAIL / CART</span><span>ISSUE 04</span></div>
        <section className="bag-empty-grid">
          <div className="bag-copy page-motion-lead">
            <span className="mono-label">YOUR CART / {String(cartCount(items)).padStart(2, "0")} ITEMS</span>
            {items.length === 0 ? <><h1>Your bag<br /><em>is empty.</em></h1><p>Nothing tucked away yet. Fill your cart with a story, a field note, or something curious to carry home.</p><Link className="pill-button" href="/shop">START SHOPPING <span>↗</span></Link></> : <><h1>Your bag<br /><em>is full.</em></h1><p>Good choices. Your paper trail is packed and ready to wander.</p><Link className="pill-button" href="/shop">ADD MORE <span>↗</span></Link></>}
          </div>
          <div className="bag-illustration page-motion-art" aria-label="Customizable empty cart illustration" role="img">
            <div className="bag-spark spark-one">✳</div><div className="bag-spark spark-two">✦</div>
            <div className={`bag-cart ${items.length > 0 ? "is-packed" : "is-empty"}`}><div className="bag-cart-handle" /><div className="bag-cart-basket">{items.length > 0 ? <><span className="bag-packed-paper paper-a" /><span className="bag-packed-paper paper-b" /><span className="bag-packed-paper paper-c" /><span className="bag-packed-copy">PACKED<br /><b>WITH<br />STORIES.</b></span></> : <span>EMPTY<br />BUT<br /><b>READY.</b></span>}</div><div className="bag-wheel wheel-one" /><div className="bag-wheel wheel-two" /></div>
            <PaperPal className="bag-pal mascot" accent={palette.accent} />
            <MovingIllustration className="bag-moving-art" accent={palette.accent} variant="spark" />
            <span className="bag-art-note">CUSTOM PAL / {palette.name.toUpperCase()}</span>
          </div>
        </section>
        {items.length > 0 && <section className="bag-items"><div className="bag-items-heading"><span className="mono-label">YOUR SELECTION</span><button onClick={clearCart}>CLEAR CART</button></div>{items.map((item) => <div className="bag-item" key={item.title}>{item.image ? <img className="bag-item-image" src={item.image} alt="" /> : <span className="bag-item-swatch" style={{ background: item.color }} />}<div><strong>{item.title}</strong><small>{item.detail}</small></div><div className="bag-quantity"><button onClick={() => changeQuantity(item.title, -1)} aria-label={`Decrease ${item.title}`}>−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.title, 1)} aria-label={`Increase ${item.title}`}>+</button></div><span>{item.price} × {item.quantity}</span><button onClick={() => removeFromCart(item.title)}>REMOVE</button></div>)}<div className="bag-total"><span>TOTAL</span><strong>${total.toFixed(2)}</strong><button className="pill-button" onClick={() => navigate("/checkout")}>CHECKOUT ↗</button></div></section>}
        <section className="bag-customizer"><div><span className="mono-label">MAKE IT YOURS</span><h2>Choose Pip's<br /><em>next color.</em></h2></div><div className="palette-controls">{palettes.map((item, index) => <button key={item.name} className={index === paletteIndex ? "selected" : ""} onClick={() => setPaletteIndex(index)} aria-label={`Use ${item.name} palette`}><i style={{ background: item.accent }} />{item.name}</button>)}</div></section>
        <footer className="bag-footer"><Link href="/">← BACK TO ISSUE</Link><span>MADE FOR WANDERERS</span><Link href="/about">ABOUT PAPER TRAIL ↗</Link></footer>
      </div>
    </main>
  );
}
