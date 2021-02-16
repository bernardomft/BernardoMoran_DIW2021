document.addEventListener("DOMContentLoaded", () => {
	class ProgressBar extends HTMLElement{
		constructor() {
			super();

			// Creamos shadow DOM
			this.attachShadow({mode: 'open'});		
		}

		connectedCallback() {
			// Asociamos el HTML del template
			this.shadowRoot.innerHTML = this.template;  
				
			// Nos quedamos una referencia a la barra de progreso
			this._barra = this.shadowRoot.querySelector(".barra");
			
			// Variable con el proceso actual
			this._proceso = 0;

			// Creamos los eventos para iniciar o parar la barra de progreso
			this.shadowRoot.querySelector("#aceptar").addEventListener("click", this.loadBar.bind(this));
			this.shadowRoot.querySelector("#stop").addEventListener("click", this.stopBar.bind(this));
		}
		
		loadBar(){				
			if (isNaN(this.seconds) || this.seconds <= 0){
				alert("Debes seleccionar una cantidad de segundos mayor que 0")
			} else {
				let tiempo = this.seconds*1000;
				console.log(tiempo);
				var start = null;
		
				function step(timestamp) {
					console.log(timestamp);
					if (!start) start = timestamp;
					var progress = timestamp - start;
					let pct = ((progress*100)/tiempo) + "%"; // Porcentaje actual de la barra
					this._barra.style.width = pct;
					this._barra.innerHTML = pct;
					
					if (progress < tiempo) {
						this._proceso = window.requestAnimationFrame(step.bind(this)); // Importante asociar el contexto del objeto actual
					} else {
						this._barra.style.width = "100%";	
						this._barra.innerHTML = "100%";	
					}
				}
				
				this._proceso = window.requestAnimationFrame(step.bind(this));  // Importante asociar el contexto del objeto actual
			}
		}
		
		stopBar(){
			window.cancelAnimationFrame(this._proceso);	
		}
		
		// Se llama cuando se modifica el valor de los atributos especificados en observedAttributes
		attributeChangedCallback(attr, oldVal, newVal) {
			if(attr == 'seconds' && oldVal != null && oldVal != newVal) {
				window.cancelAnimationFrame(this._proceso);
				this._barra.style.width = 0;
				this._barra.innerHTML = "0%";	
			}	
		}
		
		// Atributos reactivos cuando se invoca attributeChangedCallback
		static get observedAttributes() {
		  return ['seconds'];
		}
			
		get seconds() {
			let value = this.getAttribute("seconds")?this.getAttribute("seconds"):0;
			
			return value;
		}

		set seconds(newVal) {
			this.setAttribute("seconds", newVal);
		}	 

		get template(){
			return `<style>
				#progress{
					margin-top: 1em;
					height: 20px;
					width: 100%;
					border: 1px solid black;
				}

				.barra{
					height: 100%;
					width: 0;
					background-color: #ffe6e6;
				}

				div.input{
					margin-bottom: 0.5em;
				}

				input:not([type='button']){
					width: 70px;
				} 
			</style>
			<input type="button" value="Aceptar" id="aceptar"></input>
			<input type="button" value="Parar" id="stop"></input>		
					
			<div id="progress">
				<div class="barra">&nbsp;</div> <!-- Este div crecer� de 0 a 100% en funci�n del progreso de la animaci�n -->	
			</div>`;
		}

	}			  

	customElements.define('progress-bar', ProgressBar);
});
/*

document.addEventListener("DOMContentLoaded", () => {			
	var barra = document.querySelector(".barra");			
	var proceso = 0;	
		
	//Este m�todo aplica los efectos, seg�n la elecci�n del usuario
	document.querySelector("#aceptar").addEventListener("click", () => {
		let tiempo = eval(document.querySelector("#tiempo").value)*1000;
		
		if (tiempo <= 0){
			alert("Debes seleccionar una cantidad de segundos mayor que 0")
		} else {
			var start = null;
	
			function step(timestamp) {
				if (!start) start = timestamp;
				var progress = timestamp - start;
				let pct = ((progress*100)/tiempo) + "%";
				barra.style.width = pct;
				barra.innerHTML = pct;
				
				if (progress < tiempo) {
					proceso = window.requestAnimationFrame(step);
				} else {
					barra.style.width = "100%";	
					barra.innerHTML = "100%";	
				}
			}
			
			proceso = window.requestAnimationFrame(step);
		}
	});			
		
	document.querySelector("#stop").addEventListener("click", () => {
		window.cancelAnimationFrame(proceso);	
	});		
	
});*/

