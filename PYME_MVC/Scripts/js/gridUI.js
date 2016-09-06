/// <reference path="funcionesUI.js" />
/// <reference path="ctrlSegurosUI.js" />


//  Objeto que crea un grid generico y configurablepara HTML
//  2016/02/10 Modificado por Oscar Lemus
//	2016/02/11 Modificado por Luis Morales
//	2016/05/18 Modificado por Joel Rivas




function GViewUI(aC) {
	
    if (aC.length == 0) return false;
    var idArea = ValDatos('idArea', aC);
    this.aConfig = aC;
    if (!document.getElementById(idArea)) {
        var msg = new VentanaMsj({ titulo: 'Mensaje Excepcion', mensaje: 'No existe el objeto' });
        return true;
    };
    var alto = ValDatos('alto', aC);
    var ancho = ValDatos('ancho', aC);

    //Area principal, se da estilo y forma al cuadro contenedor principal
	this.area = document.getElementById(idArea);
    this.area.innerHTML = '';
    this.area.style.height = (alto != '') ? (alto + 50) + 'px' : '700px';
    this.area.style.width = (ancho != '') ? ancho + 'px' : '95%';
    this.area.style.minWidth = '500px';
    this.area.style.background = '#FFF';
    this.area.style.margin = 'auto';
    this.area.style.overflow = 'hidden';
    this.area.style.display = 'inherit';
    this.area.style.transition = 'all 0.5s ease-in-out';
    this.area.style.border = '1px solid #9C9779';
    this.area.style.padding = '0px';
    this.area.style.overflowX = 'scroll';
    this.area.style.overflowY = 'hidden';
    this.area.setAttribute('data-blk', '1');

    //Area que permite se pueda expandir a lo ancho el grid
	this.cuerpo = CuerpoAlto(this.area.id);
    this.cuerpo.style.width = 'auto';
    this.cuerpo.style.display = 'inherit';
    this.cuerpo.style.padding = '0px';
    this.area.appendChild(this.cuerpo);
    this.cuerpo.setAttribute('data-con', idArea);

    var excel = ValDatos('excel', aC);
    var tituloHoja = ValDatos('tituloHoja', aC);
    this.btnExc = document.createElement('span');
    this.btnExc.id = 'btnExc-' + this.cuerpo.id;
    this.btnExc.textContent = 'Ex';
    this.btnExc.title = 'Exporta a excel';
    this.btnExc.style.display = 'block';
    this.btnExc.style.width = '23px';
    this.btnExc.style.height = '22px';
    this.btnExc.style.background = '#5CACE2';
    this.btnExc.style.fontWeight = 'bold';
    this.btnExc.style.fontSize = '20px';
    this.btnExc.style.cursor = 'pointer';
    this.btnExc.style.border = '2px outset #5CACE2';
    this.btnExc.style.cssFloat = 'left';
    this.btnExc.setAttribute('data-thj', tituloHoja);
    if (excel == true) {
        this.cuerpo.appendChild(this.btnExc);
    }

    var agregar = ValDatos('agregar', aC);
    this.btnAdd = document.createElement('span');
    this.btnAdd.id = 'btnAdd-' + this.cuerpo.id;
    this.btnAdd.textContent = '+';
    this.btnAdd.style.cssText = this.btnExc.style.cssText;	
    
    if (agregar == true) {
        this.cuerpo.appendChild(this.btnAdd);
		this.area.setAttribute('data-blk', '1');
    } else {
        this.area.setAttribute('data-blk', '0');
    }

    this.tblH = document.createElement('table');
    this.tblH.id = this.cuerpo.id + '-H';
    this.tblH.style.width = '100%';
    this.tblH.style.clear = 'right';
    this.cuerpo.appendChild(this.tblH);

    this.contB = document.createElement('div');
    this.contB.id = this.cuerpo.id + '-Cont';
    this.contB.style.overflowY = 'scroll';
    this.contB.style.overflowX = 'hidden';
    this.contB.style.padding = '0px';
    this.contB.style.backgroundColor = '#FFF';
    this.contB.style.width = '100%';
    this.contB.style.height = (alto - 35) + 'px';
    this.contB.style.position = 'relative';
    this.contB.style.display = 'inherit';
    this.cuerpo.appendChild(this.contB);
    this.contB.setAttribute('data-con', idArea);

	
	this.tblF = document.createElement('table');
	this.tblF.id = this.cuerpo.id + '-F';
    this.tblF.style.width = '100%';
    this.tblF.style.clear = 'right';
	this.cuerpo.appendChild(this.tblF);
	
    this.tblB = document.createElement('table');
    this.tblB.id = this.cuerpo.id + '-B';
	this.tblB.data = aC;
    this.tblB.style.width = '100%';
    this.tblB.setAttribute('data-con', idArea);
    this.tblB.setAttribute('data-cnt', 0)
    this.tblB.setAttribute('data-dgl', idArea);
	this.tblB.setAttribute('data-ifo', this.cuerpo.id + '-F');
	
    this.contB.appendChild(this.tblB);

    var colKey = ValDatos('colKey', aC);
    this.tblB.setAttribute('data-cky', colKey);

    var aCampos = ValDatos('aCampos', aC);
    if (aCampos.length == 0) {
        var msgC = new VentanaMsj({ titulo: 'Mensaje Configuración', mensaje: 'Sin configuración de campos.' });
        return true;
    }
    this.campos = aCampos;

    var rtblH = this.tblH.insertRow(0);
	var rtblF = this.tblF.insertRow(0);	
    rtblH.id = this.tblH.id + '-0';
	rtblF.id = this.tblF.id + '-0';
	rtblH.setAttribute('data-tbl', this.tblB.id);
	rtblF.setAttribute('data-tbl', this.tblB.id);
    var rtblB = this.tblB.insertRow(0);
    rtblB.id = this.tblB.id + '-0';
    rtblB.setAttribute('data-tbl', this.tblB.id);
    rtblB.setAttribute('data-dgl', idArea);
    if (agregar == true) {
        this.btnAdd.onclick = function (e) {
            AccionRegistro(rtblB.id, 'nuevo');
        }

        rtblB.ondblclick = function (e) {
            AccionRegistro(this.id, 'nuevo');
        }
    }
    this.btnExc.setAttribute('data-btb', this.tblB.id);
    this.btnExc.setAttribute('data-rht', rtblH.id);
    this.btnExc.onclick = function (e) {
        var idTbl = this.getAttribute('data-btb');
        var tituloH = this.getAttribute('data-thj');
        var tbB = document.getElementById(idTbl);
        var renH = this.getAttribute('data-rht');
        var rHtbl = tbB.insertRow(0);
        if (document.getElementById(renH)) rHtbl.innerHTML = document.getElementById(renH).innerHTML;
        TablaEnExcel(idTbl, 'Reporte_' + tituloH);
        tbB.deleteRow(0);
    }

    var l = 0;
    for (i in aCampos) {
        var itmCmp = aCampos[i];
        var columna = ValDatos('columna', itmCmp);
        var titulo = ValDatos('titulo', itmCmp);
        var ancho = ValDatos('ancho', itmCmp);
        var editable = ValDatos('editable', itmCmp);
        var tipo = ValDatos('tipo', itmCmp);
        var sumable = ValDatos('sumable', itmCmp);
        var vDefault = ValDatos('vDefault', itmCmp);
        var oculto = ValDatos('oculto', itmCmp);		
		var tmpPlantilla = ValDatos('tmpPlantilla', itmCmp);
		
		var sumTotal = ValDatos('sumTotal', itmCmp);
		if(document.getElementById(tmpPlantilla)){
			document.getElementById(tmpPlantilla).style.display = 'none';
		}
		
				
		
        var flgOct = (oculto === true) ? '1' : '0';

        editable = (editable == '') ? false : true;
        if (ancho == '') ancho = 150;

        var cellH = rtblH.insertCell(i);
		var cellF = rtblF.insertCell(i);
        cellH.style.border = '1px solid #9392a4';
        cellH.style.textAlign = 'center';
        cellH.style.width = ancho + 'px';
        cellH.style.fontWeight = 'bold';
        cellH.style.background = '#b5cfd2';
        cellH.style.color = '#333333';
		cellF.style.cssText = cellH.style.cssText;
		cellF.style.height = '25px';
        if (oculto == true) cellH.style.display = 'none';
		if (oculto == true) cellF.style.display = 'none';
        cellH.innerHTML = titulo + '&nbsp;';
		


        var cellB = rtblB.insertCell(i);		
        cellB.id = rtblB.id + '-' + columna;		
        cellB.style.border = '1px solid #9392a4';
        cellB.style.height = '25px';
        cellB.style.width = ancho + 'px';
        cellB.style.cursor = 'pointer';
        if (oculto == true) cellB.style.display = 'none';

        cellB.setAttribute('data-col', columna);
        cellB.setAttribute('data-tit', titulo);
        cellB.setAttribute('data-tip', tipo);
        cellB.setAttribute('data-edt', editable);
        cellB.setAttribute('data-ach', ancho);
        cellB.setAttribute('data-est', 'cerrado');
        cellB.setAttribute('data-acc', 'nuevo');
        cellB.setAttribute('data-sum', sumable);
        cellB.setAttribute('data-def', vDefault);
        cellB.setAttribute('data-oct', flgOct);
		cellB.setAttribute('data-tpl', tmpPlantilla);
		cellB.setAttribute('data-smt', sumTotal);	//Parametro para regresar un arrreglo de los campos sumados
		
		cellF.setAttribute('data-smt', sumTotal);
		cellF.setAttribute('data-tip', tipo);
		cellF.setAttribute('data-col', columna);

        if (sumable) {
            var lblSum = document.createElement('span')
            lblSum.id = 'lbl-' + this.tblB.id + '-' + ToHex(columna) + '-sum';
            lblSum.style.fontWeight = 'bold';
            lblSum.style.color = '#333333';
            lblSum.textContent = '0';
            cellH.appendChild(lblSum);
            cellB.setAttribute('data-ids', lblSum.id);
        }
		
		var todos = ValDatos('todos', itmCmp);
		if (tipo == 'bandera' || todos == true) {
			var OnChkTodos = function (e) {
				var grupo = this.name;
				var checar = (this.checked)? true: false;
				var idRenglon = this.getAttribute('data-rng');	
				if(document.getElementById(idRenglon)){
					var rn = document.getElementById(idRenglon);
					var idTbl = rn.getAttribute('data-tbl');
					if(document.getElementById(idTbl)){
						//Aqui agregar rutina de checar todos
						var tbl = document.getElementById(idTbl);
						var rns = tbl.getElementsByTagName('input');
						for(i in rns){
							try{
								var chk = rns[i];
								var chkGrupo = chk.name;
								if(chk.type == 'checkbox' && grupo == chkGrupo){									
									chk.checked = '';
									chk.removeAttribute('checked');
									if(checar) {
										chk.checked = 'checked';
									} 
								}
							} catch(e) { continue; }
						}
					}
				}
			};
			var ctrl = CreaCeldaEdicion({ tipo:tipo
											, idC: 'chk-' + rtblH.id + '-' + columna
											, editable: true
											, valor: columna
											, grupo: columna
											, OnClk: OnChkTodos
											, idRenglon: rtblH.id});
			
			cellH.appendChild(ctrl);
		}
		
        if (tipo == 'combo') {
            urlCmb = ValDatos('urlCmb', itmCmp);
            desCmb = ValDatos('desCmb', itmCmp);
            vlrCmb = ValDatos('vlrCmb', itmCmp);

            datosCmb = ValDatos('datos', itmCmp);
            if (datosCmb != '') {
                cellB.data = datosCmb;
            } else {
                if (urlCmb != '')
                    cellB.data = CatalogoCmb(urlCmb, desCmb, vlrCmb);
            }
        }
        l++;
    }
    var cellHbtn = rtblH.insertCell(l);
	var cellFbtn = rtblF.insertCell(l);
    cellHbtn.style.border = '1px solid #9392a4';
    cellHbtn.style.fontWeight = 'bold';
    cellHbtn.style.background = '#b5cfd2';
    cellHbtn.style.color = '#333333';
	cellFbtn.style.cssText = cellHbtn.style.cssText;

    var cellBbtn = rtblB.insertCell(l);	
    cellBbtn.style.border = '1px solid #9392a4';
    cellBbtn.style.height = '25px';
    cellBbtn.setAttribute('data-tip', 'botones');

    var urlDatos = ValDatos('urlDatos', aC);
    if (urlDatos != '') {
        LlenarWsUrl(urlDatos, this.tblB.id, this.campos);
    }

    this.LlenaGView = function (aN) {
        var urlD = ValDatos('urlDatos', aN);
        var dbclk = ValDatos('dbclk', this.aConfig);
        var datos = ValDatos('datos', aN);
        if (urlD != '') {
            LlenarWsUrl(urlD, this.tblB.id, this.campos, dbclk);
        } else {
            //if (datos != '')
            LlenarDatos(datos, this.tblB.id, this.campos, dbclk);
        }
    }

    this.ObtenJson = function (e) {
        var aCols = this.campos;
        var tbl = this.tblB;
        var rnsTbl = tbl.getElementsByTagName('tr');
        var aDatos = new Array();

        var conteo = 0;

        for (i in rnsTbl) {
            try {
                var rnTbl = rnsTbl[i];
                var clsRn = rnTbl.getElementsByTagName('td');
                var strItem = '{';

                conteo = 0;

                for (j in clsRn) {
                    try {

                        var cldRn = clsRn[j];
                        var columna = cldRn.getAttribute('data-col');
                        var valor = cldRn.getAttribute('data-val');
						var tipo = cldRn.getAttribute('data-tip');                        
                        conteo += (valor == null || valor.length == 0) ? 1 : 0;						
                        if (columna) {
							if (tipo == 'formulario') {
								valor = cldRn.data;
								strItem +=(valor)? '"' + columna + '":' + valor + ',': '"' + columna + '":{},';
							} else {
								strItem += '"' + columna + '":"' + valor + '",';
							}							
						}
                    } catch (e) { continue; }
                }
                strItem = strItem.substring(0, strItem.length - 1) + '}';
                strItem = strItem.replace(/,"null":"null"/g, '');
                var vObject = JSON.parse(strItem);

                if (conteo != clsRn.length) {
                    aDatos.push(vObject);
                }

                
            } catch (e) { continue; }
        }

        return aDatos;//alert(JSON.stringify(aDatos, null, 4));
    }

    this.SeleccionarItem = function (vKey) {
        var tbl = this.tblB;
        var rnsTbl = tbl.getElementsByTagName('tr');
        var clKey = tbl.getAttribute('data-cky');
        var flgExist = true;
        if (rnsTbl.length == 0 || clKey.length == 0) {
            var msgSl = new VentanaMsj({ titulo: 'Mensaje Seleccionar', mensaje: 'Sin datos como referencia para seleccionar.' });
            return;
        }

        for (i in rnsTbl) {
            try {
                var rnTbl = rnsTbl[i];
                var valor = rnTbl.getAttribute('data-vky');
                rnTbl.style.background = '#FFF';
                rnTbl.setAttribute('data-sel', 'none');
                if (vKey == valor) {
                    rnTbl.setAttribute('data-sel', 'select');
                    rnTbl.style.background = '#ff7c4c';
                    flgExist = false;
                }
            } catch (e) { continue; }
        }
        if (flgExist) {
            var msgSnD = new VentanaMsj({ titulo: 'Mensaje Seleccionar', mensaje: 'Sin datos como referencia para seleccionar.' });
        }

    }


}

