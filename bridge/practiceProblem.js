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

class System {
  constructor(renderer) {
    this.renderer = renderer;
  }
}

class Linux extends System {
  play() {
    this.renderer.renderMedia("Linux");
  }
}

class Windows extends System {
  play() {
    this.renderer.renderMedia("Windows");
  }
}

const audio = new AudioRenderer();
const video = new VideoRenderer();

// Cliente
const a1 = new Linux(audio);
a1.play();

const v1 = new Linux(video);
v1.play();

const a2 = new Windows(audio);
a2.play();

const v2 = new Windows(video);
v2.play();
