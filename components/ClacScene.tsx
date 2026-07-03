"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { assets } from "@/lib/assets";

export function ClacScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const magnetRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const captionRefs = useRef<Array<HTMLParagraphElement | null>>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 900px)",
          mobile: "(max-width: 899px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (matchContext) => {
          const { desktop, reduce } = matchContext.conditions as {
            desktop: boolean;
            mobile: boolean;
            reduce: boolean;
          };

          const [c1, c2, c3] = captionRefs.current;

          if (reduce) {
            gsap.set([leftRef.current, rightRef.current], {
              xPercent: 0,
              opacity: 0.12,
            });
            gsap.set(impactRef.current, { opacity: 1, scale: 1 });
            gsap.set(magnetRef.current, { opacity: 0 });
            gsap.set([c1, c2], { opacity: 0 });
            gsap.set(c3, { opacity: 1 });
            return;
          }

          const spread = desktop ? 150 : 92;
          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: desktop ? "top top" : "top 72%",
              end: desktop ? "+=2400" : "bottom 45%",
              pin: desktop ? pinRef.current : false,
              scrub: desktop ? 1 : 0.7,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .set(c1, { opacity: 1, y: 0 })
            .fromTo(
              leftRef.current,
              { xPercent: -spread, rotate: -4 },
              { xPercent: desktop ? -56 : -34, rotate: -1.5, duration: 1 },
              0,
            )
            .fromTo(
              rightRef.current,
              { xPercent: spread, rotate: 4 },
              { xPercent: desktop ? 56 : 34, rotate: 1.5, duration: 1 },
              0,
            )
            .fromTo(
              magnetRef.current,
              { opacity: 0, scale: 0.5, rotate: -90 },
              { opacity: 1, scale: 1, rotate: 0, duration: 0.6 },
              0.35,
            )
            .to(c1, { opacity: 0, y: -16, duration: 0.18 }, 0.95)
            .fromTo(
              c2,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.2 },
              1.1,
            )
            .to(
              leftRef.current,
              { xPercent: -9, duration: 0.75, ease: "power3.in" },
              1.2,
            )
            .to(
              rightRef.current,
              { xPercent: 9, duration: 0.75, ease: "power3.in" },
              1.2,
            )
            .to(magnetRef.current, { opacity: 0, scale: 1.7, duration: 0.14 }, 1.9)
            .to(
              [leftRef.current, rightRef.current],
              { opacity: 0.07, duration: 0.12 },
              1.96,
            )
            .fromTo(
              impactRef.current,
              { opacity: 0, scale: 0.3, rotate: 10 },
              {
                opacity: 1,
                scale: 1,
                rotate: -6,
                duration: 0.3,
                ease: "back.out(2.4)",
              },
              2,
            )
            .fromTo(
              stageRef.current,
              { x: 0 },
              {
                keyframes: [
                  { x: -10, duration: 0.05 },
                  { x: 12, duration: 0.05 },
                  { x: -7, duration: 0.05 },
                  { x: 4, duration: 0.05 },
                  { x: 0, duration: 0.05 },
                ],
              },
              2.02,
            )
            .to(c2, { opacity: 0, y: -16, duration: 0.16 }, 2)
            .fromTo(
              c3,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.25 },
              2.15,
            )
            .to({}, { duration: 0.5 });
        },
      );

      return () => media.revert();
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      aria-label="Cómo el imán junta las medias"
      className="clac-scene"
      ref={sectionRef}
    >
      <div className="clac-scene__pin" ref={pinRef}>
        <div className="clac-scene__meta">
          <span>02 / EL ENCUENTRO</span>
          <span>SCROLLEÁ PARA ACTIVAR EL CAMPO ↓</span>
        </div>

        <div className="clac-scene__stage" ref={stageRef}>
          <span className="clac-scene__word clac-scene__word--left" ref={leftRef}>
            TU MEDIA
          </span>

          <div aria-hidden="true" className="clac-scene__magnet" ref={magnetRef}>
            <i />
            <Image alt="" height={72} src={assets.diamond} width={72} />
          </div>

          <span
            className="clac-scene__word clac-scene__word--right"
            ref={rightRef}
          >
            LA OTRA
          </span>

          <div aria-hidden="true" className="clac-scene__impact" ref={impactRef}>
            <strong>¡CLAC!</strong>
            <span>PAR COMPLETO®</span>
          </div>
        </div>

        <div className="clac-scene__captions">
          <p
            ref={(node) => {
              captionRefs.current[0] = node;
            }}
          >
            Separadas. Tristes. <em>Se extrañan.</em>
          </p>
          <p
            ref={(node) => {
              captionRefs.current[1] = node;
            }}
          >
            El imán empieza a <em>hacer lo suyo.</em>
          </p>
          <p
            ref={(node) => {
              captionRefs.current[2] = node;
            }}
          >
            Juntas hasta el <em>próximo uso.</em>
          </p>
        </div>

        <p className="clac-scene__footnote">
          No es magia. No es terapia de pareja. Es un imán.
        </p>
      </div>
    </section>
  );
}
