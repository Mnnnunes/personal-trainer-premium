/**
 * DESIGN: Disciplina Esculpida — editorial técnico, preto profundo, branco frio
 * e Azul Eixo (#183A5A) como assinatura de método, precisão e progresso.
 */
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowDown,
  ArrowUpRight,
  CalendarCheck2,
  Check,
  ChevronRight,
  ClipboardCheck,
  Compass,
  Dumbbell,
  Instagram,
  LineChart,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  Send,
  Target,
  TrendingUp,
  UsersRound,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// EDITE AQUI: dados de contato, nome e links do profissional.
const personal = {
  name: "SEU NOME",
  role: "PERSONAL TRAINER",
  whatsappNumber: "5500000000000",
  instagramHandle: "@seuinstagram",
  instagramUrl: "https://instagram.com/seuinstagram",
};

const whatsappUrl = `https://wa.me/${personal.whatsappNumber}?text=${encodeURIComponent(
  "Olá! Quero conhecer seu acompanhamento personalizado.",
)}`;

const navItems = [
  ["Início", "inicio"],
  ["Sobre", "sobre"],
  ["Treinos", "treinos"],
  ["Resultados", "resultados"],
  ["Depoimentos", "depoimentos"],
  ["Contato", "contato"],
];

const services = [
  { icon: Dumbbell, title: "Personal Presencial", text: "Treinamento individual com acompanhamento próximo, correções e evolução em cada sessão." },
  { icon: MonitorSmartphone, title: "Personal Online", text: "Treinos planejados e acompanhamento à distância, com clareza para executar sua rotina." },
  { icon: Compass, title: "Consultoria", text: "Orientação estruturada para quem precisa de estratégia, direção e um plano possível de seguir." },
  { icon: Target, title: "Emagrecimento", text: "Estratégias de treino para reduzir gordura, ganhar disposição e evoluir de forma consistente." },
  { icon: TrendingUp, title: "Hipertrofia", text: "Treinos estruturados para desenvolvimento muscular, progressão e recuperação inteligente." },
  { icon: Activity, title: "Condicionamento Físico", text: "Melhore resistência, força e desempenho para uma rotina que exige mais de você." },
];

const steps = [
  ["01", "Avaliação", "Entender seu objetivo, rotina e nível atual."],
  ["02", "Planejamento", "Criar uma estratégia de treino personalizada."],
  ["03", "Acompanhamento", "Ajustar e acompanhar sua evolução de perto."],
  ["04", "Resultado", "Construir consistência e alcançar seus objetivos."],
];

const resultMetrics = [
  ["01", "Força", "Movimentos mais seguros e potentes."],
  ["02", "Condicionamento", "Mais capacidade para a rotina."],
  ["03", "Composição corporal", "Evolução que respeita seu processo."],
  ["04", "Performance", "Treinos com direção e progressão."],
];

const instagramPosts = [
  { code: "01", label: "Rotina", detail: "organização que vira constância" },
  { code: "02", label: "Treino", detail: "movimento com intenção" },
  { code: "03", label: "Método", detail: "estratégia para evoluir" },
  { code: "04", label: "Força", detail: "base para o seu desempenho" },
  { code: "05", label: "Foco", detail: "direção em cada etapa" },
  { code: "06", label: "Progresso", detail: "processo acima da pressa" },
];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.16 });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (reduced) {
          setCount(target);
          observer.disconnect();
          return;
        }
        const start = performance.now();
        const duration = 1100;
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.floor(target * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) requestAnimationFrame(animate);
          else observer.disconnect();
        };
        requestAnimationFrame(animate);
      },
      { threshold: 0.6 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [reduced, target]);

  return <span ref={ref}>{suffix === "+" ? `+${count}` : `${count}${suffix}`}</span>;
}

function SectionHeading({ index, title, copy, align = "left" }: { index: string; title: string; copy?: string; align?: "left" | "right" }) {
  return (
    <div className={`section-heading ${align === "right" ? "md:ml-auto md:max-w-xl" : "max-w-2xl"}`}>
      <span className="eyebrow"><span>{index}</span><i className="pulse-lead" />MÉTODO</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a className="brand" href="#inicio" aria-label={`Ir ao início - ${personal.name}`}>
      <img className={compact ? "brand-mark compact" : "brand-mark"} src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663911480749/JXWNiMufpPraBMTb.png" alt="Símbolo geométrico da marca" />
      {!compact && (
        <span>
          <strong>{personal.name}</strong>
          <small>{personal.role}</small>
        </span>
      )}
    </a>
  );
}

