import { useState, useEffect, useRef, useId } from "react";
import { Link } from "react-router-dom";
import {
  Sun, Moon, Languages, ArrowLeft, ArrowRight, Download, Mail, Linkedin,
  Search, Target, PenTool, TestTube, ExternalLink, Send, Phone, X, Menu,
  AlertTriangle, Check, ChevronDown, Lightbulb, Layers, RefreshCw
} from "lucide-react";
import { PROJECTS } from "./content";

function CursorMark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path d="M5.5 3.2 19 11.4l-5.9 1.2-2.4 5.6z" fill="#1ABCFE" />
      <path d="M5.5 3.2 19 11.4l-5.9 1.2-2.4 5.6z" fill="none"
            stroke="#0D8FC4" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

export const CV_URL = "/Randa_Alzahrani_CV.pdf";
export const EMAIL = "Randaalzahrani0@gmail.com";
export const PHONE = "+966 55 647 0445";
export const LINKEDIN = "https://www.linkedin.com/in/randa-alzahrani-36820b274/";

/* Image with intrinsic size (prevents layout shift) and a readable fallback. */
export function Img({ src, alt, label, ratio, width, height, eager }) {
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
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

export function Avatar({ src, alt, size, eager }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div style={{ fontSize: size || 84, lineHeight: 1 }} role="img" aria-label={alt}>🙂</div>;
  }
  return (
    <img
      src={src}
      alt={alt}
      width="512"
      height="512"
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

export function SkipLink({ t }) {
  return <a className="skiplink" href="#main">{t.a11y.skip}</a>;
}

export function Nav({ t, lang, setLang, theme, setTheme, onNav }) {
  const [pinned, setPinned] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef(null);
  const sheetRef = useRef(null);
  const sheetId = useId();

  useEffect(() => {
    const onScroll = () => setPinned(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* While the sheet is open: lock the page behind it, close on Escape,
     and hand focus back to the burger when it closes. */
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("sheet-open");
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    const first = sheetRef.current?.querySelector("button, a");
    first?.focus({ preventScroll: true });
    return () => {
      document.body.classList.remove("sheet-open");
      document.removeEventListener("keydown", onKey);
      burgerRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  const items = [
    ["home", t.nav.home], ["about", t.nav.about], ["process", t.nav.process],
    ["work", t.nav.work], ["skills", t.nav.skills], ["contact", t.nav.contact],
  ];

  const jump = (id) => { setOpen(false); onNav(id); };

  return (
    <>
      <div className={"navhold" + (pinned ? " pinned" : "")}>
        <nav className="nav" aria-label={t.a11y.mainNav}>
          <button className="brand" onClick={() => jump("home")} aria-label={t.a11y.home}>R</button>
          <div className="navlinks">
            {items.map(([id, label]) => (
              <button key={id} className="navlink" onClick={() => jump(id)}>{label}</button>
            ))}
          </div>
          <div className="navtools">
            <button className="icobtn" onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              aria-label={t.a11y.switchLang} title={lang === "ar" ? "English" : "العربية"}>
              <Languages size={17} strokeWidth={1.6} aria-hidden="true" />
            </button>
            <button className="icobtn" onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label={theme === "light" ? t.a11y.toDark : t.a11y.toLight}>
              {theme === "light"
                ? <Moon size={17} strokeWidth={1.6} aria-hidden="true" />
                : <Sun size={17} strokeWidth={1.6} aria-hidden="true" />}
            </button>
            <a className="navcta" href={CV_URL} download>
              <Download size={15} strokeWidth={1.8} aria-hidden="true" /><span>{t.nav.cv}</span>
            </a>
            <button ref={burgerRef} className="icobtn burger" onClick={() => setOpen(true)}
              aria-label={t.a11y.menu} aria-expanded={open} aria-controls={sheetId}>
              <Menu size={19} strokeWidth={1.6} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className="sheet" id={sheetId} ref={sheetRef} role="dialog" aria-modal="true"
             aria-label={t.a11y.mainNav}>
          <div className="sheet-top">
            <span className="brand">R</span>
            <button className="icobtn" onClick={() => setOpen(false)} aria-label={t.a11y.close}>
              <X size={20} strokeWidth={1.6} aria-hidden="true" />
            </button>
          </div>
          <div className="sheet-links">
            {items.map(([id, label]) => (
              <button key={id} onClick={() => jump(id)}>{label}</button>
            ))}
          </div>
          <div className="sheet-foot">
            <a className="navcta" href={CV_URL} download>
              <Download size={15} strokeWidth={1.8} aria-hidden="true" />{t.nav.cv}
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
              <Download size={16} strokeWidth={1.8} aria-hidden="true" />{t.hero.secondary}
            </a>
          </div>
        </div>
        <div className="avatar-stage">
          <div className="orb">
            <Avatar src="/images/avatar-hero.webp" alt="" size={130} eager />
            <span className="spark s1" aria-hidden="true">⭐</span>
            <span className="spark s2" aria-hidden="true">💻</span>
            <span className="spark s3" aria-hidden="true"><CursorMark /></span>
            <span className="spark s4" aria-hidden="true">✨</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export function About({ t }) {
  return (
    <section className="sec" id="about" aria-labelledby="about-h">
      <div className="wrap about-grid">
        <div className="avatar-stage about-stage">
          <div className="orb orb-sm">
            <Avatar src="/images/avatar-laptop.webp" alt="" size={110} />
          </div>
        </div>
        <div className="about-text">
          <h2 id="about-h">{t.about.title}</h2>
          <p>{t.about.body}</p>
        </div>
      </div>
    </section>
  );
}

export function Process({ t }) {
  const icons = [Search, Target, PenTool, TestTube];
  return (
    <section className="sec" id="process" aria-labelledby="process-h">
      <div className="wrap">
        <div className="head">
          <h2 id="process-h">{t.process.title}</h2>
          <p>{t.process.intro}</p>
        </div>
        <div className="proc">
          {t.process.items.map(([title, body], i) => {
            const Ico = icons[i];
            return (
              <article className="proc-card" key={title}>
                <div className="proc-ico"><Ico size={20} strokeWidth={1.7} aria-hidden="true" /></div>
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

export function Work({ t, lang, theme }) {
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  return (
    <section className="sec" id="work" aria-labelledby="work-h">
      <div className="wrap">
        <div className="head">
          <h2 id="work-h">{t.work.title}</h2>
          <p>{t.work.intro}</p>
        </div>
        <div className="work">
          {PROJECTS.map((p) => {
            const d = p[lang];
            return (
              <Link className="pfolder" key={p.id} to={`/work/${p.id}`}>
                <span className="pcard-tab"><i>{d.category}</i></span>
                <div className="pcard">
                  <div className="pcard-img">
                    <Img src={theme === "dark" ? p.coverDark : p.cover} alt=""
                         label={d.name} ratio="16 / 10" width="1400" height="875" />
                  </div>
                  <div className="pcard-body">
                    <h3>{d.name}</h3>
                    <p className="pdesc">{d.desc}</p>
                    <span className="pcard-cta">
                      {t.work.cta} <Arrow size={15} strokeWidth={1.9} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Skills({ t }) {
  return (
    <section className="sec" id="skills" aria-labelledby="skills-h">
      <div className="wrap">
        <div className="head">
          <h2 id="skills-h">{t.skills.title}</h2>
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
              {t.skills.tools.map((tool) => (
                <div className="tool" key={tool}><i className="dot" />{tool}</div>
              ))}
            </div>
            <p className="tools-note">{t.skills.toolsNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact({ t }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = t.contact.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = t.contact.errEmail;
    if (!form.message.trim()) e.message = t.contact.errMessage;
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setStatus(null); return; }
    const subject = encodeURIComponent(`${t.contact.title} — ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setStatus(t.contact.opened);
  };

  const set = (k) => (ev) => {
    setForm({ ...form, [k]: ev.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: undefined });
  };

  return (
    <section className="sec" id="contact" aria-labelledby="contact-h">
      <div className="wrap contact-grid">
        <div className="contact-side">
          <div className="head" style={{ marginBottom: 0 }}>
            <h2 id="contact-h">{t.contact.title}</h2>
            <p>{t.contact.body}</p>
          </div>
          <div className="contact-row">
            <div className="contact-avatar">
              <Avatar src="/images/avatar-fingers-crossed.webp" alt="" size={96} />
            </div>
            <div className="contact-links">
              <a className="clink" href={`mailto:${EMAIL}`}>
                <Mail size={17} strokeWidth={1.6} aria-hidden="true" />{EMAIL}
              </a>
              <a className="clink" href={`tel:${PHONE.replace(/\s/g, "")}`} dir="ltr">
                <Phone size={17} strokeWidth={1.6} aria-hidden="true" />{PHONE}
              </a>
              <a className="clink" href={LINKEDIN} target="_blank" rel="noreferrer">
                <Linkedin size={17} strokeWidth={1.6} aria-hidden="true" />LinkedIn
              </a>
            </div>
          </div>
        </div>

        <form className="form" onSubmit={submit} noValidate>
          <div className="field">
            <label htmlFor="f-name">{t.contact.name}</label>
            <input id="f-name" name="name" autoComplete="name" value={form.name}
              onChange={set("name")}
              aria-invalid={errors.name ? "true" : undefined}
              aria-describedby={errors.name ? "f-name-err" : undefined} />
            {errors.name && <span className="field-err" id="f-name-err">{errors.name}</span>}
          </div>
          <div className="field">
            <label htmlFor="f-mail">{t.contact.email}</label>
            <input id="f-mail" name="email" type="email" autoComplete="email" dir="ltr"
              value={form.email} onChange={set("email")}
              aria-invalid={errors.email ? "true" : undefined}
              aria-describedby={errors.email ? "f-mail-err" : undefined} />
            {errors.email && <span className="field-err" id="f-mail-err">{errors.email}</span>}
          </div>
          <div className="field">
            <label htmlFor="f-msg">{t.contact.message}</label>
            <textarea id="f-msg" name="message" value={form.message} onChange={set("message")}
              aria-invalid={errors.message ? "true" : undefined}
              aria-describedby={errors.message ? "f-msg-err" : undefined} />
            {errors.message && <span className="field-err" id="f-msg-err">{errors.message}</span>}
          </div>
          {status && <p className="form-msg" role="status">{status}</p>}
          <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
            <Send size={16} strokeWidth={1.8} aria-hidden="true" />{t.contact.send}
          </button>
        </form>
      </div>
    </section>
  );
}

export function Footer({ t }) {
  return (
    <footer className="wrap">
      <div className="foot">
        <p>{t.footer.line}</p>
        <small>{t.footer.role} · © {new Date().getFullYear()}</small>
      </div>
    </footer>
  );
}

const STEP_ICONS = [Search, Target, PenTool, Layers, RefreshCw, TestTube];

export function CaseStudy({ t, lang, theme, project, back }) {
  const d = project[lang];
  const L = t.cs.labels;
  const Back = lang === "ar" ? ArrowRight : ArrowLeft;
  const Go = lang === "ar" ? ArrowLeft : ArrowRight;

  const next = PROJECTS[(PROJECTS.findIndex((p) => p.id === project.id) + 1) % PROJECTS.length];
  const nextD = next[lang];

  return (
    <article className="cs">
      <div className="wrap">
        <button className="back" onClick={back}>
          <Back size={16} strokeWidth={1.8} aria-hidden="true" />{t.cs.back}
        </button>
        <h1>{d.name}</h1>
        <p className="cs-lead">{d.desc}</p>
        {project.demo && (
          <a className="btn btn-quiet demo" href={project.demo} target="_blank" rel="noreferrer">
            <ExternalLink size={15} strokeWidth={1.8} aria-hidden="true" />{t.cs.demo}
          </a>
        )}

        <div className="metabar">
          {d.meta.map(([k, v]) => (
            <div className="metaitem" key={k}><span>{k}</span><b>{v}</b></div>
          ))}
        </div>

        <div className="cs-cover">
          <Img src={theme === "dark" ? project.coverDark : project.cover} alt=""
               label={d.name} ratio="16 / 10" width="1400" height="875" eager />
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
                <div className="pcell-ico warn"><AlertTriangle size={18} strokeWidth={1.7} aria-hidden="true" /></div>
                <h3>{L.problem}</h3>
                {d.problem.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <div className="pcell">
                <div className="pcell-ico good"><Target size={18} strokeWidth={1.7} aria-hidden="true" /></div>
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
                <li key={r}><Check size={15} strokeWidth={2.2} aria-hidden="true" />{r}</li>
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
                    <div className="flow-ico"><Ico size={19} strokeWidth={1.7} aria-hidden="true" /></div>
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
            {project.shots.map(([src, capAr, capEn, w, h]) => {
              const cap = lang === "ar" ? capAr : capEn;
              return (
                <figure className="shot" key={src}>
                  <Img src={src} alt={`${d.name} — ${cap}`} label={cap}
                       ratio="9 / 19.5" width={w} height={h} />
                  <figcaption>{cap}</figcaption>
                </figure>
              );
            })}
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
            <div className="learn-ico"><Lightbulb size={19} strokeWidth={1.7} aria-hidden="true" /></div>
            <div>
              <h3>{L.learning}</h3>
              <p>{d.learning}</p>
            </div>
          </div>
        </section>

        <div className="cs-end">
          <Link className="endcard" to={`/work/${next.id}`}>
            <span>{t.cs.nextLabel}</span>
            <b>{nextD.name}</b>
            <i>{nextD.desc}</i>
            <span className="endgo">
              {t.work.cta} <Go size={15} strokeWidth={1.9} aria-hidden="true" />
            </span>
          </Link>
          <a className="endcard" href={`mailto:${EMAIL}`}>
            <span>{t.cs.contactLabel}</span>
            <b>{t.cs.contactTitle}</b>
            <i>{t.cs.contactBody}</i>
            <span className="endgo">
              {t.cs.contactCta} <Go size={15} strokeWidth={1.9} aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}
