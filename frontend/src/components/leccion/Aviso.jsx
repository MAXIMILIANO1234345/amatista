import { CristalLogo } from '../Iconos';
import IconoLeccion from './IconosLeccion';
import { TextoEnLinea } from './Markdown';

const ESTILOS = {
  dato: { borde: 'border-neon/40', fondo: 'bg-neon/5', titulo: 'text-neon' },
  reto: { borde: 'border-blender/50', fondo: 'bg-blender/5', titulo: 'text-blender' },
};

// Recuadro destacado: "¿Sabías que…?" o "Reto".
function Aviso({ variant = 'dato', title, body }) {
  const estilo = ESTILOS[variant] ?? ESTILOS.dato;
  return (
    <aside className={`corte-poly flex gap-4 border ${estilo.borde} ${estilo.fondo} p-5`}>
      {variant === 'reto' ? (
        <IconoLeccion nombre="reto" className="h-10 w-10 shrink-0" />
      ) : (
        <CristalLogo className="h-10 w-10 shrink-0" />
      )}
      <div>
        <p className={`mb-1 font-mono text-xs font-bold uppercase tracking-widest ${estilo.titulo}`}>{title}</p>
        <p className="leading-relaxed text-texto/85">
          <TextoEnLinea texto={body} />
        </p>
      </div>
    </aside>
  );
}

export default Aviso;
