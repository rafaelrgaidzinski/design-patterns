// Classes concretas
class PdfReport {
  generate() {
    return "Relatório em PDF gerado!";
  }
}

class PdfInvoice {
  generate() {
    return "Fatura em PDF gerada!";
  }
}

class DocxReport {
  generate() {
    return "Relatório em DOCX gerado!";
  }
}

class DocxInvoice {
  generate() {
    return "Fatura em DOCX gerada!";
  }
}

//Abstract Factory
class DocumentsFactory {
  createPdf() {
    throw new Error("Método abstrato deve ser implementado")
  }
  createDocx() {
    throw new Error("Método abstrato deve ser implementado")
  }
}

//Concrete Factories
class PdfFactory extends DocumentsFactory {
  createInvoice() {
    return new PdfInvoice();
  }

  createReport() {
    return new PdfReport();
  }
}

class DocxFactory extends DocumentsFactory {
  createInvoice() {
    return new DocxInvoice();
  }

  createReport() {
    return new DocxReport();
  }
}


// Cliente
const factories = {
  pdf: new PdfFactory(),
  docx: new DocxFactory()
}

class DocumentsApp {
  constructor(factory) {
    this.invoice = factory.createInvoice();
    this.report = factory.createReport();
  }

  startPrinting() {
    console.log(this.invoice.generate());
    console.log(this.report.generate());
  }
}

function main() {
  const types = ["pdf", "docx"]

  types.forEach((type) => {
    console.log(`\n>> Fábrica selecionada: ${type} <<`);
    const factory = factories[type];
    if (!factory) throw new Error("Tipo de fábrica desconhecido");

    const app = new DocumentsApp(factory);
    app.startPrinting();
  });

}

main();
