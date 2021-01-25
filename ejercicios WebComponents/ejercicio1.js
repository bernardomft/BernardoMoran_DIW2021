class WcBlink extends HTMLElement{
    constructor (){
        super();
    }

    connectedCallback(){
        
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