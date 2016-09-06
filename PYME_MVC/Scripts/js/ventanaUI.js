/// <reference path="funcionesUI.js" />

// 2016/02/17 Joel Rivas
//  LOS ELEMENTOS SIGUIENTES IDENTIFICAN EL NAVEGADOR
var nav = 1;
var elMov = document.createElement('div');
function CargaNav() {
    posicion = 0;
    if (navigator.userAgent.indexOf("MSIE") >= 0) nav = 0;
    else nav = 1;
};

//  QUITAR O DETENER EVENTOS
function NoEventos(event) {
    if (nav == 0) {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
    }
    if (nav == 1) event.preventDefault();
};


//  FUNCIONES PARA DAR EL EFECTO DE ARRASTRAR Y SOTAR
function IniMov(event, elDiv) {
    elMov = elDiv;
    if (nav == 0) {
        cursorComienzoX = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
        cursorComienzoY = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
        document.attachEvent("onmousemove", OnMovimiento);
        document.attachEvent("onmouseup", FinMov);
    }
    if (nav == 1) {
        cursorComienzoX = event.clientX + window.scrollX;
        cursorComienzoY = event.clientY + window.scrollY;
        document.addEventListener("mousemove", OnMovimiento, true);
        document.addEventListener("mouseup", FinMov, true);
    }
    elComienzoX = parseInt(elMov.style.left);
    elComienzoY = parseInt(elMov.style.top);
    elMov.style.zIndex = ++posicion;
    NoEventos(event);
}

function OnMovimiento(event) {
    var xActual, yActual;
    if (nav == 0) {
        xActual = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
        yActual = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
    }
    if (nav == 1) {
        xActual = event.clientX + window.scrollX;
        yActual = event.clientY + window.scrollY;
    }
    elMov.style.left = (elComienzoX + xActual - cursorComienzoX) + "px";
    elMov.style.top = (elComienzoY + yActual - cursorComienzoY) + "px";
    NoEventos(event);
}

function FinMov(event) {
    if (nav == 0) {
        document.detachEvent("onmousemove", OnMovimiento);
        document.detachEvent("onmouseup", FinMov);
    }
    if (nav == 1) {
        document.removeEventListener("mousemove", OnMovimiento, true);
        document.removeEventListener("mouseup", FinMov, true);
    }
}

window.onload = CargaNav;

// VENTANA PARA MENSAJES

function CapaModal(zi) {
    var capa = document.createElement('div');
    capa.style.background = 'rgba(38,45,55,0.4)';
    capa.style.width = '100%';
    capa.style.minHeight = '100%';    
    capa.style.zIndex = zi;
    capa.style.position = 'fixed';
    capa.style.top = '0px';
    capa.style.bottom = '0px';
    capa.style.transition = 'all 0.5s ease-in-out';
    return capa;
}


