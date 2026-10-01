const rotas = new Set(["index.html", "projetos.html", "cadastro.html"]);

function destinoDoLink(link) {
  const url = new URL(link.href, window.location.href);
  const arquivo = url.pathname.split("/").pop() || "index.html";
  return rotas.has(arquivo) && url.origin === window.location.origin ? url : null;
}

export function iniciarNavegacao() {
  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.addEventListener("click", (evento) => {
      const destino = destinoDoLink(link);
      if (!destino || evento.ctrlKey || evento.metaKey || evento.shiftKey) return;
      evento.preventDefault();
      history.pushState({ pagina: destino.pathname }, "", destino.href);
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
  });

  window.addEventListener("popstate", () => {
    const arquivo = window.location.pathname.split("/").pop() || "index.html";
    if (!rotas.has(arquivo)) {
      document.querySelector("main").innerHTML = '<section class="secao pagina-erro"><h1>Página não encontrada</h1><p>O endereço informado não existe.</p><a class="botao" href="index.html">Voltar ao início</a></section>';
      return;
    }
    window.location.assign(window.location.href);
  });
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
}