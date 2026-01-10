/**
 * Navigation configuration
 *
 * Define your site's navigation structure here.
 */

export const MAIN_NAVIGATION = [
  { id: "nav-features", label: "Features", href: "/features" },
  { id: "nav-pricing", label: "Pricing", href: "/pricing" },
  { id: "nav-about", label: "About", href: "/about" },
  { id: "nav-contact", label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  product: [
    { id: "footer-features", label: "Features", href: "/features" },
    { id: "footer-pricing", label: "Pricing", href: "/pricing" },
    { id: "footer-changelog", label: "Changelog", href: "/changelog" },
  ],
  company: [
    { id: "footer-about", label: "About", href: "/about" },
    { id: "footer-blog", label: "Blog", href: "/blog" },
    { id: "footer-careers", label: "Careers", href: "/careers" },
    { id: "footer-contact", label: "Contact", href: "/contact" },
  ],
  legal: [
    { id: "footer-privacy", label: "Privacy", href: "/privacy" },
    { id: "footer-terms", label: "Terms", href: "/terms" },
  ],
} as const;

export const SOCIAL_LINKS = [
  {
    id: "social-twitter",
    label: "Twitter",
    href: "https://twitter.com/acmeinc",
    platform: "twitter" as const,
  },
  {
    id: "social-github",
    label: "GitHub",
    href: "https://github.com/acmeinc",
    platform: "github" as const,
  },
  {
    id: "social-linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/company/acmeinc",
    platform: "linkedin" as const,
  },
] as const;

export type NavigationItem = (typeof MAIN_NAVIGATION)[number];
export type SocialLinkItem = (typeof SOCIAL_LINKS)[number];
