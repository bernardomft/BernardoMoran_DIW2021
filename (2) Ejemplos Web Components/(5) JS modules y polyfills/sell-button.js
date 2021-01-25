class SellButton extends HTMLElement {
  constructor () {
    super();
	let shadowRoot = this.attachShadow({mode: 'open'});
  }
  
  connectedCallback () {
    this.shadowRoot.innerHTML = `
      <style>
        .btn-container {
          border: 2px dashed #e67e22;
          padding: 1.5em;
          text-align: center;
        }
        .btn {
          background-color: #e67e22;
		  color: black;
          border: 0;
          border-radius: 5px;
          color: white;
          padding: 1.5em;
          text-transform: uppercase;
        }
      </style>
      <div class="btn-container">
        <button class="btn">Comprar Ahora</button>
      </div>
    `;
  }
}

// Exportamos el botón, para utilizar solo este componente en la página donde se vaya a incluir
export default SellButton;

window.customElements.define('sell-button', SellButton);