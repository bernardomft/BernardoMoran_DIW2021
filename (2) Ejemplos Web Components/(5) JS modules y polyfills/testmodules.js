let number = 4;
const saludar = () => "¡Hola!";
const goodbye = () => "¡Adiós!";
class Clase {}

export { number };                          // Se crea un módulo y se añade number
export { saludar, goodbye as despedir };    // Se añade saludar y despedir al módulo
export { Clase };                			// Se añade Clase al módulo
export { saludar as otroNombre };           // Se añade otroNombre al módulo

export const f1 = () => 42;                       // Se crea un módulo y se añade f1
export default function f2() { return "Manz"; };  // Se añade f2 al módulo (default)

console.log("Prueba ejecución");