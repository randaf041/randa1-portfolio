import { useState, useEffect } from "react";
import {
  Sun, Moon, Languages, ArrowLeft, ArrowRight, Download, Mail, Linkedin,
  Search, Target, PenTool, TestTube, ExternalLink, Send, Phone, X, Menu,
  Sparkles, Laptop, Palette, Star,
  AlertTriangle, Check, ChevronDown, Lightbulb, Layers, RefreshCw
} from "lucide-react";
import { PROJECTS } from "./content";

function CursorMark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M5.5 3.2 19 11.4l-5.9 1.2-2.4 5.6z" fill="#1ABCFE" />
      <path d="M5.5 3.2 19 11.4l-5.9 1.2-2.4 5.6z" fill="none"
            stroke="#0D8FC4" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

export const CV_URL = "/cv.pdf";
export const EMAIL = "Randaalzahrani0@gmail.com";
export const PHONE = "+966 55 647 0445";
export const LINKEDIN = "https://www.linkedin.com/in/randa-alzahrani-36820b274/";

/* image with graceful placeholder while real assets aren't in place yet */
export function Img({ src, alt, label, ratio }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div style={{
        width: "100%", aspectRatio: ratio || "1 / 1", borderRadius: 16,
        background: "var(--bg-soft)", border: "1px dashed var(--line)",
        display: "grid", placeItems: "center", color: "var(--faint)",
        fontSize: 12.5, textAlign: "center", padding: 12, lineHeight: 1.6,
      }}>{label || alt}</div>
    );
  }
  return <img src={src} alt={alt} onError={() => setFailed(true)} />;
}

export function Avatar({ src, alt, size }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div style={{ fontSize: size || 84, lineHeight: 1 }} role="img" aria-label={alt}>🙂</div>;
  }
  return <img src={src} alt={alt} onError={() => setFailed(true)} />;
}

