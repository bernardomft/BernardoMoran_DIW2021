

class MiSemaforo extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.template;
        this.shadowRoot.innerHTML = this.template;
    }

    get template(){
        return `
            <style>
                .contenedor{display:flex;flex-direction:column;justify-content:space-between;min-height:260px;}
                .caja{height:80px;width:80px;background-color:grey;border:0.5px solid black}
                .rojo{background-color:red}
                .amarillo{background-color:yellow}
                .verde{background-color:green}
            </style>
            <div class=contenedor>
                <div class="caja rojo"></div>
                <div class="caja"></div>
                <div class="caja"></div>
            </div>
        `;
    }

    get seconds(){
        return this.getAttribute('seconds');
    }

    set seconds(val){
        return this.setAttribute('seconds',val)
    }
}

customElements.define('mi-semaforo', MiSemaforo);