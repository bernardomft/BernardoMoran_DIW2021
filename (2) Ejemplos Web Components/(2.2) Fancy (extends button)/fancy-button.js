class FancyButton extends HTMLButtonElement {
  constructor() {
    super(); // Se llama al constructor del elemento padre HTMLButtonElement
    this.addEventListener('click', e => this.underline()); 
  }

  // Se añade una clase que se puede definir desde el CSS de la página
  underline() {
    this.classList.add('run');    
  }
}

customElements.define('fancy-button', FancyButton, {extends: 'button'});