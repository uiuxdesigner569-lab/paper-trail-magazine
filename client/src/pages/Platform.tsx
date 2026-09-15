import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { articles, getArticle, type Article } from "../data/articles";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const storyMeta: Record<string, { author: string; date: string; excerpt: string; issue: string; illustration: string; photo: string }> = {
  culture: { author: "Mara Venn", date: "18 APR 2026", excerpt: "A field guide to sentimental clutter, tiny rituals, and the objects that refuse to leave us alone.", issue: "04", illustration: "/illustrations/culture-category.png", photo: "/illustrations/story-culture.jpg" },
  design: { author: "Owen Pike", date: "21 APR 2026", excerpt: "Meet the objects that make a room feel less finished and more alive.", issue: "04", illustration: "/illustrations/find-your-next-story-generated.png", photo: "/illustrations/story-design.jpg" },
  people: { author: "Nia Bell", date: "24 APR 2026", excerpt: "Meet the makers bending the future into something you can hold.", issue: "04", illustration: "/illustrations/people-category-generated.png", photo: "/illustrations/story-people.jpg" },
  music: { author: "Jules Hart", date: "27 APR 2026", excerpt: "A field recording of the songs, rooms, and accidents that make a city feel awake.", issue: "04", illustration: "/illustrations/music-category.png", photo: "/illustrations/story-music.jpg" },
  travel: { author: "Sam Calder", date: "30 APR 2026", excerpt: "A small atlas of detours for people who want to get lost with intention.", issue: "04", illustration: "/illustrations/travel-category.png", photo: "/illustrations/story-travel.jpg" },
};
const categoryInfo: Record<string, { description: string; accent: string }> = {
  culture: { description: "The stuff that sticks: objects, rituals, and the stories we carry without noticing.", accent: "#f8c1ba" },
  design: { description: "Objects with opinions, made for rooms that leave space for a little mischief.", accent: "#b5c995" },
  people: { description: "The beautiful weirdos making tomorrow tangible, one stubborn question at a time.", accent: "#f9cc73" },
  music: { description: "Noise with a pulse: songs, rooms, accidents, and the city between the beats.", accent: "#ac4f98" },
  travel: { description: "Out of office, in mind: scenic routes and detours worth taking on purpose.", accent: "#c94245" },
};
const metaFor = (article: Article) => storyMeta[article.slug] ?? { author: "Paper Trail Desk", date: "APR 2026", excerpt: article.dek, issue: "04", illustration: "/illustrations/find-your-next-story-generated.png", photo: "/illustrations/find-your-next-story-generated.png" };

