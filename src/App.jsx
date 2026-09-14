import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useParams, useLocation, Navigate } from "react-router-dom";
import { C, PROJECTS } from "./content";
import { Nav, Hero, About, Process, Work, Skills, Contact, Footer, CaseStudy, SkipLink } from "./components";
import "./styles.css";

function useAppState() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang-v2") || "en");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system");
  const [resolved, setResolved] = useState(() =>
    document.documentElement.getAttribute("data-theme") || "light"
  );

  useEffect(() => { localStorage.setItem("lang-v2", lang); }, [lang]);
  useEffect(() => { localStorage.setItem("theme", theme); }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => setResolved(theme === "system" ? (mq.matches ? "dark" : "light") : theme);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme]);

  return { lang, setLang, theme: resolved, setTheme };
}

/* Keeps <title> and the meta description in sync with the route and language. */
function useDocumentMeta(title, description) {
  useEffect(() => {
    document.title = title;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", description);
  }, [title, description]);
}

function Home({ t, lang, theme }) {
  useDocumentMeta(t.doc.title, t.doc.desc);
  const onNav = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <main id="main" tabIndex={-1}>
      <Hero t={t} onNav={onNav} />
      <About t={t} />
      <Process t={t} lang={lang} />
      <Work t={t} lang={lang} theme={theme} />
      <Skills t={t} />
      <Contact t={t} />
    </main>
  );
}

function CasePage({ t, lang, theme }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.id === id);
  const name = project ? project[lang].name : "";

  useDocumentMeta(
    project ? `${name} — ${t.doc.title}` : t.doc.title,
    project ? project[lang].desc : t.doc.desc
  );

  useEffect(() => { window.scrollTo(0, 0); }, [id]);
  if (!project) return <Navigate to="/" replace />;

  /* Prefer real browser history so the visitor returns to where they were.
     If the case study was opened directly, go home and land on the work grid. */
  const back = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
      setTimeout(() => document.getElementById("work")?.scrollIntoView({ block: "start" }), 60);
    }
  };

  return (
    <main id="main" tabIndex={-1}>
      <CaseStudy t={t} lang={lang} theme={theme} project={project} back={back} />
    </main>
  );
}

export default function App() {
  const { lang, setLang, theme, setTheme } = useAppState();
  const t = C[lang];
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    document.documentElement.setAttribute("data-theme", theme);
  }, [lang, t.dir, theme]);

  /* Move focus to the new page so screen reader and keyboard users
     are not left behind in the old document. */
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);

  const goSection = (id) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 80);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="rz" dir={t.dir} data-theme={theme} lang={lang}>
      <SkipLink t={t} />
      <Nav t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} onNav={goSection} />
      <Routes>
        <Route path="/" element={<Home t={t} lang={lang} theme={theme} />} />
        <Route path="/work/:id" element={<CasePage t={t} lang={lang} theme={theme} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer t={t} />
    </div>
  );
}
