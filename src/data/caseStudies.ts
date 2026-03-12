export interface CaseStudy {
  slug: string;
  serviceName: string;
  title: string;
  subtitle: string;
  client: string;
  industry: string;
  location: string;
  summary: string;
  heroImage: string;
  problem: string;
  approach: string[];
  fix: string;
  impact: Array<{ label: string; value: string }>;
  proofOfWork: string[];
  timeline: Array<{ phase: string; detail: string }>;
  testimonial: {
    quote: string;
    name: string;
    role: string;
    company: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'web-development',
    serviceName: 'Web Development',
    title: 'Harborline Logistics',
    subtitle: 'From a slow brochure site to a high-converting lead engine.',
    client: 'Harborline Logistics',
    industry: 'Logistics & Transportation',
    location: 'Seattle, WA',
    summary:
      'Harborline needed a modern web presence with clear service positioning, faster performance, and a lead flow that matched their sales capacity.',
    heroImage: '/case-studies/web-development.svg',
    problem:
      'The existing site took 6+ seconds to load, buried key services, and failed to qualify inbound leads. Sales was spending time on low-fit inquiries.',
    approach: [
      'Rebuilt the information architecture around the highest-margin routes.',
      'Designed a conversion-first homepage and service funnels with clear qualification steps.',
      'Engineered performance improvements targeting Core Web Vitals.',
    ],
    fix:
      'We delivered a new custom site with a focused lead capture flow, fast page loads, and a CMS the team could update without developer support.',
    impact: [
      { label: 'Load Time', value: '5.8s → 1.6s' },
      { label: 'Qualified Leads', value: '+42% in 60 days' },
      { label: 'Bounce Rate', value: '-28%' },
    ],
    proofOfWork: [
      'Custom logistics service funnel with qualifying form logic',
      'SEO migration with clean redirects and updated metadata',
      'Performance tuning for images, fonts, and hydration',
    ],
    timeline: [
      { phase: 'Week 1', detail: 'Discovery, analytics review, and funnel mapping' },
      { phase: 'Week 2-3', detail: 'Design system + high-converting page layouts' },
      { phase: 'Week 4-5', detail: 'Development, CMS setup, QA, and launch' },
    ],
    testimonial: {
      quote:
        'We stopped wasting time on low-fit leads. The new site speaks directly to the right customers and loads instantly.',
      name: 'Claire M.',
      role: 'Marketing Director',
      company: 'Harborline Logistics',
    },
  },
  {
    slug: 'shopify-store-design',
    serviceName: 'Shopify Store Design',
    title: 'Evergreen Supply Co.',
    subtitle: 'A premium Shopify rebuild that lifted conversion and AOV.',
    client: 'Evergreen Supply Co.',
    industry: 'Home & Lifestyle',
    location: 'Austin, TX',
    summary:
      'Evergreen wanted a Shopify experience that felt premium and guided buyers to higher-ticket products without slowing the site.',
    heroImage: '/case-studies/shopify-store-design.svg',
    problem:
      'The old theme was bloated, product pages lacked trust signals, and checkout drop-offs were climbing.',
    approach: [
      'Designed a custom Shopify theme focused on clarity and trust.',
      'Rebuilt product pages with benefit-led content and visual hierarchy.',
      'Optimized checkout flow and mobile performance.',
    ],
    fix:
      'We launched a custom theme, streamlined navigation, and improved product storytelling to reduce friction at purchase.',
    impact: [
      { label: 'Conversion Rate', value: '+26%' },
      { label: 'Average Order Value', value: '+14%' },
      { label: 'Checkout Abandonment', value: '-18%' },
    ],
    proofOfWork: [
      'Custom Shopify theme with performance tuning',
      'Upsell-ready product page layout',
      'Trust-first checkout optimization',
    ],
    timeline: [
      { phase: 'Week 1', detail: 'Customer journey audit + UX strategy' },
      { phase: 'Week 2-4', detail: 'Design, theme build, and content migration' },
      { phase: 'Week 5', detail: 'Launch, testing, and conversion QA' },
    ],
    testimonial: {
      quote:
        'We finally have a storefront that feels premium and converts like one. Mobile performance improved overnight.',
      name: 'Jason R.',
      role: 'Founder',
      company: 'Evergreen Supply Co.',
    },
  },
  {
    slug: 'graphic-design',
    serviceName: 'Graphic Design',
    title: 'Crescent Health',
    subtitle: 'A visual system built to win trust in a crowded market.',
    client: 'Crescent Health',
    industry: 'Healthcare',
    location: 'Chicago, IL',
    summary:
      'Crescent needed a cohesive design system for campaigns, social, and sales materials that felt credible and human.',
    heroImage: '/case-studies/graphic-design.svg',
    problem:
      'Their visuals were inconsistent and dated, which made it harder to build trust with new patients and partners.',
    approach: [
      'Created a modular design system with reusable templates.',
      'Aligned typography and color with trust and clarity cues.',
      'Built campaign-ready assets for web, social, and print.',
    ],
    fix:
      'We delivered a full visual toolkit and an asset library the internal team could use immediately.',
    impact: [
      { label: 'Campaign Engagement', value: '+62%' },
      { label: 'Partner Inquiries', value: '+19%' },
      { label: 'Design Turnaround', value: '3x faster' },
    ],
    proofOfWork: [
      'Brand-aligned social and paid ad templates',
      'Sales deck redesign with clearer messaging flow',
      'Print collateral for clinics and events',
    ],
    timeline: [
      { phase: 'Week 1', detail: 'Audit, brand immersion, and system planning' },
      { phase: 'Week 2', detail: 'Template creation and asset production' },
      { phase: 'Week 3', detail: 'Rollout + training for internal teams' },
    ],
    testimonial: {
      quote:
        'The design system finally made us look like a serious healthcare brand. Our team moves faster with every campaign.',
      name: 'Talia W.',
      role: 'Marketing Lead',
      company: 'Crescent Health',
    },
  },
  {
    slug: 'video-editing',
    serviceName: 'Video Editing',
    title: 'Skyline Fitness',
    subtitle: 'Retention-first editing that lifted watch time and sign-ups.',
    client: 'Skyline Fitness',
    industry: 'Fitness & Wellness',
    location: 'Los Angeles, CA',
    summary:
      'Skyline needed content that held attention on YouTube and converted viewers into trial memberships.',
    heroImage: '/case-studies/video-editing.svg',
    problem:
      'Their raw footage was strong, but audience retention dropped in the first 30 seconds and videos failed to drive trials.',
    approach: [
      'Rebuilt intros with stronger hooks and faster pacing.',
      'Added on-screen cues, chapters, and CTA moments.',
      'Optimized audio and color for a cohesive feel.',
    ],
    fix:
      'We delivered a repeatable editing framework with retention-focused structure and clear conversion moments.',
    impact: [
      { label: 'Average Watch Time', value: '+35%' },
      { label: 'Trial Sign-ups', value: '+18%' },
      { label: 'YouTube Subscribers', value: '+22%' },
    ],
    proofOfWork: [
      'Hook-first edit framework for long-form videos',
      'Short-form cutdowns for Reels and Shorts',
      'CTA timing tests to improve conversion rate',
    ],
    timeline: [
      { phase: 'Week 1', detail: 'Content audit + retention analysis' },
      { phase: 'Week 2', detail: 'Editing system build + sample batch' },
      { phase: 'Ongoing', detail: 'Weekly delivery + optimization' },
    ],
    testimonial: {
      quote:
        'Our content finally keeps people watching. The pacing and structure are on another level.',
      name: 'Diego P.',
      role: 'Content Manager',
      company: 'Skyline Fitness',
    },
  },
  {
    slug: 'video-animations',
    serviceName: 'Video Animations',
    title: 'Pulse Analytics',
    subtitle: 'An explainer series that shortened the sales cycle.',
    client: 'Pulse Analytics',
    industry: 'SaaS',
    location: 'Denver, CO',
    summary:
      'Pulse needed a clear, animated explainer to simplify a complex product for enterprise buyers.',
    heroImage: '/case-studies/video-animations.svg',
    problem:
      'Prospects were confused by the platform and required long live demos before they understood the value.',
    approach: [
      'Scripted the core story around the pain, the insight, and the outcome.',
      'Designed a minimalist animation system for clarity.',
      'Built short cutdowns for onboarding and sales.',
    ],
    fix:
      'We delivered a full explainer plus modular clips for sales decks, onboarding, and ad use.',
    impact: [
      { label: 'Demo-to-Decision Time', value: '-21%' },
      { label: 'Sales Enablement Use', value: 'Adopted by 100% of reps' },
      { label: 'Product Clarity Score', value: '+38%' },
    ],
    proofOfWork: [
      '90-second explainer with narrative arc',
      'Animated feature walkthrough clips',
      'Brand-aligned motion system',
    ],
    timeline: [
      { phase: 'Week 1', detail: 'Messaging workshop + script' },
      { phase: 'Week 2', detail: 'Storyboard + style frames' },
      { phase: 'Week 3-4', detail: 'Animation + final delivery' },
    ],
    testimonial: {
      quote:
        'The explainer shortened our sales cycle almost immediately. Prospects finally get it before the demo.',
      name: 'Natalie H.',
      role: 'VP Marketing',
      company: 'Pulse Analytics',
    },
  },
  {
    slug: 'growth-marketing',
    serviceName: 'Growth Marketing',
    title: 'Northgate SaaS',
    subtitle: 'A full-funnel growth system that reduced CAC.',
    client: 'Northgate SaaS',
    industry: 'B2B SaaS',
    location: 'Boston, MA',
    summary:
      'Northgate needed predictable growth without over-relying on paid spend.',
    heroImage: '/case-studies/growth-marketing.svg',
    problem:
      'Paid acquisition costs were rising and the funnel lacked structured experimentation.',
    approach: [
      'Audited the funnel and built an experiment roadmap.',
      'Refined messaging and landing pages for better activation.',
      'Introduced lifecycle email and retention triggers.',
    ],
    fix:
      'We launched a structured growth program with weekly experiments and measurable conversion goals.',
    impact: [
      { label: 'CAC', value: '-24%' },
      { label: 'Trial-to-Paid', value: '+12%' },
      { label: 'MRR Growth', value: '+19%' },
    ],
    proofOfWork: [
      'Experiment backlog with impact scoring',
      'Landing page optimization program',
      'Lifecycle email automation',
    ],
    timeline: [
      { phase: 'Month 1', detail: 'Audit + roadmap + quick-win tests' },
      { phase: 'Month 2', detail: 'CRO sprints + activation improvements' },
      { phase: 'Month 3', detail: 'Retention and upsell automation' },
    ],
    testimonial: {
      quote:
        'They gave us a real system, not random tactics. Our CAC dropped and growth stabilized.',
      name: 'Kevin D.',
      role: 'CEO',
      company: 'Northgate SaaS',
    },
  },
  {
    slug: 'lead-generation',
    serviceName: 'Lead Generation',
    title: 'Atlas Advisory',
    subtitle: 'A multi-channel lead engine for a high-ticket consultancy.',
    client: 'Atlas Advisory',
    industry: 'Professional Services',
    location: 'New York, NY',
    summary:
      'Atlas needed higher-quality leads and a repeatable outbound + inbound system.',
    heroImage: '/case-studies/lead-generation.svg',
    problem:
      'Lead volume was inconsistent and outreach lacked personalization and follow-up structure.',
    approach: [
      'Built ICP-based prospect lists and segmented messaging.',
      'Created a lead magnet with a conversion-ready landing page.',
      'Implemented follow-up sequences and CRM tracking.',
    ],
    fix:
      'We launched a combined inbound/outbound engine with measurable lead quality scoring.',
    impact: [
      { label: 'Qualified Leads', value: '+55%' },
      { label: 'Reply Rate', value: '+18%' },
      { label: 'Booked Meetings', value: '+21%' },
    ],
    proofOfWork: [
      'Lead magnet design + funnel copywriting',
      'Personalized outbound sequencing',
      'CRM integration with lead scoring',
    ],
    timeline: [
      { phase: 'Week 1', detail: 'ICP definition + list building' },
      { phase: 'Week 2', detail: 'Landing page + lead magnet' },
      { phase: 'Week 3-4', detail: 'Outreach launch + optimization' },
    ],
    testimonial: {
      quote:
        'We finally have predictable lead flow. The quality is noticeably higher.',
      name: 'Brian S.',
      role: 'Managing Partner',
      company: 'Atlas Advisory',
    },
  },
  {
    slug: 'brand-building',
    serviceName: 'Brand Building',
    title: 'Solstice Botanics',
    subtitle: 'A brand position that justified premium pricing.',
    client: 'Solstice Botanics',
    industry: 'Consumer Goods',
    location: 'Portland, OR',
    summary:
      'Solstice needed a brand narrative and identity that matched its product quality.',
    heroImage: '/case-studies/brand-building.svg',
    problem:
      'Their visual identity looked generic and didn’t support premium pricing in retail and DTC.',
    approach: [
      'Facilitated positioning workshops to define differentiation.',
      'Built a cohesive identity system and messaging framework.',
      'Developed rollout assets across packaging and digital.',
    ],
    fix:
      'We delivered a full brand system with premium visual cues and clear messaging hierarchy.',
    impact: [
      { label: 'Average Order Value', value: '+20%' },
      { label: 'Direct Traffic', value: '+34%' },
      { label: 'Retail Sell-Through', value: '+17%' },
    ],
    proofOfWork: [
      'Brand positioning + messaging map',
      'Packaging design system',
      'Launch campaign visuals',
    ],
    timeline: [
      { phase: 'Week 1-2', detail: 'Research + strategy workshops' },
      { phase: 'Week 3-4', detail: 'Identity system design' },
      { phase: 'Week 5', detail: 'Launch assets + rollout plan' },
    ],
    testimonial: {
      quote:
        'The new brand gave us the confidence to price where we always should have been.',
      name: 'Lena K.',
      role: 'Founder',
      company: 'Solstice Botanics',
    },
  },
  {
    slug: 'digital-marketing',
    serviceName: 'Digital Marketing',
    title: 'BrightPath Clinics',
    subtitle: 'An integrated marketing stack for consistent bookings.',
    client: 'BrightPath Clinics',
    industry: 'Healthcare Services',
    location: 'Phoenix, AZ',
    summary:
      'BrightPath needed a unified digital strategy across SEO, paid, and retention.',
    heroImage: '/case-studies/digital-marketing.svg',
    problem:
      'Channels were managed separately, creating inconsistent messaging and wasted ad spend.',
    approach: [
      'Aligned channel strategy around a single growth narrative.',
      'Rebuilt landing pages for each service line.',
      'Created a monthly optimization cadence.',
    ],
    fix:
      'We launched a coordinated marketing system with shared KPIs and unified reporting.',
    impact: [
      { label: 'Organic Traffic', value: '+48%' },
      { label: 'Cost per Lead', value: '-27%' },
      { label: 'Booked Calls', value: '+33%' },
    ],
    proofOfWork: [
      'SEO content + technical fixes',
      'Paid search and paid social optimization',
      'Retention email sequences',
    ],
    timeline: [
      { phase: 'Month 1', detail: 'Audit + channel alignment' },
      { phase: 'Month 2', detail: 'Landing page rebuild + ads refresh' },
      { phase: 'Month 3', detail: 'Optimization + retention program' },
    ],
    testimonial: {
      quote:
        'Everything finally works together. Leads are up and costs are down.',
      name: 'Morgan T.',
      role: 'Operations Director',
      company: 'BrightPath Clinics',
    },
  },
  {
    slug: 'creative-ads',
    serviceName: 'Creative Ads',
    title: 'Lumen Home',
    subtitle: 'Scroll-stopping creative that lifted ROAS.',
    client: 'Lumen Home',
    industry: 'E-commerce',
    location: 'Miami, FL',
    summary:
      'Lumen wanted ad creative that matched their premium product line and outperformed generic catalog ads.',
    heroImage: '/case-studies/creative-ads.svg',
    problem:
      'Existing ads blended in with competitors and underperformed on CTR and ROAS.',
    approach: [
      'Developed three creative angles based on customer pain points.',
      'Produced modular assets for Meta, TikTok, and YouTube.',
      'Tested hooks and offers in rapid cycles.',
    ],
    fix:
      'We delivered a new creative system with consistent visual identity and high-performing hooks.',
    impact: [
      { label: 'CTR', value: '+41%' },
      { label: 'CPA', value: '-29%' },
      { label: 'ROAS', value: '+1.6x' },
    ],
    proofOfWork: [
      'Creative testing matrix across 12 ad variations',
      'UGC-style ad production',
      'Platform-native motion graphics',
    ],
    timeline: [
      { phase: 'Week 1', detail: 'Research + creative strategy' },
      { phase: 'Week 2', detail: 'Production + edits' },
      { phase: 'Week 3', detail: 'Testing + iteration' },
    ],
    testimonial: {
      quote:
        'The new ads finally feel like us. Performance jumped across every channel.',
      name: 'Samantha J.',
      role: 'Growth Lead',
      company: 'Lumen Home',
    },
  },
];
