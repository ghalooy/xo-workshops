import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ArrowRight, BarChart3, BookOpen, CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Code2, ExternalLink, GraduationCap, Layout, Linkedin, Lock, Mail, MapPin, Menu, Play, Search, ShieldCheck, Star, User, Users, X, Zap } from "lucide-react";
import logo from "../imports/logo.png";

type Page = "home" | "about" | "workshops" | "details" | "my" | "instructors" | "profile" | "login" | "register" | "verify" | "forgot" | "reset" | "admin";

const instructors = [
  { name: "Ghala Adel", role: "Senior Product Designer", initials: "GA", bio: "Leads UX research, wireframing, Figma systems, and portfolio critique for early-career designers.", linkedin: "linkedin.com/in/ghala-adel" },
  { name: "Omar Nabil", role: "Frontend Engineer", initials: "ON", bio: "Builds React interfaces, design systems, and production deployment workflows for software teams.", linkedin: "linkedin.com/in/omar-nabil" },
  { name: "Mariam Tarek", role: "Product Strategist", initials: "MT", bio: "Coaches students on product thinking, scoping, stakeholder communication, and case-study storytelling.", linkedin: "linkedin.com/in/mariam-tarek" },
];

const workshops = [
  { id: 0, title: "Specialization in UI/UX Design", tag: "Design", instructor: "Ghala Adel", rating: 4.5, enrolled: 245, duration: "5 weeks", date: "Jul 18", price: "WhatsApp enrollment", progress: 70, enrolledUser: true, icon: Layout, description: "Learn design principles, wireframes, Figma basics and prototyping, all in one course.", outcomes: ["Research users and define problem statements", "Create wireframes and polished Figma prototypes", "Present a portfolio-ready UX case study"], lessons: ["Course introduction", "Design principles", "User flows and IA", "Wireframing workshop", "Figma components", "Interactive prototype", "Portfolio presentation"] },
  { id: 1, title: "Frontend Foundations with React", tag: "Code", instructor: "Omar Nabil", rating: 4.8, enrolled: 168, duration: "6 weeks", date: "Aug 02", price: "WhatsApp enrollment", progress: 35, enrolledUser: true, icon: Code2, description: "Build component-driven interfaces with React, Tailwind, state, forms, and deployment workflows.", outcomes: ["Build reusable React components", "Handle forms, state, and responsive layouts", "Deploy a polished first software project"], lessons: ["React mental model", "Components and props", "State and events", "Tailwind layouts", "Forms and validation", "API-ready structures", "Deployment review"] },
  { id: 2, title: "Product Thinking for Junior Builders", tag: "Career", instructor: "Mariam Tarek", rating: 4.6, enrolled: 92, duration: "3 weeks", date: "Aug 16", price: "WhatsApp enrollment", progress: 0, enrolledUser: false, icon: BookOpen, description: "Turn briefs into scoped features, write cases, present tradeoffs, and ship a portfolio-ready project.", outcomes: ["Scope MVP features", "Write clear product decisions", "Present tradeoffs with confidence"], lessons: ["From brief to problem", "MVP scoping", "User stories", "Prioritization", "Case study deck"] },
  { id: 3, title: "Backend APIs for Beginners", tag: "Backend", instructor: "Omar Nabil", rating: 4.4, enrolled: 118, duration: "4 weeks", date: "Sep 04", price: "WhatsApp enrollment", progress: 0, enrolledUser: false, icon: ShieldCheck, description: "Understand authentication, databases, API routes, and secure server-side foundations.", outcomes: ["Model data and routes", "Understand auth basics", "Document API behavior"], lessons: ["HTTP basics", "Data modeling", "API routes", "Authentication", "Testing flows"] },
];

