import { Link } from "wouter";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: "atlas",
    name: "Atlas Studio",
    blurb: "A calm portfolio that gives the work space to speak.",
    note: "Brand system + website",
  },
  {
    id: "hollow",
    name: "Hollow Coffee",
    blurb: "Minimal ecommerce with a fast path to purchase.",
    note: "Design + development",
  },
  {
    id: "lumen",
    name: "Lumen Landing",
    blurb: "A single page that feels focused and human.",
    note: "Landing page",
  },
  {
    id: "north",
    name: "North Interiors",
    blurb: "A redesign that makes a small studio feel premium.",
    note: "Redesign",
  },
];

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="bg-noise">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-18">
          <Link
            href="/"
            data-testid="link-portfolio-back"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1
                data-testid="text-portfolio-title"
                className="font-serif text-4xl tracking-[-0.02em] sm:text-5xl"
              >
                Portfolio
              </h1>
              <p
                data-testid="text-portfolio-subtitle"
                className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base"
              >
                A small selection. Quality over quantity.
              </p>
            </div>
            <Link href="/contact">
              <Button
                data-testid="button-portfolio-cta"
                size="sm"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Work With Me
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Card
                key={p.id}
                data-testid={`card-portfolio-${p.id}`}
                className="group overflow-hidden border-border/70 bg-card/45 p-5 shadow-sm transition hover:border-border hover:bg-card/70"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold tracking-tight text-foreground">
                      {p.name}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {p.blurb}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground/70 opacity-0 transition group-hover:opacity-100" />
                </div>

                <div
                  data-testid={`img-mockup-${p.id}`}
                  className="mt-5 h-36 rounded-xl border border-border/60 bg-gradient-to-br from-background/40 to-card/60 shadow-inner"
                />

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{p.note}</span>
                  <span className="text-xs text-foreground/90 opacity-0 transition group-hover:opacity-100">
                    View details
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
