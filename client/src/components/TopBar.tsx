import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link, useLocation } from "wouter";
import { cartCount, readCart } from "../lib/cart";
import { PaperPal } from "../pages/Home";

const links = [
  ["THE ISSUE", "/"],
  ["SHOP", "/shop"],
  ["ABOUT PAPER TRAIL", "/about"],
  ["CULTURE", "/article/culture"],
  ["DESIGN", "/article/design"],
  ["PEOPLE", "/article/people"],
  ["MUSIC", "/article/music"],
  ["TRAVEL", "/article/travel"],
] as const;

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const [count, setCount] = useState(() => cartCount());
  const logoArt = useRef<HTMLDivElement>(null);
  useEffect(() => { const sync = () => setCount(cartCount(readCart())); window.addEventListener("paper-trail-cart", sync); return () => window.removeEventListener("paper-trail-cart", sync); }, []);
  const close = () => setOpen(false);
  return <>
    <header className="topbar" aria-label="Primary navigation">
      <button className={`topbar-pill topbar-menu ${open ? "is-open" : ""}`} onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="site-menu"><span className="topbar-menu-icon"><i /><i /></span>{open ? "CLOSE" : "MENU"}</button>
      <div className="topbar-logo-wrap" onMouseEnter={() => { if (logoArt.current) gsap.fromTo(logoArt.current, { y: -10, opacity: 0, rotate: -8 }, { y: 0, opacity: 1, rotate: 0, duration: .45, ease: "back.out(1.7)" }); }}><Link href="/" className="topbar-logo" onClick={close}>PAPER TRAIL <small>/ ISSUE 04</small></Link><div ref={logoArt} className="topbar-logo-art"><PaperPal accent="#f4ed36" /></div></div>
      <Link href="/bag" className="topbar-pill topbar-bag" onClick={close} aria-label="Open cart bag">CART ({count}) <span>↗</span></Link>
    </header>
    <div id="site-menu" className={`site-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="site-menu-inner"><div className="site-menu-heading"><span className="mono-label">PAPER TRAIL / ISSUE 04</span><h2>FOLLOW<br /><em>YOUR</em><br />CURIOSITY.</h2><p>A field guide for the incurably curious.<br />Made for wanderers, collectors, and good questions.</p></div><nav className="site-menu-links">{links.map(([label, href], index) => <Link key={label} href={href} className={location === href ? "current" : ""} onClick={close}><span>0{index + 1}</span>{label}<b>↗</b></Link>)}</nav><div className="site-menu-cart"><span className="mono-label">THE CART</span><Link href="/bag" onClick={close}>EMPTY BAG <b>↗</b></Link><small>Customize Pip while you wait.</small></div></div>
    </div>
  </>;
}
