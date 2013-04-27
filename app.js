var express = require("express");
var app = express();
var combos = require('./combos.js');

app.get('/', function(req, res) {
  var results = [];
  res.header("Access-Control-Allow-Origin", "*")
  var c = combos.combos(req.query["superset"], req.query["size"]);
  for (var i = 0; i < c.length; i++) {
    var combo = c[i];
    var sum = 0;
    for (var ii = 0; ii < combo.length; ii++) {
      sum += Number(combo[ii].value);
    }
    var value = sum / req.query["divisor"];
    results.push({
      combo : combo,
      value : value.toFixed(2)
    })
  }
  res.send(JSON.stringify(results));
});

// Launch server

app.listen(4242);
