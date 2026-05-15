import React from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import logoImage from "@/assets/logo-fineline.png";
import { getBlogPost } from "@/data/blogs";

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug;
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-noise">
        <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur">
          <div className="container-page flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={logoImage}
                alt="FineLine Logo"
                className="size-10 rounded-xl object-cover shadow-sm"
              />
              <div className="leading-tight">
                <div className="headline text-[15px] font-semibold">FineLine</div>
                <div className="text-xs text-muted-foreground">Financial Planning</div>
              </div>
            </div>

            <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
              <Link className="transition-colors hover:text-foreground" href="/">
                Home
              </Link>
              <Link className="transition-colors hover:text-foreground" href="/blog">
                Blog
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <Button variant="ghost" className="hidden md:inline-flex" asChild>
                <Link href="/book">
                  Book a call
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button className="group" asChild>
                <Link href="/book">
                  Get a plan
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="container-page pt-12 pb-16">
          <div className="text-center">
            <h1 className="headline text-4xl font-semibold">Post not found</h1>
            <p className="mt-4 text-muted-foreground">The blog post you're looking for doesn't exist.</p>
            <Button asChild className="mt-6">
              <Link href="/blog">Back to Blog</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-noise">
      <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logoImage}
              alt="FineLine Logo"
              className="size-10 rounded-xl object-cover shadow-sm"
            />
            <div className="leading-tight">
              <div className="headline text-[15px] font-semibold">FineLine</div>
              <div className="text-xs text-muted-foreground">Financial Planning</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <Link className="transition-colors hover:text-foreground" href="/">
              Home
            </Link>
            <Link className="transition-colors hover:text-foreground" href="/blog">
              Blog
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden md:inline-flex" asChild>
              <Link href="/book">
                Book a call
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button className="group" asChild>
              <Link href="/book">
                Get a plan
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Full-bleed hero image */}
        {post.image && (
          <div className="relative w-full h-72 md:h-[480px] overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          </div>
        )}

        <section className="container-page pb-16">
          <div className="max-w-2xl mx-auto">
            {/* Back link + meta */}
            <div className="flex items-center gap-3 pt-8 mb-6">
              <Button variant="ghost" size="sm" asChild className="-ml-2">
                <Link href="/blog" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="size-3.5" />
                  All articles
                </Link>
              </Button>
              <span className="text-muted-foreground/40">·</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{post.date}</span>
            </div>

            <h1 className="headline text-3xl md:text-4xl font-semibold leading-tight mb-4">
              {post.title}
            </h1>

            <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed border-b border-border pb-10">
              {post.summary}
            </p>

            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA */}
            <div className="mt-12 rounded-3xl bg-primary/5 border border-primary/10 p-8 text-center">
              <div className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Ready to take the next step?</div>
              <p className="text-muted-foreground mb-5 max-w-sm mx-auto text-sm leading-relaxed">
                Talk to a financial planner who understands your situation and can build a plan around your goals.
              </p>
              <Button className="group" asChild>
                <Link href="/book">
                  Book a consultation
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <footer className="border-t bg-background/70">
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
