import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Separator } from '@/components/ui/separator';
import {
  Github,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  MapPin,
} from 'lucide-react';

const socialIcons: Record<string, React.ElementType> = {
  Github,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
};

export function Footer() {
  const { copyright, userLinks, navLinks, author } = siteConfig;

  const footerLinks = [
    {
      title: 'Navigation',
      links: navLinks.slice(0, 4),
    },
    {
      title: 'Resources',
      links: [
        { id: 'res_01', label: 'Courses', url: '/courses' },
        { id: 'res_02', label: 'Services', url: '/services' },
        { id: 'res_03', label: 'Blog', url: '/blog' },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <h3 className="text-xl font-bold">{author.name}</h3>
            </Link>
            <p className="mt-3 max-w-md text-sm text-muted-foreground leading-relaxed">
              {author.summary}. Building beautiful web experiences and sharing
              knowledge through courses, blog posts, and videos.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {userLinks.map((link) => {
                const Icon = socialIcons[link.icon];
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                    aria-label={link.label}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {section.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.url}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">{copyright}</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
