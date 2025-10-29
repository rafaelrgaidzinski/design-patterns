// ==================== PADRÃO COMPOSITE ====================
// O Composite permite tratar objetos individuais e composições de objetos de forma uniforme.
// Cria uma estrutura de árvore onde tanto folhas (objetos simples) quanto galhos (composições)
// compartilham a mesma interface, permitindo que o cliente os trate da mesma forma.


// COMPONENTE BASE: Define a interface comum para objetos simples e compostos
class Components {
  draw() {
    throw new Error("Método abstrato");
  }
}


// FOLHA (Leaf): Componente simples que não pode conter outros componentes
class Button extends Components {
  constructor(label) {
    super();
    this.label = label;
  }

  // Implementa draw() para realizar o comportamento específico de Button
  draw() {
    console.log(`Botão: [${this.label}]`);
  }
}

// FOLHA (Leaf): Outro componente simples
class Text extends Components {
  constructor(content) {
    super();
    this.content = content;
  }

  // Implementa draw() para realizar o comportamento específico de Text
  draw() {
    console.log(`Texto: "${this.content}"`);
  }
}


// COMPOSTO (Composite): Pode conter outros componentes (folhas ou compostos)
// PROBLEMA NO CÓDIGO: Panel não implementa a interface Components
// Isso quebra o padrão Composite, pois obriga verificações de tipo no render()
class Panel {
  constructor(name) {
    this.name = name;
    this.children = []; // Armazena componentes filhos
  }

  // Adiciona componentes filhos (podem ser folhas ou outros compostos)
  add(child) {
    this.children.push(child);
  }

  // PROBLEMA: render() precisa verificar o tipo de cada filho manualmente
  // Isso viola o princípio do Composite de tratar todos os componentes uniformemente
  render() {
    console.log(`Painel: ${this.name}`);
    this.children.forEach((child) => {
      // Verificações de tipo - isso NÃO deveria ser necessário em um Composite bem implementado
      if (child instanceof Button) {
        child.draw();
      } else if (child instanceof Text) {
        child.draw();
      } else if (child instanceof Panel) {
        child.render(); // Panel usa render() ao invés de draw()
      }
    });
  }
}


// Cliente: Monta a estrutura de árvore
const loginPanel = new Panel("Painel de Login");
loginPanel.add(new Text("Tela de Login"));    // Adiciona folha
loginPanel.add(new Button("Entrar"));         // Adiciona folha
loginPanel.add(new Button("Cancelar"));       // Adiciona folha

const mainPanel = new Panel("Janela Principal");
mainPanel.add(loginPanel);                    // Adiciona composto (painel dentro de painel)
mainPanel.add(new Text("Versão 1.0.0"));      // Adiciona folha

mainPanel.render();


// ==================== VERSÃO CORRIGIDA DO COMPOSITE ====================
/*
class Panel extends Components {  // Panel agora herda de Components
  constructor(name) {
    super();
    this.name = name;
    this.children = [];
  }

  add(child) {
    this.children.push(child);
  }

  // Agora usa draw() como todos os outros componentes
  draw() {
    console.log(`Painel: ${this.name}`);
    // Não precisa mais verificar tipos - todos têm draw()
    this.children.forEach(child => child.draw());
  }
}

// Cliente simplificado
mainPanel.draw();  // Trata Panel como qualquer outro componente
*/


// ==================== ESTRUTURA DO PADRÃO ====================
// Component (Components)
//     ↓
//     ├── Leaf (Button, Text)          → Objetos simples
//     └── Composite (Panel)            → Contém outros Components
//
// BENEFÍCIOS:
// 1. Cliente trata objetos simples e compostos uniformemente
// 2. Facilita adicionar novos tipos de componentes
// 3. Estrutura recursiva permite árvores complexas
//
// PROBLEMA NO CÓDIGO ORIGINAL:
// - Panel não herda de Components
// - Panel usa render() em vez de draw()
// - Exige verificações de tipo (instanceof)
