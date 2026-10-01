export const projetos = [
  {
    id: "educacao",
    categoria: "Educação",
    titulo: "Educação que Transforma",
    imagem: "../imagens/projeto-social.webp",
    alt: "Educadora acompanhando adolescentes em atividade de estudos",
    descricao:
      "Aulas de reforço, leitura e oficinas criativas no contraturno escolar para crianças e adolescentes.",
    impacto: "180 estudantes por semana",
  },
  {
    id: "alimento",
    categoria: "Alimentação",
    titulo: "Mesa Compartilhada",
    imagem: "../imagens/projeto-alimento.webp",
    alt: "Voluntária entregando alimentos frescos para uma família",
    descricao:
      "Cestas de alimentos frescos, hortas comunitárias e encontros sobre nutrição e aproveitamento integral.",
    impacto: "650 famílias atendidas",
  },
  {
    id: "verde",
    categoria: "Meio ambiente",
    titulo: "Bairro Mais Verde",
    imagem: "../imagens/projeto-verde.webp",
    alt: "Jovens voluntários plantando uma árvore em um parque urbano",
    descricao:
      "Mutirões de plantio, recuperação de praças e educação ambiental feita com moradores do território.",
    impacto: "2.400 mudas plantadas",
  },
];

export function criarCardsProjetos() {
  return projetos
    .map(
      (projeto) => `
    <article class="projeto-card" id="${projeto.id}">
      <img src="${projeto.imagem}" width="1200" height="800" loading="lazy" alt="${projeto.alt}">
      <div class="projeto-conteudo">
        <span class="etiqueta">${projeto.categoria}</span>
        <h2>${projeto.titulo}</h2>
        <p>${projeto.descricao}</p>
        <strong>${projeto.impacto}</strong>
        <div class="acoes projeto-acoes">
          <button class="botao botao-contorno" type="button" data-abrir-modal="${projeto.id}">Saiba como funciona</button>
          <a class="botao" href="cadastro.html" data-nav>Quero participar</a>
        </div>
      </div>
    </article>`,
    )
    .join("");
}

export function obterProjeto(id) {
  return projetos.find((projeto) => projeto.id === id);
}
