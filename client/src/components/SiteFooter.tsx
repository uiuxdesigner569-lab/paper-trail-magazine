import { Link } from "wouter";

export default function SiteFooter() {
  return <footer className="site-footer">
    <div className="site-footer-top"><span className="mono-label">PAPER TRAIL / ISSUE 04</span><span className="site-footer-index">FIELD NOTES FOR THE INCURABLY CURIOUS</span></div>
    <div className="site-footer-main"><h2>KEEP<br /><em>LOOKING.</em></h2><div className="site-footer-links"><Link href="/">THE ISSUE ↗</Link><Link href="/shop">SHOP ↗</Link><Link href="/bag">CART ↗</Link><Link href="/about">ABOUT ↗</Link></div><div className="site-footer-contact"><span>CONTACT</span><span>SUPPORT</span><span>INSTAGRAM</span></div></div>
    <div className="site-footer-bottom"><span>© 2026 PAPER TRAIL</span><span>MADE FOR WANDERERS</span><Link href="/">BACK TO TOP ↑</Link></div>
  </footer>;
}
