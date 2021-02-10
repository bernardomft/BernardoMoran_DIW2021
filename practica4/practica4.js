class NarutoInvaders extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
    }

    connectedCallback() {
        this.render();
        var mapa = this.shadowRoot.querySelector('#mapa');
        var score = this.shadowRoot.querySelector('#score');
        var intervalMoveArray = [];
        var intervalKunai = [];
        var arrayEnemigos = [];
        var arrayKunai = [];
        //Este evento con su funcion asociado se va a encargar de el movimiento de la nave
        document.addEventListener('keydown', (e) => {
            var nave = this.shadowRoot.querySelector('#nave-principal');
            var step = 25;
            var pos = parseFloat(window.getComputedStyle(nave).bottom.slice(0, -2));
            var pos2 = parseFloat(window.getComputedStyle(nave).left.slice(0, -1));
            if (e.key === ' ') {
                this.disparar(intervalKunai, arrayKunai);
            } else if (e.key === 'ArrowUp') {
                pos = pos + step;
            } else if (e.key === 'ArrowDown') {
                pos = pos - step;
            } else if (e.key === 'ArrowRight') {
                pos2 = pos2 + step;
            } else if (e.key === 'ArrowLeft') {
                pos2 = pos2 - step;
            }
            if (!(pos < 0) && !(pos2 < 0) && !(pos2 > window.getComputedStyle(mapa).width.slice(0, -2) - 80) &&
                !(pos > window.getComputedStyle(mapa).height.slice(0, -2)))
                nave.setAttribute('style', 'bottom: ' + pos + 'px;left: ' + pos2 + 'px');

        });
        var interval = setInterval(() => {
            for (var i = 0; i <5; i++) {
                var tmp = document.createElement('img');
                tmp.setAttribute('src', 'img/zetsu.jpg');
                tmp.setAttribute('height', '80');
                tmp.setAttribute('width', '80');
                tmp.setAttribute('style', 'position:absolute; left: ' + ((i * 20) + 10) + '%;top: 0px');
                mapa.appendChild(tmp);
                arrayEnemigos.push(tmp)
                intervalMoveArray.push(setInterval(function (ele, i) {
                    var step = 15;
                    var pos = parseFloat(window.getComputedStyle(ele).top.slice(0, -2));
                    pos = pos + step;
                    if (!(pos + 80 > window.getComputedStyle(mapa).height.slice(0, -2))) {
                        ele.setAttribute('style', 'position:absolute; left: ' + ((i * 20) + 10) + '%;top:' + pos + 'px');
                        if (arrayKunai.length > 0) {
                            for (var j = 0; j < arrayKunai.length; j++) {
                                if (window.getComputedStyle(arrayKunai[j]).left.slice(0, -2) >= window.getComputedStyle(ele).left.slice(0, -2) &&
                                    (parseFloat(window.getComputedStyle(arrayKunai[j]).left.slice(0, -2)) + 40) <= (parseFloat(window.getComputedStyle(ele).left.slice(0, -2))+80)) {
                                    console.log('mismo left');
                                    if(window.getComputedStyle(arrayKunai[j]).bottom.slice(0,-2) > window.getComputedStyle(ele).bottom.slice(0,-2) ){
                                        console.log('impacto');
                                        score.innerHTML = parseInt(score.innerHTML) + 5;
                                        ele.setAttribute('style', 'display:none');
                                        arrayKunai[j].setAttribute('style', 'display:none');
                                        clearInterval(intervalMoveArray[arrayEnemigos.indexOf(ele)]);
                                    }
                                }
                            }
                        }
                    } else {
                        console.log('game over');
                        intervalMoveArray.forEach(a => clearInterval(a));
                        clearInterval(interval);
                    }
                }, 500, tmp, i, score));
            }
        }, 4000);



    }
    disparar(intervalKunai, arrayKunai) {
        var mapa = this.shadowRoot.querySelector('#mapa');
        var nave = this.shadowRoot.querySelector('#nave-principal');
        var pos = parseFloat(window.getComputedStyle(nave).bottom.slice(0, -2));
        var pos2 = parseFloat(window.getComputedStyle(nave).left.slice(0, -1));
        var rocket = document.createElement('img');
        rocket.setAttribute('src', 'img/kunai.png');
        rocket.setAttribute('height', '40');
        rocket.setAttribute('width', '40');
        rocket.setAttribute('class', 'kunai');
        rocket.setAttribute('style', 'position:absolute; bottom:' + (pos + 80) + 'px; left:' + (pos2 + 20) + 'px');
        arrayKunai.push(rocket);
        mapa.appendChild(rocket);
        intervalKunai.push(setInterval(function (rocket) {
            var step = 5;
            var pos = parseFloat(window.getComputedStyle(rocket).bottom.slice(0, -2)) + step;
            var pos2 = parseFloat(window.getComputedStyle(rocket).left.slice(0, -2));
            if (!(pos < 0) && !(pos2 <= 0) && !(pos2 > window.getComputedStyle(mapa).width.slice(0, -2) - 80) &&
                !(pos > window.getComputedStyle(mapa).height.slice(0, -2))) {

                rocket.setAttribute('style', 'position:absolute; left: ' + pos2 + 'px;bottom:' + (pos) + 'px');
            } else {
                rocket.setAttribute('style', 'display:none');
            }

        }, 100, rocket));
    }


    render() {
        this.shadowRoot.innerHTML = `
        <style>
            div.mapa{
                position:relative;
                width: 100%;
                min-height: 100vh;
                background-image: url('img/estrellas.jpg');
                background-size: cover;
                z-index: -2;
            }

            img#nave-principal{
                position: absolute;
                left: 50%;
	            bottom:0px;
            }
            div.score{
                postion: absolute;
                top: 20%;
                left: 10%;
                z-index: -1;
                border: 1px solid yellow;
                color:yellow;
                width: 50px;
                text-align:center;
            }
        </style>
        <div id="mapa" class="mapa">
            <div id="score" class="score">0</div>
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

class NarutoInvadersMenu extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
    }

    connectedCallback(){
        this.render();
        var id;
        //Mensaje en amarillo y rojo para captar la atencion de el usuario
        var mensaje = this.shadowRoot.querySelector('#warning');
        console.log(window.getComputedStyle(mensaje).color);
        var intervalTexto = setInterval(this.cambiaColor,500,mensaje);
        var paradaTexto = setTimeout(this.paraInterval,5000,intervalTexto,mensaje);
        var paradaTexto2 = setTimeout(this.instrucciones,10000,mensaje);
        //var paradaTexto3 = setTimeout(this.reloj,20000,mensaje, id);
        //id = requestAnimationFrame(fu,id,mensaje);
        var este = document.getElementsByTagName('naruto-menu');
        console.log(este);
        var borrar = setTimeout(this.borrar,20000,este);
    }

    /*reloj(global){
        var msg = window.shadowRoot.querySelector('#warning');
        if(msg.innerHTML === 'PARA DEFENDER LA ALDEA DEBERÁS MOVER LAS FLECHAS DE TU TECLADO PARA MOVERTE POR EL CAMPO DE BATALLA. ADEMÁS PODRÁS DISPARAR KUNAIS INBUIDOS CON EL CHAKRA DEL KYUBY PRESIONANDO LA BARRA ESPACIADORA'){
            msg.innerHTML = '3';
        }else if(!(msg.innerHTML === '0')){
            msg.innerHTML = parseInt(msg.innerHTML) - 1;
        }
        else{
            detenerRequest()
        }
        global = requestAnimationFrame(reloj);
    }*/
    borrar(ele){
        document.body.innerHTML = '';
        var tmp = document.createElement('naruto-game');
        document.body.appendChild(tmp);
    }

    instrucciones(msg){
        msg.innerHTML = 'PARA DEFENDER LA ALDEA DEBERÁS MOVER LAS FLECHAS DE TU TECLADO PARA MOVERTE POR EL CAMPO DE BATALLA. ADEMÁS PODRÁS DISPARAR KUNAIS INBUIDOS CON EL CHAKRA DEL KYUBY PRESIONANDO LA BARRA ESPACIADORA';
    }
    

    paraInterval(inter, ele){
        clearInterval(inter);
        ele.setAttribute('style', 'color:black;font-size:3.5em');
        ele.innerHTML = 'LA VILLA OCULTA DE LA HOJA ESTÁ SIENDO ATACADA.\nEL CLAN OUTSUKI HA DECIDO MANDAR HORDAS DE ZETSUS BLANCOS\nES TU DEBER COMO CHOUNIN DE KONOHA AYUDAR EN LA DEFENSA';
    }

    cambiaColor(ele){
        if(window.getComputedStyle(ele).color === 'rgb(255, 0, 0)')
            ele.setAttribute('style','color:yellow');
        else if(window.getComputedStyle(ele).color === 'rgb(255, 255, 0)')
            ele.setAttribute('style','color:red');
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            div.menu{
                position:relative;
                width: 100%;
                min-height: 100vh;
                background-image: url('img/konoha.jpg');
                background-size: cover;
                z-index: -1;
                display:flex;
                justify-content:center;
                align-items:center;
            }

            div#warning{
                font-size:8em;
                color: yellow;
            }

        </style>
        <div id="menu" class="menu">
            <div id="warning">!ALERTA!</div>
        </div>
        `;
    }
}

window.customElements.define('naruto-menu', NarutoInvadersMenu);