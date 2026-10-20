# Código completo — Interbank | Recuperação de Crédito

Exportado em 16/10/2026, incluindo a atualização de porcentagens nos gráficos.

## Como editar
1. Extraia o ZIP para uma pasta no seu computador.
2. Abra a pasta interbank-codigo no Visual Studio Code ou outro editor de texto.
3. Edite os arquivos indicados abaixo e salve. TypeScript e TSX devem ser abertos em editor de código, não no Word.

| O que alterar | Arquivo |
| --- | --- |
| Telas, abas, filtros, formulários e textos | app/workspace.tsx |
| Gráficos, cores, porcentagens e cálculos dos indicadores | app/charts.tsx |
| Aparência, fontes e espaçamentos | app/globals.css |
| Salvamento, leitura dos registros, permissões e histórico | app/api/records/route.ts |
| Nome do site e metadados | app/layout.tsx |
| Página inicial | app/page.tsx |
| Login integrado ao ChatGPT | app/chatgpt-auth.ts |
| Estrutura das tabelas do banco | db/schema.ts |
| Migrações do banco | drizzle/ |
| Dados iniciais importados das planilhas | data/seed.json |
| Relação das planilhas originais | data/sources.json |
| Arquivos Excel originais | public/planilhas/ |
| Dependências e comandos | package.json |
| Configuração do site e vínculo com o banco | .openai/hosting.json |

## Executar e publicar
O projeto usa React, TypeScript, Vinext, Recharts e Cloudflare D1.
Consulte README.md para o fluxo original de instalação, desenvolvimento e banco local.
As dependências são descritas em package.json e pnpm-lock.yaml; node_modules não está incluído.
O login e a identificação dos visitantes são fornecidos pela hospedagem Sites. Para executar fora dela, é necessário configurar autenticação e o banco compatível; abrir apenas os arquivos no navegador não executa o sistema completo.

Editar esta cópia não altera automaticamente o site publicado. Uma nova versão precisa ser compilada e publicada no mesmo projeto para aparecer no link atual.

## Dados e conteúdo do pacote
Este pacote inclui o código-fonte, configurações versionadas, migrações, dados iniciais e planilhas originais.
As alterações e negociações registradas depois da importação estão no banco online. Este ZIP NÃO é um backup desse banco e não inclui o histórico atualizado dos usuários.
Não inclui tokens, senhas, credenciais de publicação, dependências instaladas ou arquivos temporários.

## Identificação
Site: https://interbank-controle-jennifer.jenniferinterbank.chatgpt.site
Commit exportado: ca0ec1145c819bbb85ef306cc6a1d0452ad24552
