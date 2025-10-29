// ==================== PADRÃO DECORATOR ====================
// O Decorator permite adicionar responsabilidades a um objeto dinamicamente,
// sem modificar sua estrutura original. É uma alternativa flexível à herança
// para estender funcionalidades, permitindo combinações em tempo de execução.


// COMPONENTE BASE: Define a interface básica que será decorada
class MessagePrinter {
  print(text) {
    console.log(text);
  }
}


// DECORATOR BASE: Mantém uma referência ao componente e delega as chamadas
// Implementa a mesma interface do componente base
class PrinterDecorator {
  constructor(printer) {
    // Armazena o componente que será decorado (pode ser o base ou outro decorator)
    // Esta é a chave do padrão: decoradores podem envolver outros decoradores
    this.printer = printer;
  }

  // Delega a chamada para o componente encapsulado
  // Subclasses podem sobrescrever para adicionar comportamento antes/depois
  print(text) {
    this.printer.print(text);
  }
}


// DECORATOR CONCRETO: Adiciona funcionalidade específica (letras maiúsculas)
class UpperCaseDecorator extends PrinterDecorator {
  print(text) {
    // Modifica o texto ANTES de delegar para o próximo componente na cadeia
    super.print(text.toUpperCase());
  }
}


// DECORATOR CONCRETO: Adiciona prefixo ao texto
class PrefixDecorator extends PrinterDecorator {
  print(text) {
    // Modifica o texto adicionando prefixo ANTES de delegar
    super.print(`>>> ${text}`);
  }
}


// DECORATOR CONCRETO: Adiciona sufixo ao texto
class SuffixDecorator extends PrinterDecorator {
  print(text) {
    // Modifica o texto adicionando sufixo ANTES de delegar
    super.print(`${text} <<<`);
  }
}


// Cliente: Usa o componente base sem decoradores
const printer = new MessagePrinter();
printer.print("Olá, mundo!");  // Saída: Olá, mundo!


console.log("\n--- Com decoradores ---\n");


// Cliente: Empilha decoradores criando uma cadeia de responsabilidades
// A execução acontece de FORA para DENTRO:
// 1. SuffixDecorator recebe "Olá, mundo!"
// 2. Passa para PrefixDecorator que recebe "Olá, mundo!"
// 3. Passa para UpperCaseDecorator que recebe "Olá, mundo!"
// 4. UpperCaseDecorator transforma em "OLÁ, MUNDO!"
// 5. PrefixDecorator adiciona ">>> OLÁ, MUNDO!"
// 6. SuffixDecorator adiciona ">>> OLÁ, MUNDO! <<<"
// 7. MessagePrinter imprime o resultado final
const decoratedPrinter = new SuffixDecorator(
  new PrefixDecorator(
    new UpperCaseDecorator(new MessagePrinter())
  )
);
decoratedPrinter.print("Olá, mundo!");  // Saída: >>> OLÁ, MUNDO! <<<


// ==================== FLUXO DE EXECUÇÃO ====================
/*
decoratedPrinter.print("Olá, mundo!")
    ↓
SuffixDecorator.print("Olá, mundo!")
    → super.print("Olá, mundo! <<<")
    ↓
PrefixDecorator.print("Olá, mundo! <<<")
    → super.print(">>> Olá, mundo! <<<")
    ↓
UpperCaseDecorator.print(">>> Olá, mundo! <<<")
    → super.print(">>> OLÁ, MUNDO! <<<")
    ↓
MessagePrinter.print(">>> OLÁ, MUNDO! <<<")
    → console.log(">>> OLÁ, MUNDO! <<<")
*/


// ==================== BENEFÍCIOS DO DECORATOR ====================
// 1. Adiciona funcionalidades sem modificar o código original (Open/Closed Principle)
// 2. Permite combinar comportamentos de forma flexível em tempo de execução
// 3. Evita criar subclasses para cada combinação possível
// 4. Decoradores podem ser adicionados/removidos dinamicamente
//
// EXEMPLO: Sem Decorator precisaríamos de classes como:
// - UpperCasePrinter
// - PrefixPrinter
// - UpperCasePrefixPrinter
// - UpperCasePrefixSuffixPrinter
// ... (explosão combinatória de classes)
//
// Com Decorator, combinamos livremente os comportamentos existentes.