export function Nav({ t, lang, setLang, theme, setTheme, go, onNav }) {
  const [pinned, setPinned] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setPinned(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    ["home", t.nav.home], ["about", t.nav.about], ["process", t.nav.process],
    ["work", t.nav.work], ["skills", t.nav.skills], ["contact", t.nav.contact],
  ];

  const jump = (id) => { setOpen(false); onNav(id); };

  return (
    <>
      <div className={"navhold" + (pinned ? " pinned" : "")}>
        <nav className="nav">
          <button className="brand" onClick={() => jump("home")} aria-label={t.brand}>R</button>
          <div className="navlinks">
            {items.map(([id, label]) => (
              <button key={id} className="navlink" onClick={() => jump(id)}>{label}</button>
            ))}
          </div>
          <div className="navtools">
            <button className="icobtn" onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              aria-label="Switch language" title={lang === "ar" ? "English" : "العربية"}>
              <Languages size={17} strokeWidth={1.6} />
            </button>
            <button className="icobtn" onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label="Toggle theme">
              {theme === "light" ? <Moon size={17} strokeWidth={1.6} /> : <Sun size={17} strokeWidth={1.6} />}
            </button>
            <a className="navcta" href={CV_URL} download>
              <Download size={15} strokeWidth={1.8} /><span>{t.nav.cv}</span>
            </a>
            <button className="icobtn burger" onClick={() => setOpen(true)} aria-label="Menu">
              <Menu size={19} strokeWidth={1.6} />
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className="sheet">
          <div className="sheet-top">
            <span className="brand">R</span>
            <button className="icobtn" onClick={() => setOpen(false)} aria-label="Close">
              <X size={20} strokeWidth={1.6} />
            </button>
          </div>
          <div className="sheet-links">
            {items.map(([id, label]) => (
              <button key={id} onClick={() => jump(id)}>{label}</button>
            ))}
          </div>
          <div className="sheet-foot">
            <a className="navcta" href={CV_URL} download>
              <Download size={15} strokeWidth={1.8} />{t.nav.cv}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export function Hero({ t, onNav }) {
  return (
    <header className="hero" id="home">
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1 className="hero-title">
            {t.hero.titleLines.map((line) => <span key={line}>{line}</span>)}
          </h1>
          <p className="hero-intro">{t.hero.intro}</p>
          <div className="hero-btns">
            <button className="btn btn-primary" onClick={() => onNav("work")}>{t.hero.primary}</button>
            <a className="btn btn-ghost" href={CV_URL} download>
              <Download size={16} strokeWidth={1.8} />{t.hero.secondary}
            </a>
          </div>
        </div>
        <div className="avatar-stage">
          <div className="orb">
            <Avatar src="/images/avatar-hero.png" alt="Randa" size={130} />
            <span className="spark s1">⭐</span>
            <span className="spark s2">💻</span>
            <span className="spark s3"><CursorMark /></span>
            <span className="spark s4">✨</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export function About({ t }) {
  return (
    <section className="sec" id="about">
      <div className="wrap about-grid">
        <div className="avatar-stage about-stage">
          <div className="orb orb-sm">
            <Avatar src="/images/avatar-laptop.png" alt="Randa" size={110} />
          </div>
        </div>
        <div className="about-text">
          <h2>{t.about.title}</h2>
          <p>{t.about.body}</p>
        </div>
      </div>
    </section>
  );
}

export function Process({ t }) {
  const icons = [Search, Target, PenTool, TestTube];
  return (
    <section className="sec" id="process">
      <div className="wrap">
        <div className="head">
          <h2>{t.process.title}</h2>
          <p>{t.process.intro}</p>
        </div>
        <div className="proc">
          {t.process.items.map(([title, body], i) => {
            const Ico = icons[i];
            return (
              <article className="proc-card" key={title}>
                <div className="proc-ico"><Ico size={20} strokeWidth={1.7} /></div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Work({ t, lang, theme, openProject }) {
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  return (
    <section className="sec" id="work">
      <div className="wrap">
        <div className="head">
          <h2>{t.work.title}</h2>
          <p>{t.work.intro}</p>
        </div>
        <div className="work">
          {PROJECTS.map((p) => {
            const d = p[lang];
            return (
              <article className="pfolder" key={p.id} onClick={() => openProject(p.id)}>
                <span className="pcard-tab"><i>{d.category}</i></span>
                <div className="pcard">
                <div className="pcard-img">
                  <Img src={theme === "dark" ? p.coverDark : p.cover} alt={d.name}
                       label={p.cover} ratio="16 / 10" />
                </div>
                <div className="pcard-body">
                  <h3>{d.name}</h3>
                  <p className="pdesc">{d.desc}</p>
                  <span className="pcard-cta">{t.work.cta} <Arrow size={15} strokeWidth={1.9} /></span>
                </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const TOOLS = [
  { name: "Figma", slug: "figma" },
  { name: "Flutter", slug: "flutter" },
];

export function ToolLogo({ slug, name }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="toollogo"><b>{name.charAt(0)}</b></div>;
  return (
    <div className="toollogo">
      <img src={`https://cdn.simpleicons.org/${slug}`} alt="" onError={() => setFailed(true)} />
    </div>
  );
}

export function Skills({ t }) {
  return (
    <section className="sec" id="skills">
      <div className="wrap">
        <div className="head">
          <h2>{t.skills.title}</h2>
          <p>{t.skills.intro}</p>
        </div>
        <div className="st-grid">
          <div>
            <p className="st-label">{t.skills.skillsLabel}</p>
            <div className="skill-list">
              {t.skills.items.map((s) => (
                <span className="skill-item" key={s}><i className="dot" />{s}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="st-label">{t.skills.toolsLabel}</p>
            <div className="tools">
              {TOOLS.map((tool) => (
                <div className="tool" key={tool.slug}>
                  <ToolLogo slug={tool.slug} name={tool.name} />
                  {tool.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact({ t }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submit = () => {
    const subject = encodeURIComponent(`${t.contact.title} — ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };
  return (
    <section className="sec" id="contact">
      <div className="wrap contact-grid">
        <div className="contact-side">
          <div className="head" style={{ marginBottom: 0 }}>
            <h2>{t.contact.title}</h2>
            <p>{t.contact.body}</p>
          </div>
          <div className="contact-row">
            <div className="contact-avatar">
              <Avatar src="/images/avatar-fingers-crossed.png" alt="Randa" size={96} />
            </div>
            <div className="contact-links">
              <a className="clink" href={`mailto:${EMAIL}`}><Mail size={17} strokeWidth={1.6} />{EMAIL}</a>
              <a className="clink" href={`tel:${PHONE.replace(/\s/g, "")}`} dir="ltr"><Phone size={17} strokeWidth={1.6} />{PHONE}</a>
              <a className="clink" href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={17} strokeWidth={1.6} />LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="form">
          <div className="field">
            <label htmlFor="f-name">{t.contact.name}</label>
            <input id="f-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="f-mail">{t.contact.email}</label>
            <input id="f-mail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="f-msg">{t.contact.message}</label>
            <textarea id="f-msg" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
          <button className="btn btn-primary" onClick={submit} style={{ alignSelf: "flex-start" }}>
            <Send size={16} strokeWidth={1.8} />{t.contact.send}
          </button>
        </div>
      </div>
    </section>
  );
}

export function Footer({ t }) {
  return (
    <div className="wrap">
      <div className="foot">
        <p>{t.footer.line}</p>
        <small>{t.footer.role} · © 2026</small>
      </div>
    </div>
  );
}

const STEP_ICONS = [Search, Target, PenTool, Layers, RefreshCw, TestTube];

export function CaseStudy({ t, lang, theme, project, back }) {
  const d = project[lang];
  const L = t.cs.labels;
  const Back = lang === "ar" ? ArrowRight : ArrowLeft;

  return (
    <article className="cs">
      <div className="wrap">
        <button className="back" onClick={back}>
          <Back size={16} strokeWidth={1.8} />{t.cs.back}
        </button>
        <h1>{d.name}</h1>
        <p className="cs-lead">{d.desc}</p>
        {project.demo && (
          <a className="btn btn-quiet demo" href={project.demo} target="_blank" rel="noreferrer">
            <ExternalLink size={15} strokeWidth={1.8} />{t.cs.demo}
          </a>
        )}

        <div className="metabar">
          {d.meta.map(([k, v]) => (
            <div className="metaitem" key={k}><span>{k}</span><b>{v}</b></div>
          ))}
        </div>

        <div className="cs-cover">
          <Img src={theme === "dark" ? project.coverDark : project.cover} alt={d.name}
               label={project.cover} ratio="16 / 10" />
        </div>
      </div>

      <div className="wrap">
        <div className="cs-body">
          <section className="blk">
            <h2>{L.overview}</h2>
            {d.overview.map((p, i) => <p key={i}>{p}</p>)}
          </section>

          <section className="blk">
            <div className="pair">
              <div className="pcell">
                <div className="pcell-ico warn"><AlertTriangle size={18} strokeWidth={1.7} /></div>
                <h3>{L.problem}</h3>
                {d.problem.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <div className="pcell">
                <div className="pcell-ico good"><Target size={18} strokeWidth={1.7} /></div>
                <h3>{L.goal}</h3>
                {d.goal.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </section>

          <section className="blk">
            <h2>{L.role}</h2>
            <p className="role-note">{d.role_note}</p>
            <ul className="rolelist">
              {d.role_items.map((r) => (
                <li key={r}><Check size={15} strokeWidth={2.2} />{r}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="wrap">
        <section className="blk flowsec narrow">
          <h2>{L.process}</h2>
          <ol className="flow">
            {d.steps.map(([h, p], i) => {
              const Ico = STEP_ICONS[i % STEP_ICONS.length];
              return (
                <li className="flowstep" key={h}>
                  <div className="flowcard">
                    <div className="flow-ico"><Ico size={19} strokeWidth={1.7} /></div>
                    <h3>{h}</h3>
                    <p>{p}</p>
                  </div>
                  {i < d.steps.length - 1 && (
                    <span className="flowarrow" aria-hidden="true">
                      <ChevronDown size={18} strokeWidth={1.8} />
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      </div>

      <div className="wrap">
        <section className="blk">
          <h2 className="center">{t.cs.gallery}</h2>
          <div className={"gallery" + (project.shotsMobile ? " gal-mobile" : "")}>
            {project.shots.map(([src, capAr, capEn]) => (
              <figure className="shot" key={src}>
                <Img src={src} alt={lang === "ar" ? capAr : capEn} label={src} ratio="9 / 19.5" />
                <figcaption>{lang === "ar" ? capAr : capEn}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>

      <div className="wrap">
        <section className="blk narrow">
          <h2>{L.outcome}</h2>
          <div className="metrics">
            {d.metrics.map(([value, label]) => (
              <div className="metric" key={label}>
                <b>{value}</b>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="cs-body" style={{ padding: 0 }}>
            {d.outcome.map((p, i) => <p className="outcome-p" key={i}>{p}</p>)}
          </div>
        </section>

        <section className="blk">
          <div className="learn">
            <div className="learn-ico"><Lightbulb size={19} strokeWidth={1.7} /></div>
            <div>
              <h3>{L.learning}</h3>
              <p>{d.learning}</p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

