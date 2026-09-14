export type Article = {
  slug: string;
  category: string;
  readTime: string;
  title: string;
  dek: string;
  color: string;
  body: string[];
  pullQuote: string;
  details: string[];
};

export const articles: Article[] = [
  { slug: "culture", category: "CULTURE", readTime: "08 MIN", title: "Why We Still Keep Things", dek: "A field guide to sentimental clutter, tiny rituals, and the objects that refuse to leave us alone.", color: "#f8c1ba", pullQuote: "The objects we keep are tiny maps back to ourselves.", details: ["A drawer is a museum with bad lighting.", "Rituals outlive trends.", "Keep the weird little proof."], body: ["There is a particular kind of quiet that arrives when you open a familiar drawer. The object inside is rarely useful. It may not even be beautiful. But it has stayed, through three apartments and several versions of you, because it remembers something you do not want to lose.", "Culture lives in those soft collisions between the official story and the one we keep in our pockets. We asked five collectors, keepers, and accidental archivists what makes an object impossible to throw away."] },
  { slug: "design", category: "DESIGN", readTime: "06 MIN", title: "Objects With Opinions", dek: "Meet the objects that make a room feel less finished and more alive.", color: "#b5c995", pullQuote: "Good design leaves a little room for mischief.", details: ["Edges can have a sense of humor.", "Usefulness is not the whole story.", "Leave one thing slightly unfinished."], body: ["Some objects behave like furniture. Others enter a room with a point of view. They lean, interrupt, wobble, or insist on being noticed from the wrong side.", "This is a dispatch from the designers who make things with a pulse: lamps that look like they are listening, chairs that refuse to sit still, and tools that make a daily ritual feel like a small ceremony."] },
  { slug: "people", category: "PEOPLE", readTime: "11 MIN", title: "The People Making New Things", dek: "Meet the makers bending the future into something you can hold.", color: "#f9cc73", pullQuote: "The future is often made by hand before it is made official.", details: ["Start with a stubborn question.", "Prototype in public.", "Make room for the unexpected."], body: ["The future rarely arrives with a trumpet. More often, it shows up as a prototype on a workbench, a half-tested idea on a receipt, or a conversation that refuses to end.", "We spent a week with five makers building new rituals out of old materials. Their studios were messy, generous, and full of evidence that progress is a tactile thing."] },
  { slug: "music", category: "MUSIC", readTime: "07 MIN", title: "Noise With a Pulse", dek: "A field recording of the songs, rooms, and accidents that make a city feel awake.", color: "#ac4f98", pullQuote: "Every good song leaves the room a little different.", details: ["Listen for the room tone.", "A chorus can be a place.", "Accidents make the best hooks."], body: ["Before a song becomes a song, it is usually a sound in a room: a chair dragged across the floor, a bus braking outside, someone laughing one beat too early.", "The artists in this issue are less interested in perfection than in evidence. Their tracks carry fingerprints, street noise, and the rough edges of a life being lived beside the microphone."] },
  { slug: "travel", category: "TRAVEL", readTime: "09 MIN", title: "Out of Office, In Mind", dek: "A small atlas of detours for people who want to get lost with intention.", color: "#c94245", pullQuote: "The long way is not a delay. It is the point.", details: ["Leave one turn undecided.", "Ask the quiet question.", "Bring back a new shape of time."], body: ["The best journeys begin before the map has agreed to help. They start with a missed train, a bakery noticed too late, or a road that looked like a line and turned out to be a whole afternoon.", "This is a guide to going somewhere without turning the place into a checklist. Five travelers share the habits that make room for surprise."] },
];

export const getArticle = (slug: string) => articles.find((article) => article.slug === slug);
