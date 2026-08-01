# Registro de cambios

Reorganización completa del proyecto, agrupada por fase. Todo el trabajo es
local: **no se ejecutó ningún comando de git**.

Fecha: 2026-07-30

---

## Fase 1 — Auditoría

- Inventario completo en [`auditoria.md`](auditoria.md): 1 HTML, 3 CSS, 1 JS, 19 imágenes, 3 dependencias externas.
- No se movió ni se borró nada antes de terminar la auditoría.

## Fase 2 — Estructura

Se sustituyó `CSS/`, `JS/` e `IMG/` por `assets/`:

| Antes | Después |
|---|---|
| `CSS/normalize.css` | eliminado, sustituido por un reset propio en `assets/css/base.css` |
| `CSS/styles.css` | repartido en `base.css`, `layout.css` y `components.css` |
| `CSS/fonts.css` | eliminado; las fuentes se cargan con `<link>` desde el `<head>` |
| `JS/script.js` | `assets/js/main.js` |
| `IMG/heroImage.jpg` | `assets/img/content/hero-team-workshop.jpg` |
| `IMG/smarthome.jpg` | `assets/img/content/smart-home-dashboard.webp` |
| `IMG/booking.png` | `assets/img/content/booking-system.webp` |
| `IMG/onboard.png` | `assets/img/content/onboarding-app.webp` |
| `IMG/juice-product.png` | `assets/img/content/juice-product-homepage.webp` |
| `IMG/person1.png` … `person3.png` | `assets/img/content/team-member-1.webp` … `-3.webp` |
| `IMG/icon.png` | `assets/img/logo/favicon-32.png` + `apple-touch-icon.png` |
| `IMG/pencil.svg`, `code.svg`, `settings.svg` | `assets/img/icons/` (mismo nombre) |
| `IMG/instagram.svg`, `twitter.svg` | `assets/img/icons/` (mismo nombre) |

Todos los nombres pasan a minúsculas con guiones. Se actualizaron todas las
rutas en HTML, CSS y JS, y se verificó que ninguna quedara rota.

## Fase 3 — Higiene

- **Eliminado** `IMG/icon.png` (1,2 MB, 1024×1024): era el favicon. Se regeneró a 32×32 (1,3 KB) y 180×180.
- **Eliminado** `IMG/person4.png`: solo se usaba en el testimonio, que se ha suprimido.
- **Eliminado** `IMG/linkedin.svg`: su enlace apuntaba a `twitter.com`, no a LinkedIn.
- **Eliminados** `IMG/burger.svg`, `burger-open.svg` y `arrow.svg`: ahora son SVG inline, lo que permite controlar su color desde CSS y ahorra 3 peticiones.
- **Eliminado** `CSS/normalize.css`: reset de terceros minificado, sustituido por un reset propio de 30 líneas.
- **Eliminado** `CSS/fonts.css`: 10 de sus 14 líneas eran `@import` comentados de fuentes sin usar (Montserrat, Playfair Display SC).
- **Eliminados** los estilos `::-webkit-scrollbar`: usaban un naranja (`#F2994A`) que no aparecía en ninguna otra parte del sitio y reducían la barra a 5 px, difícil de agarrar.
- Creado `.gitignore` para un sitio estático sin build.
- No había credenciales, tokens ni API keys en el código. No hay nada que retirar.

## Fase 4 — Imágenes

- 7 imágenes de contenido convertidas a WebP (calidad 82).
- **Peso total de imágenes: 2,48 MB → 158 KB.**

| Imagen | Antes | Después |
|---|---|---|
| `icon.png` → favicons | 1211,7 KB | 27,4 KB (dos tamaños) |
| `onboard.png` | 226,9 KB | 29,3 KB |
| `booking.png` | 197,5 KB | 25,0 KB |
| `smarthome.jpg` | 187,0 KB | 25,6 KB |
| `juice-product.png` | 176,7 KB | 16,5 KB |
| `person3.png` | 161,7 KB | 12,4 KB |
| `person1.png` | 116,5 KB | 8,3 KB |
| `person2.png` | 116,2 KB | 6,8 KB |

- Ninguna imagen necesitaba redimensionarse: todas estaban ya por debajo del ancho de su contenedor.
- `width` y `height` añadidos a las 13 `<img>` para reservar el espacio y evitar saltos de layout.
- `loading="lazy"` en todo lo que está bajo el pliegue; el hero se carga de forma normal.
- `alt` reescrito en todas: descriptivo y real donde aporta información, `alt=""` en los iconos decorativos, que van siempre acompañados de un texto visible.
- Corregidos los `viewBox` de `instagram.svg` y `twitter.svg`: el trazado estaba desplazado 1 px respecto al lienzo y un `clipPath` heredado del export recortaba ese borde.

