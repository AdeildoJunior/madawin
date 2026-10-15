# Kits temporariamente ocultos

Em **2026-10-14** a categoria **Kits** foi retirada da exibição pública do site
porque não há nenhum kit em estoque. **Nada foi apagado**: os 6 kits continuam
cadastrados em `assets/js/store-data.js` e podem voltar ao ar a qualquer momento.

Todas as alterações estão marcadas no código com o comentário `KITS-OFF`
(`grep -rn "KITS-OFF" --include="*.html" --include="*.js" --include="*.css" .`).

## O que foi feito

| Onde | O que |
|---|---|
| `assets/js/store-data.js` | `"hidden": true` na categoria `kits` — **a chave de liga/desliga** |
| `assets/js/store-catalog.js` | camada de visibilidade: categoria oculta sai do menu, da home, dos filtros, da busca, do carrossel e da vitrine |
| `index.html` + 8 páginas de categoria | link `Kits` do menu comentado (evita piscar antes do JS) |
| `index.html` | banner "Kits e presentes" do hero comentado; textos que anunciavam kits ajustados (ticker, slide 1, busca, contato, mensagens de WhatsApp) |
| `kits/index.html` | `noindex`, busca e filtros ocultos, barra de WhatsApp genérica |
| `assets/css/store-catalog.css` | grade de categorias em flex centralizado (7 categorias não deixam buraco) + estilo do aviso `.mw-empty-cat` |

A página `/kits/` continua existindo e, se alguém chegar por link antigo, mostra
um aviso curto ("Temporariamente sem itens disponíveis") com botões para a home
e para o WhatsApp — sem grade vazia.

## Como reativar

1. **Obrigatório:** em `assets/js/store-data.js`, apagar a linha `"hidden": true`
   da categoria `kits`.
2. Em `assets/js/store-data.js`, remover `available:false` dos kits que voltarem
   a ter estoque (quem continuar `available:false` aparece com selo
   "Indisponível", como nas outras categorias).
3. Descomentar os blocos `KITS-OFF` no HTML: o link `Kits` do menu nas 9 páginas
   e o banner do hero em `index.html`.
4. Em `kits/index.html`: remover a `<meta name="robots" content="noindex, follow">`
   e os `style="display:none"` da busca e da `aside.mw-sidebar`.
5. Opcional: devolver as menções a "kits" nos textos de `index.html` e nas
   mensagens de WhatsApp.
6. Em `assets/css/store-catalog.css` nada precisa mudar — a grade flex funciona
   com 7 ou 8 categorias.

Com as etapas 1 e 3 o site volta ao comportamento anterior; as demais são
acabamento de texto e SEO.
