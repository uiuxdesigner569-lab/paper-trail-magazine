import { useEffect, useRef } from "react";
import gsap from "gsap";

type MovingIllustrationProps = { accent?: string; variant?: "orbit" | "trail" | "spark"; className?: string };

export default function MovingIllustration({ accent = "#f4ed36", variant = "orbit", className = "" }: MovingIllustrationProps) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".moving-orbit", { rotation: 360, transformOrigin: "50% 50%", duration: 16, repeat: -1, ease: "none" });
      gsap.to(".moving-dot", { y: -18, x: 12, duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: .22 });
      gsap.to(".moving-star", { rotation: 12, scale: 1.16, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".moving-trail", { strokeDashoffset: -420, duration: 2.8, repeat: -1, ease: "none" });
    }, root);
    return () => ctx.revert();
  }, []);

  return <div ref={root} className={`moving-illustration moving-${variant} ${className}`} style={{ "--illustration-accent": accent } as React.CSSProperties} aria-label="Animated Paper Trail illustration" role="img">
    <svg viewBox="0 0 420 360" aria-hidden="true">
      <path className="moving-orbit" d="M44 183 C77 45 308 19 369 151 C421 264 260 352 102 288 C51 267 28 222 44 183Z" fill="none" stroke="currentColor" strokeWidth="5" />
      <path className="moving-trail" d="M48 280 C128 230 120 128 215 119 S299 190 374 86" fill="none" stroke="var(--illustration-accent)" strokeWidth="8" strokeDasharray="28 18" />
      <circle className="moving-dot" cx="86" cy="122" r="27" fill="var(--illustration-accent)" stroke="currentColor" strokeWidth="5" />
      <circle className="moving-dot" cx="315" cy="232" r="18" fill="#f8c1ba" stroke="currentColor" strokeWidth="5" />
      <path className="moving-star" d="M208 51 L222 91 L265 93 L231 118 L241 160 L207 136 L172 160 L184 118 L151 92 L193 91Z" fill="var(--illustration-accent)" stroke="currentColor" strokeWidth="5" />
      {variant === "spark" && <><circle className="moving-dot" cx="355" cy="65" r="10" fill="#b5c995" stroke="currentColor" strokeWidth="4" /><path d="M78 62 l12 24 25 3-19 16 5 25-23-13-23 13 6-25-20-16 26-3Z" fill="#ac4f98" stroke="currentColor" strokeWidth="4" /></>}
    </svg>
  </div>;
}
