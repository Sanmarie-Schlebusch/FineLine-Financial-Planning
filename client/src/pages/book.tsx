import React, { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Calendar, Clock, CheckCircle2, ChevronLeft, ChevronRight, User, Mail, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import logoImage from "@/assets/logo-fineline.png";

// ── Helpers ──────────────────────────────────────────────────────────────────

const MEETING_TYPES = [
  {
    id: "discovery",
    label: "Discovery Call",
    duration: "15 min",
    description: "A quick intro to see if we're the right fit for your situation.",
    color: "bg-secondary/20 border-secondary/40 text-secondary-foreground",
    accent: "bg-secondary",
  },
  {
    id: "planning",
    label: "Planning Session",
    duration: "60 min",
    description: "A deep dive into your goals, current position, and what a plan could look like.",
    color: "bg-primary/10 border-primary/20 text-foreground",
    accent: "bg-primary",
  },
  {
    id: "review",
    label: "Annual Review",
    duration: "45 min",
    description: "For existing clients — review progress and recalibrate the plan.",
    color: "bg-muted border-border text-foreground",
    accent: "bg-muted-foreground",
  },
];

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM",
];

// Deterministic "taken" slots based on date so they feel realistic but stable
function getTakenSlots(date: Date): Set<string> {
  const seed = date.getDate() + date.getMonth() * 31;
  const taken = new Set<string>();
  TIME_SLOTS.forEach((slot, i) => {
    if ((seed * (i + 3)) % 5 === 0) taken.add(slot);
  });
  return taken;
}

function isWeekend(date: Date) {
  const d = date.getDay();
  return d === 0 || d === 6;
}

