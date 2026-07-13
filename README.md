# Portfólio Igor Branco

**Site portfólio pessoal de desenvolvedor full stack, com estética de terminal, projetos reais e formulário de contato integrado.**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

**[Site ao vivo](https://portifolioigordesouza.netlify.app/)** | **[Repositorio](https://github.com/igordesouzabranco/portfolio-igor-branco)**

---

## Sobre o projeto

Portfolio profissional desenvolvido com HTML, CSS e JavaScript puro, sem frameworks ou build tools. O site funciona como vitrine para recrutadores e parceiros, apresentando skills tecnicas, experiencia profissional, certificados em andamento e projetos com link direto para o GitHub. A identidade visual segue o tema de um terminal de desenvolvedor.

## Funcionalidades

- **Navegacao com scroll tracking** — menu fixo que destaca automaticamente a secao visivel durante o scroll
- **Menu responsivo** — hamburger menu com animacao em dispositivos moveis
- **Hero com terminal interativo** — efeito de digitacao que simula comandos reais (node, npm, python, git)
- **Barra de skills com animacao** — barras de progresso que se preenchem ao entrar no viewport
- **Timeline de experiencias** — exibe trajetoria profissional e formacao academica
- **Secao de certificados** — cursos em andamento com tags de tecnologias abordadas
- **Cards de projetos com modal** — CalcIMC, ValCPF e DjangoCad com detalhes e link para o GitHub
- **Pixel art com speech bubbles** — animacao interativa no hover com comandos de terminal aleatorios
- **Formulario de contato** — integrado ao Netlify Forms, envio via fetch() com notificacoes visuais
- **Botao voltar ao topo** — aparece automaticamente apos rolar a pagina
- **Toggle de animacoes** — botao no footer para desligar/ligar animacoes (persiste via localStorage)
- **Pagina 404 customizada** — erro com tema de terminal e link de volta para o inicio
- **Easter eggs** — bubble secreto ativado por atalhos de teclado (Shift x3, digitar "67") com fireworks
- **Acessibilidade** — aria-labels, suporte a prefers-reduced-motion, HTML semantico

## Tecnologias utilizadas

| Tecnologia | Uso no projeto |
|---|---|
| HTML5 | Estrutura semantica, meta tags Open Graph, forms com Netlify |
| CSS3 | Custom Properties, Flexbox, Grid, animacoes CSS, media queries |
| JavaScript vanilla | DOM manipulation, scroll handlers, fetch API, localStorage |
| Font Awesome | Icones para nav, skills, projetos e contato |
| Google Fonts | Fira Code (unica fonte, preloaded) |
| Netlify | Hospedagem, Netlify Forms, deploy automatico via GitHub |

## Habilidades demonstradas

| Funcionalidade | Competencia tecnica |
|---|---|
| Validador de CPF/CNPJ (ValCPF) | Logica algoritmica, manipulacao de strings, algoritmo de digitos verificadores |
| Calculadora de IMC (CalcIMC) | Matematica aplicada, validacao de entrada, manipulacao de DOM |
| Sistema de cadastro Django (DjangoCad) | CRUD completo, autenticacao, modelagem de banco de dados, Python/Django |
| Navegacao com scroll tracking | Event listeners, requestAnimationFrame, deteccao de viewport |
| Terminal com efeito de digitacao | Manipulacao de strings, setTimeout/setInterval, logica de state |
| Formulario com Netlify Forms | Fetch API, FormData, tratamento de erros, integracao com backend |
| Animacoes e transicoes CSS | Keyframes, CSS transitions, custom properties, performance com will-change |
| Toggle de animacoes com localStorage | Persistencia de estado no cliente, manipulacao de classes |
| Menu responsivo | Media queries, toggle de classes, acessibilidade (aria-expanded) |
| Modal de projetos | Criacao dinamica de conteudo, event delegation, teclado (ESC) |
| Easter eggs e interacoes | Eventos de teclado, geracao aleatoria de conteudo, animacoes programaticas |

## Screenshots

<!-- Insera um screenshot ou GIF do site aqui. Sugestoes: -->
<!-- - Captura da hero section com o terminal -->
<!-- - Captura da secao de projetos com os cards -->
<!-- - GIF curto mostrando a navegacao e animacoes -->
<!-- Caminho sugerido: assets/img/screenshot-hero.png -->

![Portfólio Igor Branco](assets/img/igorpixel.png)

## Como rodar localmente

```bash
# Clone o repositorio
git clone https://github.com/igordesouzabranco/portfolio-igor-branco.git

# Entre na pasta do projeto
cd portfolio-igor-branco/portifolio

# Abra o index.html no navegador
# No Windows:
start index.html

# No macOS:
open index.html

# No Linux:
xdg-open index.html
```

Nao e necessario instalar dependencias, rodar build commands ou configurar nada. O projeto funciona com HTML, CSS e JavaScript puros.

## Contato

- **Email:** igordesouzabranco@gmail.com
- **GitHub:** [igordesouzabranco](https://github.com/igordesouzabranco)
- **LinkedIn:** [Igor de Souza Branco](https://linkedin.com/in/igor-de-souza-branco-b68630314)

## Licenca

Este projeto esta licenciado sob a [MIT License](LICENSE).
