# escolacriar.pt

Site da Escola CRIAR. HTML estático, publicado no GitHub Pages.

- `public/` — o site. Só esta pasta é publicada.
- `raw_img/` — fotos e PDFs originais em resolução completa, por página.
- `CLAUDE.md` — descrição da estrutura e das convenções, para quem edita (com ou sem Claude Code).

## Testar localmente

Os links são relativos: basta abrir `public/index.html` no browser. Não é preciso servidor.

## Publicar

`git push` para `main`. O workflow em `.github/workflows/pages.yml` publica `public/` em cerca de um minuto.