function VentanaMsj(aM) {
    this.datos = aM;
    var alto = ValDatos('alto', aM);
    var ancho = ValDatos('ancho', aM);

    alto = (alto != '') ? alto : 200;    
    ancho = (ancho != '') ? ancho : 320;

   
    var cm = CapaModal(999999);
    var cuerpo = document.getElementsByTagName('body').item(0);
    cuerpo.appendChild(cm);
    
	var tDevice = QueTipoDispositivo(); 	//Identificamos el tipo de dispositivo
	var arriba = (tDevice == 'movil')? 5: (window.innerHeight / 3);
	var izquierda = (tDevice == 'movil')? 10: (window.innerWidth / 2);
	var mArriba = (tDevice == 'movil')? '30px':'-' + ((alto + 50) / 2) + 'px';
	var mIzquierda = (tDevice == 'movil')? '0px':'-' + (ancho / 2) + 'px';	
	ancho = (tDevice == 'movil')? (screen.width - 100):ancho;
	alto = (tDevice == 'movil')? (screen.availHeight/2):alto;
	
	var arrastrar = ValDatos('arrastrar', aM);
	arrastrar = (arrastrar == '') ? true : false;
    var aVentana = document.createElement('div');
    aVentana.style.width = ancho + 'px';
    aVentana.style.height = alto + 'px';
    aVentana.style.backgroundColor = '#FFF';
    aVentana.style.zIndex = 99999999;
    aVentana.style.position = 'absolute';
    aVentana.style.top = arriba + 'px';
    aVentana.style.left = izquierda + 'px';
    aVentana.style.marginLeft = mIzquierda;
    aVentana.style.marginTop = mArriba;	
    aVentana.style.cursor = 'pointer';
    aVentana.style.boxShadow = '2px 2px 4px 2px Gray';
    if (arrastrar == true) {
        aVentana.draggable = true;
        aVentana.setAttribute('onmousedown', 'IniMov(event, this);');
        aVentana.onmouseover = function (e) {
            this.style.cursor = 'move';
        };
    }
    cm.appendChild(aVentana);


    var titulo = ValDatos('titulo', aM);
    var tituloMsj = document.createElement('label');
    tituloMsj.style.display = 'block';
    tituloMsj.style.backgroundColor = '#E3E9EE';
    tituloMsj.style.color = '#000';
    tituloMsj.style.fontSize = '13px';
    tituloMsj.style.padding = '5px 15px';
	tituloMsj.style.font = 'bold 1em Helvetica,Arial,sans-serif';
    tituloMsj.textContent = titulo;
    aVentana.appendChild(tituloMsj);


    var mensaje = ValDatos('mensaje', aM);
    var aMensajes = ValDatos('aMensajes', aM);
    if (aMensajes != '') {
        var lista = document.createElement('ul');
        lista.style.listStyle = 'none';
        lista.style.marginLeft = '15px';
        lista.style.padding = '0px';
        for (var i = 0; i < aMensajes.length; i++) {
            var rMsj = aMensajes[i];
            var liMsj = document.createElement('li');
            liMsj.style.marginBottom = '15px';
            liMsj.innerHTML = rMsj;
            lista.appendChild(liMsj);
        }
        mensaje += lista.innerHTML;
    }

    var contM = document.createElement('div');
    contM.innerHTML = mensaje;
    contM.style.backgroundColor = '#f2f2f2';
    contM.style.color = '#000';
    contM.style.fontWeight = 'lighter';
    contM.style.padding = '5px';
    contM.style.fontSize = '11px';
    contM.style.overflowY = 'scroll';
    contM.style.overflowX = 'hidden';
    contM.style.listStyle = 'none';
	contM.style.font = 'normal 0.8em Helvetica,Arial,sans-serif';
    contM.style.height = (alto - 65) + 'px';    
    aVentana.appendChild(contM);


    var txtBoton = ValDatos('txtBoton', aM);
    txtBoton = (txtBoton != '') ? txtBoton : 'Aceptar';
    var bAceptar = document.createElement('span');
    bAceptar.style.display = 'block';
    bAceptar.style.backgroundColor = '#428BCA';
    bAceptar.style.color = '#fff';
    bAceptar.style.padding = '3px 5px';
    bAceptar.style.width = '120px';
	bAceptar.style.position = 'absolute';
    bAceptar.style.right = '1px';
	bAceptar.style.bottom = '1px';
    bAceptar.style.fontSize = '13px';
	bAceptar.style.font = 'bold 0.8em Helvetica,Arial,sans-serif';
    bAceptar.style.textAlign = 'center';
    bAceptar.style.cursor = 'pointer';    
    bAceptar.style.transition = 'all 0.5s ease-in-out';    
	bAceptar.style.zIndex = '9999999';
    bAceptar.textContent = txtBoton;
	aVentana.appendChild(bAceptar);
	
	var ctrlFocus = ValDatos('ctrlFocus', aM);

	var confirmar = ValDatos('confirmar', aM);
	confirmar = (confirmar == true)? true:false;
	
	var esFormulario = ValDatos('esFormulario', aM);
	
	var ctrlResultado = ValDatos('ctrlResultado', aM);
	
	var FnDefault = function (e) { return true; };
	
	var FnAceptar = ValDatos('FnAceptar', aM);
	FnAceptar = (FnAceptar == '')? FnDefault:FnAceptar;
	
	var fnTerminaVentan = function(e){
		if (document.getElementById(ctrlFocus)) {
			document.getElementById(ctrlFocus).focus();
			document.getElementById(ctrlFocus).select();
		}
		FnAceptar(e);		
		cuerpo.removeChild(cm);
		var sonido = new Audio('../clock.mp3').play();	 
	}
	bAceptar.onclick = fnTerminaVentan;
	
	if (confirmar == true || esFormulario == true) {
	    var txBtnCancelar = ValDatos('txBtnCancelar', aM);
	    txBtnCancelar = (txBtnCancelar != '') ? txBtnCancelar : 'Cancelar';
	    var bCancelar = document.createElement('span');
	    var styleBtn = bAceptar.style;
	    bCancelar.style.cssText = styleBtn.cssText;
	    bCancelar.textContent = txBtnCancelar;
	    aVentana.appendChild(bCancelar);
	    bCancelar.focus();
	    bAceptar.style.right = '150px';
	    	    
		if (esFormulario == true) {
			contM.className = 'div-estilo-formulario';
			contM.id = 'form-Ventana-' + mensaje.length;
			if(!document.getElementById(ctrlResultado)) {
				alert('No se puede guardar el formulario (revisar configuración) ' + ctrlResultado);
			}
			
			bAceptar.onclick = function (e) {
				//Funcion que obtiene valores de formulario.
				GuardaFormEnJSON('form-Ventana-' + mensaje.length, ctrlResultado);
				if (document.getElementById(ctrlFocus)) {
					document.getElementById(ctrlFocus).focus();
					document.getElementById(ctrlFocus).select();
				}
				cuerpo.removeChild(cm);
				var sonido = new Audio('../clock.mp3').play();
			};
		} 
		fnTerminaVentan = function(e){
			if (document.getElementById(ctrlFocus)) {
				document.getElementById(ctrlFocus).focus();
				document.getElementById(ctrlFocus).select();
			}
			cuerpo.removeChild(cm);
			var sonido = new Audio('../clock.mp3').play();	 
		}
	    bCancelar.onclick = fnTerminaVentan;
	} else {
	    bAceptar.focus();	    
	}

    
}// fin de ventana



