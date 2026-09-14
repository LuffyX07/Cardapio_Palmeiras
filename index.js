/* ---------------------------------------------------------------------
   front.js — camada de apresentação (DOM) do Cardápio Digital
   Não guarda regra de negócio: tudo passa por window.CardapioApp
   (definido em script.js, que por sua vez usa MENU_DATA/CATEGORIAS de
   banco.js).
--------------------------------------------------------------------- */

(function () {
  "use strict";

  const app = window.CardapioApp;

  // --------------------------------------------------------------
  // Referências de DOM
  // --------------------------------------------------------------
  const el = {
    categoryTabs: document.getElementById("category-tabs"),
    searchInput: document.getElementById("search-input"),
    sortSelect: document.getElementById("sort-select"),
    priceMax: document.getElementById("price-max"),
    priceMaxLabel: document.getElementById("price-max-label"),
    resultsCount: document.getElementById("results-count"),
    emptyState: document.getElementById("empty-state"),
    productGrid: document.getElementById("product-grid"),

    orderItems: document.getElementById("order-items"),
    orderEmpty: document.getElementById("order-empty"),
    subtotalValue: document.getElementById("subtotal-value"),
    garcomCheckbox: document.getElementById("garcom-checkbox"),
    garcomRow: document.getElementById("garcom-row"),
    garcomValue: document.getElementById("garcom-value"),
    totalValue: document.getElementById("total-value"),
    descontoRow: document.getElementById("desconto-row"),
    descontoValue: document.getElementById("desconto-value"),
    cupomInput: document.getElementById("cupom-input"),
    btnAplicarCupom: document.getElementById("btn-aplicar-cupom"),
    cupomFeedback: document.getElementById("cupom-feedback"),
    cupomAplicado: document.getElementById("cupom-aplicado"),
    cupomAplicadoTexto: document.getElementById("cupom-aplicado-texto"),
    btnRemoverCupom: document.getElementById("btn-remover-cupom"),
    pagamentoSelect: document.getElementById("pagamento-select"),
    trocoBlock: document.getElementById("troco-block"),
    valorPagoInput: document.getElementById("valor-pago-input"),
    trocoInfo: document.getElementById("troco-info"),

    customerForm: document.getElementById("customer-form"),
    clienteNome: document.getElementById("cliente-nome"),
    clienteMesa: document.getElementById("cliente-mesa"),
    formError: document.getElementById("form-error"),
    btnFinalizar: document.getElementById("btn-finalizar"),

    modalOverlay: document.getElementById("modal-overlay"),
    modalClose: document.getElementById("modal-close"),
    resumoNumero: document.getElementById("modal-title"),
    resumoCliente: document.getElementById("resumo-cliente"),
    resumoItens: document.getElementById("resumo-itens"),
    resumoTotais: document.getElementById("resumo-totais"),
    btnNovoPedido: document.getElementById("btn-novo-pedido"),

    themeToggle: document.getElementById("theme-toggle"),
    toast: document.getElementById("toast"),
  };

  // --------------------------------------------------------------
  // Estado local de navegação (filtros de tela — não é regra de negócio)
  // --------------------------------------------------------------
  const state = {
    categoriaAtual: "TODAS",
    termoBusca: "",
    ordenacao: "padrao",
    precoMax: null,
  };

  const STORAGE_KEY = "cardapio-palmeiras:v1";

  // --------------------------------------------------------------
  // Utilitários
  // --------------------------------------------------------------
  function formatarMoeda(valor) {
    return "R$ " + Number(valor).toFixed(2).replace(".", ",");
  }

  function escapeHtml(texto) {
    const div = document.createElement("div");
    div.textContent = String(texto);
    return div.innerHTML;
  }

  function mostrarToast(mensagem) {
    el.toast.textContent = mensagem;
    el.toast.hidden = false;
    clearTimeout(mostrarToast._t);
    mostrarToast._t = setTimeout(() => {
      el.toast.hidden = true;
    }, 1600);
  }

  // --------------------------------------------------------------
  // Persistência simples em localStorage (desafio extra)
  // Guarda apenas o carrinho + preferências de tela; toda a lógica
  // de cálculo continua vindo do CardapioApp.
  // --------------------------------------------------------------
  function salvarEstado() {
    try {
      const pedido = app.getOrder().map((i) => ({
        produtoId: i.produtoId,
        quantidade: i.quantidade,
      }));
      const cliente = app.getCustomerInfo();
      const dados = {
        pedido,
        cobrarGarcom: app.isCobrarGarcom(),
        cliente,
        formaPagamento: app.getFormaPagamento(),
        valorPago: app.getValorPago(),
        cupom: app.getCupomAtual(),
        tema: document.documentElement.classList.contains("light") ? "light" : "dark",
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
    } catch (e) {
      /* localStorage indisponível — segue sem persistir */
    }
  }

  function carregarEstado() {
    try {
      const bruto = localStorage.getItem(STORAGE_KEY);
      if (!bruto) return;
      const dados = JSON.parse(bruto);

      if (dados.tema === "light") {
        document.documentElement.classList.add("light");
        el.themeToggle.querySelector(".theme-toggle-icon").textContent = "☀";
      }

      if (Array.isArray(dados.pedido)) {
        dados.pedido.forEach((item) => {
          try {
            app.addToOrder(item.produtoId, item.quantidade);
          } catch (e) {
            /* produto pode não existir mais — ignora */
          }
        });
      }

      if (typeof dados.cobrarGarcom === "boolean") {
        app.setCobrarGarcom(dados.cobrarGarcom);
      }

      if (dados.cliente && (dados.cliente.nome || dados.cliente.mesa)) {
        el.clienteNome.value = dados.cliente.nome || "";
        el.clienteMesa.value = dados.cliente.mesa || "";
      }

      if (dados.formaPagamento) {
        app.setFormaPagamento(dados.formaPagamento);
        if (dados.formaPagamento === "dinheiro" && dados.valorPago !== null && dados.valorPago !== undefined) {
          app.setValorPago(dados.valorPago);
        }
      }

      if (dados.cupom && dados.cupom.codigo) {
        app.aplicarCupom(dados.cupom.codigo);
      }
    } catch (e) {
      /* dados corrompidos — ignora e começa do zero */
    }
  }

  // --------------------------------------------------------------
  // Categorias
  // --------------------------------------------------------------
  function renderCategoryTabs() {
    const categorias = ["TODAS", ...app.getCategorias()];
    el.categoryTabs.innerHTML = "";

    categorias.forEach((categoria) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "category-tab" + (categoria === state.categoriaAtual ? " active" : "");
      btn.textContent = categoria === "TODAS" ? "Todas" : capitalizarCategoria(categoria);
      btn.addEventListener("click", () => {
        state.categoriaAtual = categoria;
        renderCategoryTabs();
        renderProducts();
      });
      el.categoryTabs.appendChild(btn);
    });
  }

  function capitalizarCategoria(categoria) {
    return categoria
      .toLowerCase()
      .split(" ")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ");
  }

  // --------------------------------------------------------------
  // Produtos / pesquisa / filtros / ordenação
  // --------------------------------------------------------------
  function inicializarFaixaDePreco() {
    const precos = app.getAllProducts().map((p) => p.preco);
    const maximo = Math.ceil(Math.max(...precos));
    el.priceMax.min = 0;
    el.priceMax.max = maximo;
    el.priceMax.value = maximo;
    state.precoMax = maximo;
    el.priceMaxLabel.textContent = formatarMoeda(maximo);
  }

  function getProdutosFiltrados() {
    const categoriaFiltro = state.categoriaAtual === "TODAS" ? undefined : state.categoriaAtual;

    let lista = state.termoBusca
      ? app.searchProducts(state.termoBusca, categoriaFiltro)
      : app.filterByCategory(categoriaFiltro);

    if (state.precoMax !== null) {
      lista = lista.filter((p) => p.preco <= state.precoMax);
    }

    lista = lista.slice();
    switch (state.ordenacao) {
      case "nome-asc":
        lista.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
        break;
      case "preco-asc":
        lista.sort((a, b) => a.preco - b.preco);
        break;
      case "preco-desc":
        lista.sort((a, b) => b.preco - a.preco);
        break;
      default:
        lista.sort((a, b) => a.id - b.id);
    }

    return lista;
  }

  function renderProducts() {
    const produtos = getProdutosFiltrados();

    el.resultsCount.textContent =
      produtos.length === 1 ? "1 item" : produtos.length + " itens";

    if (produtos.length === 0) {
      el.emptyState.hidden = false;
      el.productGrid.innerHTML = "";
      return;
    }
    el.emptyState.hidden = true;

    el.productGrid.innerHTML = produtos
      .map(
        (p) => `
      <article class="product-card" data-id="${p.id}">
        <div class="product-card-top">
          <p class="product-name">${escapeHtml(p.nome)}</p>
        </div>
        <p class="product-desc">${escapeHtml(p.descricao)}</p>
        <span class="product-tag">${escapeHtml(capitalizarCategoria(p.categoria))}</span>
        <div class="product-card-bottom">
          <span class="product-price">${formatarMoeda(p.preco)}</span>
          <button type="button" class="btn-add" data-add="${p.id}" aria-label="Adicionar ${escapeHtml(p.nome)} ao pedido">+</button>
        </div>
      </article>`
      )
      .join("");
  }

  el.productGrid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    const id = Number(btn.getAttribute("data-add"));
    app.addToOrder(id);
    renderCart();
    salvarEstado();
    const produto = app.getAllProducts().find((p) => p.id === id);
    mostrarToast((produto ? produto.nome : "Item") + " adicionado ao pedido");
  });

  el.searchInput.addEventListener("input", (e) => {
    state.termoBusca = e.target.value;
    renderProducts();
  });

  el.sortSelect.addEventListener("change", (e) => {
    state.ordenacao = e.target.value;
    renderProducts();
  });

  el.priceMax.addEventListener("input", (e) => {
    state.precoMax = Number(e.target.value);
    el.priceMaxLabel.textContent = formatarMoeda(state.precoMax);
    renderProducts();
  });

  // --------------------------------------------------------------
  // Carrinho / "Meu Pedido"
  // --------------------------------------------------------------
  function renderCart() {
    const itens = app.getOrder();

    if (itens.length === 0) {
      el.orderEmpty.hidden = false;
      el.orderItems.innerHTML = "";
    } else {
      el.orderEmpty.hidden = true;
      el.orderItems.innerHTML = itens
        .map(
          (item) => `
        <li class="order-item" data-id="${item.produtoId}">
          <p class="order-item-name">${escapeHtml(item.nome)}</p>
          <span class="order-item-total">${formatarMoeda(item.valorTotalItem)}</span>
          <span class="order-item-unit">${formatarMoeda(item.precoUnitario)} un.</span>
          <div class="order-item-controls">
            <button type="button" class="qty-btn" data-dec="${item.produtoId}" aria-label="Diminuir quantidade">−</button>
            <span class="qty-value">${item.quantidade}</span>
            <button type="button" class="qty-btn" data-inc="${item.produtoId}" aria-label="Aumentar quantidade">+</button>
            <button type="button" class="remove-btn" data-remove="${item.produtoId}">remover</button>
          </div>
        </li>`
        )
        .join("");
    }

    renderTotals();
  }

  function renderTotals() {
    const totais = app.getTotals();
    el.subtotalValue.textContent = formatarMoeda(totais.subtotal);
    el.garcomValue.textContent = formatarMoeda(totais.taxaGarcom);
    el.totalValue.textContent = formatarMoeda(totais.total);
    el.garcomCheckbox.checked = totais.cobrarGarcom;
    el.garcomRow.style.opacity = totais.cobrarGarcom ? "1" : "0.45";

    el.descontoRow.hidden = totais.desconto <= 0;
    el.descontoValue.textContent = "− " + formatarMoeda(totais.desconto);

    const cupom = totais.cupom;
    el.cupomAplicado.hidden = !cupom;
    el.cupomAplicadoTexto.textContent = cupom
      ? cupom.codigo + " • " + cupom.descricao
      : "";

    const forma = totais.formaPagamento;
    el.pagamentoSelect.value = forma || "";
    el.trocoBlock.hidden = forma !== "dinheiro";

    if (forma === "dinheiro") {
      const valorPago = totais.valorPago;
      if (valorPago === null) {
        el.trocoInfo.textContent = "Informe quanto o cliente vai pagar para calcular o troco.";
        el.trocoInfo.className = "troco-info troco-pendente";
      } else if (totais.troco >= 0) {
        el.trocoInfo.textContent = "Troco: " + formatarMoeda(totais.troco);
        el.trocoInfo.className = "troco-info troco-ok";
      } else {
        el.trocoInfo.textContent = "Valor insuficiente. Faltam " + formatarMoeda(Math.abs(totais.troco)) + ".";
        el.trocoInfo.className = "troco-info troco-erro";
      }
    } else {
      el.trocoInfo.textContent = "";
      el.trocoInfo.className = "troco-info";
    }
  }

  function renderFormasPagamento() {
    const formas = app.getFormasPagamento();
    el.pagamentoSelect.innerHTML = '<option value="">Selecione uma forma de pagamento</option>' +
      formas.map((forma) => `<option value="${forma.id}">${escapeHtml(forma.label)}</option>`).join("");
  }

  function mostrarFeedbackCupom(mensagem, sucesso) {
    el.cupomFeedback.textContent = mensagem;
    el.cupomFeedback.hidden = !mensagem;
    el.cupomFeedback.className = "cupom-feedback " + (sucesso ? "cupom-sucesso" : "cupom-erro");
  }

  el.btnAplicarCupom.addEventListener("click", () => {
    const resultado = app.aplicarCupom(el.cupomInput.value);
    if (!resultado.sucesso) {
      mostrarFeedbackCupom(resultado.erro, false);
      el.cupomInput.focus();
      return;
    }
    el.cupomInput.value = resultado.cupom.codigo;
    mostrarFeedbackCupom("Cupom aplicado com sucesso!", true);
    renderTotals();
    salvarEstado();
  });

  el.cupomInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      el.btnAplicarCupom.click();
    }
  });

  el.btnRemoverCupom.addEventListener("click", () => {
    app.removerCupom();
    el.cupomInput.value = "";
    mostrarFeedbackCupom("Cupom removido.", true);
    renderTotals();
    salvarEstado();
  });

  el.pagamentoSelect.addEventListener("change", (e) => {
    const resultado = app.setFormaPagamento(e.target.value);
    if (!resultado.sucesso) {
      mostrarToast(resultado.erro);
      return;
    }
    if (e.target.value !== "dinheiro") {
      el.valorPagoInput.value = "";
    }
    renderTotals();
    salvarEstado();
  });

  el.valorPagoInput.addEventListener("input", (e) => {
    app.setValorPago(e.target.value);
    renderTotals();
    salvarEstado();
  });

  el.orderItems.addEventListener("click", (e) => {
    const incBtn = e.target.closest("[data-inc]");
    const decBtn = e.target.closest("[data-dec]");
    const removeBtn = e.target.closest("[data-remove]");

    if (incBtn) {
      app.increaseQuantity(Number(incBtn.getAttribute("data-inc")));
    } else if (decBtn) {
      app.decreaseQuantity(Number(decBtn.getAttribute("data-dec")));
    } else if (removeBtn) {
      app.removeFromOrder(Number(removeBtn.getAttribute("data-remove")));
    } else {
      return;
    }
    renderCart();
    salvarEstado();
  });

  el.garcomCheckbox.addEventListener("change", (e) => {
    app.setCobrarGarcom(e.target.checked);
    renderTotals();
    salvarEstado();
  });

  // --------------------------------------------------------------
  // Dados do cliente + finalização do pedido
  // --------------------------------------------------------------
  function mostrarErroFormulario(mensagem) {
    el.formError.textContent = mensagem;
    el.formError.hidden = false;
  }

  function limparErroFormulario() {
    el.formError.hidden = true;
    el.formError.textContent = "";
  }

  el.customerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    limparErroFormulario();

    const nome = el.clienteNome.value;
    const mesa = el.clienteMesa.value;

    const infoResult = app.setCustomerInfo(nome, mesa);
    if (!infoResult.sucesso) {
      mostrarErroFormulario(infoResult.erro);
      return;
    }

    const resultado = app.finalizeOrder();
    if (!resultado.sucesso) {
      mostrarErroFormulario(resultado.erro);
      return;
    }

    salvarEstado();
    mostrarResumoModal(resultado.resumo);
  });

  function mostrarResumoModal(resumo) {
    el.resumoNumero.textContent = "Pedido " + resumo.numeroPedido;

    el.resumoCliente.innerHTML = `
      <dt>Cliente</dt><dd>${escapeHtml(resumo.cliente.nome)}</dd>
      <dt>Mesa</dt><dd>${escapeHtml(resumo.cliente.mesa)}</dd>
    `;

    el.resumoItens.innerHTML = resumo.itens
      .map(
        (item) => `
      <li>
        <span class="resumo-item-nome">${escapeHtml(item.nome)}</span>
        <span class="resumo-item-qtd">${item.quantidade}× ${formatarMoeda(item.valorTotalItem)}</span>
      </li>`
      )
      .join("");

    let totaisHtml = `
      <div class="totals-row"><span>Subtotal</span><span>${formatarMoeda(resumo.subtotal)}</span></div>`;
    if (resumo.desconto > 0) {
      totaisHtml += `<div class="totals-row desconto-resumo"><span>Desconto${resumo.cupom ? ` (${escapeHtml(resumo.cupom.codigo)})` : ""}</span><span>− ${formatarMoeda(resumo.desconto)}</span></div>`;
    }
    if (resumo.cobrarGarcom) {
      totaisHtml += `<div class="totals-row"><span>Garçom (10%)</span><span>${formatarMoeda(resumo.taxaGarcom)}</span></div>`;
    }
    totaisHtml += `<div class="totals-row total-row"><span>Total</span><span>${formatarMoeda(resumo.total)}</span></div>`;
    el.resumoTotais.innerHTML = totaisHtml;

    const pagamentoTexto = resumo.formaPagamentoLabel || "Não informado";
    let pagamentoHtml = `<strong>Pagamento:</strong> ${escapeHtml(pagamentoTexto)}`;
    if (resumo.formaPagamento === "dinheiro" && resumo.valorPago !== null) {
      pagamentoHtml += ` • Pago: ${formatarMoeda(resumo.valorPago)} • Troco: ${formatarMoeda(resumo.troco)}`;
    }
    const resumoPagamento = document.getElementById("resumo-pagamento");
    if (resumoPagamento) resumoPagamento.innerHTML = pagamentoHtml;

    el.modalOverlay.hidden = false;
  }

  el.modalClose.addEventListener("click", () => {
    el.modalOverlay.hidden = true;
  });

  el.modalOverlay.addEventListener("click", (e) => {
    if (e.target === el.modalOverlay) {
      el.modalOverlay.hidden = true;
    }
  });

  el.btnNovoPedido.addEventListener("click", () => {
    app.clearOrder();
    app.setCobrarGarcom(true);
    el.customerForm.reset();
    limparErroFormulario();
    el.modalOverlay.hidden = true;
    renderCart();
    salvarEstado();
  });

  // --------------------------------------------------------------
  // Tema claro / escuro
  // --------------------------------------------------------------
  el.themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.classList.toggle("light");
    el.themeToggle.querySelector(".theme-toggle-icon").textContent = isLight ? "☀" : "☾";
    salvarEstado();
  });

  // --------------------------------------------------------------
  // Inicialização
  // --------------------------------------------------------------
  function iniciar() {
    if (!app) {
      console.error("CardapioApp não encontrado. Verifique a ordem dos <script> no HTML.");
      return;
    }
    inicializarFaixaDePreco();
    renderFormasPagamento();
    carregarEstado();
    renderCategoryTabs();
    renderProducts();
    renderCart();
  }

  document.addEventListener("DOMContentLoaded", iniciar);
})();
