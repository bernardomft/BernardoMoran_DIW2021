const templateMyParagraph = document.createElement('template');
 
templateMyParagraph.innerHTML = `
  <style>
    p {
      background-color: #666;
      padding: 5px;
    }
	
	/* Estilos que se aplican a los elementos en un slot */
	::slotted(*){
		color: white;
	}
	
	/* Estilos que se aplican a los elementos en un slot que son span */
	::slotted(span){
		color: orange;
	}
  </style>
  <p><slot name="my-text">Mi texto predeterminado</slot></p>
`;

// En este caso creamos el Custom Element con una clase anónima
customElements.define('my-paragraph',
	class extends HTMLElement {
		constructor() {
			super();
			
			this._shadowRoot = this.attachShadow({ mode: 'open' });
			this._shadowRoot.appendChild(templateMyParagraph.content.cloneNode(true)); 
		}
	}
)