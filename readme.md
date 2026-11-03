# GameMatch (Arena Amador)

O **GameMatch** (ou Arena Amador) é uma plataforma mobile-first desenvolvida para conectar jogadores amadores de jogos competitivos (como Free Fire, Valorant, CS2 e League of Legends/Wild Rift) com base em elo, interesses e horários para formar equipes e disputar torneios sem frustrações.

---

## O Problema que Resolvemos

Muitos jogadores amadores encontram dificuldades crônicas para evoluir e se divertir porque caem em partidas aleatórias (*solo queues* tóxicas) com grandes disparidades técnicas, falta de comunicação ou pessoas que abandonam a partida ("kitam"). 

O GameMatch resolve isso ao criar um ambiente estruturado onde jogadores com o mesmo nível técnico e propósito podem se encontrar facilmente, formar *lineups* sólidas, organizar treinos e participar de campeonatos amadores equilibrados e justos.

---

## Telas do Projeto

O projeto é composto por 6 páginas principais totalmente interativas e interligadas:

- **`home.html`** — Página inicial de apresentação, proposta de valor, carrossel/cards de como funciona e formulário de cadastro rápido.
- **`matchmaking.html`** — Tela de busca de duos e times, contendo filtros interativos por jogo e função, além de anúncios de lobbies ativos na comunidade.
- **`torneios.html`** — Tela de campeonatos e ligas amadoras com opção de inscrição de equipes.
- **`meuperfil.html`** — Painel do atleta amador para gerenciar estatísticas por jogo, reputação e preferências.
- **`suporte.html`** — Central de atendimento ao cliente com Perguntas Frequentes (FAQ) detalhadas sobre o site e formulário de contato/denúncias.
- **`sobreogrupo.html`** — Seção institucional apresentando a equipe de criadores e a foto dos bastidores do grupo.

---

## Tecnologias Utilizadas

- **HTML5 Semântico:** Estruturação limpa de todas as páginas e formulários.
- **CSS3 Avançado:** Folha de estilos unificada (`style.css`), utilizando variáveis nativas, tipografia fluída (`clamp`), Flexbox, Grid Layout, animações de entrada (*fade-in*), spinner de carregamento e microinterações de elevação de cards e botões.
- **Menu Hambúrguer em CSS Puro:** Implementado sem uso de JavaScript (utilizando o truque do *Checkbox Hack*).
- **Design System Gamer Premium:** Paleta de cores inspirada nas principais plataformas de e-sports, com estados de foco acessíveis via teclado (`Tab`).

---

## Como Rodar o Projeto

Como o projeto foi desenvolvido inteiramente com tecnologias web nativas sem dependências de pacotes externos, executá-lo é extremamente simples:

1. Baixe ou clone este repositório para o seu computador.
2. Certifique-se de que todos os arquivos HTML (`home.html`, `matchmaking.html`, `torneios.html`, `meuperfil.html`, `suporte.html`, `sobreogrupo.html`), o arquivo unificado `style.css` e a imagem `foto grupo.jpg` estejam na **mesma pasta**.
3. Abra o arquivo **`home.html`** diretamente em qualquer navegador web moderno (Google Chrome, Firefox, Edge, etc.) ou utilize a extensão **Live Server** do Visual Studio Code.

---

## Quem Fez o Quê

A equipe de desenvolvimento responsável pela criação e refinamento do projeto é composta por:

- **Isaque de Moura** — Desenvolvimento & Lógica da Plataforma.
- **Pedro Henrique** — Estrutura HTML/CSS & Organização de Conteúdo.
- **Enzo Eler** — UI/UX Design, Estilização Avançada & Identidade Visual.

---

## Status do Projeto

- **O que já funciona:**
  - Todas as 6 telas estruturadas, clicáveis e navegáveis entre si.
  - Folha de estilos unificada (`style.css`) aplicada em todo o projeto.
  - Responsividade rigorosa testada para telas a partir de 360px e modo paisagem.
  - Menu hambúrguer interativo em CSS puro em todas as páginas.
  - Microinterações completas (estados de *hover*, foco acessível com `Tab`, *active* e transições suaves).
  - Animação de entrada em *fade-in* e spinner de carregamento em CSS puro.
  - Foto do grupo integrada e alinhada na página de equipe.

- **O que ainda está em desenvolvimento:**
  - Persistência de dados em banco de dados real (atualmente utiliza formulários semânticos e navegação HTML nativa, sem uso de JavaScript).
