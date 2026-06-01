// Chapter data — all 15 chapters, 3 arcs
// Each chapter has placeholder panels rendered as styled CSS frames

export type Panel = {
  type: "title" | "scene" | "dialogue" | "silence" | "transition";
  text?: string;
  speaker?: string;
  caption?: string;
  bg?: "dark" | "light" | "void" | "glow";
};

export type Chapter = {
  number: string;       // roman numeral
  slug: string;         // url-friendly: "i", "ii", ...
  index: number;        // 1-based
  arc: 1 | 2 | 3;
  arcTitle: string;
  title: string;
  tagline: string;
  pages: Panel[];
};

const ARC_TITLES = {
  1: "THE GRAVEYARD BOY",
  2: "THE RESONANCE WAR",
  3: "THE NAME ON THE WALL",
} as const;

export const chapters: Chapter[] = [
  {
    number: "I", slug: "i", index: 1, arc: 1, arcTitle: ARC_TITLES[1],
    title: "THE BOY WITH NO GLOW",
    tagline: "Every soul burns bright in Soulmarch. His burned out before it started.",
    pages: [
      { type: "title", text: "I — THE BOY WITH NO GLOW", bg: "void" },
      { type: "scene", caption: "Soulmarch. Before dawn. The resonance towers hum their daily census.", bg: "dark" },
      { type: "scene", caption: "Every citizen glows. The towers read them as they pass — tier, district, record.", bg: "glow" },
      { type: "dialogue", speaker: "ENFORCER", text: "Step forward. Let the tower read you.", bg: "dark" },
      { type: "silence", caption: "The tower does not read Kairu. The tower does not see him at all.", bg: "void" },
      { type: "dialogue", speaker: "ENFORCER", text: "...Next.", bg: "dark" },
      { type: "scene", caption: "He walks through. No alarm. No record. As if he were already gone.", bg: "dark" },
      { type: "transition", text: "VOID", bg: "void" },
    ],
  },
  {
    number: "II", slug: "ii", index: 2, arc: 1, arcTitle: ARC_TITLES[1],
    title: "THE GRAVEYARD",
    tagline: "The outer-district graveyard is where Soulmarch buries the things it wants to forget.",
    pages: [
      { type: "title", text: "II — THE GRAVEYARD", bg: "void" },
      { type: "scene", caption: "The outer-district cemetery. Unmarked stones. Names scratched out.", bg: "dark" },
      { type: "scene", caption: "Kairu scavenges the edges. The city doesn't come here. Which means it's safe.", bg: "dark" },
      { type: "dialogue", speaker: "MIRA", text: "Well. That's extremely weird.", bg: "dark" },
      { type: "silence", caption: "A girl. Semi-transparent. Her edges blur where the dark gets thick.", bg: "void" },
      { type: "dialogue", speaker: "KAIRU", text: "You're a ghost.", bg: "dark" },
      { type: "dialogue", speaker: "MIRA", text: "You can see me. That's also extremely weird.", bg: "dark" },
      { type: "scene", caption: "She flickers. Something inside him flickers back. A resonance — half a soul meeting its other half.", bg: "glow" },
    ],
  },
  {
    number: "III", slug: "iii", index: 3, arc: 1, arcTitle: ARC_TITLES[1],
    title: "HALF A SOUL",
    tagline: "A soul split in two. One half living. One half haunting.",
    pages: [
      { type: "title", text: "III — HALF A SOUL", bg: "void" },
      { type: "dialogue", speaker: "MIRA", text: "You carry part of me. I don't know how. I've been looking for it for two years.", bg: "dark" },
      { type: "silence", caption: "Kairu opens his hand. A dim amber flicker. Barely visible. Hers.", bg: "glow" },
      { type: "dialogue", speaker: "KAIRU", text: "How do you split a soul?", bg: "dark" },
      { type: "dialogue", speaker: "MIRA", text: "Someone does it to you. Someone who knows the resonance well enough to cut.", bg: "dark" },
      { type: "scene", caption: "An Enforcer patrol sweeps the outer district. Soul-scanners active.", bg: "dark" },
      { type: "dialogue", speaker: "MIRA", text: "Run.", bg: "dark" },
      { type: "transition", text: "THE HUNT BEGINS", bg: "void" },
    ],
  },
  {
    number: "IV", slug: "iv", index: 4, arc: 1, arcTitle: ARC_TITLES[1],
    title: "THE UNDERTOW",
    tagline: "Underground, the forgotten ones keep count of their own.",
    pages: [
      { type: "title", text: "IV — THE UNDERTOW", bg: "void" },
      { type: "scene", caption: "Beneath the outer district. A tunnel system. Torches instead of resonance-light.", bg: "dark" },
      { type: "dialogue", speaker: "HESSA", text: "Suspicious. But good suspicious.", bg: "dark" },
      { type: "scene", caption: "Grey-haired. Missing two fingers. No soul-glow at all. She looks at them like math.", bg: "dark" },
      { type: "dialogue", speaker: "HESSA", text: "The boy is Void. The girl is dead and not dead. And yet here you both are.", bg: "dark" },
      { type: "dialogue", speaker: "KAIRU", text: "We need somewhere to stay.", bg: "dark" },
      { type: "dialogue", speaker: "HESSA", text: "Everyone in the Undertow needed somewhere to stay. That's why we built it.", bg: "glow" },
      { type: "scene", caption: "The resistance. Thirty people. All Void. All erased. All still here.", bg: "dark" },
    ],
  },
  {
    number: "V", slug: "v", index: 5, arc: 1, arcTitle: ARC_TITLES[1],
    title: "THE WALL",
    tagline: "The names of the erased are carved where the city cannot reach them.",
    pages: [
      { type: "title", text: "V — THE WALL", bg: "void" },
      { type: "scene", caption: "Deep in the tunnels. A chamber no one warned them about.", bg: "dark" },
      { type: "scene", caption: "One wall, floor to ceiling, covered in names. Thousands of them. Carved by hand.", bg: "glow" },
      { type: "dialogue", speaker: "HESSA", text: "Everyone the city erased. We record them here.", bg: "dark" },
      { type: "silence", caption: "Kairu finds his name. Third row from the bottom. Carved two years ago.", bg: "void" },
      { type: "dialogue", speaker: "MIRA", text: "Kairu—", bg: "dark" },
      { type: "silence", caption: "His name. Already on the wall. Already erased. Already mourned.", bg: "void" },
      { type: "transition", text: "END OF ARC I", bg: "void" },
    ],
  },
  {
    number: "VI", slug: "vi", index: 6, arc: 2, arcTitle: ARC_TITLES[2],
    title: "THE ENFORCER'S DOUBT",
    tagline: "She has the brightest soul in Soulmarch. She is starting to hate it.",
    pages: [
      { type: "title", text: "VI — THE ENFORCER'S DOUBT", bg: "void" },
      { type: "scene", caption: "Enforcer Seraph. Soul-construct active: wings of pure light. The towers read her first.", bg: "glow" },
      { type: "scene", caption: "A sweep of the outer district. Standard procedure. Void hunt.", bg: "dark" },
      { type: "dialogue", speaker: "SERAPH", text: "If they have no record — they're not dangerous. They're just unread.", bg: "dark" },
      { type: "dialogue", speaker: "COMMANDER", text: "Unread is the same as erased. You know this.", bg: "dark" },
      { type: "silence", caption: "She finds a child's shoe. Tiny. Outer district. The Void sweep was here recently.", bg: "void" },
      { type: "dialogue", speaker: "SERAPH", text: "Who ordered the sweep?", bg: "dark" },
      { type: "scene", caption: "No answer. The silence of the command structure when it knows you're asking the wrong question.", bg: "dark" },
    ],
  },
  {
    number: "VII", slug: "vii", index: 7, arc: 2, arcTitle: ARC_TITLES[2],
    title: "VAEL STEPS FORWARD",
    tagline: "The Arch-Resonant has never needed to show himself. Until now.",
    pages: [
      { type: "title", text: "VII — VAEL STEPS FORWARD", bg: "void" },
      { type: "scene", caption: "City center. The great tower. An announcement no one expected.", bg: "glow" },
      { type: "scene", caption: "Ancient robes. A mask covering half his face. Soul-glow blazes like a small sun.", bg: "glow" },
      { type: "dialogue", speaker: "VAEL", text: "The Void designation was designed as mercy. A separation. Not a sentence.", bg: "dark" },
      { type: "dialogue", speaker: "VAEL", text: "The city has misused my design. That ends now.", bg: "dark" },
      { type: "silence", caption: "He is lying. Or he believes it. Which is worse.", bg: "void" },
      { type: "dialogue", speaker: "HESSA", text: "He built the system. He doesn't get to disown it now.", bg: "dark" },
      { type: "transition", text: "THE ARCHITECT MOVES", bg: "void" },
    ],
  },
  {
    number: "VIII", slug: "viii", index: 8, arc: 2, arcTitle: ARC_TITLES[2],
    title: "WINGS OF CONSCIENCE",
    tagline: "The brightest soul in the Enforcers walks away from the light.",
    pages: [
      { type: "title", text: "VIII — WINGS OF CONSCIENCE", bg: "void" },
      { type: "scene", caption: "Enforcer headquarters. Seraph's commendation ceremony. Her record: immaculate.", bg: "glow" },
      { type: "dialogue", speaker: "COMMANDER", text: "Enforcer Seraph — for exceptional service in the resonance purges—", bg: "dark" },
      { type: "dialogue", speaker: "SERAPH", text: "I'm not a weapon. I'm the graveyard.", bg: "void" },
      { type: "silence", caption: "The room goes still. Even her soul-glow flickers, uncertain.", bg: "glow" },
      { type: "dialogue", speaker: "SERAPH", text: "I'm done.", bg: "dark" },
      { type: "scene", caption: "She walks out through thirty armed Enforcers. They do not stop her. Not yet.", bg: "dark" },
      { type: "transition", text: "THE WAR HAS A NEW SIDE", bg: "void" },
    ],
  },
  {
    number: "IX", slug: "ix", index: 9, arc: 2, arcTitle: ARC_TITLES[2],
    title: "THE SURFACE WAR",
    tagline: "The Undertow was built to survive underground. Now it has to fight above it.",
    pages: [
      { type: "title", text: "IX — THE SURFACE WAR", bg: "void" },
      { type: "scene", caption: "The outer district ignites. Resonance-jammers deployed. The towers go dark.", bg: "dark" },
      { type: "dialogue", speaker: "HESSA", text: "This is what thirty-seven years of patience looks like. Do not waste it.", bg: "dark" },
      { type: "scene", caption: "Kairu runs without a plan. Mira keeps pace, more solid than she's ever been.", bg: "glow" },
      { type: "dialogue", speaker: "MIRA", text: "I can touch things. I've never been able to touch things.", bg: "glow" },
      { type: "silence", caption: "The soul-split is healing. Slowly. The closer they are, the more she solidifies.", bg: "glow" },
      { type: "dialogue", speaker: "KAIRU", text: "Then stay close.", bg: "dark" },
      { type: "scene", caption: "Above: Enforcer wings blot out the sky. Below: the Undertow rises.", bg: "dark" },
    ],
  },
  {
    number: "X", slug: "x", index: 10, arc: 2, arcTitle: ARC_TITLES[2],
    title: "SOLA'S SECRET",
    tagline: "The seven vials. What she rescued. What she made.",
    pages: [
      { type: "title", text: "X — SOLA'S SECRET", bg: "void" },
      { type: "scene", caption: "Sola. Travelling cloak. The seven vials glow faintly at her throat.", bg: "glow" },
      { type: "dialogue", speaker: "KAIRU", text: "You made me Void. You cut my soul-glow before I was born.", bg: "dark" },
      { type: "dialogue", speaker: "SOLA", text: "I'm not running. There's a difference between running and surviving long enough to fix it.", bg: "dark" },
      { type: "scene", caption: "Project Nullpoint. A classified program. Vael's early work: testing what happened when a soul was pre-designated Void.", bg: "void" },
      { type: "dialogue", speaker: "SOLA", text: "You weren't the first. You were the only one they didn't catch.", bg: "dark" },
      { type: "dialogue", speaker: "KAIRU", text: "Because you took me.", bg: "dark" },
      { type: "dialogue", speaker: "SOLA", text: "Because I took you.", bg: "glow" },
    ],
  },
  {
    number: "XI", slug: "xi", index: 11, arc: 2, arcTitle: ARC_TITLES[2],
    title: "THE FRACTURE",
    tagline: "The caste system cracks. Not from the top. From underneath.",
    pages: [
      { type: "title", text: "XI — THE FRACTURE", bg: "void" },
      { type: "scene", caption: "The resonance towers fail across the outer district. No readings. No records.", bg: "dark" },
      { type: "dialogue", speaker: "VAEL", text: "They called you the Void King.", bg: "void" },
      { type: "dialogue", speaker: "KAIRU", text: "I didn't ask for that.", bg: "dark" },
      { type: "dialogue", speaker: "VAEL", text: "No one asks for what they become.", bg: "dark" },
      { type: "silence", caption: "The Arch-Resonant and the boy with no glow. Standing in the dark. The same.", bg: "void" },
      { type: "scene", caption: "Behind Kairu: the Undertow. Thirty people who survived erasure. Waiting.", bg: "dark" },
      { type: "transition", text: "END OF ARC II", bg: "void" },
    ],
  },
  {
    number: "XII", slug: "xii", index: 12, arc: 3, arcTitle: ARC_TITLES[3],
    title: "THE KING IS CROWNED",
    tagline: "He never asked for a title. The city gave him one anyway.",
    pages: [
      { type: "title", text: "XII — THE KING IS CROWNED", bg: "void" },
      { type: "scene", caption: "The outer district. A week after the towers failed. People are relearning how to exist without readings.", bg: "dark" },
      { type: "scene", caption: "They call him the Void King. He hears it in doorways, in whispers, in Fen's careful pronunciation of the words.", bg: "glow" },
      { type: "dialogue", speaker: "FEN", text: "Nobody's going to control you.", bg: "dark" },
      { type: "silence", caption: "Age 5. She learned that from somewhere. Not from anywhere good.", bg: "void" },
      { type: "dialogue", speaker: "KAIRU", text: "Where did you hear that?", bg: "dark" },
      { type: "dialogue", speaker: "FEN", text: "The wall. Someone carved it.", bg: "glow" },
      { type: "transition", text: "THE FINAL ARC BEGINS", bg: "void" },
    ],
  },
  {
    number: "XIII", slug: "xiii", index: 13, arc: 3, arcTitle: ARC_TITLES[3],
    title: "ALL THE NAMES",
    tagline: "The wall holds more names than anyone knew. Including ones still living.",
    pages: [
      { type: "title", text: "XIII — ALL THE NAMES", bg: "void" },
      { type: "scene", caption: "The chamber. The wall. Kairu returns with a lantern and takes his time.", bg: "dark" },
      { type: "scene", caption: "He reads every name. Hundreds. Some with dates. Some with ages.", bg: "void" },
      { type: "dialogue", speaker: "KAIRU", text: "Some of these people are still alive. Hessa. You're on the wall.", bg: "dark" },
      { type: "dialogue", speaker: "HESSA", text: "I know. I carved it myself. Thirty years ago, so I'd remember I was real.", bg: "glow" },
      { type: "silence", caption: "The wall is not a grave. It's proof of survival.", bg: "void" },
      { type: "scene", caption: "Seraph traces a name she doesn't recognize. Then another. Then she sits on the floor and doesn't move for a long time.", bg: "dark" },
      { type: "transition", text: "THE RECKONING APPROACHES", bg: "void" },
    ],
  },
  {
    number: "XIV", slug: "xiv", index: 14, arc: 3, arcTitle: ARC_TITLES[3],
    title: "VAEL'S ANSWER",
    tagline: "The man who built the system explains himself. It is not enough.",
    pages: [
      { type: "title", text: "XIV — VAEL'S ANSWER", bg: "void" },
      { type: "scene", caption: "The great tower. Empty. Vael waits alone. He knew they would come.", bg: "glow" },
      { type: "dialogue", speaker: "VAEL", text: "I built it so we could all be seen. So no one would be invisible. The soul-tiers were meant to be guides — not cages.", bg: "dark" },
      { type: "dialogue", speaker: "KAIRU", text: "There are four thousand names on that wall.", bg: "void" },
      { type: "silence", caption: "Vael's soul-glow dims. Not by much. But enough.", bg: "glow" },
      { type: "dialogue", speaker: "VAEL", text: "I know.", bg: "dark" },
      { type: "dialogue", speaker: "HESSA", text: "Then you know your answer isn't enough.", bg: "dark" },
      { type: "scene", caption: "He doesn't argue. That, more than anything, is terrifying.", bg: "void" },
    ],
  },
  {
    number: "XV", slug: "xv", index: 15, arc: 3, arcTitle: ARC_TITLES[3],
    title: "SOME NAMES ARE CARVED DEEP",
    tagline: "Some names are carved so deep they outlast the stone.",
    pages: [
      { type: "title", text: "XV — SOME NAMES ARE CARVED DEEP", bg: "void" },
      { type: "scene", caption: "The towers come down. Not with violence. With a vote. The Undertow counts hands in the dark.", bg: "dark" },
      { type: "scene", caption: "Mira is solid. Fully solid. Standing in daylight for the first time in two years.", bg: "glow" },
      { type: "dialogue", speaker: "MIRA", text: "Is it over?", bg: "glow" },
      { type: "dialogue", speaker: "KAIRU", text: "The system is. The city isn't. We still have to figure out what it becomes.", bg: "dark" },
      { type: "scene", caption: "Kairu returns to the wall. He adds one name. Not his own. Not from the dead.", bg: "void" },
      { type: "dialogue", speaker: "KAIRU", text: "VAEL. So no one forgets who built it. And who had to unmake it.", bg: "void" },
      { type: "transition", text: "ECHO OF THE VOID KING — FIN", bg: "void" },
    ],
  },
];

export const arcColors: Record<1 | 2 | 3, string> = {
  1: "#8a7235",
  2: "#C9A84C",
  3: "#d4823a",
};

export function getChapterBySlug(slug: string): Chapter | undefined {
  return chapters.find((c) => c.slug === slug);
}
