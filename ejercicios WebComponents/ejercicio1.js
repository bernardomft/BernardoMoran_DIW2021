class WcBlink extends HTMLElement{
    constructor (){
        super();
    }

    connectedCallback(){
        this.innerHTML = 'hola¡¡¡';
        if(this.getAttribute('baseColor')){
            this.style.color = this.getAttribute('baseColor');
        }

        if(this.getAttribute('alternativeColor') && this.getAttribute('changeInterval')){
            console.log(this.style.color);
            var interval = setInterval(this.cambiaColor, this.getAttribute('changeInterval'), this.getAttribute('baseColor'), this.getAttribute('alternativeColor'));
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

    /*attributeChangedCallback(attr, oldVal, newVal) {
		  if(this.getAttribute(attr)){
            this.style.color = this.getAttribute(oldVal);
            }	
	}*/

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