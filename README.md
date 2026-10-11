# escolacriar.pt

Site estático da Escola CRIAR, publicado no GitHub Pages.

- Cada página vive numa pasta com um `index.html` (`sobre-nos/index.html` → `/sobre-nos`).
- `assets/` tem CSS, JS, fontes e ícones; `media/` tem as fotos e PDFs.
- `404.html` é a página de erro (mantém links absolutos, porque o Pages a serve em qualquer URL); `CNAME` liga o domínio ao Pages.

## Testar localmente

Os links são relativos, por isso basta abrir `index.html` no browser (duplo clique ou arrastar para o Chrome). Não é preciso servidor local.

## Publicar

`git push` para `main`. O Pages actualiza em cerca de um minuto.
