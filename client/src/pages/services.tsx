import React from "react";
import { Link } from "wouter";
import { ArrowRight, BarChart3, Calendar, Shield, Users, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import logoImage from "@/assets/logo-fineline.png";
import heroImage from "@/assets/team-meeting_1.jpg";
import { services } from "@/data/services";

const ICON_MAP: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 className="size-6" />,
  Calendar: <Calendar className="size-6" />,
  Shield: <Shield className="size-6" />,
  Users: <Users className="size-6" />,
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

function Footer() {
  return (
    <footer className="border-t bg-background/70 mt-20">
      <div className="container-page py-10">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="FineLine Logo" className="size-10 rounded-xl object-cover shadow-sm" />
              <div>
                <div className="headline text-[15px] font-semibold">FineLine</div>
                <div className="text-xs text-muted-foreground">Financial Planning</div>
              </div>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Financial planning that feels straightforward: clear goals, smart structure, and consistent reviews.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-muted-foreground md:justify-end">
            <Link className="transition-colors hover:text-foreground" href="/">Home</Link>
            <Link className="transition-colors hover:text-foreground" href="/services">Services</Link>
            <Link className="transition-colors hover:text-foreground" href="/blog">Blog</Link>
            <Link className="transition-colors hover:text-foreground" href="/book">Book a consultation</Link>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} FineLine Financial Planning</div>
        </div>
      </div>
    </footer>
  );
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-noise">
      <Header />

      <main>
        {/* Hero */}
        <section className="container-page pt-12 pb-16 md:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs text-muted-foreground shadow-sm mb-5">
                <span className="size-1.5 rounded-full bg-primary" />
                What we offer
              </div>
              <h1 className="headline text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
                Financial planning built around your life.
              </h1>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                We offer a focused range of services covering the pillars that matter most — investments, retirement, protection, and family planning. Each service is personalised to your goals, not built from a template.
              </p>
              <div className="mt-6 flex gap-3 flex-wrap">
                <Button size="lg" asChild className="group">
                  <Link href="/book">Book a free consultation <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" /></Link>
                </Button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl aspect-[4/3]">
              <img src={heroImage} alt="FineLine team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <div className="headline text-xl font-bold">Personalised. Practical. Clear.</div>
                <p className="mt-1 text-sm text-white/80">Every service starts with understanding your situation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Service cards */}
        <section className="container-page pb-20">
          <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Our services</div>
          <h2 className="headline text-3xl md:text-4xl font-semibold mb-12">The pillars we plan across</h2>

          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service, i) => (
              <Card key={service.slug} className="group rounded-3xl border bg-card/60 shadow-sm hover:shadow-xl transition-all hover:-translate-y-0.5 overflow-hidden">
                <div className="p-8 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors flex-shrink-0">
                      {ICON_MAP[service.iconName]}
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground bg-muted rounded-full px-3 py-1">
                      {service.whoFor.length} client types
                    </span>
                  </div>

                  <h3 className="headline text-2xl font-bold group-hover:text-primary transition-colors mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground italic mb-4">{service.tagline}</p>
                  <p className="text-muted-foreground leading-relaxed text-sm flex-1">{service.description}</p>

                  <div className="mt-6 border-t pt-5">
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">What's included</div>
                    <ul className="space-y-1.5">
                      {service.whatIncluded.slice(0, 3).map((f) => (
                        <li key={f.heading} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="size-3.5 text-primary flex-shrink-0" />
                          {f.heading}
                        </li>
                      ))}
                      {service.whatIncluded.length > 3 && (
                        <li className="text-xs text-muted-foreground pl-5">
                          + {service.whatIncluded.length - 3} more
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="mt-6 flex gap-3 flex-wrap">
                    <Button asChild variant="outline" size="sm" className="rounded-full">
                      <Link href="/book">Book consultation</Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm" className="rounded-full group/link">
                      <Link href={`/services/${service.slug}`}>
                        View details <ChevronRight className="ml-1 size-3 transition-transform group-hover/link:translate-x-0.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="container-page pb-20">
          <div className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="headline text-2xl md:text-3xl font-semibold mb-2">Not sure where to start?</h2>
              <p className="text-primary-foreground/80 max-w-lg text-sm leading-relaxed">
                A 15-minute discovery call is free. We'll quickly understand your situation and point you towards the most valuable place to begin.
              </p>
            </div>
            <Button size="lg" variant="secondary" asChild className="flex-shrink-0 group">
              <Link href="/book">Book a free call <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" /></Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
