import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Calendar,
  ChevronRight,
  Menu,
  Shield,
  MessageSquare,
  CheckCircle2,
  Users,
  Clock,
  X,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { blogPosts } from "@/data/blogs";

import heroImage from "@/assets/team-meeting_3.jpg";
import team1 from "@/assets/team-meeting_1.jpg";
import team2 from "@/assets/team-meeting_2.jpg";
import team3 from "@/assets/team-meeting_3.jpg";
import logoImage from "@/assets/logo-fineline.png";
const profileImage = `${import.meta.env.BASE_URL}profile.png`;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

function Stat({ label, value, testId }: { label: string; value: string; testId: string }) {
  return (
    <div className="rounded-2xl border bg-card/60 p-4 shadow-sm" data-testid={testId}>
      <div className="headline text-2xl font-semibold leading-none" data-testid={`${testId}-value`}>{value}</div>
      <div className="mt-1 text-sm text-muted-foreground" data-testid={`${testId}-label`}>{label}</div>
    </div>
  );
}

function ServiceCard({ icon, title, description, testId, serviceSlug }: { icon: React.ReactNode; title: string; description: string; testId: string; serviceSlug: string }) {
  return (
    <div className="group relative rounded-3xl border bg-card/60 p-8 shadow-sm transition-all hover:shadow-2xl hover:-translate-y-1 hover:border-secondary/30" data-testid={testId}>
      <div className="flex flex-col h-full">
        <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors" data-testid={`${testId}-icon`}>
          {icon}
        </div>
        <h3 className="headline mt-6 text-2xl font-bold group-hover:text-primary transition-colors" data-testid={`${testId}-title`}>{title}</h3>
        <p className="mt-4 text-muted-foreground leading-relaxed flex-grow" data-testid={`${testId}-description`}>{description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="outline" size="sm" className="rounded-full bg-background/50 hover:bg-secondary hover:text-secondary-foreground" asChild data-testid={`${testId}-action-1`}>
            <Link href="/book">Book Consultation</Link>
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full group/link" asChild data-testid={`${testId}-action-2`}>
            <Link href={`/services/${serviceSlug}`}>View Details <ArrowUpRight className="ml-1 size-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" /></Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function Testimonial({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <div className="rounded-3xl border bg-card/40 p-6 shadow-sm backdrop-blur-sm">
      <div className="flex gap-1 text-secondary">
        {[...Array(5)].map((_, i) => (
          <CheckCircle2 key={i} className="size-4 fill-current" />
        ))}
      </div>
      <p className="mt-4 text-base italic leading-relaxed text-muted-foreground">"{quote}"</p>
      <div className="mt-6 flex items-center gap-3">
        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary headline font-bold">
          {author[0]}
        </div>
        <div>
          <div className="text-sm font-semibold">{author}</div>
          <div className="text-xs text-muted-foreground">{role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-noise">
      <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur" data-testid="header-site">
        <div className="container-page flex h-16 items-center justify-between">
          <div className="flex items-center gap-3" data-testid="brand-wrap">
            <img 
              src={logoImage} 
              alt="FineLine Logo" 
              className="size-10 rounded-xl object-cover shadow-sm"
              data-testid="img-logo"
            />
            <div className="leading-tight" data-testid="text-brand">
              <div className="headline text-[15px] font-semibold">FineLine</div>
              <div className="text-xs text-muted-foreground">Financial Planning</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex" data-testid="nav-primary">
            <Link className="transition-colors hover:text-foreground" href="/services" data-testid="link-services">Services</Link>
            <a className="transition-colors hover:text-foreground" href="#process" data-testid="link-process">Process</a>
            <a className="transition-colors hover:text-foreground" href="#faq" data-testid="link-faq">FAQ</a>
            <Link className="transition-colors hover:text-foreground" href="/blog" data-testid="link-blog">
              Blog
            </Link>
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2" data-testid="actions-header">
            <Button variant="ghost" asChild data-testid="button-call">
              <Link href="/book">
                Book a call
                <ChevronRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button className="group" asChild data-testid="button-cta-header">
              <Link href="/book">
                Get a plan
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>

          {/* Mobile actions */}
          <div className="flex md:hidden items-center gap-2">
            <Button size="sm" asChild>
              <Link href="/book">Book</Link>
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <nav className="container-page flex flex-col py-4 gap-1">
              <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm hover:bg-muted transition-colors">Services</Link>
              <a href="#process" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm hover:bg-muted transition-colors">Process</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm hover:bg-muted transition-colors">FAQ</a>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm hover:bg-muted transition-colors">Blog</Link>
              <div className="mt-2 pt-2 border-t">
                <Button className="w-full group" asChild>
                  <Link href="/book" onClick={() => setMobileMenuOpen(false)}>
                    Book a free consultation
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Trust Bar - Clean Blue Separator */}
        <div className="bg-primary h-2 shadow-sm relative z-10" data-testid="trust-bar">
        </div>

        <section className="container-page pt-12 md:pt-16" data-testid="section-hero">
          <div className="grid items-start gap-10 md:grid-cols-[1.15fr_.85fr]">
            <motion.div
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              variants={fadeUp}
            >
              <div
                className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs text-muted-foreground shadow-sm"
                data-testid="badge-hero"
              >
                <span className="size-1.5 rounded-full bg-primary" />
                Advice you can understand. A plan you can follow.
              </div>

              <h1
                className="headline mt-5 text-4xl font-semibold leading-[1.06] tracking-tight md:text-6xl"
                data-testid="text-hero-title"
              >
                Modern financial planning,
                <span className="text-primary"> without the noise</span>.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg" data-testid="text-hero-subtitle">
                Clear, structured guidance for retirement, investments, and risk planning—built around your goals and updated as life changes.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row" data-testid="hero-ctas">
                <Button size="lg" className="group" asChild data-testid="button-hero-primary">
                  <Link href="/book">
                    Book a free intro
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-card/60" asChild data-testid="button-hero-secondary">
                  <Link href="/services">View services</Link>
                </Button>
              </div>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl aspect-[4/3]"
              data-testid="card-hero"
            >
              <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" alt="Family financial planning meeting" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <div className="headline text-2xl font-bold">Your future, planned.</div>
                <p className="mt-2 text-sm text-white/80">Expert guidance for every stage of your financial journey.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Profile Section */}
        <section className="container-page mt-16 md:mt-24" data-testid="section-profile">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              variants={fadeUp}
            >
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-bold" data-testid="profile-kicker">Holistic financial planning</div>
              <h2 className="headline mt-2 text-3xl md:text-4xl font-semibold" data-testid="profile-title">
                Travis Allen
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed" data-testid="profile-bio">
                There are some questions that Google can't answer. But more importantly — there are some things that Google can't ask you! With the increasing automation around us, we need to choose to have people in our lives who build relationships of trust and can help us ask the right questions about our futures.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                As a financial advisor, this is what I'm good at. It's not about what financial products you choose, or what investment vehicles you select; it's about why you make those choices, and knowing exactly what choices may serve you and your family best.
              </p>
              <div className="mt-4 text-sm font-semibold text-primary">Financial Advisor</div>
              <div className="mt-8" data-testid="profile-cta">
                <Button className="group" data-testid="button-profile-cta">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden" data-testid="profile-image-placeholder">
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="container-page mt-16 md:mt-24" data-testid="section-philosophy">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="headline text-3xl md:text-4xl font-semibold" data-testid="philosophy-title">
              Our Philosophy
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed" data-testid="philosophy-subtitle">
              Building lasting relationships through tailored financial guidance that puts your family's future first.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="rounded-3xl border bg-card/60 p-8 shadow-sm text-center" data-testid="philosophy-card-1">
              <div className="size-12 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Users className="size-6 text-primary" />
              </div>
              <h3 className="headline text-xl font-bold mb-4" data-testid="philosophy-card-title-1">Tailored Advice</h3>
              <p className="text-muted-foreground leading-relaxed" data-testid="philosophy-card-desc-1">
                Every family is unique. We create personalized financial plans that adapt to your specific circumstances, goals, and risk tolerance.
              </p>
            </Card>
            <Card className="rounded-3xl border bg-card/60 p-8 shadow-sm text-center" data-testid="philosophy-card-2">
              <div className="size-12 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Shield className="size-6 text-primary" />
              </div>
              <h3 className="headline text-xl font-bold mb-4" data-testid="philosophy-card-title-2">Built on Trust</h3>
              <p className="text-muted-foreground leading-relaxed" data-testid="philosophy-card-desc-2">
                Transparency and integrity are at the core of everything we do. We believe in clear communication and honest guidance you can rely on.
              </p>
            </Card>
            <Card className="rounded-3xl border bg-card/60 p-8 shadow-sm text-center" data-testid="philosophy-card-3">
              <div className="size-12 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Clock className="size-6 text-primary" />
              </div>
              <h3 className="headline text-xl font-bold mb-4" data-testid="philosophy-card-title-3">Long-Term Relationships</h3>
              <p className="text-muted-foreground leading-relaxed" data-testid="philosophy-card-desc-3">
                We're here for the journey. Regular reviews and ongoing support ensure your plan evolves with your life, providing peace of mind for years to come.
              </p>
            </Card>
          </div>
        </section>

        <section id="services" className="container-page mt-16 md:mt-24" data-testid="section-services">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-sm text-muted-foreground" data-testid="text-services-kicker">What we do</div>
              <h2 className="headline mt-2 text-2xl font-semibold md:text-4xl" data-testid="text-services-title">
                A clear plan across the pillars that matter.
              </h2>
            </div>
            <Link
              href="/services"
              className="hidden items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:flex"
              data-testid="link-services-all"
            >
              See all services <ChevronRight className="size-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3" data-testid="grid-features">
            <ServiceCard
              icon={<BarChart3 className="size-6" />}
              title="Investment planning"
              description="Align your portfolio to your goals, time horizon, and comfort with risk—without overcomplication."
              testId="card-feature-investment"
              serviceSlug="investment-planning"
            />
            <ServiceCard
              icon={<Calendar className="size-6" />}
              title="Retirement planning"
              description="Understand where you stand, what to change, and how to stay on track with simple review cycles."
              testId="card-feature-retirement"
              serviceSlug="retirement-planning"
            />
            <ServiceCard
              icon={<Shield className="size-6" />}
              title="Risk & protection"
              description="Make sure the important things are protected—life cover, disability, and estate basics."
              testId="card-feature-risk"
              serviceSlug="risk-and-protection"
            />
          </div>

          <Card className="mt-6 overflow-hidden rounded-3xl border bg-card/60 p-0 shadow-sm" data-testid="card-callout">
            <div className="grid gap-0 md:grid-cols-[1fr_.9fr]">
              <div className="p-6 md:p-8" data-testid="callout-left">
                <div className="headline text-xl font-semibold" data-testid="text-callout-title">A plan you can actually use</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground" data-testid="text-callout-body">
                  We translate complexity into a one-page summary and a simple action list—so you always know what to do next.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row" data-testid="callout-ctas">
                  <Button className="group" asChild data-testid="button-callout-primary">
                    <Link href="/book">Start with a snapshot
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" /></Link>
                  </Button>
                  <Button variant="outline" className="bg-background/60" data-testid="button-callout-secondary">
                    Download brochure
                  </Button>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/12 via-accent/10 to-transparent p-6 md:p-8" data-testid="callout-right">
                <div className="grid gap-3" data-testid="callout-metrics">
                  {["Clarity-first advice", "No jargon", "Review cadence", "Goal tracking"].map((t, i) => (
                    <div
                      key={t}
                      className="rounded-2xl border bg-background/70 px-4 py-3 text-sm shadow-sm"
                      data-testid={`pill-callout-${i}`}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="container-page mt-16 md:mt-32">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="headline text-3xl md:text-4xl font-semibold">What our clients say</h2>
            <p className="mt-4 text-muted-foreground">Real stories from people who have achieved financial peace of mind with our guided planning.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Testimonial 
              quote="The clarity I gained after just one session was incredible. I finally feel in control of my retirement."
              author="Sarah M."
              role="Business Owner"
            />
            <Testimonial 
              quote="No jargon, just straight talk. FineLine made the complex world of investments actually make sense."
              author="David K."
              role="Senior Architect"
            />
            <Testimonial 
              quote="Excellent service and regular updates. They really care about the long-term relationship."
              author="Linda W."
              role="Retired Professional"
            />
          </div>
        </section>

        {/* Blog Section */}
        <section className="container-page mt-16 md:mt-32" data-testid="section-blog">
          <div className="flex items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-sm text-muted-foreground" data-testid="blog-kicker">Insights & Articles</div>
              <h2 className="headline mt-2 text-2xl font-semibold md:text-4xl" data-testid="blog-title">
                Financial Planning Insights
              </h2>
            </div>
            <a
              href="#"
              className="hidden items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:flex"
              data-testid="blog-view-all"
            >
              View all articles <ChevronRight className="size-4" />
            </a>
          </div>
          <div className="grid gap-8 md:grid-cols-3" data-testid="blog-grid">
            {[{ post: blogPosts[0], img: `${import.meta.env.BASE_URL}Retirement.jpeg` }, { post: blogPosts[1], img: `${import.meta.env.BASE_URL}Growing Families.jpeg` }, { post: blogPosts[2], img: `${import.meta.env.BASE_URL}Risk Management.jpeg` }].map(({ post, img }, idx) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="rounded-3xl border bg-card/60 overflow-hidden shadow-sm group hover:shadow-xl transition-all cursor-pointer" data-testid={`blog-card-${idx + 1}`}>
                  <div className="aspect-video overflow-hidden" data-testid={`blog-image-${idx + 1}`}>
                    <img src={img} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6" data-testid={`blog-content-${idx + 1}`}>
                    <h3 className="headline text-lg font-bold mb-3 group-hover:text-primary transition-colors" data-testid={`blog-title-${idx + 1}`}>
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4" data-testid={`blog-summary-${idx + 1}`}>
                      {post.summary}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary" data-testid={`blog-read-more-${idx + 1}`}>
                      Read More <ArrowUpRight className="ml-1 size-3" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section id="process" className="container-page mt-16 pb-16 md:mt-32" data-testid="section-process">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-sm text-secondary font-bold tracking-wider uppercase" data-testid="text-process-kicker">Guided Journey</div>
            <h2 className="headline mt-2 text-3xl md:text-5xl font-semibold" data-testid="text-process-title">
              Our 6-Step Financial Planning Process
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We follow a structured, internationally recognized approach to ensure your financial plan is robust, clear, and actionable.
            </p>
          </div>

          <div className="relative" data-testid="process-diagram-container">
            {/* Connection Line for Desktop */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary/10 hidden md:block -translate-y-1/2 z-0" />
            
            <div className="grid gap-8 md:grid-cols-3 md:gap-y-16 relative z-10">
              {[
                { step: 1, title: "Establish Relationship", desc: "Setting the foundation and explaining how we work together." },
                { step: 2, title: "Gather Information", desc: "Understanding your current situation and your long-term goals." },
                { step: 3, title: "Analyze Status", desc: "Evaluating where you are now vs where you want to be." },
                { step: 4, title: "Develop Proposal", desc: "Crafting a clear, structured plan built around your needs." },
                { step: 5, title: "Implement Plan", desc: "Putting the recommendations into action with precision." },
                { step: 6, title: "Monitor & Review", desc: "Ongoing reviews to keep you on track as life changes." }
              ].map((item, i) => (
                <div key={i} className="group relative" data-testid={`process-step-${i}`}>
                  <div className="bg-background border rounded-3xl p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 hover:border-secondary/30 relative">
                    <div className="absolute -top-4 -left-4 size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center headline font-bold text-lg shadow-lg group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                      {item.step}
                    </div>
                    <h3 className="headline text-xl font-bold mt-2" data-testid={`process-step-title-${i}`}>{item.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed" data-testid={`process-step-desc-${i}`}>
                      {item.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-bold text-primary group-hover:text-secondary transition-colors">
                      Learn more <ChevronRight className="size-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="container-page mt-16 pb-16">
          <div id="faq" className="grid gap-4 md:grid-cols-3" data-testid="grid-faq">
            {["How do I get started?", "Do you work remotely?", "What does it cost?"]
              .map((q, i) => (
                <div key={q} className="rounded-3xl border bg-card/60 p-6 shadow-sm" data-testid={`card-faq-${i}`}>
                  <div className="headline text-lg font-semibold" data-testid={`text-faq-q-${i}`}>{q}</div>
                  <div className="mt-2 text-sm leading-relaxed text-muted-foreground" data-testid={`text-faq-a-${i}`}>
                    {i === 0 && "Book a short intro call, then we’ll build your snapshot and agree on priorities."}
                    {i === 1 && "Yes—video calls and secure document sharing make the process easy wherever you are."}
                    {i === 2 && "Pricing depends on scope. We’ll confirm it after the intro call—no surprises."}
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-10 rounded-3xl border bg-background/70 p-6 shadow-sm md:p-8" data-testid="section-footer-cta">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="headline text-xl font-semibold" data-testid="text-footer-cta-title">Ready for a calmer plan?</div>
                <div className="mt-1 text-sm text-muted-foreground" data-testid="text-footer-cta-subtitle">
                  Start with a free 15-minute intro call.
                </div>
              </div>
              <div className="flex gap-3" data-testid="footer-cta-actions">
                <Button size="lg" className="group" data-testid="button-footer-cta-primary">
                  Book now
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
                <Button size="lg" variant="outline" className="bg-card/60" data-testid="button-footer-cta-secondary">
                  Email us
                </Button>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t bg-background/70" data-testid="footer-site">
          <div className="container-page py-10">
            <div className="grid gap-8 md:grid-cols-2 md:items-start">
              <div data-testid="footer-left">
                <div className="flex items-center gap-3" data-testid="footer-brand">
                  <img 
                    src={logoImage} 
                    alt="FineLine Logo" 
                    className="size-10 rounded-xl object-cover shadow-sm"
                    data-testid="footer-logo"
                  />
                  <div>
                    <div className="headline text-[15px] font-semibold" data-testid="text-footer-brand">FineLine</div>
                    <div className="text-xs text-muted-foreground" data-testid="text-footer-brand-sub">Financial Planning</div>
                  </div>
                </div>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground" data-testid="text-footer-about">
                  Financial planning that feels straightforward: clear goals, smart structure, and consistent reviews.
                </p>
              </div>

              <div className="grid gap-3 text-sm text-muted-foreground md:justify-end" data-testid="footer-right">
                <Link href="/services" className="transition-colors hover:text-foreground" data-testid="link-footer-services">Services</Link>
                <a href="#process" className="transition-colors hover:text-foreground" data-testid="link-footer-process">Process</a>
                <a href="#faq" className="transition-colors hover:text-foreground" data-testid="link-footer-faq">FAQ</a>
                <Link className="transition-colors hover:text-foreground" href="/blog" data-testid="link-footer-blog">Blog</Link>
                <div className="mt-4 pt-4 border-t border-muted-foreground/20" data-testid="footer-compliance">
                  <div className="flex items-center gap-3 mb-2" data-testid="footer-brokerage">
                    <div className="size-8 bg-muted rounded flex items-center justify-center text-xs font-bold" data-testid="brokerage-logo-placeholder">
                      LOGO
                    </div>
                    <span className="text-xs">Affiliated Brokerage</span>
                  </div>
                  <div className="text-xs" data-testid="footer-fsp">
                    FSP Number: [FSP-XXXXXX]
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-2 border-t pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between" data-testid="footer-bottom">
              <div data-testid="text-footer-copy">© {new Date().getFullYear()} FineLine Financial Planning</div>
              <div data-testid="text-footer-note">This is a UI refresh prototype.</div>
            </div>
          </div>
        </footer>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="lg" className="rounded-full shadow-2xl h-14 px-6 gap-3 group">
          <MessageSquare className="size-5" />
          <span>Chat with us</span>
          <ArrowUpRight className="size-4 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0" />
        </Button>
      </div>
    </div>
  );
}
