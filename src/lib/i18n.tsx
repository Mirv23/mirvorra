import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'hi' | 'en'

/* ------------------------------------------------------------------ */
/*  हिन्दी — official language                                          */
/* ------------------------------------------------------------------ */
const hi = {
  nav: {
    links: [
      { label: 'सेवाएँ', href: '#services' },
      { label: 'प्रक्रिया', href: '#process' },
      { label: 'प्रोजेक्ट्स', href: '#work' },
      { label: 'क्यों हम', href: '#why' },
      { label: 'FAQ', href: '#faq' },
      { label: 'संपर्क', href: '#contact' },
    ],
    location: 'मुंबई, भारत',
    cta: 'प्रोजेक्ट शुरू करें',
    email: 'hello@nirmaan.tech',
    menuTagline: 'फ़ुल-साइकिल डेवलपमेंट — 2014 से',
  },
  preloader: { tag: 'फ़ुल-साइकिल डेवलपमेंट कंपनी' },
  hero: {
    badge: 'वेब · मोबाइल · क्लाउड — 2014 से',
    l1: 'विचार से',
    l2: 'लॉन्च तक.',
    sub: '10+ वर्षों का अनुभव। बैकएंड से DevOps तक — हम आपका प्रोडक्ट A से Z तक बनाते हैं।',
    cta: 'प्रोजेक्ट शुरू करें',
    cta2: 'सेवाएँ देखें',
    scroll: 'स्क्रॉल',
    left: 'मुंबई — भारत',
    right: 'EST. 2014',
  },
  strip: ['बैकएंड', 'फ्रंटएंड', 'मोबाइल ऐप्स', 'DevOps और क्लाउड', 'UI/UX डिज़ाइन', 'QA और टेस्टिंग', '24/7 सपोर्ट'],
  about: {
    eyebrow: 'हमारे बारे में',
    scrub:
      'निर्माण एक फ़ुल-साइकिल डेवलपमेंट कंपनी है — 10 से अधिक वर्षों से हम विचारों को प्रोडक्ट में बदल रहे हैं। वेब, मोबाइल, क्लाउड और DevOps — सब कुछ एक ही छत के नीचे।',
    stats: [
      { to: 10, suffix: '+', label: 'वर्षों का अनुभव' },
      { to: 120, suffix: '+', label: 'प्रोजेक्ट डिलीवर' },
      { to: 40, suffix: '+', label: 'सक्रिय क्लाइंट' },
      { to: 24, suffix: '/7', label: 'सपोर्ट और मॉनिटरिंग' },
    ],
  },
  services: {
    eyebrow: 'सेवाएँ',
    titleA: 'हम क्या',
    titleB: 'बनाते हैं',
    items: [
      { title: 'बैकएंड इंजीनियरिंग', tag: 'API · माइक्रोसर्विसेज़', desc: 'Node.js, Go, Python और Java में स्केलेबल आर्किटेक्चर। API डिज़ाइन, डेटाबेस और इंटीग्रेशन — करोड़ों रिक्वेस्ट संभालने वाले सिस्टम।' },
      { title: 'फ्रंटएंड डेवलपमेंट', tag: 'React · Next.js', desc: 'तेज़, सुंदर और एक्सेसिबल इंटरफ़ेस। React, Next.js और TypeScript — पिक्सेल-परफ़ेक्ट और परफ़ॉर्मेंस-फ़र्स्ट।' },
      { title: 'मोबाइल ऐप्स', tag: 'iOS · Android', desc: 'नेटिव और क्रॉस-प्लेटफ़ॉर्म ऐप्स — React Native, Flutter, Swift और Kotlin। स्टोर सबमिशन से ग्रोथ एनालिटिक्स तक।' },
      { title: 'DevOps और क्लाउड', tag: 'AWS · Kubernetes', desc: 'CI/CD पाइपलाइन, इन्फ्रास्ट्रक्चर-एज़-कोड और ऑटो-स्केलिंग। AWS, GCP और Azure पर भरोसेमंद, सुरक्षित सिस्टम।' },
      { title: 'UI/UX डिज़ाइन', tag: 'रिसर्च · डिज़ाइन सिस्टम', desc: 'यूज़र रिसर्च से डिज़ाइन सिस्टम तक। ऐसे इंटरफ़ेस जो सिर्फ़ सुंदर नहीं — कन्वर्ट भी करते हैं।' },
      { title: 'QA और टेस्टिंग', tag: 'ऑटोमेशन · सुरक्षा', desc: 'ऑटोमेटेड टेस्ट सूट, परफ़ॉर्मेंस और सिक्योरिटी ऑडिट। हर रिलीज़ — बिना डर के।' },
      { title: 'सपोर्ट और स्केलिंग', tag: '24/7 · SLA', desc: 'लॉन्च के बाद भी हम साथ हैं — 24/7 मॉनिटरिंग, SLA सपोर्ट और लगातार सुधार।' },
    ],
  },
  process: {
    eyebrow: 'कार्य-पद्धति',
    titleA: 'A से Z तक,',
    titleB: 'एक साफ़ प्रक्रिया.',
    sub: 'कोई सरप्राइज़ नहीं — हर हफ़्ते डेमो, हर स्प्रिंट में डिलीवरी, और हर कदम पर पूरी पारदर्शिता।',
    cta: 'प्रोजेक्ट शुरू करें',
    phases: [
      { n: '01', title: 'डिस्कवरी और प्लानिंग', desc: 'स्कोप, टेक-स्टैक और आर्किटेक्चर तय होते हैं। 1–2 हफ़्तों में आपको मिलती है साफ़ रोडमैप और सटीक एस्टिमेट।' },
      { n: '02', title: 'डिज़ाइन और प्रोटोटाइप', desc: 'UX फ़्लो, UI डिज़ाइन और क्लिक करने योग्य प्रोटोटाइप — कोड की पहली लाइन से पहले ही आप प्रोडक्ट देख लेते हैं।' },
      { n: '03', title: 'डेवलपमेंट', desc: 'दो हफ़्ते के स्प्रिंट, हर शुक्रवार डेमो। बैकएंड, फ्रंटएंड और मोबाइल — समानांतर ट्रैक पर।' },
      { n: '04', title: 'लॉन्च और स्केल', desc: 'CI/CD, मॉनिटरिंग और लोड टेस्टिंग — फिर लॉन्च के बाद 24/7 सपोर्ट। आपका प्रोडक्ट बढ़ता है, हम संभालते हैं।' },
    ],
  },
  work: {
    eyebrow: 'चुने हुए प्रोजेक्ट्स',
    titleA: 'काम जो',
    titleB: 'बोलता है',
    drag: 'खींचें',
    items: [
      { tag: 'फिनटेक', client: 'FinPay', result: '1M+ यूज़र्स', desc: 'मोबाइल बैंकिंग ऐप — UPI, कार्ड्स और इन्वेस्टमेंट, एक ही ऐप में।' },
      { tag: 'ई-कॉमर्स', client: 'KartHub', result: '×3 GMV', desc: 'B2B मार्केटप्लेस — 18 महीनों में GMV तीन गुना।' },
      { tag: 'लॉजिस्टिक्स', client: 'LogiTrack', result: '−38% लागत', desc: 'रियल-टाइम फ़्लीट ट्रैकिंग और रूट ऑप्टिमाइज़ेशन SaaS।' },
      { tag: 'हेल्थकेयर', client: 'MediCare+', result: '50k+ अपॉइंटमेंट/माह', desc: 'टेलीमेडिसिन पोर्टल — बुकिंग, कंसल्टेशन और e-प्रिस्क्रिप्शन।' },
      { tag: 'मीडिया', client: 'StreamBox', result: '99.99% अपटाइम', desc: 'OTT स्ट्रीमिंग प्लेटफ़ॉर्म — 4K, मल्टी-डिवाइस, ऑटो-स्केलिंग।' },
    ],
  },
  why: {
    eyebrow: 'क्यों निर्माण',
    titleA: 'एक टीम,',
    titleB: 'पूरा स्टैक.',
    cards: [
      { title: 'सीनियर इंजीनियरिंग टीम', desc: 'औसतन 8+ वर्षों के अनुभव वाले इंजीनियर — कोई जूनियर एक्सपेरिमेंट नहीं।' },
      { title: 'A से Z डिलीवरी', desc: 'डिस्कवरी से लॉन्च तक एक ही पार्टनर — कोई हैंडऑफ़, कोई फ्रिक्शन नहीं।' },
      { title: 'पारदर्शी प्रक्रिया', desc: 'हर हफ़्ते डेमो, खुला बोर्ड, सीधी बात। आप हमेशा जानते हैं कि काम कहाँ तक पहुँचा।' },
      { title: 'ग्लोबल डिलीवरी', desc: 'भारत में इंजीनियरिंग हब, दुनिया भर में क्लाइंट — हर टाइमज़ोन में ओवरलैप।' },
      { title: 'सिद्ध परिणाम', desc: 'हम फ़ीचर नहीं, नतीजे डिलीवर करते हैं — रेवेन्यू, रिटेंशन, परफ़ॉर्मेंस।' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'अक्सर पूछे जाने वाले सवाल',
    box: 'और सवाल हैं? हमारी टीम 24 घंटे के भीतर जवाब देती है।',
    boxCta: 'संपर्क करें',
    filters: [
      { id: 'all', label: 'सभी' },
      { id: 'start', label: 'शुरुआत' },
      { id: 'process', label: 'प्रक्रिया' },
      { id: 'delivery', label: 'डिलीवरी' },
    ],
    items: [
      { q: 'आप किन टेक्नोलॉजीज़ के साथ काम करते हैं?', a: 'बैकएंड: Node.js, Go, Python, Java। फ्रंटएंड: React, Next.js, Vue। मोबाइल: React Native, Flutter, Swift, Kotlin। क्लाउड: AWS, GCP, Azure।', cat: 'start' },
      { q: 'एक प्रोजेक्ट में कितना समय लगता है?', a: 'MVP आम तौर पर 8–12 हफ़्तों में लॉन्च होता है। बड़े प्लेटफ़ॉर्म 4–6 महीने लेते हैं। पहले हफ़्ते में ही आपको सटीक टाइमलाइन मिल जाती है।', cat: 'delivery' },
      { q: 'कीमत कैसे तय होती है?', a: 'दो मॉडल: फ़िक्स्ड प्राइस (साफ़ स्कोप के लिए) या टाइम एंड मटीरियल (लंबे सहयोग के लिए)। दोनों में हफ़्तेवार रिपोर्टिंग शामिल है।', cat: 'start' },
      { q: 'क्या आप मौजूदा प्रोजेक्ट संभाल सकते हैं?', a: 'हाँ — हम कोड ऑडिट से शुरू करते हैं, फिर टीम को चरणबद्ध तरीक़े से ऑनबोर्ड करते हैं। लेगेसी रेस्क्यू हमारी खासियत है।', cat: 'process' },
      { q: 'लॉन्च के बाद सपोर्ट कैसा है?', a: 'SLA-आधारित 24/7 मॉनिटरिंग, बग-फ़िक्स और नए फ़ीचर्स की निरंतर डिलीवरी — आपके चुने हुए प्लान के अनुसार।', cat: 'delivery' },
      { q: 'NDA और IP का क्या?', a: 'पहली मीटिंग से पहले NDA साइन होता है। पूरा कोड और IP — 100% आपका। कॉन्ट्रैक्ट में यह स्पष्ट लिखा होता है।', cat: 'process' },
    ],
  },
  contact: {
    eyebrow: 'संपर्क',
    titleA: 'कोई प्रोजेक्ट',
    titleB: 'दिमाग़ में?',
    sub: '48 घंटे में विस्तृत जवाब — एस्टिमेट और रोडमैप के साथ। हिन्दी या English में।',
    ring: 'फ्री कंसल्टेशन — 48 घंटे में जवाब — फ्री कंसल्टेशन — 48 घंटे में जवाब — ',
    btn: 'लिखिए हमें',
  },
  footer: {
    brand: 'निर्माण टेक्नोलॉजीज़',
    blurb: 'फ़ुल-साइकिल डेवलपमेंट कंपनी — वेब, मोबाइल, क्लाउड और DevOps। 2014 से।',
    colNav: 'नेविगेशन',
    colServices: 'सेवाएँ',
    colContact: 'संपर्क',
    servicesLinks: ['बैकएंड', 'फ्रंटएंड', 'मोबाइल ऐप्स', 'DevOps'],
    rights: 'सर्वाधिकार सुरक्षित',
    tagline: 'विचार से लॉन्च तक',
  },
}

/* ------------------------------------------------------------------ */
/*  English                                                            */
/* ------------------------------------------------------------------ */
const en: typeof hi = {
  nav: {
    links: [
      { label: 'Services', href: '#services' },
      { label: 'Process', href: '#process' },
      { label: 'Work', href: '#work' },
      { label: 'Why us', href: '#why' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
    location: 'Mumbai, India',
    cta: 'Start a project',
    email: 'hello@nirmaan.tech',
    menuTagline: 'Full-cycle development — since 2014',
  },
  preloader: { tag: 'Full-cycle development company' },
  hero: {
    badge: 'Web · Mobile · Cloud — since 2014',
    l1: 'From idea',
    l2: 'to launch.',
    sub: '10+ years of experience. From backend to DevOps — we build your product from A to Z.',
    cta: 'Start a project',
    cta2: 'See services',
    scroll: 'Scroll',
    left: 'Mumbai — India',
    right: 'EST. 2014',
  },
  strip: ['Backend', 'Frontend', 'Mobile apps', 'DevOps & Cloud', 'UI/UX Design', 'QA & Testing', '24/7 Support'],
  about: {
    eyebrow: 'About us',
    scrub:
      'Nirmaan is a full-cycle development company — for over 10 years we have been turning ideas into products. Web, mobile, cloud and DevOps — everything under one roof.',
    stats: [
      { to: 10, suffix: '+', label: 'years of experience' },
      { to: 120, suffix: '+', label: 'projects delivered' },
      { to: 40, suffix: '+', label: 'active clients' },
      { to: 24, suffix: '/7', label: 'support & monitoring' },
    ],
  },
  services: {
    eyebrow: 'Services',
    titleA: 'What we',
    titleB: 'build',
    items: [
      { title: 'Backend Engineering', tag: 'API · Microservices', desc: 'Scalable architectures in Node.js, Go, Python and Java. API design, databases and integrations — systems that handle millions of requests.' },
      { title: 'Frontend Development', tag: 'React · Next.js', desc: 'Fast, beautiful, accessible interfaces. React, Next.js and TypeScript — pixel-perfect and performance-first.' },
      { title: 'Mobile Apps', tag: 'iOS · Android', desc: 'Native and cross-platform apps — React Native, Flutter, Swift and Kotlin. From store submission to growth analytics.' },
      { title: 'DevOps & Cloud', tag: 'AWS · Kubernetes', desc: 'CI/CD pipelines, infrastructure-as-code and auto-scaling. Reliable, secure systems on AWS, GCP and Azure.' },
      { title: 'UI/UX Design', tag: 'Research · Design systems', desc: 'From user research to design systems. Interfaces that are not just beautiful — they convert.' },
      { title: 'QA & Testing', tag: 'Automation · Security', desc: 'Automated test suites, performance and security audits. Every release — without fear.' },
      { title: 'Support & Scaling', tag: '24/7 · SLA', desc: 'We stay after launch — 24/7 monitoring, SLA support and continuous improvement.' },
    ],
  },
  process: {
    eyebrow: 'Process',
    titleA: 'A to Z,',
    titleB: 'one clean process.',
    sub: 'No surprises — a demo every week, delivery every sprint, and full transparency at every step.',
    cta: 'Start a project',
    phases: [
      { n: '01', title: 'Discovery & Planning', desc: 'Scope, tech stack and architecture get defined. Within 1–2 weeks you get a clear roadmap and a precise estimate.' },
      { n: '02', title: 'Design & Prototype', desc: 'UX flows, UI design and a clickable prototype — you see the product before the first line of code.' },
      { n: '03', title: 'Development', desc: 'Two-week sprints, demo every Friday. Backend, frontend and mobile — on parallel tracks.' },
      { n: '04', title: 'Launch & Scale', desc: 'CI/CD, monitoring and load testing — then 24/7 support after launch. Your product grows, we keep it running.' },
    ],
  },
  work: {
    eyebrow: 'Selected work',
    titleA: 'Work that',
    titleB: 'speaks',
    drag: 'Drag',
    items: [
      { tag: 'Fintech', client: 'FinPay', result: '1M+ users', desc: 'Mobile banking app — UPI, cards and investments in a single app.' },
      { tag: 'E-commerce', client: 'KartHub', result: '×3 GMV', desc: 'B2B marketplace — GMV tripled in 18 months.' },
      { tag: 'Logistics', client: 'LogiTrack', result: '−38% costs', desc: 'Real-time fleet tracking and route optimization SaaS.' },
      { tag: 'Healthcare', client: 'MediCare+', result: '50k+ visits/mo', desc: 'Telemedicine portal — booking, consultations and e-prescriptions.' },
      { tag: 'Media', client: 'StreamBox', result: '99.99% uptime', desc: 'OTT streaming platform — 4K, multi-device, auto-scaling.' },
    ],
  },
  why: {
    eyebrow: 'Why Nirmaan',
    titleA: 'One team,',
    titleB: 'full stack.',
    cards: [
      { title: 'Senior engineering team', desc: 'Engineers with 8+ years of experience on average — no junior experiments.' },
      { title: 'A to Z delivery', desc: 'One partner from discovery to launch — no handoffs, no friction.' },
      { title: 'Transparent process', desc: 'Weekly demos, an open board, straight talk. You always know where the work stands.' },
      { title: 'Global delivery', desc: 'Engineering hub in India, clients worldwide — overlap in every timezone.' },
      { title: 'Proven results', desc: 'We deliver outcomes, not features — revenue, retention, performance.' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    box: 'More questions? Our team replies within 24 hours.',
    boxCta: 'Contact us',
    filters: [
      { id: 'all', label: 'All' },
      { id: 'start', label: 'Getting started' },
      { id: 'process', label: 'Process' },
      { id: 'delivery', label: 'Delivery' },
    ],
    items: [
      { q: 'Which technologies do you work with?', a: 'Backend: Node.js, Go, Python, Java. Frontend: React, Next.js, Vue. Mobile: React Native, Flutter, Swift, Kotlin. Cloud: AWS, GCP, Azure.', cat: 'start' },
      { q: 'How long does a project take?', a: 'An MVP usually launches in 8–12 weeks. Larger platforms take 4–6 months. You get a precise timeline within the first week.', cat: 'delivery' },
      { q: 'How is pricing decided?', a: 'Two models: fixed price (for a clear scope) or time & materials (for long-term collaboration). Both include weekly reporting.', cat: 'start' },
      { q: 'Can you take over an existing project?', a: 'Yes — we start with a code audit, then onboard the team in stages. Legacy rescue is one of our specialties.', cat: 'process' },
      { q: 'What does post-launch support look like?', a: 'SLA-based 24/7 monitoring, bug fixes and continuous delivery of new features — according to the plan you choose.', cat: 'delivery' },
      { q: 'What about NDA and IP?', a: 'An NDA is signed before the first meeting. All code and IP — 100% yours. It is written explicitly in the contract.', cat: 'process' },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    titleA: 'Have a project',
    titleB: 'in mind?',
    sub: 'A detailed reply within 48h — with an estimate and a roadmap. In English or हिन्दी.',
    ring: 'Free consultation — reply within 48h — free consultation — reply within 48h — ',
    btn: 'Write to us',
  },
  footer: {
    brand: 'Nirmaan Technologies',
    blurb: 'Full-cycle development company — web, mobile, cloud and DevOps. Since 2014.',
    colNav: 'Navigation',
    colServices: 'Services',
    colContact: 'Contact',
    servicesLinks: ['Backend', 'Frontend', 'Mobile apps', 'DevOps'],
    rights: 'All rights reserved',
    tagline: 'From idea to launch',
  },
}

export type Dict = typeof hi
const DICTS: Record<Lang, Dict> = { hi, en }

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: 'hi',
  setLang: () => {},
  t: hi,
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('nirmaan-lang')
      return saved === 'en' ? 'en' : 'hi'
    } catch {
      return 'hi'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('nirmaan-lang', lang)
    } catch {
      /* storage unavailable */
    }
    document.documentElement.lang = lang
    document.title =
      lang === 'hi'
        ? 'निर्माण टेक्नोलॉजीज़ — वेब, मोबाइल और क्लाउड डेवलपमेंट'
        : 'Nirmaan Technologies — Web, Mobile & Cloud Development'
  }, [lang])

  return <Ctx.Provider value={{ lang, setLang, t: DICTS[lang] }}>{children}</Ctx.Provider>
}

export const useI18n = () => useContext(Ctx)
