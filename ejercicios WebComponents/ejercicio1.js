class WcBlink extends HTMLElement{
    constructor (){
        super();
    }

    connectedCallback(){
        this.innerHTML = 'hola¡¡¡';
        if(this.baseColor){
            this.style.color = this.baseColor;
        }
        else
            this.baseColor = 'inherit';

        if(!(this.alternativeColor)){
            this.alternativeColor = 'transparent';
        }
        if(this.alternativeColor && this.changeInterval){
            console.log(this.style.color);
            var interval = setInterval(this.cambiaColor, this.changeInterval, this.baseColor, this.alternativeColor);
        }
    }

    cambiaColor(color1, color2,){
        var ele = document.querySelector("wc-blink");
        console.log(ele.style.color);
        if(ele.style.color == color1)
            ele.style.color = color2;
        else
            ele.style.color = color1;
    }

    get baseColor(){
        return this.getAttribute('baseColor');
    }

    get alternativeColor(){
        return this.getAttribute('alternativeColor');
    }

    get changeInterval(){
        return this.getAttribute('changeInterval');
    }

    set baseColor(val){
        this.setAttribute('baseColor', val);
    }

    set alternativeColor(val){
        this.setAttribute('alternativeColor', val);
    }

    set changeInterval(val){
        this.setAttribute('changeInterval', val);
    }

}
customElements.define('wc-blink', WcBlink);