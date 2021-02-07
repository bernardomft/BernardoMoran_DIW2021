class NarutoInvaders extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
    }

    connectedCallback() {
        this.render();
        //Este evento con su funcion asociado se va a encargar de el movimiento de la nave
        document.addEventListener('keydown', (e) => {

            var nave = this.shadowRoot.querySelector('#nave-principal');
            var step = 15;
            if (e.key === 'ArrowUp') {
                var pos = parseFloat(window.getComputedStyle(nave).bottom.slice(0, -2));
                pos = pos + step;
                var pos2 = parseFloat(window.getComputedStyle(nave).left.slice(0, -1));
                nave.setAttribute('style', 'bottom: ' + pos + 'px;left: ' + pos2 + 'px');
            } else if (e.key === 'ArrowDown') {
                var pos = parseFloat(window.getComputedStyle(nave).bottom.slice(0, -2));
                pos = pos - step;
                var pos2 = parseFloat(window.getComputedStyle(nave).left.slice(0, -1));
                nave.setAttribute('style', 'bottom: ' + pos + 'px;left: ' + pos2 + 'px');
            }
            else if (e.key === 'ArrowRight') {
                var pos = parseFloat(window.getComputedStyle(nave).left.slice(0, -1));
                var pos2 = parseFloat(window.getComputedStyle(nave).bottom.slice(0, -2));
                pos = pos + step;
                nave.setAttribute('style', 'bottom: ' + pos2 + 'px;left: ' + pos + 'px');
            } else if (e.key === 'ArrowLeft') {
                var pos = parseFloat(window.getComputedStyle(nave).left.slice(0, -1));
                var pos2 = parseFloat(window.getComputedStyle(nave).bottom.slice(0, -2));
                pos = pos - step;
                nave.setAttribute('style', 'bottom: ' + pos2 + 'px;left: ' + pos + 'px');
            }

        });
    }



    render() {
        this.shadowRoot.innerHTML = `
        <style>
            div.mapa{
                width: 100%;
                min-height: 100vh;
                background-image: url('img/estrellas.jpg');
                background-size: cover;
                z-index: -1;
            }

            img#nave-principal{
                position: absolute;
                left: 50%;
	            bottom:0px;
            }
        </style>
        <div id="mapa" class="mapa">
            <img src='img/naruto.png' id="nave-principal" heigth="80" width="80"> 
        </div>
        `;
    }

    get dificulty() {
        return this.getAttribute('dificulty');
    }

    set dificulty(val) {
        this.setAttribute('dificulty', val);
    }
}

window.customElements.define('naruto-game', NarutoInvaders);