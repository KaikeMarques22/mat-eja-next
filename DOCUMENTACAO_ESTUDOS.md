# Documentacao de Estudos - Mat EJA (Next.js)

## 1) Visao Geral

Este projeto Next.js cria um fluxo simples:

1. O usuario acessa `/` (raiz)
2. A app redireciona para `/login`
3. No `/login`, o formulario envia dados para uma **Server Action**
4. A Server Action valida campos e grava um cookie (`eja_user`)
5. O usuario e redirecionado para `/dashboard`
6. A rota `/dashboard` e protegida: se nao existir o cookie, redireciona para `/login`

O layout e feito com Tailwind CSS usando CDN (carregado no `layout.js`).

## 2) Como rodar (scripts)

No diretorio `mat-eja-next`, use:

- `npm.cmd run dev` (subir dev server)
- `npm.cmd run build` (build de producao)
- `npm.cmd start` (rodar apos build)

Os scripts ficam em `mat-eja-next/package.json`.

## 3) Estrutura do codigo (App Router)

Neste projeto, usamos o **App Router** do Next, onde as rotas ficam dentro de `mat-eja-next/app/`.

Arquivos principais:

- `mat-eja-next/app/layout.js`: componente de layout global
- `mat-eja-next/app/page.js`: pagina da raiz `/` (redireciona para `/login`)
- `mat-eja-next/app/login/page.js`: pagina `/login`
- `mat-eja-next/app/login/LoginForm.js`: componente do formulario (client)
- `mat-eja-next/app/login/actions.js`: Server Action (valida e grava cookie)
- `mat-eja-next/app/dashboard/page.js`: pagina `/dashboard` (protege via cookie)

## 4) Arquivo `layout.js` (global)

`mat-eja-next/app/layout.js` define o HTML base da aplicacao:

- Importa `./globals.css`
- Define `metadata` (titulo/descricao para o Next)
- Insere o script do Tailwind via CDN:
  - isso evita a necessidade de configurar Tailwind por build (PostCSS)
- Renderiza `children` dentro de um `<body>` com classes de estilo base

Ponto de estudo: no Next App Router, `layout.js` e um Server Component por padrao (nao tem `'use client'`).

## 5) Arquivo `app/page.js` (rota `/`)

`mat-eja-next/app/page.js` faz:

- Importa `redirect` de `next/navigation`
- Exporta uma funcao que redireciona automaticamente para `/login`

Ou seja: qualquer acesso em `/` nao mostra conteudo; ele encaminha para a tela de login.

## 6) Rota `/login` (arquivo `app/login/page.js`)

`mat-eja-next/app/login/page.js` e a pagina que:

- monta o fundo e o container da tela
- exibe o titulo e a mensagem de boas-vindas
- renderiza o componente `LoginForm`

Ela chama `LoginForm` a partir de `./LoginForm`.

## 7) Componente `LoginForm` (arquivo `app/login/LoginForm.js`)

`mat-eja-next/app/login/LoginForm.js` tem `'use client'`, entao e um **Client Component**.

Ele faz 2 coisas principais:

1. Monta o formulario com 3 campos:
   - `nome` (nome completo)
   - `ra` (RA do aluno)
   - `senha` (senha)
2. Usa `useActionState` para integrar o formulario com a **Server Action** `loginAction`.
   - O hook recebe:
     - a Server Action (`loginAction`)
     - um estado inicial (`initialState`)
   - Quando o usuario envia o formulario:
     - a action roda no servidor
     - ela devolve um `state` (mensagens/erros)
     - o componente re-renderiza e mostra os erros abaixo de cada campo

Detalhe de estudo importante:

- O componente usa `state.errors.nome`, `state.errors.ra`, `state.errors.senha` para mostrar:
  - mensagem em portugues
  - borda vermelha quando houver erro

Assim, o usuario consegue ver exatamente o que falta preencher.

## 8) Server Action `loginAction` (arquivo `app/login/actions.js`)

`mat-eja-next/app/login/actions.js` tem `'use server'` e funciona no servidor.

Fluxo da action:

1. Lê valores do `formData`:
   - `nome`, `ra`, `senha`
2. Valida se algum campo ficou vazio:
   - se vazio, retorna:
     - `ok: false`
     - uma mensagem geral
     - `errors` com mensagem por campo (tudo em portugues)
3. Se tudo estiver preenchido:
   - salva um cookie chamado `eja_user`
   - o cookie armazena JSON com `{ nome, ra }`
   - cookie criado com:
     - `httpOnly: true` (seguranca: JS do navegador nao acessa)
     - `sameSite: 'lax'`
     - `path: '/'`
4. Redireciona para `/dashboard` com `redirect('/dashboard')`

Ponto de estudo:

- A action usa `const cookieStore = await cookies();`
- Isso e necessario porque, no ambiente atual, `cookies()` retorna Promise e precisa ser `await` antes de chamar `set`.

## 9) Rota protegida `/dashboard` (arquivo `app/dashboard/page.js`)

`mat-eja-next/app/dashboard/page.js` e uma pagina **Server Component async**:

1. Faz `await cookies()` para obter o store de cookies
2. Lê o cookie `eja_user`
3. Se nao existir, redireciona para `/login`
4. Faz `JSON.parse` do cookie para recuperar:
   - `nome`
   - `ra`
5. Renderiza uma tela simples de dashboard exibindo:
   - “Bem-vindo(a), {nome}!”
   - “RA: {ra}”
6. Tem um link para voltar para `/login`

Ponto de estudo:

- Protecao por cookie no servidor: quem tenta acessar `/dashboard` sem estar logado (sem cookie) nao recebe conteudo.

## 10) Estilizacao e imagem de fundo

O fundo da tela vem de:

- `public/assets/fundo-eja.png`

Na pagina `login/page.js` e `dashboard/page.js` usamos:

- `style={{ backgroundImage: "url('/assets/fundo-eja.png')" }}`

Por que `public/`?

- Arquivos dentro de `public/` ficam acessiveis por URL direta no browser, por exemplo:
  - `/assets/fundo-eja.png`

## 11) Proximos aprendizados (ideias de estudo)

Se voce quiser evoluir esse projeto para algo maior, estude:

- Validacao mais robusta (formatos de RA, tamanho minimo de senha)
- Autenticacao real (ex: API + banco de dados)
- Protecao com middleware do Next (em vez de apenas checar cookie na pagina)
- Criar mais rotas (materias, exercicios) usando o mesmo padrao
- Fazer Tailwind local (sem CDN) para ficar mais padrao em producao

