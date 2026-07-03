"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { PointerEvent } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import { assets } from "@/lib/assets";

const galleryItems = [
  {
    src: assets.pairStudio,
    width: 1600,
    height: 2400,
    label: "EL PAR",
    caption: "Juntos, como corresponde.",
    alt: "Par de medias Sockets blancas sobre fondo mostaza",
  },
  {
    src: assets.streetMockup,
    width: 1600,
    height: 1066,
    label: "EN LA CALLE",
    caption: "Se bancan todo. Hasta la lluvia.",
    alt: "Medias Sockets negras puestas, con zapatillas blancas sobre asfalto mojado",
  },
  {
    src: assets.packagingFront,
    width: 1248,
    height: 1800,
    label: "EL PACK",
    caption: "2 pares. 0 dramas.",
    alt: "Frente del packaging de Sockets",
  },
  {
    src: assets.knitBanner,
    width: 1920,
    height: 1080,
    label: "EL TEJIDO",
    caption: "Detalle que abraza.",
    alt: "Textura tejida de la marca Sockets con rayas bordó y petróleo",
  },
  {
    src: assets.packagingArt,
    width: 1248,
    height: 1800,
    label: "LA GRÁFICA",
    caption: "Polos opuestos que se atraen.",
    alt: "Arte del packaging con imanes rojo y cyan",
  },
] as const;

export function ProductGallery() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const dragState = useRef({ startX: 0, startScroll: 0, moved: false });

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!scroller || event.pointerType !== "mouse") return;
    setDragging(true);
    dragState.current = {
      startX: event.clientX,
      startScroll: scroller.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!scroller || !dragging) return;
    const delta = event.clientX - dragState.current.startX;
    if (Math.abs(delta) > 4) dragState.current.moved = true;
    scroller.scrollLeft = dragState.current.startScroll - delta;
  };

  const endDrag = () => setDragging(false);

  return (
    <section className="gallery" id="producto">
      <SectionTitle
        index="05"
        label="EL PRODUCTO"
        light
        title={
          <>
            De cerca también <em>rinde.</em>
          </>
        }
      />

      <div
        className={`gallery__scroller ${dragging ? "is-dragging" : ""}`}
        data-cursor="ARRASTRÁ →"
        onPointerDown={onPointerDown}
        onPointerLeave={endDrag}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        ref={scrollerRef}
      >
        {galleryItems.map((item, index) => (
          <figure
            className={`gallery__card ${
              item.height > item.width ? "gallery__card--tall" : "gallery__card--wide"
            }`}
            key={item.label}
            style={{ rotate: `${index % 2 === 0 ? -1.2 : 1.4}deg` }}
          >
            <div className="gallery__frame">
              <Image
                alt={item.alt}
                draggable={false}
                height={item.height}
                sizes="(max-width: 900px) 74vw, 30vw"
                src={item.src}
                width={item.width}
              />
            </div>
            <figcaption>
              <span>0{index + 1} / {item.label}</span>
              <em>{item.caption}</em>
            </figcaption>
          </figure>
        ))}

        <div className="gallery__endcard" aria-hidden="true">
          <p>
            FIN DEL
            <br />
            CATÁLOGO.
          </p>
          <span>Las medias siguen juntas. ✓</span>
        </div>
      </div>

      <p className="gallery__hint" aria-hidden="true">
        ← ARRASTRÁ PARA CHUSMEAR →
      </p>
    </section>
  );
}
