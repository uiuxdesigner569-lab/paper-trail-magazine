import { Link, useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import MovingIllustration from "../components/MovingIllustration";
import { usePageMotion } from "../hooks/usePageMotion";
import { addToCart, cartCount, readCart } from "../lib/cart";
import { products } from "../data/products";

const categories = ["ALL", "TIPS", "CONES", "ROLLS", "PAPERS"] as const;

export default function Shop() {
  const root = useRef<HTMLElement>(null);
  const [count, setCount] = useState(() => cartCount());
  const [added, setAdded] = useState<string | null>(null);
  const [category, setCategory] = useState<(typeof categories)[number]>("ALL");
  const [, navigate] = useLocation();
  usePageMotion(root);
  useEffect(() => { const sync = () => setCount(cartCount(readCart())); window.addEventListener("paper-trail-cart", sync); return () => window.removeEventListener("paper-trail-cart", sync); }, []);
  const addProduct = (product: typeof products[number]) => { addToCart(product); setCount(cartCount()); setAdded(product.title); window.setTimeout(() => setAdded(null), 1200); };
  const visibleProducts = products.filter((product) => category === "ALL" || product.category === category || (category === "PAPERS" && ["PRINTED EDITION", "STATIONERY", "PAPER GOODS"].includes(product.category)));
  return <main ref={root} className="shop-page"><div className="shop-frame"><div className="shop-topline"><Link href="/">PAPER TRAIL</Link><span>SHOP / ISSUE 04</span><Link href="/bag">CART ({count}) ↗</Link></div><div className="shop-heading page-motion-lead"><span className="mono-label">THE PAPER TRAIL STORE</span><h1 className="page-motion-title">Take a<br /><em>piece</em> with you.</h1><p>Small editions for large curiosities. Printed, packed, and ready to wander.</p><MovingIllustration className="shop-moving-art page-motion-art" accent="#ac4f98" variant="trail" /></div><nav className="shop-categories" aria-label="Product categories">{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}<span>↗</span></button>)}</nav><div className="product-grid">{visibleProducts.map((product, index) => <article className="product-card page-reveal" key={product.title} onClick={() => navigate(`/product/${product.slug}`)}><span className="product-index">0{index + 1} / {product.category}</span><div className="product-image-wrap"><img src={product.image} alt={product.title} /></div><div><h2>{product.title}</h2><p>{product.detail}</p><strong>{product.price}</strong></div><button onClick={(event) => { event.stopPropagation(); addProduct(product); }}>{added === product.title ? "ADDED ✓" : "ADD TO CART +"}</button><span className="product-view">VIEW DETAILS ↗</span></article>)}</div><footer className="shop-footer"><Link href="/about">ABOUT</Link><Link href="/bag">VIEW CART ({count}) ↗</Link><Link href="/">BACK TO THE ISSUE ↑</Link></footer></div></main>;
}
