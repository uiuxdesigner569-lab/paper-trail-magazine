import { Link, useLocation } from "wouter";
import { getArticle } from "../data/articles";
import CategoryCover from "../components/CategoryCover";
import { useRef } from "react";
import { usePageMotion } from "../hooks/usePageMotion";

export default function Article() {
  const [location] = useLocation();
  const slug = location.split("/").filter(Boolean).pop() ?? "culture";
  const article = getArticle(slug);
  const root = useRef<HTMLElement>(null);
  usePageMotion(root);

  if (!article) return <main className="article-page"><Link href="/">← BACK TO PAPER TRAIL</Link><h1>THE TRAIL WENT QUIET.</h1></main>;

  return <main ref={root} className={`article-page article-layout-${article.slug}`} style={{ "--article-color": article.color } as React.CSSProperties}>
    <header className="article-nav"><Link href="/" className="article-back">← PAPER TRAIL</Link><span>ISSUE 04 / {article.category}</span><span>{article.readTime}</span></header>
    <section className="article-hero"><div className="article-hero-copy page-motion-lead"><span className="mono-label">{article.category} / {article.readTime}</span><h1 className="page-motion-title">{article.title}</h1><p>{article.dek}</p><a className="outline-button article-scroll" href="#read">READ DOWN <span>↓</span></a></div><CategoryCover slug={article.slug} category={article.category} color={article.color} /></section>
    <section className="article-body" id="read"><div className="article-sidebar"><span>FIELD REPORT</span><div /><span>ISSUE 04—{article.category.slice(0, 2)}</span></div><div className="article-copy">{article.body.map((paragraph) => <p className="page-reveal" key={paragraph}>{paragraph}</p>)}<blockquote className="page-reveal">{article.pullQuote}</blockquote>{article.details.map((detail, index) => <div className="article-detail page-reveal" key={detail}><b>0{index + 1}</b><span>{detail}</span></div>)}</div></section>
    <footer className="article-footer"><Link href="/" className="pill-button">BACK TO THE ISSUE ↑</Link><Link href={`/article/${article.slug === "travel" ? "culture" : "travel"}`} className="outline-button">NEXT FIELD NOTE →</Link></footer>
  </main>;
}
