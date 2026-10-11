# CLAUDE.md

Website da **Escola CRIAR** (escolacriar.pt) — escola em Cascais para crianças dos 2 aos 12 anos. O site está em português (`pt/`) e em inglês (`en/`).

Site estático em HTML, CSS e JavaScript, publicado no GitHub Pages. Não há passo de build, nem dependências, nem CMS.

## Estrutura

- `public/` — o site. **Só esta pasta é publicada.** É aqui que se edita.
- `raw_img/` — fotos, ilustrações e PDFs originais, em resolução completa, organizados por página (`raw_img/sobre-nos/`, etc.). `raw_img/_drafts/` tem material de páginas que nunca foram publicadas. Não são servidos; servem de fonte quando é preciso gerar uma imagem nova para `public/media/`.
- `.github/workflows/pages.yml` — publica `public/` no Pages a cada push para `main`.

## Site (`public/`)

- `pt/` e `en/` — uma pasta por língua, com a mesma estrutura: `index.html` (home), `sobre-nos/`, `projecto-pedagogico/`, `como-funciona/`, `pre-escolar/`, `primeiro-ciclo/`, `segundo-ciclo/`, `contactos/` e `politica-de-privacidade/` (não está no menu; tem link no rodapé, junto ao ©). Os URLs públicos são `/pt/sobre-nos/`, `/en/sobre-nos/`, etc.
- `index.html` na raiz só redirecciona para `pt/index.html`. Os URLs antigos, de antes da separação por línguas (`/sobre-nos`, …), já não existem e dão a página 404.
- **Todos os links e caminhos são relativos** (`../../assets/css/main.css`, `../contactos/index.html#contacto`), para o site abrir directamente via `file://` sem servidor. Ao criar páginas ou links novos, manter a convenção: nas páginas dentro de `pt/<pagina>/` ou `en/<pagina>/`, os assets e media usam `../../` e as outras páginas da mesma língua `../<pagina>/index.html`; na home de cada língua, os assets usam `../` e as páginas `<pagina>/index.html`; o CSS em `assets/css/` usa `../../assets/...`. Links para páginas incluem sempre `index.html`.
- **Imagens de fundo em `style`:** usar `background-image: url('...')` directamente, não variáveis CSS (`--bg_image`, `--bg-image`). Um `url()` dentro de uma variável é resolvido a partir de `assets/css/` (onde a variável é usada), não da página, e só funciona por coincidência nas páginas que estão a dois níveis (`pt/<pagina>/`). Foi por isso que a foto do topo da home não aparecia.
- `404.html` — página de erro usada pelo Pages. É a única excepção: mantém caminhos absolutos (`/assets/...`, `/pt/sobre-nos/`), porque o Pages a serve em qualquer URL.
- `assets/css/` — `normalize.css`, `variables.css` (design tokens: cores, fontes, espaçamentos), `utilities.css`, `main.css`. `assets/js/main.js` — único ficheiro de JavaScript (menu, cabeçalho fixo, Swiper, FAQ). Fontes locais em `assets/fonts/` (DM Sans, DM Mono, Lil Grotesk), todas em WOFF2 com `font-display: swap`; a Lil Grotesk Bold, dos títulos, tem `<link rel="preload" as="font">` em todas as páginas, ícones SVG em `assets/icons/`.
- `media/pages/<pagina>/<hash>/` — fotos e PDFs servidos (regulamento, calendário, preçário). Os nomes das pastas com hash vêm do CMS original; podem ser mantidos. Imagens novas podem ir para `media/pages/<pagina>/` sem hash.
- **Fotos servidas são WebP**, redimensionadas ao tamanho de apresentação: fundos de secção 1600 px de largura, fotos de conteúdo 1200 px, equipa 600 px. O original em resolução completa fica em `raw_img/`. Para adicionar uma foto, converter com ImageMagick (`magick original.jpg -resize 1200x\> -quality 80 -strip public/media/pages/<pagina>/nome.webp`) e pôr na `<img>` os atributos `width`, `height`, `loading="lazy"` e `decoding="async"`. As imagens de fundo (hero) ficam em `--bg_image` e têm um `<link rel="preload" as="image">` no `<head>` da página. As imagens Open Graph em `assets/img/og/` continuam em JPEG, porque o WhatsApp e o Facebook não aceitam WebP.
- **Imagens têm sempre `alt`:** fotos da equipa com `Nome, função` (na língua da página), fotos da escola com uma descrição curta da cena, e `alt=""` nas decorativas (formas SVG, ícone, pixel). Ao adicionar uma imagem, preencher o `alt` em PT e em EN.
- `CNAME` liga o domínio ao Pages. `.nojekyll` evita o processamento Jekyll.
- **Cabeçalho:** menu hambúrguer até 1099 px e menu horizontal a partir de 1100 px, porque abaixo disso os itens (sobretudo em EN) não cabem numa linha. O breakpoint está em dois sítios que têm de ficar iguais: os `@media` do cabeçalho em `main.css` (1099/1100) e `window.innerWidth <= 1099` em `main.js`. As grelhas de conteúdo continuam a mudar aos 768 px.
- Swiper 11 vem do CDN jsdelivr. O Meta Pixel (Facebook) está no `<head>` de todas as páginas. O mapa da página de contactos é um iframe do Google Maps.

