import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useParams, Navigate } from "react-router-dom";
import { C, PROJECTS } from "./content";
import { Nav, Hero, About, Process, Work, Skills, Contact, Footer, CaseStudy } from "./components";
import "./styles.css";

function useAppState() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang-v2") || "en");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system");
  const [resolved, setResolved] = useState("light");

  useEffect(() => { localStorage.setItem("lang-v2", lang); }, [lang]);
  useEffect(() => { localStorage.setItem("theme", theme); }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => setResolved(theme === "system" ? (mq.matches ? "dark" : "light") : theme);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme]);

  return { lang, setLang, theme: resolved, setTheme: (v) => setTheme(v), };
}

function Home({ t, lang, theme }) {
  const navigate = useNavigate();
  const onNav = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <main>
      <Hero t={t} onNav={onNav} />
      <About t={t} />
      <Process t={t} lang={lang} />
      <Work t={t} lang={lang} theme={theme} openProject={(id) => navigate(`/work/${id}`)} />
      <Skills t={t} />
      <Contact t={t} />
    </main>
  );
}

function CasePage({ t, lang, theme }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.id === id);
  useEffect(() => { window.scrollTo(0, 0); }, [id]);
  if (!project) return <Navigate to="/" replace />;
  return (
    <main>
      <CaseStudy t={t} lang={lang} theme={theme} project={project} back={() => navigate("/")} />
    </main>
  );
}

export default function App() {
  const { lang, setLang, theme, setTheme } = useAppState();
  const t = C[lang];
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    document.title = "Randa Portfolio";
    document.documentElement.setAttribute("data-theme", theme);
  }, [lang, t.dir, theme]);

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