function LlenarWsUrl(urlD, idGv, aCols, dbclk) {
    
	if (!document.getElementById(idGv) || idGv == '' || aCols.length == 0) return false;
	
	var rEdit = document.getElementById(idGv);
	var aConfig = rEdit.data;
	var msj0reg = ValDatos('msj0reg', aConfig);
	msj0reg = (msj0reg == '')? 'SI':msj0reg;
	
    try {
        $.ajax({
            url: urlD,
            dataType: 'jsonp',
            type: 'GET',
			error: function (request, status, error) {
                var msgAjx = new VentanaMsj({ titulo: 'Mensaje Excepcion', mensaje: 'Detalles ajax.' + request.responseText + ' ' + urlD });
            },
            success: function (data) {
                if (data.length == 0) {
                    if (document.getElementById(idGv)) {
                        var tbl = document.getElementById(idGv);
                        tbl.removeChild(tbl.childNodes[0]);
                    }
					if (msj0reg == 'SI'){
						var msgData = new VentanaMsj({ titulo: 'Mensaje Datos', mensaje: 'No se encontraron datos para esta busqueda ' });
					}
                    return true;
                }
                LlenarDatos(data, idGv, aCols, dbclk);
            }
        });
    } catch (err) {
        return true;
    }

}


function AccionRegistro(idR, acc) {
    if (document.getElementById(idR)) {
        var rEdit = document.getElementById(idR);
        var estFrm = rEdit.getAttribute('data-est');
        var dgl = rEdit.getAttribute('data-dgl');
        var aDgl = document.getElementById(dgl);
        var blk = aDgl.getAttribute('data-blk');
        acc = (blk == '1') ? acc : 'ninguna';
				

        if (estFrm != 'abierto') {
            var idTblrE = rEdit.getAttribute('data-tbl');
            var tblr = document.getElementById(idTblrE);
			
			var aConfig = tblr.data;
			var aCampos = ValDatos('aCampos', aConfig);
			var botonEB = rEdit.getAttribute('data-edi');
			var indxCampos = 0;
						
            var cont = tblr.getAttribute('data-cnt');
            cont = EsEntero(cont) + 1;
            tblr.setAttribute('data-cnt', cont);
            switch (acc) {
                case 'nuevo':
                    var rNvo = tblr.insertRow(0);
                    rNvo.id = tblr.id + '-' + cont;
                    rNvo.setAttribute('data-acc', 'editar');
                    rNvo.setAttribute('data-tbl', idTblrE);
                    rNvo.setAttribute('data-est', 'abierto');
                    rNvo.setAttribute('data-dgl', dgl);
                    var rngsR = rEdit.getElementsByTagName('td');
					indxCampos = 0;
                    for (i in rngsR) {
                        try {
                            var celRE = rngsR[i];
                            var tipoC = celRE.getAttribute('data-tip');//Tipo de dato
                            var sumbl = celRE.getAttribute('data-sum');//Bandera para sumar columna
                            var recVl = celRE.getAttribute('data-req');//
                            var colmC = celRE.getAttribute('data-col');//Nombre de columna (con este nombre se asigna el valor del campo en el JSON)
                            var clAnc = celRE.getAttribute('data-ach');//Ancho de la celda
                            var clEdt = celRE.getAttribute('data-edt');//Bandera para editar celda
                            var clTit = celRE.getAttribute('data-tit');//
                            var clDef = celRE.getAttribute('data-def');//Valor por default
                            var flgOc = celRE.getAttribute('data-oct');//Bandera para ocultar columna							
							var tmplF = celRE.getAttribute('data-tpl');//ID de formulario Template								

                            var celNvo = rNvo.insertCell(i);
                            celNvo.setAttribute('data-tip', tipoC);//Tipo de dato
                            celNvo.setAttribute('data-sum', sumbl);//Bandera para sumar columna
                            celNvo.setAttribute('data-req', recVl);//
                            celNvo.setAttribute('data-acc', 'editar');//Accion registro (indica quetipo de conversion tendra el renglon)
                            celNvo.setAttribute('data-col', colmC);//Nombre de columna (con este nombre se asigna el valor del campo en el JSON)
                            celNvo.setAttribute('data-ach', clAnc);//Ancho de la celda
                            celNvo.setAttribute('data-edt', clEdt);//Bandera para editar celda
                            celNvo.setAttribute('data-tit', clTit);//
                            celNvo.setAttribute('data-def', clDef);//Valor por default
                            celNvo.setAttribute('data-val', clDef);//Valor de la celda o por default
                            celNvo.setAttribute('data-oct', flgOc);//Bandera para ocultar columna
							celNvo.setAttribute('data-tpl', tmplF);//ID de formulario Template

                            celNvo.style.border = '1px solid #9392a4';
                            celNvo.style.height = '25px';
                            if (flgOc == '1') celNvo.style.display = 'none';


                            if (sumbl) {
                                var idLblSum = celRE.getAttribute('data-ids');
                                celNvo.setAttribute('data-ids', idLblSum)
                            }


                            if (tipoC != 'botones') {
								
								var itmCampos = aCampos[indxCampos];
								var OnBlurValido = ValDatos('OnBlurValido', itmCampos);
								var OnBtnClick = ValDatos('OnBtnClick', itmCampos);
								
                                celNvo.style.width = clAnc + 'px';
                                var planC = celRE.getAttribute('data-pln');
                                var idplnC = celRE.getAttribute('data-ipl');
                                

                                celNvo.id = rNvo.id + '-' + colmC;
								var idCtrlEdit = (tipoC == 'comando')? 'btn-' + celNvo.id:((tipoC == 'combo')? 'cmb-' + celNvo.id: 'txt-' + celNvo.id);
                                var dCmb = celRE.data;
								var vlrCtrlEdit = (tipoC == 'comando')? colmC:'';
                                celNvo.data = dCmb;								
								clAnc = EsEntero(clAnc) - 4;
								var ctrl = CreaCeldaEdicion({ tipo:tipoC
															, idC:idCtrlEdit
															, editable: clEdt
															, datos: dCmb
															, valor: vlrCtrlEdit
															, OnClk: OnBtnClick
															, OnBlurObj: OnBlurValido
															, idRenglon: rNvo.id});								
								celNvo.appendChild(ctrl);
								if(tipoC == 'fecha') {
									var dpCtrl = new FechaPicker(idCtrlEdit).Calendario([{ conValor: true }]);									
								}
								celNvo.setAttribute('data-ctr', idCtrlEdit);
								if (tipoC == 'formulario') {												
									var strForm = (document.getElementById(tmplF))? document.getElementById(tmplF).innerHTML:'Sin Formulario';
									var idCeldaForm = rNvo.id + '-' + colmC;
									ctrl.onclick = function(e) {
										if(this.checked){
											var win_Plantilla = new VentanaMsj({titulo: 'FORMULARIO'
																			  , mensaje: strForm
																			  , arrastrar: 'No'
																			  , alto: 400, ancho: 450
																			  , esFormulario: true
																			  , ctrlResultado: idCeldaForm});
										}
									}
								}								
								celNvo.ondblclick = function (e) {
									var rGrd = this.parentElement;
									var tAccion = rGrd.getAttribute('data-acc');
									AccionRenglon(rGrd.id, tAccion);
								}

                            }
                            else {
								
                                var btnG = CreaBoton(rNvo.id, 'Guardar');
                                btnG.setAttribute('data-rng', rNvo.id);
                                celNvo.appendChild(btnG);

                                btnG.onclick = function (e) {
                                    var iR = this.getAttribute('data-rng');
                                    GuardaRegistro(iR);
                                };
								
								var btnC = CreaBoton(rNvo.id, 'Cancelar');
                                btnC.setAttribute('data-rng', rNvo.id);
                                celNvo.appendChild(btnC);

                                btnC.onclick = function (e) {
                                    var iR = this.getAttribute('data-rng');
                                    if (document.getElementById(iR)) {
                                        var rSel = document.getElementById(iR);
                                        var bSel = rSel.parentElement;
                                        bSel.removeChild(rSel);
                                    }
                                };
                            }
							indxCampos++;
							tipoC = null;
                        }
                        catch (e) { continue; }
                    }
                    break;
                case 'editar':
				
                    rEdit.setAttribute('data-est', 'abierto');
                    var rngsR = rEdit.getElementsByTagName('td');
                    for (i in rngsR) {
                        try {
                            var celRE = rngsR[i];
                            var tipoC = celRE.getAttribute('data-tip');//Tipo de dato
                            var clAnc = celRE.getAttribute('data-ach');//Ancho de la celda
                            var clEdt = celRE.getAttribute('data-edt');//Bandera para editar celda
							var tmplF = celRE.getAttribute('data-tpl');//ID de formulario Template
							var colmC = celRE.getAttribute('data-col');//Nombre de columna (con este nombre se asigna el valor del campo en el JSON)
														
                            clAnc = EsEntero(clAnc) - 4;							
							
                            if (tipoC != 'botones') {								
								var itmCampos = aCampos[indxCampos];
								var OnBlurValido = ValDatos('OnBlurValido', itmCampos);
								var OnBtnClick = ValDatos('OnBtnClick', itmCampos);
																
                                var vlrC = celRE.innerHTML;
								var idCtrlEdit = (tipoC == 'combo')? 'cmb-' + celRE.id:(tipoC == 'comando')? 'btn-' + celRE.id: 'txt-' + celRE.id;
								var dCmb = celRE.data;
								vlrC = (tipoC == 'comando')? colmC:vlrC;
															
								
								var ctrl = CreaCeldaEdicion({ tipo: tipoC
															, idC:idCtrlEdit
															, editable: clEdt
															, datos: dCmb
															, valor: vlrC
															, OnClk: OnBtnClick
															, idRenglon: rEdit.id});
								
								celRE.innerHTML = '';
								celRE.appendChild(ctrl);
								if(tipoC == 'fecha') {
									var dpCtrl = new FechaPicker(idCtrlEdit).Calendario([{ conValor: true }]);									
								}
								celRE.setAttribute('data-ctr', idCtrlEdit);								
								if (tipoC == 'formulario') {												
									var strForm = (document.getElementById(tmplF))? document.getElementById(tmplF).innerHTML:'Sin Formulario';
									var idCeldaForm = rEdit.id + '-' + colmC;
									ctrl.onclick = function(e) {
										if(this.checked){
											var win_Plantilla = new VentanaMsj({titulo: 'FORMULARIO'
																			  , mensaje: strForm
																			  , arrastrar: 'No'
																			  , alto: 400, ancho: 450
																			  , esFormulario: true
																			  , ctrlResultado: idCeldaForm});
										}
									}
								}
							
                            }
                            else {
                                celRE.innerHTML = '';
                                var btnG = CreaBoton(celRE.id, 'Guardar');
                                btnG.setAttribute('data-rng', rEdit.id);
                                celRE.appendChild(btnG);
								
								btnG.onclick = function (e) {
                                    var iR = this.getAttribute('data-rng');
                                    GuardaRegistro(iR);
									
                                };

                                var btnC = CreaBoton(celRE.id, 'Cancelar');
                                btnC.setAttribute('data-rng', rEdit.id);
                                celRE.appendChild(btnC);

                                btnC.onclick = function (e) {
                                    var iR = this.getAttribute('data-rng');
                                    if (document.getElementById(iR)) {
										var rSel = document.getElementById(iR);
										
										var idTbl = rSel.getAttribute('data-tbl');
										var tblD = document.getElementById(idTbl);
										var aConf = tblD.data;
										var aCamp = ValDatos('aCampos', aConf);
										
                                        
                                        rSel.setAttribute('data-est', 'cerrado');
                                        var rnsR = rSel.getElementsByTagName('td');

                                        for (i in rnsR) {
                                            try {
                                                var celC = rnsR[i];
                                                var tipC = celC.getAttribute('data-tip');
                                                if (tipC != 'botones') {													
                                                    var vlC = celC.getAttribute('data-val')
                                                    if (tipC != 'combo') {
                                                        celC.innerHTML = SumDatosXTip(tipC, '', vlC);														
														if (tipC == 'comando') {                    
															var itemCampo = aCamp[i];
															var OnBtnClick = ValDatos('OnBtnClick', itemCampo);					
															var colN = celC.getAttribute('data-col')
															var ctrl = CreaCeldaEdicion({ tipo:tipC
																						, idC: 'btn-' + iR + '-' + colN
																						, editable: true
																						, valor: colN
																						, OnClk: OnBtnClick
																						, idRenglon: iR});
															celC.innerHTML = '';					
															celC.appendChild(ctrl);					
														}
                                                    }
                                                    else {
                                                        var idCtrl = celC.getAttribute('data-ctr');
                                                        if (document.getElementById(idCtrl)) {
                                                            var ctrl = document.getElementById(idCtrl);
                                                            var desCmb = ctrl.options[ctrl.selectedIndex].text;
                                                            celC.innerHTML = desCmb;
                                                        }
                                                    }
                                                }
                                                else {
                                                    celC.innerHTML = '';
													//Si solo es necesario el boton de editar o si no tienen la propiedad
													if (botonEB == 'E' || botonEB == ''){
														var btnE = CreaBoton(rSel.id, 'Editar');
														btnE.setAttribute('data-rng', rSel.id);
														celC.appendChild(btnE);
														
														btnE.onclick = function (e) {
															var iR = this.getAttribute('data-rng');
															AccionRegistro(iR, 'editar');
														};                                                    
													}
													//Si solo es necesario el boton de borrar o si no tienen la propiedad
													if (botonEB == 'B' || botonEB == ''){
														var btnD = CreaBoton(rSel.id, 'Eliminar');
														btnD.setAttribute('data-rng', rSel.id);
														celC.appendChild(btnD);
                                                    

														btnD.onclick = function (e) {
															var iR = this.getAttribute('data-rng');
															if (document.getElementById(iR)) {
																var rSel = document.getElementById(iR);
																var bSel = rSel.parentElement;
																bSel.removeChild(rSel);
															}
														};
													}
                                                }

                                            }
                                            catch (e) { continue; }
                                        }
                                    }
                                };
                            }
                        }
                        catch (e) { continue; }
                    }
                    break;
                case 'ninguna':
                    var msgNone = new VentanaMsj({ titulo: 'MENSAJE GRID', mensaje: 'NO ES POSIBLE REALIZAR LA ACCION' });
                    return true;
                    break;
            }// casos de apertura    		
        }// validar si esta abierto el formulario
    }// Fin de apertura de formulario
}//Fin Accion renglon


