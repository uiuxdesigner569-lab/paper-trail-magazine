import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import PipLottie from "../components/PipLottie";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

type MascotProps = { className?: string; accent?: string };

function PaperPal({ className = "", accent = "#f4ed36" }: MascotProps) {
  return (
    <span className={`paper-pal ${className}`} aria-label="Pip, the Paper Trail mascot" role="img">
      <svg viewBox="0 0 320 300" aria-hidden="true">
        <path d="M50 178 Q35 145 65 128 Q60 95 96 91 Q112 52 151 69 Q184 31 216 72 Q254 58 267 94 Q304 96 291 132 Q322 153 294 180 Q303 215 263 217 Q239 255 202 230 Q170 268 135 233 Q93 255 81 216 Q43 220 50 178Z" fill="#f9f5f2" stroke="#1a1a1a" strokeWidth="8" strokeLinejoin="round" />
        <path d="M105 104 Q107 72 132 61 Q153 53 163 83 Q183 52 209 64 Q230 75 218 107 Q235 128 218 150 Q191 171 153 158 Q115 165 98 141 Q92 121 105 104Z" fill="#f9f5f2" stroke="#1a1a1a" strokeWidth="7" />
        <ellipse cx="139" cy="111" rx="27" ry="42" fill="#1a1a1a" transform="rotate(-9 139 111)" />
        <ellipse cx="194" cy="110" rx="27" ry="42" fill="#1a1a1a" transform="rotate(9 194 110)" />
        <path d="M132 85 Q141 96 141 111" fill="none" stroke="#f9f5f2" strokeWidth="6" strokeLinecap="round" />
        <path d="M188 86 Q197 97 197 111" fill="none" stroke="#f9f5f2" strokeWidth="6" strokeLinecap="round" />
        <path d="M111 190 Q94 212 77 205 M232 189 Q250 211 269 201" fill="none" stroke="#1a1a1a" strokeWidth="10" strokeLinecap="round" />
        <path d="M131 225 Q160 245 190 224" fill="none" stroke="#1a1a1a" strokeWidth="10" strokeLinecap="round" />
        <path d="M116 218 L95 264 M207 218 L229 263" stroke="#1a1a1a" strokeWidth="12" strokeLinecap="round" />
        <ellipse cx="91" cy="269" rx="28" ry="12" fill="#1a1a1a" /><ellipse cx="234" cy="269" rx="28" ry="12" fill="#1a1a1a" />
        <path d="M125 182 Q158 193 198 180 L204 215 Q162 230 120 214Z" fill={accent} stroke="#1a1a1a" strokeWidth="6" />
      </svg>
      <PipLottie kind="blink" className="pip-lottie-overlay pip-lottie-eyes" />
      <PipLottie kind="wave" className="pip-lottie-overlay pip-lottie-arms" />
      <PipLottie kind="page" className="pip-lottie-overlay pip-lottie-page" />
    </span>
  );
}

function OrbitGlyph() {
  return <svg className="orbit-glyph" viewBox="0 0 320 220" aria-hidden="true"><path d="M21 119 C63 11 234 -9 299 89 C350 166 242 222 114 193 C44 177 8 151 21 119Z" fill="none" stroke="#000" strokeWidth="5" /><circle cx="72" cy="87" r="18" fill="#f8c1ba" stroke="#000" strokeWidth="5" /><circle cx="253" cy="141" r="13" fill="#b5c995" stroke="#000" strokeWidth="5" /><path d="M144 108 l29 -30 30 27 -29 31Z" fill="#f4ed36" stroke="#000" strokeWidth="5" /></svg>;
}

type MagazineCategory = {
  name: string;
  slug: string;
  illustration: string;
  label: string;
  accentColor: string;
};

export const magazineCategories: MagazineCategory[] = [
  { name: "CULTURE", slug: "culture", illustration: "/illustrations/culture-category.png", label: "the stuff that sticks", accentColor: "#f8c1ba" },
  { name: "DESIGN", slug: "design", illustration: "/illustrations/find-your-next-story.png", label: "objects with opinions", accentColor: "#b5c995" },
  { name: "PEOPLE", slug: "people", illustration: "/illustrations/people-category-generated.png", label: "the beautiful weirdos", accentColor: "#f9cc73" },
  { name: "MUSIC", slug: "music", illustration: "/illustrations/music-category.png", label: "noise with a pulse", accentColor: "#ac4f98" },
  { name: "TRAVEL", slug: "travel", illustration: "/illustrations/travel-category.png", label: "out of office, in mind", accentColor: "#c94245" },
];

