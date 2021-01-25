class TestElement extends HTMLElement {	
	constructor() {
		super();

		// Creamos shadow DOM aunque solo se puede acceder desde la propia clase a través de una referencia 
		this._shadowRoot = this.attachShadow({mode: 'closed'});		
		
		// Campo no relacionado con atributos. Si se añade un get o set, se interpretaría como atributo
		this.x = 10;
 	}
	
	connectedCallback(){
		// Si se añade un atributo con getter y setter, se convierte en atributo del elemento HTML
		this.prueba = 2;
		
		// IMPORTANTE. En este caso es una página sencilla y no hay problema, pero es recomendable no acceder 
		// a los atributos de HTML en el constructor. Por ello se accede a prueba desde connectedCallback
		console.log(this.prueba);
		console.log(this.x);
		
		this._shadowRoot.innerHTML = "Prueba";	 		
	}
	
	// Se llama cuando se modifica el valor de los atributos especificados en observedAttributes
	attributeChangedCallback(attr, oldVal, newVal) {
		console.log(attr, oldVal, newVal);	
	}
	
	// Atributos reactivos cuando se invoca attributeChangedCallback
	static get observedAttributes() {
		return ['status'];
	}
	
	// Getter y setter de prueba. Se accede cuando se cambia el valor de este atributo o para obtenerlo
	get prueba() {
		return this.getAttribute('prueba');		
	}
	
	set prueba(newVal) {;
		this.setAttribute('prueba', newVal);
	}
			
}

customElements.define('test-element', TestElement);