## Fase 5 — HTML, SEO y accesibilidad

- HTML reescrito desde una sola línea minificada a marcado indentado a 2 espacios.
- `lang="es"` → `lang="en"`: el contenido siempre estuvo en inglés.
- Estructura semántica real: `header` > `nav`, `main` con cinco `section`, `article` para cada tarjeta y trabajo, `footer`. Antes eran todos hermanos de `<body>`.
- Un solo `h1`, ahora el titular del hero y no el logotipo. Jerarquía `h1` → `h2` → `h3` sin saltos; los antiguos `h4`/`h5` decorativos pasan a `<p class="eyebrow">`.
- `<head>` completo: `title` de 56 caracteres, `description` de 159, canonical, Open Graph (`og:title`, `og:description`, `og:url`, `og:type`, `og:image`) y favicon.
- `og:image` apunta a la única imagen real y apropiada que existe, la del hero.
- Eliminado el `<meta name="viewport">` duplicado y el `</form>` de cierre duplicado del footer.
- Añadido un enlace "Skip to content".
- `aria-label` y `aria-expanded` en el botón de menú, `aria-label` en los enlaces sociales, que solo contienen un icono.
- Creados `404.html` (con enlace de vuelta al inicio y `noindex`), `robots.txt` y `sitemap.xml`.
- Corregidas las erratas `Front End applicati on` → `Front end application` y `Onboard application` → `Onboarding application`.

## Fase 6 — CSS y sistema de diseño

- 32 variables en `:root`, derivadas de los colores que el sitio ya usaba.
- **Dos colores nuevos por contraste.** El azul `#2D9CDB` da 2,79:1 sobre blanco y el rojo `#EB5757` da 3,48:1: los dos están por debajo del mínimo de 4,5:1 para texto. Se añaden `--color-accent-strong: #1a6e9e` (5,56:1) y `--color-red-strong: #c0392b` (5,44:1) como los únicos valores admitidos sobre texto. Los originales se conservan para rellenos e iconos decorativos, donde no aplica ese umbral.
- Escala de espaciado de 8 pasos (4/8/16/24/32/48/64/96). Desaparecen `7.5px`, `13.5px`, `22.5px`, `42.5px`.
- Escala tipográfica de 7 pasos. Se mantienen las dos familias originales, Heebo para el logotipo y Poppins para el resto.
- **Corregidas tres reglas con ámbito global involuntario.** `.main-first > div h2,p,a`, `.principal-section > div h5, h2, p` y `.secondary-child-adjust-text h4, h5` estilaban `p`, `a`, `h2` y `h5` en todo el documento por culpa de la coma.
- Eliminado `a { all: unset }`, que suprimía el foco visible de todos los enlaces. Ahora hay un `:focus-visible` explícito.
- Eliminada la declaración inválida `font-size: px`.
- **Eliminados los márgenes negativos mágicos** (`-170px`, `-160px`, `-105px`, `-90px`) que sostenían el grid del portfolio y el footer. Ahora son CSS Grid; el escalonado del portfolio es un desplazamiento de un paso de la escala.
- Selectores de 5 niveles (`footer>div>div>div>div>a`) sustituidos por clases. Ninguno pasa de 2 niveles.
- Reglas duplicadas `.contain-img1/2/3` unificadas en una clase con tres modificadores de color.
- Orden fijo en cada archivo: variables → reset → base → layout → componentes → media queries.
- Cero `!important` y cero estilos inline en todo el proyecto.

## Fase 7 — Responsive

- Invertido a mobile-first: las 12 media queries `max-width` con breakpoints arbitrarios (1200/1100/1005/979/910/835/800/700/640/600/490/420) pasan a 4 `min-width`: 480 / 768 / 1024 / 1440.
- Verificado sin scroll horizontal en 360, 480, 768, 1024 y 1440 px, midiendo `scrollWidth` contra `innerWidth` y buscando además cualquier elemento que sobresalga del viewport. Cero en los cinco anchos.
- Todas las áreas táctiles a 44×44 px como mínimo: logotipo, botón de menú, enlaces de navegación, enlaces del footer y enlaces sociales.
- **Corregido un fallo real del menú móvil:** el overlay tapaba su propio botón de cierre. La X quedaba invisible y solo se podía cerrar con Escape o pulsando un enlace. El header pasa a `z-index: 15`, por encima del overlay.

## Fase 8 — UX / UI

