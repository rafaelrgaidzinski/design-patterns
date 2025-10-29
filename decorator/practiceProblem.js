// class MessagePrinter {
//   print(text) {
//     console.log(text);
//   }
// }

// const printer = new MessagePrinter();
// printer.print("Olá, mundo!");

// Componente base
class MessagePrinter {
  print(text) {
    console.log(text);
  }
}

// Decorator base
class PrinterDecorator {
  constructor(printer) {
    this.printer = printer;
  }

  print(text) {
    this.printer.print(text);
  }
}

// Decorator concreto: adiciona letras maiúsculas
class UpperCaseDecorator extends PrinterDecorator {
  print(text) {
    super.print(text.toUpperCase());
  }
}

// Decorator concreto: adiciona prefixo
class PrefixDecorator extends PrinterDecorator {
  print(text) {
    super.print(`>>> ${text}`);
  }
}

// Decorator concreto: adiciona sufixo
class SuffixDecorator extends PrinterDecorator {
  print(text) {
    super.print(`${text} <<<`);
  }
}

// Cliente: empilha os decoradores
const printer = new MessagePrinter();
printer.print("Olá, mundo!");

console.log("\n--- Com decoradores ---\n");

const decoratedPrinter = new SuffixDecorator(
  new PrefixDecorator(
    new UpperCaseDecorator(new MessagePrinter())
  )
);
decoratedPrinter.print("Olá, mundo!");

