# CLAUDE.md

Website da **Escola CRIAR** (escolacriar.pt) — escola em Cascais para crianças dos 2 aos 12 anos. Todo o conteúdo está em português.

Site estático em HTML, CSS e JavaScript, publicado no GitHub Pages. Não há passo de build, nem dependências, nem CMS.

## Estrutura

- `public/` — o site. **Só esta pasta é publicada.** É aqui que se edita.
- `raw_img/` — fotos, ilustrações e PDFs originais, em resolução completa, organizados por página (`raw_img/sobre-nos/`, etc.). `raw_img/_drafts/` tem material de páginas que nunca foram publicadas. Não são servidos; servem de fonte quando é preciso gerar uma imagem nova para `public/media/`.
- `.github/workflows/pages.yml` — publica `public/` no Pages a cada push para `main`.

## Site (`public/`)

- Uma pasta por página com `index.html`: `index.html` (home), `sobre-nos/`, `projecto-pedagogico/`, `como-funciona/`, `pre-escolar/`, `primeiro-ciclo/`, `segundo-ciclo/`, `contactos/`, `politica-de-privacidade/` (não está no menu). Os URLs públicos são `/sobre-nos`, etc.
- **Todos os links e caminhos são relativos** (`../assets/css/main.css`, `../contactos/index.html#contacto`), para o site abrir directamente via `file://` sem servidor. Ao criar páginas ou links novos, manter a convenção: uma página dentro de uma pasta usa o prefixo `../`; a home usa caminhos sem prefixo; o CSS em `assets/css/` usa `../../assets/...`. Links para páginas incluem sempre `index.html`.
- `404.html` — página de erro usada pelo Pages. É a única excepção: mantém caminhos absolutos (`/assets/...`), porque o Pages a serve em qualquer URL.
- `assets/css/` — `normalize.css`, `variables.css` (design tokens: cores, fontes, espaçamentos), `utilities.css`, `main.css`. `assets/js/main.js` — único ficheiro de JavaScript (menu, Swiper, FAQ). Fontes locais em `assets/fonts/` (DM Sans, DM Mono, Lil Grotesk), ícones SVG em `assets/icons/`.
- `media/pages/<pagina>/<hash>/` — fotos e PDFs servidos (regulamento, calendário, preçário). Os nomes das pastas com hash vêm do CMS original; podem ser mantidos. Imagens novas podem ir para `media/pages/<pagina>/` sem hash.
- `CNAME` liga o domínio ao Pages. `.nojekyll` evita o processamento Jekyll.
- Swiper 11 vem do CDN jsdelivr. O Meta Pixel (Facebook) está no `<head>` de todas as páginas. O mapa da página de contactos é um iframe do Google Maps.

### Cabeçalho e rodapé repetidos

Não há templates nem build, por decisão deliberada: o `<head>`, o `<header>` com o menu, o `<footer>` e os `<script>` do fim estão copiados em todas as páginas HTML (9 páginas + `404.html`). Os dados de contacto da escola (morada, telefones, email, redes sociais) estão no rodapé.

**Regra:** qualquer alteração a um desses blocos tem de ser aplicada em **todos** os ficheiros `index.html` e em `404.html`, ajustando o prefixo dos caminhos (`../` nas páginas em pastas, nenhum na home, `/` na 404). Entre páginas, esses blocos só diferem no `<title>`, na classe `active-page` do item de menu da página actual e nos prefixos.

Depois de alterar o cabeçalho ou o rodapé, confirmar que ficaram iguais em todas as páginas:

```sh
cd public
for b in header footer; do
  for f in */index.html; do
    diff -q <(sed -n "/<$b/,/<\/$b>/p" index.html | sed -E 's/ ?active-page//; s/ class=""//') \
            <(sed -n "/<$b/,/<\/$b>/p" "$f" | sed -E 's#\.\./##g; s/ ?active-page//; s/ class=""//') >/dev/null \
      || echo "$b diferente em $f"
  done
done
```

Sem output significa que está tudo sincronizado.

### Testar e publicar

Testar é abrir `public/index.html` no browser; não há servidor nem build. Publicar é `git commit` + `git push` para `main`; o workflow faz o deploy em cerca de um minuto. O estado dos deploys está em https://github.com/fmfcs/escolacriar.pt/actions.

## Avisos

- Não existe formulário de contacto. O Pages não executa código de servidor: se um formulário for adicionado, tem de usar um serviço externo (Web3Forms, Formspree).
- HTTPS é forçado nas definições do Pages; o certificado é renovado automaticamente pelo GitHub.
- O DNS do domínio está na Dominios.pt/PTisp e o email no Google Workspace (registo MX). Qualquer alteração de DNS deve deixar o MX intacto.
