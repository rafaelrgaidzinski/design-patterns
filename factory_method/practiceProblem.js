// Classes concretas
class DebitCard {
  pay(type, amount) {
    console.log(`Pagando com ${type} no valor de R$ ${amount}`);
  }
}

class CreditCard {
  pay(type, amount) {
    console.log(`Pagando com ${type} no valor de R$ ${amount}`);
  }
}

class Pix {
  pay(type, amount) {
    console.log(`Pagando com ${type} no valor de R$ ${amount}`);
  }
}

class PaymentFactory {
  static types = {
    debit: DebitCard,
    credit: CreditCard,
    pix: Pix
  }

  static createPayment(type) {
    const PaymentClass = this.types[type];
    if (!PaymentClass) {
      throw new Error("Tipo de pagamento ainda não suportado");
    }
    return new PaymentClass();
  }
}

// Código do cliente
function main() {
  const payments = {"debit": 150.0, "credit": 250.0, "pix": 175.0}

  try {
    Object.entries(payments).forEach(([type, amount]) => {
      const payment = PaymentFactory.createPayment(type);
      payment.pay(type, amount);
    });
  } catch (err) {
    console.error("Erro ao realizar pagamento...", err.message);
  }
  
}

main();
