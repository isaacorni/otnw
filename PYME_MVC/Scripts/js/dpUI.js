/// <reference path="funcionesUI.js" />


//  2015/04/08  Luis Morales
//  Objeto que crea un control fecha picker generico y configurable

var _quitaVentana;

function ArmarCalendario(aCnf){
	this.yFin = 0;
    this.mFin = 0;
    this.dFin = 0;
	
    this.yIni = 0;
    this.mIni = 0;
    this.dIni = 0;
    this.meses = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
	this.diasSemana = new Array('Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb');
	var dInv = [];
	var regresaCalendario = true;
	
	var idtxt = ValDatos('idtxt', aCnf);
		
	var yy = ValDatos('yy', aCnf);
	var mm = ValDatos('mm', aCnf);
	var dd = ValDatos('dd', aCnf);
	var idDiv = ValDatos('idDiv', aCnf);
	var nvlCalendario = ValDatos('nvlCalendario', aCnf);
	nvlCalendario = (nvlCalendario != '')? nvlCalendario: 'dias';
	
	var EvtSelect = ValDatos('EvtSelect', aCnf);
	EvtSelect = (EvtSelect != '') ? EvtSelect : function (e) { };
	
	if (!document.getElementById(idtxt)){
		alert('Sin objeto base');
		return;
	}
	
	var txtDp = document.getElementById(idtxt);
	
	    
	//	Si existe un limite de fecha inferior 
	//	se acota la creacion con el siguiente codigo
    if (txtDp.getAttribute('data-fin')) {
        var fchFinal = txtDp.getAttribute('data-fin');
        var fcIni = FchValores(fchFinal);  //    desglose de fecha
        this.yFin = fcIni.anio;
        this.mFin = fcIni.mes;
        this.dFin = fcIni.dia;
        if (this.yFin < yy) return;
        if (this.mFin < mm) {
            if (this.yFin <= yy) return;
        }
    }
	
	
	//	Si existe un limite de fecha superior
	//	se acota la creacion con el siguiente codigo
    if (txtDp.getAttribute('data-ini')) {
        var fchIninal = txtDp.getAttribute('data-ini');
        var fcFin = FchValores(fchIninal);  //    desglose de fecha
        this.yIni = fcFin.anio;
        this.mIni = fcFin.mes;
        this.dIni = fcFin.dia;
        if (this.yIni > yy) return;
        if (this.mIni > mm) {
            if (this.yIni >= yy) return;
        }
    }

    if (txtDp.getAttribute('data-inv')) {
        dInv = txtDp.getAttribute('data-inv').split(',');
    }
    
	var divDp = document.createElement('div');
	divDp.id = 'area-calendario-' + idtxt;
	if(document.getElementById(idDiv)){
		divDp = document.getElementById(idDiv);
		divDp.innerHTML = '';
		regresaCalendario = false;
	}

    var tHead = document.createElement('table');
    tHead.style.width = '100%';
    tHead.style.margin = 'auto';
    var rengH = tHead.insertRow(0);
    var btnIzq = rengH.insertCell(0);
    btnIzq.style.padding = '0px';
    btnIzq.style.fontWeight = 'bold';
    btnIzq.style.color = '#25306C';
    btnIzq.style.cursor = 'pointer';
    btnIzq.style.textAlign = 'left';
    btnIzq.innerHTML = '&nbsp;«';
	//	Navegar al mes anterior
    btnIzq.onclick = function (e) {
        var diaAnt = new Date(yy, (mm - 1), dd);        
		switch (nvlCalendario) {
			case 'dias':
				diaAnt.setMonth(diaAnt.getMonth() - 1);
				break;
			case 'meses':
				diaAnt.setYear(diaAnt.getFullYear() - 1);
				break;
			case 'anio':
				diaAnt.setYear(diaAnt.getFullYear() - 12);
				break;
		}
		
        var dCad = FormatoFecha(diaAnt).split('/');		
        var ACalIzq = new ArmarCalendario({			
			idtxt: idtxt
			,yy: dCad[0]
			,mm: dCad[1]
			,dd: dCad[2]
			,idDiv: idDiv
			,nvlCalendario: nvlCalendario
			,EvtSelect: EvtSelect
		});
		
    };

    
    var tituloCentro = rengH.insertCell(1);
    tituloCentro.style.padding = '0px';
    tituloCentro.style.width = '60%';
    tituloCentro.style.textAlign = 'center';
    tituloCentro.style.color = '#25306C';
    tituloCentro.style.fontWeight = 'lighter';
    tituloCentro.style.cursor = 'pointer';
    tituloCentro.style.textShadow = '1px 1px 2px #515151';
    tituloCentro.innerHTML = this.meses[parseInt(mm) - 1] + ' ' + yy;    
	if(nvlCalendario != 'dias'){
		var textoTitulo = (nvlCalendario == 'meses') ? yy : ((parseInt(yy) - 6) + '-' + (parseInt(yy) + 5));
		tituloCentro.innerHTML = textoTitulo;		
	}
	tituloCentro.title = idtxt + '/' + yy + '/' + mm + '/' + dd + '/' + idDiv + '/' + nvlCalendario;
    tituloCentro.onclick = function (e) {
        var datCad = this.title.split('/');
        var nvlCalend = (datCad[5] == 'anio')? 'dias':
					   ((datCad[5] == 'dias')? 'meses':
					   ((datCad[5] == 'meses')? 'anio':nvlCalendario));
						 
		var ACalCrea= new ArmarCalendario({			
									idtxt: datCad[0]
									,yy: datCad[1]
									,mm: datCad[2]
									,dd: datCad[3]
									,idDiv: datCad[4]
									,nvlCalendario: nvlCalend
									,EvtSelect: EvtSelect
								});		
    };

    var btnDer = rengH.insertCell(2);
    btnDer.style.padding = '0px';
    btnDer.style.fontWeight = 'bold';
    btnDer.style.textAlign = 'right';
    btnDer.style.cursor = 'pointer';
    btnDer.style.color = '#25306C';
    btnDer.innerHTML = '»&nbsp;';
	//	Navegar al mes siguiente
    btnDer.onclick = function (e) {
        var diaAnt = new Date(yy, (mm - 1), dd);
        switch (nvlCalendario) {
			case 'dias':
				diaAnt.setMonth(diaAnt.getMonth() + 1);
				break;
			case 'meses':
				diaAnt.setYear(diaAnt.getFullYear() + 1);
				break;
			case 'anio':
				diaAnt.setYear(diaAnt.getFullYear() + 12);
				break;
		}
		var dCad = FormatoFecha(diaAnt).split('/');
		var ACalDer= new ArmarCalendario({			
			idtxt: idtxt
			,yy: dCad[0]
			,mm: dCad[1]
			,dd: dCad[2]
			,idDiv: idDiv
			,nvlCalendario: nvlCalendario
			,EvtSelect: EvtSelect
		});
        
    };


    divDp.appendChild(tHead);
	
	var TCuerpo = document.createElement('table');	
	TCuerpo.style.width = '100%';
	TCuerpo.style.transition = 'all 0.4s ease-in-out';
	var tH = TCuerpo.createTHead();
	tH.style.backgroundColor = '#0589C9';
	
	switch (nvlCalendario) {
        case 'dias':		
			
			var rengBH = tH.insertRow(0);
			rengBH.style.backgroundColor = '#0589C9';    
			var tB = TCuerpo.createTBody();
			for (var i = 0; i < 7; i++) {
				var celdatH = rengBH.insertCell(i);
				celdatH.style.textAlign = 'center';
				celdatH.style.padding = '2px 5px';
				celdatH.style.fontSize = '12px';
				celdatH.style.backgroundColor = '#0589C9';
				celdatH.style.color = '#FFF';
				celdatH.innerHTML = this.diasSemana[i];
			}
			var dS = 1;
			var ultimoDia = DiasEnMes(mm, yy);
			var fchEmp = new Date(yy, (mm - 1), 1);
			var diaEmpieza = fchEmp.getDay();
			var ddPinta = 1;

			if (this.mFin <= mm) {
				if (this.yFin <= yy) ultimoDia = (this.dFin != 0) ? this.dFin : ultimoDia;
			}

			if (this.yIni >= yy) {
				if (this.mIni >= mm) ddPinta = (this.dIni != 0) ? this.dIni : 1;
			}


			for (var j = 0; j < 6; j++) {
				var rengBB = tB.insertRow(j);
				for (var k = 0; k < 7; k++) {
					var celdatB = rengBB.insertCell(k);
					celdatB.style.height = '20px';
					celdatB.style.textAlign = 'center';
					celdatB.style.fontSize = '11px';
					celdatB.style.color = '#000';            
					celdatB.style.transition = 'all 0.4s ease-in-out';
					var invalido = dInv.indexOf(k.toString());
					if (invalido == (-1)) {
						celdatB.style.cursor = 'pointer';
						celdatB.style.backgroundColor = '#FFF';
					}
					else {
						celdatB.style.backgroundColor = '#CCFFFF';
						celdatB.setAttribute('data-inv', false);
					}
					if (dS <= ultimoDia) {

						if (dS == 1) {
							if (k == parseInt(diaEmpieza)) {
								if (dS >= ddPinta) {
									celdatB.innerHTML = dS;
									celdatB.title = mm + '/' + yy;
								}
								dS++;
							}
							else {
								celdatB.innerHTML = '';
							}
						}
						else {
							var diaFecha = parseInt(dd);
							if (dS >= ddPinta) {
								celdatB.style.border = (diaFecha == dS) ? '1px solid #2299DD' : '';
								celdatB.innerHTML = dS;
								celdatB.title = mm + '/' + yy;
							}
							dS++;
						}
						if (invalido == (-1)) {							
							celdatB.onclick = function (e) {
								var nDia = this.innerHTML;
								if (nDia.length == 0) return;
								
								if (this.getAttribute('data-inv')) {
									if (this.getAttribute('data-inv') == false) return;
								}
								
								var numDia = this.innerHTML;
								if (numDia.length != 0) {
									var mmYY = this.title.split('/');
									txtDp.value = ('0' + numDia).slice(-2) + '/' + mmYY[0] + '/' + mmYY[1];
									txtDp.data = mmYY[1] + '/' + mmYY[0] + '/' + ('0' + numDia).slice(-2);
									e.data = mmYY[1] + '/' + mmYY[0] + '/' + ('0' + numDia).slice(-2);
									EvtSelect(e);
									var cuerpo = divDp.parentElement;
									cuerpo.removeChild(divDp);
								}								
								var cuerpo = divDp.parentElement;
								if(cuerpo){
									cuerpo.removeChild(divDp);
								}
							};                   
						}
					}
				};
			};
			
		
			break;
		case 'meses':
            var im = 0;
            var mfin = (this.yFin <= yy) ? this.mFin : 12;
            mfin = (mfin == 0) ? 12 : mfin;
            var mIni = (this.yIni >= yy) ? this.mIni : 0;

            for (var mf = 0; mf < 4; mf++) {
                var rengM = TCuerpo.insertRow(mf);
                for (var mc = 0; mc < 3; mc++) {
                    var celM = rengM.insertCell(mc);
                    celM.style.textAlign = 'center';
                    celM.style.fontSize = '12px';
                    celM.style.padding = '0px';
                    celM.style.width = '80px';
                    celM.style.height = '40px';
                    celM.style.backgroundColor = '#29A0E4';
                    celM.style.border = '2px solid #FFF';
                    celM.style.transition = 'all 0.4s ease-in-out';
                    celM.title = idtxt + '/' + yy + '/' + ('0' + (im + 1)).slice(-2) + '/' + dd + '/' + idDiv + '/meses';                    
                    if (im < mfin) {
                        // validar comparacion de meses
                        if (im >= (mIni - 1)) {
                            celM.innerHTML = this.meses[im];
                            celM.style.color = '#FFF';
                            celM.onclick = function (e) {
								var datCad = this.title.split('/');								
								var ACalCrea= new ArmarCalendario({			
									idtxt: datCad[0]
									,yy: datCad[1]
									,mm: datCad[2]
									,dd: datCad[3]
									,idDiv: datCad[4]
									,nvlCalendario: 'dias'
									,EvtSelect: EvtSelect
								});		
                            };
                        }
                        else { celM.style.color = '#29A0E4'; }
                    }
                    else { celM.style.color = '#29A0E4'; }
                    im++;
                }
            }
            break;
        case 'anio':
            var anio = parseInt(yy) - 6;
            var anioIni = (this.yIni != 0) ? this.yIni : anio;
            for (var i = 0; i < 4; i++) {
                var nuevoR = TCuerpo.insertRow(i);
                for (var j = 0; j < 3; j++) {
                    var celAnio = nuevoR.insertCell(j);
                    celAnio.style.textAlign = 'center';
                    celAnio.style.padding = '0px';
                    celAnio.style.width = '10%';
                    celAnio.style.height = '40px';
                    celAnio.style.backgroundColor = '#29A0E4';
                    celAnio.style.border = '2px solid #FFF';
                    celAnio.style.transition = 'all 0.4s ease-in-out';
                    celAnio.title = idtxt + '/' + anio + '/' + mm + '/' + dd + '/' + idDiv + '/anio';
                    celAnio.style.color = '#FFF';
                    if (anio >= anioIni) {
                        celAnio.innerHTML = (this.yFin == 0) ? anio : (this.yFin < anio) ? '' : anio;
                        celAnio.onclick = function (e) {
                            var datCad = this.title.split('/');
                            var ACalCrea= new ArmarCalendario({			
									idtxt: datCad[0]
									,yy: datCad[1]
									,mm: datCad[2]
									,dd: datCad[3]
									,idDiv: datCad[4]
									,nvlCalendario: 'meses'
									,EvtSelect: EvtSelect
								});
                        };
                    }
                    anio++;
                }
            }
            break;
    }
	

    divDp.appendChild(TCuerpo);
	
	if(nvlCalendario == 'dias'){
		var hoy = new Date();
		var aHoy = document.createElement('a');
		aHoy.style.display = 'block';
		aHoy.style.color = '#54696E';
		aHoy.style.textAlign = 'center';
		aHoy.style.fontWeight = 'lighter';
		aHoy.textContent = 'Hoy - ' + hoy.toLocaleDateString();
		divDp.appendChild(aHoy);
	
		aHoy.onclick = function (e) {
			txtDp.value = FormatoFecha(hoy, 'mx');
			txtDp.data = FormatoFecha(hoy, 'jp');
			var cuerpo = divDp.parentElement;
			cuerpo.removeChild(divDp);        
		}
	}
	
	if(regresaCalendario == false){
		return divDp;
	}
	
}