### Cabeçalho e rodapé repetidos

Não há templates nem build, por decisão deliberada: o `<head>`, o `<header>` com o menu, o `<footer>` e os `<script>` do fim estão copiados em todas as páginas HTML (9 em `pt/`, 9 em `en/` e `404.html`). Os dados de contacto da escola (morada, telefones, email, redes sociais) estão no rodapé.

**Regra:** qualquer alteração a um desses blocos tem de ser aplicada em **todos** os ficheiros `index.html` de `pt/` e `en/` e em `404.html`, ajustando o prefixo dos caminhos (`../../` nas páginas, `../` na home de cada língua, `/` na 404). Entre páginas da mesma língua, esses blocos só diferem no `<title>`, na classe `active-page` do item de menu da página actual, nos prefixos e no link da bandeira (`lang-switch`), que aponta para a mesma página na outra língua.

Depois de alterar o cabeçalho ou o rodapé, confirmar que ficaram iguais em todas as páginas:

```sh
cd public
check() {
  home=$1; shift
  for b in header footer; do
    for f in "$@"; do
      diff -q <(sed -n "/<$b/,/<\/$b>/p" "$home" | grep -v lang-switch | sed -E 's#\.\./##g; s/ ?active-page//; s/ class=""//') \
              <(sed -n "/<$b/,/<\/$b>/p" "$f" | grep -v lang-switch | sed -E 's#\.\./##g; s/ ?active-page//; s/ class=""//') >/dev/null \
        || echo "$b diferente em $f"
    done
  done
}
check pt/index.html pt/*/index.html
check en/index.html en/*/index.html
```

Sem output significa que está tudo sincronizado.

### Duas línguas (`pt/` e `en/`)

- `en/` tem uma cópia traduzida de cada página de `pt/`, com os mesmos nomes de pasta. A `404.html` não tem versão inglesa.
- A bandeira no canto superior direito (`<a class="lang-switch">`, ícones `assets/icons/flag-gb.svg` e `flag-pt.svg`) liga cada página à sua equivalente na outra língua. A 404 liga à home inglesa.
- Cada par de páginas declara a outra no `<head>` com `<link rel="alternate" hreflang="...">` (`pt-PT`, `en`, `x-default` → `/pt/...`). Cada página tem `canonical` para o seu próprio URL; as inglesas têm `lang="en"` e `og:locale` `en_GB`.
- **Ao alterar texto numa página de `pt/`, alterar também a página correspondente em `en/`.**

### Testar e publicar

Testar é abrir `public/pt/index.html` (ou `public/en/index.html`) no browser; não há servidor nem build. Publicar é `git commit` + `git push` para `main`; o workflow faz o deploy em cerca de um minuto. O estado dos deploys está em https://github.com/fmfcs/escolacriar.pt/actions.

## Avisos

- Não existe formulário de contacto. O Pages não executa código de servidor: se um formulário for adicionado, tem de usar um serviço externo (Web3Forms, Formspree).
- O botão "Agende uma visita" / "Book a visit" do menu abre o WhatsApp (`https://wa.me/351918993464` com mensagem pré-preenchida em PT ou EN, consoante a língua da página). O número é o de Teresa Noéme, o mesmo do rodapé. Está repetido em todas as páginas e na `404.html`: para mudar o número, substituir em todos os ficheiros. No computador, `main.js` intercepta o clique e abre `whatsapp://send` (app instalada) com fallback para `web.whatsapp.com`, evitando a página intermédia do wa.me; no telemóvel o link wa.me abre a app directamente.
- HTTPS é forçado nas definições do Pages; o certificado é renovado automaticamente pelo GitHub.
- O DNS do domínio está na Dominios.pt/PTisp e o email no Google Workspace (registo MX). Qualquer alteração de DNS deve deixar o MX intacto.
