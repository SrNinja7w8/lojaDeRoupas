// Dados dos produtos
const produtos = [
  { id: 1, nome: "Blusa Básica",      preco: 49.90,  cat: "Blusas",   emoji: "👚", cor: "#6b3d28" },
  { id: 2, nome: "Camiseta Oversized", preco: 59.90,  cat: "Blusas",   emoji: "👕", cor: "#e8d3c4" },
  { id: 3, nome: "Calça Alfaiataria",  preco: 99.90,  cat: "Calças",   emoji: "👖", cor: "#5a3220" },
  { id: 4, nome: "Moletom Básico",     preco: 129.90, cat: "Moletons", emoji: "🧥", cor: "#4a2a1c" },
  { id: 5, nome: "Vestido Midi",       preco: 119.90, cat: "Vestidos", emoji: "👗", cor: "#c9a58f" },
  { id: 6, nome: "Calça Wide Leg",     preco: 109.90, cat: "Calças",   emoji: "👖", cor: "#a67c64" },
  { id: 7, nome: "Vestido Curto",      preco: 89.90,  cat: "Vestidos", emoji: "👗", cor: "#6b3d28" },
  { id: 8, nome: "Moletom Cropped",    preco: 99.90,  cat: "Moletons", emoji: "🧥", cor: "#d9b8a3" },
];

let carrinho = [];

const $ = (id) => document.getElementById(id);
const moeda = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Mostra os produtos (filtrados por categoria)
function renderProdutos(cat = "todos") {
  const lista = cat === "todos" ? produtos.slice(0, 4) : produtos.filter(p => p.cat === cat);
  $("titulo-produtos").textContent = cat === "todos" ? "Destaques" : cat;
  $("produtos").innerHTML = lista.map(p => `
    <article class="produto">
      <div class="foto" style="background:${p.cor}">${p.emoji}</div>
      <h4>${p.nome}</h4>
      <p>${moeda(p.preco)}</p>
      <button onclick="adicionar(${p.id})">Adicionar</button>
    </article>`).join("");
  document.querySelectorAll(".cat").forEach(b => b.classList.toggle("ativa", b.dataset.cat === cat));
}

// Carrinho
function adicionar(id) {
  const item = carrinho.find(i => i.id === id);
  item ? item.qtd++ : carrinho.push({ id, qtd: 1 });
  atualizarCarrinho();
  avisar("Produto adicionado ao carrinho!");
}

function alterar(id, delta) {
  const item = carrinho.find(i => i.id === id);
  item.qtd += delta;
  if (item.qtd <= 0) carrinho = carrinho.filter(i => i.id !== id);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  let total = 0, qtd = 0;
  $("itens").innerHTML = carrinho.length ? carrinho.map(i => {
    const p = produtos.find(x => x.id === i.id);
    total += p.preco * i.qtd; qtd += i.qtd;
    return `<li><span>${p.nome}<br><small>${moeda(p.preco)}</small></span>
      <span><button onclick="alterar(${i.id},-1)">−</button>${i.qtd}<button onclick="alterar(${i.id},1)">+</button></span></li>`;
  }).join("") : "<li>Carrinho vazio</li>";
  $("total").textContent = moeda(total);
  $("contador").textContent = qtd;
}

// Painel lateral e aviso
function painel(abrir) {
  $("painel").classList.toggle("aberto", abrir);
  $("fundo").classList.toggle("aberto", abrir);
}
function avisar(msg) {
  $("aviso").textContent = msg;
  $("aviso").classList.add("mostrar");
  setTimeout(() => $("aviso").classList.remove("mostrar"), 1800);
}

// Eventos
document.querySelectorAll("[data-cat]").forEach(b =>
  b.addEventListener("click", () => {
    renderProdutos(b.dataset.cat);
    $("destaques").scrollIntoView();
  }));
$("btn-carrinho").onclick = () => painel(true);
$("fechar").onclick = $("fundo").onclick = () => painel(false);
$("finalizar").onclick = () => {
  if (!carrinho.length) return avisar("Seu carrinho está vazio.");
  carrinho = []; atualizarCarrinho(); painel(false);
  avisar("Compra finalizada! Obrigado 💛");
};

renderProdutos();
atualizarCarrinho();
