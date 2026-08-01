# Auditoría inicial — Edie

Estado del proyecto **antes** de la reorganización. Documento de trabajo interno.

Fecha de auditoría: 2026-07-30

---

## 1. Archivos HTML

| Archivo | `<title>` | `<h1>` | Propósito real | Observaciones |
|---|---|---|---|---|
| `index.html` | `Edie` | `Edie` | Landing page única de una agencia web ficticia | Todo el documento está minificado en 1 sola línea. El `<h1>` es el logotipo, no el titular. `lang="es"` pero el 100 % del contenido está en inglés. |

No existían `404.html`, `robots.txt` ni `sitemap.xml`.

## 2. Archivos CSS

| Archivo | Líneas | ¿Se carga? | Contenido real | Problemas |
|---|---|---|---|---|
| `CSS/normalize.css` | 14 (minificado) | Sí | Normalize.css v8 + estilos de scrollbar `::-webkit-scrollbar` añadidos al final | Mezcla un reset de terceros con estilos propios. La barra de scroll usa `#F2994A`, un naranja que no aparece en ninguna otra parte del sitio. |
| `CSS/styles.css` | 115 | Sí | Todo el layout, componentes, estados y media queries | Sin variables. Sin orden. 12 media queries `max-width` con breakpoints arbitrarios (1200/1100/1005/979/910/835/800/700/640/600/490/420). |
| `CSS/fonts.css` | 14 | Sí | 2 `@import` activos (Heebo, Poppins) + 2 comentados (Montserrat, Playfair Display SC) | 10 de 14 líneas son código muerto comentado. `@import` bloquea el render y encadena peticiones. |

## 3. Archivos JS

| Archivo | ¿Se carga? | Contenido | Problemas |
|---|---|---|---|
| `JS/script.js` | Sí, en `<head>` sin `defer` | 6 bloques `$(function(){...})` que solo alternan clases | Minificado en 1 línea. Depende de jQuery para lo que hace `classList.toggle`. Se ejecuta antes de que exista el DOM al no llevar `defer`. |

## 4. Imágenes

| Archivo | Peso | Dimensiones | Formato | ¿Referenciada? | Veredicto |
|---|---|---|---|---|---|
| `IMG/icon.png` | **1211,7 KB** | 1024×1024 | PNG | Sí, como favicon | **Lo más grave del proyecto.** 1,2 MB para renderizar 16×16 px. |
| `IMG/onboard.png` | 226,9 KB | 545×545 | PNG | Sí | Convertir a WebP |
| `IMG/booking.png` | 197,5 KB | 534×551 | PNG | Sí | Convertir a WebP |
| `IMG/smarthome.jpg` | 187,0 KB | 534×534 | JPG | Sí | Convertir a WebP |
| `IMG/juice-product.png` | 176,7 KB | 545×546 | PNG | Sí | Convertir a WebP |
| `IMG/person3.png` | 161,7 KB | 320×320 | PNG | Sí | Convertir a WebP |
| `IMG/person1.png` | 116,5 KB | 260×260 | PNG | Sí | Convertir a WebP |
| `IMG/person2.png` | 116,2 KB | 292×300 | PNG | Sí | Convertir a WebP |
| `IMG/person4.png` | 87,1 KB | 246×246 | PNG | Sí, en el testimonio | El testimonio se elimina (contenido inventado) → la imagen queda huérfana |
| `IMG/heroImage.jpg` | 9,0 KB | 1332×354 | JPG | Sí | Correcta. Solo renombrar. |
| `IMG/instagram.svg` | 2,0 KB | — | SVG | Sí | OK |
| `IMG/twitter.svg` | 2,0 KB | — | SVG | Sí | El `path` arranca en `-1` con un `viewBox` de `0 0 24 24`: el icono está recortado 1 px. |
| `IMG/linkedin.svg` | 1,5 KB | — | SVG | Sí | El enlace que lo envuelve apunta a `twitter.com/npablo_`, no a LinkedIn |
| `IMG/settings.svg` | 0,3 KB | — | SVG | Sí | OK |
| `IMG/burger.svg` | 0,2 KB | — | SVG | Sí | OK |
| `IMG/pencil.svg` | 0,2 KB | — | SVG | Sí | OK |
| `IMG/burger-open.svg` | 0,2 KB | — | SVG | Sí | OK |
| `IMG/code.svg` | 0,2 KB | — | SVG | Sí | OK |
| `IMG/arrow.svg` | 0,2 KB | — | SVG | Sí, en "See more" | El enlace "See more" no lleva a ningún sitio → el icono queda huérfano |

**Peso total de imágenes: 2,48 MB.** Ninguna imagen estaba rota: las 19 existen en disco.

## 5. Dependencias externas

| Dependencia | Origen | Uso real |
|---|---|---|
| jQuery slim 3.0.0-beta1 | `cdnjs.cloudflare.com` | Solo `.click()`, `.hover()` y `.toggleClass()` |
| Heebo | Google Fonts vía `@import` | Solo el `h1` del logotipo |
| Poppins | Google Fonts vía `@import` | Todo el resto del sitio |

Una versión **beta** de jQuery (3.0.0-beta1, publicada en 2016) cargada desde CDN para hacer 6 `toggleClass`.

## 6. Archivos basura

Ninguno. No hay `.bak`, `node_modules`, `.DS_Store`, `Thumbs.db` ni duplicados versionados. El repositorio estaba limpio en ese aspecto.

## 7. Enlaces y referencias rotas