function PlatformFrame({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <main className="platform-page"><header className="platform-header"><Link href="/" className="platform-back">← PAPER TRAIL</Link><span>PAPER TRAIL / ISSUE 04</span><Link href="/stories">STORIES ↗</Link></header><section className="platform-heading"><span className="mono-label">{eyebrow}</span><h1>{title}</h1></section>{children}</main>;
}

function StoryPreview({ article, index = 0, compact = false }: { article: Article; index?: number; compact?: boolean }) {
  const meta = metaFor(article);
  return <Link href={`/stories/${article.slug}`} className={`story-preview story-preview-${index % 4} ${compact ? "story-preview-compact" : ""}`} style={{ "--story-accent": article.color } as React.CSSProperties}><div className="story-preview-art"><img src={meta.photo} alt={`${article.category.toLowerCase()} story photograph`} /></div><div className="story-preview-copy"><div className="story-preview-top"><span>{article.category} / ISSUE {meta.issue}</span><b>{article.readTime}</b></div><span className="story-preview-index">0{index + 1}</span><h2>{article.title}</h2><p>{meta.excerpt}</p><div className="story-preview-meta"><span>BY {meta.author.toUpperCase()}</span><span>{meta.date}</span></div></div></Link>;
}

function FilterBar({ active, onChange }: { active: string; onChange: (filter: string) => void }) {
  const filters = ["ALL", "CULTURE", "DESIGN", "PEOPLE", "MUSIC", "TRAVEL", "LATEST", "EDITOR'S PICKS", "ISSUE 04", "ISSUE 03"];
  return <nav className="story-filters" aria-label="Story filters">{filters.map((filter) => <button key={filter} className={active === filter ? "is-active" : ""} onClick={() => onChange(filter)}>{filter}</button>)}</nav>;
}

function StoryIndex() {
  const [filter, setFilter] = useState("ALL");
  const filtered = filter === "ALL" || filter === "LATEST" || filter === "EDITOR'S PICKS" || filter === "ISSUE 04" ? articles : filter === "ISSUE 03" ? [] : articles.filter((article) => article.category === filter);
  return <PlatformFrame eyebrow="THE STORY INDEX / FIVE WAYS IN" title="Follow the trail."><div className="stories-intro"><p>A magazine you explore, not just scroll. Choose a thread, follow a color, and let one story point toward another.</p><Link className="pill-button" href="/issues/04">READ ISSUE 04 ↗</Link></div><FilterBar active={filter} onChange={setFilter} />{filter === "ISSUE 03" && <div className="story-empty"><span className="mono-label">ISSUE 03 / ARCHIVE</span><h2>The old trail is still being mapped.</h2><p>Older stories are coming soon.</p></div>}<div className="story-masonry">{filtered.map((article, index) => <StoryPreview key={article.slug} article={article} index={index} />)}</div></PlatformFrame>;
}

function CategoryPage({ category }: { category: string }) {
  const info = categoryInfo[category] ?? categoryInfo.culture;
  const categoryStories = articles.filter((article) => article.slug === category);
  const featured = categoryStories[0] ?? articles[0];
  return <PlatformFrame eyebrow={`${category.toUpperCase()} / FIELD NOTES`} title={`${category.toUpperCase()}.`}><section className="category-landing-hero" style={{ "--category-accent": info.accent } as React.CSSProperties}><img src={metaFor(featured).illustration} alt="" /><p>{info.description}</p></section><section className="category-featured"><span className="mono-label">FEATURED STORY / ISSUE 04</span><StoryPreview article={featured} index={0} /></section><section className="category-story-section"><div className="section-label"><span className="mono-label">LATEST STORIES</span><Link href="/stories">VIEW ALL ↗</Link></div><div className="category-story-strip">{articles.filter((article) => article.slug !== category).slice(0, 3).map((article, index) => <StoryPreview key={article.slug} article={article} index={index + 1} compact />)}</div></section><section className="category-story-section popular-section"><div className="section-label"><span className="mono-label">POPULAR STORIES</span><span>THE ONES READ TWICE</span></div><div className="category-story-strip">{articles.slice().reverse().slice(0, 3).map((article, index) => <StoryPreview key={article.slug} article={article} index={index + 2} compact />)}</div></section></PlatformFrame>;
}

export function Stories({ category }: { category?: string }) { return category ? <CategoryPage category={category} /> : <StoryIndex />; }

export function StoryReader({ slug }: { slug: string }) {
  const article = getArticle(slug);
  const [saved, setSaved] = useState(() => localStorage.getItem(`paper-trail-saved-${slug}`) === "1");
  const [progress, setProgress] = useState(() => Number(localStorage.getItem(`paper-trail-progress-${slug}`) ?? 0));
  const root = useRef<HTMLElement>(null);
  if (!article) return <PlatformFrame eyebrow="404 / QUIET TRAIL" title="Story not found."><Link className="pill-button" href="/stories">BACK TO STORIES ↗</Link></PlatformFrame>;
  const meta = metaFor(article);
  const next = articles[(articles.findIndex((item) => item.slug === slug) + 1) % articles.length];
  const chapters = [
    { label: "A THING REMEMBERED", body: article.body[0], image: meta.photo, kind: "scene" },
    { label: "THE QUESTION UNDERNEATH", body: article.body[1], image: meta.illustration, kind: "character" },
    { label: "A LITTLE MORE LIGHT", body: article.details[0], image: meta.photo, kind: "wide" },
    { label: "FIELD NOTE", body: article.details.slice(1).join(" "), image: meta.illustration, kind: "object" },
  ];
  useEffect(() => {
    const key = "paper-trail-opened-stories";
    const opened = JSON.parse(localStorage.getItem(key) ?? "[]") as string[];
    localStorage.setItem(key, JSON.stringify(Array.from(new Set([slug, ...opened])).slice(0, 20)));
    const lenis = new Lenis({ smoothWheel: true });
    const raf = (time: number) => { lenis.raf(time); };
    gsap.ticker.add(raf);
    const context = gsap.context(() => {
      gsap.from(".reader-story-intro > *", { y: 32, opacity: 0, stagger: .08, duration: .75, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".story-chapter").forEach((chapter) => gsap.from(chapter, { y: 55, opacity: 0, duration: .75, ease: "power3.out", scrollTrigger: { trigger: chapter, start: "top 82%", once: true } }));
      gsap.utils.toArray<HTMLElement>(".chapter-art img").forEach((image) => gsap.to(image, { y: -16, rotate: 2, ease: "none", scrollTrigger: { trigger: image, start: "top bottom", end: "bottom top", scrub: true } }));
      ScrollTrigger.create({ trigger: root.current, start: "top top", end: "bottom bottom", onUpdate: (self) => { const value = Math.round(self.progress * 100); setProgress(value); localStorage.setItem(`paper-trail-progress-${slug}`, String(value)); if (value > 96) localStorage.setItem(`paper-trail-completed-${slug}`, "1"); } });
    }, root);
    return () => { context.revert(); lenis.destroy(); gsap.ticker.remove(raf); };
  }, [slug]);
  const toggleSaved = () => { const next = !saved; setSaved(next); localStorage.setItem(`paper-trail-saved-${slug}`, next ? "1" : "0"); };
  return <main ref={root} className="reader-page story-reader-page" style={{ "--story-accent": article.color } as React.CSSProperties}><header className="platform-header"><Link href="/stories">← STORIES</Link><span>ISSUE {meta.issue} / {article.category}</span><button className="reader-save" onClick={toggleSaved}>{saved ? "SAVED ✓" : "SAVE STORY +"}</button></header><div className="reader-progress"><span>CHAPTER {Math.min(7, Math.max(1, Math.ceil((progress / 100) * 7)))} / 07</span><i><b style={{ width: `${progress}%` }} /></i><strong>{progress}%</strong></div><section className="reader-story-intro"><div><span className="mono-label">{article.category} / ISSUE {meta.issue} / {article.readTime}</span><h1>{article.title}</h1><p>{meta.excerpt}</p><div className="reader-byline"><span>WORDS BY <b>{meta.author.toUpperCase()}</b></span><span>PUBLISHED {meta.date}</span></div></div><div className="reader-intro-art"><img src={meta.illustration} alt={`${article.category.toLowerCase()} story illustration`} /><span>FIELD NOTE 04—{article.category.slice(0, 2)}</span></div></section><article className="story-chapters">{chapters.map((chapter, index) => <section className={`story-chapter chapter-${chapter.kind}`} key={chapter.label}><div className="chapter-label"><span>CHAPTER 0{index + 1}</span><b>{chapter.label}</b></div><div className="chapter-content"><div className="chapter-art"><img src={chapter.image} alt="" /><span className="chapter-sticker">FOLLOW<br />THIS ↘</span></div><div className="chapter-copy"><p>{chapter.body}</p>{index === 1 && <blockquote>{article.pullQuote}</blockquote>}{index === 3 && <div className="speech-bubble">A story is a door.<br /><b>Keep it open.</b></div>}</div></div></section>)}</article><section className="next-trail"><span className="mono-label">YOU FOLLOWED {article.category}.</span><h2>NOW TRY<br /><em>{next.category}.</em></h2><p>{metaFor(next).excerpt}</p><Link className="pill-button" href={`/stories/${next.slug}`}>NEXT TRAIL →</Link></section></main>;
}

export function Issues() { return <PlatformFrame eyebrow="THE ARCHIVE" title="Every issue leaves a trace."><div className="issue-grid"><Link href="/issues/04" className="issue-card issue-current"><span>ISSUE 04</span><strong>THE SCENIC<br /><em>ROUTE.</em></strong><small>APRIL 2026 / FIVE WAYS IN</small><b>OPEN ISSUE ↗</b></Link>{["03 / OBJECTS IN MOTION", "02 / THE LONG WAY ROUND", "01 / BEGIN SOMEWHERE"].map((issue) => <div className="issue-card" key={issue}><span>{issue}</span><strong>FIELD<br />NOTES.</strong><small>ARCHIVED EDITION</small><b>COMING SOON</b></div>)}</div></PlatformFrame>; }
export function IssueDetail({ issue = "04" }: { issue?: string }) { return <PlatformFrame eyebrow={`ISSUE ${issue} / APRIL 2026`} title="The scenic route."><div className="issue-detail-lead"><p>Issue 04 is a magazine you explore, not just scroll. Start anywhere, follow the color, and let one story point toward another.</p><span>05 STORIES / 01 ISSUE / MANY WAYS IN</span></div><div className="story-masonry">{articles.map((article, index) => <StoryPreview key={article.slug} article={article} index={index} />)}</div></PlatformFrame>; }

export function Auth({ mode }: { mode: "login" | "signup" | "forgot" }) { const [sent, setSent] = useState(false); const submit = (event: FormEvent) => { event.preventDefault(); if (mode !== "forgot") { localStorage.setItem("paper-trail-auth", "1"); window.dispatchEvent(new CustomEvent("paper-trail-auth")); } setSent(true); }; const labels = { login: ["WELCOME BACK,", "WANDERER."], signup: ["JOIN THE", "TRAIL."], forgot: ["LOST THE", "THREAD?"] }[mode]; return <main className="auth-page"><div className="auth-art-panel"><Link href="/" className="auth-logo">PAPER TRAIL / ISSUE 04</Link><img src="/illustrations/find-your-next-story-generated.png" alt="" /><span>STORIES · OBJECTS · SOUNDS · SCENIC ROUTES</span></div><section className="auth-content"><Link href="/" className="platform-back">← BACK TO PAPER TRAIL</Link><span className="mono-label">PAPER TRAIL / MEMBERS</span><h1>{labels[0]}<br /><em>{labels[1]}</em></h1><form className="auth-form" onSubmit={submit}>{mode === "signup" && <label>NAME<input required placeholder="Your name" /></label>}<label>EMAIL<input required type="email" placeholder="you@example.com" /></label>{mode !== "forgot" && <><label>PASSWORD<input required type="password" placeholder="••••••••" /></label>{mode === "signup" && <label>CONFIRM PASSWORD<input required type="password" placeholder="••••••••" /></label>}</>}<button className="pill-button" type="submit">{mode === "forgot" ? "SEND RESET LINK ↗" : mode === "login" ? "LOG IN ↗" : "CREATE ACCOUNT ↗"}</button>{sent && <p className="auth-success">This prototype keeps your details local. You’re ready to keep looking.</p>}</form><div className="auth-links">{mode === "login" && <><Link href="/forgot-password">FORGOT PASSWORD</Link><Link href="/signup">CREATE ACCOUNT</Link></>}{mode !== "login" && <Link href="/login">LOG IN</Link>}{mode !== "signup" && <Link href="/signup">SIGN UP</Link>}</div></section></main>; }

const shelfStories = articles.slice(0, 4);
function ShelfStory({ article, progress = "72%", label = "SAVED" }: { article: Article; progress?: string; label?: string }) { const meta = metaFor(article); return <Link href={`/stories/${article.slug}`} className="shelf-story"><img src={meta.illustration} alt="" /><div><span className="mono-label">{label} / {article.category} / ISSUE {meta.issue}</span><h3>{article.title}</h3><small>{article.readTime} · {progress} READ</small><i><b style={{ width: progress }} /></i></div></Link>; }

export function Account({ section = "trail" }: { section?: string }) { const [name, setName] = useState("WANDERER"); const [email, setEmail] = useState("hello@papertrail.local"); const [avatar, setAvatar] = useState("✦"); const titles: Record<string, string> = { trail: "Your shelf.", stories: "Stories you keep.", orders: "Orders in motion.", profile: "Your profile.", settings: "Make it yours." }; return <main className="account-page"><header className="account-header"><Link href="/" className="platform-back">← PAPER TRAIL</Link><span>MY TRAIL / ISSUE 04</span><Link href="/stories">KEEP LOOKING ↗</Link></header><section className="account-heading"><span className="mono-label">MY TRAIL / {section.toUpperCase()}</span><h1>{titles[section] ?? titles.trail}</h1></section><div className="account-layout"><aside className="account-nav"><Link href="/account">MY TRAIL</Link><Link href="/account/stories">MY STORIES</Link><Link href="/account/orders">ORDERS</Link><Link href="/account/profile">PROFILE</Link><Link href="/account/settings">SETTINGS</Link><Link href="/login">LOG OUT</Link></aside><section className="account-shelf">{section === "profile" ? <form className="profile-form" onSubmit={(event) => event.preventDefault()}><label>NAME<input value={name} onChange={(event) => setName(event.target.value)} /></label><label>EMAIL<input value={email} onChange={(event) => setEmail(event.target.value)} /></label><span className="mono-label">CHOOSE AN AVATAR</span><div className="avatar-options">{["✦", "✎", "◉", "♫", "▣", "⌁"].map((option) => <button type="button" className={avatar === option ? "is-selected" : ""} onClick={() => setAvatar(option)} key={option}>{option}</button>)}</div><span className="mono-label">FAVORITE CATEGORIES</span><div className="category-picks">{["CULTURE", "DESIGN", "PEOPLE", "MUSIC", "TRAVEL"].map((category) => <button type="button" key={category}>{category}</button>)}</div><button className="pill-button" type="submit">SAVE PROFILE ↗</button></form> : section === "orders" ? <div className="orders-list"><div className="order-row"><span>#PT-0407 / 30 APR 2026</span><strong>PACKING</strong><b>2 PRODUCTS / $68.00</b></div><div className="order-row"><span>#PT-0312 / 12 MAR 2026</span><strong>DELIVERED</strong><b>1 PRODUCT / $24.00</b></div></div> : <><div className="shelf-section"><div className="section-label"><span className="mono-label">CONTINUE READING</span><span>YOUR PLACE IS KEPT</span></div><ShelfStory article={shelfStories[0]} progress="48%" label="IN PROGRESS" /></div><div className="shelf-section"><div className="section-label"><span className="mono-label">SAVED STORIES</span><Link href="/account/stories">VIEW ALL ↗</Link></div><div className="shelf-grid">{shelfStories.slice(1, 3).map((article) => <ShelfStory key={article.slug} article={article} />)}</div></div><div className="shelf-section"><div className="section-label"><span className="mono-label">LATEST ISSUE / RECOMMENDED</span><Link href="/issues/04">OPEN ISSUE ↗</Link></div><div className="shelf-grid">{shelfStories.slice(2).map((article) => <ShelfStory key={article.slug} article={article} progress="100%" label="RECENTLY READ" />)}</div></div></>}</section></div></main>; }
