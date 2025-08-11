export const portfolioMock = {
  profile: {
    name: "Enoch K.",
    tagline: "Student • Budding Web Dev • Musician • Young Researcher",
    location: "Bengaluru, Karnataka, India",
    summary:
      "I tinker with HTML & CSS and I'm learning JavaScript. I compose music, play keyboard and piano (and learning guitar). I explore math ideas and love history — aiming for B.Tech (AI/ML) and later BA in Archaeology.",
    socials: [
      { label: "Email", href: "mailto:enoch@example.com" },
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
  skills: {
    web: ["HTML", "CSS", "JavaScript (learning)"];
    music: ["Keyboard", "Piano", "Guitar (learning)", "Composition (learning)"];
    interests: ["AI/ML", "Archaeology", "Story Writing", "Math Puzzles"],
  },
  education: {
    current: {
      institution: "CMR National PU College",
      standard: "PUC 2 (12th)",
      stream: "—",
      year: "2025",
      notes:
        "Actively participating in self-driven research in mathematics and creative writing.",
    },
  },
  goals: [
    "Pursue B.Tech in AI/ML",
    "Continue with BA in Archaeology",
    "Publish my book ‘Tevel’",
    "Develop math ideas like Interoch Theory & Square Familia",
  ],
  projects: [
    {
      id: "interoch",
      title: "Interoch Number Theory",
      category: "Mathematics",
      blurb:
        "Digit operations to group numbers into sets where the operation result matches — e.g., Addinteroch: 12 → 1+2=3 and 30 → 3+0=3.",
      details:
        "I explore how different digit operations (sum, product, alternating ops) create equivalence classes with interesting properties.",
      tags: ["Math", "Number Theory", "Exploration"],
    },
    {
      id: "nat-logs-approx",
      title: "Natural Logs: 4-digit Approximation Flow",
      category: "Mathematics",
      blurb:
        "Using a calculator-friendly formula and steps to get ~4-digit precision for ln(x).",
      details:
        "An algorithmic approach balancing speed & accuracy with iterative refinement and constant pre-sets.",
      tags: ["Math", "Algorithms"],
    },
    {
      id: "square-familia",
      title: "Square Familia",
      category: "Mathematics",
      blurb:
        "Relating numbers and their squares via structured operations, e.g., 2+2=4 and 2^2+2^2=4^2.",
      details:
        "Search for families of identities with square relations and constraints.",
      tags: ["Math", "Patterns"],
    },
  ],
  writing: {
    worksInProgress: [
      {
        id: "tevel",
        title: "Tevel",
        type: "Book (in development)",
        status: "Outlining characters, plot arcs, and world rules",
        notes:
          "Early concept drafts exploring themes of discovery and time — aiming for a YA-friendly style.",
      },
    ],
  },
  contact: {
    intro:
      "This is a mock contact form — your message will be saved locally in your browser for now.",
  },
};

export const saveMockMessage = (payload) => {
  const key = "contact_messages";
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  existing.push({ ...payload, id: Date.now() });
  localStorage.setItem(key, JSON.stringify(existing));
  return true;
};