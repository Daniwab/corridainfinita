   ////////////////////////////
//// ESTUDANDO DE JAVASCRIPT ////
  ////////////////////////////

/* Matrizes e operações com matrizes */


//var soma = notas[0]+notas[1]+notas[2]+notas[3]

//console.log(soma/4)


var notas = [7,9,10,9]

function media(){
  var s = 0;
  for(var i = 0; i < notas.length; i++){
    s += notas[i]/4
  }
  console.log(s)
}

media();