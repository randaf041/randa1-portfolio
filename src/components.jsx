import { useState, useEffect } from "react";
import {
  Sun, Moon, Languages, ArrowLeft, ArrowRight, Download, Mail, Linkedin,
  Search, Target, PenTool, TestTube, ExternalLink, Send, Phone, X, Menu
} from "lucide-react";
import { PROJECTS } from "./content";

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
          <h1>{t.hero.title}</h1>
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
            <span className="spark s1">✦</span>
            <span className="spark s2">💻</span>
            <span className="spark s3">🎨</span>
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
        <div className="about-card">
          <Avatar src="/images/avatar-laptop.png" alt="Randa" size={110} />
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

export function Work({ t, lang, openProject }) {
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
                  <Img src={p.cover} alt={d.name} label={p.cover} ratio="16 / 10" />
                </div>
                <div className="pcard-body">
                  <h3>{d.name}</h3>
                  <p className="pdesc">{d.desc}</p>
                  <div className="pmeta">
                    <span><b>{t.work.role}:</b> {d.role}</span>
                    <span><b>{t.work.tools}:</b> {d.tools}</span>
                  </div>
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
          <div className="contact-avatar">
            <Avatar src="/images/avatar-fingers-crossed.png" alt="Randa" size={72} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <a className="clink" href={`mailto:${EMAIL}`}><Mail size={17} strokeWidth={1.6} />{EMAIL}</a>
            <a className="clink" href={`tel:${PHONE.replace(/\s/g, "")}`}><Phone size={17} strokeWidth={1.6} />{PHONE}</a>
            <a className="clink" href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={17} strokeWidth={1.6} />LinkedIn</a>
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

export function CaseStudy({ t, lang, project, back }) {
  const d = project[lang];
  const L = t.cs.labels;
  const Back = lang === "ar" ? ArrowRight : ArrowLeft;

  const Block = ({ title, paras }) => (
    <section className="blk">
      <h2>{title}</h2>
      {paras.map((p, i) => <p key={i}>{p}</p>)}
    </section>
  );

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
          <Img src={project.cover} alt={d.name} label={project.cover} ratio="16 / 10" />
        </div>
      </div>

      <div className="wrap">
        <div className="cs-body">
          <Block title={L.overview} paras={d.overview} />
          <Block title={L.problem} paras={d.problem} />
          <Block title={L.goal} paras={d.goal} />
          <Block title={L.role} paras={d.role_body} />

          <section className="blk">
            <h2>{L.process}</h2>
            {d.steps.map(([h, p]) => (
              <div className="step" key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </section>
        </div>
      </div>

      <div className="wrap">
        <section className="blk" style={{ paddingBottom: 64 }}>
          <h2 style={{ fontSize: 26, marginBottom: 22, textAlign: "center" }}>{t.cs.gallery}</h2>
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
        <div className="cs-body">
          <Block title={L.outcome} paras={d.outcome} />
        </div>
      </div>
    </article>
  );
}
