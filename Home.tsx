/**
 * STYLE REMINDER — «خطّ الإصابة»: tactical neo-brutalism with asymmetrical routes,
 * black/charcoal field, crimson decision points, and precise silver details.
 */
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Crosshair,
  Gamepad2,
  Languages,
  Layers3,
  Mail,
  Menu,
  Radio,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

type Language = "ar" | "en";

const translations = {
  ar: {
    nav: ["ماذا نصنع", "المشاريع", "تواصل"],
    eyebrow: "TWO SHOTS GAME STUDIO",
    titleLead: "كل قرار",
    titleAccent: "له إصابة.",
    heroLede: "نصنع ألعاب أكشن مركّزة؛ عوالم مشدودة، حركة دقيقة، ولحظات يبقى أثرها بعد أن تنتهي الجولة.",
    explore: "اكتشف ما نصنعه",
    startTalk: "ابدأ محادثة",
    scroll: "SCROLL TO ENGAGE",
    capabilities: "قدراتنا",
    whatWeDo: "ماذا نصنع",
    servicesTitleLead: "نحوّل الفكرة إلى",
    servicesTitleAccent: "لحظة تستحق اللعب.",
    servicesIntro: "من أول خريطة ذهنية وحتى آخر اختبار، فريقنا يعمل على التجربة التي يشعر بها اللاعب في يده قبل أن يصفها بكلمات.",
    projectFiles: "ملفات المشاريع",
    projectTitleLead: "المشاريع",
    projectTitleAccent: "قيد الاختيار.",
    projectIntro: "سنضيف ملفات الألعاب هنا فور تحديد المشاريع التي تمثل Two Shots في الإطلاق القادم.",
    projectPending: "لم يتم اختيار المشاريع بعد",
    projectPendingNote: "ننتظر تأكيد قائمة الألعاب لنحوّل هذا القسم إلى ملفاتها الرسمية.",
    contactLine: "قناة اتصال",
    missionStatus: "OPEN FOR NEW MISSIONS",
    letsTalk: "لنتحدث",
    contactTitleLead: "عندك فكرة؟",
    contactTitleAccent: "نحدد الهدف.",
    contactBody: "للمشاريع، الشراكات، أو أي رسالة تصل إلينا قبل أن تصل لأي مكان آخر.",
    writeNow: "اكتب لنا الآن",
    general: "استفسارات عامة",
    partnerships: "شراكات",
    footerTagline: "ONE IN THE HEART. ONE IN THE HEAD.",
    foundedBy: "تأسيس وتطوير: ياسين الشافعي × أحمد زايد",
    languageLabel: "English",
  },
  en: {
    nav: ["WHAT WE DO", "PROJECTS", "CONTACT"],
    eyebrow: "TWO SHOTS GAME STUDIO",
    titleLead: "Every choice",
    titleAccent: "lands.",
    heroLede: "We build focused action games: tense worlds, precise movement, and moments that stay with players long after the round ends.",
    explore: "Explore what we do",
    startTalk: "Start a conversation",
    scroll: "SCROLL TO ENGAGE",
    capabilities: "CAPABILITIES",
    whatWeDo: "WHAT WE DO",
    servicesTitleLead: "We turn an idea into",
    servicesTitleAccent: "a moment worth playing.",
    servicesIntro: "From the first sketch through the last test, we shape the experience players feel in their hands before they can describe it.",
    projectFiles: "PROJECT FILES",
    projectTitleLead: "Projects are",
    projectTitleAccent: "pending selection.",
    projectIntro: "Game files will appear here once the projects that represent the next Two Shots release are confirmed.",
    projectPending: "NO PROJECTS SELECTED YET",
    projectPendingNote: "We are waiting for the confirmed game list before opening the official project files.",
    contactLine: "COMMS CHANNEL",
    missionStatus: "OPEN FOR NEW MISSIONS",
    letsTalk: "LET'S TALK",
    contactTitleLead: "Have an idea?",
    contactTitleAccent: "Set the target.",
    contactBody: "For new projects, partnerships, or the message that needs to land before it goes anywhere else.",
    writeNow: "Write to us now",
    general: "GENERAL INQUIRIES",
    partnerships: "PARTNERSHIPS",
    footerTagline: "ONE IN THE HEART. ONE IN THE HEAD.",
    foundedBy: "Founded & developed by Yaseen Elshafey × Ahmed Zayed",
    languageLabel: "العربية",
  },
} as const;

