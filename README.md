# EducaTour — Edição Bagé - RS (Rainha da Fronteira)

Aplicativo educativo e gamificado para explorar **Bagé - RS**, descobrir seu rico patrimônio histórico, cultural e artístico, aprender por meio de desafios em formato de quiz, acumular pontos/medalhas e navegar por mapas interativos com sintetizador de voz nativo em **português do Brasil (pt-BR)**.

Este projeto foi desenvolvido com total fidelidade às especificações e mockups do documento **"Entrega 04 — Design da Interface"**, adaptando o cenário temático para Bagé — com especial destaque ao emblemático **Museu da Gravura Brasileira (Grupo de Bagé)** citado na Figura 3 do PDF.

---

## 🎨 Identidade Visual e Design Tokens

| Elemento | Hex | Aplicação no App |
| :--- | :--- | :--- |
| **Azul Profundo** | `#245B78` | Fundo predominante de todas as telas |
| **Azul Médio** | `#2F6F91` | Cartões secundários, campos de entrada e cabeçalho |
| **Amarelo Destaque** | `#FFC400` | Botões primários ("ENTRAR", "Explorar", "Mapa", "Ouvir") e títulos de destaque |
| **Verde** | `#20A765` | Ações alternativas ("CRIAR CONTA", "Ir para o desafio", "Voltar ao Menu") |
| **Branco / Cinza Claro** | `#FFFFFF` / `#EAF2F6` | Textos principais e cartões de resposta do quiz |

---

## 📱 Telas Implementadas

### 1. Tela de Login (`Figura 1 — Tela de login`)
- Logotipo oficial vetorizado com mapa dobrado, pino de localização e bússola de aventura.
- Título estilizado **EducaTour**.
- Campo de e-mail e campo de senha mascarada com botão de exibir/ocultar senha.
- Botão amarelo **ENTRAR** com estado de carregamento/processamento ativo para evitar múltiplos envios.
- Botão verde **CRIAR CONTA** com modal interativo de cadastro.
- Validação contextual de e-mail e campos obrigatórios com mensagens claras.
- Atalho rápido para preenchimento de credenciais de demonstração.

### 2. Menu Principal (`Figura 2 — Menu principal`)
- Barra superior com seta de retorno, título **"Menu"** e ícone de perfil de aventureiro.
- Saudação vibrante em amarelo: **"Olá, Aventureiro(a)!"** e subtítulo *"Para onde vamos hoje?"*.
- 3 botões largos em destaque:
  - 📖 **Explorar** (Amarelo `#FFC400`)
  - 🚩 **Ir para o desafio** (Verde `#20A765`)
  - 🧭 **Mapa** (Amarelo `#FFC400`)

### 3. Tela de Desafio / Quiz (`Figura 3 — Tela de pergunta do desafio`)
- Barra superior com navegação de retorno e título **"Local"**.
- Indicador de progresso em amarelo: **"Pergunta 1/5"** (atualizado dinamicamente até 5/5).
- Pergunta fidedigna ao PDF: *"O Museu da Gravura é famoso por:"*.
- 5 cartões de opções claras com texto escuro:
  1. *Esportes*
  2. *Praia*
  3. *Arte em gravuras* (Correta)
  4. *Cinema*
  5. *Shopping*
- Botão amarelo **"Ouvir 🔊"**: Aciona a **Web Speech API** nativa do navegador, narrando em voz alta a pergunta e todas as 5 alternativas em português (pt-BR).
- Feedback visual e textual imediato (verde para acerto, vermelho para erro com indicação da resposta correta) e explicação pedagógica do patrimônio cultural.
- Registro da pontuação (+2 pontos por acerto).

### 4. Tela de Resultado (`Figura 4 — Tela de resultado`)
- Barra superior com título **"Local"**.
- Título em amarelo: **"Resultado"**.
- Pontuação final calculada: *"Você fez 10 de 10 pontos!"* (com ícone de troféu e efeito festivo de confetes).
- Botão amarelo **"Ouvir 🔊"**: Lê em voz alta o resultado final e a mensagem motivacional.
- Botão verde **"Voltar ao Menu"**: Retorno estável ao menu preservando os pontos ganhos.

### 5. Tela Explorar
- Catálogo de locais turísticos, históricos e culturais (Museu da Gravura no Solar do Barão, Jardim Botânico, Ópera de Arame, Museu Oscar Niemeyer, Largo da Ordem, Parque Tanguá).
- Cartões com foto, categoria, endereço e breve resumo.
- Modal de detalhes com história completa, curiosidades de aventureiro e atalhos diretos para iniciar o desafio ou localizar no mapa.

### 6. Tela Mapa
- Mapa interativo (Leaflet + OpenStreetMap) com zoom, arrasto e marcadores SVG personalizados do EducaTour.
- Popups detalhados ao tocar nos marcadores contendo foto, categoria, descrição e botão direto para responder o desafio daquele ponto.
- Indicador de localização e contador de pontos de interesse.

### 7. Tela de Perfil
- Nome, e-mail, avatar e nível do aventureiro.
- Pontuação acumulada, total de quizzes realizados e locais desbravados.
- Seção **Pontos e Medalhas** (gamificação destacada na avaliação de usabilidade do PDF).
- Teste interativo do sintetizador de voz (Web Speech API).
- Opção para voltar ao menu ou encerrar sessão.

---

## 🚀 Como Executar o Projeto

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra a URL exibida (geralmente `http://localhost:5173`) no seu navegador.

> **Dica de Visualização:** No canto superior direito da tela há um seletor rápido para alternar entre **Modo Celular** (com moldura e dimensões idênticas às capturas do documento PDF) e **Modo Expandido** para computadores e tablets.
