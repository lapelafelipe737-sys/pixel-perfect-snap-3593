import { obterUltimoCadastro, salvarCadastro } from "./storage.js";

const apenasDigitos = (valor, limite) => valor.replace(/\D/g, "").slice(0, limite);
export const mascaraCpf = (valor) => apenasDigitos(valor, 11).replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
export const mascaraTelefone = (valor) => apenasDigitos(valor, 11).replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
export const mascaraCep = (valor) => apenasDigitos(valor, 8).replace(/(\d{5})(\d)/, "$1-$2");

function mostrarErro(campo, mensagem) {
  const erro = document.getElementById(`${campo.id}-erro`);
  campo.setAttribute("aria-invalid", String(Boolean(mensagem)));
  if (erro) erro.textContent = mensagem;
}

function validarCampo(campo) {
  if (campo.validity.valueMissing) return "Este campo é obrigatório.";
  if (campo.validity.typeMismatch) return "Digite um e-mail válido.";
  if (campo.validity.tooShort) return `Use pelo menos ${campo.minLength} caracteres.`;
  if (campo.validity.tooLong) return `Use no máximo ${campo.maxLength} caracteres.`;
  if (campo.validity.patternMismatch) return campo.dataset.erroPadrao || "Revise o formato informado.";
  return "";
}

function restaurar(formulario) {
  const ultimo = obterUltimoCadastro();
  if (!ultimo) return;
  Object.entries(ultimo).forEach(([nome, valor]) => {
    const campo = formulario.elements.namedItem(nome);
    if (campo instanceof HTMLInputElement && campo.type === "checkbox") campo.checked = Boolean(valor);
    else if (campo instanceof HTMLInputElement || campo instanceof HTMLSelectElement || campo instanceof HTMLTextAreaElement) campo.value = String(valor);
  });
}

export function iniciarFormulario() {
  const formulario = document.querySelector("[data-formulario]");
  if (!(formulario instanceof HTMLFormElement)) return;
  restaurar(formulario);

  const mascaras = { cpf: mascaraCpf, phone: mascaraTelefone, cep: mascaraCep };
  Object.entries(mascaras).forEach(([nome, mascara]) => {
    const campo = formulario.elements.namedItem(nome);
    campo?.addEventListener("input", (evento) => { evento.currentTarget.value = mascara(evento.currentTarget.value); });
  });

  formulario.querySelectorAll("input, select, textarea").forEach((campo) => {
    campo.addEventListener("change", () => mostrarErro(campo, validarCampo(campo)));
  });

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const campos = [...formulario.querySelectorAll("input, select, textarea")];
    campos.forEach((campo) => mostrarErro(campo, validarCampo(campo)));
    if (!formulario.checkValidity()) {
      campos.find((campo) => !campo.validity.valid)?.focus();
      return;
    }
    const dados = Object.fromEntries(new FormData(formulario).entries());
    salvarCadastro({ ...dados, terms: true, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
    document.querySelector("[data-sucesso]").hidden = false;
  });
}