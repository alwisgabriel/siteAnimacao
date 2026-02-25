# DevClub Store

Landing page de e-commerce com carousel interativo. Interface dark, animações CSS, controles por teclado, touch e mouse.

---

## Stack

- HTML5 semântico
- CSS3 (variáveis, transitions, media queries)
- JavaScript vanilla (sem dependências)
- Google Fonts — Bebas Neue + DM Sans

---

## Estrutura

```
devclub-store/
├── index.html
├── style.css
└── script.js
```

---

## Funcionalidades

**Carousel**
- Autoplay com intervalo de 4s
- Progress bar animada indicando tempo restante
- Navegação por botões, dots, teclado (← →) e swipe (touch)
- Pausa automática ao hover
- Loop infinito

**Header**
- Fixo com glassmorphism (`backdrop-filter`)
- Efeito de scroll (aumenta opacidade ao rolar)
- Menu hambúrguer responsivo para mobile

**Visual**
- Cursor personalizado com trail suavizado (lerp)
- Animação de entrada escalonada por slide (tag → título → descrição → preço → CTA)
- Ken Burns sutil na imagem ao entrar no slide
- Strip de categorias no rodapé

---

## Responsividade

| Breakpoint | Comportamento |
|---|---|
| `> 1024px` | Layout completo, nav inline |
| `≤ 1024px` | Gap reduzido na nav |
| `≤ 768px` | Nav oculta, hambúrguer ativo |
| `≤ 400px` | Contador oculto, padding reduzido |

---

## Como usar

Clone ou baixe os três arquivos e abra `index.html` no navegador. Não requer servidor, build ou dependências externas.

```bash
git clone https://github.com/seu-usuario/devclub-store.git
cd devclub-store
open index.html
```

---

## Personalização

| O que mudar | Onde |
|---|---|
| Cores e tipografia | Variáveis CSS no topo de `style.css` |
| Intervalo do autoplay | Constante `INTERVAL_MS` em `script.js` |
| Slides (imagem, texto, preço) | Divs `.slide` em `index.html` |
| Itens do menu | `<nav>` e `#navDrawer` em `index.html` |

---

## Licença

MIT
