"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface HeroSlide {
  id: string;
  type: "article" | "featured";
  label: string;
  category: string;
  title: string;
  excerpt: string;
  href: string;
  gradient: string;
}

interface HeroSlideshowProps {
  slides: HeroSlide[];
}

const SLIDE_INTERVAL = 7000;

export function HeroSlideshow({ slides }: HeroSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    if (slides.length <= 1) return;
    setIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    if (slides.length <= 1) return;
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goTo = useCallback((i: number) => {
    if (i === index) return;
    setIndex(i);
  }, [index]);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const timer = setTimeout(next, SLIDE_INTERVAL);
    return () => clearTimeout(timer);
  }, [index, next, isPaused, slides.length]);

  if (slides.length === 0) return null;

  const current = slides[index];
  const Icon = current.type === "featured" ? Sparkles : BookOpen;

  return (
    <div
      className="relative w-full bg-surface rounded-2xl p-6 md:p-8 lg:p-10 border border-border shadow-xl shadow-accent/5 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured research"
    >
      {/* Gradient accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${current.gradient}`} />

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />

      {/* Slide content */}
      <div className="relative min-h-[260px] md:min-h-[280px] flex flex-col justify-between">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col h-full"
          >
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <Badge variant="accent">{current.category}</Badge>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                  current.type === "featured"
                    ? "bg-cyan/10 text-cyan border-cyan/20"
                    : "bg-accent/10 text-accent border-accent/20"
                }`}
              >
                <Icon size={12} />
                {current.label}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl lg:text-[1.65rem] font-bold text-ink leading-tight mb-4 line-clamp-2 text-balance">
              {current.title}
            </h3>

            {/* Excerpt */}
            <p className="text-text-secondary text-sm md:text-base leading-relaxed line-clamp-4 mb-6 flex-grow">
              {current.excerpt}
            </p>

            {/* CTA */}
            <Link
              href={current.href}
              className="group inline-flex items-center text-sm md:text-base font-semibold text-accent hover:text-accent-dark transition-colors w-fit"
            >
              Read the article
              <ChevronRight
                size={18}
                className="ml-1 group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="relative flex items-center justify-between mt-8 pt-5 border-t border-border-light">
        {/* Dot navigation */}
        <div className="flex items-center gap-1.5" role="tablist">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 focus-ring ${
                i === index
                  ? "bg-accent w-6"
                  : "bg-border hover:bg-text-muted w-2"
              }`}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="p-2 rounded-full border border-border text-text-secondary hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-colors focus-ring"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="p-2 rounded-full border border-border text-text-secondary hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-colors focus-ring"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
