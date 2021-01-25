Object.prototype.cuandoCambie = function (nodo, callback) {

  /*
  * this, hace referencia al objeto
  * actual que manipulamos, (por ejemplo)
  * person en el ejemplo anterior
  *
  * Asginamos el valor del nodo, a una
  * variable que guarde el valor anterior
  * this[nodo] equivale a person['name']
  */
  let valorAntiguo = this[nodo]

  Object.defineProperty(this, nodo, {
    get: function () {
      /*
      * El getter retorna el valor antiguo
      * es decir, el valor original del nodo
      */
      return valorAntiguo
    },
    set: function (nuevoValor) {
      /*
      * Utilizamos defineProperty para
      * indicar que cuando sea asignado un
      * valor al nodo, ejecute el callback
      * pasando como parámetro el valor nuevo
      * y el viejo
      */
      callback(nuevoValor, valorAntiguo || undefined)
      valorAntiguo = nuevoValor // <- para conservar el valor en la variable
    }
  })
}