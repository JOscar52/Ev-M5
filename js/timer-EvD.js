var centesimas = 0;
var segundos = 0;
var minutos = 0;
var horas = 0;
var control;
function inicio () {
	control = setInterval(cronometro,10);

}
function parar () {
	clearInterval(control);

}
function reinicio () {
	alert("reinicio");
	$(".contenido").removeClass("contenido1");
	$("#ps").addClass("panel-score");
	$("#ps").removeClass("panel-score1");
	$("#pt").addClass("panel-tablero");
	$("#pt").removeClass("panel-tablero1");

		alert("reinicio "+minutos+":"+segundos+":"+segundos);
	clearInterval(control);
	centesimas = 0;
	segundos = 0;
	minutos = 0;
	horas = 0;
	Centesimas.innerHTML = ":00";
	Segundos.innerHTML = ":00";
	Minutos.innerHTML = ":00";
	Horas.innerHTML = "00";

	inicio();
	ordenarBloques();
}
function cronometro () {
	//if(minutos==2){alert("Reinicio" + miutos);reinicio();}
	if (centesimas < 99) {
		//alert("Crono Centesimas " centesimas);
		centesimas++;
		//alert("Crono Centesimas " centesimas);

		if (centesimas < 10) { centesimas = "0"+centesimas }
		Centesimas.innerHTML = ":"+centesimas;
	}
	if (centesimas == 99) {
		centesimas = -1;
	}
	if (centesimas == 0) {
		//if(segundos<3){alert("seg "+segundos+" cen "+centesimas);}
		segundos ++;
		if (segundos < 10) { segundos = "0"+segundos }
		Segundos.innerHTML = ":"+segundos;
		SSegundos.innerHTML = "0"+minutos+":"+segundos;
	}
	if (segundos == 59) {
		segundos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0) ) {
		minutos++;
		//if (segundos<3){alert("min "+minutos);}
		if (minutos < 10) { minutos = "0"+minutos }
		Minutos.innerHTML = ":"+minutos;
		//MMinutos.innerHTML=minutos;
	}
	if (minutos == 59) {
		minutos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0)&&(minutos == 0) ) {
		horas ++;
		if (horas < 10) { horas = "0"+horas }
		Horas.innerHTML = horas;
	}

	if((minutos==1)&&(segundos==10)){reinicio();}
	if(minutos==1){
		$(".contenido").addClass("contenido1");
		$("#ps").addClass("panel-score1");
		$("#ps").removeClass("panel-score");
		$("#pt").addClass("panel-tablero1");
		$("#pt").removeClass("panel-tablero");
	}
}
