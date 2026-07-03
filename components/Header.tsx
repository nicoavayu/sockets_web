"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { siteContent } from "@/data/site-content";
import { assets } from "@/lib/assets";

export function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <a aria-label="Sockets, volver al inicio" className="header-logo" href="#inicio">
        <Image
          alt="Sockets"
          height={243}
          loading="eager"
          priority
          src={assets.logoHeader}
          width={339}
        />
      </a>

      <nav aria-label="Navegación principal" className="desktop-nav">
        {siteContent.navigation.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a
        className="header-cta"
        href={siteContent.contact.purchaseUrl}
        rel="noreferrer"
        target="_blank"
      >
        Quiero unas <span aria-hidden="true">↗</span>
      </a>

      <button
        aria-expanded={open}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="menu-button"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span />
        <span />
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            animate={{ opacity: 1, y: 0 }}
            aria-label="Navegación móvil"
            className="mobile-nav"
            exit={{ opacity: 0, y: -16 }}
            initial={{ opacity: 0, y: -16 }}
          >
            {siteContent.navigation.map((item, index) => (
              <motion.a
                animate={{ opacity: 1, x: 0 }}
                href={item.href}
                initial={{ opacity: 0, x: 20 }}
                key={item.href}
                onClick={closeMenu}
                transition={{ delay: index * 0.05 }}
              >
                <span>0{index + 1}</span>
                {item.label}
              </motion.a>
            ))}
            <a
              className="mobile-nav__cta"
              href={siteContent.contact.purchaseUrl}
              onClick={closeMenu}
              rel="noreferrer"
              target="_blank"
            >
              Quiero unas ↗
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
