import Aviso from './Aviso';
import BloqueCodigo from './BloqueCodigo';
import Capas from './Capas';
import Figura from './Figura';
import LineaTiempo from './LineaTiempo';
import Markdown from './Markdown';
import Pipeline from './Pipeline';
import TarjetasConcepto from './TarjetasConcepto';

// Dibuja un bloque de contenido del JSON de la lección según su "type".
function BloqueContenido({ bloque, alDescubrirTodas }) {
  switch (bloque.type) {
    case 'markdown_text':
      return <Markdown texto={bloque.body} />;
    case 'image':
      return <Figura src={bloque.src} alt={bloque.alt} caption={bloque.caption} />;
    case 'concept_cards':
      return <TarjetasConcepto items={bloque.items} alDescubrirTodas={alDescubrirTodas} />;
    case 'timeline':
      return <LineaTiempo title={bloque.title} items={bloque.items} />;
    case 'pipeline':
      return <Pipeline title={bloque.title} steps={bloque.steps} />;
    case 'layers':
      return <Capas title={bloque.title} items={bloque.items} footer={bloque.footer} />;
    case 'callout':
      return <Aviso variant={bloque.variant} title={bloque.title} body={bloque.body} />;
    case 'code_snippet':
      return <BloqueCodigo code={bloque.code} language={bloque.language} preview={bloque.preview} />;
    case 'video_player':
      return (
        <video controls preload="none" src={bloque.url} className="corte-poly aspect-video w-full bg-black">
          Tu navegador no puede reproducir este video.
        </video>
      );
    default:
      return null;
  }
}

export default BloqueContenido;
