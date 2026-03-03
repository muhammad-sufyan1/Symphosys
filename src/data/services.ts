import { 
  Code2, Smartphone, Zap, Search, TrendingUp, ShieldCheck, Edit3, 
  ShoppingCart, LayoutTemplate, Settings, Users, PenTool, Mail, 
  Package, Presentation, MonitorPlay, Video, Clapperboard, Mic, 
  BarChart, Target, RefreshCw, UserPlus, MessageSquare, Briefcase, 
  Award, Globe, Megaphone, Crosshair, Database, MousePointerClick, Image
} from 'lucide-react';

export const servicesData = [
  {
    id: 'web-development',
    slug: 'web-development',
    icon: Code2,
    shortDescription: 'Fast, SEO-ready custom websites.',
    metaTitle: 'Professional Web Development Services | Fast, SEO-Ready Websites That Convert',
    metaDescription: 'We build high-performance custom websites engineered for speed, search engine visibility, and conversion. From business sites to web apps — built to grow your business.',
    focusKeywords: 'web development services, custom website development, professional web design company',
    hero: {
      title: 'Websites That Work as Hard as You Do',
      description: "Your website is your digital storefront. A slow or confusing site doesn't just hurt your image—it costs you leads and sales every single day.\n\nWe build fast, beautiful, and technically sound websites engineered to convert visitors into customers. Every project starts with your business goals and ends with measurable results.",
      ctaText: 'Get a Free Consultation',
    },
    included: {
      title: "What's Included",
      subtitle: 'Everything That Goes Into a Website That Actually Performs',
      items: [
        { title: 'Custom Design', description: "Every website we build is designed from scratch for your brand. We don't use templates or recycle layouts. Your website will look unique, feel intentional, and accurately represent the quality of your business at every touchpoint.", icon: PenTool },
        { title: 'Mobile-First Development', description: 'Over 60% of web traffic comes from mobile devices. We design and develop mobile-first — meaning your website works perfectly on every screen size, from the smallest smartphone to a widescreen desktop monitor.', icon: Smartphone },
        { title: 'Speed Optimization', description: 'Page speed directly affects your Google rankings and your conversion rate. We optimize every website for sub-2-second load times, targeting strong Core Web Vitals scores through clean code, optimized images, efficient loading, and the right hosting setup.', icon: Zap },
        { title: 'Technical SEO Foundation', description: 'Every website we build includes a solid technical SEO foundation: semantic HTML structure, proper heading hierarchy, structured data markup, optimized meta tags, clean URL structures, XML sitemaps, and Google Search Console integration. Ranking on Google starts with how your site is built.', icon: Search },
        { title: 'Conversion Rate Optimization', description: 'Traffic without conversions is wasted potential. We place calls-to-action strategically, position trust signals at key decision points, and design user flows that guide visitors naturally toward the action you want them to take.', icon: TrendingUp },
        { title: 'Secure & Scalable Infrastructure', description: 'SSL, regular backups, performance monitoring, and hosting infrastructure built to handle traffic spikes and grow with your business. Your website is built to last, not just to launch.', icon: ShieldCheck },
        { title: 'Easy Content Management', description: 'We build on intuitive CMS platforms and provide full training so your team can handle everyday content updates independently — no technical background required.', icon: Edit3 },
      ]
    },
    process: {
      title: 'Our Web Development Process',
      subtitle: 'What Happens From Kickoff to Launch',
      items: [
        { title: 'Step 1 — Discovery & Strategy', description: 'Before any design or code, we understand your business, your audience, your competitors, and your goals. We define the site structure, the content strategy, and the conversion objectives for every key page.' },
        { title: 'Step 2 — Wireframing & Architecture', description: "We map out your site's information architecture and create wireframes that establish the layout and content hierarchy of every page before visual design begins." },
        { title: 'Step 3 — Design & Client Approval', description: "Our designers create full, high-fidelity visual mockups — on desktop and mobile — for your review. We revise until you're completely satisfied. Nothing moves to development without your sign-off." },
        { title: 'Step 4 — Development & Quality Assurance', description: 'Our developers build the approved designs with clean, semantic code. Every page is tested across browsers and devices. Every form, button, and interactive element is verified before launch.' },
        { title: 'Step 5 — Launch & Post-Launch Support', description: 'We manage the full launch process — DNS setup, redirects, analytics installation, Search Console submission, and performance monitoring. We stay on post-launch to address any issues and optimize based on early data.' },
      ]
    },
    faqs: [
      { question: 'How long does it take to build a website?', answer: 'Most business websites take 3–5 weeks from kickoff to launch. E-commerce stores typically take 5–8 weeks. Complex web applications can take 10–16 weeks depending on scope. We set a realistic timeline upfront with clear milestones and stick to it.' },
      { question: 'Will my website rank on Google?', answer: 'We build every website on a solid technical SEO foundation — the foundation that gives you the best possible starting point for organic rankings. For ongoing SEO growth through content and link building, we offer dedicated SEO services as well.' },
      { question: 'Can I update the website myself after launch?', answer: "Yes. We build on user-friendly CMS platforms and provide full onboarding training so your team can handle day-to-day content updates independently. We're also available for more complex updates whenever you need us." },
      { question: 'What platform will you build my site on?', answer: "It depends on your needs. We work with WordPress, Webflow, Next.js/React, and Shopify. We recommend the right platform based on your goals, your team's technical comfort, and your long-term plans — not based on what's easiest for us." },
      { question: 'Do you offer website maintenance after launch?', answer: 'Yes. We offer monthly maintenance retainers that include updates, backups, security monitoring, performance checks, and minor content changes — so your website stays fast, secure, and current over time.' },
      { question: 'Can you redesign or improve my existing website?', answer: 'Absolutely. Whether you need a full redesign, a speed overhaul, a UX improvement, or just a visual refresh, we audit your current site, identify the highest-impact changes, and execute them efficiently.' },
    ],
    finalCta: {
      title: 'Your Website Should Be Your Best Salesperson',
      description: "A well-built website works 24 hours a day, 7 days a week, generating leads and building trust with every visitor. If yours isn't doing that, let's talk about why — and how we fix it.",
      buttonText: 'Start My Website Project'
    }
  },
  {
    id: 'shopify-store-design',
    slug: 'shopify-store-design',
    icon: ShoppingCart,
    shortDescription: 'Custom Shopify stores built to convert.',
    metaTitle: 'Shopify Store Design Services | Custom Shopify Stores Built to Convert',
    metaDescription: 'We design custom Shopify stores that look premium and sell more. Product pages, checkout optimization, speed, mobile experience — every detail built to maximize your revenue.',
    focusKeywords: 'Shopify store design, custom Shopify theme, Shopify store setup, Shopify development',
    hero: {
      title: 'Shopify Stores Built to Convert',
      description: "Your Shopify store is your most important sales asset. Is it built to earn trust and guide customers effortlessly to purchase?\n\nMost stores rely on the same tired templates and lose customers at the exact same points. We design custom, high-performance Shopify experiences built specifically for your brand to maximize revenue.",
      ctaText: 'Get a Free Store Audit',
    },
    included: {
      title: 'What We Build',
      subtitle: 'Every Element of Your Shopify Store, Done Right',
      items: [
        { title: 'Custom Theme Design & Development', description: "We design and build your Shopify store from a blank canvas. Custom themes mean your store looks uniquely on-brand, loads faster than theme-based alternatives, and can be built to your exact requirements without working around another developer's limitations.", icon: LayoutTemplate },
        { title: 'Homepage & Collection Pages', description: 'Your homepage and collection pages are where first impressions are made and browsing decisions happen. We design them to be visually compelling, clearly organized, and optimized to drive visitors deeper into the buying journey.', icon: ShoppingCart },
        { title: 'Conversion-Optimized Product Pages', description: 'The product page is where purchase decisions are made. We design product pages with benefit-driven copy, strategic image layouts, trust signals at the right moments, urgency elements that feel genuine, and clear paths to the add-to-cart button.', icon: TrendingUp },
        { title: 'Streamlined Checkout Experience', description: 'The average cart abandonment rate is nearly 70%. Most of those abandonments happen because the checkout process is confusing or builds anxiety. We optimize your checkout flow to reduce friction, build trust, and recover more revenue at the critical final stage.', icon: ShieldCheck },
        { title: 'Mobile Shopping Experience', description: 'More than 70% of Shopify purchases happen on mobile devices. We design with a mobile-first approach so your store feels native and seamless on every phone — from tap targets and image loading to one-tap checkout.', icon: Smartphone },
        { title: 'Speed & Performance Optimization', description: 'A one-second delay in page load can reduce conversions by 7%. We audit every element of your Shopify store, eliminate bloated code and unnecessary apps, optimize images, and implement technical improvements that keep your store fast and your conversion rate high.', icon: Zap },
        { title: 'Shopify App Integration', description: 'We integrate and configure the right Shopify apps for your business — reviews, email marketing, upsells, loyalty programs, subscriptions — and set up automation flows that increase average order value and reduce your manual workload.', icon: Settings },
      ]
    },
    process: {
      title: 'Shopify Services We Offer',
      subtitle: 'Solutions for Every Stage of Growth',
      items: [
        { title: 'New Shopify Store Build', description: 'For businesses launching a new Shopify store. We handle everything from domain setup to design to product configuration to launch — a complete, ready-to-sell store delivered on time.' },
        { title: 'Shopify Store Redesign', description: "For existing Shopify stores that need a design overhaul, conversion rate improvement, or brand refresh. We audit what's working, identify what isn't, and rebuild with clear performance goals in mind." },
        { title: 'Shopify Theme Customization', description: 'For businesses with a theme they like but need to customize. We modify and extend your existing theme to match your brand, add functionality, and fix the issues that are currently costing you conversions.' },
        { title: 'Shopify Store Migration', description: 'Moving to Shopify from WooCommerce, Wix, BigCommerce, Squarespace, or a custom platform? We handle the full migration — products, collections, customer data, order history, and SEO redirects — so nothing is lost in the move.' },
        { title: 'Shopify Speed Optimization', description: 'If your store scores poorly on PageSpeed or feels sluggish on mobile, we run a comprehensive speed audit and implement the fixes that will have the biggest impact on your performance and your revenue.' },
      ]
    },
    faqs: [
      { question: 'How long does it take to design a Shopify store?', answer: 'A full custom Shopify store build typically takes 4–7 weeks from kickoff to launch. A theme customization project is usually 2–3 weeks. Timeline depends on the number of pages, custom functionality required, and revision rounds.' },
      { question: 'How is a custom theme different from a paid Shopify theme?', answer: 'Paid Shopify themes are designed to work for thousands of different stores across many industries. A custom theme is built specifically for your brand and products. The result is faster load times, a unique look that builds brand recognition, and complete flexibility to include exactly what you need.' },
      { question: 'Will my new store affect my existing SEO rankings?', answer: 'We take SEO preservation seriously during every redesign. We implement proper 301 redirects for all URL changes, preserve meta data, maintain site structure where possible, and monitor search performance closely post-launch.' },
      { question: 'Can you help after the store is launched?', answer: 'Yes. We offer ongoing Shopify retainers that cover design updates, new landing pages, promotional banners, A/B testing, performance optimization, and seasonal campaign support — so your store keeps improving after launch.' },
    ],
    finalCta: {
      title: "Better Conversion Is the Answer",
      description: "If you're already getting traffic to your Shopify store but the revenue isn't reflecting it, the problem is almost always the store experience, not the traffic. Let us audit it and show you exactly what's holding your sales back.",
      buttonText: 'Get My Free Shopify Audit'
    }
  },
  {
    id: 'graphic-design',
    slug: 'graphic-design',
    icon: PenTool,
    shortDescription: 'Visual assets that build brands.',
    metaTitle: 'Professional Graphic Design Services | Visual Assets That Build Brands and Drive Results',
    metaDescription: 'We create professional graphic design for social media, brand identity, marketing materials, and more. Strategic, human-centered design that communicates, persuades, and converts.',
    focusKeywords: 'graphic design services, professional graphic designer, brand graphic design, social media design',
    hero: {
      title: 'Design That Speaks Before You Do',
      description: "In a world where audiences scroll past hundreds of visuals daily, mediocre design actively damages your brand. Design sends immediate signals about your quality, trustworthiness, and value.\n\nWe create strategic, premium graphic design that sends the right signals—consistently and intentionally—across every touchpoint of your brand.",
      ctaText: 'Start a Design Project',
    },
    included: {
      title: 'What We Design',
      subtitle: 'A Complete Range of Visual Assets for Every Business Need',
      items: [
        { title: 'Social Media Graphics & Content Design', description: 'Your social media presence is one of the most visible representations of your brand. We design cohesive social media content systems — not one-off posts — that maintain a consistent visual identity across every platform.', icon: Users },
        { title: 'Brand Identity Design', description: 'A logo is the beginning, not the end, of a brand identity. We design complete visual systems: primary and secondary logos with usage rules, full color palettes, typography pairings, iconography, and pattern systems.', icon: PenTool },
        { title: 'Marketing Materials & Collateral', description: 'Brochures, flyers, banners, trade show displays, business cards, presentations, signage — we design print and digital marketing materials that look premium, communicate clearly, and represent your brand.', icon: Briefcase },
        { title: 'Infographics & Data Visualization', description: 'Complex information becomes shareable, memorable content when designed well. We create infographics that distill complicated data, processes, or ideas into visual stories that your audience actually wants to engage with.', icon: BarChart },
        { title: 'Email Template Design', description: 'Your email campaigns deserve the same visual quality as your website and social media. We design branded HTML email templates that render perfectly across every email client and align with your brand identity.', icon: Mail },
        { title: 'Packaging & Product Label Design', description: 'First impressions at the point of sale are everything. We design product packaging and labels that communicate quality, stand out on crowded shelves, and create the kind of unboxing experience that customers want to share.', icon: Package },
        { title: 'Presentation & Pitch Deck Design', description: "Whether it's a sales presentation, an investor pitch, or a client proposal — we transform your content into visually compelling, professionally designed decks that communicate clearly and build confidence in every room.", icon: Presentation },
        { title: 'Digital Ad Creative', description: 'Static image ads, banner ads, display ads across standard IAB sizes — we design digital ad creative with strong visual hierarchy, clear messaging, and brand consistency that performs across every platform and placement.', icon: MonitorPlay },
      ]
    },
    process: {
      title: 'Our Design Process',
      subtitle: 'From Concept to Final Delivery',
      items: [
        { title: 'Brief & Research', description: "We begin with a detailed creative brief — understanding the purpose of the asset, the audience it's designed for, the message it needs to communicate, and any existing brand guidelines to work within." },
        { title: 'Concept Development', description: 'We develop multiple initial concepts exploring different visual directions. You see a range of approaches and provide feedback on what resonates before we move into refinement.' },
        { title: 'Refinement & Revision', description: 'Based on your feedback, we develop the selected concept into a polished final design. Revision rounds continue until the work is exactly right.' },
        { title: 'Delivery', description: "Final files are delivered in all required formats — print-ready PDFs, web-optimized PNGs, editable source files — organized and labeled so they're easy to use and archive." },
      ]
    },
    faqs: [
      { question: 'Do you design for all industries?', answer: 'Yes. We have strong experience designing across e-commerce, professional services, SaaS, healthcare, hospitality, real estate, food and beverage, and more. We adapt our aesthetic approach to what resonates with your specific industry and audience.' },
      { question: 'Do you work within existing brand guidelines?', answer: "Absolutely. If you have brand guidelines, we work within them to ensure every new asset is consistent with your existing visual identity. If you don't have guidelines yet, we can create them as part of a brand identity project." },
      { question: 'How many design revisions are included?', answer: 'Every project includes multiple revision rounds. We work until the design is right, not until a revision limit is hit. We set clear scope expectations upfront to ensure the revision process is efficient and productive for both sides.' },
      { question: 'Can you design assets at ongoing volume for our marketing team?', answer: 'Yes. We offer design retainer packages for businesses that need a regular volume of assets — social media templates, ad creative, email graphics, and more — on a consistent weekly or monthly schedule.' },
    ],
    finalCta: {
      title: 'Visuals That Match Your Quality',
      description: "If your design doesn't reflect the quality of your product or service, it's costing you customers who judge the book by its cover — which is most of them. Let's fix that.",
      buttonText: 'Request a Design Quote'
    }
  },
  {
    id: 'video-editing',
    slug: 'video-editing',
    icon: Video,
    shortDescription: 'Story-driven content for every platform.',
    metaTitle: 'Professional Video Editing Services | Story-Driven Content for Every Platform',
    metaDescription: 'Expert video editing for YouTube, Instagram Reels, TikTok, brand films, and more. We transform raw footage into polished, high-retention content that builds your brand and drives results.',
    focusKeywords: 'video editing services, professional video editing, YouTube video editing, social media video editor',
    hero: {
      title: 'Video Editing That Keeps Eyes Glued',
      description: "Video is the most consumed content format online, but raw footage isn't enough. It's about pacing, storytelling, sound design, and knowing exactly when to cut to keep your audience engaged.\n\nOur editors are storytellers first. We transform your raw footage into polished, high-retention content built to perform on any platform and drive real action.",
      ctaText: 'Send Us Your Footage',
    },
    included: {
      title: 'Our Video Editing Services',
      subtitle: 'Content Optimized for Every Platform',
      items: [
        { title: 'Short-Form Video Editing', description: 'We edit Instagram Reels, TikTok videos, and YouTube Shorts with hook-first structure, dynamic pacing, text overlays, caption styling, and the platform-native feel that earns algorithmic reach and audience retention.', icon: Smartphone },
        { title: 'Long-Form YouTube Video Editing', description: 'We edit long-form YouTube content with professional color grading, B-roll integration, chapter markers, lower thirds, custom intro sequences, end screens, and tight pacing that keeps watch time high.', icon: MonitorPlay },
        { title: 'Product & Brand Videos', description: "We edit product showcase videos, brand films, and launch content that highlights your product's best qualities, communicates value instantly, and makes viewers confident in their decision to buy.", icon: Video },
        { title: 'Testimonial & Case Study Videos', description: 'We edit testimonial and case study videos with professional color grading, clean audio, strategic B-roll cutaways, on-screen text highlights, and subtitles — turning raw interview footage into compelling social proof.', icon: Users },
        { title: 'Corporate & Internal Videos', description: 'Onboarding videos, training content, company culture videos, investor presentations, town halls — we edit professional corporate video content that communicates clearly and maintains engagement.', icon: Briefcase },
        { title: 'Podcast Video Editing', description: 'We edit full podcast episodes for YouTube, create short-form clips optimized for social, add animated waveforms, chapter markers, lower thirds, and intro/outro sequences.', icon: Mic },
        { title: 'Event Recap Videos', description: 'Conferences, product launches, trade shows, company events — we edit compelling event recap videos that capture the energy, highlight the key moments, and create lasting content value from a single day of footage.', icon: Clapperboard },
      ]
    },
    process: {
      title: 'What We Consider on Every Edit',
      subtitle: 'The Performance Criteria We Edit By',
      items: [
        { title: 'Hook Strength', description: "Does the first 3 seconds earn the viewer's continued attention? We treat the opening of every video as the most important moment in the edit." },
        { title: 'Retention Pacing', description: 'We monitor the rhythm of every edit — cutting before momentum drops, adding visual variety through B-roll and cutaways, and maintaining energy throughout.' },
        { title: 'Audio Quality', description: 'Clean, balanced, pleasant audio is non-negotiable. We correct noise, balance levels, sync music to picture, and ensure every word is crisp and clear.' },
        { title: 'Visual Quality', description: 'Color grading, brightness, contrast, and consistency across all clips — your video should look cohesive and professional from the first frame to the last.' },
        { title: 'Platform Optimization', description: 'Aspect ratio, length, caption format, and export settings are all matched to the specific platform where the video will be published — not a one-size-fits-all export.' },
        { title: 'CTA Clarity', description: 'Every video ends with a clear, specific direction. Viewers always know what to do next.' },
      ]
    },
    faqs: [
      { question: 'How long does video editing take?', answer: 'Short-form edits (under 90 seconds) typically take 1–3 business days. Long-form YouTube videos are usually 3–5 business days depending on length and complexity. Rush turnaround is available when you need content quickly.' },
      { question: 'Do you add captions and subtitles?', answer: "Yes. Captions are included as standard on all social media video edits. They're essential for accessibility and for the majority of viewers who watch social video with the sound off. SRT subtitle files are available for longer-form content." },
      { question: 'Do I need to provide a script or directions?', answer: 'Not necessarily. For straightforward edits, we work from your brief and our understanding of your brand. For more complex edits where you have specific directions, a shot list or notes are helpful. We can also develop a full creative brief and edit structure if you prefer to hand the project off entirely.' },
      { question: 'Can you create video thumbnails as well?', answer: 'Yes. We design custom YouTube thumbnails and social media cover images as an add-on to any video editing project.' },
    ],
    finalCta: {
      title: 'Video Is Your Highest-ROI Investment',
      description: 'Video builds trust faster than any other content format. It keeps people on your website longer, converts cold traffic better, and generates more social shares than anything else you publish. Let\'s create yours.',
      buttonText: 'Start a Video Project'
    }
  },
  {
    id: 'video-animations',
    slug: 'video-animations',
    icon: Clapperboard,
    shortDescription: 'Explainer videos & motion graphics.',
    metaTitle: 'Video Animation Services | Explainer Videos, Motion Graphics & 2D Animation',
    metaDescription: 'We create 2D animations, explainer videos, motion graphics, logo animations, and animated social content that simplifies complex ideas, drives engagement, and converts audiences into customers.',
    focusKeywords: 'video animation services, explainer video production, 2D animation, motion graphics services',
    hero: {
      title: 'Animations That Make Complex Ideas Unforgettable',
      description: "Some ideas are too abstract for words. Some products are too complex for a camera. Animation bridges the gap.\n\nFrom 30-second social clips to full product explainers, we create animations that capture attention, simplify your message, and drive your audience to take action.",
      ctaText: 'Get an Animation Quote',
    },
    included: {
      title: 'Our Animation Services',
      subtitle: 'Engaging Visual Storytelling for Every Need',
      items: [
        { title: 'Explainer Videos', description: 'A well-made explainer video is one of the highest-converting assets you can put on your website. We write the script, develop the visual style, animate the entire video, and deliver a polished, professional finished product.', icon: MonitorPlay },
        { title: '2D Character Animation', description: 'Character-driven animation is among the most engaging and shareable content available. We design custom characters that represent your brand or your customer and animate them through storylines that entertain while they educate and sell.', icon: Users },
        { title: 'Motion Graphics & Kinetic Typography', description: 'Motion graphics — animated text, shapes, icons, and data visualizations — are powerful tools for brand videos, corporate communications, ad creatives, and social media content.', icon: TrendingUp },
        { title: 'Logo Animation', description: 'A professional animated logo intro transforms your brand\'s first impression. These 2–5 second animations are used as YouTube channel intros, presentation openers, video intros across your content library, and social media story headers.', icon: Zap },
        { title: 'Whiteboard & Doodle Animation', description: 'The hand-drawn whiteboard style is one of the most effective formats for educational content, process explanations, and thought leadership. The drawing-reveal mechanic naturally holds attention.', icon: PenTool },
        { title: 'Animated Social Media Content', description: 'Animated posts, stories, and ad creatives consistently outperform static images on every major social platform. We create looping animations, animated story templates, and short animated clips formatted and sized correctly for every platform.', icon: Smartphone },
        { title: 'Data Visualization Animation', description: 'If you have compelling data, statistics, or research to share, animated data visualizations communicate that information far more effectively than static charts or paragraphs of numbers.', icon: BarChart },
      ]
    },
    process: {
      title: 'Our Animation Production Process',
      subtitle: 'From Script to Screen',
      items: [
        { title: 'Script & Messaging Development', description: 'Every animation starts with a strong script. We develop a script that distills your message into its most essential, compelling form — clear enough for a first-time viewer, specific enough to be persuasive.' },
        { title: 'Storyboarding', description: 'We present a full storyboard that maps out every scene, every transition, and every key visual moment before animation begins. You see the story flow and can request changes before we invest time in animation.' },
        { title: 'Visual Style & Character Design', description: 'We develop and present style frames — still images showing what the finished animation will look like visually. Color palette, character designs, typographic treatment, and scene composition are all established and approved.' },
        { title: 'Animation & Sound Design', description: 'With approved scripts and storyboards, our animators bring everything to life. Music, sound effects, and voiceover (if required) are added to create a complete, professional finished product.' },
        { title: 'Review & Revisions', description: 'You receive the full animation for review before final delivery. We incorporate your feedback and deliver the final file in all required formats and resolutions.' },
      ]
    },
    faqs: [
      { question: 'How long does it take to produce an animated explainer video?', answer: 'A 60–90 second explainer video typically takes 3–4 weeks from brief to final delivery, including script, storyboard, animation, and sound. Longer or more complex animations take proportionally more time.' },
      { question: 'Do you provide the voiceover?', answer: 'Yes. We work with a network of professional voice talent in multiple accents and languages. We manage the entire voiceover process — audition, selection, recording, and editing — as part of the production.' },
      { question: 'Can you match our existing brand style?', answer: "Absolutely. If you have brand guidelines or an existing visual style, we design the animation to align perfectly. If you're starting fresh, we develop a style that fits your brand's personality and resonates with your audience." },
      { question: 'Do you write the script or do we?', answer: 'We write the script based on your brief, product details, and messaging goals. You review and approve it before any animation begins. If you prefer to provide your own script, we can work from that as well.' },
      { question: 'What file formats do you deliver?', answer: 'We deliver final animations in MP4 (H.264) as standard, along with any other formats required for your specific use cases — MOV with transparency, GIF for web, or vertical formats for social platforms.' },
    ],
    finalCta: {
      title: 'If You Can Imagine It, We Can Animate It',
      description: "Animation is one of the most versatile, engaging, and memorable content formats available. If there's a message you've been struggling to communicate clearly, let's talk about how animation can solve it.",
      buttonText: 'Discuss My Animation Project'
    }
  },
  {
    id: 'growth-marketing',
    slug: 'growth-marketing',
    icon: TrendingUp,
    shortDescription: 'Data-driven systems that scale revenue.',
    metaTitle: 'Growth Marketing Services | Data-Driven Systems That Scale Your Revenue',
    metaDescription: 'We build growth marketing frameworks — funnel optimization, A/B testing, user acquisition, and retention marketing — that compound your revenue and reduce customer acquisition cost over time.',
    focusKeywords: 'growth marketing services, growth hacking agency, funnel optimization, CRO services, conversion optimization',
    hero: {
      title: 'Growth Systems That Compound Your Revenue',
      description: "Real growth isn't about running random campaigns or hoping for a viral post. It's about building repeatable, data-driven systems that scale.\n\nWe help businesses identify exactly what moves the needle, ruthlessly prioritize high-leverage experiments, and build acquisition engines that deliver predictable revenue.",
      ctaText: 'Book a Free Growth Audit',
    },
    included: {
      title: 'What Our Growth Marketing Service Covers',
      subtitle: 'Comprehensive Strategies for Sustainable Growth',
      items: [
        { title: 'Full-Funnel Audit & Analysis', description: 'Before we recommend a single tactic, we analyze your entire customer acquisition funnel. We identify where traffic is coming from, which sources convert, where visitors are dropping off, and what your current customer acquisition cost is.', icon: Search },
        { title: 'Growth Strategy & Prioritized Roadmap', description: "Based on the audit, we build a clear, sequenced growth roadmap. This is a specific list of high-leverage experiments and improvements ranked by expected impact and ease of implementation, with clear success metrics for each.", icon: Target },
        { title: 'Conversion Rate Optimization (CRO)', description: 'Often the fastest path to more revenue is converting more of the traffic you already have. We run structured CRO programs: analyzing heatmaps, identifying friction points, forming hypotheses, and running A/B tests.', icon: TrendingUp },
        { title: 'A/B Testing & Systematic Experimentation', description: 'We build and manage a systematic experimentation program — testing landing page copy, pricing presentation, onboarding flows, email subject lines, and ad creative angles. Every test has a clear hypothesis and decision framework.', icon: RefreshCw },
        { title: 'Customer Retention & Lifecycle Marketing', description: 'Acquiring a new customer costs five to seven times more than retaining an existing one. We build lifecycle marketing programs — email sequences, loyalty incentives, and upsell flows — that maximize the revenue from every customer.', icon: Users },
        { title: 'User Acquisition & Channel Strategy', description: 'We evaluate every possible acquisition channel for your business — organic search, paid social, paid search, content marketing, partnerships — and identify which combination will bring you the most qualified customers at the lowest cost.', icon: UserPlus },
        { title: 'Retention Rate & Churn Reduction', description: 'For subscription and service businesses, reducing churn is often the single highest-ROI growth lever available. We analyze your churn data, identify leading indicators, and build proactive intervention systems.', icon: ShieldCheck },
      ]
    },
    process: {
      title: 'Growth Marketing vs. Traditional Marketing',
      subtitle: 'The Shift from Campaigns to Systems',
      items: [
        { title: 'Systems Over Campaigns', description: 'Traditional marketing focuses on campaigns — you run a campaign, it generates some results, the campaign ends. Growth marketing focuses on systems — you build a mechanism that keeps generating results continuously, gets more efficient over time, and compounds.' },
        { title: 'Metrics That Matter', description: 'Traditional marketing is often measured by reach, impressions, or awareness. Growth marketing is measured by acquisition cost, conversion rate, retention rate, and revenue per customer.' },
        { title: 'Continuous Optimization', description: 'Traditional marketing asks: "What campaign should we run this quarter?" Growth marketing asks: "What is our current conversion rate at each stage of the funnel, and what is the fastest way to improve it?"' },
      ]
    },
    faqs: [
      { question: 'How long before we see growth marketing results?', answer: 'CRO experiments and A/B tests typically need 4–8 weeks to accumulate meaningful data. Retention improvements show up in cohort analysis over 2–3 months. Acquisition channel optimization usually produces clear signals within 60–90 days. Growth marketing is a compounding investment — the results build significantly over time.' },
      { question: 'How is this different from just managing our ads?', answer: "Ad management is one component of growth marketing. Growth marketing encompasses the entire customer lifecycle — acquisition, activation, retention, referral, and revenue expansion. It's more analytical, more cross-functional, and focuses on building durable, sustainable growth rather than short-term campaign performance." },
      { question: 'What do you need from us to run an effective growth program?', answer: 'Access to your analytics data and business performance metrics, clearly defined business goals, and the willingness to experiment. Growth marketing requires a genuine culture of testing — we need the freedom to try things that might not work in order to find the things that do.' },
      { question: 'Do you work with businesses at early stage?', answer: 'Yes. Early-stage businesses actually benefit enormously from a growth marketing mindset because it prevents expensive mistakes and helps you find product-market fit faster. We adapt our approach to your stage and budget.' },
    ],
    finalCta: {
      title: 'Build Systems for Predictable Growth',
      description: 'The difference between businesses that grow predictably and those that plateau is almost always the same thing: the growing ones have built systems. Let\'s build yours.',
      buttonText: 'Start My Growth Engagement'
    }
  },
  {
    id: 'lead-generation',
    slug: 'lead-generation',
    icon: Target,
    shortDescription: 'Predictable pipeline of qualified buyers.',
    metaTitle: 'Lead Generation Services | Build a Predictable Pipeline of Qualified Buyers',
    metaDescription: 'We build inbound and outbound lead generation systems that deliver qualified, sales-ready leads consistently. Lead magnets, landing pages, nurture sequences, and outreach campaigns — all working together.',
    focusKeywords: 'lead generation services, B2B lead generation, inbound lead generation, qualified lead generation',
    hero: {
      title: 'Lead Generation That Actually Converts',
      description: "A pipeline full of unqualified leads wastes time and inflates your acquisition costs. You don't just need more leads—you need the right ones.\n\nWe build predictable, multi-channel lead generation systems that attract, qualify, and nurture your ideal customers, delivering them to your sales team ready to buy.",
      ctaText: 'Get a Strategy Session',
    },
    included: {
      title: 'Our Lead Generation Services',
      subtitle: 'Multi-Channel Systems for Predictable Pipeline',
      items: [
        { title: 'Inbound Lead Generation Strategy', description: 'We build inbound lead generation systems anchored by content that answers the exact questions your ideal customers are already searching for online. SEO-optimized blog posts, landing pages, gated resources, and organic social content.', icon: Search },
        { title: 'High-Converting Lead Magnets', description: 'We research, write, design, and promote lead magnets — eBooks, templates, calculators, checklists, webinars, industry reports, free tools — that attract the right leads and begin the relationship on a foundation of trust.', icon: Zap },
        { title: 'Landing Page Design & Optimization', description: 'We design and build focused, distraction-free landing pages with persuasive copy, strategic social proof, and a single clear call-to-action. Then we test continuously to push conversion rates as high as possible.', icon: LayoutTemplate },
        { title: 'Email Nurture Sequences', description: 'We build intelligent email nurture sequences that educate your leads over time, address their most common objections, build trust through consistent value delivery, and move prospects steadily toward a purchase decision.', icon: Mail },
        { title: 'LinkedIn Lead Generation', description: 'We build LinkedIn outbound programs that identify your ideal customer profile precisely, develop personalized connection and outreach sequences, and manage early-stage conversations to warm prospects before they reach your sales team.', icon: Users },
        { title: 'Cold Email Campaigns', description: 'We build campaigns with verified prospect lists, personalized messaging at scale, automated follow-up sequences, and careful deliverability management — targeting the right people with the right message to generate booked meetings.', icon: MessageSquare },
        { title: 'Lead Scoring & CRM Integration', description: 'We implement lead scoring frameworks that automatically prioritize your hottest prospects based on engagement activity, behavioral signals, and firmographic data. Integrated with your CRM.', icon: Database },
        { title: 'Retargeting Campaigns', description: 'We build retargeting campaigns across Meta, Google, and LinkedIn that keep your brand in front of high-intent visitors after they leave your site — with targeted messaging designed to bring them back at the right moment.', icon: Target },
      ]
    },
    process: {
      title: 'The Lead Generation Metrics We Optimize',
      subtitle: 'We don\'t report on vanity numbers. These are the KPIs we track:',
      items: [
        { title: 'Cost Per Lead (CPL)', description: 'How much it costs to acquire each new lead.' },
        { title: 'Lead-to-Opportunity Rate', description: 'What percentage of leads become active sales conversations.' },
        { title: 'Opportunity-to-Close Rate', description: 'What percentage of conversations become paying customers.' },
        { title: 'Lead Quality Score', description: 'Are the leads arriving with the right fit, budget, and timing?' },
        { title: 'Pipeline Velocity', description: 'How quickly are leads moving through your funnel?' },
        { title: 'MQL-to-SQL Conversion Rate', description: 'How many marketing-qualified leads are being accepted by sales?' },
        { title: 'Customer Acquisition Cost (CAC)', description: 'The total cost of acquiring one new customer.' },
      ]
    },
    faqs: [
      { question: 'How many leads can you generate per month?', answer: 'Lead volume depends on your industry, your offer, your budget, and the channels we use. We set realistic, data-backed projections at the start of every engagement and optimize continuously toward your target numbers. Some clients generate 50–100 qualified leads per month; others 500 or more.' },
      { question: 'Is outbound lead generation compliant with GDPR and CAN-SPAM?', answer: 'Yes. We build all outbound programs with regulatory compliance as a priority — proper opt-out mechanisms, compliant data sourcing, transparent messaging, and processes that meet legal requirements in your target markets.' },
      { question: 'How long does it take to build and launch a lead generation system?', answer: 'The core infrastructure — landing pages, lead magnets, CRM integration, email sequences — is typically built within 4–6 weeks. Outbound campaigns can launch in 2–3 weeks. Results compound significantly over time as we optimize based on real performance data.' },
      { question: 'Do you work with both B2B and B2C businesses?', answer: 'Yes. The tactics vary — B2B typically leans on LinkedIn, email, and long-form content; B2C leans more on paid social, SEO, and lead magnets — but we have experience building effective lead generation systems for both business models.' },
    ],
    finalCta: {
      title: 'A Predictable Pipeline Changes Everything',
      description: 'When you know that your marketing system will generate a reliable number of qualified leads every month, you can forecast revenue, hire confidently, and invest in growth without anxiety. That\'s what we build.',
      buttonText: 'Build My Lead Generation System'
    }
  },
  {
    id: 'brand-building',
    slug: 'brand-building',
    icon: Briefcase,
    shortDescription: 'Strategy, identity & messaging.',
    metaTitle: 'Brand Building Services | Strategy, Identity & Messaging That Makes You Unforgettable',
    metaDescription: 'We build brands from the inside out — strategy, visual identity, voice, and messaging — that attract loyal customers, command premium pricing, and stand apart in any competitive market.',
    focusKeywords: 'brand building services, brand identity design, brand strategy agency, brand development company',
    hero: {
      title: 'Build a Brand They Choose First',
      description: "Strong brands charge more, lose fewer customers, and spend less on advertising because their reputation does the selling for them.\n\nWe build brands from the ground up—uncovering your authentic, differentiated position to make you the obvious choice in your category.",
      ctaText: 'Book a Brand Discovery',
    },
    included: {
      title: 'Our Brand Building Services',
      subtitle: 'Comprehensive Brand Development',
      items: [
        { title: 'Brand Strategy & Market Positioning', description: 'We do the thinking that too many agencies skip: Who exactly is your ideal customer? What position can you authentically own that is differentiated, credible, and commercially valuable? The answers become the strategic foundation.', icon: Target },
        { title: 'Brand Identity Design', description: 'We design the complete visual system that expresses your brand\'s personality at every touchpoint. This includes your primary logo, secondary logo variations, complete color palette, typography system, iconography, and graphic elements.', icon: PenTool },
        { title: 'Brand Voice & Messaging Framework', description: 'We define your brand voice — the personality, tone, and communication style. We also develop your core messaging framework: your brand promise, your positioning statement, your key differentiators, and the messaging pillars.', icon: MessageSquare },
        { title: 'Brand Naming & Tagline Development', description: 'We run naming workshops, research trademark and domain availability, test options with target audiences, and develop tagline options that distill your brand promise into a memorable, distinctive line.', icon: Edit3 },
        { title: 'Brand Guidelines Document', description: 'All strategy, identity, and messaging work is captured in a comprehensive brand guidelines document. This ensures that everyone representing your brand does so consistently and correctly, at every touchpoint.', icon: Briefcase },
        { title: 'Rebranding', description: 'We manage rebrands with careful strategy, broad stakeholder input, and methodical execution to unlock new markets, reposition you competitively, and reinvigorate your entire organization.', icon: RefreshCw },
        { title: 'Brand Audit', description: 'We analyze your current brand across every touchpoint — website, social media, marketing materials, customer communications — identify inconsistencies and weaknesses, and develop a prioritized action plan for improvement.', icon: Search },
      ]
    },
    process: {
      title: 'What a Strong Brand Actually Does for Your Business',
      subtitle: 'The ROI of Brand Building',
      items: [
        { title: 'Commands Premium Pricing', description: 'When customers perceive your brand as higher-quality, more trustworthy, or more aligned with their values than alternatives, they\'ll pay more for your product or service — and feel good about it.' },
        { title: 'Reduces Customer Acquisition Cost Over Time', description: 'Strong brands generate word-of-mouth referrals, earn organic media coverage, and build the kind of reputation that brings customers inbound. Over time, this reduces your reliance on paid advertising.' },
        { title: 'Builds Customer Loyalty', description: 'Customers who identify with your brand don\'t just buy from you — they advocate for you. Brand loyalty is one of the most powerful long-term commercial assets a business can build.' },
        { title: 'Attracts the Right Customers', description: 'A clear, well-positioned brand naturally attracts the customers who are the best fit for what you offer — and repels the ones who aren\'t, which saves you time and money on the wrong relationships.' },
        { title: 'Differentiates You in a Crowded Market', description: 'In most industries, the functional differences between competing products are small. Brand is what creates meaningful differentiation when the products themselves are similar.' },
      ]
    },
    faqs: [
      { question: 'How long does a full brand project take?', answer: 'A comprehensive brand strategy and identity project typically takes 6–10 weeks from kickoff to final delivery. This includes research, strategy workshops, concept development, design, revisions, and completion of the guidelines document. Rebranding projects may take slightly longer depending on scope and organizational complexity.' },
      { question: 'What deliverables do we receive?', answer: 'You receive a complete brand guidelines document, all logo files in every required format (PNG, SVG, PDF, AI, EPS), color codes (HEX, RGB, CMYK, Pantone), typography recommendations with licensing guidance, messaging framework document, and any additional assets in your project scope.' },
      { question: 'Can you help with the brand launch and rollout?', answer: 'Yes. We help plan and execute brand launches — updating all touchpoints simultaneously, creating announcement content for internal and external audiences, developing launch campaigns, and ensuring consistency from day one. A strong launch is as important as a strong brand.' },
      { question: 'What if we already have a partial brand identity?', answer: 'Many clients come to us with some brand elements — maybe a logo they like but nothing else, or a full visual identity but no clear messaging. We can work with what exists, build around it, or use it as a starting point for a more comprehensive brand development process.' },
    ],
    finalCta: {
      title: 'Make Your Brand Work For You',
      description: 'Every interaction a customer has with your business either builds or erodes their perception of your brand. A strong, deliberate brand strategy ensures those interactions build something valuable. Let\'s create yours.',
      buttonText: 'Start My Brand Project'
    }
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    icon: Globe,
    shortDescription: 'Full-stack online marketing.',
    metaTitle: 'Digital Marketing Services | Full-Stack Online Marketing That Drives Real Revenue',
    metaDescription: 'Comprehensive digital marketing services including SEO, content marketing, email marketing, social media management, and paid advertising — managed as a unified strategy to grow traffic, leads, and revenue.',
    focusKeywords: 'digital marketing services, online marketing agency, full service digital marketing, SEO and digital marketing',
    hero: {
      title: 'Digital Marketing That Works as a Unified System',
      description: "When SEO, content, email, and ads are managed in silos, you burn budget and lose customers in the gaps. \n\nWe manage your full digital marketing stack as a coordinated system where every channel feeds the others. The result? More reach, lower acquisition costs, and a significantly better return on your investment.",
      ctaText: 'Get a Marketing Audit',
    },
    included: {
      title: 'Our Digital Marketing Services',
      subtitle: 'Integrated Channels for Maximum Impact',
      items: [
        { title: 'Search Engine Optimization (SEO)', description: 'Organic search is the highest-intent, most cost-efficient digital marketing channel over the long term. We deliver full-service SEO: technical site auditing, keyword strategy, on-page optimization, and high-quality link acquisition.', icon: Search },
        { title: 'Content Marketing', description: 'Content marketing builds the organic traffic, authority, and trust that paid channels can\'t create on their own. We develop content strategies anchored in real keyword research and genuine audience insight.', icon: Edit3 },
        { title: 'Email Marketing & Automation', description: 'Email consistently delivers the highest ROI of any digital marketing channel. We build and manage email programs that work as full lifecycle systems: welcome sequences, nurture sequences, promotional campaigns, and re-engagement.', icon: Mail },
        { title: 'Social Media Marketing', description: 'We manage your organic social media presence with strategic intention. We develop a platform-specific content calendar aligned with your marketing goals, manage community engagement, and continuously optimize the content mix.', icon: Users },
        { title: 'Google Ads (PPC) Management', description: 'Google Ads is often the fastest path to reaching high-intent customers. We build and manage campaigns across Search, Shopping, Display, and Performance Max, ensuring every dollar of ad spend is working as efficiently as possible.', icon: MousePointerClick },
        { title: 'Paid Social Advertising', description: 'We manage paid social campaigns on the platforms that are right for your audience and your business goals — Meta, TikTok, LinkedIn, Pinterest, and YouTube. Full-service management includes audience strategy, creative, and optimization.', icon: Target },
        { title: 'Marketing Analytics & Attribution', description: 'We build comprehensive analytics infrastructure — Google Analytics 4, conversion tracking, UTM frameworks, CRM integration, and custom reporting dashboards — that give you a clear, accurate view of which activities are generating revenue.', icon: BarChart },
      ]
    },
    process: {
      title: 'What to Expect When Working With Us',
      subtitle: 'A Phased Approach to Compounding Growth',
      items: [
        { title: 'Month 1 — Setup & Foundation', description: 'Full audit of all existing channels, analytics infrastructure setup, competitor analysis, keyword research, content gap analysis, campaign setup, and baseline reporting. This month is about building the right foundation before spending.' },
        { title: 'Months 2–3 — Launch & Initial Optimization', description: 'All channels go live. Initial performance data starts coming in. We optimize based on early signals — adjusting bids, refining audiences, improving landing pages, adjusting content topics — and begin building a picture of what\'s working fastest.' },
        { title: 'Months 4–6 — Compounding Growth', description: 'With solid data and optimized channels, growth compounds. SEO rankings improve, email lists grow, retargeting audiences deepen, paid performance improves with better creative and better targeting. CAC declines as channels become more efficient.' },
        { title: 'Month 6+ — Scale', description: 'We identify the highest-performing channels and invest more aggressively in scaling them. New channels are tested based on data from existing performance. The marketing system becomes increasingly self-reinforcing.' },
      ]
    },
    faqs: [
      { question: 'How quickly can we expect results?', answer: 'Paid advertising can generate results within days or weeks. Email marketing produces results within the first few campaigns. SEO and content marketing typically show significant organic traffic improvement after 3–6 months of consistent work. We set realistic, channel-specific expectations upfront and track progress against them transparently.' },
      { question: 'Can we work together on just one channel to start?', answer: 'Yes. We offer standalone channel management as well as full-service integrated engagements. Many clients start with one channel and add others as they see results and build confidence. We recommend the integrated approach whenever budget allows because the compound effect is real and significant.' },
      { question: 'How do you handle reporting?', answer: 'Monthly performance reports covering all active channels, connected to the KPIs that matter to your business — organic traffic, lead volume, conversion rates, cost per acquisition, and revenue attributed to marketing. We also hold regular strategy calls to review performance, discuss what we\'re learning, and plan priorities for the upcoming period.' },
      { question: 'What do you need from us to manage our digital marketing?', answer: 'Access to existing accounts (Google Analytics, Search Console, ad accounts, email platform, social profiles), brand and messaging guidelines, and an ongoing content review process if you want approval on content before publishing. Beyond that, we handle the execution.' },
    ],
    finalCta: {
      title: 'Marketing That Compounds Over Time',
      description: 'The right digital marketing system doesn\'t just generate leads this month — it builds equity that compounds. Every blog post that ranks, every email subscriber who converts, every retargeted visitor who returns — these are assets with lasting value. Let\'s build them.',
      buttonText: 'Get My Digital Marketing Plan'
    }
  },
  {
    id: 'creative-ads',
    slug: 'creative-ads',
    icon: Megaphone,
    shortDescription: 'Scroll-stopping ad creative.',
    metaTitle: 'Creative Ad Services | Scroll-Stopping Ad Creative for Meta, TikTok, YouTube & Google',
    metaDescription: 'We produce high-performance ad creative — video ads, static ads, and UGC-style content — for Meta, TikTok, YouTube, and Google. Built to stop the scroll and drive real conversions.',
    focusKeywords: 'ad creative services, Facebook ad creative, TikTok ad creative, performance creative agency, paid advertising creative',
    hero: {
      title: 'Ad Creative That Stops the Scroll and Starts the Sale',
      description: "Your ad creative drives more performance than your targeting, bidding, or campaign structure combined. Average creative wastes great targeting every time.\n\nWe treat creative as a strategic investment—producing high-performance, platform-native assets designed to capture attention instantly and drive real conversions.",
      ctaText: 'Get a Creative Audit',
    },
    included: {
      title: 'Our Ad Creative Services',
      subtitle: 'High-Performance Assets for Every Platform',
      items: [
        { title: 'Meta Ads Creative (Facebook & Instagram)', description: 'We produce the full range of Meta ad formats: single image ads, carousel ads, video ads, Story and Reels creatives, and collection ads. Each piece of creative is built around a specific hook designed to stop the scroll within 1.5 seconds.', icon: Smartphone },
        { title: 'TikTok Ad Creative', description: 'TikTok requires a completely different creative philosophy. We produce native-feeling TikTok ad content — with the pacing, visual style, text overlay conventions, trending audio, and hook structures that the TikTok audience responds to.', icon: Video },
        { title: 'YouTube Pre-Roll & In-Stream Ads', description: 'You have five seconds to earn a viewer\'s voluntary continued attention. We write and produce YouTube ads with skip-proof openings, narrative arcs that build desire, and well-timed calls-to-action that maximize both completion rates and conversions.', icon: MonitorPlay },
        { title: 'Google Display & Responsive Ads', description: 'We design high-performing display creative across all standard IAB sizes — optimized for brand recognition, message clarity, and click-through rate. For Responsive Display Ads, we develop the complete set of headlines, descriptions, and image assets.', icon: LayoutTemplate },
        { title: 'Static Image & Carousel Ads', description: 'Static image ads frequently outperform video in certain audience segments. We design static ads with strong visual hierarchy, readable copy at every size, compelling offers, and brand consistency that performs across platforms.', icon: Image },
        { title: 'UGC-Style Ad Creative', description: 'User-generated content style ads consistently outperform branded, polished creative on TikTok and Instagram. We produce UGC-style creative that captures the authenticity and relatability of real customer content.', icon: Users },
        { title: 'Creative Testing Strategy & Frameworks', description: 'We build creative testing frameworks that run multiple ad angles — different hooks, different offers, different audience messages, different formats — simultaneously, isolate the winning variables, and scale winners fast.', icon: Target },
      ]
    },
    process: {
      title: 'What Makes Ad Creative Actually Work',
      subtitle: 'The Principles of High-Converting Ads',
      items: [
        { title: 'The Hook Is Everything', description: 'You have three seconds maximum to earn the next thirty. The opening frame, the opening line, the opening visual — these are the only things that matter until the viewer decides to keep watching.' },
        { title: 'One Ad, One Message', description: 'The ads that try to communicate multiple offers, multiple benefits, or multiple audiences in one creative perform poorly. The best ads commit to one specific message for one specific person and communicate it with absolute clarity.' },
        { title: 'Lead With Empathy, Not Features', description: 'Winning ads meet the customer where they are emotionally. They name the problem, validate the frustration, and offer the solution — in that order. Feature lists convert engineers. Empathy converts customers.' },
        { title: 'Social Proof in the First Five Seconds', description: 'Numbers, testimonials, and credibility signals placed early in an ad dramatically increase completion rates and conversion rates. People want to know others have made this decision before them.' },
        { title: 'Specific CTAs Outperform Generic Ones', description: '"Shop the Sale — 40% Off Ends Tonight" outperforms "Shop Now." "Book Your Free Consultation" outperforms "Get Started." The more specific the CTA, the more it converts.' },
        { title: 'Platform-Native Always Beats Cross-Platform', description: 'Creative designed specifically for one platform consistently outperforms creative repurposed from another. Each platform has its own visual grammar, its own pacing conventions, and its own audience expectations.' },
      ]
    },
    faqs: [
      { question: 'How many creative variations do you produce per project?', answer: 'We typically recommend a minimum of 3–5 variations per campaign angle to enable meaningful testing. For brands running significant ad spend, we produce 10–20 or more creatives per month across multiple angles and formats.' },
      { question: 'Do you handle media buying as well as creative?', answer: 'We offer both creative-only engagements and full-service creative-plus-media-buying packages. Many clients come to us specifically because they have a capable media buyer but need better creative. Others want us to handle the entire paid advertising function.' },
      { question: 'How do you measure whether an ad creative is working?', answer: 'The primary metrics we optimize for are click-through rate (CTR), cost per click (CPC), and most importantly cost per acquisition (CPA) or return on ad spend (ROAS). We also track hook rate (3-second video view percentage) and completion rate to understand where creative is winning or losing attention throughout the video.' },
      { question: 'Can you produce ads for any product or service?', answer: 'Yes. We work across verticals — e-commerce, SaaS, professional services, health and wellness, finance, real estate, and more. Our research process before every creative project ensures that the work is grounded in genuine audience insight for your specific category, not generic advertising conventions.' },
      { question: 'How long does creative production take?', answer: 'Static ads and simple motion graphics are typically delivered within 3–5 business days. Video ad production (including editing, motion, sound, and text overlays) typically takes 5–7 business days. Rush timelines are available for time-sensitive campaigns.' },
    ],
    finalCta: {
      title: 'Ad Creative That Drives Real Advantage',
      description: 'There is no middle ground in paid advertising. The brands winning have creative that converts. The brands losing have everything else figured out but the creative. Let\'s make sure you\'re in the first group.',
      buttonText: 'Build My Creative Strategy'
    }
  }
];
