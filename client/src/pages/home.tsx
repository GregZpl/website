import { useEffect, useMemo, useState } from "react";
import { motion, type Variants, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Dot,
  ExternalLink,
  MapPin,
  MessageCircle,
  Moon,
  Sparkle,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const contactSchema = z.object({
  name: z.string().min(2, "Please add your name"),
  email: z.string().email("Please use a valid email"),
  message: z.string().min(10, "Tell me a little about what you need"),
});

type ContactValues = z.infer<typeof contactSchema>;

type Project = {
  id: string;
  name: string;
  tag: string;
  oneLiner: string;
  imageAlt: string;
  links: { label: string; href: string; testId: string }[];
};

type Tier = {
  id: string;
  name: string;
  price: string;
  blurb: string;
  bullets: string[];
  delivery: string;
  featured?: boolean;
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-noise">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
      </div>
    </div>
  );
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: [0.05, 0.1, 0.2, 0.35] },
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [ids]);

  return active;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ThemeToggle() {
  useEffect(() => {
    const stored = (() => {
      try {
        return localStorage.getItem("theme");
      } catch {
        return null;
      }
    })();

    const root = document.documentElement;
    const next = stored === "light" ? "light" : "dark";

    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;
  }, []);

  return (
    <button
      type="button"
      data-testid="button-theme-toggle"
      aria-label="Toggle theme"
      onClick={() => {
        const root = document.documentElement;
        const isDark = root.classList.contains("dark");
        const next = isDark ? "light" : "dark";
        root.classList.toggle("dark", next === "dark");
        root.style.colorScheme = next;
        try {
          localStorage.setItem("theme", next);
        } catch {
        }
      }}
      className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-card/50 text-muted-foreground shadow-sm transition hover:bg-card/70 hover:text-foreground"
    >
      <Sun className="h-4 w-4 scale-100 opacity-100 transition group-[.dark]:scale-0 group-[.dark]:opacity-0" />
      <Moon className="absolute h-4 w-4 scale-0 opacity-0 transition group-[.dark]:scale-100 group-[.dark]:opacity-100" />
    </button>
  );
}

