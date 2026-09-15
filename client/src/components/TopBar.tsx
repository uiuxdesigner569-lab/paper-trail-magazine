import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { cartCount, readCart } from "../lib/cart";

const links = [
  ["THE ISSUE", "/"],
  ["STORIES", "/stories"],
  ["SHOP", "/shop"],
  ["ABOUT PAPER TRAIL", "/about"],
] as const;

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const [count, setCount] = useState(() => cartCount());
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem("paper-trail-auth") === "1");
  useEffect(() => { const sync = () => setCount(cartCount(readCart())); const syncAuth = () => setLoggedIn(localStorage.getItem("paper-trail-auth") === "1"); window.addEventListener("paper-trail-cart", sync); window.addEventListener("paper-trail-auth", syncAuth); return () => { window.removeEventListener("paper-trail-cart", sync); window.removeEventListener("paper-trail-auth", syncAuth); }; }, []);
  const close = () => setOpen(false);
  return <>
    <header className="topbar" aria-label="Primary navigation">
      <button className={`topbar-pill topbar-menu ${open ? "is-open" : ""}`} onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="site-menu"><span className="topbar-menu-icon"><i /><i /></span>{open ? "CLOSE" : "MENU"}</button>
      <Link href="/" className="topbar-logo" onClick={close}>PAPER TRAIL <small>/ ISSUE 04</small></Link>
      <div className="topbar-actions"><Link href="/bag" className="topbar-pill topbar-bag" onClick={close} aria-label="Open cart bag">CART ({count}) <span>↗</span></Link><Link href="/login" className="topbar-pill topbar-login" onClick={close}>LOG IN ↗</Link><Link href="/signup" className="topbar-pill topbar-signup" onClick={close}>SIGN UP ↗</Link></div>
    </header>
    <div id="site-menu" className={`site-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="site-menu-inner"><div className="site-menu-heading"><span className="mono-label">PAPER TRAIL / ISSUE 04</span><h2>FOLLOW<br /><em>YOUR</em><br />CURIOSITY.</h2><p>A field guide for the incurably curious.<br />Made for wanderers, collectors, and good questions.</p></div><nav className="site-menu-links">{links.map(([label, href], index) => <Link key={label} href={href} className={location === href ? "current" : ""} onClick={close}><span>0{index + 1}</span>{label}<b>↗</b></Link>)}<Link href={loggedIn ? "/account" : "/login"} className={location === (loggedIn ? "/account" : "/login") ? "current" : ""} onClick={close}><span>05</span>{loggedIn ? "MY TRAIL" : "LOG IN"}<b>↗</b></Link></nav><div className="site-menu-cart"><span className="mono-label">THE CART</span><Link href="/bag" onClick={close}>EMPTY BAG <b>↗</b></Link><small>Customize Pip while you wait.</small></div></div>
    </div>
  </>;
}
