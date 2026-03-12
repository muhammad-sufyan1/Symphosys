export interface WhyChooseSection {
  headline: string;
  intro: string;
  points: Array<{ title: string; body: string }>;
}

export interface ServiceEnhancement {
  slug: string;
  whyChooseSymphosys: WhyChooseSection;
  whyChooseService: WhyChooseSection;
}

export const serviceEnhancements: ServiceEnhancement[] = [
  {
    slug: 'web-development',
    whyChooseSymphosys: {
      headline: 'Why Symphosys Works for Web Projects',
      intro:
        'We build websites the way operators think about revenue: clarity, speed, and conversion. The goal is not a pretty site. It is a site that earns.',
      points: [
        {
          title: 'Revenue-first architecture',
          body: 'Every page is mapped to a measurable action, not just a visual section.',
        },
        {
          title: 'Performance as a feature',
          body: 'We treat load speed as part of the user experience, not an afterthought.',
        },
        {
          title: 'Launch-ready, not launch-only',
          body: 'We deliver a CMS and a system that your team can operate without us.',
        },
      ],
    },
    whyChooseService: {
      headline: 'Why Choose Us for Web Development',
      intro:
        'You will get a site that is fast, clear, and structured for growth. We are not shipping templates. We are shipping a sales asset.',
      points: [
        {
          title: 'Clear conversion paths',
          body: 'We remove noise so the visitor always knows the next step.',
        },
        {
          title: 'SEO-ready foundation',
          body: 'Clean structure, semantic HTML, and technical SEO baked in.',
        },
        {
          title: 'Built to scale',
          body: 'The system supports new pages, services, and campaigns without rework.',
        },
      ],
    },
  },
  {
    slug: 'shopify-store-design',
    whyChooseSymphosys: {
      headline: 'Why Symphosys Works for Shopify Brands',
      intro:
        'We approach Shopify like a retail floor: how people browse, compare, and commit. The design must move shoppers forward.',
      points: [
        {
          title: 'Conversion-first design',
          body: 'Every layout choice is tested against buying behavior, not trends.',
        },
        {
          title: 'Mobile obsession',
          body: 'Most of your customers live on mobile. We design for their thumbs first.',
        },
        {
          title: 'Operational simplicity',
          body: 'Your team can run promotions, updates, and campaigns without delay.',
        },
      ],
    },
    whyChooseService: {
      headline: 'Why Choose Us for Shopify Store Design',
      intro:
        'We build stores that feel premium, load fast, and convert consistently.',
      points: [
        {
          title: 'Custom theme, not a facelift',
          body: 'We design around your brand and products, not a generic template.',
        },
        {
          title: 'Product pages that sell',
          body: 'Stronger storytelling, better trust signals, and fewer distractions.',
        },
        {
          title: 'Checkout confidence',
          body: 'We remove friction to reduce abandonment and protect margin.',
        },
      ],
    },
  },
  {
    slug: 'graphic-design',
    whyChooseSymphosys: {
      headline: 'Why Symphosys Works for Visual Systems',
      intro:
        'Design is a trust signal. We build systems your team can use daily, not one-off assets that look good in a deck.',
      points: [
        {
          title: 'Systems over one-offs',
          body: 'You get reusable templates and rules, not just isolated files.',
        },
        {
          title: 'Brand consistency',
          body: 'Every touchpoint looks like the same company, every time.',
        },
        {
          title: 'Speed without shortcuts',
          body: 'We create fast workflows without sacrificing quality.',
        },
      ],
    },
    whyChooseService: {
      headline: 'Why Choose Us for Graphic Design',
      intro:
        'You will get work that looks premium and stays consistent across every channel.',
      points: [
        {
          title: 'Design that performs',
          body: 'We focus on clarity, hierarchy, and attention, not decoration.',
        },
        {
          title: 'Built for scale',
          body: 'Your team can produce new assets without breaking the system.',
        },
        {
          title: 'Clear creative direction',
          body: 'We avoid vague visuals and build around a defined message.',
        },
      ],
    },
  },
  {
    slug: 'video-editing',
    whyChooseSymphosys: {
      headline: 'Why Symphosys Works for Video',
      intro:
        'We edit for attention, retention, and action. Every cut is tied to a measurable goal.',
      points: [
        {
          title: 'Hook-first structure',
          body: 'We earn attention in the first seconds to protect watch time.',
        },
        {
          title: 'Platform-native pacing',
          body: 'Each edit matches the rhythm of where it will be published.',
        },
        {
          title: 'Conversion-aware',
          body: 'We place CTAs where viewers are most likely to act.',
        },
      ],
    },
    whyChooseService: {
      headline: 'Why Choose Us for Video Editing',
      intro:
        'You will get edits that hold attention and drive the next step.',
      points: [
        {
          title: 'Retention-driven edits',
          body: 'Every sequence is built to reduce drop-off.',
        },
        {
          title: 'Consistent style',
          body: 'Color, audio, and pacing stay coherent across your library.',
        },
        {
          title: 'Fast, reliable delivery',
          body: 'We ship on a predictable cadence so content never stalls.',
        },
      ],
    },
  },
  {
    slug: 'video-animations',
    whyChooseSymphosys: {
      headline: 'Why Symphosys Works for Animation',
      intro:
        'Complex ideas need clarity. We use motion to simplify, not to distract.',
      points: [
        {
          title: 'Clear messaging',
          body: 'We start with the story before we animate a frame.',
        },
        {
          title: 'Design with purpose',
          body: 'Every visual cue reinforces the product value.',
        },
        {
          title: 'Multi-use outputs',
          body: 'We deliver cutdowns built for sales, onboarding, and ads.',
        },
      ],
    },
    whyChooseService: {
      headline: 'Why Choose Us for Video Animation',
      intro:
        'You will get animation that makes the product easy to understand and easy to buy.',
      points: [
        {
          title: 'Narrative structure',
          body: 'We move from pain to solution without fluff.',
        },
        {
          title: 'Brand-consistent motion',
          body: 'The animation looks and feels like your company.',
        },
        {
          title: 'Sales enablement ready',
          body: 'Your team can use it across multiple touchpoints.',
        },
      ],
    },
  },
  {
    slug: 'growth-marketing',
    whyChooseSymphosys: {
      headline: 'Why Symphosys Works for Growth',
      intro:
        'Growth comes from systems, not random campaigns. We build the system and measure every move.',
      points: [
        {
          title: 'Structured experimentation',
          body: 'We run prioritized tests, not guesswork.',
        },
        {
          title: 'Full-funnel view',
          body: 'Acquisition, activation, retention, all measured together.',
        },
        {
          title: 'Data-driven execution',
          body: 'Every change is tied to a metric and a goal.',
        },
      ],
    },
    whyChooseService: {
      headline: 'Why Choose Us for Growth Marketing',
      intro:
        'You will get a roadmap that compounds over time and a team that executes it.',
      points: [
        {
          title: 'Priority-based roadmap',
          body: 'We focus on leverage before volume.',
        },
        {
          title: 'Conversion-first mindset',
          body: 'We lift results without just buying more traffic.',
        },
        {
          title: 'Transparent reporting',
          body: 'You always know what was tested and what moved.',
        },
      ],
    },
  },
  {
    slug: 'lead-generation',
    whyChooseSymphosys: {
      headline: 'Why Symphosys Works for Lead Generation',
      intro:
        'We care about lead quality more than lead count. The goal is sales-ready conversations.',
      points: [
        {
          title: 'Clear ICP targeting',
          body: 'We define the buyer before we write a single line.',
        },
        {
          title: 'Multi-channel reach',
          body: 'Inbound and outbound work together, not separately.',
        },
        {
          title: 'Pipeline visibility',
          body: 'Every lead is tracked and scored, not just captured.',
        },
      ],
    },
    whyChooseService: {
      headline: 'Why Choose Us for Lead Generation',
      intro:
        'You will get a system that delivers qualified leads consistently.',
      points: [
        {
          title: 'Lead quality filters',
          body: 'We qualify leads before they ever hit your calendar.',
        },
        {
          title: 'Follow-up automation',
          body: 'No lead is lost because of slow response.',
        },
        {
          title: 'Sales alignment',
          body: 'Messaging is matched to how your sales team closes.',
        },
      ],
    },
  },
  {
    slug: 'brand-building',
    whyChooseSymphosys: {
      headline: 'Why Symphosys Works for Brand Building',
      intro:
        'We build brands that make decisions easier for your customers. That is the standard.',
      points: [
        {
          title: 'Positioning first',
          body: 'We define what you own before we design how you look.',
        },
        {
          title: 'Strategic identity',
          body: 'Your visuals are tied to a clear market message.',
        },
        {
          title: 'Launch-ready assets',
          body: 'You leave with everything needed to go live fast.',
        },
      ],
    },
    whyChooseService: {
      headline: 'Why Choose Us for Brand Building',
      intro:
        'You will get a brand system that supports premium pricing and clarity.',
      points: [
        {
          title: 'Messaging that sells',
          body: 'Clear language that makes value obvious.',
        },
        {
          title: 'Identity with depth',
          body: 'A visual system that can scale across touchpoints.',
        },
        {
          title: 'Consistent rollout',
          body: 'Everything designed to launch smoothly.',
        },
      ],
    },
  },
  {
    slug: 'digital-marketing',
    whyChooseSymphosys: {
      headline: 'Why Symphosys Works for Digital Marketing',
      intro:
        'We integrate channels so performance compounds. The strategy is unified, not fragmented.',
      points: [
        {
          title: 'Single source of truth',
          body: 'One strategy, one message, one set of KPIs.',
        },
        {
          title: 'Channel coordination',
          body: 'SEO, paid, and email work together instead of competing.',
        },
        {
          title: 'Continuous optimization',
          body: 'We improve every month, not just at launch.',
        },
      ],
    },
    whyChooseService: {
      headline: 'Why Choose Us for Digital Marketing',
      intro:
        'You will get a coordinated marketing system that lowers acquisition cost.',
      points: [
        {
          title: 'Unified messaging',
          body: 'We align every channel to the same narrative.',
        },
        {
          title: 'Measurement discipline',
          body: 'Every channel is tied to revenue impact.',
        },
        {
          title: 'Campaign speed',
          body: 'We ship and optimize without long delays.',
        },
      ],
    },
  },
  {
    slug: 'creative-ads',
    whyChooseSymphosys: {
      headline: 'Why Symphosys Works for Creative Ads',
      intro:
        'Performance lives in the creative. We build ads that feel native and drive results.',
      points: [
        {
          title: 'Hook strategy',
          body: 'We test angles that earn attention immediately.',
        },
        {
          title: 'Platform-native design',
          body: 'Each ad feels built for the channel, not recycled.',
        },
        {
          title: 'Iteration cadence',
          body: 'We move fast and learn faster.',
        },
      ],
    },
    whyChooseService: {
      headline: 'Why Choose Us for Creative Ads',
      intro:
        'You will get creative that performs and stays on-brand.',
      points: [
        {
          title: 'Performance storytelling',
          body: 'Every ad is built to convert, not just look good.',
        },
        {
          title: 'Creative testing system',
          body: 'We ship variations and prove what works.',
        },
        {
          title: 'Brand consistency',
          body: 'Your ads look like your company, not a template.',
        },
      ],
    },
  },
];
