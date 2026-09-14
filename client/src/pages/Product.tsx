import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import gsap from "gsap";
import { addToCart, cartCount } from "../lib/cart";
import { getProduct } from "../data/products";

export default function Product() {
  const [location, navigate] = useLocation();
  const root = useRef<HTMLElement>(null);
  const slug = location.split("/").filter(Boolean).pop() ?? "issue-04";
  const product = getProduct(slug);
  const [count, setCount] = useState(() => cartCount());
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [cloudIntro, setCloudIntro] = useState(true);
  useEffect(() => { if (!root.current) return; const ctx = gsap.context(() => { const intro = gsap.timeline({ onComplete: () => setCloudIntro(false) }); intro.fromTo(".product-cloud-transition", { opacity: 1 }, { opacity: 1, duration: .15 }).fromTo(".product-cloud", { scale: .18, opacity: 0 }, { scale: 1.45, opacity: 1, duration: .75, ease: "back.out(1.7)" }).to(".product-cloud", { scale: 1.85, opacity: 0, duration: .65, ease: "power2.in" }).to(".product-cloud-transition", { opacity: 0, duration: .2 }, "-=.15"); gsap.from(".product-page-copy > *", { y: 35, opacity: 0, stagger: .08, duration: .7, delay: .8, ease: "power3.out" }); gsap.from(".product-page-image", { x: 80, rotate: 7, opacity: 0, duration: 1, delay: .7, ease: "back.out(1.4)" }); gsap.to(".product-page-image img", { y: -12, rotate: -2, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut" }); }, root); return () => ctx.revert(); }, [product]);
  if (!product) return <main className="product-page"><h1>PRODUCT NOT FOUND.</h1><Link href="/shop">BACK TO SHOP</Link></main>;
  const add = () => { for (let i = 0; i < quantity; i += 1) addToCart(product); setCount(cartCount()); setAdded(true); };
  const goBack = () => { if (window.history.length > 1) window.history.back(); else navigate("/shop"); };
  return <main ref={root} className="product-page" style={{ "--product-page-accent": product.color } as React.CSSProperties}>{cloudIntro && <div className="product-cloud-transition" aria-hidden="true"><div className="product-cloud"><i /><i /><i /><i /><span>FOLLOW<br />YOUR<br /><b>CURIOSITY.</b></span></div></div>}<button className="product-back-button" onClick={goBack} aria-label="Go back">← BACK</button><header className="product-page-header"><Link href="/shop">← SHOP</Link><span>PAPER TRAIL / PRODUCT</span><Link href="/bag">CART ({count}) ↗</Link></header><section className="product-page-hero"><div className="product-page-copy"><span className="mono-label">{product.category} / ISSUE 04</span><h1>{product.title}</h1><strong className="product-page-price">{product.price}</strong><p>{product.description}</p><small>{product.specs}</small><div className="product-buy"><div className="quantity-control"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)}>+</button></div><button className="pill-button" onClick={add}>{added ? "ADDED TO CART ✓" : "ADD TO CART ↗"}</button></div>{added && <Link className="product-cart-link" href="/bag">VIEW CART ({count}) →</Link>}</div><div className="product-page-image"><div className="product-page-image-ring" /><img src={product.image} alt={product.title} /></div></section><section className="product-page-details"><div><span className="mono-label">DETAILS</span><h2>Made to<br /><em>wander.</em></h2></div><div className="product-detail-text"><p>{product.description}</p><div className="product-spec-row"><span>01</span><b>OBJECT</b><span>{product.category}</span></div><div className="product-spec-row"><span>02</span><b>EDITION</b><span>Paper Trail / 04</span></div><div className="product-spec-row"><span>03</span><b>DELIVERY</b><span>Ships free with every order</span></div></div></section><footer className="product-page-footer"><Link href="/shop">← CONTINUE SHOPPING</Link><Link href="/bag">OPEN CART ↗</Link></footer></main>;
}
