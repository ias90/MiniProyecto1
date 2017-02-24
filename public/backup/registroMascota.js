function crearPerro(){

alert('hola');
var nombre = document.getElementById('getnombre').value;
var edad = document.getElementById('getedad').value;
var historia = document.getElementById('gethist').value;

var GET = {};
var queryString = window.location.search.replace(/^\?/,'');
queryString.split(/\&/).forEach(function(keyValuePair){
  var paramName = keyValuePair.replace(/=.*$/,"");
  var paramValue = keyValuePair.replace(/^[^=]*\=/,"");
  GET[paramName] = paramValue;
});

var cedula = decodeURI(GET["id"]);
alert(cedula);

firebase.database().ref('perro/'+cedula).set({
  nombre:nombre,
  edad:edad,
  historia:historia
}).then(function(){
  window.location = "/";

}, function(error){
  alert(error.code);
});