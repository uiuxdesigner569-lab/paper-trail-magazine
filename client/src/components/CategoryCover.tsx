type CategoryCoverProps = { slug: string; color: string; category: string };

const categoryIllustrations: Record<string, string> = {
  culture: "/illustrations/culture-category.png",
  design: "/illustrations/find-your-next-story.png",
  people: "/illustrations/people-category-generated.png",
  music: "/illustrations/music-category.png",
  travel: "/illustrations/travel-category.png",
};

export default function CategoryCover({ slug, color, category }: CategoryCoverProps) {
  return <div className={`category-cover category-cover-${slug}`} style={{ background: color }}>
    <div className="cover-sun" /><div className="cover-orbit" /><div className="cover-sticker">FIELD<br />NOTE<br />04</div>
    <img className="cover-prop" src={categoryIllustrations[slug]} alt={`${category} category illustration`} />
    <span className="cover-category">{category}</span>
  </div>;
}
