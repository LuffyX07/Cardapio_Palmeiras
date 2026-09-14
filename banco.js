const MENU_DATA = [
  {
    "id": 1,
    "nome": "Bruschetta italiana",
    "descricao": "Pão italiano tostado com tomate, manjericão e azeite",
    "preco": 32.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 2,
    "nome": "Bolinho de bacalhau",
    "descricao": "Porção com 8 unidades, servido com limão",
    "preco": 19.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 3,
    "nome": "Carpaccio de carne",
    "descricao": "Fatias finas de carne com molho de mostarda e parmesão",
    "preco": 24.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 4,
    "nome": "Camarão empanado",
    "descricao": "Camarões empanados fritos com molho tártaro",
    "preco": 23.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 5,
    "nome": "Ceviche de peixe",
    "descricao": "Peixe branco marinado em limão com cebola roxa e coentro",
    "preco": 34.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 6,
    "nome": "Coxinha de frango",
    "descricao": "Porção com 6 unidades de coxinha cremosa",
    "preco": 33.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 7,
    "nome": "Croquete de carne",
    "descricao": "Croquetes de carne moída temperada, porção com 8 unidades",
    "preco": 37.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 8,
    "nome": "Dadinho de tapioca",
    "descricao": "Cubos crocantes de tapioca com queijo coalho",
    "preco": 20.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 9,
    "nome": "Mini escondidinho de camarão",
    "descricao": "Purê de mandioca com camarão gratinado",
    "preco": 27.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 10,
    "nome": "Espeto de frango",
    "descricao": "Espetinhos grelhados com molho barbecue",
    "preco": 19.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 11,
    "nome": "Guacamole com nachos",
    "descricao": "Abacate amassado temperado, acompanha nachos crocantes",
    "preco": 23.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 12,
    "nome": "Hummus com pão sírio",
    "descricao": "Pasta de grão-de-bico com azeite e pão sírio tostado",
    "preco": 29.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 13,
    "nome": "Isca de peixe",
    "descricao": "Tiras de filé de peixe empanadas e fritas",
    "preco": 19.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 14,
    "nome": "Kibe frito",
    "descricao": "Porção com 8 kibes recheados com carne temperada",
    "preco": 23.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 15,
    "nome": "Linguiça acebolada",
    "descricao": "Linguiça artesanal grelhada com cebola caramelizada",
    "preco": 32.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 16,
    "nome": "Mandioca frita",
    "descricao": "Porção de mandioca frita crocante com molho da casa",
    "preco": 30.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 17,
    "nome": "Mexilhões ao molho branco",
    "descricao": "Mexilhões gratinados com molho branco e ervas",
    "preco": 23.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 18,
    "nome": "Ostras gratinadas",
    "descricao": "Ostras frescas gratinadas com queijo e ervas finas",
    "preco": 31.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 19,
    "nome": "Pastel de queijo",
    "descricao": "Porção com 6 pastéis crocantes recheados",
    "preco": 35.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 20,
    "nome": "Pão de alho artesanal",
    "descricao": "Pão francês com manteiga de alho, assado na brasa",
    "preco": 19.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 21,
    "nome": "Patê de fígado com torradas",
    "descricao": "Patê caseiro acompanhado de torradas",
    "preco": 35.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 22,
    "nome": "Polvo grelhado",
    "descricao": "Polvo grelhado com azeite, alho e páprica",
    "preco": 33.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 23,
    "nome": "Queijo coalho grelhado",
    "descricao": "Espetos de queijo coalho grelhado com mel",
    "preco": 26.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 24,
    "nome": "Mini risoto de camarão",
    "descricao": "Porção individual de risoto cremoso de camarão",
    "preco": 22.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 25,
    "nome": "Rolinho primavera",
    "descricao": "Rolinhos crocantes recheados com legumes",
    "preco": 39.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 26,
    "nome": "Salada Caprese",
    "descricao": "Tomate, muçarela de búfala e manjericão fresco",
    "preco": 25.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 27,
    "nome": "Salpicão de frango",
    "descricao": "Salada cremosa de frango desfiado com maionese",
    "preco": 20.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 28,
    "nome": "Tábua de frios",
    "descricao": "Seleção de queijos e frios com geleia",
    "preco": 20.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 29,
    "nome": "Tártaro de atum",
    "descricao": "Atum fresco picado com molho oriental",
    "preco": 36.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 30,
    "nome": "Torresmo crocante",
    "descricao": "Porção de torresmo artesanal crocante",
    "preco": 31.9,
    "categoria": "ENTRADAS"
  },
  {
    "id": 31,
    "nome": "Bife à parmegiana",
    "descricao": "Bife empanado coberto com molho e queijo, acompanha arroz e fritas",
    "preco": 80.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 32,
    "nome": "Bife ancho grelhado",
    "descricao": "Corte nobre grelhado ao ponto, acompanha legumes",
    "preco": 76.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 33,
    "nome": "Cordeiro assado",
    "descricao": "Pernil de cordeiro assado lentamente com ervas",
    "preco": 66.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 34,
    "nome": "Costela no bafo",
    "descricao": "Costela bovina assada lentamente, desfiando ao toque",
    "preco": 88.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 35,
    "nome": "Feijoada completa",
    "descricao": "Feijoada tradicional com acompanhamentos completos",
    "preco": 58.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 36,
    "nome": "Filé ao molho madeira",
    "descricao": "Filé mignon grelhado ao molho madeira",
    "preco": 67.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 37,
    "nome": "Filé mignon grelhado",
    "descricao": "Filé mignon grelhado com arroz e batata rústica",
    "preco": 81.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 38,
    "nome": "Frango à passarinho",
    "descricao": "Frango frito em pedaços temperados com alho",
    "preco": 70.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 39,
    "nome": "Frango xadrez",
    "descricao": "Frango ao molho oriental com pimentões e castanhas",
    "preco": 82.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 40,
    "nome": "Lasanha à bolonhesa",
    "descricao": "Lasanha tradicional com molho bolonhesa e queijo gratinado",
    "preco": 68.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 41,
    "nome": "Linguine ao molho branco",
    "descricao": "Massa linguine com molho branco e camarões",
    "preco": 75.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 42,
    "nome": "Moqueca de peixe",
    "descricao": "Moqueca capixaba de peixe com dendê e leite de coco",
    "preco": 42.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 43,
    "nome": "Nhoque ao sugo",
    "descricao": "Nhoque de batata ao molho de tomate caseiro",
    "preco": 51.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 44,
    "nome": "Paella marinera",
    "descricao": "Paella espanhola com frutos do mar",
    "preco": 54.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 45,
    "nome": "Panqueca de frango",
    "descricao": "Panquecas recheadas com frango e molho de tomate",
    "preco": 43.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 46,
    "nome": "Parmegiana de frango",
    "descricao": "Filé de frango empanado com molho e queijo gratinado",
    "preco": 51.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 47,
    "nome": "Peixe grelhado com legumes",
    "descricao": "Filé de peixe grelhado com legumes salteados",
    "preco": 44.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 48,
    "nome": "Picanha na chapa",
    "descricao": "Picanha grelhada na chapa com farofa e vinagrete",
    "preco": 53.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 49,
    "nome": "Polenta com carne de sol",
    "descricao": "Polenta cremosa com carne de sol desfiada",
    "preco": 71.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 50,
    "nome": "Risoto de camarão",
    "descricao": "Risoto cremoso com camarões grandes",
    "preco": 58.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 51,
    "nome": "Risoto de funghi",
    "descricao": "Risoto cremoso com mix de cogumelos",
    "preco": 58.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 52,
    "nome": "Salmão grelhado",
    "descricao": "Filé de salmão grelhado com molho de maracujá",
    "preco": 50.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 53,
    "nome": "Strogonoff de carne",
    "descricao": "Strogonoff tradicional de carne com arroz e batata palha",
    "preco": 53.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 54,
    "nome": "Strogonoff de frango",
    "descricao": "Strogonoff cremoso de frango com arroz e batata palha",
    "preco": 86.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 55,
    "nome": "Tilápia à milanesa",
    "descricao": "Filé de tilápia empanado e frito",
    "preco": 72.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 56,
    "nome": "Vatapá com camarão",
    "descricao": "Vatapá cremoso baiano com camarões",
    "preco": 70.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 57,
    "nome": "Bacalhau à Brás",
    "descricao": "Bacalhau desfiado com batata palha e ovos",
    "preco": 48.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 58,
    "nome": "Carne de panela",
    "descricao": "Carne bovina cozida lentamente com legumes",
    "preco": 76.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 59,
    "nome": "Churrasco misto",
    "descricao": "Seleção de carnes grelhadas com acompanhamentos",
    "preco": 48.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 60,
    "nome": "Escalope ao molho de champignon",
    "descricao": "Escalope de carne ao molho cremoso de cogumelos",
    "preco": 58.9,
    "categoria": "PRATO PRINCIPAL"
  },
  {
    "id": 61,
    "nome": "Pudim de leite",
    "descricao": "Pudim de leite condensado tradicional",
    "preco": 29.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 62,
    "nome": "Mousse de chocolate",
    "descricao": "Mousse cremoso de chocolate meio amargo",
    "preco": 24.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 63,
    "nome": "Petit gateau",
    "descricao": "Bolinho de chocolate com recheio derretido e sorvete",
    "preco": 23.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 64,
    "nome": "Tiramisù",
    "descricao": "Sobremesa italiana com café e mascarpone",
    "preco": 25.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 65,
    "nome": "Torta de limão",
    "descricao": "Torta gelada de limão com merengue",
    "preco": 27.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 66,
    "nome": "Brownie com sorvete",
    "descricao": "Brownie de chocolate quente com bola de sorvete",
    "preco": 26.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 67,
    "nome": "Sorvete de creme",
    "descricao": "Duas bolas de sorvete de creme artesanal",
    "preco": 18.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 68,
    "nome": "Sorvete de flocos",
    "descricao": "Duas bolas de sorvete de flocos artesanal",
    "preco": 15.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 69,
    "nome": "Cheesecake de frutas vermelhas",
    "descricao": "Cheesecake cremoso com calda de frutas vermelhas",
    "preco": 19.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 70,
    "nome": "Banana caramelizada",
    "descricao": "Banana grelhada com calda de caramelo e canela",
    "preco": 18.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 71,
    "nome": "Doce de leite com queijo",
    "descricao": "Doce de leite cremoso com queijo coalho",
    "preco": 18.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 72,
    "nome": "Pavê de chocolate",
    "descricao": "Pavê cremoso em camadas de chocolate",
    "preco": 29.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 73,
    "nome": "Torta holandesa",
    "descricao": "Torta gelada de chocolate com biscoito",
    "preco": 28.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 74,
    "nome": "Bolo de cenoura com chocolate",
    "descricao": "Fatia de bolo de cenoura com cobertura de chocolate",
    "preco": 19.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 75,
    "nome": "Crème brûlée",
    "descricao": "Creme francês com cobertura de açúcar caramelizado",
    "preco": 24.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 76,
    "nome": "Salada de frutas",
    "descricao": "Mix de frutas frescas da estação",
    "preco": 20.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 77,
    "nome": "Churros com doce de leite",
    "descricao": "Churros crocantes recheados com doce de leite",
    "preco": 28.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 78,
    "nome": "Quindim",
    "descricao": "Doce tradicional de gemas e coco",
    "preco": 21.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 79,
    "nome": "Torta de morango",
    "descricao": "Torta gelada de morango com chantilly",
    "preco": 18.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 80,
    "nome": "Mousse de maracujá",
    "descricao": "Mousse aerado de maracujá",
    "preco": 18.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 81,
    "nome": "Cocada cremosa",
    "descricao": "Cocada tradicional cremosa",
    "preco": 23.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 82,
    "nome": "Rocambole de doce de leite",
    "descricao": "Fatia de rocambole recheado com doce de leite",
    "preco": 18.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 83,
    "nome": "Bolo de rolo",
    "descricao": "Fatia de bolo de rolo tradicional pernambucano",
    "preco": 23.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 84,
    "nome": "Manjar branco",
    "descricao": "Manjar de coco com calda de ameixa",
    "preco": 28.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 85,
    "nome": "Torta de nozes",
    "descricao": "Torta amanteigada com nozes caramelizadas",
    "preco": 20.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 86,
    "nome": "Sagu com vinho",
    "descricao": "Sagu tradicional ao vinho tinto",
    "preco": 18.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 87,
    "nome": "Romeu e Julieta",
    "descricao": "Goiabada com fatias de queijo",
    "preco": 29.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 88,
    "nome": "Bomba de chocolate",
    "descricao": "Bomba recheada com creme e cobertura de chocolate",
    "preco": 22.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 89,
    "nome": "Cannoli siciliano",
    "descricao": "Cannoli crocante recheado com creme doce",
    "preco": 16.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 90,
    "nome": "Panna cotta",
    "descricao": "Sobremesa italiana cremosa com calda de frutas vermelhas",
    "preco": 15.9,
    "categoria": "SOBREMESAS"
  },
  {
    "id": 91,
    "nome": "Água mineral com gás",
    "descricao": "Garrafa 500ml",
    "preco": 9.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 92,
    "nome": "Água mineral sem gás",
    "descricao": "Garrafa 500ml",
    "preco": 24.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 93,
    "nome": "Refrigerante cola",
    "descricao": "Lata 350ml",
    "preco": 28.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 94,
    "nome": "Refrigerante guaraná",
    "descricao": "Lata 350ml",
    "preco": 18.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 95,
    "nome": "Suco de laranja natural",
    "descricao": "Copo 400ml",
    "preco": 7.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 96,
    "nome": "Suco de abacaxi natural",
    "descricao": "Copo 400ml",
    "preco": 16.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 97,
    "nome": "Suco de maracujá natural",
    "descricao": "Copo 400ml",
    "preco": 34.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 98,
    "nome": "Suco de uva natural",
    "descricao": "Copo 400ml",
    "preco": 21.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 99,
    "nome": "Suco de manga natural",
    "descricao": "Copo 400ml",
    "preco": 34.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 100,
    "nome": "Limonada suíça",
    "descricao": "Copo 400ml",
    "preco": 30.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 101,
    "nome": "Chá gelado",
    "descricao": "Copo 400ml, sabores variados",
    "preco": 6.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 102,
    "nome": "Café expresso",
    "descricao": "Dose individual",
    "preco": 26.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 103,
    "nome": "Cappuccino",
    "descricao": "Xícara com espuma cremosa",
    "preco": 25.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 104,
    "nome": "Água tônica",
    "descricao": "Lata 350ml",
    "preco": 21.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 105,
    "nome": "Energético",
    "descricao": "Lata 250ml",
    "preco": 13.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 106,
    "nome": "Milkshake de chocolate",
    "descricao": "Copo 400ml",
    "preco": 24.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 107,
    "nome": "Milkshake de morango",
    "descricao": "Copo 400ml",
    "preco": 9.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 108,
    "nome": "Vitamina de frutas",
    "descricao": "Copo 400ml, sabor à escolha",
    "preco": 18.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 109,
    "nome": "Caipirinha",
    "descricao": "Drink tradicional com cachaça e limão",
    "preco": 19.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 110,
    "nome": "Caipiroska",
    "descricao": "Drink com vodka e frutas",
    "preco": 33.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 111,
    "nome": "Mojito",
    "descricao": "Drink com rum, hortelã e limão",
    "preco": 31.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 112,
    "nome": "Cerveja pilsen",
    "descricao": "Garrafa long neck",
    "preco": 13.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 113,
    "nome": "Cerveja IPA",
    "descricao": "Garrafa long neck",
    "preco": 20.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 114,
    "nome": "Cerveja de trigo",
    "descricao": "Garrafa long neck",
    "preco": 11.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 115,
    "nome": "Chopp",
    "descricao": "Copo 300ml",
    "preco": 32.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 116,
    "nome": "Gin tônica",
    "descricao": "Drink com gin, água tônica e especiarias",
    "preco": 31.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 117,
    "nome": "Whisky dose",
    "descricao": "Dose de whisky nacional",
    "preco": 14.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 118,
    "nome": "Vodka dose",
    "descricao": "Dose de vodka nacional",
    "preco": 24.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 119,
    "nome": "Drink sem álcool",
    "descricao": "Mocktail de frutas",
    "preco": 23.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 120,
    "nome": "Água de coco",
    "descricao": "Copo 400ml gelado",
    "preco": 10.9,
    "categoria": "BEBIDAS"
  },
  {
    "id": 121,
    "nome": "Vinho tinto Cabernet Sauvignon",
    "descricao": "Garrafa 750ml, corpo encorpado",
    "preco": 204.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 122,
    "nome": "Vinho tinto Merlot",
    "descricao": "Garrafa 750ml, aromas frutados",
    "preco": 162.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 123,
    "nome": "Vinho tinto Malbec",
    "descricao": "Garrafa 750ml, origem argentina",
    "preco": 207.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 124,
    "nome": "Vinho tinto Syrah",
    "descricao": "Garrafa 750ml, notas de pimenta e especiarias",
    "preco": 160.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 125,
    "nome": "Vinho tinto Pinot Noir",
    "descricao": "Garrafa 750ml, leve e elegante",
    "preco": 60.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 126,
    "nome": "Vinho tinto Tempranillo",
    "descricao": "Garrafa 750ml, origem espanhola",
    "preco": 121.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 127,
    "nome": "Vinho tinto Sangiovese",
    "descricao": "Garrafa 750ml, origem italiana",
    "preco": 63.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 128,
    "nome": "Vinho branco Chardonnay",
    "descricao": "Garrafa 750ml, notas amanteigadas",
    "preco": 236.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 129,
    "nome": "Vinho branco Sauvignon Blanc",
    "descricao": "Garrafa 750ml, fresco e cítrico",
    "preco": 226.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 130,
    "nome": "Vinho branco Riesling",
    "descricao": "Garrafa 750ml, levemente adocicado",
    "preco": 217.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 131,
    "nome": "Vinho branco Pinot Grigio",
    "descricao": "Garrafa 750ml, leve e seco",
    "preco": 118.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 132,
    "nome": "Vinho branco Moscato",
    "descricao": "Garrafa 750ml, doce e aromático",
    "preco": 70.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 133,
    "nome": "Vinho rosé Provence",
    "descricao": "Garrafa 750ml, estilo francês",
    "preco": 226.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 134,
    "nome": "Vinho rosé nacional",
    "descricao": "Garrafa 750ml, leve e frutado",
    "preco": 239.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 135,
    "nome": "Espumante Brut",
    "descricao": "Garrafa 750ml, seco e elegante",
    "preco": 76.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 136,
    "nome": "Espumante Moscatel",
    "descricao": "Garrafa 750ml, doce e frisante",
    "preco": 152.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 137,
    "nome": "Espumante Rosé",
    "descricao": "Garrafa 750ml, frisante",
    "preco": 73.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 138,
    "nome": "Vinho do Porto",
    "descricao": "Garrafa 750ml, vinho fortificado português",
    "preco": 204.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 139,
    "nome": "Vinho Madeira",
    "descricao": "Garrafa 750ml, vinho fortificado",
    "preco": 205.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 140,
    "nome": "Vinho Chianti",
    "descricao": "Garrafa 750ml, origem toscana",
    "preco": 84.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 141,
    "nome": "Vinho Rioja",
    "descricao": "Garrafa 750ml, origem espanhola",
    "preco": 150.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 142,
    "nome": "Vinho Bordeaux",
    "descricao": "Garrafa 750ml, blend clássico francês",
    "preco": 164.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 143,
    "nome": "Vinho Toscano",
    "descricao": "Garrafa 750ml, origem italiana",
    "preco": 110.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 144,
    "nome": "Vinho Reserva Nacional",
    "descricao": "Garrafa 750ml, envelhecido em carvalho",
    "preco": 225.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 145,
    "nome": "Vinho orgânico tinto",
    "descricao": "Garrafa 750ml, produção orgânica",
    "preco": 140.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 146,
    "nome": "Vinho orgânico branco",
    "descricao": "Garrafa 750ml, produção orgânica",
    "preco": 100.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 147,
    "nome": "Vinho de sobremesa",
    "descricao": "Garrafa 750ml, doce, ideal com sobremesas",
    "preco": 162.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 148,
    "nome": "Champagne Brut",
    "descricao": "Garrafa 750ml, origem francesa",
    "preco": 198.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 149,
    "nome": "Vinho Verde português",
    "descricao": "Garrafa 750ml, leve e frisante",
    "preco": 98.9,
    "categoria": "CARTA DE VINHOS"
  },
  {
    "id": 150,
    "nome": "Vinho Cabernet Franc",
    "descricao": "Garrafa 750ml, notas herbáceas",
    "preco": 119.9,
    "categoria": "CARTA DE VINHOS"
  }
];

// Lista fixa das categorias, na ordem exigida pela atividade.
const CATEGORIAS = ["ENTRADAS", "PRATO PRINCIPAL", "SOBREMESAS", "BEBIDAS", "CARTA DE VINHOS"];

// Exporta os dados para uso em outros arquivos (Node/módulos) e disponibiliza
// globalmente via window para uso direto no navegador pelo front-end.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MENU_DATA, CATEGORIAS };
}
if (typeof window !== 'undefined') {
  window.MENU_DATA = MENU_DATA;
  window.CATEGORIAS = CATEGORIAS;
}