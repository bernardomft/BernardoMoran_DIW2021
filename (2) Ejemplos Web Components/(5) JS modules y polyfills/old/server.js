"use strict";

var fs = require('fs');

var express = require('express');

var app = express();
app.use(express["static"](__dirname)); // Si no hay index.html, entonces mostramos todos los archivos de la carpeta que son HTML

app.get('/', function (req, res) {
  var html = '';
  var re = new RegExp(/([a-zA-Z0-9\s_\\.\-\(\):])+(.html)$/);
  fs.readdir(__dirname, function (err, items) {
    for (var i = 0; i < items.length; i++) {
      if (re.test(items[i])) {
        html += "<p><a href=\"".concat(items[i], "\">").concat(items[i], "</a></p>");
      }
    }

    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.write(html);
    res.end();
  });
});
app.listen('8080', function () {
  console.log('Servidor web escuchando en el puerto 8080');
});