import { useEffect, useRef } from "react";
import lottie, { type AnimationItem } from "lottie-web";
import blinkAnimation from "../animations/pip-blink.json";
import waveAnimation from "../animations/pip-wave.json";
import pageAnimation from "../animations/pip-page.json";

type PipLottieProps = {
  kind: "blink" | "wave" | "page";
  className?: string;
};

const animations = {
  blink: blinkAnimation,
  wave: waveAnimation,
  page: pageAnimation,
};

export default function PipLottie({ kind, className = "" }: PipLottieProps) {
  const container = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!container.current) return;
    let animation: AnimationItem | undefined;
    try {
      animation = lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animations[kind],
        rendererSettings: { progressiveLoad: true, preserveAspectRatio: "xMidYMid meet" },
      });
    } catch {
      animation?.destroy();
    }
    return () => animation?.destroy();
  }, [kind]);

  return <span ref={container} className={`pip-lottie pip-lottie-${kind} ${className}`} aria-hidden="true" />;
}