- **Los dos formularios de email se han eliminado.** No estaban conectados a ningún servicio: con `action="#" method="get"` descartaban el email y recargaban la página. Se sustituyen por un CTA real.
- Un CTA principal, "See our work", que apunta a `#work`, una sección que existe.
- **Los tres botones "Get started" se han eliminado:** los tres apuntaban a `#`.
- **El enlace "See more" del portfolio se ha eliminado:** apuntaba a `#` y no hay más trabajos que mostrar.
- Los 15 enlaces `href="#"` del menú, del overlay y del footer se han reducido a 3 anclas reales: `#services`, `#work` y `#team`. "Home", "Clients" y "Contacts" desaparecen del menú: no existían esas secciones.
- Estados completos en todo elemento interactivo: default, hover, focus y active, con transiciones de 180 ms.
- Ancho de línea limitado a 68 caracteres en los párrafos.
- La imagen del hero ya no es un botón: antes había que hacer clic sobre ella para revelar un pie de foto oculto. Ahora el pie está siempre visible.

## Fase 9 — JavaScript

- **jQuery eliminado.** Se cargaba desde CDN en versión beta (3.0.0-beta1, de 2016) solo para hacer seis `toggleClass`. El sitio ya no tiene dependencias de terceros en JavaScript.
- `script.js` estaba minificado en una línea y se cargaba en el `<head>` sin `defer`, antes de que existiera el DOM. Ahora es `main.js`, legible, comentado y con `defer`.
- Se conserva como script clásico dentro de una IIFE en lugar de módulos ES: los módulos ES fallan por CORS al abrir `index.html` directamente desde el disco, y se pidió que ese caso funcione.
- Sin variables globales y sin `var` en el ámbito exterior.
- Listener delegado: uno solo cubre los enlaces del overlay y el logotipo.
- Se comprueba que los elementos existen antes de operar sobre ellos.
- El menú ahora gestiona `aria-expanded`, cambia su `aria-label` entre "Open menu" y "Close menu", bloquea el scroll de fondo, cierra con Escape devolviendo el foco al botón, cierra al pulsar un enlace y libera el bloqueo de scroll al pasar a ancho de escritorio.
- Cero errores y cero avisos en consola, en `http://` y en `file://`.

## Fase 10 — Rendimiento

- Los `@import` encadenados de Google Fonts pasan a `<link>` en el `<head>`, con `preconnect` a `fonts.googleapis.com` y `fonts.gstatic.com` y `display=swap`. Las dos familias van en una sola petición.
- 4 archivos CSS (uno de terceros minificado) → 3 propios y legibles.
- Peticiones de la primera carga: 11.

| Métrica | Antes | Después |
|---|---|---|
| Primera carga (bloqueante + sobre el pliegue) | ~1,3 MB | **39,4 KB** |
| Página completa, todos los bytes | ~2,6 MB | **168,0 KB** |
| Dependencias JS de terceros | 1 (jQuery beta) | 0 |

## Fase 11 — QA

Verificado en navegador, sobre servidor local y abriendo el archivo directamente:

- Los 6 enlaces internos del menú y del footer llevan a secciones que existen.
- Las 13 rutas de imagen corresponden a archivos reales, y las 13 decodifican.
- Los 4 `<link>` y el `<script>` apuntan a archivos que existen.
- Cero mensajes en consola en `index.html` y en `404.html`.
- Sin scroll horizontal en 360, 480, 768, 1024 y 1440 px.
- Menú móvil verificado en las dos direcciones: abrir, cerrar con la X, cerrar con Escape, cerrar al pulsar un enlace, bloqueo de scroll y liberación al cruzar a escritorio.
- Contraste: **0 fallos** sobre todos los nodos de texto de la página, comprobando cada color contra el fondo real que hereda.
- Áreas táctiles: 0 elementos por debajo de 44×44 px, salvo los enlaces en línea dentro de párrafos, que están exentos.
- Ni un "Lorem ipsum", "TODO" ni texto de template en el sitio.
- `404.html` existe y tiene enlace de vuelta al inicio.
- Sin credenciales en el código.

## Fase 12 — Documentación

- `README.md` actualizado: la reorganización cambió todas las rutas y el comando de arranque.
- Creados `docs/auditoria.md` y este registro.

## Fase 13 — Deploy

- Verificado abriendo `index.html` directamente desde el disco y con un servidor local.
- Sin rutas absolutas de la máquina de desarrollo.
- Todas las rutas internas son relativas y en minúsculas.
- No se creó configuración de hosting: no se indicó destino. El sitio es estático y no necesita ninguna para funcionar en Vercel.