function Logo({ invert, size = "h-10" }: { invert?: boolean; size?: string }) { return <img src={logo} alt="XO Workshops" className={`${size} w-auto self-start object-contain${invert ? " brightness-0 invert" : ""}`} />; }

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [menu, setMenu] = useState(false);
  const [featured, setFeatured] = useState(0);
  const [selected, setSelected] = useState(0);
  const goDetails = (id: number) => { setSelected(id); setPage("details"); };
  const nav = ["home", "workshops", "about", "instructors", "my"] as Page[];
  const content = useMemo(() => {
    if (page === "about") return <About setPage={setPage} />;
    if (page === "workshops") return <Workshops goDetails={goDetails} setPage={setPage} />;
    if (page === "details") return <WorkshopDetails workshop={workshops[selected]} setPage={setPage} />;
    if (page === "my") return <MyWorkshops goDetails={goDetails} setPage={setPage} />;
    if (page === "instructors") return <Instructors />;
    if (page === "profile") return <Profile setPage={setPage} />;
    if (page === "admin") return <Admin />;
    if (["login", "register", "verify", "forgot", "reset"].includes(page)) return <Auth page={page} setPage={setPage} />;
    const active = workshops[featured]; const ActiveIcon = active.icon;
    return <>
      <section className="relative overflow-hidden border-b border-border bg-[linear-gradient(180deg,#f8fafc_0%,#d8dee8_100%)] px-6 pt-24 pb-20 md:pt-36 md:pb-28"><div className="mx-auto max-w-6xl"><h1 className="max-w-4xl text-5xl font-extrabold leading-[1.02] text-slate-950 md:text-7xl">Learn, Apply, and Build Your First Project.</h1><p className="mt-7 max-w-3xl text-xl leading-8 text-slate-700 md:text-2xl">Professional technology and career-development workshops for university students and recent graduates entering the job market.</p><div className="mt-9 flex flex-wrap gap-4"><button onClick={() => setPage("workshops")} className="rounded-full bg-slate-950 px-6 py-3 text-white shadow-xl shadow-slate-900/20">Browse workshops</button><button onClick={() => setPage("register")} className="rounded-full border border-slate-300 bg-white/70 px-5 py-3 text-slate-800">Create account</button></div></div></section>
      <section className="bg-slate-950 px-6 py-20 text-white"><div className="mx-auto max-w-6xl"><div className="grid gap-12 md:grid-cols-[.9fr_1.1fr] md:items-center"><div><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-slate-300"><ActiveIcon className="h-4 w-4" /> Featured workshop</div><h2 className="text-3xl font-bold leading-tight md:text-5xl">{active.title}</h2><p className="mt-5 text-xl leading-8 text-slate-300">{active.description}</p><div className="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-2"><span className="flex gap-2"><GraduationCap className="h-4 w-4" /> {active.instructor}</span><span className="flex gap-2"><Star className="h-4 w-4" /> {active.rating}/5</span><span className="flex gap-2"><Users className="h-4 w-4" /> {active.enrolled} enrolled</span><span className="flex gap-2"><CalendarDays className="h-4 w-4" /> Starts {active.date}</span></div><button onClick={() => goDetails(active.id)} className="mt-8 rounded-full bg-white px-5 py-3 text-slate-950">View workshop details</button></div><WorkshopPoster /></div><div className="mt-10 flex items-center justify-between"><button onClick={() => setFeatured((featured + workshops.length - 1) % workshops.length)} className="rounded-full bg-white/10 p-3"><ChevronLeft /></button><div className="flex gap-2">{workshops.map((_, i) => <button key={i} onClick={() => setFeatured(i)} className={`h-2 rounded-full ${i === featured ? "w-8 bg-white" : "w-2 bg-white/40"}`} />)}</div><button onClick={() => setFeatured((featured + 1) % workshops.length)} className="rounded-full bg-white/10 p-3"><ChevronRight /></button></div></div></section>
      <section className="bg-[linear-gradient(180deg,#d4dae4,#7f8999)] px-6 py-24 text-slate-950"><div className="mx-auto max-w-6xl"><p className="max-w-4xl text-3xl leading-tight md:text-4xl">XO Workshops bridges academic education and job-market requirements through practical projects, industry instructors, and professional readiness.</p><div className="mt-16 grid gap-6 md:grid-cols-3">{["Total Users\n15+", "Total Workshops\n7", "Workshops Sold\n30"].map(s => <div key={s} className="rounded-full border border-white/50 bg-white/20 p-10 text-center text-white backdrop-blur"><b className="block text-4xl">{s.split('\n')[1]}</b><span className="text-xl">{s.split('\n')[0]}</span></div>)}</div></div></section>
    </>;
  }, [page, featured, selected]);
  return <div className="min-h-screen bg-background font-sans text-foreground"><header className="sticky top-0 z-50 border-b border-border bg-white/85 backdrop-blur-xl"><nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6"><button onClick={() => setPage("home")}><Logo /></button><div className="hidden items-center gap-8 md:flex">{nav.map(p => <button key={p} onClick={() => setPage(p)} className={`capitalize ${page === p ? "text-slate-950" : "text-slate-600"}`}>{p === "my" ? "My Workshops" : p}</button>)}</div><div className="hidden gap-3 md:flex"><button onClick={() => setPage("login")} className="rounded-full bg-slate-200 px-5 py-2">Log In</button><button onClick={() => setPage("register")} className="rounded-full bg-slate-700 px-5 py-2 text-white">Register</button><button onClick={() => setPage("profile")} className="rounded-full border px-3"><User className="h-4 w-4" /></button></div><button onClick={() => setMenu(!menu)} className="md:hidden">{menu ? <X /> : <Menu />}</button></nav>{menu && <div className="grid gap-3 border-t bg-white p-6 md:hidden">{[...nav, "profile", "login", "register" as Page].map(p => <button key={p} onClick={() => { setPage(p); setMenu(false); }} className="rounded-xl bg-slate-100 p-3 text-left capitalize">{p}</button>)}</div>}</header><main>{content}</main><Footer setPage={setPage} /></div>;
}

