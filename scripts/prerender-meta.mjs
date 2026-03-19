/**
 * Post-build script that generates route-specific HTML files
 * with proper meta tags for social crawlers and SEO.
 *
 * Social media crawlers (Facebook, LinkedIn, Twitter) do NOT execute
 * JavaScript, so they only see the static index.html meta tags.
 * This script creates per-route HTML files with correct OG/meta tags.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

const DIST = join(process.cwd(), 'dist');
const SITE_URL = 'https://symphosys.com';
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

const routes = [
  {
    path: '/about',
    title: 'About Us | Symphosys',
    description: 'Symphosys is a full-service digital agency helping businesses grow through web development, design, video, and marketing.',
    image: DEFAULT_IMAGE,
  },
  {
    path: '/contact',
    title: 'Contact Us | Symphosys',
    description: 'Get in touch with Symphosys for a free consultation on web development, digital marketing, branding, and more.',
    image: DEFAULT_IMAGE,
  },
  {
    path: '/work',
    title: 'Our Work | Symphosys',
    description: 'Explore Symphosys case work, campaign creative, and production examples across industries.',
    image: DEFAULT_IMAGE,
  },
  {
    path: '/case-studies',
    title: 'Case Studies | Symphosys',
    description: 'Read real case studies showing how Symphosys helped businesses grow through web development, marketing, design, and video.',
    image: DEFAULT_IMAGE,
  },
  {
    path: '/terms',
    title: 'Terms of Service | Symphosys',
    description: 'Terms of service for Symphosys digital agency.',
    image: DEFAULT_IMAGE,
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | Symphosys',
    description: 'Privacy policy for Symphosys digital agency.',
    image: DEFAULT_IMAGE,
  },
  // Service pages
  {
    path: '/services/web-development',
    title: 'Professional Web Development Services | Fast, SEO-Ready Websites That Convert',
    description: 'We build high-performance custom websites engineered for speed, search engine visibility, and conversion. From business sites to web apps — built to grow your business.',
  },
  {
    path: '/services/shopify-store-design',
    title: 'Shopify Store Design Services | Custom Shopify Stores Built to Convert',
    description: 'We design custom Shopify stores that look premium and sell more. Product pages, checkout optimization, speed, mobile experience — every detail built to maximize your revenue.',
  },
  {
    path: '/services/graphic-design',
    title: 'Professional Graphic Design Services | Visual Assets That Build Brands and Drive Results',
    description: 'We create professional graphic design for social media, brand identity, marketing materials, and more. Strategic, human-centered design that communicates, persuades, and converts.',
  },
  {
    path: '/services/video-editing',
    title: 'Professional Video Editing Services | Story-Driven Content for Every Platform',
    description: 'Expert video editing for YouTube, Instagram Reels, TikTok, brand films, and more. We transform raw footage into polished, high-retention content.',
  },
  {
    path: '/services/video-animations',
    title: 'Video Animation Services | Explainer Videos, Motion Graphics & 2D Animation',
    description: 'We create 2D animations, explainer videos, motion graphics, logo animations, and animated social content that simplifies complex ideas and drives engagement.',
  },
  {
    path: '/services/growth-marketing',
    title: 'Growth Marketing Services | Data-Driven Systems That Scale Your Revenue',
    description: 'We build growth marketing frameworks — funnel optimization, A/B testing, user acquisition, and retention marketing — that compound your revenue.',
  },
  {
    path: '/services/lead-generation',
    title: 'Lead Generation Services | Build a Predictable Pipeline of Qualified Buyers',
    description: 'We build inbound and outbound lead generation systems that deliver qualified, sales-ready leads consistently.',
  },
  {
    path: '/services/brand-building',
    title: 'Brand Building Services | Strategy, Identity & Messaging That Makes You Unforgettable',
    description: 'We build brands from the inside out — strategy, visual identity, voice, and messaging — that attract loyal customers and command premium pricing.',
  },
  {
    path: '/services/digital-marketing',
    title: 'Digital Marketing Services | Full-Stack Online Marketing That Drives Real Revenue',
    description: 'Comprehensive digital marketing services including SEO, content marketing, email marketing, social media management, and paid advertising.',
  },
  {
    path: '/services/creative-ads',
    title: 'Creative Ad Services | Scroll-Stopping Ad Creative for Meta, TikTok, YouTube & Google',
    description: 'We produce high-performance ad creative — video ads, static ads, and UGC-style content — for Meta, TikTok, YouTube, and Google.',
  },
  // Case study pages
  {
    path: '/case-studies/web-development',
    title: 'Harborline Logistics Case Study | Symphosys',
    description: 'From a slow brochure site to a high-converting lead engine. See how Symphosys helped Harborline Logistics.',
    image: `${SITE_URL}/case-studies/web-development.svg`,
  },
  {
    path: '/case-studies/shopify-store-design',
    title: 'Evergreen Supply Co. Case Study | Symphosys',
    description: 'A premium Shopify rebuild that lifted conversion and AOV. See how Symphosys helped Evergreen Supply Co.',
    image: `${SITE_URL}/case-studies/shopify-store-design.svg`,
  },
  {
    path: '/case-studies/graphic-design',
    title: 'Crescent Health Case Study | Symphosys',
    description: 'A visual system built to win trust in a crowded market. See how Symphosys helped Crescent Health.',
    image: `${SITE_URL}/case-studies/graphic-design.svg`,
  },
  {
    path: '/case-studies/video-editing',
    title: 'Skyline Fitness Case Study | Symphosys',
    description: 'Retention-first editing that lifted watch time and sign-ups. See how Symphosys helped Skyline Fitness.',
    image: `${SITE_URL}/case-studies/video-editing.svg`,
  },
  {
    path: '/case-studies/video-animations',
    title: 'Pulse Analytics Case Study | Symphosys',
    description: 'An explainer series that shortened the sales cycle. See how Symphosys helped Pulse Analytics.',
    image: `${SITE_URL}/case-studies/video-animations.svg`,
  },
  {
    path: '/case-studies/growth-marketing',
    title: 'Northgate SaaS Case Study | Symphosys',
    description: 'A full-funnel growth system that reduced CAC. See how Symphosys helped Northgate SaaS.',
    image: `${SITE_URL}/case-studies/growth-marketing.svg`,
  },
  {
    path: '/case-studies/lead-generation',
    title: 'Atlas Advisory Case Study | Symphosys',
    description: 'A multi-channel lead engine for a high-ticket consultancy. See how Symphosys helped Atlas Advisory.',
    image: `${SITE_URL}/case-studies/lead-generation.svg`,
  },
  {
    path: '/case-studies/brand-building',
    title: 'Solstice Botanics Case Study | Symphosys',
    description: 'A brand position that justified premium pricing. See how Symphosys helped Solstice Botanics.',
    image: `${SITE_URL}/case-studies/brand-building.svg`,
  },
  {
    path: '/case-studies/digital-marketing',
    title: 'BrightPath Clinics Case Study | Symphosys',
    description: 'An integrated marketing stack for consistent bookings. See how Symphosys helped BrightPath Clinics.',
    image: `${SITE_URL}/case-studies/digital-marketing.svg`,
  },
  {
    path: '/case-studies/creative-ads',
    title: 'Lumen Home Case Study | Symphosys',
    description: 'Scroll-stopping creative that lifted ROAS. See how Symphosys helped Lumen Home.',
    image: `${SITE_URL}/case-studies/creative-ads.svg`,
  },
];

function injectMeta(html, { path, title, description, image }) {
  const url = `${SITE_URL}${path}`;
  const img = image || DEFAULT_IMAGE;

  return html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${description}$2`
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
      `$1${title}$2`
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${description}$2`
    )
    .replace(
      /(<meta\s+property="og:image"\s+content=")[^"]*(")/,
      `$1${img}$2`
    )
    .replace(
      /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
      `$1${url}$2`
    )
    .replace(
      /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
      `$1${title}$2`
    )
    .replace(
      /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
      `$1${description}$2`
    )
    .replace(
      /(<meta\s+name="twitter:image"\s+content=")[^"]*(")/,
      `$1${img}$2`
    )
    .replace(
      /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
      `$1${url}$2`
    );
}

let generated = 0;

for (const route of routes) {
  const html = injectMeta(template, route);
  const dir = join(DIST, route.path);

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  writeFileSync(join(dir, 'index.html'), html, 'utf-8');
  generated++;
}

console.log(`Prerendered meta tags for ${generated} routes.`);
