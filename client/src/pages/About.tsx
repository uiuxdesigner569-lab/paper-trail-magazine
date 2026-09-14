import { Link } from "wouter";
import { useRef } from "react";
import MovingIllustration from "../components/MovingIllustration";
import { usePageMotion } from "../hooks/usePageMotion";

const milestones = [
  ["01", "THE FIRST TRAIL", "Paper Trail begins as a tiny editorial experiment: a place for the things that do not fit neatly anywhere else."],
  ["02", "MORE QUESTIONS", "Readers arrive with better questions, strange references, and stories worth keeping in circulation."],
  ["03", "THE FIELD NOTES", "Culture, design, people, music, and travel become our five ways into a larger, more curious world."],
  ["04", "THE ISSUE", "The magazine becomes a moving archive for objects, voices, and detours that deserve another look."],
  ["05", "STAY CURIOUS", "Today, Paper Trail is made for anyone who would rather take the scenic route."],
];

export default function About() {
  const root = useRef<HTMLElement>(null);
  usePageMotion(root);
  return <main ref={root} className="about-page"><section className="about-hero"><span className="mono-label">ABOUT PAPER TRAIL / ISSUE 04</span><h1 className="page-motion-title">Paper Trail is<br /><em>a ticket for</em><br />the curious.</h1><p className="page-motion-lead">We are a small, vivid, wandering magazine for people who collect questions. Whatever pulls you in, wherever you find it, Paper Trail is your invitation to look closer.</p><div className="about-hero-mark">↘<span>TAKE THE<br />SCENIC ROUTE</span></div><MovingIllustration className="about-moving-art page-motion-art" accent="#f4ed36" variant="orbit" /></section><section className="about-statement page-reveal"><div className="about-statement-label"><span className="mono-label">WHY WE ARE HERE</span><span className="about-rule" /></div><div><h2>A GOOD STORY<br />SHOULD LEAVE<br /><i>A LITTLE DUST.</i></h2><p>We believe curiosity is a practice, not a personality trait. It lives in the object you keep, the song you replay, the person you notice, and the road you take for no practical reason.</p></div></section><section className="about-timeline"><div className="timeline-heading"><span className="mono-label">HOW WE GOT HERE</span><h2>IT STARTED<br />WITH A<br /><em>PAGE.</em></h2></div><div className="timeline-list">{milestones.map(([number, title, copy]) => <article className="timeline-item page-reveal" key={number}><span className="timeline-number">{number}</span><div><h3>{title}</h3><p>{copy}</p></div><span className="timeline-arrow">↗</span></article>)}</div></section><section className="about-closer page-reveal"><div><span className="mono-label">THE NEXT FIELD NOTE IS YOURS</span><h2>KEEP<br /><em>LOOKING.</em></h2><Link href="/" className="pill-button">ENTER THE ISSUE ↘</Link></div><PaperTrailDoodle /></section></main>;
}

function PaperTrailDoodle() {
  return <svg className="about-doodle" viewBox="0 0 320 260" aria-hidden="true"><path d="M35 168 Q22 131 55 112 Q51 74 93 76 Q116 36 151 67 Q186 26 220 69 Q268 52 275 95 Q311 102 285 137 Q309 176 270 185 Q259 225 216 210 Q177 247 143 214 Q97 237 78 200 Q40 211 35 168Z" fill="#f9f5f2" stroke="#1a1a1a" strokeWidth="8" /><ellipse cx="126" cy="108" rx="26" ry="40" fill="#1a1a1a" /><ellipse cx="183" cy="108" rx="26" ry="40" fill="#1a1a1a" /><path d="M117 84 Q127 95 127 108 M174 84 Q184 95 184 108" fill="none" stroke="#f9f5f2" strokeWidth="6" strokeLinecap="round" /><path d="M108 181 Q143 199 190 180" fill="none" stroke="#1a1a1a" strokeWidth="9" strokeLinecap="round" /><path d="M116 209 L91 250 M204 207 L232 250" stroke="#1a1a1a" strokeWidth="12" strokeLinecap="round" /><ellipse cx="87" cy="254" rx="28" ry="11" fill="#1a1a1a" /><ellipse cx="237" cy="254" rx="28" ry="11" fill="#1a1a1a" /></svg>;
}