function Nav() {
  const ids = useMemo(
    () => ["home", "work", "offer", "pricing", "faq", "contact"],
    [],
  );
  const active = useActiveSection(ids);

  return (
    <header className="sticky top-0 z-40 -mx-5 sm:-mx-8">
      <div className="border-b border-border/60 bg-background/65 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <button
            type="button"
            data-testid="button-nav-top"
            onClick={() => scrollToId("home")}
            className="group inline-flex items-center gap-2 rounded-full px-2 py-1 text-sm font-medium text-foreground/90 transition hover:text-foreground"
          >
            <span className="relative grid h-6 w-6 place-items-center rounded-full border border-border/70 bg-card shadow-sm">
              <span className="h-2 w-2 rounded-full bg-primary/90" />
            </span>
            <span className="tracking-tight">Greg</span>
          </button>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
            {[
              { id: "work", label: "Work" },
              { id: "offer", label: "Offer" },
              { id: "pricing", label: "Pricing" },
              { id: "faq", label: "FAQ" },
              { id: "contact", label: "Contact" },
            ].map((l) => (
              <button
                key={l.id}
                type="button"
                data-testid={`button-nav-${l.id}`}
                onClick={() => scrollToId(l.id)}
                className={
                  "transition hover:text-foreground " +
                  (active === l.id ? "text-foreground" : "")
                }
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              data-testid="button-nav-work"
              size="sm"
              className="rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
              onClick={() => scrollToId("contact")}
            >
              Work With Me
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function CursorGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 140, damping: 18, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 140, damping: 18, mass: 0.2 });

  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-10 hidden sm:block"
      onMouseMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      <motion.div
        className="absolute h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: tx,
          top: ty,
          background:
            "radial-gradient(circle at center, rgba(120,170,255,0.10), rgba(120,170,255,0) 60%)",
          filter: "blur(2px)",
        }}
      />
      <motion.div
        className="absolute h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: tx,
          top: ty,
          background:
            "radial-gradient(circle at center, rgba(186,140,255,0.08), rgba(186,140,255,0) 60%)",
        }}
      />
    </motion.div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  body,
  testId,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  testId: string;
}) {
  return (
    <div className="mx-auto max-w-2xl">
      {eyebrow ? (
        <p
          data-testid={`${testId}-eyebrow`}
          className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        data-testid={`${testId}-title`}
        className="mt-3 text-balance font-serif text-2xl tracking-[-0.01em] sm:text-3xl"
      >
        {title}
      </h2>
      {body ? (
        <p
          data-testid={`${testId}-body`}
          className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}

function FauxMockup({ label, testId }: { label: string; testId: string }) {
  return (
    <div
      data-testid={testId}
      className="relative mt-5 h-44 overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-background/40 to-card/60 shadow-inner"
    >
      <div className="absolute inset-0 opacity-60">
        <div className="absolute -left-20 -top-16 h-56 w-56 rounded-full bg-primary/12 blur-2xl" />
        <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-accent/10 blur-2xl" />
      </div>
      <div className="relative p-4">
        <div className="flex items-center justify-between">
          <div className="h-2.5 w-16 rounded-full bg-foreground/10" />
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
            <div className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
            <div className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
          </div>
        </div>
        <div className="mt-6 h-3.5 w-44 rounded-full bg-foreground/12" />
        <div className="mt-3 h-2.5 w-64 rounded-full bg-foreground/10" />
        <div className="mt-2 h-2.5 w-56 rounded-full bg-foreground/10" />
        <div className="mt-6 inline-flex rounded-full border border-border/60 bg-background/20 px-3 py-1 text-[11px] text-muted-foreground">
          {label}
        </div>
      </div>
    </div>
  );
}

function RecentProjects({ projects }: { projects: Project[] }) {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <Card
          key={p.id}
          data-testid={`card-project-${p.id}`}
          className="group overflow-hidden border-border/70 bg-card/45 p-5 shadow-sm transition hover:border-border hover:bg-card/70"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold tracking-tight text-foreground">
                {p.name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.oneLiner}
              </p>
            </div>
            <span className="rounded-full border border-border/70 bg-background/30 px-2.5 py-1 text-[11px] text-muted-foreground">
              {p.tag}
            </span>
          </div>

          <FauxMockup label={p.imageAlt} testId={`img-mockup-${p.id}`} />

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
            {p.links.map((l) => (
              <a
                key={l.testId}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                data-testid={l.testId}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/20 px-3 py-1 text-muted-foreground transition hover:bg-background/35 hover:text-foreground"
              >
                {l.label}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function OfferGrid() {
  const items = [
    {
      id: "design-build",
      title: "Website design & build",
      body: "Custom, responsive websites that feel calm and clear on every device.",
    },
    {
      id: "booking",
      title: "Booking setup",
      body: "Calendly/Cal/Square/Fresha \u2014 set up so you can take bookings without friction.",
    },
    {
      id: "seo",
      title: "SEO basics",
      body: "Good structure, performance, and the essentials so local customers can find you.",
    },
    {
      id: "maintenance",
      title: "Maintenance & updates",
      body: "Ongoing support to keep your site fast, secure, and up-to-date.",
    },
    {
      id: "email",
      title: "Business email setup",
      body: "Professional email addresses that match your domain.",
    },
    {
      id: "copy",
      title: "Copy tidy-up",
      body: "Short sentences. Clear pages. A tone that feels human.",
    },
  ];

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((i) => (
        <Card
          key={i.id}
          data-testid={`card-offer-${i.id}`}
          className="border-border/70 bg-card/45 p-6 shadow-sm"
        >
          <p className="text-sm font-semibold tracking-tight text-foreground">
            {i.title}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {i.body}
          </p>
        </Card>
      ))}
    </div>
  );
}

function Pricing({ tiers }: { tiers: Tier[] }) {
  return (
    <div className="mt-10 grid gap-4 lg:grid-cols-3">
      {tiers.map((t) => (
        <Card
          key={t.id}
          data-testid={`card-tier-${t.id}`}
          className={
            "relative overflow-hidden border-border/70 bg-card/45 p-6 shadow-sm " +
            (t.featured
              ? "ring-1 ring-primary/20 bg-card/55"
              : "")
          }
        >
          {t.featured ? (
            <div className="absolute right-5 top-5">
              <span
                data-testid={`badge-tier-${t.id}`}
                className="rounded-full border border-border/70 bg-background/25 px-2.5 py-1 text-[11px] text-foreground/90"
              >
                Most Popular
              </span>
            </div>
          ) : null}

          <p className="text-sm font-semibold tracking-tight text-foreground">
            {t.name}
          </p>
          <div className="mt-4 flex items-end justify-between gap-3">
            <p
              data-testid={`text-tier-price-${t.id}`}
              className="font-serif text-3xl tracking-[-0.02em]"
            >
              {t.price}
            </p>
            <p className="text-xs text-muted-foreground">Delivery: {t.delivery}</p>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{t.blurb}</p>

          <ul className="mt-5 space-y-2.5 text-sm">
            {t.bullets.map((b, idx) => (
              <li
                key={`${t.id}-${idx}`}
                data-testid={`row-tier-${t.id}-${idx}`}
                className="flex items-start gap-2 text-muted-foreground"
              >
                <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full border border-border/70 bg-background/20">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </span>
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>

          <Button
            data-testid={`button-tier-${t.id}`}
            className={
              "mt-6 w-full rounded-full " +
              (t.featured
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-background/20 text-foreground hover:bg-background/35")
            }
            variant={t.featured ? "default" : "secondary"}
            onClick={() => scrollToId("contact")}
          >
            Choose {t.name}
          </Button>
        </Card>
      ))}
    </div>
  );
}

function ContactSection() {
  const { toast } = useToast();
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (values: ContactValues) => {
    toast({
      title: "Message drafted",
      description: "I\u2019ll reply within 1\u20132 business days.",
    });

    form.reset();
    void values;
  };

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-12">
      <Card className="border-border/70 bg-card/45 p-6 shadow-sm lg:col-span-7 sm:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel data-testid="label-name">Your name</FormLabel>
                    <FormControl>
                      <Input
                        data-testid="input-name"
                        placeholder="Greg\u2019s client"
                        className="h-11 rounded-xl border-border/70 bg-background/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage data-testid="error-name" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel data-testid="label-email">Email</FormLabel>
                    <FormControl>
                      <Input
                        data-testid="input-email"
                        placeholder="you@domain.com"
                        className="h-11 rounded-xl border-border/70 bg-background/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage data-testid="error-email" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel data-testid="label-message">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      data-testid="textarea-message"
                      placeholder="What are you building? What does success look like?"
                      className="min-h-[140px] resize-none rounded-xl border-border/70 bg-background/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage data-testid="error-message" />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p
                data-testid="text-contact-reassure"
                className="text-xs text-muted-foreground"
              >
                Fast replies. Clear communication. No pressure.
              </p>

              <Button
                data-testid="button-submit"
                type="submit"
                className="h-11 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
              >
                Send
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </Card>

      <div className="lg:col-span-5">
        <div className="rounded-2xl border border-border/70 bg-card/35 p-6 shadow-sm">
          <p
            data-testid="text-contact-side-title"
            className="font-serif text-xl tracking-[-0.01em]"
          >
            Get in touch
          </p>
          <p
            data-testid="text-contact-side-body"
            className="mt-3 text-sm leading-relaxed text-muted-foreground"
          >
            Whether you're starting from scratch or refreshing an old site, I'd love
            to hear about it.
          </p>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-xl border border-border/70 bg-background/20 text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p data-testid="text-contact-email" className="mt-1 text-foreground/90">
                  gregpiatekbusiness@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-xl border border-border/70 bg-background/20 text-muted-foreground">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p data-testid="text-contact-location" className="mt-1 text-foreground/90">
                  Middlesbrough, UK
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border/70 bg-background/15 p-4">
              <p className="text-xs text-muted-foreground">Quick response</p>
              <p data-testid="text-contact-response" className="mt-1 text-sm text-foreground/90">
                I typically respond within a few hours during business hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const projects: Project[] = [
    {
      id: "atlas",
      name: "Atlas Studio",
      tag: "Modern refresh",
      oneLiner: "A calm portfolio that gives the work space to speak.",
      imageAlt: "Clean layout preview",
      links: [
        {
          label: "Live demo",
          href: "https://example.com",
          testId: "link-project-atlas-live",
        },
        {
          label: "Case study",
          href: "https://example.com",
          testId: "link-project-atlas-case",
        },
      ],
    },
    {
      id: "waterside",
      name: "Waterside Dining",
      tag: "Luxury layout",
      oneLiner: "Rich visuals, smooth motion, and a menu built for decisions.",
      imageAlt: "Elegant restaurant mockup",
      links: [
        {
          label: "Live demo",
          href: "https://example.com",
          testId: "link-project-waterside-live",
        },
        {
          label: "Case study",
          href: "https://example.com",
          testId: "link-project-waterside-case",
        },
      ],
    },
    {
      id: "mortar",
      name: "Mortar Barn",
      tag: "Holiday cottage",
      oneLiner: "A warm site that sells the feeling before the booking.",
      imageAlt: "Property gallery mockup",
      links: [
        {
          label: "Live demo",
          href: "https://example.com",
          testId: "link-project-mortar-live",
        },
        {
          label: "Case study",
          href: "https://example.com",
          testId: "link-project-mortar-case",
        },
      ],
    },
  ];

  const tiers: Tier[] = [
    {
      id: "starter",
      name: "Starter",
      price: "$500",
      blurb: "Perfect for new businesses needing a simple online presence.",
      bullets: [
        "1\u20133 pages (Home, Services, Contact)",
        "Mobile responsive design",
        "Basic SEO setup",
        "Click-to-call + WhatsApp button",
        "Contact form",
      ],
      delivery: "5\u20137 days",
    },
    {
      id: "business",
      name: "Business",
      price: "$900",
      blurb: "Ideal for established businesses wanting more features.",
      bullets: [
        "Up to 6 pages",
        "Gallery + reviews section",
        "Embedded booking link/button",
        "SEO basics + performance optimization",
        "Social media integration",
      ],
      delivery: "7\u201310 days",
      featured: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$£1,500",
      blurb: "Complete solution with advanced booking and payments.",
      bullets: [
        "Everything in Business",
        "Embedded booking widget setup",
        "Deposit/payment link setup",
        "30 days priority support",
        "Performance analytics setup",
      ],
      delivery: "10\u201314 days",
    },
  ];

  return (
    <Shell>
      <CursorGlow />
      <Nav />

      <main className="pb-20 pt-10 sm:pb-24 sm:pt-14">
        <motion.section
          id="home"
          variants={container}
          initial="hidden"
          animate="show"
          className="relative scroll-mt-24"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2">
            <span
              data-testid="status-availability"
              className="inline-flex items-center rounded-full border border-border/70 bg-card/70 px-3 py-1 text-xs text-muted-foreground shadow-sm"
            >
              <Dot className="mr-1 h-4 w-4 text-primary" />
              Available for new projects
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            data-testid="text-home-headline"
            className="mt-8 max-w-3xl text-balance font-serif text-4xl leading-[1.08] tracking-[-0.02em] text-foreground sm:text-6xl"
          >
            I\u2019m <span className="text-foreground">Greg</span>. I design websites that
            bring you customers.
          </motion.h1>

          <motion.p
            variants={item}
            data-testid="text-home-subtext"
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Clean, fast websites for founders and small businesses. No fluff. Just work
            that feels right.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              data-testid="button-cta-work"
              size="lg"
              className="h-12 rounded-full bg-primary px-6 text-primary-foreground shadow-sm hover:bg-primary/90"
              onClick={() => scrollToId("contact")}
            >
              Work With Me
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              data-testid="button-cta-work2"
              size="lg"
              variant="secondary"
              className="h-12 rounded-full border border-border/70 bg-background/20 px-6 text-foreground shadow-sm hover:bg-background/35"
              onClick={() => scrollToId("work")}
            >
              See My Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div
              data-testid="text-home-meta"
              className="ml-1 inline-flex items-center gap-2 text-xs text-muted-foreground"
            >
              <span className="inline-flex items-center gap-2">
                <Sparkle className="h-4 w-4 text-primary/90" />
                Thoughtful, not loud
              </span>
            </div>
          </motion.div>

          <button
            type="button"
            data-testid="button-scroll"
            onClick={() => scrollToId("work")}
            className="mt-12 inline-flex items-center gap-2 text-xs text-muted-foreground transition hover:text-foreground"
          >
            Scroll
            <span className="grid h-7 w-7 place-items-center rounded-full border border-border/70 bg-card/40 shadow-sm">
              <ChevronDown className="h-4 w-4" />
            </span>
          </button>
        </motion.section>

        <section id="work" className="mt-18 scroll-mt-24 sm:mt-22">
          <SectionHeader
            eyebrow="Recent projects"
            title="A small selection of work"
            body="Quality over quantity. A few sites that show the range."
            testId="section-work"
          />
          <RecentProjects projects={projects} />
        </section>

        <section id="offer" className="mt-18 scroll-mt-24 sm:mt-22">
          <SectionHeader
            eyebrow="What I offer"
            title="Everything you need to get online"
            body="Simple packages. Clear outcomes. No jargon."
            testId="section-offer"
          />
          <OfferGrid />
        </section>

        <section id="pricing" className="mt-18 scroll-mt-24 sm:mt-22">
          <SectionHeader
            eyebrow="Pricing"
            title="Simple, transparent pricing"
            body="No hidden fees. No surprises. Just great websites at fair prices."
            testId="section-pricing"
          />
          <Pricing tiers={tiers} />

          <div className="mt-6 rounded-2xl border border-border/70 bg-card/35 p-5 text-sm text-muted-foreground">
            <div className="grid gap-2 sm:grid-cols-2">
              <p data-testid="text-addons-title" className="font-medium text-foreground/90">
                Add-ons
              </p>
              <div className="grid gap-2 text-sm">
                {["Extra page $75", "Logo tidy-up $50", "Ongoing maintenance $49/mo", "Copywriting boost $100", "Google Business Profile help $75"].map(
                  (a, idx) => (
                    <p key={a} data-testid={`text-addon-${idx}`} className="text-muted-foreground">
                      {a}
                    </p>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="mt-18 scroll-mt-24 sm:mt-22">
          <SectionHeader
            eyebrow="Common questions"
            title="Quick answers"
            body="If you\u2019re wondering it, someone else probably is too."
            testId="section-faq"
          />

          <div className="mt-10">
            <Accordion type="single" collapsible className="w-full">
              {[{
                id: "speed",
                q: "How fast can you build my site?",
                a: "Most projects take 7\u201310 days once content is ready. If you\u2019re in a hurry, tell me \u2014 I\u2019ll be honest about timeline.",
              }, {
                id: "hosting",
                q: "Do you offer hosting?",
                a: "Yes. I can recommend a simple setup, or manage it for you. Either way, you\u2019ll know what you\u2019re paying for.",
              }, {
                id: "booking",
                q: "Can you connect bookings?",
                a: "Absolutely. Calendly, Cal, Square, Fresha \u2014 we\u2019ll pick what fits, then I\u2019ll integrate it cleanly.",
              }, {
                id: "need",
                q: "What do you need from me?",
                a: "A quick call, your logo (if you have one), and a few answers about your offer. If you don\u2019t have copy, I\u2019ll help shape it.",
              }].map((f) => (
                <AccordionItem
                  key={f.id}
                  value={f.id}
                  data-testid={`accordion-${f.id}`}
                  className="border-b border-border/60"
                >
                  <AccordionTrigger data-testid={`accordion-trigger-${f.id}`} className="text-left">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent data-testid={`accordion-content-${f.id}`} className="text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section id="contact" className="mt-18 scroll-mt-24 sm:mt-22">
          <SectionHeader
            eyebrow="Let\u2019s chat"
            title="Got a project in mind?"
            body="Drop a message. I\u2019ll get back to you quickly with next steps."
            testId="section-contact"
          />
          <ContactSection />
        </section>

        <footer className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p data-testid="text-footer-copyright">\u00a9 {new Date().getFullYear()} Greg</p>
          <p data-testid="text-footer-note">Built with intention.</p>
        </footer>
      </main>
    </Shell>
  );
}
