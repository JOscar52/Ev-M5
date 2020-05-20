var busquedaHorizontal=0;
var busquedaVertical=0;
var buscarNuevosDulces=0;
var lencolum=["","","","","","",""];
var lenrest=["","","","","","",""];
var maximo=0;
var matriz=0;
var intervalo=0;
var eliminar=0;
var nuevosDulces=0;
var tiempo=0;
var i=0;
var contadorTotal=0;
var espera=0;
var score=0;
var mov=0,tmpc=0,camcolor=0;
var min=0;
var seg=-1;
var cm=0;
$(".btn-reinicio").click(function(){
	if (cm==1){$("#iniciar").html("Iniciar");cm=0;}
	else {$("#iniciar").html("Reiniciar");cm=1;}
	min=0;tmpc=0;mov=0;score=0;seg=0;
	$("#movimientos-text").html("0");
	$("#score-text").html("0");
	$("#timer").html("0:00");
	$(".termino").css({"display":"block"});
	$(".dt").hide();

	reinicio();
})

function reinicio(){
	i=0;

	$(".panel-score").css("width","25%");
	$(".panel-tablero").show();

	$(".time").show();

	clearInterval(eliminar);
	clearInterval(nuevosDulces);
	clearInterval(tiempo);
	min=0;
	borrartotal();
	intervalo=setInterval(function(){
		desplazamiento()
	},1000);
	tiempo=setInterval(function(){
		cronometro()
	},1000);
}

function desplazamiento(){
	i=i+1
	var numero=0;
	var imagen=0;
	$(".elemento").draggable({disabled:true});
	if(i<8){
		for(var j=1;j<8;j++){
			if($(".col-"+j).children("img:nth-child("+i+")").html()==null){
				numero=Math.floor(Math.random()*4)+1;
				imagen="image/"+numero+".png";
				$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start")
			}}}
	if(i==8){
	clearInterval(intervalo);
	eliminar=setInterval(function(){
		eliminarhorver()
	},150);}
};

function cronometro(){
if(min!=2){
	seg++;
	camcolor++; if (camcolor==2){camcolor=0;}

	if(camcolor == 1){
		$("#cambioColor").addClass("main-titulo1");
		$("#cambioColor").removeClass("main-titulo");
	}
	if(camcolor == 0){
		$("#cambioColor").addClass("main-titulo");
		$("#cambioColor").removeClass("main-titulo1");
	}

	if((min==2)&&(seg==10)){reinicio();}
	if(seg==60){
		min++;tmpc++;seg=0;

		if(min==2){

			$(".panel-tablero").hide("drop","slow",funcioncita);
			$(".dt").show();
			$(".time").hide();
		}
		}
	seg=seg.valueOf();
	if (seg < 10) { seg = "0"+seg;}
	$("#timer").html(tmpc+":"+seg);
}
};

function funcioncita(){

	$( ".panel-score" ).animate({width:'100%'},3000);
	$("#dt").html("Termina el Juego a los "+tmpc+" minutos ");


};

function borrartotal(){
	for(var j=1;j<8;j++){
		$(".col-"+j).children("img").detach();}
};

