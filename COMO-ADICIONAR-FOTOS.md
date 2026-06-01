# Como adicionar as fotos reais das bebidas

O site já está preparado para mostrar **foto real** de cada produto. Enquanto
não há foto, ele mostra um cartão neutro e elegante (ícone + nome +
"Foto sob consulta"). Assim que você colocar a foto, ela aparece sozinha.

## Passo a passo

1. Tire ou baixe a foto da bebida.
   - **Recomendado:** fundo branco/claro, garrafa centralizada (estilo catálogo).
   - Formato **`.jpg`**, mais ou menos quadrada (ex.: 800×800).
2. Renomeie o arquivo com o **slug** do produto (lista abaixo).
3. Coloque dentro da pasta:

   ```
   assets/img/products/
   ```

   Exemplo: a foto da Heineken Long Neck deve se chamar
   `heineken-long-330.jpg` e ficar em `assets/img/products/heineken-long-330.jpg`.

Pronto. Não precisa mexer em código.

## Onde conseguir as fotos

- Fotos tiradas por você na loja (melhor opção — são suas e corretas).
- Catálogo/imagens oficiais do distribuidor ou fabricante.
- Sites de imagem gratuita (ex.: pexels.com) para fotos de ambiente.

> Evite "figuras"/desenhos PNG aleatórios da internet: além de poderem ser a
> bebida errada, têm qualidade e direitos de imagem incertos.

## Lista de slugs (nome do arquivo)

Veja a lista completa em `assets/js/store-data.js` (campo `slug` de cada produto).
Exemplos:

| Produto | Nome do arquivo |
|---|---|
| Heineken Long Neck 330ml | `heineken-long-330.jpg` |
| Corona Extra Long Neck 330ml | `corona-long-330.jpg` |
| Vodka Smirnoff 998ml | `smirnoff-998.jpg` |
| Johnnie Walker Red Label 1L | `jw-red-1l.jpg` |
| Aperol Aperitivo 750ml | `aperol-750.jpg` |
| Chandon Brut 750ml | `chandon-brut.jpg` |

## Fotos do banner (topo da home)

As 3 imagens grandes do banner ficam em `assets/img/hero/`:
`wine.jpg`, `beer.jpg`, `gift.jpg`. É só substituir os arquivos mantendo os nomes.
(As atuais são fotos livres do Pexels.)
