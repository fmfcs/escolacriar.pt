# escolacriar.pt

Site da Escola CRIAR, em Cascais. HTML, CSS e JavaScript estáticos, em português e inglês, publicados no GitHub Pages em https://escolacriar.pt.

- `public/` — o site. Só esta pasta é publicada. `public/pt/` e `public/en/` têm as páginas de cada língua.
- `raw_img/` — fotos e PDFs originais em resolução completa, por página. Não são servidos.
- `CLAUDE.md` — estrutura, convenções e decisões, para quem edita o site (com ou sem Claude Code). Ler antes de alterar seja o que for.
- `.github/workflows/pages.yml` — publica `public/` a cada push para `main`.

## Testar localmente

Os links são relativos: basta abrir `public/pt/index.html` ou `public/en/index.html` no browser. Não é preciso servidor nem build.

## Publicar

`git commit` + `git push` para `main`. O workflow publica em cerca de um minuto; o estado está em https://github.com/fmfcs/escolacriar.pt/actions.

## Trabalho pendente

Está nas issues, com as labels `SEO`, `bug`, `enhancement` e `accessibility`: https://github.com/fmfcs/escolacriar.pt/issues