function FechaPkrUI(aD){
	this.aDatos = aD;
	var regresaObjeto = true;
	this.idTx = ValDatos('idTx', aD);
	if(this.idTx == '') {
		this.idTx = ProponeId('txtFecha', 1);
	}	
	
	this.idCajaCalendario = 'txt-dp-' + this.idTx;
	
	var altoCaja = ValDatos('altoCaja', aD);
	var alto = ValDatos('alto', aD);
	alto = (alto != '') ? alto : 200;

	var ancho = ValDatos('ancho', aD);
	ancho = (ancho != '') ? ancho : 250;

	var conValor = ValDatos('conValor', aD);
	conValor = (conValor != '') ? conValor : false;

	var fecha = ValDatos('fecha', aD);
	fecha = (fecha != '') ? fecha : new Date();
	
	var cajaFecha = document.createElement('input');
	cajaFecha.id = this.idTx;
	cajaFecha.type = 'text';
	if(document.getElementById(this.idTx)){
		cajaFecha = document.getElementById(this.idTx);
		regresaObjeto = false;
	} 
	
	try { cajaFecha.style.backgroundImage = 'url(../Img/icon_datepicker.gif)'; } catch (e) { cajaFecha.style.backgroundColor = '#FFF'; }
	cajaFecha.style.backgroundRepeat = 'no-repeat';
	cajaFecha.style.backgroundPosition = '90% 2px';
	cajaFecha.style.height = (altoCaja != '') ? altoCaja + 'px' : '28px';
	cajaFecha.style.borderRadius = '4px';
	cajaFecha.style.border = '1px solid #999';
	cajaFecha.style.textIndent = '4px';
	cajaFecha.style.textAlign = 'left';
	cajaFecha.style.fontFamily = 'inherit';
	cajaFecha.style.cursor = 'pointer';
	cajaFecha.style.color = '#000';
	cajaFecha.style.transition = 'all 0.3s ease-in-out 0s';
	
	var EvtCambio = ValDatos('EvtCambio', aD);
	EvtCambio = (EvtCambio != '') ? EvtCambio : function (e) { };
	
	var EvtSeleccionar = ValDatos('EvtSeleccionar', aD);
	EvtSeleccionar = (EvtSeleccionar != '') ? EvtSeleccionar : function (e) { };


	var fechaIni = ValDatos('fechaIni', aD);
	if (fechaIni != '') cajaFecha.setAttribute('data-ini', FormatoFecha(fechaIni, 'jp'));
	var fechaFin = ValDatos('fechaFin', aD);
	if (fechaFin != '') cajaFecha.setAttribute('data-fin', FormatoFecha(fechaFin, 'jp'));

	var diaInvalido = ValDatos('diaInvalido', aD);
	if (diaInvalido != '') cajaFecha.setAttribute('data-inv', diaInvalido);

	cajaFecha.data = FormatoFecha(fecha, 'jp');
			
	cajaFecha.placeholder = 'dd/MM/YYYY';
	if (conValor) cajaFecha.value = FormatoFecha(fecha, 'mx');
	else {
		if (fechaFin != '') {
			cajaFecha.data = FormatoFecha(fechaFin, 'jp');
		} else {
			if (fechaIni != '') {
				cajaFecha.data = FormatoFecha(fechaIni, 'jp');
			}
		}
	}
	var tDevice = QueTipoDispositivo();		// IDENTIFICAMOS SI ES MOVIL PARA CONVERTIR EL CONTROL
	if(tDevice == 'movil') {
		//	El siguiente codigo es para mostrar un control de fecha 
		//	para dispositivos moviles y esta basado en comobo
		cajaFecha.onclick = function (e) {
			var fchV = this.value;            
			if (!EsFechaValida(fchV)) {
				this.value = fchV;
				var fcA = fchV.split('/');
				this.data = fcA[2] + '/' + ('0' + fcA[1]).slice(-2) + '/' + ('0' + fcA[0]).slice(-2);
			}			
			var fSelP = new Date(this.data);
			
			var cm = CapaModal(999999);
			var cc = CapaCentral(99999999, cm);
			cc.style.textAlign = 'center';				
			var cuerpo = document.getElementsByTagName('body').item(0);
			cuerpo.appendChild(cm);
			cajaFecha.blur();
			
			var sd = CreaSelFch('dia');
			var dSelP = ('0' + fSelP.getDate()).slice(-2);
			cc.appendChild(sd);
			SelComboBox(sd, dSelP);
			
			
			var sm = CreaSelFch('mes');
			var mSelP = ('0' + (fSelP.getMonth() + 1)).slice(-2);
			cc.appendChild(sm);
			SelComboBox(sm, mSelP);
			
			var sa = CreaSelFch('anio');
			cc.appendChild(sa);
			SelComboBox(sa, fSelP.getFullYear());
			
			sm.onchange = function(e) {	// obtener dias por mes para cargar los dias por mes
				var mChg = sm.value;
				var aChg = sa.value;
				var dChg = sd.value;
				
				var uDiaChg = DiasEnMes(mChg, aChg);
				sd.innerHTML = '';
				for(var j = 0;j < uDiaChg;j++) {
					try {
						var op = document.createElement('option');
						op.value = ('0' + (j + 1)).slice (-2);
						op.textContent = ('0' + (j + 1)).slice (-2);
						op.style.fontSize = '20px';
						op.style.textAlign = 'center';
						sd.appendChild(op);
					} catch(e) { continue; }
				}
				SelComboBox(sd, dChg);
			};
			
			var nl = document.createElement('br');
			cc.appendChild(nl);
							
			var ba = CreaBtnAction('Aceptar');
			cc.appendChild(ba);
			
			var bc = CreaBtnAction('Cancelar');
			cc.appendChild(bc);
			
			bc.onclick = function(e) {
				var cd = cc.parentElement;
				cuerpo.removeChild(cd);
			}
			
			ba.onclick = function(e) {
				var cAnio = sa.value;
				var cMes = sm.value;
				var cDia = sd.value;
				cajaFecha.value = cDia + '/' + cMes + '/' + cAnio;
				cajaFecha.data = cAnio + '/' + cMes + '/' + cDia;
				
				var cd = cc.parentElement;
				cuerpo.removeChild(cd);
			}
			
			sd.focus();
		}		
	} else {
		//	El siguiente codigo es para mostrar un control de fecha 
		//	para dispositivos Desktop y esta basado en un calendario
		var idCapa = this.idCajaCalendario;
		cajaFecha.onclick = function (e) {
            var fchV = this.value;            
            if (!EsFechaValida(fchV)) {
                this.value = fchV;
                var fcA = fchV.split('/');
                this.data = fcA[2] + '/' + ('0' + fcA[1]).slice(-2) + '/' + ('0' + fcA[0]).slice(-2);
            } 
			
            this.style.boxShadow = '0px 0px 10px #B7DDF3';
            var cuerpo = document.getElementsByTagName('body').item(0);
            if (document.getElementById(idCapa)) {
                var calendioCapaR = document.getElementById(idCapa);
                cuerpo.removeChild(calendioCapaR);
                return;
            }

            //	Posiscion de la caja de calendario
			var pX = GetDimensions(this).x;
            var pY = GetDimensions(this).y;
            var calendioCapa = document.createElement('div');
            calendioCapa.id = idCapa;
            calendioCapa.className = 'Efecto-fadeIn-caja';
            calendioCapa.style.width = ancho + 'px';
            calendioCapa.style.height = alto + 'px';
            calendioCapa.style.backgroundColor = '#E9F4FB';
            calendioCapa.style.zIndex = 99999999;
            calendioCapa.style.position = 'absolute';
            calendioCapa.style.left = pX + 'px';
            calendioCapa.style.top = (pY + 35) + 'px';
            calendioCapa.style.padding = '0px';
            calendioCapa.style.cursor = 'pointer';
            calendioCapa.style.overflow = 'hidden';
            calendioCapa.style.transition = 'all 0.4s ease-in-out';//calendioCapa.style.transition = 'opacity 1s ease-in';
            calendioCapa.style.border = '1px solid #CCC';			
            cuerpo.appendChild(calendioCapa);
            var fchCad = this.data.split('/');
            calendioCapa.data = this.data;
            var idTxt = this.id;
            calendioCapa.setAttribute('data-ic', idTxt);
            
			//	Arma el calendario en la caja creada
			var ACalCrea= new ArmarCalendario({			
				idtxt: idTxt
				,yy: fchCad[0]
				,mm: fchCad[1]
				,dd: fchCad[2]
				,idDiv: calendioCapa.id
				,EvtSelect: EvtSeleccionar
			});			

            // Evento para la funcionalidad del scroll cambio de mes
			function moveObject(event) {
                var fch = this.data.split('/');
                var mm = parseInt(fch[1]);
                var yy = parseInt(fch[0]);

                var e = window.event || e; // old IE support                
                var delta = 0; if (!event) event = window.event;
                if (event.wheelDelta) {
                    if (event.wheelDelta == -120) mm++;
                    else if (event.wheelDelta == 120) mm--;
                }
                else if (event.detail) {
                    if (event.detail == -3) mm--;
                    else if (event.detail == 3) mm++;
                }
                yy = (mm >= 12) ? (yy + 1) : (mm == 0) ? (yy - 1) : yy;
                mm = (mm >= 12) ? 1 : (mm == 0) ? 12 : mm;
				var ACalCrea= new ArmarCalendario({			
					idtxt: idTxt
					,yy: yy
					,mm: ('0' + mm).slice(-2)
					,dd: fch[2]
					,idDiv: this.id	
					,EvtSelect: EvtSeleccionar
				});                
                this.data = yy + '/' + ('0' + mm).slice(-2) + '/' + fch[2];
            };
			
            calendioCapa.addEventListener('DOMMouseScroll', moveObject, false);
            calendioCapa.onmousewheel = moveObject;
		
        }
		
        cajaFecha.onblur = function (e) {
            var fchValor = this.value;			
            this.value = (EsFechaValida(fchValor)) ? '' : fchValor;
            if (!EsFechaValida(fchValor)) {
                var fCad = fchValor.split('/');
                this.data = fCad[2] + '/' + ('0' + fCad[1]).slice(-2) + '/' + ('0' + fCad[0]).slice(-2);
                if (!document.getElementById('txt-dp-' + this.id)) {
                    e.data = this.data;
					EvtSeleccionar(e);
                }
                if (this.style.color == 'red') {
                    var fSel = new Date(this.data);
                    if (this.getAttribute('data-ini')) {
                        var fIni = new Date(this.getAttribute('data-ini'));
                        if (fSel < fIni) {
                            this.data = FormatoFecha(fIni, 'jp');
                            this.value = FormatoFecha(fIni, 'mx');
                        }
                    }
                    if (this.getAttribute('data-fin')) {
                        var fFin = new Date(this.getAttribute('data-fin'));
                        if (fSel > fFin) {
                            this.data = FormatoFecha(fFin, 'jp');
                            this.value = FormatoFecha(fFin, 'mx');
                        }
                    }

                    if (this.getAttribute('data-inv')) {
                        fSel = new Date(this.data);
                        var aDias = this.getAttribute('data-inv').split(',');
                        var dSem = fSel.getDay();
                        if (aDias.indexOf(dSem.toString()) > (-1)) {
                            fSel.setDate(fSel.getDate() + 2);
                            this.data = FormatoFecha(fSel, 'jp');
                            this.value = FormatoFecha(fSel, 'mx');
                        }
                    }

                    this.style.color = '#324091';
                }
            }
            this.placeholder = 'dd/MM/YYYY';
            this.style.boxShadow = 'none';
        }

        cajaFecha.onkeypress = function (e) {
            if (e.keyCode == 13) {
                var fchValor = this.value;
                this.value = (EsFechaValida(fchValor)) ? '' : fchValor;
                if (!EsFechaValida(fchValor)) {
                    var fCad = fchValor.split('/');
                    this.data = fCad[2] + '/' + ('0' + fCad[1]).slice(-2) + '/' + ('0' + fCad[0]).slice(-2);
                    e.data = this.data;
					EvtSeleccionar(e);
                }
                if (document.getElementById('txt-dp-' + this.id)) {
                    var cDp = document.getElementById('txt-dp-' + this.id);
                    var contenedor = cDp.parentElement;
                    contenedor.removeChild(cDp);
                }
                this.placeholder = 'dd/MM/YYYY';
                this.style.boxShadow = 'none';
            }
        };

        cajaFecha.onkeyup = function (e) {
            if (!EsFechaValida(this.value)) {
                this.style.color = '#324091';
                var fCad = this.value.split('/');
                this.data = fCad[2] + '/' + ('0' + fCad[1]).slice(-2) + '/' + ('0' + fCad[0]).slice(-2);
                var fSel = new Date(this.data);
                if (this.getAttribute('data-ini')) {
                    var fIni = new Date(this.getAttribute('data-ini'));
                    if (fSel < fIni) {
                        this.style.color = 'red';
                    }
                }
                if (this.getAttribute('data-fin')) {
                    var fFin = new Date(this.getAttribute('data-fin'));
                    if (fSel > fFin) {
                        this.style.color = 'red';
                    }
                }
                if (this.getAttribute('data-inv')) {
                    var aDias = this.getAttribute('data-inv').split(',');
                    var dSem = fSel.getDay();
                    if (aDias.indexOf(dSem.toString()) > (-1)) {
                        this.style.color = 'red';
                    }
                }
            }
            else this.style.color = 'red';
        }
		
		
	}
	
	if(regresaObjeto == true){
		return cajaFecha;
	}
	
}