const serviceTranslations = {
  ar: [
    { title: "اللعبة تبدأ من قرار واحد.", body: "نحوّل الفكرة إلى حلقة لعب واضحة: هدف، مخاطرة، إيقاع، ومكافأة تجعل اللاعب يعود للجولة التالية." },
    { title: "عوالم لها وزن وصوت.", body: "نبني المساحات والأنظمة البصرية التي تمنح كل خريطة شخصية، من أول مسار إلى آخر تفصيلة ضوء وصدى." },
    { title: "نختبر الإحساس، لا الأرقام فقط.", body: "نصقل الحركة والقتال والتغذية الراجعة حتى تصبح الاستجابة طبيعية، مُرضية، وجديرة بالتحدي." },
  ],
  en: [
    { title: "A game starts with one decision.", body: "We turn the premise into a clear play loop: objective, risk, rhythm, and a reward that earns the next round." },
    { title: "Worlds with weight and sound.", body: "We build spaces and visual systems that give every map a character—from first route to last detail of light and echo." },
    { title: "We test the feeling, not numbers alone.", body: "We refine movement, combat, and feedback until every response feels natural, satisfying, and worth the challenge." },
  ],
} as const;

const serviceMeta = [
  { id: "01", icon: Crosshair, label: "GAME DESIGN" },
  { id: "02", icon: Layers3, label: "WORLD FORGE" },
  { id: "03", icon: Gamepad2, label: "PLAYTEST LAB" },
];

