export function Ticker() {
  const items = [
    "NUNCA MÁS PIERDAS UNA MEDIA",
    "DOS POLOS, CERO DRAMA",
    "CLAC® Y LISTO",
    "EL LAVARROPAS YA NO GANA",
    "HECHAS EN ARGENTINA",
    "SE ATRAEN DESDE 2024",
  ];

  const row = items.map((item) => `${item} ✱ `).join("");

  return (
    <div aria-hidden="true" className="ticker">
      <div className="ticker__stripes" />
      <div className="ticker__track">
        <span>{row}</span>
        <span>{row}</span>
      </div>
    </div>
  );
}