//			LOS SCRIPTS APARTIR DE ESTA LINEA SON ANTERIORES A LA MEJORA, SE RECOMIENTA DEJAR DE UTILIZAR


function ArmaCalendarioDp(idtxt, yy, mm, dd, idDiv) {
    var txtDp = document.getElementById(idtxt);
    var yyFin = 0;
    var mmFin = 0;
    var ddFin = 0;
    var yyIni = 0;
    var mmIni = 0;
    var ddIni = 0;
    var dInv = [];

    if (txtDp.getAttribute('data-fin')) {
        var fchFinal = txtDp.getAttribute('data-fin');
        var fcIni = FchValores(fchFinal);  //    desglose de fecha
        yyFin = fcIni.anio;
        mmFin = fcIni.mes;
        ddFin = fcIni.dia;
        if (yyFin < yy) return;
        if (mmFin < mm) {
            if (yyFin <= yy) return;
        }
    }
    if (txtDp.getAttribute('data-ini')) {
        var fchIninal = txtDp.getAttribute('data-ini');
        var fcFin = FchValores(fchIninal);  //    desglose de fecha
        var yyIni = fcFin.anio;
        var mmIni = fcFin.mes;
        var ddIni = fcFin.dia;
        if (yyIni > yy) return;
        if (mmIni > mm) {
            if (yyIni >= yy) return;
        }
    }

    if (txtDp.getAttribute('data-inv')) {
        dInv = txtDp.getAttribute('data-inv').split(',');
    }
    
    var divDp = document.getElementById(idDiv);
    divDp.innerHTML = '';

    var tHead = document.createElement('table');
    tHead.style.width = '100%';
    tHead.style.margin = 'auto';
    var rengH = tHead.insertRow(0);
    var btnIzq = rengH.insertCell(0);
    btnIzq.style.padding = '0px';
    btnIzq.style.fontWeight = 'bold';
    btnIzq.style.color = '#25306C';
    btnIzq.style.cursor = 'pointer';
    btnIzq.style.textAlign = 'left';
    btnIzq.innerHTML = '&nbsp;«';
    btnIzq.onclick = function (e) {
        var diaAnt = new Date(yy, (mm - 1), dd);
        diaAnt.setMonth(diaAnt.getMonth() - 1);
        var dCad = FormatoFecha(diaAnt).split('/');
        ArmaCalendarioDp(idtxt, dCad[0], dCad[1], dCad[2], idDiv);
    };

    var meses = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
    var tituloCentro = rengH.insertCell(1);
    tituloCentro.style.padding = '0px';
    tituloCentro.style.width = '60%';
    tituloCentro.style.textAlign = 'center';
    tituloCentro.style.color = '#25306C';
    tituloCentro.style.fontWeight = 'lighter';
    tituloCentro.style.cursor = 'pointer';
    tituloCentro.style.textShadow = '1px 1px 2px #515151';
    tituloCentro.innerHTML = meses[parseInt(mm) - 1] + ' ' + yy;
    tituloCentro.title = idtxt + '/' + yy + '/' + mm + '/' + dd + '/' + idDiv;
    tituloCentro.onclick = function (e) {
        var datCad = this.title.split('/');
        ArmaMesesAniosDp(datCad[0], datCad[1], datCad[2], datCad[3], datCad[4], 'dias');
    };

    var btnDer = rengH.insertCell(2);
    btnDer.style.padding = '0px';
    btnDer.style.fontWeight = 'bold';
    btnDer.style.textAlign = 'right';
    btnDer.style.cursor = 'pointer';
    btnDer.style.color = '#25306C';
    btnDer.innerHTML = '»&nbsp;';
    btnDer.onclick = function (e) {
        var diaAnt = new Date(yy, (mm - 1), dd);
        diaAnt.setMonth(diaAnt.getMonth() + 1);
        var dCad = FormatoFecha(diaAnt).split('/');
        ArmaCalendarioDp(idtxt, dCad[0], dCad[1], dCad[2], idDiv);
    };


    divDp.appendChild(tHead);


    var TCuerpo = document.createElement('table');
    TCuerpo.style.width = '100%';
    TCuerpo.style.transition = 'all 0.4s ease-in-out';
    var tH = TCuerpo.createTHead();
    tH.style.backgroundColor = '#0589C9';
    var rengBH = tH.insertRow(0);
    rengBH.style.backgroundColor = '#0589C9';
    var diasSemana = new Array('Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb');
    var tB = TCuerpo.createTBody();
    for (var i = 0; i < 7; i++) {
        var celdatH = rengBH.insertCell(i);
        celdatH.style.textAlign = 'center';
        celdatH.style.padding = '2px 5px';
        celdatH.style.fontSize = '12px';
        celdatH.style.backgroundColor = '#0589C9';
        celdatH.style.color = '#FFF';
        celdatH.innerHTML = diasSemana[i];
    }
    var dS = 1;
    var ultimoDia = DiasEnMes(mm, yy);
    var fchEmp = new Date(yy, (mm - 1), 1);
    var diaEmpieza = fchEmp.getDay();
    var ddPinta = 1;

    if (mmFin <= mm) {
        if (yyFin <= yy) ultimoDia = (ddFin != 0) ? ddFin : ultimoDia;
    }

    if (yyIni >= yy) {
        if (mmIni >= mm) ddPinta = (ddIni != 0) ? ddIni : 1;
    }


    for (var j = 0; j < 6; j++) {
        var rengBB = tB.insertRow(j);
        for (var k = 0; k < 7; k++) {
            var celdatB = rengBB.insertCell(k);
            celdatB.style.height = '20px';
            celdatB.style.textAlign = 'center';
            celdatB.style.fontSize = '11px';
            celdatB.style.color = '#000';            
            celdatB.style.transition = 'all 0.4s ease-in-out';
            var invalido = dInv.indexOf(k.toString());
            if (invalido == (-1)) {
                celdatB.style.cursor = 'pointer';
                celdatB.style.backgroundColor = '#FFF';
            }
            else {
                celdatB.style.backgroundColor = '#CCFFFF';
                celdatB.setAttribute('data-inv', false);
            }
            if (dS <= ultimoDia) {

                if (dS == 1) {
                    if (k == parseInt(diaEmpieza)) {
                        if (dS >= ddPinta) {
                            celdatB.innerHTML = dS;
                            celdatB.title = mm + '/' + yy;
                        }
                        dS++;
                    }
                    else {
                        celdatB.innerHTML = '';
                    }
                }
                else {
                    var diaFecha = parseInt(dd);
                    if (dS >= ddPinta) {
                        celdatB.style.border = (diaFecha == dS) ? '1px solid #2299DD' : '';
                        celdatB.innerHTML = dS;
                        celdatB.title = mm + '/' + yy;
                    }
                    dS++;
                }
                if (invalido == (-1)) {
                    celdatB.onclick = function (e) {
                        var nDia = this.innerHTML;
                        if (nDia.length == 0) return;
						
						if (this.getAttribute('data-inv')) {
                            if (this.getAttribute('data-inv') == false) return;
                        }
						
                        var numDia = this.innerHTML;
                        if (numDia.length != 0) {
                            var mmYY = this.title.split('/');
                            txtDp.value = ('0' + numDia).slice(-2) + '/' + mmYY[0] + '/' + mmYY[1];
                            txtDp.data = mmYY[1] + '/' + mmYY[0] + '/' + ('0' + numDia).slice(-2);
                            var cuerpo = divDp.parentElement;
                            cuerpo.removeChild(divDp);
                        }
						
						var cuerpo = divDp.parentElement;
						if(cuerpo){
							cuerpo.removeChild(divDp);
						}
                    };                   
                }
            }
        };
    };

    divDp.appendChild(TCuerpo);

    var hoy = new Date();
    var aHoy = document.createElement('a');
    aHoy.style.display = 'block';
    aHoy.style.color = '#54696E';
    aHoy.style.textAlign = 'center';
    aHoy.style.fontWeight = 'lighter';
    aHoy.textContent = 'Hoy - ' + hoy.toLocaleDateString();
    divDp.appendChild(aHoy);

    aHoy.onclick = function (e) {
        txtDp.value = FormatoFecha(hoy, 'mx');
        txtDp.data = FormatoFecha(hoy, 'jp');
        var cuerpo = divDp.parentElement;
        cuerpo.removeChild(divDp);
        divDp.ondblclick();
    }
}

