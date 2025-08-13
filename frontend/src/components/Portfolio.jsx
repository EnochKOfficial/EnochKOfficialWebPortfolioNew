import React, { useMemo, useState } from "react";
import { portfolioMock, saveMockMessage } from "../mock/mock";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { useToast } from "../hooks/use-toast";
import { Music, Book, Code2, GraduationCap, Send, ChevronRight, Hash, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "../components/ui/sheet";
import "../styles/portfolio.css";
import useScrollSpy from "../hooks/useScrollSpy";
import Particles from "./Particles";
import { getProfile, getProjects, getWriting, getEducation, postContactMessage } from "../lib/api";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "music", label: "Music" },
  { id: "writing", label: "Writing" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

function Navbar({ active, onNavClick }) {
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", `#${id}`);
      } else {
        window.location.hash = `#${id}`;
      }
    } catch (_) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const onClick = (e, id) => {
    e.preventDefault();
    if (onNavClick) onNavClick(id);
    scrollToId(id);
  };

  return (
    <div className="sticky top-4 z-40">
      <div className="mx-auto max-w-6xl px-4">
        <nav className="nav-rect bg-[#0b0b0f]/80 backdrop-blur-md border border-[#7c3aed]/40 rounded-[16px] px-2 py-1 shadow-[0_0_36px_rgba(124,58,237,0.22)]">
          <ul className="flex items-center justify-between gap-1 text-sm text-zinc-200">
            <li className="px-3 py-2 font-semibold tracking-wide text-white">Enoch K.</li>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} onClick={(e)=>onClick(e, s.id)} className={`nav-item ${active===s.id ? "active" : ""}`}>
                    {s.label}
                  </a>
                </li>
              ))}
            </div>

            {/* Mobile menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button aria-label="Open menu" className="hamburger">
                    <Menu size={18} />
                  </button>
                </SheetTrigger>
                <SheetContent side="top" className="sheet-dark">
                  <SheetHeader>
                    <SheetTitle className="text-white">Navigate</SheetTitle>
                  </SheetHeader>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {SECTIONS.map((s) => (
                      <a key={s.id} href={`#${s.id}`} onClick={(e)=>{onClick(e,s.id); const closeEl = document.querySelector('[data-state="open"]'); if(closeEl) closeEl.click();}} className={`nav-item w-full text-center ${active===s.id ? "active" : ""}`}>
                        {s.label}
                      </a>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <li className="hidden md:block">
              <a href="#contact" onClick={(e)=>onClick(e, "contact")} className="btn-ghost">
                Say Hi
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

function Hero({ profile, skills, goals }) {
  const phrases = useMemo(() => [
    "Aspiring AI/ML Engineer",
    "Young Math Explorer",
    "Keyboard & Piano Player",
    "Future Archaeologist",
  ], []);
  const [idx, setIdx] = useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % phrases.length), 2200);
    return () => clearInterval(t);
  }, [phrases.length]);

  return (
    <section className="relative min-h-[88vh] flex items-center bg-black text-zinc-200 overflow-hidden">
      <div className="abs-blur blur-1"></div>
      <div className="abs-blur blur-2"></div>
      <div className="abs-blur blur-3"></div>
      <Particles count={30} />
      <div className="particles-fade" aria-hidden="true"></div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 pb-40 md:pb-48 lg:pb-28">
        <div className="hero-wrap grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="uppercase text-xs text-zinc-400 tracking-[0.2em] mb-4">Portfolio</div>
            <h1 className="font-instrument text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-white animate-fadeIn">
              {profile?.name || "Enoch K."}
            </h1>
            <div className="mt-3 text-sm text-zinc-400 flex items-center gap-2">
              <Hash size={16}/> <span className="italic fade-cycle">{phrases[idx]}</span>
            </div>
            <p className="text-zinc-300 mt-5 max-w-xl">
              {profile?.summary || "Student at CMR National PU College — I build with HTML & CSS, learning JavaScript, Python and SQL. I compose music and explore mathematics, while dreaming of AI/ML and Archaeology."}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-zinc-400">
              {skills.web.map((s) => (
                <span key={s} className="inline-flex items-center gap-1"><Code2 size={14}/> {s}</span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a className="btn-primary" href="#projects" onClick={(e)=>{e.preventDefault();const el=document.getElementById("projects"); if(el){const y=el.getBoundingClientRect().top+window.pageYOffset-80; window.scrollTo({top:y,behavior:"smooth"});}}}>
                Explore Projects
              </a>
              <a className="btn-secondary" href="#contact" onClick={(e)=>{e.preventDefault();const el=document.getElementById("contact"); if(el){const y=el.getBoundingClientRect().top+window.pageYOffset-80; window.scrollTo({top:y,behavior:"smooth"});}}}>
                Contact Me
              </a>
            </div>
          </div>

          <div>
            <Card className="bg-[#0f0f14]/60 border-[#7c3aed]/30 shadow-[0_0_60px_rgba(124,58,237,0.2)]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <GraduationCap size={18}/> Current Focus
                </CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-300 text-sm space-y-3">
                <p>
                  I love history and discovering stories hidden in the earth. My math explorations include Interoch Number Theory and Square Familia.
                </p>
                <div className="flex flex-wrap gap-2">
                  {goals.map((g) => (
                    <Badge key={g} className="bg-[#7c3aed]/20 text-[#d1c7ff] border-[#7c3aed]/40">{g}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="hero-ribbon">Learn • Build • Compose • Explore</div>
    </section>
  );
}

function SectionHeading({ icon: Icon, title, subtitle }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 text-[#b7a6ff]">
        <Icon size={18} />
        <span className="tracking-wide text-xs uppercase">{subtitle}</span>
      </div>
      <h2 className="font-instrument text-3xl sm:text-4xl text-white mt-1">{title}</h2>
    </div>
  );
}

function ProjectsSection({ data }) {
  const items = data.projects;
  return (
    <section id="projects" className="section">
      <div className="section-decor bg-math" aria-hidden="true"></div>
      <SectionHeading icon={Code2} title="Projects &amp; Math Ideas" subtitle="Highlights" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((p) => (
          <Card key={p.id} className="bg-[#0f0f14]/60 border-[#7c3aed]/30 hover:border-[#7c3aed]/60 transition-colors">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>{p.title}</span>
                <Badge className="bg-[#7c3aed]/20 text-[#d1c7ff] border-[#7c3aed]/40">{p.category}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-300 text-sm space-y-3">
              <p>{p.blurb}</p>
              <p className="text-zinc-400">{p.details}</p>
              <div className="flex flex-wrap gap-2">
                {(p.tags || []).map((t) => (
                  <Badge key={t} className="bg-[#1a132b] text-[#d1c7ff] border-[#7c3aed]/40">{t}</Badge>
                ))}
              </div>
              <div>
                <button className="read-link">
                  Read more <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function MusicSection() {
  return (
    <section id="music" className="section">
      <div className="section-decor bg-music-notes" aria-hidden="true"></div>
      <SectionHeading icon={Music} title="Music" subtitle="Interests" />
      <Card className="bg-[#0f0f14]/60 border-[#7c3aed]/30">
        <CardContent className="pt-6 text-zinc-300">
          I play keyboard and piano and I am learning guitar. I am exploring composition and production basics to create original pieces.
        </CardContent>
      </Card>
    </section>
  );
}

function WritingSection({ data }) {
  const w = data.writing;
  return (
    <section id="writing" className="section">
      <div className="section-decor bg-writing-letters" aria-hidden="true"></div>
      <SectionHeading icon={Book} title="Writing" subtitle="Works in progress" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(w.worksInProgress || []).map((item) => (
          <Card key={item.id} className="bg-[#0f0f14]/60 border-[#7c3aed]/30">
            <CardHeader>
              <CardTitle className="text-white">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-300 text-sm space-y-2">
              <p className="text-zinc-400">{item.type} — {item.status}</p>
              <p>{item.notes}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function EducationSection({ data }) {
  const edu = data.education;
  return (
    <section id="education" className="section">
      <div className="section-decor bg-education-caps" aria-hidden="true"></div>
      <SectionHeading icon={GraduationCap} title="Education" subtitle="Current" />
      <Card className="bg-[#0f0f14]/60 border-[#7c3aed]/30">
        <CardContent className="pt-6 text-zinc-300">
          <div className="font-medium text-white">{edu.current?.institution}</div>
          <div className="text-zinc-400 text-sm">{edu.current?.standard} • {edu.current?.year}</div>
          <p className="mt-3">{edu.current?.notes}</p>
        </CardContent>
      </Card>
    </section>
  );
}

function AboutSection({ data }) {
  const { profile, skills } = data;
  return (
    <section id="about" className="section">
      <SectionHeading icon={Code2} title="About Me" subtitle="Intro" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#0f0f14]/60 border-[#7c3aed]/30">
          <CardHeader>
            <CardTitle className="text-white">{profile.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-3">
            <p>{profile.summary}</p>
            <div className="flex flex-wrap gap-2">
              {skills.web.map((s) => (
                <Badge key={s} className="bg-[#1a132b] text-[#d1c7ff] border-[#7c3aed]/40">{s}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#0f0f14]/60 border-[#7c3aed]/30">
          <CardHeader>
            <CardTitle className="text-white">Interests</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-3">
            <div className="flex flex-wrap gap-2">
              {data.skills.music.map((s) => (
                <Badge key={s} className="bg-[#1a132b] text-[#d1c7ff] border-[#7c3aed]/40">{s}</Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.interests.map((s) => (
                <Badge key={s} className="bg-[#1a132b] text-[#d1c7ff] border-[#7c3aed]/40">{s}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function ContactSection() {
  const { toast } = useToast();
  const [form, setForm] = React.useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = React.useState(false);
  const FORM_ENDPOINT = "https://formspree.io/f/xldlzqjr";

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Missing info", description: "Please fill all fields", });
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("message", form.message);
      const res = await fetch(FORM_ENDPOINT, { method: "POST", body: fd, headers: { Accept: "application/json" } });
      if (res.ok) {
        postContactMessage({ name: form.name, email: form.email, message: form.message }).catch(() => {});
        toast({ title: "Message sent", description: "Thanks! I will get back soon." });
        setForm({ name: "", email: "", message: "" });
      } else {
        const data = await res.json().catch(() => ({}));
        toast({ title: "Send failed", description: data?.error || "Please try again later." });
      }
    } catch (err) {
      saveMockMessage({ ...form });
      toast({ title: "Saved locally", description: "Network issue; stored in your browser for now." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <SectionHeading icon={Send} title="Contact" subtitle="Let's connect" />
      <Card className="bg-[#0f0f14]/60 border-[#7c3aed]/30">
        <CardContent className="pt-6">
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-200">
            <div>
              <label className="text-xs text-zinc-400">Name</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="bg-black/40 border-[#7c3aed]/30 focus-visible:ring-[#7c3aed] text-zinc-200" />
            </div>
            <div>
              <label className="text-xs text-zinc-400">Email</label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="bg-black/40 border-[#7c3aed]/30 focus-visible:ring-[#7c3aed] text-zinc-200" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-zinc-400">Message</label>
              <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Say hello 👋" className="bg-black/40 border-[#7c3aed]/30 focus-visible:ring-[#7c3aed] text-zinc-200 min-h-[120px]" />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" disabled={submitting} className="btn-primary !h-11 !px-5">
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <p className="text-xs text-zinc-500 mt-3">Note: Form submits to Formspree and stores a copy in database; if network fails, saved locally.</p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-[#7c3aed]/20 py-8 text-sm text-zinc-500">
      <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>© {new Date().getFullYear()} Enoch K. All rights reserved.</div>
        <div className="flex items-center gap-4">
          {portfolioMock.profile.socials.map((s) => (
            <a key={s.label} href={s.href} className="text-zinc-400 hover:text-white transition-colors">{s.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const { active, startManual } = useScrollSpy(SECTIONS.map((s) => s.id));

  const [data, setData] = React.useState({
    profile: portfolioMock.profile,
    skills: portfolioMock.skills,
    goals: portfolioMock.goals,
    projects: portfolioMock.projects,
    writing: portfolioMock.writing,
    education: portfolioMock.education,
  });

  React.useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const [profileRes, projectsRes, writingRes, educationRes] = await Promise.all([
          getProfile().catch(() => null),
          getProjects().catch(() => null),
          getWriting().catch(() => null),
          getEducation().catch(() => null),
        ]);
        if (cancelled) return;
        setData((prev) => ({
          ...prev,
          profile: profileRes || prev.profile,
          projects: Array.isArray(projectsRes) && projectsRes.length ? projectsRes : prev.projects,
          writing: (writingRes && Array.isArray(writingRes.worksInProgress) && writingRes.worksInProgress.length > 0) ? writingRes : prev.writing,
          education: (educationRes && educationRes.current) ? educationRes : prev.education,
        }));
      } catch {}
    };
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="bg-black text-zinc-200 font-rethink">
      <Navbar active={active} onNavClick={(id)=>startManual(id)} />
      <Hero profile={data.profile} skills={data.skills} goals={data.goals} />
      <main className="mx-auto max-w-6xl px-4">
        <AboutSection data={{ profile: data.profile, skills: data.skills }} />
        <ProjectsSection data={{ projects: data.projects }} />
        <MusicSection />
        <WritingSection data={{ writing: data.writing }} />
        <EducationSection data={{ education: data.education }} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}