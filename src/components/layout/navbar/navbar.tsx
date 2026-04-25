'use client';

import React, { useState } from 'react';
import { Logo } from './logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@lib/utils';
import { FaBars, FaTimes } from 'react-icons/fa';

export const NavBar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { label: 'Home', url: '/' },
    { label: 'About', url: '/about' },
    { label: 'Portfolio', url: '/portfolio' },
    { label: 'Blog', url: '/blog' },
    { label: 'Contact', url: '/contact' },
  ];

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-0 pointer-events-none">
        {/* Desktop & Tablet Pill */}
        <nav className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-2xl shadow-2xl transition-all duration-300">
          <div className="pl-4 pr-3 border-r border-white/10 hidden md:block">
            <Logo />
          </div>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.url;
              return (
                <Link
                  key={link.label}
                  href={link.url}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    isActive 
                      ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
                      : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Header (Pill Style) */}
          <div className="md:hidden flex items-center justify-between w-[calc(100vw-4rem)] px-4 py-1">
            <Logo />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full bg-white/5 text-white/70 hover:text-white transition-colors"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-40 md:hidden bg-black/80 backdrop-blur-3xl transition-all duration-500",
        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className={cn(
          "flex flex-col items-center justify-center h-full gap-10 transition-transform duration-500",
          isMenuOpen ? "scale-100" : "scale-90"
        )}>
          {navLinks.map((link) => {
            const isActive = pathname === link.url;
            return (
              <Link
                key={link.label}
                href={link.url}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "text-4xl font-bold tracking-tighter transition-all duration-300",
                  isActive ? "text-primary scale-110" : "text-white/40 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="mt-12 p-5 rounded-full bg-white/5 text-white/50 border border-white/10"
          >
            <FaTimes size={28} />
          </button>
        </div>
      </div>
    </>
  );
};
