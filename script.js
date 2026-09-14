const CardapioApp = (function () {
  // ---------------------------------------------------------------------
  // Estado interno da aplicação
  // ---------------------------------------------------------------------

  // Carrinho: array de { produtoId, quantidade }
  let carrinho = [];

  // Se a taxa opcional de 10% do garçom está marcada
  let cobrarGarcom = true;

  // Dados do cliente
  let cliente = {
    nome: "",
    mesa: ""
  };

  // Observações gerais do pedido (ex.: "sem cebola", "ponto da carne")
  let observacoes = "";

  // Forma de pagamento escolhida (chave de FORMAS_PAGAMENTO)
  let formaPagamento = "";

  // Valor pago em dinheiro (usado apenas quando formaPagamento === "dinheiro")
  let valorPago = null;

  // Cupom de desconto aplicado: { codigo, desconto, descricao } ou null
  let cupomAtual = null;

  // Histórico de pedidos já finalizados nesta sessão/dispositivo
  let historico = [];

  const TAXA_GARCOM = 0.10;

  // Formas de pagamento aceitas pelo restaurante
  const FORMAS_PAGAMENTO = {
    dinheiro: "Dinheiro",
    credito: "Cartão de crédito",
    debito: "Cartão de débito",
    pix: "Pix"
  };

  // Cupons de desconto válidos (percentual sobre o subtotal)
  const CUPONS_VALIDOS = {
    PALMEIRAS10: { desconto: 0.10, descricao: "10% de desconto" },
    BEMVINDO5: { desconto: 0.05, descricao: "5% de desconto de boas-vindas" },
    FIDELIDADE15: { desconto: 0.15, descricao: "15% de desconto fidelidade" }
  };

  // ---------------------------------------------------------------------
  // Funções auxiliares internas
  // ---------------------------------------------------------------------

  function buscarProdutoPorId(id) {
    return MENU_DATA.find((p) => p.id === Number(id)) || null;
  }

  function arredonda(valor) {
    return Math.round(valor * 100) / 100;
  }

  // ---------------------------------------------------------------------
  // Catálogo / navegação / pesquisa
  // ---------------------------------------------------------------------

  function getAllProducts() {
    return MENU_DATA;
  }

  function getCategorias() {
    return CATEGORIAS;
  }

  function filterByCategory(categoria) {
    if (!categoria || categoria === "TODAS") {
      return MENU_DATA;
    }
    return MENU_DATA.filter((p) => p.categoria === categoria);
  }

  function searchProducts(termo, categoria) {
    const base = filterByCategory(categoria);
    if (!termo || termo.trim() === "") {
      return base;
    }
    const alvo = termo
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return base.filter((p) => {
      const nome = p.nome
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      return nome.includes(alvo);
    });
  }

  // ---------------------------------------------------------------------
  // Carrinho ("Meu Pedido")
  // ---------------------------------------------------------------------

  function addToOrder(produtoId, quantidade = 1) {
    const produto = buscarProdutoPorId(produtoId);
    if (!produto) {
      throw new Error("Produto não encontrado: " + produtoId);
    }
    const item = carrinho.find((i) => i.produtoId === produto.id);
    if (item) {
      item.quantidade += quantidade;
    } else {
      carrinho.push({ produtoId: produto.id, quantidade });
    }
    return getOrder();
  }

  function increaseQuantity(produtoId) {
    const item = carrinho.find((i) => i.produtoId === Number(produtoId));
    if (item) {
      item.quantidade += 1;
    }
    return getOrder();
  }

  function decreaseQuantity(produtoId) {
    const item = carrinho.find((i) => i.produtoId === Number(produtoId));
    if (item) {
      item.quantidade -= 1;
      if (item.quantidade <= 0) {
        removeFromOrder(produtoId);
      }
    }
    return getOrder();
  }

  function removeFromOrder(produtoId) {
    carrinho = carrinho.filter((i) => i.produtoId !== Number(produtoId));
    return getOrder();
  }

  function clearOrder() {
    carrinho = [];
    return getOrder();
  }

  function getOrder() {
    return carrinho.map((i) => {
      const produto = buscarProdutoPorId(i.produtoId);
      return {
        produtoId: i.produtoId,
        nome: produto.nome,
        categoria: produto.categoria,
        precoUnitario: produto.preco,
        quantidade: i.quantidade,
        valorTotalItem: arredonda(produto.preco * i.quantidade)
      };
    });
  }

  // ---------------------------------------------------------------------
  // Taxa do garçom (opcional, 10%)
  // ---------------------------------------------------------------------

  function setCobrarGarcom(valor) {
    cobrarGarcom = Boolean(valor);
    return getTotals();
  }

  function toggleGarcom() {
    cobrarGarcom = !cobrarGarcom;
    return getTotals();
  }

  function isCobrarGarcom() {
    return cobrarGarcom;
  }

  // ---------------------------------------------------------------------
  // Observações do pedido
  // ---------------------------------------------------------------------

  function setObservacoes(texto) {
    observacoes = typeof texto === "string" ? texto.slice(0, 300) : "";
    return observacoes;
  }

  function getObservacoes() {
    return observacoes;
  }

  // ---------------------------------------------------------------------
  // Forma de pagamento + troco
  // ---------------------------------------------------------------------

  function getFormasPagamento() {
    return Object.keys(FORMAS_PAGAMENTO).map((id) => ({
      id,
      label: FORMAS_PAGAMENTO[id]
    }));
  }

  function setFormaPagamento(forma) {
    if (!forma) {
      formaPagamento = "";
      valorPago = null;
      return { sucesso: true, formaPagamento };
    }
    if (!FORMAS_PAGAMENTO[forma]) {
      return { sucesso: false, erro: "Forma de pagamento inválida." };
    }
    formaPagamento = forma;
    if (forma !== "dinheiro") {
      valorPago = null;
    }
    return { sucesso: true, formaPagamento };
  }

  function getFormaPagamento() {
    return formaPagamento;
  }

  function setValorPago(valor) {
    const numero = Number(valor);
    valorPago = valor === "" || valor === null || isNaN(numero) ? null : arredonda(numero);
    return valorPago;
  }

  function getValorPago() {
    return valorPago;
  }

  // ---------------------------------------------------------------------
  // Cupom de desconto
  // ---------------------------------------------------------------------

  function aplicarCupom(codigoDigitado) {
    const codigo = String(codigoDigitado || "").trim().toUpperCase();
    if (!codigo) {
      return { sucesso: false, erro: "Informe um código de cupom." };
    }
    const cupom = CUPONS_VALIDOS[codigo];
    if (!cupom) {
      return { sucesso: false, erro: "Cupom inválido ou expirado." };
    }
    cupomAtual = { codigo, desconto: cupom.desconto, descricao: cupom.descricao };
    return { sucesso: true, cupom: cupomAtual, totais: getTotals() };
  }

  function removerCupom() {
    cupomAtual = null;
    return getTotals();
  }

  function getCupomAtual() {
    return cupomAtual;
  }

  // ---------------------------------------------------------------------
  // Cálculos do pedido
  // ---------------------------------------------------------------------

  function getTotals() {
    const subtotal = arredonda(
      getOrder().reduce((soma, item) => soma + item.valorTotalItem, 0)
    );

    const desconto = cupomAtual ? arredonda(subtotal * cupomAtual.desconto) : 0;
    const baseComDesconto = arredonda(subtotal - desconto);

    const taxaGarcom = cobrarGarcom ? arredonda(baseComDesconto * TAXA_GARCOM) : 0;
    const total = arredonda(baseComDesconto + taxaGarcom);

    let troco = null;
    if (formaPagamento === "dinheiro" && valorPago !== null) {
      troco = arredonda(valorPago - total);
    }

    return {
      subtotal,
      desconto,
      cupom: cupomAtual,
      cobrarGarcom,
      taxaGarcom,
      total,
      formaPagamento,
      formaPagamentoLabel: FORMAS_PAGAMENTO[formaPagamento] || "",
      valorPago,
      troco
    };
  }

  // ---------------------------------------------------------------------
  // Dados do cliente
  // ---------------------------------------------------------------------

  function setCustomerInfo(nome, mesa) {
    const nomeValido = typeof nome === "string" && nome.trim().length > 0;
    const mesaValida =
      (typeof mesa === "string" && mesa.trim().length > 0) ||
      (typeof mesa === "number" && !isNaN(mesa));

    if (!nomeValido || !mesaValida) {
      return {
        sucesso: false,
        erro: "Informe o nome do cliente e o número da mesa."
      };
    }

    cliente = { nome: nome.trim(), mesa: String(mesa).trim() };
    return { sucesso: true, cliente };
  }

  function getCustomerInfo() {
    return cliente;
  }

  // ---------------------------------------------------------------------
  // Validação antes da tela de confirmação
  // ---------------------------------------------------------------------

  // Verifica se o pedido está pronto para ir para a tela de confirmação
  // (não finaliza nem gera número de pedido — apenas valida).
  function validarPedido() {
    if (carrinho.length === 0) {
      return { sucesso: false, erro: "O pedido está vazio." };
    }
    if (!cliente.nome || !cliente.mesa) {
      return {
        sucesso: false,
        erro: "Informe o nome do cliente e o número da mesa."
      };
    }
    if (!formaPagamento) {
      return { sucesso: false, erro: "Selecione uma forma de pagamento." };
    }
    if (formaPagamento === "dinheiro") {
      const totais = getTotals();
      if (valorPago === null || valorPago < totais.total) {
        return {
          sucesso: false,
          erro: "Informe um valor pago em dinheiro suficiente para cobrir o total."
        };
      }
    }
    return { sucesso: true };
  }

  // Monta um resumo de pré-visualização (sem número de pedido/data), usado
  // na tela "Confirme seu pedido" antes da finalização definitiva.
  function getPreviaResumo() {
    const totais = getTotals();
    return {
      cliente: { ...cliente },
      itens: getOrder(),
      observacoes,
      subtotal: totais.subtotal,
      cupom: totais.cupom,
      desconto: totais.desconto,
      cobrarGarcom: totais.cobrarGarcom,
      taxaGarcom: totais.taxaGarcom,
      total: totais.total,
      formaPagamento: totais.formaPagamento,
      formaPagamentoLabel: totais.formaPagamentoLabel,
      valorPago: totais.valorPago,
      troco: totais.troco
    };
  }

  // ---------------------------------------------------------------------
  // Finalização do pedido
  // ---------------------------------------------------------------------

  function finalizeOrder() {
    const validacao = validarPedido();
    if (!validacao.sucesso) {
      return validacao;
    }

    const totais = getTotals();
    const numeroPedido = gerarNumeroPedido();

    const resumo = {
      numeroPedido,
      cliente: { ...cliente },
      itens: getOrder(),
      observacoes,
      subtotal: totais.subtotal,
      cupom: totais.cupom,
      desconto: totais.desconto,
      cobrarGarcom: totais.cobrarGarcom,
      taxaGarcom: totais.taxaGarcom,
      total: totais.total,
      formaPagamento: totais.formaPagamento,
      formaPagamentoLabel: totais.formaPagamentoLabel,
      valorPago: totais.valorPago,
      troco: totais.troco,
      dataHora: new Date().toISOString()
    };

    historico.unshift(resumo);

    return { sucesso: true, resumo };
  }

  function gerarNumeroPedido() {
    return "PED-" + Date.now().toString().slice(-6);
  }

  // ---------------------------------------------------------------------
  // Histórico de pedidos
  // ---------------------------------------------------------------------

  function getHistorico() {
    return historico;
  }

  function carregarHistorico(lista) {
    if (Array.isArray(lista)) {
      historico = lista;
    }
  }

  function limparHistorico() {
    historico = [];
  }

  // ---------------------------------------------------------------------
  // Reset para um novo pedido (mantém histórico e tema, zera o resto)
  // ---------------------------------------------------------------------

  function resetParaNovoPedido() {
    carrinho = [];
    cobrarGarcom = true;
    observacoes = "";
    formaPagamento = "";
    valorPago = null;
    cupomAtual = null;
    return getTotals();
  }

  // ---------------------------------------------------------------------
  // API pública do módulo
  // ---------------------------------------------------------------------

  return {
    // catálogo
    getAllProducts,
    getCategorias,
    filterByCategory,
    searchProducts,
    // carrinho
    addToOrder,
    increaseQuantity,
    decreaseQuantity,
    removeFromOrder,
    clearOrder,
    getOrder,
    // garçom
    setCobrarGarcom,
    toggleGarcom,
    isCobrarGarcom,
    // observações
    setObservacoes,
    getObservacoes,
    // pagamento / troco
    getFormasPagamento,
    setFormaPagamento,
    getFormaPagamento,
    setValorPago,
    getValorPago,
    // cupom
    aplicarCupom,
    removerCupom,
    getCupomAtual,
    // totais
    getTotals,
    // cliente
    setCustomerInfo,
    getCustomerInfo,
    // confirmação / finalização
    validarPedido,
    getPreviaResumo,
    finalizeOrder,
    // histórico
    getHistorico,
    carregarHistorico,
    limparHistorico,
    // reset
    resetParaNovoPedido
  };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = CardapioApp;
}
if (typeof window !== "undefined") {
  window.CardapioApp = CardapioApp;
}