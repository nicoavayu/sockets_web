"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { SockIllustration } from "@/components/SockIllustration";

export function MagneticSockScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const leftSockRef = useRef<HTMLDivElement>(null);
  const rightSockRef = useRef<HTMLDivElement>(null);
  const magnetRef = useRef<HTMLDivElement>(null);
  const captionOneRef = useRef<HTMLDivElement>(null);
  const captionTwoRef = useRef<HTMLDivElement>(null);
  const captionThreeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (matchContext) => {
          const { desktop, mobile, reduce } = matchContext.conditions as {
            desktop: boolean;
            mobile: boolean;
            reduce: boolean;
          };

          if (reduce) {
            gsap.set([leftSockRef.current, rightSockRef.current], {
              xPercent: 0,
              rotate: 0,
            });
            gsap.set(magnetRef.current, { opacity: 1, scale: 1 });
            gsap.set(captionThreeRef.current, { opacity: 1, y: 0 });
            gsap.set([captionOneRef.current, captionTwoRef.current], {
              opacity: 0,
            });
            return;
          }

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: desktop ? "top top" : "top 70%",
              end: desktop ? "+=2200" : "bottom 35%",
              pin: desktop ? pinRef.current : false,
              scrub: desktop ? 1.1 : 0.7,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .set(captionOneRef.current, { opacity: 1, y: 0 })
            .fromTo(
              leftSockRef.current,
              {
                xPercent: desktop ? -108 : -45,
                yPercent: desktop ? -4 : 4,
                rotate: -18,
              },
              {
                xPercent: desktop ? -30 : -12,
                yPercent: 0,
                rotate: -7,
                duration: 1,
              },
              0,
            )
            .fromTo(
              rightSockRef.current,
              {
                xPercent: desktop ? 108 : 45,
                yPercent: desktop ? 7 : -4,
                rotate: 19,
              },
              {
                xPercent: desktop ? 30 : 12,
                yPercent: 0,
                rotate: 8,
                duration: 1,
              },
              0,
            )
            .to(captionOneRef.current, { opacity: 0, y: -18, duration: 0.2 })
            .fromTo(
              captionTwoRef.current,
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0, duration: 0.22 },
            )
            .fromTo(
              magnetRef.current,
              { opacity: 0, scale: 0.55, rotate: -45 },
              { opacity: 1, scale: 1, rotate: 0, duration: 0.5 },
              "<",
            )
            .to(
              leftSockRef.current,
              {
                xPercent: desktop ? -3 : -1,
                rotate: -2,
                duration: 0.72,
                ease: "power3.in",
              },
              ">",
            )
            .to(
              rightSockRef.current,
              {
                xPercent: desktop ? 3 : 1,
                rotate: 2,
                duration: 0.72,
                ease: "power3.in",
              },
              "<",
            )
            .to(magnetRef.current, {
              scale: 1.18,
              duration: 0.12,
              ease: "power2.out",
            })
            .to(magnetRef.current, { scale: 1, duration: 0.16 })
            .to(captionTwoRef.current, { opacity: 0, y: -18, duration: 0.2 })
            .fromTo(
              captionThreeRef.current,
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0, duration: 0.28 },
            );

          if (mobile) {
            timeline.duration(1.8);
          }
        },
      );

      return () => media.revert();
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      aria-label="Cómo el imán mantiene juntas las medias"
      className="magnetic-story"
      ref={sectionRef}
    >
      <div className="magnetic-story__pin" ref={pinRef}>
        <div className="magnetic-story__meta">
          <span>02 / EL ENCUENTRO</span>
          <span>SCROLLEÁ PARA ACTIVAR EL CAMPO →</span>
        </div>

        <div className="magnetic-story__copy">
          <div className="story-caption" ref={captionOneRef}>
            <span>ANTES</span>
            <h2>Caos. Distancia. Medias viudas.</h2>
          </div>
          <div className="story-caption" ref={captionTwoRef}>
            <span>LA SOLUCIÓN</span>
            <h2>Un imán escondido debajo del logo.</h2>
          </div>
          <div className="story-caption" ref={captionThreeRef}>
            <span>DESPUÉS</span>
            <h2>Clac. Juntas hasta el próximo uso.</h2>
          </div>
        </div>

        <div className="magnetic-story__scene">
          <div
            aria-hidden="true"
            className="story-field story-field--left"
          />
          <div
            aria-hidden="true"
            className="story-field story-field--right"
          />
          <div className="story-sock story-sock--left" ref={leftSockRef}>
            <SockIllustration
              color="cyan"
              label="Media cyan acercándose magnéticamente"
              revealMagnet
            />
          </div>
          <div className="story-magnet" ref={magnetRef}>
            <span>N</span>
            <i />
            <span>S</span>
            <small>IMÁN / BAJO EL LOGO</small>
          </div>
          <div className="story-sock story-sock--right" ref={rightSockRef}>
            <SockIllustration
              color="red"
              flip
              label="Media roja acercándose magnéticamente"
              revealMagnet
            />
          </div>
        </div>

        <p className="magnetic-story__footnote">
          No es magia. No es terapia de pareja. Es un imán.
        </p>
      </div>
    </section>
  );
}
