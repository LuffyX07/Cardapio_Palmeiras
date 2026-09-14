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
   
    const TAXA_GARCOM = 0.10;
   
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
   
    // Retorna todos os produtos.
    function getAllProducts() {
      return MENU_DATA;
    }
   
    // Retorna a lista de categorias, na ordem fixa exigida pela atividade.
    function getCategorias() {
      return CATEGORIAS;
    }
   
    // Retorna apenas os produtos de uma categoria específica.
    // categoria === "TODAS" (ou vazio/undefined) retorna o cardápio completo.
    function filterByCategory(categoria) {
      if (!categoria || categoria === "TODAS") {
        return MENU_DATA;
      }
      return MENU_DATA.filter((p) => p.categoria === categoria);
    }
   
    // Pesquisa produtos pelo nome (case-insensitive, ignora acentuação básica).
    // Pode ser combinada com uma categoria opcional.
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
   
    // Adiciona um produto ao pedido. Se já existir, incrementa a quantidade.
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
   
    // Aumenta em 1 a quantidade de um item já presente no pedido.
    function increaseQuantity(produtoId) {
      const item = carrinho.find((i) => i.produtoId === Number(produtoId));
      if (item) {
        item.quantidade += 1;
      }
      return getOrder();
    }
   
    // Diminui em 1 a quantidade de um item. Remove o item se chegar a 0.
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
   
    // Remove completamente um produto do pedido.
    function removeFromOrder(produtoId) {
      carrinho = carrinho.filter((i) => i.produtoId !== Number(produtoId));
      return getOrder();
    }
   
    // Esvazia o pedido inteiro (útil após finalizar ou para "limpar carrinho").
    function clearOrder() {
      carrinho = [];
      return getOrder();
    }
   
    // Retorna o pedido atual já com os dados do produto e valor total do item,
    // pronto para o front renderizar a área "Meu Pedido".
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
    // Cálculos do pedido
    // ---------------------------------------------------------------------
   
    // Retorna { subtotal, taxaGarcom, cobrarGarcom, total }
    function getTotals() {
      const subtotal = arredonda(
        getOrder().reduce((soma, item) => soma + item.valorTotalItem, 0)
      );
      const taxaGarcom = cobrarGarcom ? arredonda(subtotal * TAXA_GARCOM) : 0;
      const total = arredonda(subtotal + taxaGarcom);
   
      return {
        subtotal,
        taxaGarcom,
        cobrarGarcom,
        total
      };
    }
   
    // ---------------------------------------------------------------------
    // Dados do cliente
    // ---------------------------------------------------------------------
   
    // Define nome do cliente e número da mesa. Retorna erro se algum estiver vazio.
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
    // Finalização do pedido
    // ---------------------------------------------------------------------
   
    // Gera o resumo final do pedido. Retorna { sucesso: false, erro } se
    // faltar algo obrigatório (carrinho vazio ou dados do cliente).
    function finalizeOrder() {
      if (carrinho.length === 0) {
        return { sucesso: false, erro: "O pedido está vazio." };
      }
      if (!cliente.nome || !cliente.mesa) {
        return {
          sucesso: false,
          erro: "Informe o nome do cliente e o número da mesa antes de finalizar."
        };
      }
   
      const totais = getTotals();
      const numeroPedido = gerarNumeroPedido();
   
      const resumo = {
        numeroPedido,
        cliente: { ...cliente },
        itens: getOrder(),
        subtotal: totais.subtotal,
        cobrarGarcom: totais.cobrarGarcom,
        taxaGarcom: totais.taxaGarcom,
        total: totais.total,
        dataHora: new Date().toISOString()
      };
   
      return { sucesso: true, resumo };
    }
   
    function gerarNumeroPedido() {
      return "PED-" + Date.now().toString().slice(-6);
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
      // totais
      getTotals,
      // cliente
      setCustomerInfo,
      getCustomerInfo,
      // finalização
      finalizeOrder
    };
  })();
   
  if (typeof module !== "undefined" && module.exports) {
    module.exports = CardapioApp;
  }
  if (typeof window !== "undefined") {
    window.CardapioApp = CardapioApp;
  }
   