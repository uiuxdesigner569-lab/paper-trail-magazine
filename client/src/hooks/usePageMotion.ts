import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function usePageMotion(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".page-motion-title", { y: 70, opacity: 0, duration: 1, ease: "power4.out" });
      gsap.from(".page-motion-lead", { y: 28, opacity: 0, duration: .8, delay: .18, ease: "power3.out" });
      gsap.from(".page-motion-art", { scale: .72, rotate: -12, opacity: 0, duration: 1.1, delay: .15, ease: "back.out(1.5)" });
      gsap.utils.toArray<HTMLElement>(".page-reveal").forEach((element) => {
        gsap.from(element, { y: 55, opacity: 0, duration: .75, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 82%", once: true } });
      });
      gsap.to(".page-float", { y: -16, rotate: 3, duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, root);
    return () => ctx.revert();
  }, [root]);
}
