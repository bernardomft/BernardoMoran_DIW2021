class Counter1 extends HTMLElement {
  constructor() {
    super();
    this.x = 0;
    this.addEventListener('click', () => {
      this.clicked()
    });
  }
 
  clicked() {
    this.x++;
    this.render();
  }
 
  connectedCallback() {
    this.render();
  }
 
  // Método que modifica el contenido del componente
  render() {
    this.textContent = this.x.toString();
  }
}

window.customElements.define('num-counter-1', Counter1);