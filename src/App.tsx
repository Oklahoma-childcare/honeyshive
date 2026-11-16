import { useState, type ReactNode } from "react";
import { SITE, mapUrl } from "./config/site";
import { PHOTOS } from "./config/photos";
import type { PagePath } from "./config/pages";

const LINKS: { label: string; href: PagePath }[] = [
  { label: "Home", href: "/" },
  { label: "Our Hive", href: "/our-hive/" },
  { label: "Age Groups", href: "/age-groups/" },
  { label: "The Day", href: "/the-day/" },
  { label: "For Families", href: "/for-families/" }
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19 19 5M7 5h12v12" /></svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16m-7-7 7 7-7 7" /></svg>
  );
}
function FacebookIcon() {
  return <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M14.2 21v-7.7h2.6l.4-3h-3V8.4c0-.9.3-1.5 1.6-1.5h1.6V4.2c-.3 0-1.2-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.4v1.9H8.1v3h2.8V21h3.3Z" /></svg>;
}
function Sparkle({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 60 60" aria-hidden="true"><path d="M30 0c4.8 18.4 11.6 25.2 30 30-18.4 4.8-25.2 11.6-30 30C25.2 41.6 18.4 34.8 0 30 18.4 25.2 25.2 18.4 30 0Z" fill="currentColor" /></svg>;
}
function Photo({ src, alt, className = "", fallback = "/illustrations/pattern.svg", eager = false }: { src: string; alt: string; className?: string; fallback?: string; eager?: boolean }) {
  return (
    <div className={`photo-frame ${className}`}>
      <img className="photo-underlay" src={fallback} alt="" aria-hidden="true" loading="eager" />
      <img className="photo-image" src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" onError={(event) => { event.currentTarget.style.display = "none"; }} />
    </div>
  );
}
function Button({ children, href, kind = "primary", diagonal = true, external = false }: { children: ReactNode; href: string; kind?: "primary" | "dark" | "outline" | "light"; diagonal?: boolean; external?: boolean }) {
  return <a className={`pill-button pill-button--${kind}`} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}><span>{children}</span><span className="button-arrow"><Arrow diagonal={diagonal} /></span></a>;
}
function HeadingTag({ number, children, light = false }: { number: string; children: ReactNode; light?: boolean }) {
  return <div className={`heading-tag ${light ? "heading-tag--light" : ""}`}><span className="tag-sun" aria-hidden="true">✳</span><span>{number} / {children}</span></div>;
}
function Header({ route }: { route: PagePath }) {
  const [open, setOpen] = useState(false);
  return <>
    <div className="announcement"><div className="container announcement-inner"><span>✳ &nbsp; A sweet little spot in Eufaula, Oklahoma</span><a href={`tel:${SITE.phoneDial}`}>Weekdays · {SITE.hours} <span aria-hidden="true">↗</span></a></div></div>
    <header className="header">
      <div className="container header-inner">
        <a className="wordmark" href="/" aria-label="Honey's Hive, homepage">
          <img src="/branding/logo.png" alt="" width="52" height="52" />
          <span className="wordmark-text"><strong>honey’s <em>hive.</em></strong><small>EARLY CHILD LEARNING CENTER</small></span>
        </a>
        <nav className={`navigation ${open ? "navigation--open" : ""}`} id="site-navigation" aria-label="Main navigation">
          {LINKS.map((link) => <a className={route === link.href ? "nav-active" : ""} aria-current={route === link.href ? "page" : undefined} href={link.href} key={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
          <a className="nav-contact-mobile" href="/contact/" onClick={() => setOpen(false)}>Get in touch ↗</a>
        </nav>
        <a className="header-contact" href="/contact/"><span>Say hello</span><span><Arrow diagonal /></span></a>
        <button className="mobile-toggle" type="button" aria-expanded={open} aria-controls="site-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen((value) => !value)}><span /><span /><span /></button>
      </div>
    </header>
  </>;
}
function Footer() {
  return <footer className="footer">
    <div className="container footer-feature"><p>GOOD THINGS GROW TOGETHER.</p><a href="/contact/">Let’s talk about<br /><em>your little one.</em> <span><Arrow diagonal /></span></a></div>
    <div className="footer-line" />
    <div className="container footer-main">
      <div className="footer-col footer-col-brand"><a className="wordmark wordmark-footer" href="/"><img src="/branding/logo.png" alt="" width="56" height="56"/><span className="wordmark-text"><strong>honey’s <em>hive.</em></strong><small>EARLY CHILD LEARNING CENTER</small></span></a><p>Big wonder. Small moments. A little corner of Eufaula for early learners.</p><div className="footer-socials"><a className="facebook-circle" href={SITE.facebook} title="Find Honey's Hive on Facebook" aria-label="Honey's Hive on Facebook" rel="noopener noreferrer" target="_blank"><FacebookIcon /></a><span>Follow along on Facebook</span></div></div>
      <div className="footer-col"><h3>Find your way</h3><div className="footer-links">{LINKS.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}<a href="/contact/">Contact</a></div></div>
      <div className="footer-col"><h3>Come say hello</h3><div className="footer-links"><p>{SITE.street}<br />{SITE.city}, {SITE.state} {SITE.zip}</p><a href={mapUrl} target="_blank" rel="noopener noreferrer">Get directions ↗</a><a href={`tel:${SITE.phoneDial}`}>{SITE.phoneDisplay}</a><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div></div>
      <div className="footer-col"><h3>The little details</h3><div className="footer-links"><p>{SITE.weekdays}<br />{SITE.hours}</p><a href={SITE.licenseUrl} target="_blank" rel="noopener noreferrer">Oklahoma childcare listing ↗</a><p>Provider ID {SITE.licenseId}</p></div></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} Honey’s Hive Early Child Learning Center</span><span>Rooted in Eufaula, Oklahoma · Made with a little wonder <span aria-hidden="true">✳</span></span></div>
  </footer>;
}
function PageIntro({ number, eyebrow, title, italic, description, tone = "cream" }: { number: string; eyebrow: string; title: string; italic?: string; description: string; tone?: "cream" | "yellow" | "pink" | "sage" }) {
  return <section className={`page-intro page-intro--${tone}`}><div className="container"><HeadingTag number={number}>{eyebrow}</HeadingTag><div className="page-intro-grid"><h1>{title} {italic && <em>{italic}</em>}</h1><p>{description}</p></div><div className="page-intro-decoration" aria-hidden="true">✳</div></div></section>;
}
const ageGroups = [
  { title: "Little seedlings", age: "0–11 months", label: "Infant care", desc: "Those first discoveries happen quickly. Ask the center about nurturing routines, bottles, naps and the little things that help infants feel settled.", question: "What should I pack for my baby?", color: "yellow" },
  { title: "Busy little bees", age: "12–23 months", label: "Toddler care", desc: "As new steps and new words appear, every day brings questions. Explore how toddler routines, movement, meals and playtime are handled.", question: "How are toddler transitions supported?", color: "pink" },
  { title: "Curiosity in bloom", age: "2–4 years", label: "Preschool care", desc: "Preschool years are a beautiful jumble of big feelings and big ideas. Ask what learning experiences, creative time and group routines look like.", question: "What is a typical preschool day?", color: "sage" },
  { title: "Ready for what’s next", age: "5 years & up", label: "School-age care", desc: "For children entering or attending school, ask about age eligibility, available schedules, school breaks and how arrival and pickup work.", question: "Are school-day or break options available?", color: "lavender" }
];
function AgeRow({ index, item }: { index: number; item: typeof ageGroups[number] }) {
  return <a className={`age-row age-row--${item.color}`} href="/age-groups/" key={item.title}><span className="age-index">0{index + 1}</span><span className="age-text"><small>{item.label} <span aria-hidden="true">✺</span> {item.age}</small><strong>{item.title}</strong></span><span className="age-motif" aria-hidden="true">{["✳", "☼", "✿", "✱"][index]}</span><span className="age-arr"><Arrow diagonal /></span></a>;
}
function Home() {
  return <>
    <section className="hero"><div className="container hero-layout">
      <div className="hero-left"><div className="eyebrow">✳ &nbsp; BIG WONDER FOR LITTLE PEOPLE</div><h1>Small<br />hands. <span className="hero-hand">Big</span><br /><em>wonder.</em></h1><p>There’s something beautiful about watching little minds grow. Discover Honey’s Hive, a child learning center serving families in Eufaula, Oklahoma.</p><div className="hero-actions"><Button href="/age-groups/">Explore age groups</Button><a className="underlined-link" href="/our-hive/">Get to know the hive <Arrow diagonal /></a></div><div className="hero-bottom-note"><span className="bee-dash">☼</span> A place to explore childhood, one discovery at a time.</div></div>
      <div className="hero-right"><div className="hero-photo-shell"><Photo src={PHOTOS.hero} alt="Children learning together during a creative activity (illustrative stock photo)" fallback="/illustrations/hero.svg" className="hero-picture" eager /><div className="hero-squiggle" aria-hidden="true">♡</div><div className="hero-rotated-label">A LITTLE MORE WONDER EVERY DAY</div></div><div className="bee-sticker"><img src="/branding/logo.png" alt="" /><span>hello,<br />sunshine!</span></div><Sparkle className="hero-sparkle" /></div>
    </div><div className="hero-bottom-wave" aria-hidden="true" /></section>
    <section className="fact-strip"><div className="container facts-grid"><div className="fact"><span className="fact-big">07<span>am</span></span><p>Weekday opening<br /><strong>7:00 AM–5:30 PM</strong></p></div><div className="fact"><span className="fact-big">04</span><p>Accepted<br /><strong>age groups</strong></p></div><div className="fact"><span className="fact-big">03<span>✳</span></span><p>Star-level<br /><strong>Oklahoma listing</strong></p></div></div></section>
    <section className="section age-section"><div className="container"><div className="split-heading"><div><HeadingTag number="01">GROW AT YOUR OWN PACE</HeadingTag><h2>Every age is a<br /><em>new adventure.</em></h2></div><p>From tiny firsts to big kid energy, the state childcare listing includes care for four age groups. Find your child’s stage and start the conversation.</p></div><div className="age-table">{ageGroups.map((item, index) => <AgeRow index={index} item={item} key={item.title} />)}</div><div className="end-link"><a href="/age-groups/">Discover every age group <Arrow diagonal /></a></div></div></section>
    <section className="photo-story"><div className="photo-story-left"><div className="story-content"><HeadingTag number="02" light>THIS IS WHERE WONDER BEGINS</HeadingTag><h2>Let them<br /><em>be little.</em></h2><p>In the early years, even ordinary moments can feel extraordinary. A book, a color, a question, a new friend. Find out what everyday learning can look like.</p><Button href="/the-day/" kind="light">Explore the day</Button></div><div className="story-outline" aria-hidden="true">hive</div></div><div className="photo-story-right"><Photo src={PHOTOS.reading} alt="Teacher sharing a picture book with young children (illustrative stock photo)" fallback="/illustrations/story.svg" /><div className="photo-caption">the magic is in the little moments ↗</div></div></section>
    <section className="section hello-section"><div className="container hello-grid"><div className="hello-title"><HeadingTag number="03">EASY AS ONE, TWO, BEE</HeadingTag><h2>A sweet start<br />is just a <em>hello</em><span>.</span></h2></div><div className="hello-steps"><div><span>01</span><h3>Explore</h3><p>Check out the age groups, hours and childcare listing.</p></div><div><span>02</span><h3>Reach out</h3><p>Call or email to ask about openings, schedules and tuition.</p></div><div><span>03</span><h3>Get acquainted</h3><p>Ask the center about a visit and its enrollment process.</p></div></div></div></section>
    <section className="local-section"><div className="container local-inner"><div className="local-art"><div className="local-art-frame"><Photo src={PHOTOS.blocks} alt="Children building with colorful blocks (illustrative stock photo)" fallback="/illustrations/pattern.svg" /></div><div className="local-stamp">MADE FOR<br />LITTLE<br />MOMENTS ✳</div></div><div className="local-copy"><HeadingTag number="04">RIGHT HERE IN EUFAULA</HeadingTag><h2>Small town.<br /><em>Big heart.</em></h2><p>Honey’s Hive is located on West Highway 9 in Eufaula, Oklahoma. Families can reach the center directly for current enrollment details.</p><div className="local-lines"><div><span>FIND US</span><strong>{SITE.street}<br />{SITE.city}, {SITE.state} {SITE.zip}</strong></div><div><span>GIVE US A CALL</span><strong>{SITE.phoneDisplay}</strong></div></div><Button href="/contact/" kind="dark">Find us &amp; say hello</Button></div></div></section>
  </>;
}
function OurHive() {
  return <>
    <PageIntro number="01" eyebrow="A LITTLE INTRODUCTION" title="Hello from" italic="the hive." description="A small place name with a lot of heart behind it. Get to know the location, the people to contact, and the practical details that help families feel informed." tone="yellow" />
    <section className="section about-editorial"><div className="container about-editorial-grid"><div className="about-photo-block"><Photo src={PHOTOS.group} alt="Young children making colorful art together (illustrative stock photo)" fallback="/illustrations/story.svg" /><span className="about-sticker">little<br />moments<br />matter ✳</span></div><div className="about-editorial-copy"><HeadingTag number="02">WHY THE LITTLE YEARS MATTER</HeadingTag><h2>Every big story<br />starts <em>small.</em></h2><p>First words, favorite stories, new friendships and more questions than one day can hold. The early years are an exciting time for children and the people who love them.</p><p>Honey’s Hive Early Child Learning Center is a state-listed childcare center in Eufaula, Oklahoma. Its listing includes infant, toddler, preschool and school-age care. Families can ask the center about its daily approach, routines, and current availability.</p><div className="about-quote"><span>“</span><p>There is no such thing as a little discovery.</p></div></div></div></section>
    <section className="dark-facts-section"><div className="container"><HeadingTag number="03" light>THE DETAILS THAT MATTER</HeadingTag><div className="dark-facts-top"><h2>A little more about<br /><em>Honey’s Hive.</em></h2><p>These details come from Oklahoma Human Services’ childcare provider listing. Contact the center for current openings or policies.</p></div><div className="dark-fact-list"><div><span>01 / CENTER LOCATION</span><strong>{SITE.street}, {SITE.city}, OK</strong></div><div><span>02 / LISTED DIRECTOR</span><strong>{SITE.director}</strong></div><div><span>03 / OKLAHOMA STAR LEVEL</span><strong>{SITE.stars}-star program</strong></div><div><span>04 / CHILDCARE CAPACITY</span><strong>{SITE.capacity} children</strong></div></div><div className="dark-fact-action"><Button href={SITE.licenseUrl} kind="light" external>View the state listing</Button></div></div></section>
    <section className="section section-discovery"><div className="container discovery-grid"><div><HeadingTag number="04">THINGS TO EXPLORE</HeadingTag><h2>Let’s get to<br /><em>know each other.</em></h2><p>Every family’s needs are different. A few good questions can turn a first conversation into a helpful next step.</p><Button href="/contact/">Start a conversation</Button></div><div className="discovery-note"><p>Questions worth asking</p><ul><li>What does a typical day look like for my child’s age?</li><li>What is the process for visiting or enrolling?</li><li>How do meals, rest and communication work?</li><li>Are there current openings or a waitlist?</li></ul><span className="discovery-icon" aria-hidden="true">✿</span></div></div></section>
  </>;
}
function AgeGroups() {
  return <>
    <PageIntro number="01" eyebrow="LITTLE BY LITTLE" title="Room for every" italic="little stage." description="Infants, toddlers, preschoolers and school-age children: four accepted age groups, each with its own wonders and questions. Explore the stages below." tone="sage" />
    <section className="section age-detail-section"><div className="container"><div className="age-detail-intro"><span>FOUR CHAPTERS OF EARLY CHILDHOOD</span><p>Age ranges are from the Oklahoma childcare listing. Programs, schedules and available spaces should be confirmed with Honey’s Hive directly.</p></div><div className="age-detail-list">
      {ageGroups.map((item, i) => <article className={`age-detail age-detail--${item.color}`} key={item.title} id={["infants", "toddlers", "preschool", "school-age"][i]}><div className="age-detail-no">0{i + 1}.</div><div className="age-detail-body"><span>{item.label} · {item.age}</span><h2>{item.title}</h2><p>{item.desc}</p><div className="age-detail-question">Ask us: {item.question}</div><a href="/contact/">Ask about this age group <Arrow diagonal /></a></div><div className="age-detail-art" aria-hidden="true"><span>{["✳", "☼", "✿", "✱"][i]}</span><span>{["tiny beginnings", "big curiosity", "growing ideas", "what’s next?"][i]}</span></div></article>)}
    </div></div></section>
    <section className="wide-callout"><div className="container wide-callout-inner"><h2>Not sure which<br />stage fits <em>best?</em></h2><div><p>The best way to find out about availability, enrollment ages and classroom routines is to speak with the center.</p><Button href="/contact/" kind="dark">Ask a question</Button></div></div></section>
  </>;
}
const dailyTopics = [
  { number: "01", title: "The first hello", label: "ARRIVAL & SETTLING IN", desc: "Ask about the drop-off window, how new children are welcomed, and what helps little ones feel comfortable at the start of the day." },
  { number: "02", title: "Time to explore", label: "PLAY & DISCOVERY", desc: "What do children explore through play, art, movement, conversation and group activities? Ask how experiences change by age." },
  { number: "03", title: "A quiet little moment", label: "MEALS & REST", desc: "Find out about food, rest schedules, allergies, supplies and the routines that make the day run smoothly." },
  { number: "04", title: "Until tomorrow", label: "PICKUP & UPDATES", desc: "Ask how the team shares updates, what the pickup process looks like, and who to contact during the day." }
];
function TheDay() {
  return <>
    <PageIntro number="01" eyebrow="THE LITTLE MOMENTS" title="Wonder fits in" italic="every day." description="A child's day is made of a hundred little things. Here’s a thoughtful guide to the routines and questions families can explore with the center." tone="pink" />
    <section className="the-day-first"><div className="container day-first-grid"><div className="day-first-photo"><Photo src={PHOTOS.art} alt="Young children working together at an art table (illustrative stock photo)" fallback="/illustrations/hero.svg" /><div className="day-photo-label">a little mess can mean a lot of imagination ✳</div></div><div className="day-first-text"><HeadingTag number="02">SMALL MOMENTS, BIG MEANING</HeadingTag><h2>There’s magic<br />in <em>ordinary.</em></h2><p>A shared story. A new color. A puzzle solved together. A song someone remembers all the way home. These are the kinds of everyday experiences families often ask about when exploring early learning.</p><p>Use the guide below to start a conversation about Honey’s Hive’s actual schedule and care routines.</p></div></div></section>
    <section className="section day-timeline"><div className="container"><HeadingTag number="03">YOUR CONVERSATION STARTER</HeadingTag><div className="split-heading"><h2>Let’s talk about<br /><em>the little details.</em></h2><p>These are questions to ask—not a published daily schedule or claims about specific classroom activities at Honey’s Hive.</p></div><div className="timeline-list">{dailyTopics.map((topic) => <div className="timeline-item" key={topic.number}><span className="timeline-dot">{topic.number}</span><div><small>{topic.label}</small><h3>{topic.title}</h3></div><p>{topic.desc}</p></div>)}</div></div></section>
    <section className="photo-canvas"><div className="container photo-canvas-grid"><div className="photo-canvas-copy"><span>AND ALL THE FUN IN BETWEEN ✳</span><h2>Let curious<br />minds <em>grow.</em></h2><Button href="/for-families/" kind="light">Read parent FAQs</Button></div><Photo src={PHOTOS.reading} alt="Children listening to a story together (illustrative stock photo)" fallback="/illustrations/story.svg" /></div></section>
  </>;
}
const questions = [
  { q: "What are Honey's Hive's hours?", a: "The current Oklahoma childcare listing gives Monday–Friday hours of 7:00 AM to 5:30 PM. Weekend hours are listed as closed. Confirm holidays or special closures directly with the center." },
  { q: "Which ages does the center accept?", a: "The state listing includes infants (0–11 months), toddlers (12–23 months), preschool children (2–4 years), and school-age children (5 years and older)." },
  { q: "Does Honey's Hive accept child care subsidy?", a: "Yes. Oklahoma Human Services currently lists the Eufaula location as accepting subsidy. Ask the center and the state program about eligibility, availability and participation details." },
  { q: "Is the center accepting new enrollments?", a: "Current openings and waiting-list information are not published in the available listing. Please call (918) 318-1921 or email the center for an up-to-date answer." },
  { q: "Can I schedule a visit?", a: "Ask the center about its current tour or visit process, available times, and any enrollment documents to bring." },
  { q: "Where can I verify the license?", a: `Honey's Hive – Eufaula appears in the Oklahoma Human Services Child Care Locator under provider ID ${SITE.licenseId}. Use the official listing link on this page to review the current record.` }
];
function Families() {
  return <>
    <PageIntro number="01" eyebrow="A LITTLE PEACE OF MIND" title="All the things" italic="parents ask." description="Good questions deserve clear starting points. Find the essentials, state listing information, and helpful questions for your first conversation." tone="cream" />
    <section className="section parent-dashboard"><div className="container"><HeadingTag number="02">THE AT-A-GLANCE GUIDE</HeadingTag><h2>Here’s what we <em>know.</em></h2><div className="parent-mosaic"><div className="mosaic-cell mosaic-yellow"><span>OPEN WEEKDAYS</span><strong>7:00 <small>AM</small><br />— 5:30 <small>PM</small></strong><p>Monday through Friday</p></div><div className="mosaic-cell mosaic-green"><span>OKLAHOMA STAR LEVEL</span><strong>03<span>✳</span></strong><p>State-listed three-star program</p></div><div className="mosaic-cell mosaic-pink"><span>CAPACITY</span><strong>60</strong><p>State-listed total capacity</p></div><div className="mosaic-cell mosaic-lavender"><span>STATE SUBSIDY</span><strong>Yes!</strong><p>Listed as accepting child care subsidy</p></div></div><p className="source-note">Information reflects the Oklahoma Human Services childcare provider record. For current details, <a href={SITE.licenseUrl} target="_blank" rel="noopener noreferrer">review the official listing ↗</a></p></div></section>
    <section className="section family-faq"><div className="container faq-layout"><div className="faq-head"><HeadingTag number="03">THE FREQUENTLY ASKED THINGS</HeadingTag><h2>Good questions.<br /><em>Helpful answers.</em></h2><p>There’s plenty to think about when choosing childcare. These answers are grounded in publicly listed details; the center can confirm current policies.</p><Photo src={PHOTOS.portrait} alt="Children at a preschool art table (illustrative stock photo)" fallback="/illustrations/hero.svg" /></div><div className="faq-list">{questions.map((item, index) => <details key={item.q}><summary><span>0{index + 1}</span><strong>{item.q}</strong><span className="faq-plus">+</span></summary><p>{item.a}</p></details>)}</div></div></section>
    <section className="checklist-section"><div className="container checklist-inner"><div><HeadingTag number="04">READY FOR A FIRST CONVERSATION?</HeadingTag><h2>Bring your<br /><em>curiosity.</em></h2><p>A tiny checklist to make that first call easier.</p></div><ul><li><span>✓</span> Child’s age and preferred start date</li><li><span>✓</span> Days and hours of care needed</li><li><span>✓</span> Questions about tuition and subsidies</li><li><span>✓</span> Questions about meals, rest and supplies</li></ul><Button href="/contact/" kind="dark">Contact the center</Button></div></section>
  </>;
}
function Contact() {
  return <>
    <PageIntro number="01" eyebrow="SAY HELLO" title="We’d love to" italic="hear from you." description="Questions about enrollment, care, or finding the center? Here are the quickest ways to reach Honey’s Hive in Eufaula, Oklahoma." tone="yellow" />
    <section className="section contact-section"><div className="container contact-layout"><div className="contact-left"><HeadingTag number="02">COME ON IN, SAY HELLO</HeadingTag><h2>Let’s start<br />with a <em>hello.</em></h2><div className="contact-method"><span>GIVE THE CENTER A CALL</span><a href={`tel:${SITE.phoneDial}`}>{SITE.phoneDisplay} ↗</a></div><div className="contact-method"><span>SEND AN EMAIL</span><a href={`mailto:${SITE.email}`}>{SITE.email} ↗</a></div><div className="contact-method"><span>FIND THE CENTER</span><a href={mapUrl} target="_blank" rel="noopener noreferrer">{SITE.street}<br />{SITE.city}, OK {SITE.zip} ↗</a></div><div className="contact-method"><span>WEEKDAY HOURS</span><p>{SITE.weekdays}<br />{SITE.hours}</p></div><div className="contact-flower" aria-hidden="true">✿</div></div>
      <div className="contact-form-panel"><div className="contact-form-top"><div><span className="small-overline">A LITTLE NOTE</span><h2>Write a little <em>hello.</em></h2></div><span aria-hidden="true">✳</span></div><p>Fill this in to prepare an email to the center. Selecting “Open my email” launches your email app; this website does not store or submit your information.</p><form className="contact-form" action={`mailto:${SITE.email}?subject=${encodeURIComponent("Honey's Hive childcare inquiry")}`} method="post" encType="text/plain"><div className="form-row"><label>YOUR NAME<input name="Name" type="text" autoComplete="name" placeholder="Your full name" required /></label><label>YOUR EMAIL<input name="Email" type="email" autoComplete="email" placeholder="name@example.com" required /></label></div><div className="form-row"><label>PHONE NUMBER<input name="Phone" type="tel" autoComplete="tel" placeholder="(000) 000-0000" /></label><label>CHILD’S AGE<select name="Child age" defaultValue=""><option value="" disabled>Select an age range</option><option>Infant (0–11 months)</option><option>Toddler (12–23 months)</option><option>Preschool (2–4 years)</option><option>School-age (5+ years)</option><option>Other / not sure</option></select></label></div><label>WHAT WOULD YOU LIKE TO ASK?<textarea name="Message" rows={5} placeholder="Tell us a little about what you are looking for..." required /></label><button type="submit" className="form-send"><span>Open my email</span><span><Arrow diagonal /></span></button><small>Prefer to speak directly? <a href={`tel:${SITE.phoneDial}`}>Call {SITE.phoneDisplay}</a>.</small></form></div>
    </div></section>
    <section className="directions-section"><div className="container directions-layout"><div className="directions-map"><div className="map-pattern" aria-hidden="true"/><div className="map-center"><img src="/branding/logo.png" alt="" /><strong>Honey’s Hive</strong><span>{SITE.city}, Oklahoma</span></div></div><div className="directions-info"><HeadingTag number="03">FIND US IN EUFAULA</HeadingTag><h2>Right around<br /><em>the corner.</em></h2><p>{SITE.street}<br />{SITE.city}, {SITE.state} {SITE.zip}</p><Button href={mapUrl} kind="dark" external>Open Google Maps</Button></div></div></section>
  </>;
}
export function App({ route }: { route: PagePath }) {
  const page = {
    "/": <Home />,
    "/our-hive/": <OurHive />,
    "/age-groups/": <AgeGroups />,
    "/the-day/": <TheDay />,
    "/for-families/": <Families />,
    "/contact/": <Contact />
  }[route];
  return <><a className="skip-link" href="#main">Skip to main content</a><Header route={route} /><main id="main">{page}</main><Footer /></>;
}
