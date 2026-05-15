import React, { useState } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, BarChart3, Calendar, Shield, Users, CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoImage from "@/assets/logo-fineline.png";
import team1 from "@/assets/team-meeting_1.jpg";
import team2 from "@/assets/team-meeting_2.jpg";
import team3 from "@/assets/team-meeting_3.jpg";
import { getService, services } from "@/data/services";

const ICON_MAP: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 className="size-6" />,
  Calendar: <Calendar className="size-6" />,
  Shield: <Shield className="size-6" />,
  Users: <Users className="size-6" />,
};

const SERVICE_IMAGES: Record<string, string> = {
  "investment-planning": team1,
  "retirement-planning": team2,
  "risk-and-protection": team3,
  "family-financial-planning": team1,
};

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src={logoImage} alt="FineLine Logo" className="size-10 rounded-xl object-cover shadow-sm" />
          <div className="leading-tight">
            <div className="headline text-[15px] font-semibold">FineLine</div>
            <div className="text-xs text-muted-foreground">Financial Planning</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link className="transition-colors hover:text-foreground" href="/">Home</Link>
          <Link className="font-semibold text-foreground" href="/services">Services</Link>
          <Link className="transition-colors hover:text-foreground" href="/blog">Blog</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden md:inline-flex" asChild>
            <Link href="/book">Book a call <ArrowRight className="ml-1 size-4" /></Link>
          </Button>
          <Button asChild className="group">
            <Link href="/book">Get a plan <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" /></Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
      >
        <span className="font-semibold text-sm md:text-base">{question}</span>
        <ChevronDown className={cn("size-4 flex-shrink-0 transition-transform text-muted-foreground", open && "rotate-180")} />
      </button>
      {open && (
        <div className="pb-5 text-sm text-muted-foreground leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function ServiceDetail() {
  const params = useParams();
  const service = getService(params.slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-noise">
        <Header />
        <main className="container-page pt-16 pb-16 text-center">
          <h1 className="headline text-4xl font-semibold mb-4">Service not found</h1>
          <Button asChild><Link href="/services">View all services</Link></Button>
        </main>
      </div>
    );
  }

  const heroImg = SERVICE_IMAGES[service.slug] || team1;
  const otherServices = services.filter(s => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-noise">
      <Header />

      <main>
        {/* Hero */}
        <div className="relative w-full h-64 md:h-[400px] overflow-hidden">
          <img src={heroImg} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <section className="container-page max-w-4xl mx-auto pb-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 pt-8 mb-6 text-sm text-muted-foreground">
            <Link href="/services" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <ArrowLeft className="size-3.5" /> All services
            </Link>
            <span className="text-muted-foreground/40">·</span>
            <span>{service.title}</span>
          </div>

          {/* Title block */}
          <div className="flex items-start gap-4 mb-4">
            <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary flex-shrink-0">
              {ICON_MAP[service.iconName]}
            </div>
            <div>
              <h1 className="headline text-3xl md:text-4xl font-semibold leading-tight">{service.title}</h1>
              <p className="text-muted-foreground italic mt-1">{service.tagline}</p>
            </div>
          </div>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed border-b border-border pb-10 mb-10">
            {service.description}
          </p>

          {/* Two-column: What's included + Who it's for */}
          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <div>
              <h2 className="headline text-xl font-semibold mb-5">What's included</h2>
              <div className="space-y-5">
                {service.whatIncluded.map((f) => (
                  <div key={f.heading} className="flex gap-3">
                    <CheckCircle2 className="size-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm mb-0.5">{f.heading}</div>
                      <div className="text-sm text-muted-foreground leading-relaxed">{f.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="headline text-xl font-semibold mb-5">Who this is for</h2>
              <ul className="space-y-3">
                {service.whoFor.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="size-5 rounded-full bg-secondary/30 text-secondary-foreground flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Inline CTA card */}
              <div className="mt-8 rounded-2xl bg-primary/5 border border-primary/10 p-5">
                <div className="text-sm font-semibold text-primary mb-1">{service.cta}</div>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  A 15-minute discovery call is free. No commitment required.
                </p>
                <Button asChild size="sm" className="group">
                  <Link href="/book">
                    Book now <ArrowRight className="ml-1.5 size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Process */}
          <div className="mb-12">
            <h2 className="headline text-xl font-semibold mb-8">How it works</h2>
            <div className="relative">
              {/* Connector line */}
              <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border hidden md:block" />
              <div className="space-y-6">
                {service.process.map((p) => (
                  <div key={p.step} className="flex gap-5">
                    <div className="size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0 relative z-10">
                      {p.step}
                    </div>
                    <div className="pt-1.5 pb-4">
                      <div className="font-semibold mb-1">{p.title}</div>
                      <div className="text-sm text-muted-foreground leading-relaxed">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="mb-12">
            <h2 className="headline text-xl font-semibold mb-2">Frequently asked questions</h2>
            <p className="text-sm text-muted-foreground mb-6">Questions we hear often about this service.</p>
            <div className="rounded-2xl border bg-card/60 px-6 divide-y">
              {service.faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          {/* CTA banner */}
          <div className="rounded-3xl bg-primary text-primary-foreground p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
            <div>
              <h2 className="headline text-xl md:text-2xl font-semibold mb-1">{service.cta}</h2>
              <p className="text-primary-foreground/80 text-sm">Start with a free 15-minute call. No obligation.</p>
            </div>
            <Button size="lg" variant="secondary" asChild className="flex-shrink-0 group">
              <Link href="/book">Book a free call <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" /></Link>
            </Button>
          </div>
        </section>

        {/* Other services */}
        {otherServices.length > 0 && (
          <section className="container-page pb-16 border-t pt-12">
            <h2 className="headline text-xl font-semibold mb-6">Other services</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {otherServices.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`}>
                  <div className="group rounded-2xl border bg-card/60 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer h-full">
                    <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors mb-4">
                      {ICON_MAP[s.iconName]}
                    </div>
                    <div className="font-semibold group-hover:text-primary transition-colors mb-1">{s.title}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t bg-background/70">
        <div className="container-page py-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between text-xs text-muted-foreground">
            <div>© {new Date().getFullYear()} FineLine Financial Planning</div>
            <div className="flex gap-4">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <Link href="/services" className="hover:text-foreground transition-colors">Services</Link>
              <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
              <Link href="/book" className="hover:text-foreground transition-colors">Book</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
