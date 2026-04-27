import React from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import logoImage from "@/assets/logo-fineline.png";
import heroImage from "@/assets/team-meeting_3.jpg";
import { blogPosts } from "@/data/blogs";

function BlogCard({ title, summary, date, slug }: { title: string; summary: string; date: string; slug: string }) {
  return (
    <Card className="group flex flex-col overflow-hidden">
      <div className="relative h-44 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/20" />
        <img
          src={heroImage}
          alt="Blog post preview"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{date}</div>
        <h3 className="headline text-xl font-semibold">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground flex-1">{summary}</p>
        <div className="mt-4">
          <Button
            variant="ghost"
            className="w-full justify-between"
            asChild
          >
            <Link href={`/blog/${slug}`} className="w-full flex items-center justify-between">
              Read more
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function Blog() {
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
            <Link className="transition-colors hover:text-foreground" href="/">
              Home
            </Link>
            <Link className="transition-colors hover:text-foreground" href="/blog">
              Blog
            </Link>
          </nav>

          <div className="flex items-center gap-2" data-testid="actions-header">
            <Button variant="ghost" className="hidden md:inline-flex" data-testid="button-call">
              Book a call
              <ArrowRight className="ml-1 size-4" />
            </Button>
            <Button className="group" data-testid="button-cta-header">
              Get a plan
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="container-page pt-12 pb-16 md:pt-16" data-testid="section-hero">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs text-muted-foreground shadow-sm">
                <span className="size-1.5 rounded-full bg-primary" />
                Insights for confident family planning
              </div>

              <h1 className="headline mt-5 text-4xl font-semibold leading-[1.06] tracking-tight md:text-6xl">
                Articles &amp; resources for families
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Explore practical advice on budgeting, investing, and long-term planning—from a trusted financial planning perspective.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="group">
                  Subscribe for updates
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
                <Button size="lg" variant="outline" className="bg-card/60">
                  Back to home
                </Button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl">
              <img src={heroImage} alt="Family financial planning" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <div className="headline text-2xl font-bold">Real stories. Practical advice.</div>
                <p className="mt-2 text-sm text-white/80">Short reads designed to help families plan with confidence.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container-page" data-testid="section-blog">
          <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Latest insights</div>
              <h2 className="headline mt-2 text-3xl md:text-4xl font-semibold">From the FineLine blog</h2>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
                A curated collection of articles to help you take the next step toward your financial goals.
              </p>
            </div>
          </header>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                summary={post.summary}
                date={post.date}
                slug={post.slug}
              />
            ))}
          </div>
        </section>

        <footer className="border-t bg-background/70" data-testid="footer-site">
          <div className="container-page py-10">
            <div className="grid gap-8 md:grid-cols-2 md:items-start">
              <div>
                <div className="flex items-center gap-3">
                  <img
                    src={logoImage}
                    alt="FineLine Logo"
                    className="size-10 rounded-xl object-cover shadow-sm"
                  />
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
                <Link className="transition-colors hover:text-foreground" href="/">
                  Home
                </Link>
                <Link className="transition-colors hover:text-foreground" href="/blog">
                  Blog
                </Link>
                <a href="#" className="transition-colors hover:text-foreground">
                  Contact
                </a>
                <div className="mt-4 pt-4 border-t border-muted-foreground/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="size-8 bg-muted rounded flex items-center justify-center text-xs font-bold">
                      LOGO
                    </div>
                    <span className="text-xs">Affiliated Brokerage</span>
                  </div>
                  <div className="text-xs">FSP Number: [FSP-XXXXXX]</div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-2 border-t pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
              <div>© {new Date().getFullYear()} FineLine Financial Planning</div>
              <div>This is a UI refresh prototype.</div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
