"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { siteContent } from "@/data/site-content";
import { assets } from "@/lib/assets";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.4,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a
          aria-label="Sockets, volver al inicio"
          className="site-header__logo"
          data-magnet
          href="#inicio"
        >
          <Image
            alt="Sockets"
            height={64}
            loading="eager"
            priority
            src={assets.logoHeader}
            width={89}
          />
        </a>

        <nav aria-label="Navegación principal" className="site-header__nav">
          {siteContent.navigation.map((item, index) => (
            <a data-magnet href={item.href} key={item.href}>
              <sup>0{index + 1}</sup>
              <span data-text={item.label}>{item.label}</span>
            </a>
          ))}
        </nav>

        <a
          className="site-header__cta"
          data-magnet
          href={siteContent.contact.purchaseUrl}
          rel="noreferrer"
          target="_blank"
        >
          QUIERO UN PAR <i aria-hidden="true">↗</i>
        </a>

        <button
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className={`site-header__burger ${open ? "is-open" : ""}`}
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          <span />
          <span />
        </button>

        <motion.div
          aria-hidden="true"
          className="site-header__thread"
          style={{ scaleX: progress }}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            aria-label="Navegación móvil"
            className="mobile-menu"
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mobile-menu__links">
              {siteContent.navigation.map((item, index) => (
                <motion.a
                  animate={{ opacity: 1, y: 0 }}
                  href={item.href}
                  initial={{ opacity: 0, y: 26 }}
                  key={item.href}
                  onClick={closeMenu}
                  transition={{ delay: 0.16 + index * 0.06 }}
                >
                  <span>0{index + 1}</span>
                  {item.label}
                </motion.a>
              ))}
            </div>
            <motion.div
              animate={{ opacity: 1 }}
              className="mobile-menu__footer"
              initial={{ opacity: 0 }}
              transition={{ delay: 0.42 }}
            >
              <a
                href={siteContent.contact.purchaseUrl}
                onClick={closeMenu}
                rel="noreferrer"
                target="_blank"
              >
                QUIERO UN PAR ↗
              </a>
              <span>{siteContent.contact.instagramHandle}</span>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
