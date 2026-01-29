import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "design",
    title: "Website Design",
    body: "Structure, copy direction, layout, and visual polish. Built to feel calm and clear.",
    price: "Starting at $2,500",
  },
  {
    id: "dev",
    title: "Website Development",
    body: "Fast, responsive builds that keep things simple—and easy to maintain.",
    price: "Starting at $3,500",
  },
  {
    id: "redesign",
    title: "Redesigns",
    body: "Keep what’s working. Improve what’s not. A cleaner system and stronger flow.",
    price: "Starting at $1,800",
  },
  {
    id: "landing",
    title: "Landing Pages",
    body: "A focused page for one offer. Fewer distractions, more momentum.",
    price: "Starting at $900",
  },
];

export default function Services() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="bg-noise">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-18">
          <Link
            href="/"
            data-testid="link-services-back"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1
                data-testid="text-services-title"
                className="font-serif text-4xl tracking-[-0.02em] sm:text-5xl"
              >
                Services
              </h1>
              <p
                data-testid="text-services-subtitle"
                className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base"
              >
                Simple offerings. Clear outcomes. No fuss.
              </p>
            </div>
            <Link href="/contact">
              <Button
                data-testid="button-services-cta"
                size="sm"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Work With Me
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {services.map((s) => (
              <Card
                key={s.id}
                data-testid={`card-service-${s.id}`}
                className="border-border/70 bg-card/45 p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-base font-semibold tracking-tight text-foreground">
                    {s.title}
                  </h2>
                  <span className="rounded-full border border-border/70 bg-background/30 px-2.5 py-1 text-[11px] text-muted-foreground">
                    {s.price}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-border/70 bg-card/40 p-6 shadow-sm sm:p-10">
            <h3
              data-testid="text-services-process-title"
              className="font-serif text-2xl tracking-[-0.01em]"
            >
              What it’s like to work together
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                {
                  id: "clarity",
                  t: "Clarity",
                  d: "We start with what matters. A few good questions.",
                },
                {
                  id: "build",
                  t: "Build",
                  d: "Design and development move in tight loops.",
                },
                {
                  id: "launch",
                  t: "Launch",
                  d: "A clean handoff. No mystery. No mess.",
                },
              ].map((step) => (
                <div
                  key={step.id}
                  data-testid={`card-step-${step.id}`}
                  className="rounded-2xl border border-border/70 bg-background/20 p-5"
                >
                  <p className="text-sm font-semibold tracking-tight text-foreground">
                    {step.t}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
