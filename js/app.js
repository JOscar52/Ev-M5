var movi=0, cm=0;
$(function(){
  var numeroClicks = 0;
  var posh=0, posv=0;
  /**********************************************************/
  //  POSICIÓN DEL APUNTADOR
  $(document).mousemove(function(event){
    $("#posX").text(event.pageX);
    $("#posY").text(event.pageY);
  });
  /**********************************************************/
  /*******************************************************/
  // FIN DE COORDENADAS
  /***********************************************/
 // ORDENA ALEATORIAMENTE LAS IMGENES

 function ordenarBloques(){
   //alert("Ordenar1");
   $$('.cuadro').each(function(item){
     item.setStyle({order: makeUniqueRandom()})
   })
 }
 var uniqueRandoms = [];
 //var numRandoms = 20;
 var numRandoms = 49;

 function makeUniqueRandom() {
     // refill the array if needed
     //alert("ordenarBloques"+ numRandoms);
     if (!uniqueRandoms.length) {
         for (var i = 0; i < numRandoms; i++) {
             uniqueRandoms.push(i);
         }
     }
     var index = Math.floor(Math.random() * uniqueRandoms.length);
     var val = uniqueRandoms[index];

     // now remove that value from the array
     uniqueRandoms.splice(index, 1);
 //alert("random "+val);
     return val;

 }


 // FIN ORDENA ALEATORIAMENTE LAS IMGENES
/********************************************************/
/********************************************/
//      Evento CLICK y DRAG jQuery


$(".cuadro").on("click", function(){

  var or=$("div").find(".c11").css("order");
  var ub=$(this).find("img").position();
  posh=ub.top;
  posv=ub.left;

    var ruta = $(this).find("img").attr("src");
    var rtaa = $(this).find("img").attr("id");

      if (ruta!="image/2.png"){
      $(this).animate({
      top:"-=100px"},1000,function(){
      });}
      movi++;
      movimientos.innerHTML=movi;
  })
  .draggable({
    start: function(){

      $(this)
        .off("click")
        .css("z-index","2")
    }
  })


  //  MUEVE LA IMAGEN
/*//    function arrastra(){
//*/
/*//      alert("ruta arrastra="+ruta);
    $(".contenido").mousedown(function(){
alert("ruta mousedown arrastra="+ruta);
    //alert("mouse down");
      //
      //*/
/*//      var self = $(this);

      $(this).addClass("imagen-seleccionada");
      $(this).on('dragstart', function(event) {alert("1");
        event.preventDefault();
      });
      //$(".cuadro").mousemove(function(event){
  /*/
  /*//    $(".cuadro").mousemove(function(event){alert("2");

        self.css("left", function(){
          var newLeft = event.pageX-50; /*-100 - 234;*/
  /*//        return newLeft+"px";
          alert("cambia posición "+ruta);
        });
        self.css("top", function(){
          var newLeft = event.pageY-80; /*-150 - 591;*/
  /*//        return newLeft+"px";
        });
      });
    });//*/
    //$(".cuadro").mouseup(function(event){
/*//    $(".cc").mouseup(function(event){
      alert("Mouse up");
      $(event.target).removeClass("imagen-seleccionada");
      $(this).off("mousemove");
    });
  }//*/
  /*******************************************************/
  // FIN DEL MOVIMIENTO DE LA IMAGEN

/********************************************/

/*************************************************/
//INICIO Selecciona IMAGEN con click
/*function primerClick(){
  if(numeroClicks==1){
    return true;
  }else return false;
}
function ultimoClick(){
  if($$('.cuadro').length==2){
    var numMostrados=0;
    $$('.cuadro .contenido').each(function(item){
      if (item.visible()) {
        numMostrados++;
      }
    })
    if (numMostrados==2) {
      return true;
    }else return false;

  }else return false;
}

function getMostrados(){ //está en Base
  var imgMostradas = new Array()
  var i = 0;
//alert("getMostrados ");
  $$('.contenido').each(function(item, index){
    if(item.visible()){
      imgMostradas[i]=item;
      i++;
    }
  });
  return imgMostradas;
}
/*****************************************
function mostrarImg(event){
  alert("mostrarImg");
  //var bloqueClickeado = event.findElement();
  var bloqueClickeado = $(this).click();
  numeroClicks++;
  bloqueClickeado.down().show();
  decisionBloques();
  if (primerClick()) {
    //inicio();
     alert("primerClick");
  }else if (ultimoClick()) {
    //parar();
    alert("ultimoClick");
  }
}
/********************************************/
/********************************************/
/*function decisionBloques(){
  if (check2Clicks()) {
    $('tablero').stopObserving('click');
    if (matchSeleccionados()) {
      exitoMatch.delay(1);
    }else {
      hideAll.delay(1);
    }
  }
}
/*****************************************************/
/*function matchSeleccionados(){
  var seleccionados = getMostrados();
  if (seleccionados[0].readAttribute('src')==seleccionados[1].readAttribute('src')) {
    return true;
  }else return false;
}
/********************************************************/
/*function exitoMatch(){
  var seleccionados = getMostrados();
  seleccionados.each(function(item){
    item.hide();
    item.up().removeClassName('cuadro');
    item.up().addClassName('cuadroExito');
  })
  bloqueHand()
}

function resetCuadros(){
  $$('.contenido').each(function(item){
    item.up().addClassName('cuadro');
    item.up().removeClassName('cuadroExito');

  })
}

/************************************************/
//FIN Selecciona IMAGEN con click
/***********************************************/
//Botón inicioJuego
/************************************************/
  //jQuery.noConflict();
  //jQuery(document).ready(function($){
   //alert("SS");
   //inicioJuego();
   //resetCuadros();
   //document.observe("dom:loaded", function(){
  //   alert("DOM");
     $(".btn-reinicio").click(function(){
       if (cm==1){camTexto.innerHTML="Iniciar";cm=0;}
       else {camTexto.innerHTML="Reiniciar";cm=1;}

       //$("#gallina").toggle();

       reinicio();
   });

/***************************************/
/**************************************/
//              timer
var centesimas = 0;
var segundos = 0;
var minutos = 0;
var horas = 0;
//var movi=0
var tmpc=0;
var camcolor=0;
var control;
function inicio () {
	control = setInterval(cronometro,10);

}
function parar () {
	clearInterval(control);

}
function reinicio() {

	$(".contenido").removeClass("contenido1");
	$("#ps").addClass("panel-score");
	$("#ps").removeClass("panel-score1");
	$("#pt").addClass("panel-tablero");
	$("#pt").removeClass("panel-tablero1");


	clearInterval(control);
	centesimas = 0;
	segundos = 0;
	minutos = 0;
	horas = 0;
  movi=0;

  movimientos.innerHTML=movi;
	inicio();
	ordenarBloques();
}
function cronometro () {

	if (centesimas < 99) {

		centesimas++;

		if (centesimas < 10) { centesimas = "0"+centesimas }

	}
	if (centesimas == 99) {
		centesimas = -1;
	}
	if (centesimas == 0) {
		segundos ++;
    camcolor++; if (camcolor==2){
    camcolor=0;}
		if (segundos < 10) { segundos = "0"+segundos }

		SSegundos.innerHTML = tmpc+":"+segundos;
	}
	if (segundos == 59) {
		segundos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0) ) {
		minutos++;tmpc++;

		if (minutos < 10) { minutos = "0"+minutos;}
    if (tmpc < 10) { tmpc = "0"+tmpc; }

    if(parseInt(tmpc/2)==tmpc/2){
    }
	}
	if (minutos == 59) {
		minutos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0)&&(minutos == 0) ) {
		horas ++;
		if (horas < 10) { horas = "0"+horas }

	}

  if(camcolor == 1){
    $("#cambioColor").addClass("main-titulo1");
    $("#cambioColor").removeClass("main-titulo");
  }
  if(camcolor == 0){
    $("#cambioColor").addClass("main-titulo");
    $("#cambioColor").removeClass("main-titulo1");
  }
	if((minutos==2)&&(segundos==10)){reinicio();}
	if(minutos==2){
		$(".contenido").addClass("contenido1");
		$("#ps").addClass("panel-score1");
		$("#ps").removeClass("panel-score");
		$("#pt").addClass("panel-tablero1");
		$("#pt").removeClass("panel-tablero");
	}
}

/***************************************/
 });