const contactEmails = ["twoshots1771@gmail.com", "shotone1771@gmail.com", "shottwo1771@gmail.com"];
const gmailComposeUrl = (email: string) => `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent("Message for Two Shots")}`;

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>(() => new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "ar");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = translations[language];
  const direction = language === "ar" ? "rtl" : "ltr";
  const services = serviceMeta.map((service, index) => ({ ...service, ...serviceTranslations[language][index] }));
  const navItems = [
    { label: t.nav[0], target: "what-we-do" },
    { label: t.nav[1], target: "projects" },
    { label: t.nav[2], target: "contact" },
  ];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.title = language === "ar" ? "Two Shots — استوديو ألعاب" : "Two Shots — Game Studio";
    const url = new URL(window.location.href);
    url.searchParams.set("lang", language);
    window.history.replaceState({}, "", url);
  }, [direction, language]);

  const toggleLanguage = () => {
    setLanguage((current) => (current === "ar" ? "en" : "ar"));
    setMenuOpen(false);
  };

  return (
    <div className="site-frame" dir={direction}>
      <header className="topbar">
        <a className="brand-lockup" href="#top" aria-label="Two Shots home" onClick={() => setMenuOpen(false)}>
          <img src="./manus-storage/two-shots-target-mark_bbaeeb36.png" alt="" className="brand-mark" />
          <span className="brand-name">TWO SHOTS</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item, index) => (
            <a href={`#${item.target}`} key={item.target}>
              <span>0{index + 1}</span>{item.label}
            </a>
          ))}
        </nav>

        <div className="header-controls">
          <button className="language-toggle" type="button" onClick={toggleLanguage} aria-label={`Switch language to ${t.languageLabel}`}>
            <Languages size={15} />
            <span>{t.languageLabel}</span>
          </button>
          <button
            className="menu-trigger"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
            {navItems.map((item, index) => (
              <a href={`#${item.target}`} key={item.target} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span>{item.label}<ArrowDownRight size={18} />
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <img className="hero-art" src="./manus-storage/two-shots-hero-operations_6004804c.jpg" alt="" aria-hidden="true" />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="target-grid hero-grid" aria-hidden="true" />

          <div className="hero-rail" aria-hidden="true">
            <span>DEPLOYMENT / 001</span><i /><span>GAME STUDIO</span>
          </div>

          <motion.div className="hero-copy" dir={direction} initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.09 } } }}>
            <motion.p className="eyebrow" variants={reveal}><span className="live-dot" />{t.eyebrow}</motion.p>
            <motion.h1 id="hero-title" variants={reveal}>{t.titleLead}<br /><em>{t.titleAccent}</em></motion.h1>
            <motion.p className="hero-lede" variants={reveal}>{t.heroLede}</motion.p>
            <motion.div className="hero-actions" variants={reveal}>
              <a className="action-button action-button--red" href="#what-we-do">{t.explore} <ArrowDownRight size={19} /></a>
              <a className="text-action" href="#contact">{t.startTalk} <span>↗</span></a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-logo-stage"
            initial={{ opacity: 0, scale: 0.96, x: 26 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="logo-stage-label">TWO SHOTS / EST. 2026</span>
            <img src="./manus-storage/two-shots-logo_378234ee.jfif" alt="Two Shots logo" className="hero-logo" />
            <span className="logo-stage-note">ONE IN THE HEART. ONE IN THE HEAD.</span>
          </motion.div>

          <a className="hero-scroll" href="#what-we-do" aria-label="Scroll to what we do"><span>{t.scroll}</span><ArrowDownRight size={19} /></a>
        </section>

        <section className="command-section" id="what-we-do" aria-labelledby="services-title">
          <div className="section-kicker"><Crosshair size={14} /><span>01 / {t.whatWeDo}</span><i /><span>{t.capabilities}</span></div>
          <div className="command-heading">
            <div>
              <p className="eyebrow">{t.whatWeDo}</p>
              <h2 id="services-title">{t.servicesTitleLead}<br /><em>{t.servicesTitleAccent}</em></h2>
            </div>
            <p className="section-intro">{t.servicesIntro}</p>
          </div>
          <div className="service-stream">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article className="service-item" key={service.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.45, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}>
                  <div className="service-index">{service.id}</div>
                  <div className="service-symbol"><Icon size={25} strokeWidth={1.45} /></div>
                  <div className="service-content">
                    <p className="service-label">{service.label}</p>
                    <h3>{service.title}</h3>
                    <p>{service.body}</p>
                  </div>
                  <div className="service-arrow" aria-hidden="true"><ArrowUpRight size={24} /></div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="projects-section" id="projects" aria-labelledby="projects-title">
          <div className="target-grid projects-grid" aria-hidden="true" />
          <div className="project-section-head">
            <div>
              <p className="eyebrow"><Crosshair size={14} /> {t.projectFiles}</p>
              <h2 id="projects-title">{t.projectTitleLead}<br /><em>{t.projectTitleAccent}</em></h2>
            </div>
            <p>{t.projectIntro}</p>
          </div>
          <motion.div className="project-pending" initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.52, ease: [0.23, 1, 0.32, 1] }}>
            <div className="pending-topline"><span>TS / 000</span><span>SELECTION STATUS</span></div>
            <div className="pending-body">
              <Crosshair className="pending-reticle" aria-hidden="true" />
              <div>
                <span className="pending-label">PROJECT QUEUE</span>
                <h3>{t.projectPending}</h3>
                <p>{t.projectPendingNote}</p>
              </div>
            </div>
            <div className="pending-progress" aria-hidden="true"><span /></div>
          </motion.div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-target" aria-hidden="true"><Crosshair /></div>
          <div className="contact-topline"><span>02 / {t.contactLine}</span><Radio size={15} /><span>{t.missionStatus}</span></div>
          <div className="contact-content">
            <div>
              <p className="eyebrow">{t.letsTalk}</p>
              <h2 id="contact-title">{t.contactTitleLead}<br /><em>{t.contactTitleAccent}</em></h2>
            </div>
            <div className="contact-copy">
              <p>{t.contactBody}</p>
              <a className="contact-cta" href={gmailComposeUrl(contactEmails[0])} target="_blank" rel="noreferrer"><Mail size={18} />{t.writeNow}<ArrowDownRight size={19} /></a>
            </div>
          </div>
          <div className="email-link-list">
            {contactEmails.map((email) => (
              <a href={gmailComposeUrl(email)} target="_blank" rel="noreferrer" className="email-card" aria-label={`Write an email to ${email}`} key={email}>
                <strong>{email}</strong><ArrowUpRight size={18} />
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer-bar">
        <div className="footer-brand"><span className="footer-dot" /> TWO SHOTS</div>
        <span className="footer-credit">{t.foundedBy}</span>
        <span>{t.footerTagline}</span><span>© 2026</span>
      </footer>
    </div>
  );
}
