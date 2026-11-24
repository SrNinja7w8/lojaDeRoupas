// Saldo de mentira para a compra fictícia
let saldo = 500;
let quantidade = 0;

// Mostra um valor no formato de dinheiro (R$ 49,90)
function formatar(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

//COMPRA: confere se tem saldo, desconta e atualiza a tela
function comprar(preco, nome) {
  const mensagem = document.getElementById("mensagem");

  if (saldo >= preco) {
    saldo = saldo - preco;
    quantidade = quantidade + 1;
    document.getElementById("saldo").textContent = formatar(saldo);
    document.getElementById("contador").textContent = quantidade;
    mensagem.textContent = "✅ Você comprou: " + nome;
    mensagem.style.color = "green";
  } else {
    mensagem.textContent = "❌ Saldo insuficiente para: " + nome;
    mensagem.style.color = "red";
  }
}

//FILTRO: mostra só os produtos da categoria escolhida
function filtrar(categoria) {
  const produtos = document.querySelectorAll(".produto");

  for (let i = 0; i < produtos.length; i++) {
    if (categoria === "todos" || produtos[i].classList.contains(categoria)) {
      produtos[i].style.display = "block";
    } else {
      produtos[i].style.display = "none";
    }
  }
}

//CONTATO: simula o envio do formulário (não envia nada de verdade)
function enviarContato(event) {
  event.preventDefault(); // impede a página de recarregar
  const nome = document.getElementById("nome").value;
  document.getElementById("resposta").textContent =
    "✅ Obrigado, " + nome + "! Recebemos sua mensagem.";
  event.target.reset(); // limpa o formulário
}