function WorkshopPoster() { return <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5"><div className="grid h-80 place-items-center rounded-[1.5rem] bg-[radial-gradient(circle_at_top_left,#94a3b8,transparent_35%),#e5e7eb] text-slate-950"><div className="max-w-xs rotate-[-2deg] rounded-3xl bg-white p-6 shadow-2xl"><p className="font-mono text-xs uppercase tracking-widest text-slate-500">Workshop board</p><div className="mt-5 grid grid-cols-3 gap-3">{Array.from({ length: 12 }).map((_, i) => <span key={i} className="h-12 rounded-lg border-2 border-slate-900/70 bg-slate-100" />)}</div></div></div></div>; }

function Workshops({ goDetails, setPage }: { goDetails: (id: number) => void; setPage: (p: Page) => void }) { const [q, setQ] = useState(""); const filtered = workshops.filter(w => w.title.toLowerCase().includes(q.toLowerCase())); return <section className="bg-slate-950 px-6 py-24 text-white"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Workshop catalog</p><h1 className="mt-4 text-5xl font-extrabold">Browse, search, and open full workshop content.</h1></div><button onClick={() => setPage("register")} className="rounded-full bg-white px-6 py-3 text-slate-950">Register account</button></div><label className="mt-10 flex max-w-xl items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4"><Search className="h-5 w-5 text-slate-400" /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search workshops by name" className="w-full bg-transparent text-white outline-none placeholder:text-slate-400" /></label>{filtered.length === 0 ? <p className="mt-12 rounded-3xl bg-white/10 p-8">No workshops found matching your search.</p> : <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{filtered.map(w => <WorkshopCard key={w.id} w={w} onClick={() => goDetails(w.id)} />)}</div>}</div></section>; }
function WorkshopCard({ w, onClick }: { w: typeof workshops[number]; onClick: () => void }) { const Icon = w.icon; return <button onClick={onClick} className="group overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.04] text-left transition hover:-translate-y-1 hover:bg-white/[0.08]"><div className="grid aspect-video place-items-center bg-slate-200 text-slate-950"><Icon className="h-12 w-12" /></div><div className="p-5"><span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-slate-300">{w.tag}</span><h2 className="mt-5 min-h-16 text-xl font-bold leading-tight">{w.title}</h2><p className="mt-3 text-sm text-slate-300">{w.instructor}</p><p className="mt-3 text-sm text-slate-300">{w.enrolled} Students Enrolled</p><p className="mt-2 flex items-center gap-1 text-sm"><Star className="h-4 w-4 fill-white" /> {w.rating} / 5</p><span className="mt-5 flex items-center gap-2 text-sm">Open details <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></div></button>; }
function WorkshopDetails({ workshop: w, setPage }: { workshop: typeof workshops[number]; setPage: (p: Page) => void }) { const inst = instructors.find(i => i.name === w.instructor)!; return <section className="bg-slate-100 px-6 py-20"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_380px]"><div><button onClick={() => setPage("workshops")} className="mb-6 text-slate-600">← Back to workshops</button><div className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl"><div className="grid aspect-video place-items-center bg-[radial-gradient(circle,#334155,#020617)]"><Play className="h-20 w-20" /><p className="mt-3 font-mono text-xs uppercase tracking-widest">Introduction video — available to everyone</p></div><div className="p-8"><h1 className="text-4xl font-extrabold">{w.title}</h1><p className="mt-4 text-xl text-slate-300">{w.description}</p><div className="mt-6 h-3 rounded-full bg-white/10"><div className="h-3 rounded-full bg-white" style={{ width: `${w.progress}%` }} /></div><p className="mt-2 text-sm text-slate-300">Progress: {w.progress}% · certificate generated at 100% and sent by email.</p></div></div><div className="mt-8 grid gap-5 md:grid-cols-3">{w.outcomes.map(o => <div key={o} className="rounded-3xl bg-white p-6 shadow-sm"><CheckCircle2 className="mb-4 h-6 w-6 text-slate-700" />{o}</div>)}</div></div><aside className="space-y-5"><div className="rounded-[2rem] bg-white p-6 shadow-sm"><h2 className="text-2xl font-bold">Lessons inside</h2><div className="mt-5 space-y-3">{w.lessons.map((l, i) => <div key={l} className="flex items-center justify-between rounded-2xl bg-slate-100 p-4"><span>{i + 1}. {l}<small className="block text-slate-500">{18 + i * 4} min</small></span>{w.enrolledUser ? <CheckCircle2 className="h-5 w-5 text-slate-600" /> : i === 0 ? <Play className="h-5 w-5" /> : <Lock className="h-5 w-5 text-slate-400" />}</div>)}</div></div><div className="rounded-[2rem] bg-white p-6 shadow-sm"><div className="flex gap-4"><div className="grid h-14 w-14 place-items-center rounded-full bg-slate-950 text-white">{inst.initials}</div><div><h3 className="font-bold">{inst.name}</h3><p className="text-sm text-slate-500">{inst.role}</p></div></div><p className="mt-4 text-slate-700">{inst.bio}</p></div><a href="https://wa.me/201000000000" target="_blank" className="block rounded-full bg-slate-950 px-6 py-4 text-center text-white">Enroll Now via WhatsApp</a></aside></div></section>; }

function About({ setPage }: { setPage: (p: Page) => void }) {
  const values = [
    { icon: Zap, title: "Practical over theoretical", body: "Every workshop is built around doing, not just watching. If you can't apply it, we haven't done our job." },
    { icon: Users, title: "Taught by people who've been there", body: "Our instructors aren't just educators — they're professionals who've worked in the industries they teach." },
    { icon: MapPin, title: "Built for where you are", body: "We design our workshops for students and graduates in the Arab world, with the regional job market in mind." },
  ];
  return (
    <div className="bg-white">
      <section className="border-b border-slate-100 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-slate-400">About XO for Software</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-extrabold leading-tight text-slate-950 md:text-6xl">The team behind XO Workshops — and why we built it.</h1>
        </div>
      </section>
      <section className="border-b border-slate-100 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Who we are</p>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-700">XO for Software is a Jordanian technology company built on a simple belief: that great software and genuine education go hand in hand.</p>
          <p className="mt-5 max-w-3xl text-xl leading-9 text-slate-700">We create digital products that solve real problems — and XO Workshops is one of them. It started with a question we kept hearing from students and fresh graduates: <em>how do I go from what I learned in university to what employers actually need?</em> XO Workshops is our answer to that.</p>
        </div>
      </section>
      <section className="border-b border-slate-100 bg-slate-50 px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Our mission</p>
            <p className="mt-6 text-xl leading-9 text-slate-700">We're here to close the gap between academic knowledge and real-world readiness. Through practical, instructor-led workshops, we help learners build skills they can use from day one — not just credentials to put on a CV.</p>
          </div>
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Our vision</p>
            <p className="mt-6 text-xl leading-9 text-slate-700">A region where every student can access the kind of mentorship and hands-on training that used to be reserved for the lucky few. We want ambition to be the only requirement.</p>
          </div>
        </div>
      </section>
      <section className="border-b border-slate-100 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Why XO Workshops</p>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-700">Universities teach theory. The job market demands practice. We built XO Workshops to sit in that space between the two — giving learners real projects, real guidance, and real confidence before they walk into their first interview.</p>
        </div>
      </section>
      <section className="border-b border-slate-100 bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Our values</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <Icon className="h-6 w-6 text-slate-600" strokeWidth={1.5} />
                <h3 className="mt-6 text-xl font-bold text-slate-950">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-slate-950 px-6 py-28 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-extrabold md:text-5xl">Ready to start learning?</h2>
          <p className="mt-6 text-xl leading-8 text-slate-300">Browse our available workshops and take the first step toward the career you're working toward.</p>
          <button onClick={() => setPage("workshops")} className="mt-10 rounded-full bg-white px-8 py-4 text-slate-950 font-bold">Explore workshops</button>
        </div>
      </section>
    </div>
  );
}
function MyWorkshops({ goDetails, setPage }: { goDetails: (id: number) => void; setPage: (p: Page) => void }) { const mine = workshops.filter(w => w.enrolledUser); return <section className="bg-slate-100 px-6 py-24"><div className="mx-auto max-w-6xl"><h1 className="text-5xl font-extrabold">My Enrolled Workshops</h1>{mine.length ? <div className="mt-10 grid gap-5 md:grid-cols-2">{mine.map(w => <button key={w.id} onClick={() => goDetails(w.id)} className="rounded-[2rem] bg-white p-6 text-left shadow-sm"><h2 className="text-2xl font-bold">{w.title}</h2><p className="mt-2 text-slate-500">Enrolled · Continue learning</p><div className="mt-6 h-3 rounded-full bg-slate-200"><div className="h-3 rounded-full bg-slate-800" style={{ width: `${w.progress}%` }} /></div><p className="mt-2">{w.progress}% complete</p></button>)}</div> : <div className="mt-10 rounded-3xl bg-white p-8">You are not enrolled in any workshops yet. <button onClick={() => setPage("workshops")} className="underline">Browse available workshops.</button></div>}</div></section>; }
function Instructors() { return <section className="bg-white px-6 py-24"><div className="mx-auto max-w-6xl"><h1 className="text-5xl font-extrabold">Instructors</h1><div className="mt-10 grid gap-5 md:grid-cols-3">{instructors.map(i => <article key={i.name} className="rounded-[2rem] border bg-slate-50 p-6"><div className="grid h-20 w-20 place-items-center rounded-full bg-slate-950 text-xl font-bold text-white">{i.initials}</div><h2 className="mt-6 text-2xl font-bold">{i.name}</h2><p className="text-slate-500">{i.role}</p><p className="mt-4 text-slate-700">{i.bio}</p><a className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2" href="#"><Linkedin className="h-4 w-4" /> LinkedIn <ExternalLink className="h-3 w-3" /></a></article>)}</div></div></section>; }
function Profile({ setPage }: { setPage: (p: Page) => void }) { return <section className="bg-slate-100 px-6 py-24"><div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-sm"><div className="grid h-24 w-24 place-items-center rounded-full bg-slate-950 text-3xl font-bold text-white">HS</div><h1 className="mt-6 text-4xl font-extrabold">User Profile</h1><div className="mt-8 grid gap-4 md:grid-cols-2"><Field label="First Name" placeholder="Hashem" /><Field label="Last Name" placeholder="Shatat" /><Field label="Email Address" placeholder="hashem@example.com" readOnly /><Field label="Password" placeholder="••••••••" readOnly /></div><button onClick={() => setPage("verify")} className="mt-8 rounded-full bg-slate-950 px-6 py-3 text-white">Change Password with OTP</button></div></section>; }
function Admin() { return <section className="bg-slate-950 px-6 py-24 text-white"><div className="mx-auto max-w-6xl"><h1 className="text-5xl font-extrabold">Admin Dashboard</h1><div className="mt-10 grid gap-5 md:grid-cols-4">{["Total Users: 15", "Workshops: 7", "Enrolled Users: 30", "Instructors: 3"].map(x => <div className="rounded-3xl bg-white/10 p-6" key={x}><BarChart3 /> <p className="mt-4 text-2xl">{x}</p></div>)}</div><div className="mt-8 rounded-3xl bg-white/10 p-6">Management areas: Workshops CRUD, Instructors CRUD, Subscriptions status, RBAC protected admin access, confirmation for sensitive changes.</div></div></section>; }
function Auth({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const register = page === "register";
  const verify = page === "verify";
  const forgot = page === "forgot";
  const reset = page === "reset";
  const title = verify ? "Verify your email" : forgot ? "Forgot your password?" : reset ? "Reset your password" : register ? "Create an account" : "Welcome back";
  const subtitle = verify ? "Enter the 6-digit code we sent to your email." : forgot ? "Enter your email and we'll send you a recovery code." : reset ? "Choose a strong new password for your account." : register ? "Join XO Workshops and start building real skills." : "Sign in to continue your learning journey.";
  return (
    <section className="grid min-h-[calc(100vh-5rem)] md:grid-cols-2">
      {/* Left — dark atmospheric panel */}
      <div className="relative hidden overflow-hidden bg-[#060d1f] md:flex md:flex-col md:justify-between p-10">
        {/* Glow blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[15%] top-[10%] h-80 w-80 rounded-full bg-cyan-400/20 blur-[100px]" />
          <div className="absolute left-[40%] top-[30%] h-64 w-64 rounded-full bg-violet-500/30 blur-[80px]" />
          <div className="absolute left-[5%] top-[45%] h-72 w-72 rounded-full bg-fuchsia-500/20 blur-[90px]" />
          <div className="absolute left-[50%] top-[55%] h-56 w-56 rounded-full bg-blue-500/25 blur-[70px]" />
          <div className="absolute left-[55%] top-[15%] h-48 w-48 rounded-full bg-teal-400/20 blur-[60px]" />
        </div>
        {/* Logo top-left */}
        <div className="relative z-10">
          <Logo size="h-10" />
        </div>
        {/* Headline bottom-left */}
        <div className="relative z-10">
          <h2 className="text-4xl font-bold leading-tight text-white">Learn, Apply, and<br />Build Your First Project.</h2>
          <p className="mt-4 max-w-xs leading-relaxed text-slate-400">Practical workshops for students and recent graduates entering the job market.</p>
        </div>
      </div>
      {/* Right — form panel */}
      <div className="grid place-items-center bg-white px-6 py-20">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-extrabold text-slate-950">{title}</h1>
          <p className="mt-2 leading-relaxed text-slate-500">{subtitle}</p>
          <div className="mt-8 space-y-4">
            {register && <><Field label="First name" placeholder="First name" /><Field label="Last name" placeholder="Last name" /></>}
            {(register || page === "login" || forgot) && <Field label="Email address" placeholder="you@example.com" />}
            {(register || page === "login") && <><Field label="Password" placeholder="••••••••" /><Field label="Confirm password" placeholder="••••••••" /></>}
            {verify && <Field label="Verification code" placeholder="6-digit OTP" />}
            {reset && <><Field label="New password" placeholder="••••••••" /><Field label="Confirm new password" placeholder="••••••••" /></>}
            {register && (
              <div className="space-y-3 pt-1">
                <label className="flex items-center gap-3 text-sm text-slate-600"><input type="checkbox" className="accent-slate-900" /> I accept the Terms & Conditions</label>
                <label className="flex items-center gap-3 text-sm text-slate-600"><input type="checkbox" className="accent-slate-900" /> I accept the Privacy Policy</label>
              </div>
            )}
          </div>
          <button type="button" onClick={() => setPage(register || forgot ? "verify" : verify ? "login" : reset ? "login" : "home")} className="mt-7 w-full rounded-full bg-slate-950 py-3 text-white">
            {register ? "Create account" : verify ? "Verify" : forgot ? "Send code" : reset ? "Save password" : "Log in"}
          </button>
          {page === "login" && <button type="button" onClick={() => setPage("forgot")} className="mt-4 block w-full text-center text-sm text-slate-500">Forgot password?</button>}
          <button type="button" onClick={() => setPage(register ? "login" : "register")} className="mt-3 block w-full text-center text-sm text-slate-500">
            {register ? "Already have an account? Log in" : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </section>
  );
}
function Field({ label, placeholder, readOnly }: { label: string; placeholder: string; readOnly?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <input readOnly={readOnly} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 focus:bg-white transition" placeholder={placeholder} />
    </label>
  );
}
function Footer({ setPage }: { setPage: (p: Page) => void }) { return <footer className="bg-[#2f343b] px-6 py-14 text-slate-200"><div className="mx-auto grid max-w-6xl gap-10 border-t border-white/15 pt-8 md:grid-cols-4"><div><Logo invert /><p className="mt-4">Learn, apply, and build.</p><p className="mt-6 text-sm">© 2026 XO Workshops. All Rights Reserved.</p></div><div><h3 className="mb-3 font-bold">Quick Links</h3>{["home", "workshops", "about", "instructors"].map(p => <button key={p} onClick={() => setPage(p as Page)} className="block py-1 capitalize text-slate-300 hover:text-white">{p}</button>)}</div><div><h3 className="mb-3 font-bold">Contact</h3><p>contact@xoworkshops.com</p><p>WhatsApp enrollment available</p><p className="mt-2">LinkedIn · Instagram · Facebook</p></div><div><h3 className="mb-3 font-bold">Legal</h3><p>Terms & Conditions</p><p>Privacy Policy</p><button onClick={() => setPage("admin")} className="mt-3 text-slate-400">Admin</button></div></div></footer>; }
