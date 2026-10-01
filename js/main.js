import { iniciarFormulario } from "./formulario.js";
import { iniciarMenu, iniciarNavegacao } from "./navegacao.js";
import { criarCardsProjetos } from "./templates.js";

document.addEventListener("DOMContentLoaded", () => {
  const listaProjetos = document.querySelector("[data-projetos]");
  if (listaProjetos) listaProjetos.innerHTML = criarCardsProjetos();
  iniciarMenu();
  iniciarNavegacao();
  iniciarFormulario();
});
