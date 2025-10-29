// ==================== PADRÃO ADAPTER ====================
// O Adapter permite que interfaces incompatíveis trabalhem juntas.
// Ele "adapta" a interface de uma classe para que seja compatível com outra interface esperada pelo cliente.


// Interface interna do sistema
// Esta é a interface que nosso sistema espera para enviar notificações
class Notifier {
  send(message) {
    console.log(`Notificação enviada: ${message}`);
  }
}


// Biblioteca externa (incompatível com o sistema)
// Esta classe tem um método diferente (sendSMS) e não segue a interface Notifier
// Não podemos modificá-la pois é externa ao nosso controle
class SMSService {
  sendSMS(text) {
    console.log(`SMS enviado: ${text}`);
  }
}


// ADAPTER: Faz a ponte entre SMSService e Notifier
// Herda de Notifier para ser compatível com a interface esperada pelo sistema
class SMSAdapter extends Notifier {
  constructor(smsService) {
    super();
    // Armazena a instância do serviço externo que será adaptado
    this.smsService = smsService;
  }

  // Sobrescreve o método send() da interface Notifier
  // Internamente, chama o método sendSMS() do serviço externo
  // Esta é a essência do Adapter: traduzir uma chamada de método para outra
  send(message) {
    this.smsService.sendSMS(message);
  }
}


// Cliente que usa a interface Notifier
// Este código não precisa saber se está usando email, SMS ou qualquer outro serviço
// Ele apenas chama send() e o Adapter faz o resto
function notifyUser(notifier, message) {
  notifier.send(message);
}


// Testando com o Notifier interno (funciona diretamente)
const emailNotifier = new Notifier();
notifyUser(emailNotifier, "Bem-vindo ao sistema!");


// Usando o SMSService através do Adapter
// Sem o adapter, teríamos que chamar smsService.sendSMS() diretamente
// Com o adapter, podemos usar a mesma interface send() do resto do sistema
const smsService = new SMSService();
const smsAdapter = new SMSAdapter(smsService);
notifyUser(smsAdapter, "Seu código é 1234");


// ==================== RESUMO DA IMPLEMENTAÇÃO ====================
// 1. Identifique a interface que o sistema espera (Notifier.send)
// 2. Identifique a classe incompatível que precisa ser adaptada (SMSService.sendSMS)
// 3. Crie o Adapter que:
//    - Herda ou implementa a interface esperada
//    - Recebe a instância da classe incompatível no construtor
//    - Traduz as chamadas de método da interface esperada para a classe adaptada
