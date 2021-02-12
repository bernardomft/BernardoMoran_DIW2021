class MiSemaforo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
    }

    connectedCallback() {
        this.seconds;
        this.template;
        this.shadowRoot.innerHTML = this.template;
        this._intervalAmarillo = null;
        this._rojo = this.shadowRoot.querySelector('#rojo');
        this._amarillo = this.shadowRoot.querySelector('#amarillo');
        this._verde = this.shadowRoot.querySelector('#verde');
        this.shadowRoot.querySelector('#rojo').addEventListener('click', this.rojo.bind(this));
        this.shadowRoot.querySelector('#amarillo').addEventListener('click', this.amarillo.bind(this));
        this.shadowRoot.querySelector('#verde').addEventListener('click', this.verde.bind(this));
    }

    verde() {
        if (this._intervalAmarillo)
            clearInterval(this._intervalAmarillo);
        this._rojo.className = 'caja';
        this._amarillo.className = 'caja';
        this._verde.className = 'caja verde';
    }
    rojo() {
        setTimeout(() => {
            if (this._intervalAmarillo)
                clearInterval(this._intervalAmarillo);
            this._rojo.className = 'caja rojo';
            this._amarillo.className = 'caja';
            this._verde.className = 'caja';
        }, this.seconds * 1000);

    }
    amarillo() {
        this._rojo.className = 'caja';
        this._verde.className = 'caja';
        this._intervalAmarillo = setInterval(this.cambiaAmarillo.bind(this), this.seconds * 1000 / 2);
    }
    cambiaAmarillo() {
        if (this._amarillo.className == 'caja')
            this._amarillo.className = 'caja amarillo';
        else if (this._amarillo.className = 'caja amarillo')
            this._amarillo.className = 'caja';
    }

    attributeChangedCallback(attr, oldVal, newVal){
        if(attr == 'seconds'){
            if (this._intervalAmarillo)
                clearInterval(this._intervalAmarillo);
            this.shadowRoot.innerHTML = '';
            this.connectedCallback();
        }
    }
    static get observedAttributes(){
        return ['seconds'];
    }

    get template() {
        return `
            <style>
                .contenedor{display:flex;flex-direction:column;justify-content:space-between;min-height:260px;}
                .caja{height:80px;width:80px;background-color:grey;border:0.5px solid black}
                .rojo{background-color:red}
                .amarillo{background-color:yellow}
                .verde{background-color:green}
            </style>
            <div class=contenedor>
                <div id='rojo' class="caja rojo"></div>
                <div id='amarillo'class="caja"></div>
                <div id='verde' class="caja"></div>
            </div>
        `;
    }

    get seconds() {
        if (!this.getAttribute('seconds'))
            this.setAttribute('seconds', 1)
        return this.getAttribute('seconds');
    }

    set seconds(val) {
        return this.setAttribute('seconds', val)
    }
}

customElements.define('mi-semaforo', MiSemaforo);