| Tipo | Detalle |
|---|---|
| Enlaces muertos | 15 `href="#"`: 5 en el menú de escritorio, 5 en el overlay móvil, 5 en el footer |
| Botones sin destino | 3 × "Get started" envueltos en `<a href="#">` |
| Enlace sin destino | "See more" del portfolio → `href="#"` |
| Enlace mal dirigido | El icono de LinkedIn apunta a `https://twitter.com/npablo_` |
| Formularios falsos | 2 formularios con `action="#" method="get"`: recargan la página y descartan el email |
| CSS/JS referenciados | Los 4 existen. Ninguna ruta rota. |
| Imágenes referenciadas | Las 19 existen. Ninguna imagen rota. |

## 8. Problemas de CSS

| Problema | Ubicación | Impacto |
|---|---|---|
| **Selectores globales por accidente** | `.main-first > div h2,p,a` / `.principal-section > div h5, h2, p` / `.secondary-child-adjust-text h4, h5` | La coma rompe el ámbito: `p`, `a`, `h2` y `h5` se estilan **globalmente** en todo el documento, no dentro del contenedor. Tres reglas con este fallo. |
| `a { all: unset }` | línea 1 | Elimina el foco visible de todos los enlaces. Barrera de accesibilidad. |
| Valor inválido | `.inputs-footer input[type="email"] { font-size: px }` | Declaración descartada por el navegador |
| Maquetación con márgenes negativos mágicos | `.first-article{margin-top:-170px}`, `.img-column-1{margin-top:280px}`, `.second-article{margin-top:-160px}`, `footer > div > div:nth-child(2){margin-top:-90px}`, `:nth-child(3){margin-top:-105px}` | El grid escalonado del portfolio y todo el footer se sostienen con desplazamientos negativos calculados a ojo. Se rompen en cuanto cambia el contenido. |
| Reglas duplicadas | `.contain-img1/2/3` idénticas salvo el color; `.contain-img1 img`, `2 img`, `3 img` idénticas | 6 reglas donde bastan 2 |
| Selectores de 5+ niveles | `footer>div>div>div>div>a:nth-child(1)` (y 5 variantes más) | Frágiles e ilegibles |
| Espaciado sin escala | `7.5px`, `13.5px`, `2.5px`, `42.5px`, `22.5px`, `1.5px` | Sin sistema |
| Media queries `max-width` | 12 breakpoints distintos | Desktop-first, contrario a mobile-first |

## 9. HTML duplicado

- El bloque de 5 enlaces de navegación aparece **3 veces** (cabecera, overlay móvil, footer). En el footer, "Contacts" pasa a ser "Contact".
- El bloque de formulario de email aparece **2 veces** (cuerpo y footer) con marcado casi idéntico.
- `<meta name="viewport">` está declarado **dos veces**.
- `</form>` de cierre **duplicado** en el footer.
- `<figcaption></figcaption>` vacío en la tarjeta de "Smart home dashboard".

## 10. Contenido de relleno heredado del template

| Ubicación | Contenido |
|---|---|
| Tarjeta "UI/UX Design" | Párrafo Lorem ipsum completo |
| Tarjeta "Front End" | Párrafo Lorem ipsum completo |
| Tarjeta "Back End" | Párrafo Lorem ipsum completo |
| Sección "Meet the team" | `Lorem ipsum dolor sit amet, consectetur adipiscing elit.` |
| Sección de testimonio | Cita atribuida a **"Carlos Tran — The Decorate Gatsby"**: cliente inventado, empresa inventada, opinión inventada |

**Erratas:** `Front End applicati on` (con espacio dentro de la palabra) y `outstanding resutls` en el testimonio.

## 11. SEO y accesibilidad

| Elemento | Estado inicial |
|---|---|
| `<title>` | `Edie` — 4 caracteres |
| `<meta name="description">` | No existe |
| Open Graph | No existe |
| `<link rel="canonical">` | No existe |
| `lang` | `es` con contenido íntegramente en inglés |
| Jerarquía de encabezados | `h1` en el logo; `h4` antes que `h2`; `h5` antes que `h2` en dos secciones |
| Semántica | `header`, `main`, `article`, `section`, `footer` son **hermanos** de `<body>`; `<main>` solo envuelve las tarjetas de servicios |
| `<nav>` | No existe ninguno |
| `alt` | `alt=""` en los burger (correcto), pero `alt="icons"` ×3, `alt="website"` ×4, `alt="Man"` ×3, `alt="Woman"`, `alt="Social Media"` ×3, `alt="arrow"` |
| Foco visible | Eliminado globalmente por `a { all: unset }` |
| Navegación por teclado | El menú móvil se abre con `click` sobre un `<div>`: inalcanzable con teclado, sin `aria-expanded`, sin cierre con `Escape` |
| Áreas táctiles | El burger mide 35×35 px (mínimo recomendado: 44×44) |

## 12. Credenciales

Ninguna. No hay tokens, API keys ni credenciales en el código.

---

## Resumen en 5 líneas

1. Es la landing de una agencia web ficticia llamada **Edie**: una sola página con hero, tres servicios, cuatro trabajos, equipo, testimonio y footer.
2. Funciona y se ve bien en escritorio, pero está entregado en bruto: HTML y JS minificados en una línea, CSS sin variables ni sistema, y maquetación sostenida con márgenes negativos calculados a ojo.
3. **Lo más grave: `icon.png` pesa 1,2 MB** — un favicon de 1024×1024 que se descarga entero para pintarse a 16 px, casi la mitad del peso total del sitio.
4. Lo segundo más grave es de credibilidad, no técnico: **un testimonio íntegramente inventado** ("Carlos Tran — The Decorate Gatsby") y **cuatro bloques de Lorem ipsum** en secciones visibles.
5. Nada del sitio es accionable: 15 enlaces `href="#"`, tres botones que no llevan a ningún sitio y dos formularios que descartan el email y recargan la página.
