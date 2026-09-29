// Íconos low poly de las lecciones (48 × 48). Solo caras planas.

// Puntos de un hexágono (sirve para monedas, pelotas y articulaciones).
const hexagono = (cx, cy, r) =>
  [0, 60, 120, 180, 240, 300]
    .map((grados) => {
      const a = (grados * Math.PI) / 180;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    })
    .join(' ');

function Modelar() {
  const vertices = [[24, 6], [42, 15], [24, 24], [6, 15], [6, 33], [24, 42], [42, 33]];
  return (
    <>
      <polygon points="24,6 42,15 24,24 6,15" fill="#B57EDC" />
      <polygon points="6,15 24,24 24,42 6,33" fill="#7D3C98" />
      <polygon points="42,15 24,24 24,42 42,33" fill="#5B2C7A" />
      <path d="M6 15 L24 24 L42 15 M24 24 V42" fill="none" stroke="#00E5FF" strokeWidth="1" />
      <polygon points="24,6 42,15 42,33 24,42 6,33 6,15" fill="none" stroke="#00E5FF" strokeWidth="1" />
      {vertices.map(([x, y]) => (
        <polygon key={`${x}-${y}`} points={hexagono(x, y, 2.4)} fill="#5CF0FF" />
      ))}
    </>
  );
}

function Texturizar() {
  return (
    <>
      <polygon points="6,20 18,20 18,32 6,32" fill="#F5792A" />
      <polygon points="18,20 30,20 30,32 18,32" fill="#FFB27A" />
      <polygon points="6,32 18,32 18,44 6,44" fill="#FFB27A" />
      <polygon points="18,32 30,32 30,44 18,44" fill="#F5792A" />
      <polygon points="38,4 44,10 30,26 26,22" fill="#B57EDC" />
      <polygon points="44,10 30,26 28,24 41,7" fill="#7D3C98" />
      <polygon points="26,22 30,26 27,29 23,25" fill="#E0E0E0" />
      <polygon points="23,25 27,29 17,35" fill="#00E5FF" />
    </>
  );
}

function Rigging() {
  return (
    <>
      <polygon points="10,38 16.7,35.9 24,20" fill="#E0E0E0" />
      <polygon points="10,38 10.3,31.1 24,20" fill="#A6A6A6" />
      <polygon points="24,20 29.6,21.1 40,12" fill="#E0E0E0" />
      <polygon points="24,20 26.4,14.9 40,12" fill="#A6A6A6" />
      <polygon points={hexagono(10, 38, 4)} fill="#00B8CC" />
      <polygon points={hexagono(24, 20, 4)} fill="#00E5FF" />
      <polygon points={hexagono(40, 12, 3.2)} fill="#5CF0FF" />
    </>
  );
}

function Animar() {
  return (
    <>
      <polygon points={hexagono(12, 24, 4)} fill="#B57EDC" opacity="0.35" />
      <polygon points={hexagono(24, 12, 4)} fill="#B57EDC" opacity="0.6" />
      <polygon points={hexagono(36, 24, 4)} fill="#B57EDC" />
      <line x1="6" y1="38" x2="42" y2="38" stroke="#E0E0E0" strokeOpacity="0.35" strokeWidth="2" />
      {[12, 24, 36].map((x) => (
        <g key={x}>
          <polygon points={`${x},33 ${x + 5},38 ${x - 5},38`} fill="#FFB27A" />
          <polygon points={`${x - 5},38 ${x + 5},38 ${x},43`} fill="#F5792A" />
        </g>
      ))}
      <line x1="30" y1="9" x2="30" y2="44" stroke="#00E5FF" strokeWidth="1.5" />
      <polygon points="27,6 33,6 30,10" fill="#00E5FF" />
    </>
  );
}

function Iluminar() {
  const rayos = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <>
      {rayos.map((grados) => (
        <polygon
          key={grados}
          points="22,8 26,8 24,2"
          fill="#FFB27A"
          transform={`rotate(${grados} 24 24)`}
        />
      ))}
      <polygon points={hexagono(24, 24, 10)} fill="#FFD166" />
      <polygon points="24,24 34,24 29,32.7 19,32.7 14,24" fill="#F4B400" />
      <polygon points="24,24 19,15.3 29,15.3" fill="#FFE39A" />
    </>
  );
}

function Render() {
  return (
    <>
      <polygon points="4,18 26,18 26,38 4,38" fill="#7D3C98" />
      <polygon points="4,18 26,18 22,14 8,14" fill="#B57EDC" />
      <polygon points="26,18 26,38 22,34 22,14" fill="#5B2C7A" />
      <polygon points="26,22 44,12 44,44 26,34" fill="#00E5FF" opacity="0.25" />
      <polyline points="26,22 44,12 44,44 26,34" fill="none" stroke="#00E5FF" strokeWidth="1.2" />
      <polygon points="10,14 20,14 15,8" fill="#00E5FF" />
    </>
  );
}

