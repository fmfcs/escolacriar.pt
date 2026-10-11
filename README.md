# escolacriar.pt

Site estático da Escola CRIAR, publicado no GitHub Pages.

- Cada página vive numa pasta com um `index.html` (`sobre-nos/index.html` → `/sobre-nos`).
- `assets/` tem CSS, JS, fontes e ícones; `media/` tem as fotos e PDFs.
- `404.html` é a página de erro; `CNAME` liga o domínio ao Pages.

## Testar localmente

```sh
python3 -m http.server 8000
```

e abrir http://localhost:8000.

## Publicar

`git push` para `main`. O Pages actualiza em cerca de um minuto.
