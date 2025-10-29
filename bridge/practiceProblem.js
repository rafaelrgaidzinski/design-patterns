// ==================== PADRÃO BRIDGE ====================
// O Bridge separa a abstração (o que fazer) da implementação (como fazer).
// Isso permite que ambas variem independentemente sem criar uma explosão de subclasses.
//
// SEM Bridge teríamos: LinuxAudio, LinuxVideo, WindowsAudio, WindowsVideo...
// COM Bridge temos: 2 sistemas × 2 renderizadores = apenas 4 classes reutilizáveis


// IMPLEMENTAÇÃO: Define COMO o conteúdo será renderizado
// Esta é uma das dimensões que pode variar independentemente
class AudioRenderer {
  renderMedia(system) {
    console.log(`Reproduzindo áudio no ${system}`);
  }
}

class VideoRenderer {
  renderMedia(system) {
    console.log(`Reproduzindo vídeo no ${system}`);
  }
}


// ABSTRAÇÃO: Define O QUE será feito (qual sistema operacional)
// Mantém uma referência para a implementação (renderer)
// Esta é a "ponte" que conecta as duas hierarquias
class System {
  constructor(renderer) {
    // A abstração delega o trabalho para a implementação
    this.renderer = renderer;
  }
}


// ABSTRAÇÕES REFINADAS: Especializam O QUE será feito
// Cada sistema operacional é uma variação da abstração
class Linux extends System {
  play() {
    // Delega para o renderer, passando informações específicas do Linux
    this.renderer.renderMedia("Linux");
  }
}

class Windows extends System {
  play() {
    // Delega para o renderer, passando informações específicas do Windows
    this.renderer.renderMedia("Windows");
  }
}


// Criando as implementações
const audio = new AudioRenderer();
const video = new VideoRenderer();


// Cliente: Combina livremente abstrações e implementações
// Aqui está a mágica do Bridge: podemos misturar qualquer sistema com qualquer renderizador

const a1 = new Linux(audio);      // Linux + Áudio
a1.play();                        // "Reproduzindo áudio no Linux"

const v1 = new Linux(video);      // Linux + Vídeo
v1.play();                        // "Reproduzindo vídeo no Linux"

const a2 = new Windows(audio);    // Windows + Áudio
a2.play();                        // "Reproduzindo áudio no Windows"

const v2 = new Windows(video);    // Windows + Vídeo
v2.play();                        // "Reproduzindo vídeo no Windows"


// ==================== BENEFÍCIOS DO BRIDGE ====================
// 1. Adicionar um novo sistema (MacOS) não afeta os renderizadores
// 2. Adicionar um novo renderizador (ImageRenderer) não afeta os sistemas
// 3. Evita a explosão combinatória de subclasses
// 4. Facilita testes: você pode testar sistemas e renderizadores separadamente


// ==================== ESTRUTURA DO PADRÃO ====================
// Abstração (System)          →  mantém referência  →  Implementação (Renderer)
//     ↓                                                       ↓
// Abstrações Refinadas                              Implementações Concretas
// (Linux, Windows)                                  (AudioRenderer, VideoRenderer)