function isBefore(a: Date, b: Date) {
  return a.getTime() < b.getTime();
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function formatMonth(date: Date) {
  return date.toLocaleDateString("en-AU", { month: "long", year: "numeric" });
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" });
}

// Build calendar grid (6 rows × 7 cols)
function buildCalendarDays(month: Date): (Date | null)[] {
  const first = startOfMonth(month);
  const last = endOfMonth(month);
  const grid: (Date | null)[] = [];
  // Leading blanks (Mon-start week)
  const startDay = (first.getDay() + 6) % 7; // 0=Mon
  for (let i = 0; i < startDay; i++) grid.push(null);
  for (let d = new Date(first); d <= last; d = addDays(d, 1)) {
    grid.push(new Date(d));
  }
  while (grid.length % 7 !== 0) grid.push(null);
  return grid;
}

// ── Step indicator ────────────────────────────────────────────────────────────

const STEPS = ["Meeting type", "Date & time", "Your details", "Confirmed"];

function StepBar({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((label, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-1.5 min-w-0">
            <div className={cn(
              "size-7 rounded-full flex items-center justify-center text-xs font-bold transition-all",
              i < step ? "bg-primary text-primary-foreground" :
              i === step ? "bg-primary text-primary-foreground ring-4 ring-primary/20" :
              "bg-muted text-muted-foreground"
            )}>
              {i < step ? <CheckCircle2 className="size-4" /> : i + 1}
            </div>
            <span className={cn(
              "text-[10px] font-semibold uppercase tracking-wide hidden sm:block whitespace-nowrap",
              i <= step ? "text-foreground" : "text-muted-foreground"
            )}>{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={cn(
              "flex-1 h-0.5 mx-2 transition-all",
              i < step ? "bg-primary" : "bg-border"
            )} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── Shared header / footer ─────────────────────────────────────────────────

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
          <Link className="transition-colors hover:text-foreground" href="/blog">Blog</Link>
        </nav>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/" className="flex items-center gap-1.5 text-muted-foreground">
            <ArrowLeft className="size-3.5" />
            Back to site
          </Link>
        </Button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-background/70 mt-16">
      <div className="container-page py-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} FineLine Financial Planning</div>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function BookPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [step, setStep] = useState(0);
  const [meetingType, setMeetingType] = useState<string | null>(null);
  const [calendarMonth, setCalendarMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [formErrors, setFormErrors] = useState<Partial<typeof form>>({});

  const calendarDays = buildCalendarDays(calendarMonth);
  const takenSlots = selectedDate ? getTakenSlots(selectedDate) : new Set<string>();

  const canPrevMonth = calendarMonth > new Date(today.getFullYear(), today.getMonth(), 1)
    ? true : false;

  function prevMonth() {
    if (!canPrevMonth) return;
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  }
  function nextMonth() {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  }

  function isDayDisabled(day: Date) {
    return isWeekend(day) || isBefore(day, today);
  }

  function validateForm() {
    const errors: Partial<typeof form> = {};
    if (!form.name.trim()) errors.name = "Please enter your name.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Please enter a valid email.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const selectedMeeting = MEETING_TYPES.find(m => m.id === meetingType);

  // ── Step 0: Meeting type ───────────────────────────────────────────────────
  if (step === 0) return (
    <div className="min-h-screen bg-noise">
      <Header />
      <main className="container-page py-12 max-w-2xl mx-auto">
        <StepBar step={0} />
        <div className="mb-8">
          <div className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Book a consultation</div>
          <h1 className="headline text-3xl md:text-4xl font-semibold leading-tight">What kind of session are you after?</h1>
          <p className="mt-3 text-muted-foreground">Choose the option that best fits where you're at.</p>
        </div>
        <div className="grid gap-4">
          {MEETING_TYPES.map(m => (
            <button
              key={m.id}
              onClick={() => setMeetingType(m.id)}
              className={cn(
                "text-left rounded-2xl border p-5 flex items-start gap-4 transition-all hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                meetingType === m.id
                  ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                  : "border-border bg-card/60 hover:border-primary/40"
              )}
            >
              <div className={cn("mt-0.5 size-3 rounded-full flex-shrink-0", m.accent)} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-base">{m.label}</span>
                  <span className="text-xs font-semibold text-muted-foreground bg-muted rounded-full px-2.5 py-0.5 flex-shrink-0">
                    <Clock className="inline size-3 mr-1 -mt-0.5" />{m.duration}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{m.description}</p>
              </div>
              <div className={cn(
                "mt-0.5 size-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all",
                meetingType === m.id ? "border-primary bg-primary" : "border-border"
              )}>
                {meetingType === m.id && <div className="size-2 rounded-full bg-white" />}
              </div>
            </button>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <Button size="lg" disabled={!meetingType} onClick={() => setStep(1)} className="group">
            Next: Choose a time
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );

  // ── Step 1: Calendar + time slots ─────────────────────────────────────────
  if (step === 1) return (
    <div className="min-h-screen bg-noise">
      <Header />
      <main className="container-page py-12">
        <div className="max-w-3xl mx-auto">
          <StepBar step={1} />
          <div className="mb-8">
            <button onClick={() => setStep(0)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
              <ChevronLeft className="size-3.5" /> Back
            </button>
            <div className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
              {selectedMeeting?.label} · {selectedMeeting?.duration}
            </div>
            <h1 className="headline text-3xl font-semibold">Pick a date and time</h1>
            <p className="mt-2 text-muted-foreground text-sm">All times shown in New Zealand Time (NZST).</p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_auto]">
            {/* Calendar */}
            <div className="rounded-3xl border bg-card/60 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={prevMonth}
                  disabled={!canPrevMonth}
                  className="size-8 rounded-lg flex items-center justify-center hover:bg-muted disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <span className="text-sm font-semibold">{formatMonth(calendarMonth)}</span>
                <button
                  onClick={nextMonth}
                  className="size-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>

              {/* Day-of-week headers */}
              <div className="grid grid-cols-7 mb-2">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(d => (
                  <div key={d} className="text-center text-[10px] font-bold uppercase tracking-wide text-muted-foreground py-1">{d}</div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, i) => {
                  if (!day) return <div key={i} />;
                  const disabled = isDayDisabled(day);
                  const isSelected = selectedDate ? sameDay(day, selectedDate) : false;
                  const isToday = sameDay(day, today);
                  return (
                    <button
                      key={i}
                      disabled={disabled}
                      onClick={() => { setSelectedDate(day); setSelectedTime(null); }}
                      className={cn(
                        "aspect-square rounded-xl text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        disabled ? "text-muted-foreground/30 cursor-not-allowed" :
                        isSelected ? "bg-primary text-primary-foreground shadow-md" :
                        isToday ? "border border-primary/40 text-primary hover:bg-primary/10" :
                        "hover:bg-muted text-foreground"
                      )}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time slots */}
            <div className="rounded-3xl border bg-card/60 p-5 shadow-sm w-full md:w-56">
              {selectedDate ? (
                <>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    {formatDate(selectedDate)}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                    {TIME_SLOTS.map(slot => {
                      const taken = takenSlots.has(slot);
                      const active = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          disabled={taken}
                          onClick={() => setSelectedTime(slot)}
                          className={cn(
                            "rounded-xl py-2 px-3 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            taken ? "bg-muted/40 text-muted-foreground/40 cursor-not-allowed line-through" :
                            active ? "bg-primary text-primary-foreground shadow-md" :
                            "bg-muted hover:bg-primary/10 hover:text-primary text-foreground"
                          )}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center min-h-[200px]">
                  <div className="text-center text-sm text-muted-foreground">
                    <Calendar className="size-8 mx-auto mb-3 opacity-30" />
                    Select a date to see available times
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              size="lg"
              disabled={!selectedDate || !selectedTime}
              onClick={() => setStep(2)}
              className="group"
            >
              Next: Your details
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );

  // ── Step 2: Contact details ────────────────────────────────────────────────
  if (step === 2) return (
    <div className="min-h-screen bg-noise">
      <Header />
      <main className="container-page py-12 max-w-2xl mx-auto">
        <StepBar step={2} />
        <div className="mb-8">
          <button onClick={() => setStep(1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ChevronLeft className="size-3.5" /> Back
          </button>
          <div className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Almost there</div>
          <h1 className="headline text-3xl font-semibold">Your details</h1>
        </div>

        {/* Booking summary card */}
        <div className="rounded-2xl border bg-primary/5 border-primary/10 p-4 mb-8 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="size-4 text-primary" />
            <span>{selectedDate ? formatDate(selectedDate) : ""}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="size-4 text-primary" />
            <span>{selectedTime}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="font-semibold text-foreground">{selectedMeeting?.label}</span>
            <span>· {selectedMeeting?.duration}</span>
          </div>
        </div>

        <div className="rounded-3xl border bg-card/60 p-6 shadow-sm space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="flex items-center gap-1.5">
                <User className="size-3.5 text-muted-foreground" /> Full name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Jane Smith"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className={formErrors.name ? "border-destructive" : ""}
              />
              {formErrors.name && <p className="text-xs text-destructive">{formErrors.name}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="flex items-center gap-1.5">
                <Phone className="size-3.5 text-muted-foreground" /> Phone
              </Label>
              <Input
                id="phone"
                placeholder="+64 21 000 000"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="flex items-center gap-1.5">
              <Mail className="size-3.5 text-muted-foreground" /> Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="jane@example.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className={formErrors.email ? "border-destructive" : ""}
            />
            {formErrors.email && <p className="text-xs text-destructive">{formErrors.email}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="notes" className="flex items-center gap-1.5">
              <MessageSquare className="size-3.5 text-muted-foreground" /> Anything you'd like us to know? <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="notes"
              placeholder="e.g. I'm planning for retirement in 10 years, just started a new job..."
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              rows={3}
              className="resize-none"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            size="lg"
            onClick={() => { if (validateForm()) setStep(3); }}
            className="group"
          >
            Confirm booking
            <CheckCircle2 className="ml-2 size-4" />
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );

  // ── Step 3: Confirmation ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-noise">
      <Header />
      <main className="container-page py-12 max-w-xl mx-auto">
        <StepBar step={3} />
        <div className="rounded-3xl border bg-card/60 shadow-sm overflow-hidden">
          {/* Green top strip */}
          <div className="h-2 bg-gradient-to-r from-primary to-primary/60" />
          <div className="p-8 text-center">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="size-8 text-primary" />
            </div>
            <h1 className="headline text-2xl font-semibold mb-2">You're booked in!</h1>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              A confirmation has been sent to <span className="font-semibold text-foreground">{form.email}</span>.<br />
              We're looking forward to speaking with you.
            </p>

            <div className="rounded-2xl bg-muted/60 p-5 text-left space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <Calendar className="size-4 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Date</div>
                  <div className="text-sm font-medium">{selectedDate ? formatDate(selectedDate) : ""}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="size-4 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Time</div>
                  <div className="text-sm font-medium">{selectedTime} NZST</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="size-4 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Meeting type</div>
                  <div className="text-sm font-medium">{selectedMeeting?.label} · {selectedMeeting?.duration}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" asChild>
                <Link href="/">Back to home</Link>
              </Button>
              <Button asChild>
                <Link href="/blog">Read our articles</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
