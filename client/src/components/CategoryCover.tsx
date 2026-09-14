import { PaperPal } from "../pages/Home";

type CategoryCoverProps = { slug: string; color: string; category: string };

export default function CategoryCover({ slug, color, category }: CategoryCoverProps) {
  return <div className={`category-cover category-cover-${slug}`} style={{ background: color }}>
    <div className="cover-sun" /><div className="cover-orbit" /><div className="cover-sticker">FIELD<br />NOTE<br />04</div>
    <div className="cover-pip"><PaperPal accent="#f4ed36" /></div>
    <svg className="cover-prop" viewBox="0 0 240 180" aria-hidden="true">
      {slug === "culture" && <><path d="M34 141 Q42 54 111 44 Q176 36 202 91 Q180 154 34 141Z" fill="#f9f5f2" stroke="#1a1a1a" strokeWidth="8" /><path d="M58 104 Q109 76 173 100" fill="none" stroke="#1a1a1a" strokeWidth="7" /><circle cx="72" cy="80" r="10" fill="#f4ed36" stroke="#1a1a1a" strokeWidth="5" /></>}
      {slug === "design" && <><path d="M42 122 L79 55 L146 80 L194 42 L216 123Z" fill="#f9f5f2" stroke="#1a1a1a" strokeWidth="8" strokeLinejoin="round" /><path d="M78 55 L98 121 M147 80 L147 121 M194 42 L176 121" stroke="#1a1a1a" strokeWidth="6" /></>}
      {slug === "people" && <><circle cx="92" cy="91" r="48" fill="#f9f5f2" stroke="#1a1a1a" strokeWidth="8" /><circle cx="153" cy="91" r="48" fill="#f9f5f2" stroke="#1a1a1a" strokeWidth="8" /><path d="M71 97 Q91 72 112 97 M132 97 Q153 72 174 97" fill="none" stroke="#1a1a1a" strokeWidth="7" strokeLinecap="round" /><path d="M96 139 Q122 157 149 139" fill="none" stroke="#1a1a1a" strokeWidth="8" strokeLinecap="round" /></>}
      {slug === "music" && <><path d="M64 51 L160 34 L160 112" fill="none" stroke="#1a1a1a" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" /><circle cx="57" cy="129" r="24" fill="#f9f5f2" stroke="#1a1a1a" strokeWidth="8" /><circle cx="157" cy="122" r="24" fill="#f9f5f2" stroke="#1a1a1a" strokeWidth="8" /><path d="M87 83 Q112 57 139 82" fill="none" stroke="#1a1a1a" strokeWidth="7" /></>}
      {slug === "travel" && <><path d="M33 115 L102 72 L134 23 L154 28 L143 80 L211 97 L218 116 L138 110 L105 154 L86 149 L101 111Z" fill="#f9f5f2" stroke="#1a1a1a" strokeWidth="8" strokeLinejoin="round" /><circle cx="55" cy="131" r="12" fill="#f4ed36" stroke="#1a1a1a" strokeWidth="5" /></>}
    </svg>
    <span className="cover-category">{category}</span>
  </div>;
}
