import { useEffect } from "react";
import { Link } from "wouter";
import {
  motion,
  type Variants,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Dot, Moon, Sparkle, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-noise">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
      </div>
    </div>
  );
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
  return (
    <header className="sticky top-0 z-40 -mx-5 sm:-mx-8">
      <div className="border-b border-border/60 bg-background/65 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/">
            <a
              data-testid="link-home"
              className="group inline-flex items-center gap-2 rounded-full px-2 py-1 text-sm font-medium text-foreground/90 transition hover:text-foreground"
            >
              <span className="relative grid h-6 w-6 place-items-center rounded-full border border-border/70 bg-card shadow-sm">
                <span className="h-2 w-2 rounded-full bg-primary/90" />
              </span>
              <span className="tracking-tight">Greg</span>
            </a>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
            <Link href="/about">
              <a
                data-testid="link-nav-about"
                className="transition hover:text-foreground"
              >
                About
              </a>
            </Link>
            <Link href="/portfolio">
              <a
                data-testid="link-nav-portfolio"
                className="transition hover:text-foreground"
              >
                Portfolio
              </a>
            </Link>
            <Link href="/services">
              <a
                data-testid="link-nav-services"
                className="transition hover:text-foreground"
              >
                Services
              </a>
            </Link>
            <Link href="/contact">
              <a
                data-testid="link-nav-contact"
                className="transition hover:text-foreground"
              >
                Contact
              </a>
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/contact">
              <Button
                data-testid="button-nav-work"
                size="sm"
                className="rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                Work With Me
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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

const projects = [
  {
    id: "atlas",
    name: "Atlas Studio",
    oneLiner: "A calm portfolio that lets the work breathe.",
    meta: "Brand + site system",
  },
  {
    id: "hollow",
    name: "Hollow Coffee",
    oneLiner: "Minimal ecommerce with fast paths to purchase.",
    meta: "Design + build",
  },
  {
    id: "lumen",
    name: "Lumen Landing",
    oneLiner: "A focused landing page built to convert quietly.",
    meta: "Landing page",
  },
];

export default function Home() {
  return (
    <Shell>
      <CursorGlow />
      <Nav />

      <main className="pb-20 pt-14 sm:pb-24 sm:pt-18">
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="relative"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-border/70 bg-card/70 px-3 py-1 text-xs text-muted-foreground shadow-sm">
              <Dot className="mr-1 h-4 w-4 text-primary" />
              Available for new projects
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            data-testid="text-home-headline"
            className="mt-8 max-w-3xl text-balance font-serif text-4xl leading-[1.08] tracking-[-0.02em] text-foreground sm:text-6xl"
          >
            I’m <span className="text-foreground">Greg</span>. I design websites
            that feel <span className="text-primary/95">intentional</span>.
          </motion.h1>

          <motion.p
            variants={item}
            data-testid="text-home-subtext"
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Clean, fast websites built to help people trust your business.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/contact">
              <Button
                data-testid="button-cta-work"
                size="lg"
                className="h-12 rounded-full bg-primary px-6 text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                Work With Me
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link
              href="/portfolio"
              data-testid="link-cta-portfolio"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-border/70 bg-card/40 px-6 text-sm font-medium text-foreground/90 shadow-sm transition hover:bg-card/70"
            >
              See work
              <span className="grid h-7 w-7 place-items-center rounded-full border border-border/60 bg-background/30 transition group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

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
        </motion.section>

        <section className="mt-18 grid gap-6 sm:mt-22 sm:grid-cols-12">
          <div className="sm:col-span-5">
            <h2
              data-testid="text-philosophy-title"
              className="text-balance font-serif text-2xl leading-tight tracking-[-0.01em]"
            >
              Less, on purpose.
            </h2>
            <p
              data-testid="text-philosophy-body"
              className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              I focus on clarity, usability, and intention. The goal isn’t to impress
              people. It’s to help them understand you.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Good design reduces friction. The right words, the right layout, the right
              pace.
            </p>
          </div>

          <div className="sm:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((p) => (
                <Card
                  key={p.id}
                  data-testid={`card-project-${p.id}`}
                  className="group relative overflow-hidden border-border/70 bg-card/50 p-5 shadow-sm transition hover:border-border hover:bg-card/70"
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-primary/12 blur-2xl" />
                    <div className="absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-accent/10 blur-2xl" />
                  </div>

                  <div className="relative">
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
                        {p.meta}
                      </span>
                    </div>

                    <div className="mt-5 h-28 rounded-xl border border-border/60 bg-gradient-to-br from-background/40 to-card/60 shadow-inner" />

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Details on hover</span>
                      <Link
                        href="/portfolio"
                        data-testid={`link-project-${p.id}`}
                        className="text-xs font-medium text-foreground/90 transition group-hover:text-foreground"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-18 rounded-2xl border border-border/70 bg-card/40 p-6 shadow-sm sm:mt-22 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3
                data-testid="text-home-footer-title"
                className="font-serif text-2xl tracking-[-0.01em]"
              >
                Want it to feel right?
              </h3>
              <p
                data-testid="text-home-footer-body"
                className="mt-2 max-w-xl text-sm text-muted-foreground"
              >
                I’ll ask a few good questions, then build something calm, clear, and
                fast.
              </p>
            </div>
            <Link href="/contact">
              <Button
                data-testid="button-footer-contact"
                variant="secondary"
                size="lg"
                className="h-12 rounded-full border border-border/70 bg-background/30 px-6 text-foreground shadow-sm hover:bg-background/45"
              >
                Let’s talk
              </Button>
            </Link>
          </div>
        </section>

        <footer className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p data-testid="text-footer-copyright">© {new Date().getFullYear()} Greg</p>
          <p data-testid="text-footer-note">Built with intention.</p>
        </footer>
      </main>
    </Shell>
  );
}
