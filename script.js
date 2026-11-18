document.addEventListener("DOMContentLoaded", () => {
    const paginaAtual = window.location.pathname.split("/").pop() || "home.html";
    document.querySelectorAll("header nav ul a").forEach(link => {
        if (link.getAttribute("href") === paginaAtual) {
            link.style.color = "#06b6d4";
            link.style.backgroundColor = "rgba(6, 182, 212, 0.15)";
            link.style.borderLeft = "3px solid #06b6d4";
        }
    });

    const menuToggle = document.getElementById("menu-toggle");
    document.querySelectorAll("header ul a").forEach(link => {
        link.addEventListener("click", () => {
            if (menuToggle) menuToggle.checked = false;
        });
    });

    function mostrarNotificacao(mensagem, tipo = "sucesso") {
        const toastAntigo = document.querySelector(".gm-toast");
        if (toastAntigo) toastAntigo.remove();

        const toast = document.createElement("div");
        toast.className = "gm-toast";
        toast.textContent = mensagem;
        
        Object.assign(toast.style, {
            position: "fixed",
            bottom: "24px",
            right: "20px",
            left: "20px",
            maxWidth: "400px",
            margin: "0 auto",
            padding: "14px 18px",
            borderRadius: "12px",
            backgroundColor: tipo === "sucesso" ? "#10b981" : "#8b5cf6",
            color: "#ffffff",
            fontWeight: "700",
            fontSize: "14px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
            zIndex: "9999",
            textAlign: "center",
            animation: "fadeInPage 0.3s ease-out"
        });

        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transition = "opacity 0.3s ease";
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    const perfilPadrao = {
        nick: "ShadowPlayer#2026",
        jogo: "Free Fire (Mobile/Emulador)",
        bio: "Jogando focado em evoluir e fechar line para campeonatos.",
        horario: "Noite (19h às 23h)",
        convitesEnviados: []
    };

    function obterPerfil() {
        const salvo = localStorage.getItem("gamematch_perfil");
        return salvo ? JSON.parse(salvo) : perfilPadrao;
    }

    function salvarPerfil(dados) {
        localStorage.setItem("gamematch_perfil", JSON.stringify(dados));
    }

    const formCadastroHome = document.querySelector('form[action="meuperfil.html"]');
    if (formCadastroHome) {
        formCadastroHome.addEventListener("submit", (e) => {
            e.preventDefault();
            const nick = document.getElementById("nome").value.trim();
            const selectJogo = document.getElementById("jogo");
            const jogoTexto = selectJogo.options[selectJogo.selectedIndex].text;

            const perfil = obterPerfil();
            perfil.nick = nick.includes("#") ? nick : `${nick}#2026`;
            perfil.jogo = jogoTexto;
            salvarPerfil(perfil);

            mostrarNotificacao(`Tag ${perfil.nick} criada! Redirecionando para o perfil...`);
            setTimeout(() => {
                window.location.href = "meuperfil.html";
            }, 1200);
        });
    }

    const formFiltroMatch = document.querySelector('form[action="matchmaking.html"]');
    if (formFiltroMatch) {
        const cards = document.querySelectorAll(".cards-grid .player-card");

        formFiltroMatch.addEventListener("submit", (e) => {
            e.preventDefault();
            const jogoSelecionado = document.getElementById("jogo-filtro").value;
            const funcaoSelecionada = document.getElementById("funcao-filtro").value;
            let encontrados = 0;

            cards.forEach(card => {
                const textoCard = card.innerText.toLowerCase();
                let combinaJogo = jogoSelecionado === "todos" ||
                    (jogoSelecionado === "ff" && textoCard.includes("free fire")) ||
                    (jogoSelecionado === "valorant" && textoCard.includes("valorant")) ||
                    (jogoSelecionado === "lol" && (textoCard.includes("wild rift") || textoCard.includes("league"))) ||
                    (jogoSelecionado === "cs2" && textoCard.includes("counter-strike"));

                let combinaFuncao = funcaoSelecionada === "qualquer" ||
                    (funcaoSelecionada === "duelista" && (textoCard.includes("duelista") || textoCard.includes("rush"))) ||
                    (funcaoSelecionada === "suporte" && (textoCard.includes("suporte") || textoCard.includes("controlador"))) ||
                    (funcaoSelecionada === "sniper" && textoCard.includes("sniper"));

                if (combinaJogo && combinaFuncao) {
                    card.style.display = "flex";
                    encontrados++;
                } else {
                    card.style.display = "none";
                }
            });

            mostrarNotificacao(`${encontrados} lobby(s) encontrado(s) com esses filtros!`);
        });

        document.querySelectorAll(".btn-card").forEach(btn => {
            if (btn.textContent.includes("Chamar")) {
                btn.addEventListener("click", (e) => {
                    e.preventDefault();
                    const nomeJogador = btn.closest(".player-card").querySelector("h3").textContent;
                    btn.textContent = "✓ Convite Enviado!";
                    btn.style.color = "#10b981";
                    mostrarNotificacao(`Convite de duo enviado para ${nomeJogador}!`);
                });
            }
        });
    }

    const formTorneio = document.querySelector('form[action="torneios.html"]');
    if (formTorneio) {
        const gridTorneios = document.querySelector(".cards-grid");

        const inscricoesSalvas = JSON.parse(localStorage.getItem("gamematch_torneios") || "[]");
        inscricoesSalvas.forEach(item => {
            const aviso = document.createElement("article");
            aviso.className = "player-card";
            aviso.style.borderLeft = "4px solid #10b981";
            aviso.innerHTML = `
                <div class="card-header">
                    <h3>${item.equipe}</h3>
                    <span class="status-online">Inscrito</span>
                </div>
                <p><strong>Campeonato:</strong> ${item.campeonato}</p>
                <p><strong>Capitão:</strong> ${item.capitao}</p>
            `;
            gridTorneios.appendChild(aviso);
        });

        formTorneio.addEventListener("submit", (e) => {
            e.preventDefault();
            const equipe = document.getElementById("time").value.trim();
            const selectCamp = document.getElementById("campeonato-escolhido");
            const campeonato = selectCamp.options[selectCamp.selectedIndex].text;
            const capitao = document.getElementById("capitao").value.trim();

            const novaInscricao = { equipe, campeonato, capitao };
            inscricoesSalvas.push(novaInscricao);
            localStorage.setItem("gamematch_torneios", JSON.stringify(inscricoesSalvas));

            const novoCard = document.createElement("article");
            novoCard.className = "player-card";
            novoCard.style.borderLeft = "4px solid #10b981";
            novoCard.innerHTML = `
                <div class="card-header">
                    <h3>${equipe}</h3>
                    <span class="status-online">Inscrito Agora</span>
                </div>
                <p><strong>Campeonato:</strong> ${campeonato}</p>
                <p><strong>Capitão:</strong> ${capitao}</p>
            `;
            gridTorneios.appendChild(novoCard);

            formTorneio.reset();
            mostrarNotificacao(`Equipe "${equipe}" inscrita com sucesso em ${campeonato}!`);
        });
    }

    const formPerfil = document.querySelector('form[action="meuperfil.html"]');
    if (formPerfil) {
        const perfil = obterPerfil();
        const tituloNick = document.querySelector(".info-section h3");
        const tagPlataforma = document.querySelector(".info-section .game-tag");
        const inputBio = document.getElementById("bio");
        const selectHorario = document.getElementById("horario");

        if (tituloNick) tituloNick.textContent = perfil.nick;
        if (tagPlataforma) tagPlataforma.textContent = perfil.jogo;
        if (inputBio) inputBio.value = perfil.bio;

        const cardDetalhes = document.querySelector(".info-section .card-details");
        if (cardDetalhes) {
            cardDetalhes.style.flexDirection = "column";
            cardDetalhes.style.gap = "6px";
            cardDetalhes.innerHTML += `
                <p id="perfil-horario-exibido"><strong>Horário Ativo:</strong> ${perfil.horario}</p>
                <p id="perfil-bio-exibida" style="font-style: italic; color: #f8fafc;">"${perfil.bio}"</p>
            `;
        }

        formPerfil.addEventListener("submit", (e) => {
            e.preventDefault();
            perfil.bio = inputBio.value.trim();
            perfil.horario = selectHorario.options[selectHorario.selectedIndex].text;
            salvarPerfil(perfil);

            document.getElementById("perfil-horario-exibido").innerHTML = `<strong>Horário Ativo:</strong> ${perfil.horario}`;
            document.getElementById("perfil-bio-exibida").textContent = `"${perfil.bio}"`;

            mostrarNotificacao("Preferências do perfil atualizadas com sucesso!");
        });
    }

    const formSuporte = document.querySelector('form[action="suporte.html"]');
    if (formSuporte) {
        formSuporte.addEventListener("submit", (e) => {
            e.preventDefault();
            const nome = document.getElementById("nome-suporte").value.trim();
            const protocolo = Math.floor(100000 + Math.random() * 900000);
            formSuporte.reset();
            mostrarNotificacao(`Chamado #${protocolo} aberto! Responderemos em breve, ${nome}.`);
        });
    }
});