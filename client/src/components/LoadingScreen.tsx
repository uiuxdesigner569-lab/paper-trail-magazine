import { useEffect, useRef } from "react";
import gsap from "gsap";
import PipLottie from "./PipLottie";

type LoadingScreenProps = { onComplete: () => void };

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const screen = useRef<HTMLDivElement>(null);
  const pip = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add("is-loading");
    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        document.body.classList.remove("is-loading");
        onComplete();
      },
    });
    timeline
      .fromTo(screen.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 })
      .fromTo(".loader-kicker", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, "<0.05")
      .fromTo(".loader-title-line", { yPercent: 105 }, { yPercent: 0, duration: 0.65, stagger: 0.1, ease: "power4.out" }, "<0.08")
      .fromTo(pip.current, { y: 80, rotate: -8, scale: 0.82, opacity: 0 }, { y: 0, rotate: 5, scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)" }, "<0.14")
      .to(pip.current, { y: -10, rotate: -4, duration: 0.45, repeat: 2, yoyo: true, ease: "sine.inOut" }, "-=0.05")
      .to(".loader-progress-fill", { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, "-=0.58")
      .to(screen.current, { clipPath: "inset(0 0 100% 0)", duration: 0.7, ease: "power4.inOut" })
      .set(screen.current, { display: "none" });
    return () => { timeline.kill(); document.body.classList.remove("is-loading"); };
  }, [onComplete]);

  return <div ref={screen} className="loader-screen" role="status" aria-live="polite" aria-label="Loading Paper Trail">
    <div className="loader-top"><span className="loader-kicker">PAPER TRAIL</span><span className="loader-kicker">ISSUE 04 / 2026</span></div>
    <div className="loader-center"><div className="loader-title"><div className="loader-title-line">A SMALL</div><div className="loader-title-line loader-yellow">WORLD OF</div><div className="loader-title-line">CURIOSITY.</div></div><div ref={pip} className="loader-pip"><svg viewBox="0 0 320 300" aria-hidden="true"><path d="M50 178 Q35 145 65 128 Q60 95 96 91 Q112 52 151 69 Q184 31 216 72 Q254 58 267 94 Q304 96 291 132 Q322 153 294 180 Q303 215 263 217 Q239 255 202 230 Q170 268 135 233 Q93 255 81 216 Q43 220 50 178Z" fill="#f9f5f2" stroke="#1a1a1a" strokeWidth="8" strokeLinejoin="round" /><ellipse cx="139" cy="111" rx="27" ry="42" fill="#1a1a1a" transform="rotate(-9 139 111)" /><ellipse cx="194" cy="110" rx="27" ry="42" fill="#1a1a1a" transform="rotate(9 194 110)" /><path d="M132 85 Q141 96 141 111 M188 86 Q197 97 197 111" fill="none" stroke="#f9f5f2" strokeWidth="6" strokeLinecap="round" /><path d="M111 190 Q94 212 77 205 M232 189 Q250 211 269 201" fill="none" stroke="#1a1a1a" strokeWidth="10" strokeLinecap="round" /><path d="M131 225 Q160 245 190 224" fill="none" stroke="#1a1a1a" strokeWidth="10" strokeLinecap="round" /><path d="M116 218 L95 264 M207 218 L229 263" stroke="#1a1a1a" strokeWidth="12" strokeLinecap="round" /><ellipse cx="91" cy="269" rx="28" ry="12" fill="#1a1a1a" /><ellipse cx="234" cy="269" rx="28" ry="12" fill="#1a1a1a" /><path d="M125 182 Q158 193 198 180 L204 215 Q162 230 120 214Z" fill="#f4ed36" stroke="#1a1a1a" strokeWidth="6" /></svg><PipLottie kind="blink" className="loader-lottie" /></div></div>
    <div className="loader-bottom"><span className="loader-kicker">WARMING UP THE PAGE</span><div className="loader-progress"><i className="loader-progress-fill" /></div><span className="loader-kicker">SCROLL WHEN READY ↓</span></div>
  </div>;
}
