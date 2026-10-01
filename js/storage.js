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
  const cadastros = obterCadastros();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...cadastros, cadastro]));
}

export function obterUltimoCadastro() {
  return obterCadastros().at(-1) ?? null;
}