function CategoryIllustration({ category }: { category: MagazineCategory }) {
  return <img className="category-showcase-illustration" src={category.illustration} alt="" aria-hidden="true" />;
}

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const [sceneLabel, setSceneLabel] = useState("OPENING NOTE");
  const [introEntered, setIntroEntered] = useState(() => window.sessionStorage.getItem("paper-trail-intro-entered") === "1");

  const enterSite = () => {
    window.sessionStorage.setItem("paper-trail-intro-entered", "1");
    const gate = document.querySelector<HTMLElement>(".welcome-cloud-gate");
    const mascot = document.querySelector<HTMLElement>(".welcome-paper-pal");
    const target = document.querySelector<HTMLElement>(".intro-mascot");
    if (!gate || !mascot || !target) return setIntroEntered(true);
    const from = mascot.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    gsap.set(mascot, { animation: "none" });
    gsap.set(mascot, { xPercent: 0, yPercent: 0, left: from.left, top: from.top, width: from.width, height: from.height, transform: "rotate(8deg)" });
    gsap.timeline({ onComplete: () => setIntroEntered(true) })
      .to(mascot, { left: to.left, top: to.top, width: to.width, height: to.height, rotate: -12, duration: 1.25, ease: "power3.inOut" })
      .to(gate, { opacity: 0, duration: .35, ease: "power2.out" }, "-=.25");
  };

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, syncTouch: true });
    const raf = (time: number) => lenis.raf(time * 1000);
    const setScene = (label: string) => setSceneLabel((current) => current === label ? current : label);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.from(".intro-brand", { y: -24, opacity: 0, duration: 0.8, ease: "power3.out" });
      gsap.from(".intro-word", { yPercent: 110, rotate: 4, stagger: 0.12, duration: 1.15, delay: 0.25, ease: "power4.out" });
      gsap.from(".intro-cta", { y: 25, opacity: 0, duration: 0.7, delay: 1.1, ease: "power3.out" });

      const globalProgress = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => gsap.set(".story-rail-fill", { height: `${self.progress * 100}%` }),
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: ".intro",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: ".intro-stage",
          pinSpacing: false,
          anticipatePin: 1,
          onEnter: () => setScene("OPENING NOTE"),
          onEnterBack: () => setScene("OPENING NOTE"),
        },
      })
        .to(".intro-title", { yPercent: -28, scale: 0.74, duration: 0.45, ease: "none" }, 0)
        .to(".intro-bottom", { y: 82, opacity: 0, duration: 0.3, ease: "none" }, 0.18)
        .to(".intro-stage", { backgroundColor: "#f9cc73", duration: 0.14, ease: "none" }, 0.84)
        .to(".intro-title", { opacity: 0.25, duration: 0.14, ease: "none" }, 0.84);

      gsap.timeline({
        scrollTrigger: {
          trigger: ".journey",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
          pin: ".journey-stage",
          pinSpacing: false,
          anticipatePin: 1,
          onEnter: () => setScene("THE SCENIC ROUTE"),
          onEnterBack: () => setScene("THE SCENIC ROUTE"),
        },
      })
        .fromTo(".journey-copy", { yPercent: 18 }, { yPercent: -16, duration: 1, ease: "none" }, 0)
        .to(".journey-path-ink", { strokeDashoffset: 0, duration: 0.8, ease: "none" }, 0)
        .to(".journey-mascot", { motionPath: { path: ".journey-path", align: ".journey-path", autoRotate: 8, alignOrigin: [0.5, 0.5] }, duration: 0.82, ease: "none" }, 0)
        .to(".journey-arrow", { x: -80, y: -110, rotate: 5, duration: 0.55, ease: "none" }, 0.24)
        .to(".journey-copy", { opacity: 0.12, duration: 0.2, ease: "none" }, 0.8)
        .to(".journey-mascot", { x: 130, y: -150, scale: 0.76, opacity: 0, duration: 0.2, ease: "none" }, 0.84);

      gsap.from(".category-showcase-card", {
        scrollTrigger: { trigger: ".category-showcase", start: "top 72%", toggleActions: "play none none reverse" },
        y: 90,
        opacity: 0,
        rotate: 4,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: ".story-one",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: ".story-one-stage",
          pinSpacing: false,
          anticipatePin: 1,
          onEnter: () => setScene("THINGS WE KEEP"),
          onEnterBack: () => setScene("THINGS WE KEEP"),
        },
      })
        .fromTo(".story-one .story-headline .line", { yPercent: 110 }, { yPercent: 0, stagger: 0.12, duration: 0.42, ease: "none" }, 0)
        .fromTo(".story-one-art", { y: 140, rotate: -7, scale: 0.82 }, { y: -145, rotate: 9, scale: 1.28, duration: 0.78, ease: "none" }, 0.06)
        .fromTo(".story-dek", { y: 60, opacity: 0.15 }, { y: -30, opacity: 1, duration: 0.52, ease: "none" }, 0.2)
        .to(".story-one-wash", { xPercent: 100, duration: 0.18, ease: "none" }, 0.84)
        .to(".story-one .outline-button", { y: 30, opacity: 0, duration: 0.12, ease: "none" }, 0.86);

      gsap.timeline({
        scrollTrigger: {
          trigger: ".transition",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onEnter: () => setScene("KEEP LOOKING"),
          onEnterBack: () => setScene("KEEP LOOKING"),
        },
      })
        .fromTo(".transition-pal", { scale: 0.8, rotate: -10, y: 80 }, { scale: 1.38, rotate: 16, y: -70, duration: 0.65, ease: "none" }, 0)
        .fromTo(".transition-word", { xPercent: -10 }, { xPercent: 0, duration: 0.65, ease: "none" }, 0);

      gsap.timeline({
        scrollTrigger: {
          trigger: ".story-two",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: ".story-two-stage",
          pinSpacing: false,
          anticipatePin: 1,
          onEnter: () => setScene("NEW THINGS"),
          onEnterBack: () => setScene("NEW THINGS"),
        },
      })
        .fromTo(".story-two .back", { xPercent: 32, yPercent: 8 }, { xPercent: -22, yPercent: -8, duration: 0.8, ease: "none" }, 0)
        .fromTo(".story-two-art", { x: 150, y: 80, rotate: 7, scale: 0.8 }, { x: -150, y: -60, rotate: -5, scale: 1.16, duration: 0.75, ease: "none" }, 0.05)
        .fromTo(".story-two .front", { xPercent: -18, yPercent: -8 }, { xPercent: 22, yPercent: 8, duration: 0.78, ease: "none" }, 0.08)
        .fromTo(".story-two-footer", { x: 120, y: 25, opacity: 0.15 }, { x: -60, y: -12, opacity: 1, duration: 0.42, ease: "none" }, 0.4)
        .to(".story-two-curtain", { clipPath: "inset(0 0 0 100%)", duration: 0.2, ease: "none" }, 0.83);

      gsap.timeline({
        scrollTrigger: {
          trigger: ".carousel-scene",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: ".carousel-stage",
          pinSpacing: false,
          anticipatePin: 1,
          onEnter: () => setScene("A SMALL DETOUR"),
          onEnterBack: () => setScene("A SMALL DETOUR"),
        },
      })
        .fromTo(".carousel-copy", { xPercent: -22, yPercent: 12 }, { xPercent: 8, yPercent: -12, duration: 0.75, ease: "none" }, 0)
        .fromTo(".road-sign", { x: 140, rotate: -20 }, { x: -90, rotate: 18, duration: 0.75, ease: "none" }, 0)
        .fromTo(".tiny-note", { y: 50, opacity: 0 }, { y: -15, opacity: 1, duration: 0.45, ease: "none" }, 0.3);

      gsap.timeline({
        scrollTrigger: {
          trigger: ".closing",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onEnter: () => setScene("OUT THERE"),
          onEnterBack: () => setScene("OUT THERE"),
        },
      })
        .fromTo(".closing h2", { yPercent: 18 }, { yPercent: -10, duration: 0.7, ease: "none" }, 0)
        .fromTo(".closing-pal", { y: 100, rotate: 8, scale: 0.82 }, { y: -100, rotate: -12, scale: 1.18, duration: 0.7, ease: "none" }, 0)
        .fromTo(".closing-footer", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: "none" }, 0.55);

      gsap.timeline({
        scrollTrigger: {
          trigger: ".postcard-scene",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: ".postcard-stage",
          pinSpacing: true,
          anticipatePin: 1,
          onEnter: () => setScene("POSTCARD FROM NOWHERE"),
          onEnterBack: () => setScene("POSTCARD FROM NOWHERE"),
        },
      })
        .fromTo(".postcard-copy", { xPercent: -18, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.42, ease: "none" }, 0)
        .fromTo(".postcard-card", { y: 180, rotate: -12, scale: 0.72 }, { y: -80, rotate: 7, scale: 1, duration: 0.72, ease: "none" }, 0)
        .fromTo(".postcard-stamp", { scale: 0, rotate: -22 }, { scale: 1, rotate: 8, duration: 0.22, ease: "back.out(1.7)" }, 0.42)
        .to(".postcard-card", { x: -80, rotate: -4, duration: 0.2, ease: "none" }, 0.82);

      gsap.timeline({
        scrollTrigger: {
          trigger: ".soundcheck-scene",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: ".soundcheck-stage",
          pinSpacing: true,
          anticipatePin: 1,
          onEnter: () => setScene("SOUND CHECK"),
          onEnterBack: () => setScene("SOUND CHECK"),
        },
      })
        .fromTo(".soundcheck-title", { yPercent: 35 }, { yPercent: -20, duration: 0.75, ease: "none" }, 0)
        .fromTo(".soundcheck-wave", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.7, ease: "none" }, 0.1)
        .fromTo(".soundcheck-record", { y: 180, rotate: -28 }, { y: -110, rotate: 24, duration: 0.7, ease: "none" }, 0)
        .fromTo(".soundcheck-note", { opacity: 0, y: 40 }, { opacity: 1, y: -10, duration: 0.35, ease: "none" }, 0.46);

      gsap.timeline({ scrollTrigger: { trigger: ".postcard-lab-scene", start: "top top", end: "bottom bottom", scrub: 1, pin: ".postcard-lab-stage", pinSpacing: true, onEnter: () => setScene("MAKE A MARK"), onEnterBack: () => setScene("MAKE A MARK") } })
        .fromTo(".postcard-lab-title", { yPercent: 28, opacity: 0 }, { yPercent: -12, opacity: 1, duration: .7, ease: "none" }, 0)
        .fromTo(".lab-paper", { y: 190, rotate: -18, scale: .72 }, { y: -70, rotate: 9, scale: 1, duration: .72, ease: "none" }, 0)
        .fromTo(".lab-sticker", { scale: 0, rotate: -30 }, { scale: 1, rotate: 12, duration: .22, ease: "back.out(1.7)" }, .42)
        .to(".lab-pencil", { x: 210, y: -120, rotate: 26, duration: .5, ease: "none" }, .2);

      gsap.timeline({ scrollTrigger: { trigger: ".dispatch-scene", start: "top top", end: "bottom bottom", scrub: 1, pin: ".dispatch-stage", pinSpacing: true, onEnter: () => setScene("SEND IT OUT"), onEnterBack: () => setScene("SEND IT OUT") } })
        .fromTo(".dispatch-title", { xPercent: -22 }, { xPercent: 8, duration: .7, ease: "none" }, 0)
        .fromTo(".dispatch-cloud", { y: 180, rotate: -10, scale: .65 }, { y: -80, rotate: 8, scale: 1.1, duration: .72, ease: "none" }, 0)
        .fromTo(".dispatch-spark", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .25, ease: "back.out(1.7)" }, .4);

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => globalProgress.kill();
    }, root);

    return () => {
      ctx.revert();
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <main ref={root} className={`magazine-shell ${introEntered ? "site-entered" : "site-locked"}`}>
    {!introEntered && <section className="welcome-cloud-gate" aria-label="Paper Trail introduction"><div className="welcome-gate-brand">PAPER TRAIL <span>/ ISSUE 04</span></div><p className="welcome-gate-kicker">A VISUAL MAGAZINE<br />FOR CURIOUS PEOPLE</p><div className="welcome-gate-message"><span>WELCOME, WANDERER.</span><strong>There is always<br />another way in.</strong><small>Stories, objects, sounds, and scenic routes<br />for the incurably curious.</small></div><div className="welcome-paper-pal"><PaperPal accent="#f4ed36" /></div><button className="welcome-start-button" onClick={enterSite}>START NOW <span>↘</span></button><p className="welcome-gate-footer">STORIES · OBJECTS · SOUNDS · SCENIC ROUTES</p></section>}
    <aside className="story-rail" aria-hidden="true"><span className="story-rail-label">ISSUE 04 / {sceneLabel}</span><div className="story-rail-track"><i className="story-rail-fill" /></div><span className="story-rail-end">END</span></aside>

    <section className="scene intro" id="top">
      <div className="intro-stage">
        <div className="intro-brand">PAPER TRAIL <span>/ ISSUE 04</span></div>
        <div className="intro-index">A MAGAZINE FOR THE<br />INCURABLY CURIOUS</div>
        <div className="intro-title" aria-label="Stay curious"><div className="intro-word yellow">STAY</div><div className="intro-word butter">CURIOUS.</div></div>
        <PaperPal className="intro-mascot mascot" />
        <div className="intro-bottom"><p><b>A visual magazine for curious people.</b><br />Stories, objects, sounds, and scenic routes<br />for when the obvious feels too obvious.</p><div className="intro-ctas"><a href="#explore" className="pill-button intro-cta">ENTER THE ISSUE <span>↘</span></a></div><span className="scroll-mark">SCROLL TO WANDER ↓</span></div>
      </div>
    </section>

    <section className="scene journey" id="journey">
      <div className="journey-stage">
        <svg className="journey-path-svg" viewBox="0 0 1000 700" preserveAspectRatio="none"><path className="journey-path-ink" d="M60 610 C210 420 240 610 390 380 S650 110 940 230" fill="none" stroke="#000" strokeWidth="4" strokeDasharray="1200" strokeDashoffset="1200" /><path className="journey-path" d="M60 610 C210 420 240 610 390 380 S650 110 940 230" fill="none" stroke="transparent" strokeWidth="2" /></svg>
        <div className="journey-copy"><span className="mono-label">01 / OPENING JOURNEY</span><h2>LET ME SHOW<br /><em>YOU WHAT'S</em><br />INSIDE.</h2><p>Take the scenic route. There is no right way through a good story.</p></div>
        <PaperPal className="journey-mascot mascot" accent="#f9cc73" /><div className="journey-arrow">KEEP GOING <span>→</span></div>
      </div>
    </section>

    <section className="category-showcase" id="explore" aria-labelledby="explore-magazine-title">
      <div className="category-showcase-topline"><span className="mono-label">02 / FIND YOUR NEXT STORY</span><span className="mono-label">PAPER TRAIL / ISSUE 04</span></div>
      <h2 id="explore-magazine-title" className="category-showcase-title">EXPLORE<br /><span>THE MAGAZINE</span></h2>
      <img className="find-story-illustration" src="/illustrations/find-your-next-story-generated.png" alt="Paper trail explorer holding a map and book" />
      <div className="category-showcase-grid">
        {magazineCategories.map((category, index) => <a className="category-showcase-card" href={`/article/${category.slug}`} key={category.slug} style={{ "--category-accent": category.accentColor } as CSSProperties}>
          <span className="category-showcase-index">0{index + 1}</span>
          <div className="category-showcase-art"><CategoryIllustration category={category} /></div>
          <span className="category-showcase-button">{category.name}<b>↗</b></span>
          <span className="category-showcase-label">{category.label}</span>
        </a>)}
      </div>
      <div className="category-showcase-footer"><span>FIVE WAYS IN</span><span>CHOOSE A THREAD AND FOLLOW IT</span><span>↓</span></div>
    </section>

    <section className="scene story-one">
      <div className="story-one-stage"><div className="story-one-wash" /><div className="story-meta"><span className="mono-label">CULTURE / 08 MIN</span><span className="issue-number">04—01</span></div><div className="story-headline"><div className="line">WHY WE</div><div className="line yellow">STILL KEEP</div><div className="line">THINGS.</div></div><div className="story-one-art"><OrbitGlyph /></div><a href="/article/culture" className="outline-button">READ STORY <span>→</span></a><p className="story-dek">A field guide to sentimental clutter, tiny rituals, and the objects that refuse to leave us alone.</p></div>
    </section>

    <section className="transition"><div className="transition-word">KEEP<br />LOOKING</div><PaperPal className="transition-pal mascot" accent="#f8c1ba" /></section>

    <section className="scene story-two" id="story-two">
      <div className="story-two-stage"><span className="mono-label">PEOPLE / 11 MIN</span><div className="layer back">THE PEOPLE</div><div className="layer front">MAKING<br /><span>NEW THINGS</span></div><div className="story-two-art"><svg viewBox="0 0 300 300" aria-label="Abstract editorial illustration"><path d="M42 251 L81 54 L174 27 L260 71 L232 247Z" fill="#b5c995" stroke="#000" strokeWidth="7" /><circle cx="136" cy="114" r="42" fill="#f9f5f2" stroke="#000" strokeWidth="7" /><path d="M98 176 Q148 218 211 167" fill="none" stroke="#000" strokeWidth="7" /><path d="M177 49 L201 8 M218 63 L253 33" stroke="#000" strokeWidth="7" strokeLinecap="round" /></svg></div><div className="story-two-footer"><p>Meet the makers bending the future<br />into something you can hold.</p><a href="/article/people" className="outline-button">MEET THEM <span>↗</span></a></div></div>
    </section>

    <section className="scene carousel-scene"><div className="carousel-stage"><div className="mono-label">03 / A SMALL DETOUR</div><div className="carousel-copy"><span>HOW ABOUT</span><strong>GOING<br />SOMEWHERE<br /><i>NEW?</i></strong></div><div className="road-sign"><span>EXIT 04</span><b>↗</b></div><div className="tiny-note">NO MAP REQUIRED<br />JUST A GOOD PAIR OF EYES</div></div></section>

    <section className="scene postcard-scene"><div className="postcard-stage"><div className="postcard-copy"><span className="mono-label">04 / A NOTE IN THE MARGINS</span><h2>WISH<br /><em>YOU WERE</em><br />HERE.</h2><p>A dispatch from the places that only appear when you slow down.</p></div><div className="postcard-card"><div className="postcard-sun" /><PaperPal accent="#f4ed36" /><span className="postcard-stamp">AIR<br />MAIL</span><span className="postcard-card-label">PAPER TRAIL / 04</span></div><div className="postcard-line" /></div></section>

    <section className="scene soundcheck-scene"><div className="soundcheck-stage"><span className="mono-label">05 / LISTEN CLOSER</span><h2 className="soundcheck-title">SOUND<br /><i>CHECK.</i></h2><div className="soundcheck-wave"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div><div className="soundcheck-record"><div className="record-label">PLAY<br />SIDE A</div></div><p className="soundcheck-note">A field recording of songs,<br />rooms, and accidents with rhythm.</p><PaperPal className="soundcheck-pal mascot" accent="#f8c1ba" /></div></section>

    <section className="scene postcard-lab-scene"><div className="postcard-lab-stage"><span className="mono-label">06 / MAKE A MARK</span><h2 className="postcard-lab-title">LEAVE<br /><em>A LITTLE</em><br />TRACE.</h2><div className="lab-paper"><div className="lab-paper-grid" /><span>FIELD<br />NOTE<br />06</span><div className="lab-sticker">✳</div></div><div className="lab-pencil">✎</div><p className="lab-note">Write it down. Draw it out.<br />Make the invisible easier to find.</p></div></section>

    <section className="scene dispatch-scene"><div className="dispatch-stage"><span className="mono-label">07 / SEND IT OUT</span><h2 className="dispatch-title">EVERY<br /><i>GOOD IDEA</i><br />TRAVELS.</h2><div className="dispatch-cloud"><PaperPal accent="#f4ed36" /><span className="dispatch-spark">✦</span></div><p className="dispatch-note">A small dispatch for curious people<br />who are still on their way.</p><a href="mailto:hello@papertrail.test" className="pill-button dispatch-button">SAY HELLO <span>↗</span></a></div></section>

    <section className="scene closing" id="end"><span className="mono-label">THE END IS A BEGINNING</span><h2>SEE YOU<br /><span>OUT THERE.</span></h2><PaperPal className="closing-pal mascot" accent="#f4ed36" /><div className="closing-footer"><span>PAPER TRAIL / ISSUE 04</span><span>MADE FOR WANDERERS</span></div></section>
  </main>;
}

export { PaperPal };