function Estudio() {
  return (
    <>
      <polygon points="8,21 40,21 8,41" fill="#5B2C7A" />
      <polygon points="40,21 40,41 8,41" fill="#3D1F52" />
      <polygon points="7,14 38,8 40,14 9,20" fill="#E0E0E0" />
      <polygon points="13,13 18,12 20,17 15,18" fill="#121212" />
      <polygon points="23,11 28,10 30,15 25,16" fill="#121212" />
      <polygon points="33,9 37,8.5 39,13 35,14" fill="#121212" />
      <polygon points="12,27 36,27 36,29 12,29" fill="#B57EDC" />
      <polygon points="12,33 28,33 28,35 12,35" fill="#B57EDC" opacity="0.6" />
    </>
  );
}

function Empresa() {
  return (
    <>
      <polygon points="8,16 24,8 40,16 24,24" fill="#B57EDC" />
      <polygon points="8,16 24,24 24,44 8,36" fill="#7D3C98" />
      <polygon points="40,16 24,24 24,44 40,36" fill="#5B2C7A" />
      {[0, 8].map((dy) => (
        <g key={dy}>
          <polygon points={`11,${22 + dy} 15,${24 + dy} 15,${28 + dy} 11,${26 + dy}`} fill="#00E5FF" />
          <polygon points={`17,${25 + dy} 21,${27 + dy} 21,${31 + dy} 17,${29 + dy}`} fill="#00E5FF" opacity="0.6" />
          <polygon points={`27,${27 + dy} 31,${25 + dy} 31,${29 + dy} 27,${31 + dy}`} fill="#00E5FF" opacity="0.5" />
          <polygon points={`33,${24 + dy} 37,${22 + dy} 37,${26 + dy} 33,${28 + dy}`} fill="#00E5FF" opacity="0.8" />
        </g>
      ))}
    </>
  );
}

function Monedas() {
  return (
    <>
      {[38, 33, 28].map((y) => (
        <g key={y}>
          <polygon points={`7,${y} 29,${y} 29,${y + 3} 7,${y + 3}`} fill="#C98A00" />
          <polygon points={`7,${y} 11,${y - 3} 25,${y - 3} 29,${y} 25,${y + 3} 11,${y + 3}`} fill="#FFD166" />
        </g>
      ))}
      <polygon points={hexagono(33, 17, 11)} fill="#F4B400" />
      <polygon points={hexagono(33, 17, 6.5)} fill="#FFD166" />
      <polygon points={`33,17 ${hexagono(33, 17, 6.5).split(' ').slice(3, 5).join(' ')}`} fill="#FFE39A" />
    </>
  );
}

function Libre() {
  return (
    <>
      <path d="M16 22 V13 A8 8 0 0 1 32 13 V16" fill="none" stroke="#E0E0E0" strokeWidth="4" />
      <polygon points="11,22 37,22 24,32" fill="#B57EDC" />
      <polygon points="11,22 24,32 11,43" fill="#9B59B6" />
      <polygon points="37,22 37,43 24,32" fill="#7D3C98" />
      <polygon points="11,43 24,32 37,43" fill="#5B2C7A" />
      <polygon points={hexagono(24, 30, 3)} fill="#121212" />
      <polygon points="22.5,31 25.5,31 24,37" fill="#121212" />
      <polygon points="40,6 42,10 46,11 42,12 40,16 38,12 34,11 38,10" fill="#00E5FF" />
    </>
  );
}

function Reto() {
  return (
    <>
      <line x1="12" y1="6" x2="12" y2="44" stroke="#E0E0E0" strokeWidth="3" />
      <polygon points="13,7 40,13 13,19" fill="#F5792A" />
      <polygon points="13,19 40,13 30,22 13,26" fill="#E06A1F" />
      <polygon points={hexagono(12, 44, 4)} fill="#7D3C98" />
    </>
  );
}

const ICONOS = {
  modelar: Modelar,
  texturizar: Texturizar,
  rigging: Rigging,
  animar: Animar,
  iluminar: Iluminar,
  render: Render,
  estudio: Estudio,
  empresa: Empresa,
  monedas: Monedas,
  libre: Libre,
  reto: Reto,
};

function IconoLeccion({ nombre, className = '' }) {
  const Figura = ICONOS[nombre] ?? Modelar;
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <Figura />
    </svg>
  );
}

export default IconoLeccion;