function ArmaMesesAniosDp(idtxt, yy, mm, dd, idDiv, est) {
    var txtDp = document.getElementById(idtxt);
    var yyFin = 0;
    var mmFin = 0;
    var yyIni = 0;
    var mmIni = 0;
    if (txtDp.getAttribute('data-fin')) {
        var fchFinal = txtDp.getAttribute('data-fin');
        var fcIni = FchValores(fchFinal);  //    desglose de fecha
        yyFin = fcIni.anio;
        mmFin = fcIni.mes;
        if (yyFin < yy) return;
        if (mmFin < mm) {
            if (yyFin <= yy) return;
        }
    }
    if (txtDp.getAttribute('data-ini')) {
        var fchFinal = txtDp.getAttribute('data-ini');
        var fc = FchValores(fchFinal);  //    desglose de fecha
        yyIni = fc.anio;
        mmIni = fc.mes;
        if (yyIni > yy) return;
        if (mmIni > mm) {
            if (yyIni >= yy) return;
        }
    }
    var areaDiv = document.getElementById(idDiv);
    areaDiv.innerHTML = '';

    var tHead = document.createElement('table');
    tHead.style.width = '100%';
    tHead.style.margin = 'auto';
    var rengH = tHead.insertRow(0);
    var btnIzq = rengH.insertCell(0);
    btnIzq.style.padding = '0px';
    btnIzq.style.fontWeight = 'bold';
    btnIzq.textAlign = 'left';
    btnIzq.style.color = '#25306C';
    btnIzq.innerHTML = '&nbsp;«';
    btnIzq.onclick = function (e) {
        var diaAnt = new Date(yy, (mm - 1), dd);
        var rest = (est == 'dias') ? 1 : 12;
        diaAnt.setYear(diaAnt.getFullYear() - rest);
        var dCad = FormatoFecha(diaAnt).split('/');
        ArmaMesesAniosDp(idtxt, dCad[0], dCad[1], dCad[2], idDiv, est);

    };

    var tituloCentro = rengH.insertCell(1);
    tituloCentro.style.padding = '0px';
    tituloCentro.style.width = '60%';
    tituloCentro.style.color = '#25306C';
    tituloCentro.style.textAlign = 'center';
    tituloCentro.style.fontWeight = 'lighter';
    tituloCentro.style.textShadow = '1px 1px 2px #515151';
    var textoTitulo = (est == 'dias') ? yy : ((parseInt(yy) - 6) + '-' + (parseInt(yy) + 5));
    tituloCentro.innerHTML = textoTitulo;
    tituloCentro.title = idtxt + '/' + yy + '/' + mm + '/' + dd + '/' + idDiv + '/' + est;
    tituloCentro.onclick = function (e) {
        var datCad = this.title.split('/');
        var estSig = (datCad[5] == 'dias') ? 'meses' : 'dias';
        ArmaMesesAniosDp(datCad[0], datCad[1], datCad[2], datCad[3], datCad[4], estSig);
    };

    var btnDer = rengH.insertCell(2);
    btnDer.style.padding = '0px';
    btnDer.style.fontWeight = 'bold';
    btnDer.style.textAlign = 'right';
    btnDer.style.color = '#25306C';
    btnDer.innerHTML = '»&nbsp;';
    btnDer.onclick = function (e) {
        var diaAnt = new Date(yy, (mm - 1), dd);
        var rest = (est == 'dias') ? 1 : 12;
        diaAnt.setYear(diaAnt.getFullYear() + rest);
        var dCad = FormatoFecha(diaAnt).split('/');
        ArmaMesesAniosDp(idtxt, dCad[0], dCad[1], dCad[2], idDiv, est);
    };


    areaDiv.appendChild(tHead);

    var tCuerpo = document.createElement('table');
    tCuerpo.style.transition = 'all 0.4s ease-in-out';
    tCuerpo.style.margin = 'auto';
    areaDiv.appendChild(tCuerpo);
    switch (est) {
        case 'dias':
            var im = 0;
            var mfin = (yyFin <= yy) ? mmFin : 12;
            mfin = (mfin == 0) ? 12 : mfin;

            var mIni = (yyIni >= yy) ? mmIni : 0;

            for (var mf = 0; mf < 4; mf++) {
                var rengM = tCuerpo.insertRow(mf);
                for (var mc = 0; mc < 3; mc++) {
                    var celM = rengM.insertCell(mc);
                    celM.style.textAlign = 'center';
                    celM.style.fontSize = '12px';
                    celM.style.padding = '0px';
                    celM.style.width = '80px';
                    celM.style.height = '40px';
                    celM.style.backgroundColor = '#29A0E4';
                    celM.style.border = '2px solid #FFF';
                    celM.style.transition = 'all 0.4s ease-in-out';
                    celM.title = idtxt + '/' + yy + '/' + ('0' + (im + 1)).slice(-2) + '/' + dd + '/' + idDiv + '/dias';
                    var meses = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
                    if (im < mfin) {
                        // validar comparacion de meses
                        if (im >= (mIni - 1)) {
                            celM.innerHTML = meses[im];
                            celM.style.color = '#FFF';
                            celM.onclick = function (e) {
								var datCad = this.title.split('/');
                                ArmaCalendarioDp(datCad[0], datCad[1], datCad[2], datCad[3], datCad[4]);
								
                            };
                            celM.ondblclick = function (e) {
                                var datCad = this.title.split('/');
                                ArmaCalendarioDp(datCad[0], datCad[1], datCad[2], datCad[3], datCad[4]);
                            };
                        }
                        else { celM.style.color = '#29A0E4'; }
                    }
                    else { celM.style.color = '#29A0E4'; }
                    im++;
                }
            }
            break;
        case 'meses':
            var anio = parseInt(yy) - 6;
            var anioIni = (yyIni != 0) ? yyIni : anio;
            for (var i = 0; i < 4; i++) {
                var nuevoR = tCuerpo.insertRow(i);
                for (var j = 0; j < 3; j++) {
                    var celAnio = nuevoR.insertCell(j);
                    celAnio.style.textAlign = 'center';
                    celAnio.style.padding = '0px';
                    celAnio.style.width = '10%';
                    celAnio.style.height = '40px';
                    celAnio.style.backgroundColor = '#29A0E4';
                    celAnio.style.border = '2px solid #FFF';
                    celAnio.style.transition = 'all 0.4s ease-in-out';
                    celAnio.title = idtxt + '/' + anio + '/' + mm + '/' + dd + '/' + idDiv + '/meses';
                    celAnio.style.color = '#FFF';
                    if (anio >= anioIni) {
                        celAnio.innerHTML = (yyFin == 0) ? anio : (yyFin < anio) ? '' : anio;
                        celAnio.onclick = function (e) {
                            var datCad = this.title.split('/');
                            ArmaMesesAniosDp(datCad[0], datCad[1], datCad[2], datCad[3], datCad[4], 'dias');							
                        };
                        celAnio.ondblclick = function (e) {
                            var datCad = this.title.split('/');
                            ArmaMesesAniosDp(datCad[0], datCad[1], datCad[2], datCad[3], datCad[4], 'dias');
                        }
                    }
                    anio++;
                }
            }
            break;
    }
}