function eliminarhorver(){
	matriz=0;
	busquedaHorizontal=horizontal();
	busquedaVertical=vertical();
	for(var j=1;j<8;j++){
		matriz=matriz+$(".col-"+j).children().length;}
		if(busquedaHorizontal==0 && busquedaVertical==0 && matriz!=49){
		clearInterval(eliminar);
		buscarNuevosDulces=0;
		nuevosDulces=setInterval(function(){
			nuevosdulces()
		},600);}

	if(busquedaHorizontal==1||busquedaVertical==1){
		$(".elemento").draggable({disabled:true});
		$("div[class^='col']").css("justify-content","flex-end");
		$(".activo").hide("pulsate",1000,function(){
			var scorecon=$(".activo").length;
			$(".activo").remove("img");
			score=score+scorecon*1;
			$("#score-text").html(score);
		});
	}
	if(busquedaHorizontal==0 && busquedaVertical==0 && matriz==49){
		$(".elemento").draggable({
			disabled:false,
			containment:".panel-tablero",
			revert:true,
			revertDuration:0,
			snap:".elemento",
			snapMode:"inner",
			snapTolerance:40,
			start:function(event,ui){
				mov=mov+1;
				$("#movimientos-text").html(mov);}
		});
	}
	$(".elemento").droppable({
		drop:function (event,ui){
			var dropped=ui.draggable;
			var droppedOn=this;
			espera=0;
			do{
				espera=dropped.swap($(droppedOn));}
			while(espera==0);
			busquedaHorizontal=horizontal();
			busquedaVertical=vertical();
			if(busquedaHorizontal==0 && busquedaVertical==0){
				dropped.swap($(droppedOn));}
			if(busquedaHorizontal==1 || busquedaVertical==1){
				clearInterval(nuevosDulces);
				clearInterval(eliminar);
				eliminar=setInterval(function(){
					eliminarhorver()
				},150);}},
	});
};

jQuery.fn.swap=function(b){
	b=jQuery(b)[0];
	var a=this[0];
	var t=a.parentNode.insertBefore(document.createTextNode(''),a);
	b.parentNode.insertBefore(a,b);
	t.parentNode.insertBefore(b,t);
	t.parentNode.removeChild(t);
	return this;
};

function nuevosdulces(){

	$(".elemento").draggable({disabled:true});
	$("div[class^='col']").css("justify-content","flex-start")
	for(var j=1;j<8;j++){
		lencolum[j-1]=$(".col-"+j).children().length;}
	if(buscarNuevosDulces==0){
		for(var j=0;j<7;j++){
			lenrest[j]=(7-lencolum[j]);}
		maximo=Math.max.apply(null,lenrest);
		contadorTotal=maximo;}
	if(maximo!=0){
		if(buscarNuevosDulces==1){
			for(var j=1;j<8;j++){
				if(contadorTotal>(maximo-lenrest[j-1])){
					$(".col-"+j).children("img:nth-child("+(lenrest[j-1])+")").remove("img");}}
		}
		if(buscarNuevosDulces==0){
			buscarNuevosDulces=1;
			for(var k=1;k<8;k++){
				for(var j=0;j<(lenrest[k-1]-1);j++){
					$(".col-"+k).prepend("<img src='' class='elemento' style='visibility:hidden'/>");}}
		};
		for(var j=1;j<8;j++){
			if(contadorTotal>(maximo-lenrest[j-1])){
				numero=Math.floor(Math.random()*4)+1;
				imagen="image/"+numero+".png";
				$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>");}
		}
	}
	if(contadorTotal==1){
		clearInterval(nuevosDulces);
		eliminar=setInterval(function(){
			eliminarhorver()
		},150);
	}
	contadorTotal=contadorTotal-1;
};

function horizontal(){
	var busHori=0;
	for(var j=1;j<8;j++){
		for(var k=1;k<6;k++){
			var res1=$(".col-"+k).children("img:nth-last-child("+j+")").attr("src");
			var res2=$(".col-"+(k+1)).children("img:nth-last-child("+j+")").attr("src");
			var res3=$(".col-"+(k+2)).children("img:nth-last-child("+j+")").attr("src");
			if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null)){
				$(".col-"+k).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
				$(".col-"+(k+1)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
				$(".col-"+(k+2)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
				busHori=1;
			}
		}
	}
	return busHori;
};

function vertical(){
	var busVerti=0;
	for(var l=1;l<6;l++){
		for(var k=1;k<8;k++){
			var res1=$(".col-"+k).children("img:nth-child("+l+")").attr("src");
			var res2=$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("src");
			var res3=$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("src");
			if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null)){
				$(".col-"+k).children("img:nth-child("+(l)+")").attr("class","elemento activo");
				$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("class","elemento activo");
				$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("class","elemento activo");
				busVerti=1;
			}
		}
	}
	return busVerti;
};
