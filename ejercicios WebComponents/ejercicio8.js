class ProgressBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
    }

    connectedCallback() {
        this.render();
        var interval;
        //Evento para click en aceptar
        this.shadowRoot.querySelector('#iniciar').addEventListener('click', () => {
            console.log(this.seconds);
            this.shadowRoot.querySelector('#barra-p').innerHTML='0.0%'
            let paso = 100;
            interval = setInterval(() => {
                var txt = this.shadowRoot.querySelector('#barra-p').innerHTML;
                if (txt != '100.0%' || txt != '100%') {
                    txt = txt.slice(0, -1);
                    txt = parseFloat(txt);
                    txt += paso / 100;
                    txt = parseFloat(txt);
                    console.log(txt);
                    if(!(txt >= 100)){
                        this.shadowRoot.querySelector('#barra-p').setAttribute('style', 'width: ' + txt + '%');
                        this.shadowRoot.querySelector('#barra-p').innerHTML = txt + '%';
                    }
                    else{
                        this.shadowRoot.querySelector('#barra-p').setAttribute('style', 'width: 100%');
                        this.shadowRoot.querySelector('#barra-p').innerHTML = '100.0%';
                        clearInterval(interval);
                    }
                    
                }
            }, this.seconds * 1000 / paso, paso)
        });
        //Evento para click en parar
        this.shadowRoot.querySelector('#parar').addEventListener('click', () =>{
            clearInterval(interval);
        })
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            div.barra-grande{
                width:500px;
                height:25px;
                border:1px solid black;
            }
            div.barra-pequeña{
                height: 100%;
                background-color: pink;
                width: 0%;
            }
        </style>
        <button id="iniciar">Iniciar</button>
        <button id="parar">Parar</button>
        <div id="barra-g" class="barra-grande">
            <div id="barra-p" class="barra-pequeña">0.0%</div> 
        </div>
        `;
    }

    get seconds() {
        return this.getAttribute('seconds');
    }

    set seconds(val) {
        this.setAttribute('seconds', val);
    }
}

window.customElements.define('pg-bar', ProgressBar);