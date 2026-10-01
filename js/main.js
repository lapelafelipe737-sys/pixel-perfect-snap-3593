import { iniciarFormulario } from "./formulario.js";
import { iniciarMenu, iniciarNavegacao } from "./navegacao.js";
import { criarCardsProjetos, obterProjeto } from "./templates.js";

function iniciarModalProjetos() {
  const modal = document.querySelector("[data-modal-projeto]");
  if (!(modal instanceof HTMLDialogElement) || modal.dataset.iniciado) return;
  modal.dataset.iniciado = "true";
  document.addEventListener("click", (evento) => {
    if (!(evento.target instanceof Element)) return;
    const botao = evento.target.closest("[data-abrir-modal]");
    if (!(botao instanceof HTMLButtonElement)) return;
    const projeto = obterProjeto(botao.dataset.abrirModal);
    if (!projeto) return;
    const titulo = modal.querySelector("[data-modal-titulo]");
    const texto = modal.querySelector("[data-modal-texto]");
    if (titulo) titulo.textContent = projeto.titulo;
    if (texto) texto.textContent = `${projeto.descricao} Impacto atual: ${projeto.impacto}.`;
    modal.showModal();
  });
  modal.querySelector("[data-fechar-modal]")?.addEventListener("click", () => modal.close());
  modal.addEventListener("click", (evento) => {
    if (evento.target === modal) modal.close();
  });
}

function iniciarPagina() {
  const listaProjetos = document.querySelector("[data-projetos]");
  if (listaProjetos) listaProjetos.innerHTML = criarCardsProjetos();
  iniciarFormulario();
  iniciarModalProjetos();
}

document.addEventListener("DOMContentLoaded", () => {
  iniciarMenu();
  iniciarNavegacao();
  iniciarPagina();
});
document.addEventListener("pagina:renderizada", iniciarPagina);