function FechaPicker(txtId) {
    this.id = 'txt-dp-' + txtId;
    this.idCaja = txtId;
    this.aDatos = [];
    this.Calendario = function (aD) {
				
        var alto = ValDatos('alto', aD);
        alto = (alto != '') ? alto : 200;

        var ancho = ValDatos('ancho', aD);
        ancho = (ancho != '') ? ancho : 250;

        var conValor = ValDatos('conValor', aD);
        conValor = (conValor != '') ? conValor : false;

        var fecha = ValDatos('fecha', aD);
        fecha = (fecha != '') ? fecha : new Date();

        //var habilitado = (aD.length == 0) ? true : (typeof (aD[0].habilitado) != 'undefined') ? aD.habilitado : true;//
		var habilitado = ValDatos('habilitado', aD);
		habilitado = (habilitado == '0') ? false:true;

        var altoCaja = ValDatos('altoCaja', aD);

        var cajaFecha = document.getElementById(this.idCaja);
        try { cajaFecha.style.backgroundImage = 'url(../Img/icon_datepicker.gif)'; } catch (e) { cajaFecha.style.backgroundColor = '#FFF'; }
        cajaFecha.style.backgroundRepeat = 'no-repeat';
        cajaFecha.style.backgroundPosition = '90% 2px';
        cajaFecha.style.height = (altoCaja != '') ? altoCaja + 'px' : '28px';
        cajaFecha.style.borderRadius = '4px';
        cajaFecha.style.border = '1px solid #999';
        cajaFecha.style.textIndent = '4px';
        cajaFecha.style.textAlign = 'left';
        cajaFecha.style.fontFamily = 'inherit';
        cajaFecha.style.cursor = 'pointer';
        cajaFecha.style.color = '#000';
        cajaFecha.style.transition = 'all 0.3s ease-in-out 0s';
        if (habilitado != '') cajaFecha.disabled = !habilitado;
        cajaFecha.maxLength = 10;

        var idCapa = this.id;

        var EnCambio = ValDatos('EnCambio', aD);
        EnCambio = (EnCambio != '') ? EnCambio : function (e) { };


        var fechaIni = ValDatos('fechaIni', aD);
        if (fechaIni != '') cajaFecha.setAttribute('data-ini', FormatoFecha(fechaIni, 'jp'));
        var fechaFin = ValDatos('fechaFin', aD);
        if (fechaFin != '') cajaFecha.setAttribute('data-fin', FormatoFecha(fechaFin, 'jp'));

        var diaInvalido = ValDatos('diaInvalido', aD);
        if (diaInvalido != '') cajaFecha.setAttribute('data-inv', diaInvalido);

        cajaFecha.data = FormatoFecha(fecha, 'jp');
				
        cajaFecha.placeholder = 'dd/MM/YYYY';
        if (conValor) cajaFecha.value = FormatoFecha(fecha, 'mx');
		else {
			if (fechaFin != '') {
				cajaFecha.data = FormatoFecha(fechaFin, 'jp');
			} else {
				if (fechaIni != '') {
					cajaFecha.data = FormatoFecha(fechaIni, 'jp');
				}
			}
		}
		var tDevice = QueTipoDispositivo();		// IDENTIFICAMOS SI ES MOVIL PARA CONVERTIR EL CONTROL
		if(tDevice == 'movil') {
			cajaFecha.onclick = function (e) {
				var fchV = this.value;            
				if (!EsFechaValida(fchV)) {
					this.value = fchV;
					var fcA = fchV.split('/');
					this.data = fcA[2] + '/' + ('0' + fcA[1]).slice(-2) + '/' + ('0' + fcA[0]).slice(-2);
				}
				
				var fSelP = new Date(this.data);
				
				var cm = CapaModal(999999);
				var cc = CapaCentral(99999999, cm);
				cc.style.textAlign = 'center';				
				var cuerpo = document.getElementsByTagName('body').item(0);
				cuerpo.appendChild(cm);
				cajaFecha.blur();
				
				var sd = CreaSelFch('dia');
				var dSelP = ('0' + fSelP.getDate()).slice(-2);
				cc.appendChild(sd);
				SelComboBox(sd, dSelP);
				
				
				var sm = CreaSelFch('mes');
				var mSelP = ('0' + (fSelP.getMonth() + 1)).slice(-2);
				cc.appendChild(sm);
				SelComboBox(sm, mSelP);
				
				var sa = CreaSelFch('anio');
				cc.appendChild(sa);
				SelComboBox(sa, fSelP.getFullYear());
				
				sm.onchange = function(e) {	// obtener dias por mes para cargar los dias por mes
					var mChg = sm.value;
					var aChg = sa.value;
					var dChg = sd.value;
					
					var uDiaChg = DiasEnMes(mChg, aChg);
					sd.innerHTML = '';
					for(var j = 0;j < uDiaChg;j++) {
						try {
							var op = document.createElement('option');
							op.value = ('0' + (j + 1)).slice (-2);
							op.textContent = ('0' + (j + 1)).slice (-2);
							op.style.fontSize = '20px';
							op.style.textAlign = 'center';
							sd.appendChild(op);
						} catch(e) { continue; }
					}
					SelComboBox(sd, dChg);
				};
				
				var nl = document.createElement('br');
				cc.appendChild(nl);
								
				var ba = CreaBtnAction('Aceptar');
				cc.appendChild(ba);
				
				var bc = CreaBtnAction('Cancelar');
				cc.appendChild(bc);
				
				bc.onclick = function(e) {
					var cd = cc.parentElement;
					cuerpo.removeChild(cd);
				}
				
				ba.onclick = function(e) {
					var cAnio = sa.value;
					var cMes = sm.value;
					var cDia = sd.value;
					cajaFecha.value = cDia + '/' + cMes + '/' + cAnio;
					cajaFecha.data = cAnio + '/' + cMes + '/' + cDia;
					
					var cd = cc.parentElement;
					cuerpo.removeChild(cd);
				}
				
				sd.focus();
			}
			return aD;
		} 

        cajaFecha.onclick = function (e) {
            var fchV = this.value;            
            if (!EsFechaValida(fchV)) {
                this.value = fchV;
                var fcA = fchV.split('/');
                this.data = fcA[2] + '/' + ('0' + fcA[1]).slice(-2) + '/' + ('0' + fcA[0]).slice(-2);
            } 
			
            this.style.boxShadow = '0px 0px 10px #B7DDF3';
            var cuerpo = document.getElementsByTagName('body').item(0);
            if (document.getElementById(idCapa)) {
                var calendioCapaR = document.getElementById(idCapa);
                cuerpo.removeChild(calendioCapaR);
                return;
            }

            var pX = GetDimensions(this).x;
            var pY = GetDimensions(this).y;
            var calendioCapa = document.createElement('div');
            calendioCapa.id = idCapa;
            calendioCapa.className = 'Efecto-fadeIn-caja';
            calendioCapa.style.width = ancho + 'px';
            calendioCapa.style.height = alto + 'px';
            calendioCapa.style.backgroundColor = '#E9F4FB';
            calendioCapa.style.zIndex = 99999999;
            calendioCapa.style.position = 'absolute';
            calendioCapa.style.left = pX + 'px';
            calendioCapa.style.top = (pY + 35) + 'px';
            calendioCapa.style.padding = '0px';
            calendioCapa.style.cursor = 'pointer';
            calendioCapa.style.overflow = 'hidden';
            calendioCapa.style.transition = 'all 0.4s ease-in-out';//calendioCapa.style.transition = 'opacity 1s ease-in';
            calendioCapa.style.border = '1px solid #CCC';
            cuerpo.appendChild(calendioCapa);
            var fchCad = this.data.split('/');//var fchCad = this.title.split('/');
            calendioCapa.data = this.data;
            var idTxt = this.id;
            calendioCapa.setAttribute('data-ic', idTxt);
            ArmaCalendarioDp(idTxt, fchCad[0], fchCad[1], fchCad[2], calendioCapa.id);

            function moveObject(event) {         // Evento para la funcionalidad del scroll cambio de mes       
                var fch = this.data.split('/');
                var mm = parseInt(fch[1]);
                var yy = parseInt(fch[0]);

                var e = window.event || e; // old IE support                
                var delta = 0; if (!event) event = window.event;
                if (event.wheelDelta) {
                    if (event.wheelDelta == -120) mm++;
                    else if (event.wheelDelta == 120) mm--;
                }
                else if (event.detail) {
                    if (event.detail == -3) mm--;
                    else if (event.detail == 3) mm++;
                }
                yy = (mm >= 12) ? (yy + 1) : (mm == 0) ? (yy - 1) : yy;
                mm = (mm >= 12) ? 1 : (mm == 0) ? 12 : mm;
                ArmaCalendarioDp(idTxt, yy, ('0' + mm).slice(-2), fch[2], this.id);
                this.data = yy + '/' + ('0' + mm).slice(-2) + '/' + fch[2];
            };
            calendioCapa.addEventListener('DOMMouseScroll', moveObject, false);
            calendioCapa.onmousewheel = moveObject;

            calendioCapa.ondblclick = function (e) {
                EnCambio();
            };
        }

        cajaFecha.onblur = function (e) {
            var fchValor = this.value;
            this.value = (EsFechaValida(fchValor)) ? '' : fchValor;
            if (!EsFechaValida(fchValor)) {
                var fCad = fchValor.split('/');
                this.data = fCad[2] + '/' + ('0' + fCad[1]).slice(-2) + '/' + ('0' + fCad[0]).slice(-2);
                if (!document.getElementById('txt-dp-' + this.id)) {
                    EnCambio();
                }
                if (this.style.color == 'red') {
                    var fSel = new Date(this.data);
                    if (this.getAttribute('data-ini')) {
                        var fIni = new Date(this.getAttribute('data-ini'));
                        if (fSel < fIni) {
                            this.data = FormatoFecha(fIni, 'jp');
                            this.value = FormatoFecha(fIni, 'mx');
                        }
                    }
                    if (this.getAttribute('data-fin')) {
                        var fFin = new Date(this.getAttribute('data-fin'));
                        if (fSel > fFin) {
                            this.data = FormatoFecha(fFin, 'jp');
                            this.value = FormatoFecha(fFin, 'mx');
                        }
                    }

                    if (this.getAttribute('data-inv')) {
                        fSel = new Date(this.data);
                        var aDias = this.getAttribute('data-inv').split(',');
                        var dSem = fSel.getDay();
                        if (aDias.indexOf(dSem.toString()) > (-1)) {
                            fSel.setDate(fSel.getDate() + 2);
                            this.data = FormatoFecha(fSel, 'jp');
                            this.value = FormatoFecha(fSel, 'mx');
                        }
                    }

                    this.style.color = '#324091';
                }
            }
            this.placeholder = 'dd/MM/YYYY';
            this.style.boxShadow = 'none';
        }

        cajaFecha.onkeypress = function (e) {
            if (e.keyCode == 13) {
                var fchValor = this.value;
                this.value = (EsFechaValida(fchValor)) ? '' : fchValor;
                if (!EsFechaValida(fchValor)) {
                    var fCad = fchValor.split('/');
                    this.data = fCad[2] + '/' + ('0' + fCad[1]).slice(-2) + '/' + ('0' + fCad[0]).slice(-2);
                    EnCambio();
                }
                if (document.getElementById('txt-dp-' + this.id)) {
                    var cDp = document.getElementById('txt-dp-' + this.id);
                    var contenedor = cDp.parentElement;
                    contenedor.removeChild(cDp);
                }
                this.placeholder = 'dd/MM/YYYY';
                this.style.boxShadow = 'none';
            }
        };

        cajaFecha.onkeyup = function (e) {
            if (!EsFechaValida(this.value)) {
                this.style.color = '#324091';
                var fCad = this.value.split('/');
                this.data = fCad[2] + '/' + ('0' + fCad[1]).slice(-2) + '/' + ('0' + fCad[0]).slice(-2);
                var fSel = new Date(this.data);
                if (this.getAttribute('data-ini')) {
                    var fIni = new Date(this.getAttribute('data-ini'));
                    if (fSel < fIni) {
                        this.style.color = 'red';
                    }
                }
                if (this.getAttribute('data-fin')) {
                    var fFin = new Date(this.getAttribute('data-fin'));
                    if (fSel > fFin) {
                        this.style.color = 'red';
                    }
                }
                if (this.getAttribute('data-inv')) {
                    var aDias = this.getAttribute('data-inv').split(',');
                    var dSem = fSel.getDay();
                    if (aDias.indexOf(dSem.toString()) > (-1)) {
                        this.style.color = 'red';
                    }
                }
            }
            else this.style.color = 'red';
        }

        this.aDatos = aD;
    };
}

