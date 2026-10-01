const STORAGE_KEY = "ong-esperanca-voluntarios";

export function obterCadastros() {
  try {
    const dados = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}

export function salvarCadastro(cadastro) {
  try {
    const cadastros = obterCadastros();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...cadastros, cadastro]));
    return true;
  } catch {
    return false;
  }
}

export function obterUltimoCadastro() {
  return obterCadastros().at(-1) ?? null;
}
