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
              <Button variant="ghost" className="hidden md:inline-flex">
                Book a call
                <ArrowRight className="ml-1 size-4" />
              </Button>
              <Button className="group">
                Get a plan
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
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
            <Button variant="ghost" className="hidden md:inline-flex">
              Book a call
              <ArrowRight className="ml-1 size-4" />
            </Button>
            <Button className="group">
              Get a plan
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="container-page pt-12 pb-16">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="size-4" />
                Back to Blog
              </Link>
            </Button>

            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              {post.date}
            </div>

            <h1 className="headline text-4xl md:text-5xl font-semibold leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {post.summary}
            </p>

            {post.image && (
              <div className="relative overflow-hidden rounded-3xl mb-8">
                <img src={post.image} alt={post.title} className="w-full h-64 md:h-96 object-cover" />
              </div>
            )}

            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-12 pt-8 border-t">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="text-center sm:text-left">
                  <p className="text-muted-foreground">Ready to discuss your financial goals?</p>
                </div>
                <Button className="group">
                  Book a consultation
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>
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
