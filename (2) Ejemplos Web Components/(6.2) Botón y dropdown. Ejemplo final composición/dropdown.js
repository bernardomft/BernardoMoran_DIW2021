const templateD = document.createElement('template');
 
templateD.innerHTML = `
  <style>
    :host {
      font-family: sans-serif;
    }
 
    .dropdown {
      padding: 3px 8px 8px;
    }
 
    .label {
      display: block;
      margin-bottom: 5px;
      color: #000000;
      font-size: 16px;
      font-weight: normal;
      line-height: 16px;
    }
 
    .dropdown-list-container {
      position: relative;
    }
 
    .dropdown-list {
      position: absolute;
      width: 100%;
      display: none;
      max-height: 192px;
      overflow-y: auto;
      margin: 4px 0 0;
      padding: 0;
      background-color: #ffffff;
      border: 1px solid #a1a1a1;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      list-style: none;
    }
 
    .dropdown-list li {
      display: flex;
      align-items: center;
      margin: 4px 0;
      padding: 0 7px;
      font-size: 16px;
      height: 40px;
      cursor: pointer;
    }
	
	.dropdown.open .dropdown-list {
      display: flex;
      flex-direction: column;
    }
	
	.dropdown-list li.selected {
      font-weight: 600;
    }
  </style>
 
  <div class="dropdown">
    <span class="label">Label</span>
 
    <my-button as-atom>Content</my-button>
 
    <div class="dropdown-list-container">
      <ul class="dropdown-list"></ul>
    </div>
  </div>
`;
 
class Dropdown extends HTMLElement {
  constructor() {
    super();
 
    // Creamos shadow DOM
    this._sR = this.attachShadow({ mode: 'open' });
    this._sR.appendChild(templateD.content.cloneNode(true));
	
	this.open = false;
	
	// Se crean una serie de propiedades referentes al HTML que modificaremos posteriormente
	this.$label = this._sR.querySelector('.label');
    this.$button = this._sR.querySelector('my-button');
	this.$dropdown = this._sR.querySelector('.dropdown');
	this.$dropdownList = this._sR.querySelector('.dropdown-list');
	
	// El método bind asocia toggleOpen al contexto de la clase
	this.$button.addEventListener('click',
      this.toggleOpen.bind(this) //Con bind se ejecuta el evento el contexto del objeto
    );
  }
 
  // Método que se encarga de mostrar u ocultar el componente 
  toggleOpen() {
    this.open = !this.open;
 
    this.open
      ? this.$dropdown.classList.add('open')
      : this.$dropdown.classList.remove('open');
  }
 
  connectedCallback(){
	this.render();
  }

  attributeChangedCallback(name, oldVal, newVal) {
	if (oldVal != newVal){
	   // Cuando se modifican los atributos label, option u options se renderiza de nuevo la página
	   this.render();
    }    
  }
  
  render() {
	// Texto de descripción del dropdown	  
	this.$label.innerHTML = this.label;
	
	// Texto descriptivo del desplegable
    this.$button.setAttribute('label', 'Select Option');
	
	this.$dropdownList.innerHTML = '';
 
    // Cargamos las diferentes opciones en función del atributo option
    Object.keys(this.options || {}).forEach(key => {
      let option = this.options[key];
      let $option = document.createElement('li');
      $option.innerHTML = option.label;
	  
	  // Si es la opción indicada se marca en negrita
	  if (this.option && this.option === key) {
        $option.classList.add('selected');
      }
	  
	  // Si hacemos click en alguna opción se oculta el dropdown y se llama de nuevo a la página
	  $option.addEventListener('click', () => {
        this.option = key; //Al cambiar la opción se llama a attributeChangedCallback que se encarga de actualizar el HTML
        this.toggleOpen();         
      });
 
      this.$dropdownList.appendChild($option);
    });
  }
  
    // Atributos reactivos
  static get observedAttributes() {
    return ['label', 'option', 'options'];
  }
 
  //Getter y setter de los atributos del HTML
  get label() {
    return this.getAttribute('label');
  }
 
  set label(value) {
    this.setAttribute('label', value);
  }
 
  get option() {
    return this.getAttribute('option');
  }
 
  set option(value) {
    this.setAttribute('option', value);
  }
 
  get options() {
    return JSON.parse(this.getAttribute('options'));
  }
 
  set options(value) {
    this.setAttribute('options', JSON.stringify(value));
  }
}
 
window.customElements.define('my-dropdown', Dropdown);