function AppButton({ href, children, variant = "primary", className = "", onClick }: { href?: string; children: ReactNode; variant?: "primary" | "ghost" | "outline"; className?: string; onClick?: () => void }) {
  const classes = `app-button ${variant} ${className}`;
  if (href) return <a href={href} onClick={onClick} className={classes}>{children}</a>;
  return <button type="button" onClick={onClick} className={classes}>{children}</button>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", goal: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState("");
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "Informe seu nome.";
    if (!form.phone.trim()) nextErrors.phone = "Informe seu WhatsApp.";
    if (!form.goal.trim()) nextErrors.goal = "Conte qual é seu objetivo.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setFormStatus("Revise os campos destacados antes de enviar.");
      return;
    }
    setFormStatus("Formulário pronto para integração. Para falar agora, use o WhatsApp.");
  };

  return (
    <main className="site-shell" id="inicio">
      <div className="pulse-spine" aria-hidden="true">
        <i />
        {["01", "02", "03", "04", "05", "06", "07", "08", "09"].map((marker, index) => <span key={marker} style={{ top: `${(index + 1) * 10}%` }}>{marker}</span>)}
      </div>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <AppButton href={whatsappUrl} className="header-cta"><MessageCircle size={16} />Falar no WhatsApp</AppButton>
            <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}>
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
          {navItems.map(([label, id], index) => (
            <a key={id} href={`#${id}`} onClick={closeMenu}><span>0{index + 1}</span>{label}<ChevronRight size={17} /></a>
          ))}
          <AppButton href={whatsappUrl} onClick={closeMenu}><MessageCircle size={17} />Falar no WhatsApp</AppButton>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <motion.div className="hero-media" aria-hidden="true" style={reduced ? undefined : { y: scrolled ? 0 : 0 }}>
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663911480749/amZypFPGrieBGVmT.png" alt="Personal trainer em roupa azul-violeta em ambiente de treino" fetchPriority="high" />
        </motion.div>
        <div className="hero-overlay" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content container">
          <motion.p className="hero-kicker" initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.12 }}>
            <span className="status-dot" />ACOMPANHAMENTO PERSONALIZADO
          </motion.p>
          <motion.h1 id="hero-title" initial={reduced ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18, ease: [0.23, 1, 0.32, 1] }}>
            Seu objetivo.<br />Seu treino.<br /><em>Seu resultado.</em>
          </motion.h1>
          <motion.p className="hero-description" initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}>
            Estratégia individual, orientação próxima e uma rotina que transforma intenção em progresso mensurável.
          </motion.p>
          <motion.div className="hero-actions" initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.49 }}>
            <AppButton href={whatsappUrl}>Quero começar <ArrowUpRight size={18} /></AppButton>
            <AppButton href="#sobre" variant="ghost">Conhecer o trabalho <ChevronRight size={18} /></AppButton>
          </motion.div>
        </div>
        <div className="hero-image-note" aria-hidden="true"><span>01 / PERSONAL TRAINER</span><i /><small>ESTRATÉGIA PARA A SUA ROTINA</small></div>
        <a className="scroll-cue" href="#numeros"><span><ArrowDown size={15} /></span>Role para conhecer</a>
        <div className="hero-index" aria-hidden="true"><span>01</span><i /> <span>12</span></div>
      </section>

      <section className="stats-band" id="numeros" aria-label="Indicadores demonstrativos">
        <div className="container stats-grid">
          <Reveal><div className="stat-item"><strong><Counter target={100} suffix="+" /></strong><span>Alunos acompanhados</span></div></Reveal>
          <Reveal delay={0.08}><div className="stat-item"><strong><Counter target={500} suffix="+" /></strong><span>Treinos realizados</span></div></Reveal>
          <Reveal delay={0.16}><div className="stat-item"><strong><Counter target={100} suffix="%" /></strong><span>Foco no seu objetivo</span></div></Reveal>
          <p className="demo-note">Indicadores demonstrativos<br />e facilmente editáveis</p>
        </div>
      </section>

      <section id="sobre" className="about-section section-space">
        <div className="section-rule container"><span>02 / SOBRE</span><i /></div>
        <div className="container about-layout">
          <Reveal className="about-image-wrap">
            <div className="about-graphic" aria-label="Representação visual da metodologia de treino">
              <div className="about-graphic-top"><span>02</span><i /><small>PLANO INDIVIDUAL</small></div>
              <div className="about-graphic-core"><ClipboardCheck size={42} strokeWidth={1.2} /><strong>Estratégia que<br />acompanha a<br /><em>sua rotina.</em></strong></div>
              <div className="about-graphic-bottom"><span>OBJETIVO</span><b /> <span>PROCESSO</span><b /> <span>EVOLUÇÃO</span></div>
            </div>
            <div className="frame-code">PT / 2026</div>
          </Reveal>
          <Reveal className="about-copy" delay={0.12}>
            <SectionHeading index="02" title="Mais do que treinar. Evoluir." copy="Cada pessoa possui um objetivo, uma rotina e um nível diferente. Por isso, o treinamento precisa ser pensado para você." />
            <p className="body-copy">O acompanhamento personalizado combina estratégia, orientação e consistência para tornar sua evolução mais eficiente e sustentável.</p>
            <div className="differentials">
              {[
                [Target, "Treino personalizado", "Exercícios adaptados ao seu objetivo."],
                [UsersRound, "Acompanhamento", "Orientação durante toda a sua evolução."],
                [Compass, "Estratégia", "Treinos planejados de acordo com seu momento."],
                [LineChart, "Evolução", "Acompanhamento constante do seu progresso."],
              ].map(([Icon, title, text]) => {
                const DifferentiatorIcon = Icon as typeof Target;
                return <div className="differential" key={title as string}><DifferentiatorIcon size={20} /><div><h3>{title as string}</h3><p>{text as string}</p></div></div>;
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="treinos" className="services-section section-space">
        <div className="container services-top">
          <Reveal><SectionHeading index="03" title="Escolha a melhor forma de treinar" copy="Uma jornada de treino coerente com sua rotina, objetivo e momento atual." /></Reveal>
          <Reveal delay={0.12}><a className="inline-link" href={whatsappUrl}>Encontrar meu formato <ArrowUpRight size={17} /></a></Reveal>
        </div>
        <div className="container services-grid">
          {services.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={(index % 3) * 0.07}>
              <article className="service-card">
                <div className="service-card-top"><span>0{index + 1}</span><Icon size={27} strokeWidth={1.5} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="service-arrow"><ArrowUpRight size={18} /></div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="process-section section-space" aria-labelledby="process-title">
        <div className="container">
          <Reveal><SectionHeading index="04" title="Seu caminho para a evolução" copy="Um processo simples de entender e profundo o bastante para sustentar sua evolução." align="right" /></Reveal>
          <div className="process-track">
            <div className="process-line" aria-hidden="true" />
            {steps.map(([number, title, text], index) => (
              <Reveal key={number} delay={index * 0.08} className="process-step">
                <span className="process-number">{number}</span>
                <span className="process-node" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="resultados" className="results-section section-space">
        <div className="container results-layout">
          <Reveal className="results-copy">
            <SectionHeading index="05" title="Resultados são consequência de consistência." copy="Acompanhamento não é sobre acelerar etapas. É sobre dar direção ao que você faz todos os dias." />
            <div className="results-metrics">
              {resultMetrics.map(([number, title, text]) => <div className="result-metric" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}
            </div>
          </Reveal>
          <Reveal className="results-gallery" delay={0.12}>
            <figure className="result-image main-result result-panel">
              <span className="result-panel-index">05 / 04</span>
              <div className="result-bars"><i /><i /><i /><i /></div>
              <strong>PROGRESSO<br />COM <em>DIREÇÃO</em></strong>
              <figcaption>Indicadores demonstrativos</figcaption>
            </figure>
            <figure className="result-image side-result result-panel result-panel-small">
              <span>PLANO ATIVO</span>
              <div className="result-points"><i /><i /><i /><i /></div>
              <figcaption>Processo &amp; técnica</figcaption>
            </figure>
            <div className="result-mark"><ClipboardCheck size={23} /><span>FOCO<br />NO PROCESSO</span></div>
          </Reveal>
        </div>
      </section>

      <section id="depoimentos" className="testimonials-section section-space">
        <div className="container testimonials-header">
          <Reveal><SectionHeading index="06" title="Quem treina, sente a diferença." copy="Espaço reservado exclusivamente para relatos verificáveis e autorizados por alunos." /></Reveal>
          <Reveal delay={0.1}><div className="verified-note"><Check size={18} /><span>Publicação somente com autorização</span></div></Reveal>
        </div>
        <div className="container testimonial-track" aria-label="Área de depoimentos verificáveis">
          {["Disciplina", "Clareza", "Constância", "Evolução"].map((theme, index) => (
            <Reveal key={theme} delay={index * 0.07}>
              <article className="testimonial-placeholder">
                <span>0{index + 1} / RELATO VERIFICADO</span>
                <div className="quote-mark">“</div>
                <h3>Seu relato de {theme.toLowerCase()} poderá aparecer aqui.</h3>
                <p>Substitua este espaço por um depoimento real, autorizado e verificável.</p>
                <div className="placeholder-person"><span /><div><strong>Nome do aluno</strong><small>Identificação autorizada</small></div></div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="container testimonial-disclaimer">Nenhum depoimento demonstrativo ou avaliação fictícia é exibido nesta página.</p>
      </section>

      <section className="strong-cta section-space">
        <div className="cta-radiance" aria-hidden="true" />
        <img className="cta-mark" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663911480749/JXWNiMufpPraBMTb.png" alt="" aria-hidden="true" />
        <div className="container cta-layout">
          <Reveal><span className="eyebrow"><span>07</span> / PRÓXIMO PASSO</span><h2>Vamos traçar<br />seu <em>plano?</em></h2></Reveal>
          <Reveal delay={0.12} className="cta-copy"><p>Vamos avaliar sua rotina, definir uma direção e transformar o treino em um processo que você consegue sustentar.</p><AppButton href={whatsappUrl}>Conversar sobre meu objetivo <ArrowUpRight size={19} /></AppButton></Reveal>
        </div>
      </section>

      <section className="instagram-section section-space" aria-labelledby="instagram-title">
        <div className="container instagram-top">
          <Reveal><SectionHeading index="08" title="Acompanhe minha rotina" copy="Treinos, dicas, evolução e conteúdo para ajudar você a chegar mais longe." /></Reveal>
          <Reveal delay={0.12}><AppButton href={personal.instagramUrl} variant="outline" className="instagram-button">Seguir no Instagram <Instagram size={17} /></AppButton></Reveal>
        </div>
        <div className="container instagram-grid">
          {instagramPosts.map((post, index) => <Reveal key={post.label} delay={(index % 3) * 0.06}><a className="instagram-post" href={personal.instagramUrl} target="_blank" rel="noreferrer" aria-label={`Abrir Instagram: ${post.label}`}><small>{post.code} / POST</small><strong>{post.label}</strong><p>{post.detail}</p><i><Instagram size={18} /></i></a></Reveal>)}
        </div>
        <p className="container instagram-note">Grade conceitual: conecte o perfil para exibir seus conteúdos reais.</p>
      </section>

      <section id="contato" className="contact-section section-space">
        <div className="container contact-layout">
          <Reveal className="contact-intro"><SectionHeading index="09" title="Vamos começar sua evolução?" copy="O WhatsApp é o canal mais rápido para conversar sobre seu objetivo e entender o melhor formato de acompanhamento." />
            <div className="contact-channels">
              <a href={whatsappUrl} className="channel-card"><span className="channel-icon"><MessageCircle size={21} /></span><div><small>WhatsApp</small><h3>Fale diretamente comigo</h3></div><ArrowUpRight size={19} /></a>
              <a href={personal.instagramUrl} target="_blank" rel="noreferrer" className="channel-card"><span className="channel-icon"><Instagram size={21} /></span><div><small>Instagram</small><h3>{personal.instagramHandle}</h3></div><ArrowUpRight size={19} /></a>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="contact-form-wrap">
            <form onSubmit={submitForm} noValidate>
              <div className="form-top"><span>FORMULÁRIO DE CONTATO</span><small>Integração futura</small></div>
              <label>Nome<Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-invalid={!!errors.name} placeholder="Como você prefere ser chamado?" className={errors.name ? "input-error" : ""} /></label>
              {errors.name && <p className="field-error">{errors.name}</p>}
              <label>WhatsApp<Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} aria-invalid={!!errors.phone} placeholder="(00) 00000-0000" className={errors.phone ? "input-error" : ""} /></label>
              {errors.phone && <p className="field-error">{errors.phone}</p>}
              <label>Objetivo<Input value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} aria-invalid={!!errors.goal} placeholder="Ex.: emagrecimento, força, condicionamento" className={errors.goal ? "input-error" : ""} /></label>
              {errors.goal && <p className="field-error">{errors.goal}</p>}
              <label>Mensagem <span>(opcional)</span><Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Conte um pouco sobre sua rotina." rows={3} /></label>
              <button type="submit" className="app-button primary submit-button">Enviar mensagem <Send size={17} /></button>
              <p className={`form-status ${Object.keys(errors).length ? "is-error" : ""}`} aria-live="polite">{formStatus || "Sem backend configurado: o WhatsApp segue como canal principal de conversão."}</p>
            </form>
          </Reveal>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-top"><Logo /><p>Treino com estratégia.<br />Evolução com direção.</p><a className="footer-whatsapp" href={whatsappUrl}><MessageCircle size={17} />Conversar pelo WhatsApp</a></div>
        <div className="container footer-bottom"><span>© 2026 {personal.name}. Todos os direitos reservados.</span><nav aria-label="Links de rodapé">{navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}<a href={personal.instagramUrl} target="_blank" rel="noreferrer">Instagram</a></nav></div>
      </footer>

      <a className="floating-whatsapp" href={whatsappUrl} aria-label="Conversar no WhatsApp"><MessageCircle size={24} /><span>WhatsApp</span></a>
    </main>
  );
}