function LlenarDatos(dts, idG, Cols, dbclk) {
    
    var tbl = document.getElementById(idG);
    var rnsTbl = tbl.getElementsByTagName('tr');
    if (!$('#' + idG + ' tr').remove()) {
        while (rnsTbl.firstChild) {
            rnsTbl.removeChild(rnsTbl.firstChild);
        }
    }
    if (dts.length == 0) return true;
	var aConfig = tbl.data;
    var itemClick = ValDatos('itemClick', aConfig);
	var idtblF = tbl.getAttribute('data-ifo');
	
	var editable = ValDatos('editable', aConfig);
	var agregar = ValDatos('agregar', aConfig);
	var blk = (editable == true || editable == 'true')? '1':'0';
	blk = (agregar == true || agregar == 'true')? '1':blk;
	
	var dgl = tbl.getAttribute('data-dgl');
    var flgEditable = true;
	flgEditable = (editable == true || editable == 'true')? true:false;

    var clKey = tbl.getAttribute('data-cky');

    if (document.getElementById(dgl)) {		
		document.getElementById(dgl).setAttribute('data-blk',blk);
        if (blk == '0' || blk == 0) flgEditable = false;
    }
	
    //Define que boton mostrar ya que por default muestra ambos botones de editar y borrar
	//'E' Solo boton de editar
	//'B' Solo boton de borrar
	var botonEB = ValDatos('btnsAccion', aConfig); 
	
	InsertaRenglon({ columnas: Cols
				   , idTabla: idG
				   , idGeneral: dgl
				   , posicion: 0
				   , editar: agregar
				   , campoKey: clKey
				   , OnItemClk: itemClick
				   , OnItemdblClk: dbclk
				   , botonEB: botonEB}); //Propiedad para mostrar un solo boton	
	
	var limite = ValDatos('limite', aConfig); //Parametro que define el limite de registros
											  //que se visualizan en la tabla creada	
	//var limPint = (limite == '')?  ((dts.length < 200) ? dts.length : 200):((dts.length < limite) ? dts.length : limite);
	if (limite == ''){
		var limPint = (dts.length < 200) ? dts.length : 200;
	}
	else if(limite > 200){
		var limPint = (dts.length < limite) ? dts.length : limite;
	}

	
	var limPint = (dts.length < 200) ? dts.length : 200;
    tbl.setAttribute('data-dba', dts);
    for (var i = 0; i < limPint; i++) {//for (i in dts) {
        var itmData = dts[i];
        var cont = tbl.getAttribute('data-cnt');
        cont = EsEntero(cont) + 1;
        tbl.setAttribute('data-cnt', cont)
		
		InsertaRenglon({ columnas: Cols
				   , idTabla: idG
				   , idGeneral: dgl
				   , posicion: cont
				   , valores: itmData
				   , editar: flgEditable
				   , campoKey: clKey
				   , OnItemClk: itemClick
				   , OnItemdblClk: dbclk
				   , botones: true
				   , botonEB: botonEB}); //Propiedad para mostrar un solo boton
		
    }
	
	
	SumaTablaHtml({idTablaSumable:idG,idTablaResultado:idtblF});
}
