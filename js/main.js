import { iniciarFormulario } from "./formulario.js";
import { iniciarMenu, iniciarNavegacao } from "./navegacao.js";
import { criarCardsProjetos } from "./templates.js";

function iniciarPagina() {
  const listaProjetos = document.querySelector("[data-projetos]");
  if (listaProjetos) listaProjetos.innerHTML = criarCardsProjetos();
  iniciarFormulario();
}

document.addEventListener("DOMContentLoaded", () => {
  iniciarMenu();
  iniciarNavegacao();
  iniciarPagina();
});
document.addEventListener("pagina:renderizada", iniciarPagina);
