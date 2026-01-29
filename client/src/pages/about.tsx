import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function About() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="bg-noise">
        <div className="mx-auto w-full max-w-4xl px-5 py-14 sm:px-8 sm:py-18">
          <Link
            href="/"
            data-testid="link-about-back"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <h1
            data-testid="text-about-title"
            className="mt-8 font-serif text-4xl tracking-[-0.02em] sm:text-5xl"
          >
            About
          </h1>

          <div className="mt-7 space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p data-testid="text-about-p1">
              Im Greg. I design and build websites for people who care about how their
              business feels.
            </p>
            <p data-testid="text-about-p2">
              I dont believe good websites need to be loud. They need to be clear. The
              goal is trust. And trust comes from small, deliberate choices.
            </p>
            <p data-testid="text-about-p3">
              I like working with founders, creatives, and small teams who want fewer
              pagesbut better ones. Ill help you say the right thing, in the right
              order.
            </p>
            <p data-testid="text-about-p4">
              If youre building something thoughtful, Id love to help it look and
              feel like it.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-border/70 bg-card/40 p-6 shadow-sm">
            <h2
              data-testid="text-about-belief-title"
              className="font-serif text-xl tracking-[-0.01em]"
            >
              A simple belief
            </h2>
            <p
              data-testid="text-about-belief-body"
              className="mt-3 text-sm leading-relaxed text-muted-foreground"
            >
              Good design is problem-solving with restraint.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
