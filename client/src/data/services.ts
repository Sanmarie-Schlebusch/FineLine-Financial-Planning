export interface ServiceFeature {
  heading: string;
  body: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string; // maps to lucide icon key in the UI
  color: string;   // tailwind accent class
  whoFor: string[];
  whatIncluded: ServiceFeature[];
  process: { step: number; title: string; desc: string }[];
  faqs: ServiceFAQ[];
  cta: string;
}

export const services: Service[] = [
  {
    slug: "investment-planning",
    title: "Investment planning",
    tagline: "A portfolio built around your goals, not a generic template.",
    description:
      "We help you build and manage an investment strategy that matches where you want to go, how long you have to get there, and how much uncertainty you can comfortably live with — without overcomplicating the picture.",
    iconName: "BarChart3",
    color: "text-primary bg-primary/10",
    whoFor: [
      "First-time investors unsure where to start",
      "Working professionals accumulating wealth outside of super",
      "Couples wanting to align their investment approach",
      "Anyone reviewing an existing portfolio that may no longer fit their life",
    ],
    whatIncluded: [
      {
        heading: "Goal alignment",
        body: "We start by understanding what the money is actually for — retirement, property, education, or financial freedom — and build the strategy around those goals.",
      },
      {
        heading: "Risk profiling",
        body: "A structured conversation (not just a checkbox) to understand your real tolerance for volatility, income needs, and investment time horizon.",
      },
      {
        heading: "Portfolio construction",
        body: "A diversified, cost-conscious portfolio using appropriate vehicles — managed funds, ETFs, direct assets — matched to your situation.",
      },
      {
        heading: "Ongoing review",
        body: "Quarterly or annual check-ins to rebalance, adapt to life changes, and keep the strategy pointing in the right direction.",
      },
      {
        heading: "Clear reporting",
        body: "Straightforward reporting that shows how your investments are performing relative to your goals — not just market benchmarks.",
      },
    ],
    process: [
      { step: 1, title: "Discovery call", desc: "A 15-minute intro to understand your situation and whether we're the right fit." },
      { step: 2, title: "Deep dive session", desc: "A 60-minute planning session where we explore goals, current position, and risk profile in detail." },
      { step: 3, title: "Strategy development", desc: "We build a personalised investment strategy and present it clearly — no jargon, no assumptions." },
      { step: 4, title: "Implementation", desc: "We help you put the plan in place, step by step, at a pace that works for you." },
      { step: 5, title: "Ongoing partnership", desc: "Regular reviews and proactive check-ins to keep everything on track as life changes." },
    ],
    faqs: [
      {
        question: "How much do I need to invest to get started?",
        answer: "There's no minimum. What matters is that you have a clear goal and the intention to invest consistently over time. We'll build a plan that works with what you have today and grows with you.",
      },
      {
        question: "Do you manage my investments directly?",
        answer: "Yes — as a licensed financial adviser, we can implement and manage your investment strategy directly, or provide advice that you implement yourself. We'll agree on the arrangement that suits you best.",
      },
      {
        question: "What investment products do you use?",
        answer: "We're not aligned to any particular product provider, so we recommend what's genuinely appropriate — typically low-cost diversified funds, ETFs, and KiwiSaver strategies.",
      },
      {
        question: "How often will we review the portfolio?",
        answer: "For active clients, we review quarterly. We'll also reach out proactively when markets or your life circumstances change in ways that warrant attention.",
      },
    ],
    cta: "Start with a free discovery call",
  },
  {
    slug: "retirement-planning",
    title: "Retirement planning",
    tagline: "Know exactly where you stand — and what it will take to get there.",
    description:
      "Retirement planning is more than picking a superannuation fund. It's about understanding your target, modelling the path, and making consistent decisions over time that add up to a retirement you've actually designed.",
    iconName: "Calendar",
    color: "text-primary bg-primary/10",
    whoFor: [
      "People in their 30s and 40s who want to get a head start",
      "Those approaching retirement in the next 5–10 years",
      "Couples who want to align their retirement timelines",
      "Anyone unsure if they're on track and what 'on track' even means for them",
    ],
    whatIncluded: [
      {
        heading: "Retirement projection",
        body: "A clear model of your projected retirement income based on current savings, expected contributions, investment returns, and inflation.",
      },
      {
        heading: "Gap analysis",
        body: "We identify any shortfall between where you're heading and where you want to be — and show you the most efficient ways to close it.",
      },
      {
        heading: "KiwiSaver optimisation",
        body: "Review of your contribution rate, fund type, and provider to ensure your KiwiSaver is working as hard as it can for your specific timeline.",
      },
      {
        heading: "Drawdown strategy",
        body: "As you approach retirement, we plan how you'll convert your wealth into income — tax-efficiently and in a way that lasts.",
      },
      {
        heading: "Quarterly reviews",
        body: "Retirement planning isn't a set-and-forget exercise. We review your progress each quarter and adjust as life changes.",
      },
    ],
    process: [
      { step: 1, title: "Discovery call", desc: "A 15-minute conversation to understand your retirement vision and current position." },
      { step: 2, title: "Planning session", desc: "A 60-minute session to gather the details needed to build your retirement model." },
      { step: 3, title: "Retirement report", desc: "We present a clear, personalised retirement projection with recommended actions." },
      { step: 4, title: "Implementation", desc: "We help you action the plan — adjusting contributions, restructuring investments, or updating KiwiSaver." },
      { step: 5, title: "Ongoing reviews", desc: "Quarterly check-ins to track progress and adapt to changes in income, goals, or market conditions." },
    ],
    faqs: [
      {
        question: "When should I start retirement planning?",
        answer: "The honest answer is: as early as possible. The compounding effect of time means that starting in your 30s has a dramatically different outcome to starting in your 50s. But it's never too late to get a plan in place.",
      },
      {
        question: "How much will I need to retire comfortably?",
        answer: "It depends on your lifestyle, retirement age, and how long you expect to live. As a starting point, many planners use 70–80% of pre-retirement income. We'll model your specific situation rather than using a generic rule.",
      },
      {
        question: "Can you help with both KiwiSaver and other investments?",
        answer: "Absolutely. KiwiSaver is usually the foundation, but a comprehensive retirement plan often includes investments outside of KiwiSaver too. We look at the full picture.",
      },
      {
        question: "What if my retirement timeline changes?",
        answer: "Life changes — career shifts, family events, unexpected windfalls or setbacks. Our quarterly reviews are designed to catch these changes early and keep your plan relevant.",
      },
    ],
    cta: "Book a free retirement projection call",
  },
  {
    slug: "risk-and-protection",
    title: "Risk & protection",
    tagline: "Protect everything you've worked for — before you need to.",
    description:
      "Risk management is the part of financial planning that people most often defer — until something goes wrong. We help you identify the gaps in your protection, understand your options, and put the right cover in place without over-insuring.",
    iconName: "Shield",
    color: "text-primary bg-primary/10",
    whoFor: [
      "Families with dependants relying on their income",
      "Business owners with personal financial exposure",
      "Anyone who hasn't reviewed their insurance since major life changes",
      "People holding insurance through superannuation who aren't sure if it's adequate",
    ],
    whatIncluded: [
      {
        heading: "Insurance needs analysis",
        body: "A structured review of your income, debts, dependants, and lifestyle to determine how much cover you actually need — and where the gaps are.",
      },
      {
        heading: "Life cover",
        body: "Ensuring your family would be financially secure if you died — paying off debt, replacing income, and funding education or other needs.",
      },
      {
        heading: "Income protection",
        body: "Replacing your income if illness or injury prevents you from working — often the most important cover for working-age people.",
      },
      {
        heading: "TPD & trauma cover",
        body: "Coverage for serious injury, permanent disability, or specified illness events that may not end your life but significantly change your financial situation.",
      },
      {
        heading: "Regular reviews",
        body: "Your insurance needs change as your life does. We review your cover annually and after major life events to keep it right-sized.",
      },
    ],
    process: [
      { step: 1, title: "Discovery call", desc: "A 15-minute conversation to understand your current cover and family situation." },
      { step: 2, title: "Needs analysis", desc: "A thorough assessment of income, debts, dependants, and existing cover." },
      { step: 3, title: "Recommendation", desc: "A clear written recommendation covering what to put in place, with whom, and why — no pressure." },
      { step: 4, title: "Implementation", desc: "We handle the application process and liaise with insurers on your behalf." },
      { step: 5, title: "Annual review", desc: "A yearly check to ensure cover remains appropriate as your life and finances evolve." },
    ],
    faqs: [
      {
        question: "Don't I already have insurance through my KiwiSaver or employer?",
        answer: "You may have some cover, but default group insurance is rarely calibrated to your specific needs. The amount is often too low, and the terms may not match your situation. A proper review will tell you quickly where you stand.",
      },
      {
        question: "How much does insurance cost?",
        answer: "It varies significantly by age, health, occupation, and the type of cover. We'll model the cost of appropriate cover for your situation before you commit to anything.",
      },
      {
        question: "Is income protection really necessary?",
        answer: "For most working New Zealanders, yes. ACC covers accidents, but illness is the most common reason people can't work — and ACC doesn't cover that. Income protection fills that gap.",
      },
      {
        question: "Do you receive commission on insurance products?",
        answer: "We're transparent about how we're remunerated. Any commission arrangement is disclosed upfront, and we only recommend products we genuinely believe are in your best interest.",
      },
    ],
    cta: "Book a free cover review",
  },
  {
    slug: "family-financial-planning",
    title: "Family financial planning",
    tagline: "A plan that keeps pace with your family as it grows and changes.",
    description:
      "Growing families face a unique set of financial pressures — new children, parental leave, education costs, bigger homes. We help you build a plan that addresses all of it, without leaving anything important to chance.",
    iconName: "Users",
    color: "text-primary bg-primary/10",
    whoFor: [
      "Couples planning for or expecting children",
      "Families navigating parental leave and income changes",
      "Parents starting to think about education savings",
      "Blended families with complex financial arrangements",
    ],
    whatIncluded: [
      {
        heading: "Budget & cashflow planning",
        body: "A clear picture of your household income and expenditure — and a realistic plan for managing money through the changes a growing family brings.",
      },
      {
        heading: "Parental leave planning",
        body: "Modelling the financial impact of parental leave and building a strategy to manage it without derailing other goals.",
      },
      {
        heading: "Education savings",
        body: "A structured savings strategy for school and university costs — started early enough for compounding to do the heavy lifting.",
      },
      {
        heading: "Insurance review",
        body: "Ensuring life, income protection, and health cover are calibrated to your family's actual needs — not just default policy amounts.",
      },
      {
        heading: "Goal setting & review",
        body: "A family financial plan that's reviewed regularly and updated as your situation changes — because it will.",
      },
    ],
    process: [
      { step: 1, title: "Discovery call", desc: "A 15-minute conversation about your family, your goals, and your timeline." },
      { step: 2, title: "Planning session", desc: "A 60-minute deep dive covering income, expenses, insurance, and priorities." },
      { step: 3, title: "Family financial plan", desc: "A clear, written plan covering all the priorities we've discussed — presented simply." },
      { step: 4, title: "Implementation", desc: "We help you act on the plan, in priority order, at a pace that works for your family." },
      { step: 5, title: "Ongoing reviews", desc: "Quarterly reviews to keep the plan current as your family grows and life changes." },
    ],
    faqs: [
      {
        question: "When should we get a family financial plan?",
        answer: "Ideally before major life changes — before a first child, before parental leave, or when your income situation changes significantly. But any time is better than never.",
      },
      {
        question: "Can you help us with both short-term and long-term goals?",
        answer: "Yes — a good family financial plan addresses both the immediate (cashflow, parental leave, insurance) and the long-term (retirement, education, wealth building). We look at the full picture.",
      },
      {
        question: "What if we have different financial priorities as a couple?",
        answer: "That's very common, and part of what a planning conversation helps with. We work with both of you to find a shared approach that respects both perspectives.",
      },
      {
        question: "We're not sure we can afford a financial adviser right now.",
        answer: "Most people find that good financial advice pays for itself quickly — through better decisions, reduced costs, and avoided mistakes. Start with a free discovery call to understand what's involved.",
      },
    ],
    cta: "Book a free family planning call",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
