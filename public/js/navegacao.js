const rotas = new Set(["index.html", "projetos.html", "cadastro.html"]);

function destinoDoLink(link) {
  const url = new URL(link.href, window.location.href);
  const arquivo = url.pathname.split("/").pop() || "index.html";
  return rotas.has(arquivo) && url.origin === window.location.origin ? url : null;
}

async function renderizar(url) {
  const arquivo = url.pathname.split("/").pop() || "index.html";
  const principal = document.querySelector("main");
  if (!principal) return;
  if (!rotas.has(arquivo)) {
    principal.innerHTML =
      '<section class="secao pagina-erro"><h1>Página não encontrada</h1><p>O endereço informado não existe.</p><a class="botao" href="index.html" data-nav>Voltar ao início</a></section>';
    return;
  }

  try {
    const resposta = await fetch(url.href);
    if (!resposta.ok) throw new Error("Página indisponível");
    const pagina = new DOMParser().parseFromString(await resposta.text(), "text/html");
    const novoPrincipal = pagina.querySelector("main");
    if (!novoPrincipal) throw new Error("Conteúdo ausente");
    principal.replaceWith(novoPrincipal);
    document.title = pagina.title;
    document.dispatchEvent(new CustomEvent("pagina:renderizada"));
    document.getElementById("conteudo")?.focus({ preventScroll: true });
  } catch {
    principal.innerHTML =
      '<section class="secao pagina-erro"><h1>Não foi possível abrir a página</h1><p>Tente novamente em instantes.</p><a class="botao" href="index.html" data-nav>Voltar ao início</a></section>';
  }
}

export function iniciarNavegacao() {
  document.addEventListener("click", (evento) => {
    const link = evento.target.closest("a[data-nav]");
    if (!link) return;
    const destino = destinoDoLink(link);
    if (!destino || evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey) return;
    evento.preventDefault();
    history.pushState({ pagina: destino.pathname }, "", destino.href);
    renderizar(destino);
  });

  window.addEventListener("popstate", () => renderizar(new URL(window.location.href)));
}

export function iniciarMenu() {
  const botao = document.querySelector("[data-menu]");
  const menu = document.querySelector("[data-menu-lista]");
  if (!botao || !menu) return;
  botao.addEventListener("click", () => {
    const aberto = botao.getAttribute("aria-expanded") === "true";
    botao.setAttribute("aria-expanded", String(!aberto));
    menu.hidden = aberto;
  });
  document.addEventListener("click", (evento) => {
    if (!evento.target.closest("[data-menu-lista] a")) return;
    botao.setAttribute("aria-expanded", "false");
    menu.hidden = true;
  });
}
