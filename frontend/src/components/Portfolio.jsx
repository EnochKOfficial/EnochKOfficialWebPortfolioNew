import React, { useMemo, useState } from "react";
import { portfolioMock, saveMockMessage } from "../mock/mock";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { useToast } from "../hooks/use-toast";
import { Music, Book, Code2, GraduationCap, Send, ChevronRight, Hash } from "lucide-react";
import "../styles/portfolio.css";
import useScrollSpy from "../hooks/useScrollSpy";
import Particles from "./Particles";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "music", label: "Music" },
  { id: "writing", label: "Writing" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

function Navbar({ active }) {
  const onClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="sticky top-4 z-40">
      <div className="mx-auto max-w-6xl px-4">
        <nav className="nav-pill bg-[#0b0b0f]/80 backdrop-blur-md border border-[#7c3aed]/40 rounded-[22px] px-2 py-1 shadow-[0_0_40px_rgba(124,58,237,0.25)]">
          <ul className="flex items-center justify-between gap-1 text-sm text-zinc-200">
            <li className="px-3 py-2 font-semibold tracking-wide text-white">Enoch K.</li>
            <div className="flex items-center gap-1 overflow-x-auto">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} onClick={(e)=>onClick(e, s.id)} className={`nav-item ${active===s.id ? "active" : ""}`}>
                    {s.label}
                  </a>
                </li>
              ))}
            </div>
            <li>
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

function Hero() {
  const phrases = useMemo(
    () => [
      "Aspiring AI/ML Engineer",
      "Young Math Explorer",
      "Keyboard & Piano Player",
      "Future Archaeologist",
    ],
    []
  );
  const [idx, setIdx] = useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % phrases.length), 2200);
    return () => clearInterval(t);
  }, [phrases.length]);

  return (
    <section className="relative min-h-[88vh] flex items-center bg-black text-zinc-200 overflow-hidden">
      {/* Decorative blurred blobs */}
      <div className="abs-blur blur-1"></div>
      <div className="abs-blur blur-2"></div>
      <div className="abs-blur blur-3"></div>
      <Particles />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="uppercase text-xs text-zinc-400 tracking-[0.2em] mb-4">Portfolio</div>
            <h1 className="font-instrument text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-white animate-fadeIn">
              Enoch K.
            </h1>
            <p className="text-zinc-300 mt-5 max-w-xl">
              Student at CMR National PU College — I build with HTML &amp; CSS, learning JavaScript. I compose music and explore mathematics, while dreaming of AI/ML and Archaeology.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a className="btn-primary" href="#projects" onClick={(e)=>{e.preventDefault();document.getElementById("projects")?.scrollIntoView({behavior:"smooth"});}}>
                Explore Projects
              </a>
              <a className="btn-secondary" href="#contact" onClick={(e)=>{e.preventDefault();document.getElementById("contact")?.scrollIntoView({behavior:"smooth"});}}>
                Contact Me
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-zinc-400">
              <span className="inline-flex items-center gap-1"><Code2 size={14}/> HTML</span>
              <span className="inline-flex items-center gap-1"><Code2 size={14}/> CSS</span>
              <span className="inline-flex items-center gap-1"><Code2 size={14}/> JavaScript (learning)</span>
              <span className="inline-flex items-center gap-1"><Music size={14}/> Piano &amp; Keyboard</span>
              <span className="inline-flex items-center gap-1"><Book size={14}/> Writing ‘Tevel’</span>
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
                  {portfolioMock.goals.map((g) => (
                    <Badge key={g} className="bg-[#7c3aed]/20 text-[#d1c7ff] border-[#7c3aed]/40">{g}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-14 flex items-center gap-2 text-zinc-400 text-sm">
          <Hash size={16}/> <span className="italic fade-cycle">{phrases[idx]}</span>
        </div>
      </div>

      {/* Subtle ribbon */}
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

function ProjectsSection() {
  const { projects } = portfolioMock;
  return (
    <section id="projects" className="section">
      <SectionHeading icon={Code2} title="Projects &amp; Math Ideas" subtitle="Highlights" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
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
                {p.tags.map((t) => (
                  <Badge key={t} className="bg-[#1a132b] text-[#d1c7ff] border-[#7c3aed]/40">{t}</Badge>
                ))}
              </div>
              <div>
                <Button variant="ghost" className="text-[#cbb6ff] hover:text-white px-0">
                  Read more <ChevronRight size={16} className="ml-1" />
                </Button>
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
      <SectionHeading icon={Music} title="Music" subtitle="Interests" />
      <Card className="bg-[#0f0f14]/60 border-[#7c3aed]/30">
        <CardContent className="pt-6 text-zinc-300">
          I play keyboard and piano and I am learning guitar. I am exploring composition and production basics to create original pieces.
        </CardContent>
      </Card>
    </section>
  );
}

function WritingSection() {
  const { writing } = portfolioMock;
  return (
    <section id="writing" className="section">
      <SectionHeading icon={Book} title="Writing" subtitle="Works in progress" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {writing.worksInProgress.map((w) => (
          <Card key={w.id} className="bg-[#0f0f14]/60 border-[#7c3aed]/30">
            <CardHeader>
              <CardTitle className="text-white">{w.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-300 text-sm space-y-2">
              <p className="text-zinc-400">{w.type} — {w.status}</p>
              <p>{w.notes}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function EducationSection() {
  const { education } = portfolioMock;
  return (
    <section id="education" className="section">
      <SectionHeading icon={GraduationCap} title="Education" subtitle="Current" />
      <Card className="bg-[#0f0f14]/60 border-[#7c3aed]/30">
        <CardContent className="pt-6 text-zinc-300">
          <div className="font-medium text-white">{education.current.institution}</div>
          <div className="text-zinc-400 text-sm">{education.current.standard} • {education.current.year}</div>
          <p className="mt-3">{education.current.notes}</p>
        </CardContent>
      </Card>
    </section>
  );
}

function AboutSection() {
  const { profile, skills } = portfolioMock;
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
              {skills.music.map((s) => (
                <Badge key={s} className="bg-[#1a132b] text-[#d1c7ff] border-[#7c3aed]/40">{s}</Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.interests.map((s) => (
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
  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Missing info", description: "Please fill all fields", });
      return;
    }
    saveMockMessage({ ...form });
    toast({ title: "Saved (mock)", description: "Stored in your browser for now." });
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <section id="contact" className="section">
      <SectionHeading icon={Send} title="Contact" subtitle="Let\'s connect" />
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
              <Button type="submit" className="btn-primary !h-11 !px-5">
                Send Message
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <p className="text-xs text-zinc-500 mt-3">Note: This is mocked for now and saves to your local browser storage.</p>
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
  const active = useScrollSpy(SECTIONS.map((s) => s.id));
  return (
    <div className="bg-black text-zinc-200 font-rethink">
      <Navbar active={active} />
      <Hero />
      <main className="mx-auto max-w-6xl px-4">
        <AboutSection />
        <ProjectsSection />
        <MusicSection />
        <WritingSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}