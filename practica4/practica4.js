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
        var intervalMoveArray = [];
        var intervalKunai = [];
        //Este evento con su funcion asociado se va a encargar de el movimiento de la nave
        document.addEventListener('keydown', (e) => {
            var nave = this.shadowRoot.querySelector('#nave-principal');
            var step = 15;
            var pos = parseFloat(window.getComputedStyle(nave).bottom.slice(0, -2));
            var pos2 = parseFloat(window.getComputedStyle(nave).left.slice(0, -1));
            if(e.key === ' '){
                console.log('por aqui');
                this.disparar(intervalKunai);
            }
            else if (e.key === 'ArrowUp') {
                pos = pos + step;
            } else if (e.key === 'ArrowDown') {
                pos = pos - step;
            }
            else if (e.key === 'ArrowRight') {
                pos2 = pos2 + step;
            } else if (e.key === 'ArrowLeft') {
                pos2 = pos2 - step;
            }
            if(!(pos<0) && !(pos2<0) && !(pos2>window.getComputedStyle(mapa).width.slice(0,-2)-80)
                && !(pos>window.getComputedStyle(mapa).height.slice(0,-2)))
                    nave.setAttribute('style', 'bottom: ' + pos + 'px;left: ' + pos2 + 'px');
            
        });
        var interval= setInterval(() => {
            var arrayEnemigos = [];
            for(var i = 0; i<5;i++){
                arrayEnemigos[i] = document.createElement('img');
                arrayEnemigos[i].setAttribute('src','img/zetsu.jpg');
                arrayEnemigos[i].setAttribute('height','80');
                arrayEnemigos[i].setAttribute('width','80');
                arrayEnemigos[i].setAttribute('style','position:absolute; left: ' + ((i*20)+10)+'%;top: 0px');
                mapa.appendChild(arrayEnemigos[i]);
                intervalMoveArray.push(setInterval(function (ele,i){
                    var step = 30;
                    var pos = parseFloat(window.getComputedStyle(ele).top.slice(0, -2));
                    pos = pos + step;
                    if(!(pos+80>window.getComputedStyle(mapa).height.slice(0,-2)))
                        ele.setAttribute('style','position:absolute; left: ' + ((i*20)+10)+'%;top:'+pos +'px');
                    else{
                        console.log('game over');
                        intervalMoveArray.forEach(a => clearInterval(a));
                        clearInterval(interval);
                    }
                },1000,arrayEnemigos[i],i));
            }
        }, 4000);
        
        
        
    }
    disparar(intervalKunai){
        var mapa = this.shadowRoot.querySelector('#mapa');
        var nave = this.shadowRoot.querySelector('#nave-principal');
        var pos = parseFloat(window.getComputedStyle(nave).bottom.slice(0, -2));
        var pos2 = parseFloat(window.getComputedStyle(nave).left.slice(0, -1));
        var rocket = document.createElement('img');
        rocket.setAttribute('src','img/kunai.png');
        rocket.setAttribute('height','40');
        rocket.setAttribute('width','40');
        rocket.setAttribute('style','position:absolute; bottom:'+ (pos + 80) + 'px; left:' + (pos2 + 20)  + 'px');
        mapa.appendChild(rocket);
        intervalKunai.push(setInterval(function (rocket){
            var step = 5;
            var pos = parseFloat(window.getComputedStyle(rocket).bottom.slice(0, -2));
            var pos2 = parseFloat(window.getComputedStyle(rocket).left.slice(0, -2));
            if(!(pos<0) && !(pos2<=0) && !(pos2>window.getComputedStyle(mapa).width.slice(0,-2)-80)
                && !(pos>window.getComputedStyle(mapa).height.slice(0,-2))){
                    rocket.setAttribute('style','position:absolute; left: ' + pos2 + 'px;bottom:'+(pos + step) +'px');
                }
            else{
                console.log('kunai pa cuenca');
                rocket.setAttribute('style','display:none');
            }
           
        },100,rocket));
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