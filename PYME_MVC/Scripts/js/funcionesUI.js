


//  2015/04/08  Luis Morales
//  Funciones genericas para controles UI
//  2016/02/10 Modificado por Oscar Lemus
//  2016/05/18 Joel Rivas -- Se agrega funcionallidad de solo visualizar un boton cuando activas la propiedad de "editable: true"

//  FUNCION QUE IDENTIFICA UN VALOR EN UN ARREGLO Y LO REGRESA
function ValDatos(str, a) {
    if (typeof a == 'string' || typeof a == 'number' || typeof a == 'undefined') return '';
    for (n in a) {
        try {
            if (a[n][str]) return a[n][str];
        } catch (e) { continue; }
    }
    if (a[str] || a[str] == 0 || a[str] == '0') return a[str];
    else return '';
}


//  FUNCION QUE DESCARGSA UNA HOJA DE CALCULO PARA EXCEL CON EL DISEÑO Y DATOS CONTENIDOS EN LA TABLA INDICADA
function TablaEnExcel(table, name) {
    var uri = 'data:application/vnd.ms-excel;base64,'
          , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
          , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))); }
          , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }); };
    if (!table.nodeType) table = document.getElementById(table);
    var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
    window.location.href = uri + base64(format(template, ctx));

}

//  FUNCION PARA CONVERTIR UNA CADENA EN HEXADECIMAL
function ToHex(str) {
    var result = '';
    for (var i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16);
    }
    return result;
}


//  FUNCION PARA ORDENAR MATRICES
var Sort_by = function (field, reverse, primer) {
    var key = primer ?
        function (x) { return primer(x[field]) } :
        function (x) { return x[field] };
    reverse = !reverse ? 1 : -1;
    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}


//  VALIDA SI LA VARIABLE ES O SE PUEDE CONVERTIR EN ENTERO
function EsEntero(sn) {
    var va = 0;
    try {
        sn = (isNaN(sn)) ? '0' : sn;
        va = parseInt(sn);
        return va;
    } catch (e) {
        return 0;
    }
}


//  VALIDA SI LA VARIABLE ES O SE PUEDE CONVERTIR EN ENTERO
function EsFotante(sn) {
    var va = 0;
    try {
        sn = (isNaN(sn)) ? '0' : sn;
        va = parseFloat(sn);
        return va;
    } catch (e) {
        return 0;
    }
}

//  FUNCION QUE DA FORMATO AL VALOR INDICADO
function ValConv(sn, tip, porcentajeMayor) {
    switch (tip) {
        case 'numerico':
            var nv = EsEntero(sn);
            nv = (isNaN(nv)) ? 0 : nv;
            return nv;
            break;
        case 'flotante':
            var nv = EsFotante(sn);
            nv = (isNaN(nv)) ? 0 : nv;
            return nv.toFixed(2);
            break;
        case 'fecha':
            return sn;
            break;
        case 'moneda':
            var nv = EsFotante(sn);
            nv = (isNaN(nv)) ? 0.0 : sn;
            return '$ ' + MonedaEn(nv, 2, [',', "'", '.']);
            break;
        case 'porcentaje':
            if (isNaN(sn)) sn = sn.replace(/%/gi, '').trim();
            var nv = EsFotante(sn);
            nv = (isNaN(nv)) ? 0.0 : nv;
            if(!porcentajeMayor)
			{if (nv > 100) nv = 100;}
            return nv.toFixed(2) + ' %';
            break;
        case 'texto':
            return sn;
            break;
		case 'combo':
            return sn;		
    }
	return sn;
}

//  FUNCION QUE DA FORMATO TIPO MONEDA AL VALOR INDICADO
function MonedaEn(value, decimals, separators) {
    decimals = decimals >= 0 ? parseInt(decimals, 0) : 2;
    separators = separators || ['.', "'", ','];
    var number = (parseFloat(value) || 0).toFixed(decimals);
    if (number.length <= (4 + decimals))
        return number.replace('.', separators[separators.length - 1]);
    var parts = number.split(/[-.]/);
    value = parts[parts.length > 1 ? parts.length - 2 : 0];
    var result = value.substr(value.length - 3, 3) + (parts.length > 1 ?
        separators[separators.length - 1] + parts[parts.length - 1] : '');
    var start = value.length - 6;
    var idx = 0;
    while (start > -3) {
        result = (start > 0 ? value.substr(start, 3) : value.substr(0, 3 + start))
            + separators[idx] + result;
        idx = (++idx) % 2;
        start -= 3;
    }
    return (parts.length == 3 ? '-' : '') + result;
}

//  FUNCION QUE OBTIENE DIMENCIONES Y POSICION DE OBJETO
var GetDimensions = function (oElement) {
    var x, y, w, h;
    x = y = w = h = 0;
    if (document.getBoxObjectFor) { // Mozilla
        var oBox = document.getBoxObjectFor(oElement);
        x = oBox.x - 1;
        w = oBox.width;
        y = oBox.y - 1;
        h = oBox.height;
    }
    else if (oElement.getBoundingClientRect) { // IE
        var oRect = oElement.getBoundingClientRect();
        x = oRect.left - 2;
        w = oElement.clientWidth;
        y = oRect.top - 2;
        h = oElement.clientHeight;
    }
    return { x: x, y: y, w: w, h: h };
};

// FUNCION QUE REIBE UNA VARIABLE DATE Y REGRESA UNA CADENA CON EL FORMATO INDICADO
function FormatoFecha(d, tip) {
    var dd = d.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = d.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = d.getFullYear();

    var str = (tip == 'mx') ? dd + '/' + mm + '/' + yy : yy + '/' + mm + '/' + dd;

    return str;
};


//  FUNCION QUE CALCULA LOS DIAS QUE CONTIENE UN MES EN EL AÑO INDICADO
function DiasEnMes(elMes, anio) {
    //return new Date(anio || new Date().getFullYear(), (elMes + 1), 0).getDate();
    return new Date(anio, elMes, 0).getDate();
}

//  FUNCION QUE VALIDA FORMATO DE LA CADENA DD/MM/AAAA  (DÍ­AS < 32 Y MESES < 13)
function EsFechaValida(fch) {
    //var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    var RegExPattern = /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[/\\/](19|20)\d{2}$/;
    if ((fch.match(RegExPattern)) && (fch != '')) {
        return false;
    } else {
        return true;
    }
}

//  FUNCION QUE REGRESA LOS VALORES DA LA CADENA FECHA
var FchValores = function (str) {
    var anio = 0;
    var mes = 0;
    var dia = 0;
    var f = new Date();
    var diaSemana = 0;
    if (EsFechaValida(str)) {
        var fch = str.split('/');
        anio = EsEntero(fch[0]);
        mes = EsEntero(fch[1]);
        dia = EsEntero(fch[2]);
        f = new Date(anio, (mes - 1), dia);
        diaSemana = f.getDay();
    }
    return { anio: anio, mes: mes, dia: dia, f: f, diaSemana: diaSemana };
};

//  FUNCION QUE VALIDA CONTROL INPUT NUMERICO
function RegresaNumero(e) {
    var keynum = window.event ? window.event.keyCode : e.which;
    if ((keynum == 8) || (keynum == 46))
        return true;
    return /\d/.test(String.fromCharCode(keynum));
}

//  FUCNION QUE LLENA UN COMBOBOX
function LlenaComboBox(idCmb, datos, aC) {
    var cmbD = document.getElementById(idCmb);
    cmbD.innerHTML = '';
    if (aC.length == 0) return;
    var valor = ValDatos('valor', aC);
    var descripcion = ValDatos('descripcion', aC);
    var EvClick = ValDatos('EvClick', aC);
    var itemDef = ValDatos('itemDef', aC);
    if (itemDef != '') {
        var itD = document.createElement('option');
        itD.textContent = 'Seleccionar';
        itD.style.color = '#999';
        itD.setAttribute('data-placeholder', true);
        cmbD.appendChild(itD);
    };
    for (var i = 0; i < datos.length; i++) {
        try {
            var it = document.createElement('option');
            var vCmb = ValDatos(valor, datos[i]);
            var dCmb = ValDatos(descripcion, datos[i]);
            it.value = vCmb;
            it.textContent = dCmb;
            cmbD.appendChild(it);
            if (EvClick != '') it.onclick = EvClick;
        }
        catch (e) { continue; }
    }
    if (EvClick != '') cmbD.onchange = EvClick;
}

//  FUCNION QUE SELECCIONA UN ITEM DE UN COMBOBOX POR ID
function SeleccionaComboBox(idCmb, vlr) {
    var cmbT = document.getElementById(idCmb);
    var cmbTitms = cmbT.getElementsByTagName('option');
    for (var i = 0; i < cmbTitms.length; i++) {
        try {
            var vOp = cmbTitms[i].value;
            if (vOp == vlr) cmbT.options.selectedIndex = i;
        } catch (e) { continue; }
    };
}


//  FUCNION QUE SELECCIONA UN ITEM DE UN COMBOBOX POR CTRL
function SelComboBox(cmbT, vlr) {
    var cmbTitms = cmbT.getElementsByTagName('option');
    for (var i = 0; i < cmbTitms.length; i++) {
        try {
            var vOp = cmbTitms[i].value;
            if (vOp == vlr) cmbT.options.selectedIndex = i;
        } catch (e) { continue; }
    };
}

//FUNCION QUE VALIDA CONTROL SOLO NUMERO
function SoloNumero(e) {
    var keynum = window.event ? window.event.keyCode : e.which;
    if (keynum == 8 || keynum == 0){//if ((keynum == 8) || (keynum == 46))
        return true;
	}	
    return /\d/.test(String.fromCharCode(keynum));
}

//FUNCION QUE VALIDA ALFANUMERICO
//diseñara para el evento onkeypress
function SoloAlfanumerico(e) {
	//Captura el evento de presión de una tecla recupera el código que genera y solo se permite Backspace
    var keynum = window.event ? window.event.keyCode : e.which;
    if (keynum == 8 || keynum == 0){//if ((keynum == 8) || (keynum == 46)){
        return true;
	}
	//Valida si el carácter cuenta con la restricción de la expresión regular  
	return /^([a-zA-Z0-9\s])/.test(String.fromCharCode(keynum));	 
}

//FUNCION QUE VALIDA ALFANUMERICO
//diseñara para el evento blur
function SoloAlfanumericoblur(e) {
//Evalúa  el contenido de la caja de texto mediante expresión
// regular, en caso de no cumplir elimina el contenido de la caja de texto   
	var m = this.value;
	var regex = /^([a-zA-Z0-9 ]+)$/;
	this.value = (regex.test(m)) ? m.toUpperCase() : ''; 
}

//FUNCION QUE VALIDA CONTROL SOLO MONEDA
function SoloMoneda(o, s, sd, e) {
    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strChk = '0123456789';
    var aux = aux2 = '';
    var whichCode = (window.Event) ? e.which : e.keyCode;
    if (whichCode == 13) return true;
    key = String.fromCharCode(whichCode); // Valor para o código da Chave
    if (strChk.indexOf(key) == -1) return false; // Chave inválida
    len = o.value.length;
    for (i = 0; i < len; i++)
        if ((o.value.charAt(i) != '0') && (o.value.charAt(i) != sd)) break;
    aux = '';
    for (; i < len; i++)
        if (strChk.indexOf(o.value.charAt(i)) != -1) aux += o.value.charAt(i);
    aux += key;
    len = aux.length;
    if (len == 0) o.value = '';
    if (len == 1) o.value = '0' + sd + '0' + aux;
    if (len == 2) o.value = '0' + sd + aux;
    if (len > 2) {
        aux2 = '';
        for (j = 0, i = len - 3; i >= 0; i--) {
            if (j == 3) {
                aux2 += s;
                j = 0;
            }
            aux2 += aux.charAt(i);
            j++;
        }
        o.value = '';
        len2 = aux2.length;
        for (i = len2 - 1; i >= 0; i--)
            o.value += aux2.charAt(i);
        o.value += sd + aux.substr(len - 2, len);
    }
    return false;
}



//  FUNCION QUE CREA UN CONTROL INPUT SEGUN EL TIPO QUE DATO
function CreaCajaEdicion(tip, i) {
    var ct = document.createElement('input');
    ct.id = i;
    ct.type = 'text';
    ct.style.padding = '0px';
    ct.style.border = '0px none #FFF';
    ct.style.textAlign = 'right';	
    switch (tip) {
        case 'texto':
            ct.onkeyup = function (e) { this.value = this.value.toUpperCase(); }
            break;
        case 'numerico':
            ct.setAttribute('onkeypress', 'return SoloNumero(event);');
            break;
        case 'fecha':
            ct.type = 'text';
            ct.maxLength = 11;
            break;
        case 'bandera':
            ct.type = 'checkbox';
            break;
        case 'formulario':
            ct.type = 'checkbox';
            break;
        case 'porcentaje':
            ct.type = 'text';
            ct.maxLength = 7;
            ct.setAttribute('onkeypress', 'return SoloNumero(event);');
            ct.onblur = function (e) { this.value = (this.value >= 100) ? 100 : this.value; }
            break;
        case 'moneda':
            ct.type = 'text';
            break;
    }
    return ct;
}


//  FUNCION QUE SUMA POR TIPO DE DATO
function SumDatosXTip(tip, t, a) {

    switch (tip) {
        case 'texto':
            return t + a;
            break;
        case 'numerico':
            var mt = EsEntero(t);
            mt = (isNaN(mt)) ? 0 : mt;
            var ma = EsEntero(a);
            ma = (isNaN(ma)) ? 0 : ma;
            return mt + ma;
            break;
        case 'fecha':
            var d = new Date();
            a = (!EsFechaValida(a)) ? a : FormatoFecha(d, 'mx');
            return a;
            break;
        case 'bandera':
            if (t || a) return true;
            else return false;
            break;
        case 'porcentaje':
            if (isNaN(t)) t = t.replace(/%/gi, '').trim();
            if (isNaN(a)) a = a.replace(/%/gi, '').trim();
            var mt = EsEntero(t);
            mt = (isNaN(mt)) ? 0 : mt;
            var ma = EsEntero(a);
            ma = (isNaN(ma)) ? 0 : ma;
            return '% ' + ((mt + ma) / 2).toFixed(2);
            break;
        case 'moneda':
            var ft = EsFotante(t.replace('$', '').replace(',', '').replace('\'', '').trim());
            ft = (isNaN(ft)) ? 0 : ft;
            //if(!isNaN(a)) a = '0';
            var fa = EsFotante(a.replace('$', '').replace(',', '').replace('\'', '').trim());
            fa = (isNaN(fa)) ? 0 : fa;
            return '$ ' + (ft + fa).toFixed(2);
            break;
        case 'flotante':
            var ft = EsFotante(t.trim());
            ft = (isNaN(ft)) ? 0 : ft;
            var fa = EsFotante(a.trim());
            fa = (isNaN(fa)) ? 0 : fa;
            return (ft + fa).toFixed(2);
            break;
        case 'fraccion':
            var ft = EsFotante(t.trim());
            ft = (isNaN(ft)) ? 0 : ft;
            var fa = EsFotante(a.trim());
            fa = (isNaN(fa)) ? 0 : fa;
            return (ft + fa).toFixed(2);
            break;
    }

}



//	FUNCION QUE VALIDA EL TIPO DE DISPOSITIVO QUE ESTAMOS USANDO
function QueTipoDispositivo() {
    var device = navigator.userAgent.toLowerCase();
    if (device.match(/Iphone/i) || device.match(/Ipod/i)
		|| device.match(/Android/i) || device.match(/J2ME/i)
		|| device.match(/BlackBerry/i) || device.match(/iPhone|iPad|iPod/i)
		|| device.match(/Opera Mini/i) || device.match(/IEMobile/i)
		|| device.match(/Mobile/i) || device.match(/Windows Phone/i)
		|| device.match(/windows mobile/i) || device.match(/windows ce/i)
		|| device.match(/webOS/i) || device.match(/palm/i)
		|| device.match(/bada/i) || device.match(/series60/i)
		|| device.match(/nokia/i) || device.match(/symbian/i)
		|| device.match(/HTC/i) || device.match(/linux x86_64/i)) {
        return 'movil';
    } else {
        return 'dekstop';
    }
}

function CapaModal(zi) {
    var c = document.createElement('div');
    c.style.backgroundColor = '#222 linear-gradient(#444, #222) repeat scroll 0% 0%';
    c.style.background = 'rgba(0, 0, 0, 0.5)';
    c.style.width = '100%';
    c.style.minHeight = '100%';
    c.style.position = 'absolute';
    c.style.zIndex = zi;
    c.style.left = '0px';
    c.style.top = '0px';
    c.style.transition = 'all 0.5s ease-in-out';
    return c;
}


function CapaCentral(zi, cm) {
    var v = document.createElement('div');
    v.style.backgroundColor = '#FFF';
    v.style.display = 'inline-block';
    v.style.width = '300px';
    v.style.height = '110px';
    v.style.position = 'absolute';
    v.style.outline = '0px none';
    v.style.zIndex = zi;
    v.style.left = '50%';
    v.style.marginLeft = '-150px';
    v.style.top = '50px';
    v.style.transition = 'all 0.5s ease-in-out';
    v.style.borderRadius = '5px';
    v.style.boxShadow = '0 1px 5px #333';
    cm.appendChild(v);
    return v;
}

function CreaSelFch(t) {
    var s = document.createElement('select');
    s.id = 'cmb-ctrl-' + t;
    s.style.height = '50px';
    s.style.fontSize = '20px';
    s.style.marginTop = '10px';
    s.style.textAlign = 'center';
    switch (t) {
        case 'anio':
            s.style.width = '130px';
            var dt = new Date();
            var ano = dt.getFullYear();
            for (var a = 1800; a < (ano + 50) ; a++) {
                try {
                    var op = document.createElement('option');
                    op.value = a;
                    op.textContent = a;
                    op.style.fontSize = '20px';
                    op.style.textAlign = 'center';
                    s.appendChild(op);
                } catch (e) { continue; }
            }
            break;
        case 'mes':
            s.style.width = '80px';
            var aMes = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            for (var i = 0; i < 12; i++) {
                try {
                    var op = document.createElement('option');
                    op.value = ('0' + (i + 1)).slice(-2);
                    op.textContent = aMes[i];
                    op.style.fontSize = '20px';
                    op.style.textAlign = 'center';
                    s.appendChild(op);
                } catch (e) { continue; }
            }
            break;
        case 'dia':
            s.style.width = '80px';
            for (var j = 0; j < 31; j++) {
                try {
                    var op = document.createElement('option');
                    op.value = ('0' + (j + 1)).slice(-2);
                    op.textContent = ('0' + (j + 1)).slice(-2);
                    op.style.fontSize = '20px';
                    op.style.textAlign = 'center';
                    s.appendChild(op);
                } catch (e) { continue; }
            }
            break;
    }
    return s;
}

function CreaBtnAction(t) {
    var btn = document.createElement('span');
    btn.textContent = t;
    btn.style.width = '120px';
    btn.style.display = 'block';
    btn.style.textAlign = 'center';
    btn.style.background = '#F3F3F3 linear-gradient(#DDD, #CCC) repeat scroll 0% 0%';
    btn.style.cssFloat = 'left';
    btn.style.cursor = 'pointer';
    btn.style.padding = '5px 3px';
    btn.style.margin = '10px 12px';
    btn.style.borderRadius = '2px';
    btn.style.font = 'bold 0.8em Helvetica,Arial,sans-serif';
    btn.style.textShadow = '0px 1px 0px #FFF';
    return btn;
}


// FUNCION QUE CREA UN ELEMENTO DE ESPERA PARA PROCESS
function CapaProgress(idCp) {
    this.cuerpo = document.getElementsByTagName('body').item(0);
    var idD = ValDatos('idD', idCp);
    this.idCapa = (idD != '') ? 'pan-progress-' + ToHex(idD) : 'pan-progress-div-' + ToHex(idCp.length);
    if (document.getElementById(idD)) this.idCapa = 'pan-progress-' + ToHex(idD);


    var alto = ValDatos('alto', idCp);
    var ancho = ValDatos('ancho', idCp);
    var texto = ValDatos('texto', idCp);
    var imagen = ValDatos('imagen', idCp);
    var bgColor = ValDatos('bgColor', idCp);
    var txtColor = ValDatos('txtColor', idCp);

    this.alto = (alto != '') ? alto : 300;
    this.ancho = (ancho != '') ? ancho : 300;
    this.texto = (texto != '') ? texto : 'Espere...';
    this.imagen = (imagen != '') ? imagen : '../img/process.gif';
    this.bgColor = (bgColor != '') ? bgColor : '#FFF';
    this.txtColor = (txtColor != '') ? txtColor : '#000';

    if (document.getElementById(idCp)) this.idCapa = 'pan-progress-' + ToHex(idCp);

    this.Termina = function () {
        if (document.getElementById(this.idCapa)) {
            var cm = document.getElementById(this.idCapa);
            this.cuerpo.removeChild(cm);
        }
    }
    this.Inicia = function () {
        var cm = CapaModal(999999);
        cm.id = this.idCapa;
        this.cuerpo.appendChild(cm);
        var cc = CapaCentral(9999, cm);
        cc.style.top = '80px';
        cc.style.height = this.alto + 'px';
        cc.style.width = this.ancho + 'px';
        cc.style.marginLeft = '-' + (this.ancho / 2) + 'px';
        cc.style.background = this.bgColor;
        cc.style.color = this.txtColor;
        cc.style.textAlign = 'center';

        var im = document.createElement('img');
        im.src = this.imagen;
        im.style.margin = 'auto';
        cc.appendChild(im);
        var sm = document.createElement('span');
        sm.textContent = this.texto;
        sm.style.display = 'block';
        sm.style.textAlign = 'center';
        sm.style.color = this.txtColor;
        cc.appendChild(sm);
    }
}

// FUNCION PARA INDAGAR EN UN OBJETO Y SU DESCRIPCION
function InspeccionaElemento(obj) {
    var msg = '';

    for (var property in obj) {
        if (typeof obj[property] == 'function') {
            var inicio = obj[property].toString().indexOf('function');
            var fin = obj[property].toString().indexOf(')') + 1;
            var propertyValue = obj[property].toString().substring(inicio, fin);
            msg += (typeof obj[property]) + ' ' + property + ' : ' + propertyValue + ' ;\n';
            try {
                msg += ' : ' + (obj[property].prototype.toSource()) + ' ;\n';
            } catch (e) {
                continue;
            }
        }
        else if (typeof obj[property] == 'unknown') {
            msg += 'unknown ' + property + ' : unknown ;\n';
        }
        else {
            msg += (typeof obj[property]) + ' ' + property + ' : ' + obj[property] + ' ;  \n';
        }
    }
    return msg;
}




//Funcion que crea Encabezados de tabla
function CreaEncabezadoTbl(t, ac) {
    if (ac.length == 0 || ac == null) {
        return;
    }
    var ir = document.createElement('tr');
    for (i in ac) {
        var cel = document.createElement('th');
        cel.innerHTML = ac[i].titulo;
        ir.appendChild(cel);
    }
    var thed = t.createTHead();
    thed.appendChild(ir);
}



// FUNCION QUE EXPORTA HTML A EXCEL
function ExpExcel(idG, Nm) {
    var nombre = Nm + '_Reporte.xls';
    var cuerpo = document.getElementsByTagName('body').item(0);
    var ttxt = document.getElementById(idG).innerHTML;
    ttxt = ttxt.replace(/<A[^>]*>|<\/A>/g, "");
    ttxt = ttxt.replace(/<img[^>]*>/gi, "");
    ttxt = ttxt.replace(/<input[^>]*>|<\/input>/gi, "");
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        var oWin = window.open("about:blank", "_blank");
        oWin.document.write(ttxt);
        oWin.document.close();
        var success = oWin.document.execCommand('SaveAs', false, nombre)
        oWin.close();

    } else                 //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(ttxt));
    return (sa);

}

// 
function CuerpoAlto(idP) {
    var dCuerpo = document.createElement('div');
    dCuerpo.id = idP + '-cuerpo';
    dCuerpo.style.width = '100%';
    dCuerpo.style.minHeight = '100%';
    dCuerpo.style.border = '1px solid transparent';
    dCuerpo.style.margin = 'auto';
    dCuerpo.style.transition = 'all 0.5s ease-in-out';
    return dCuerpo;
}



function CatalogoCmb(url, des, vlr) {
    var aData = new Array();
	var tipoUrl = 'json'
	
    try {
        $.ajax({
            url: url,
            dataType: tipoUrl,
            type: 'GET',
            error: function (request, status, error) {
                aData.push({ descripcion: request.responseText, valor: status });
                return aData;
            },
            success: function (data) {
                if(typeof(data) == 'string') {
					data = JSON.parse(data.replace('(','').replace(')',''));
				}
				if (data.length > 0) { 							
					for (i in data) {
						var itemD = data[i];
						var iDes = ValDatos(des, itemD);
						var iVlr = ValDatos(vlr, itemD);
						aData.push({ descripcion: iDes, valor: iVlr });
					}
				}
				return aData;
            }
        });
    } catch (err) {
        aData.push({ descripcion: err.message, valor: 'none' });
        return aData;
    }
    return aData;
}



function GuardaRegistro(idR) {
	
    if (document.getElementById(idR)) {
        var rG = document.getElementById(idR);		
        rG.setAttribute('data-est', 'cerrado');
        var clsR = rG.getElementsByTagName('td');
		var strJSON = '{';
        for (i in clsR) {
            try {
                var celRG = clsR[i];
                var tipoC = celRG.getAttribute('data-tip');
                var idCtrl = celRG.getAttribute('data-ctr');
                var sum = celRG.getAttribute('data-sum');
                var recVl = celRG.getAttribute('data-req');
				var columna = celRG.getAttribute('data-col');
				
				if (tipoC != 'botones') {
					if (tipoC == 'comando') {
						strJSON += '"' + columna + '": 0 ,';
						continue;
					}
					
                    if (document.getElementById(idCtrl)) {
                        var ctrl = document.getElementById(idCtrl);
                        var vlr = ctrl.value;
                        if (tipoC != 'combo') {
                            celRG.setAttribute('data-tip', tipoC); 									
                            celRG.innerHTML = SumDatosXTip(tipoC, '', vlr);
							if (tipoC == 'bandera' || tipoC == 'formulario') {
                                vlr = '0';
								if (ctrl.checked) {
                                    vlr = '1';									
                                }
								celRG.innerHTML =(vlr == '1')? 'Si':'No';
                            } 
							celRG.setAttribute('data-val', vlr);
							
                        } else {
                            vlr = ctrl.options[ctrl.selectedIndex].value;
                            celRG.setAttribute('data-val', vlr);
                            celRG.setAttribute('data-tip', tipoC);
                            var desCmb = ctrl.options[ctrl.selectedIndex].text;
                            celRG.innerHTML = desCmb;
                        }
												
						vlr =(tipoC == 'formulario' && celRG.data)? celRG.data:'"' + vlr + '"';
						strJSON += '"' + columna + '": ' + vlr + ' ,';
                        celRG.style.background = (recVl && vlr == '') ? '#ff8f66' : '#FFF';
                        if (recVl && vlr == '') celRG.title = 'REQUERIDO';
                    }
                    if (sum) {
                        var idSum = celRG.getAttribute('data-ids');
                        if (document.getElementById(idSum)) {
                            var lblSum = document.getElementById(idSum);
                            lblSum.textContent = '0.0';
                        }
                    }

                } else {
					
                    celRG.innerHTML = '';
					var botonEB = rG.getAttribute('data-edi');
					//Si solo es necesario el boton de Editar o si no tienen la propiedad
					if (botonEB == 'E' || botonEB == ''){
						var btnE = CreaBoton(rG.id, 'Editar');
						btnE.setAttribute('data-rng', rG.id);
						celRG.appendChild(btnE);

						btnE.onclick = function (e) {
							var iR = this.getAttribute('data-rng');
							AccionRegistro(iR, 'editar');
						};
					}
					
					
					
					//Si solo es necesario el boton de borrar o si no tienen la propiedad
					if (botonEB == 'B' || botonEB == ''){		
						var btnD = CreaBoton(rG.id, 'Eliminar');
						btnD.setAttribute('data-rng', rG.id);
						celRG.appendChild(btnD);
						
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
		strJSON = strJSON.substring(0, strJSON.length - 1) + '}';
		strJSON = strJSON.replace(/,"null":"null"/g, '');
		var dObj = JSON.parse(strJSON);
		rG.data = dObj;
        var idTbl = rG.getAttribute('data-tbl');
        rG.setAttribute('data-est', 'cerrado');
        SumatoriasTabla(idTbl);
    }
}


function CreaBoton(idR, tipo) {
    var btn = document.createElement('span');
    btn.id = idR + '-' + tipo;
    btn.title = tipo;
    switch (tipo) {
        case 'Agregar':
            btn.className = 'boton-chico Btn-Agregar';
            break;
        case 'Editar':
            btn.className = 'boton-chico Btn-Editar';
            break;
        case 'Guardar':
            btn.className = 'boton-chico Btn-Guardar';
            break;
        case 'Eliminar':
            btn.className = 'boton-chico Btn-Eliminar';
            break;
        case 'Cancelar':
            btn.className = 'boton-chico Btn-Cancelar';
            break;
		case 'comando':
            btn.className = 'boton-chico Btn-Agregar';
            break;
    }
    return btn;
}


function SumatoriasTabla(idT) {
    if (document.getElementById(idT)) {
        var tbl = document.getElementById(idT);
        var rnsT = tbl.getElementsByTagName('tr');
        for (i in rnsT) {
            try {
                var rTbl = rnsT[i];
                var clsT = rTbl.getElementsByTagName('td');
                for (j in clsT) {
                    var celda = clsT[j];
                    var vlr = celda.innerHTML;
                    var sum = celda.getAttribute('data-sum');
                    if (sum) {
                        var idSum = celda.getAttribute('data-ids');
                        if (document.getElementById(idSum)) {
                            var lblSum = document.getElementById(idSum);
                            var tVal = lblSum.textContent;
                            var tCto = SumDatosXTip('fraccion', tVal, vlr);
                            lblSum.textContent = tCto;

                            var maxL = lblSum.getAttribute('data-max');
                            lblSum.style.color = (tCto > EsFotante(maxL)) ? '#FF4500' : '#000';
                        }
                    }
                }
            } catch (e) { continue; }
        }
    }
}


function GuardaFormEnJSON(idF, idR){
	var ix = 0;
	var columna;
	var valor;
	var strJSON = '{';
	if(document.getElementById(idF)) {		
		var frm = document.getElementById(idF);
		var txtCtrls = frm.getElementsByTagName('input');
		for (i in txtCtrls) {
			try{
				var txtC = txtCtrls[i];
				if(txtC.name) {
					columna = txtC.name;
					valor = txtC.value;
					if(txtC.type == 'text' || txtC.type == 'number') {							
						strJSON += '"' + columna + '" : "' + valor + '" ,';
					} else if (txtC.type == 'checkbox') {
						strJSON +=(txtC.checked)? '"' + columna + '" : 1 ,':'"' + columna + '" : 0 ,';
					}						
				}					
			} catch(e) { continue; }
		}
		
		var cmbCtrls = frm.getElementsByTagName('select');
		for (j in cmbCtrls) {
			try{
				var cmbC = cmbCtrls[j];					
				if(cmbC.name) {
					columna = cmbC.name;
					valor = cmbC.value;
					if(columna != 'item') {
						if(columna != 'namedItem') {
							strJSON += '"' + columna + '" : "' + valor + '" ,';
						}
					}
				}
			} catch(e) { continue; }
		}			
		strJSON = strJSON.substring(0,strJSON.length - 1);		
	} else {
		strJSON += 'NO EXISTE EL FORMULARIO';
	}		
	
	strJSON = strJSON + '}';	
	if(document.getElementById(idR)) {
		document.getElementById(idR).data = strJSON;
	} 
	return strJSON;
};



function CreaCeldaEdicion(aC){
	var idC = ValDatos('idC', aC);	
	var tipo = ValDatos('tipo', aC);
	
	var valor = ValDatos('valor', aC);
	var ancho = ValDatos('ancho', aC);
	
	var editable = ValDatos('editable', aC);
	editable = (editable != '')? editable:true;
	var OnClk = ValDatos('OnClk', aC);
	var grupo = ValDatos('grupo', aC);
	var idRenglon = ValDatos('idRenglon', aC);
	if(tipo == 'texto' || tipo == 'numerico' || tipo == 'fecha' || tipo == 'bandera' || tipo == 'formulario' || tipo == 'porcentaje' || tipo == 'moneda') {
		var OnBlurObj = ValDatos('OnBlurObj', aC);
		var ctrl = CreaCajaEdicion(tipo, idC);		
		ctrl.style.width = (ancho != '')? ancho + 'px':'100%';
		ctrl.name = grupo;
		ctrl.setAttribute('data-rng',idRenglon);
		ctrl.onclick = (OnClk != '')? OnClk: function(e) { return true; };
		if(editable == false || editable == 'false'){
			ctrl.disabled = 'disabled';
		}		
		if(tipo == 'bandera'){ return ctrl; };		
		ctrl.style.border =(editable != false || editable != 'false')? '1px solid #9392a4':'none';
		ctrl.style.height = '23px';	
		if(tipo == 'moneda'){valor = valor.replace("$", "").replace(",", "").replace(".00", "").replace('\'', '');}
		//alert (valor);
		ctrl.value = valor;		
		ctrl.onblur =(OnBlurObj != '' )? OnBlurObj: function(e) { return true;};
		if(tipo == 'fecha') {
			return ctrl;
		}
		return ctrl;
	}
	
	if (tipo == 'combo'){
		var datos = ValDatos('datos', aC);		
		var crtCmb = document.createElement('select');
		crtCmb.id = idC;
		crtCmb.style.width = (ancho != '')? ancho + 'px':'100%';		
		crtCmb.style.height = '23px';	
		crtCmb.name = grupo;	
		crtCmb.setAttribute('data-rng',idRenglon);		
		for (l in datos) {
			var iCmb = document.createElement('option');
			iCmb.value = datos[l].valor;
			iCmb.textContent = datos[l].descripcion;
			crtCmb.appendChild(iCmb);
		}
		return crtCmb;
	}
	
	
	if (tipo == 'comando'){		
				
		var crtBtn = document.createElement('BUTTON');
		crtBtn.id = idC;
		crtBtn.style.width = (ancho != '')? ancho + 'px':'100%';				
		crtBtn.style.height = '23px';
		crtBtn.name = valor;
		crtBtn.value = valor;
		crtBtn.name = grupo;		
		crtBtn.textContent = valor;
		crtBtn.setAttribute('data-rng',idRenglon);
		crtBtn.onclick = (OnClk != '')? OnClk: function(e) { return true; };
		return crtBtn;
	}
	
}

function InsertaRenglon(aC) {
	var columnas = ValDatos('columnas', aC);	
	var idTabla = ValDatos('idTabla', aC);
	var idGeneral = ValDatos('idGeneral', aC);	
	var posicion = ValDatos('posicion', aC);	
	posicion = (posicion != '')? posicion:'0';
	
	var valores = ValDatos('valores', aC);
	
	var OnItemClk = ValDatos('OnItemClk', aC);
	var OnItemdblClk = ValDatos('OnItemdblClk', aC);
	
	var campoKey = ValDatos('campoKey', aC);
	var editar = ValDatos('editar', aC);
	var botonEB = ValDatos ('botonEB', aC); //Propiedad para mostrar un solo boton	
	
	
	if(document.getElementById(idTabla)){	
		var tbl = document.getElementById(idTabla);
		var trRenglon = tbl.insertRow(0);
		trRenglon.id = tbl.id + '-' + posicion;
		trRenglon.setAttribute('data-tbl', idTabla);
		trRenglon.setAttribute('data-dgl', idGeneral);
		trRenglon.setAttribute('data-edi', botonEB);  //Data referente a la propiedad para mostrar un solo boton
		trRenglon.onclick = OnItemClk;
		trRenglon.ondblclick = OnItemdblClk;
		trRenglon.data = valores;
		var _j = 0;
		for(i in columnas){
			var itmCampos = columnas[i];							
			var columna = ValDatos('columna', itmCampos);	
			var titulo = ValDatos('titulo', itmCampos);
			var campo = ValDatos('campo', itmCampos);	
			
			
			var ancho = ValDatos('ancho', itmCampos);
			var tipo = ValDatos('tipo', itmCampos);
			var editable = ValDatos('editable', itmCampos);
			var sumable = ValDatos('sumable', itmCampos);
			var vDefault = ValDatos('vDefault', itmCampos);
			var oculto = ValDatos('oculto', itmCampos);
			var tmpPlantilla = ValDatos('tmpPlantilla', itmCampos);		
			var sumTotal = ValDatos('sumTotal', itmCampos);
			
			var flgOclt = (oculto === true) ? '1' : '0';
			editable = (editar == true)? editable:false;
			var valorCelda = ValDatos(columna, valores);
			vDefault = (valorCelda != '')? valorCelda:vDefault;
			
			var celda = trRenglon.insertCell(i);
			celda.id = trRenglon.id + '-' + columna;
			celda.style.border = '1px solid #9392a4';
			celda.style.height = '25px';
			celda.style.width = ancho + 'px';
			celda.style.cursor = 'pointer';
			if (oculto == true) celda.style.display = 'none';
			celda.setAttribute('data-col', columna);
			celda.setAttribute('data-tit', titulo);
			celda.setAttribute('data-ach', ancho);
			celda.setAttribute('data-tip', tipo);
			celda.setAttribute('data-edt', editable);
			celda.setAttribute('data-est', 'cerrado');
			celda.setAttribute('data-acc', 'editar');
			celda.setAttribute('data-sum', sumable);
			celda.setAttribute('data-def', vDefault);
			celda.setAttribute('data-val', vDefault);
			celda.setAttribute('data-oct', flgOclt);
			celda.setAttribute('data-tpl', tmpPlantilla);
			celda.setAttribute('data-smt', sumTotal);	//Parametro para regresar un arrreglo de los campos sumados
						
			var porcentajeMayor = ValDatos('porcentajeMayor', aC)
			porcentajeMayor = (porcentajeMayor == '')? false: porcentajeMayor;
			
			celda.innerHTML =(valores != '')? ValConv(valorCelda, tipo, porcentajeMayor):'';
			
			if (campoKey == columna) {
				trRenglon.setAttribute('data-vky', valorCelda);
			}
			
			if (tipo == 'bandera' && posicion != '0') {				
				var ctrl = CreaCeldaEdicion({ tipo:tipo
											, idC: 'chk-' + trRenglon.id + '-' + columna
											, editable: true
											, valor: columna
											, grupo: columna
											//, OnClk: OnChkTodos
											, idRenglon: trRenglon.id});
				celda.innerHTML = '';					
				celda.appendChild(ctrl);	
			}
			
			if (tipo == 'combo') {
				var urlCmb = ValDatos('urlCmb', itmCampos);
				var desCmb = ValDatos('desCmb', itmCampos);
				var vlrCmb = ValDatos('vlrCmb', itmCampos);
				var datosCmb = ValDatos('datos', itmCampos);

				if (datosCmb != '') {
					celda.data = datosCmb;
				} else {
					if (urlCmb != '')
						celda.data = CatalogoCmb(urlCmb, desCmb, vlrCmb);
				}
			}
			
			if (tipo == 'comando' && posicion != '0') {                    
				var OnBtnClick = ValDatos('OnBtnClick', itmCampos);					
				var ctrl = CreaCeldaEdicion({ tipo:tipo
											, idC: 'btn-' + trRenglon.id + '-' + columna
											, editable: true
											, valor: columna
											, OnClk: OnBtnClick
											, idRenglon: trRenglon.id});
				celda.innerHTML = '';					
				celda.appendChild(ctrl);					
			}
			
			celda.onclick = function (e) {
				var rGrd = this.parentElement;
				var bRen = rGrd.parentElement;
				var rnsB = bRen.getElementsByTagName('tr');
				for (h in rnsB) {
					try {
						rnsB[h].style.background = '#FFF';
						rnsB[h].setAttribute('data-sel', 'none');
					} catch (e) { continue; }
				}
				rGrd.setAttribute('data-sel', 'select');
				rGrd.style.background = '#ff7c4c';
				var cls = rGrd.getElementsByTagName('td');                    
				var rDatos = new Object();
				for (k in cls) {
					try {
						var col = cls[k].getAttribute('data-col');
						var vlr = cls[k].innerHTML;
						if (col) rDatos[col] = vlr;
					} catch (e) { continue; }
				}
				var idT = rGrd.getAttribute('data-tbl');
				document.getElementById(idT).data = rDatos;
			};
			
			_j++;
		}
		
		var celdaBtn = trRenglon.insertCell(_j);
        celdaBtn.style.border = '1px solid #9392a4';
        celdaBtn.style.height = '25px';
        celdaBtn.setAttribute('data-tip', 'botones');

		var botones = ValDatos('botones', aC);
		botones = (editar == true)? botones:false;
        if (botones == true) {
			//Si solo es necesario el boton de editar o si no tienen la propiedad
			if (botonEB == 'E' || botonEB == ''){ 
				var btnE = CreaBoton(trRenglon.id, 'Editar');
				btnE.setAttribute('data-rng', trRenglon.id);
				celdaBtn.appendChild(btnE);

				btnE.onclick = function (e) {
					var iR = this.getAttribute('data-rng');
					AccionRegistro(iR, 'editar');
				};
			}
			
			//Si solo es necesario el boton de borrar o si no tienen la propiedad
			if (botonEB == 'B' || botonEB == ''){
				var btnD = CreaBoton(trRenglon.id, 'Eliminar');
				btnD.setAttribute('data-rng', trRenglon.id);
				celdaBtn.appendChild(btnD);

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
}
///Control IU que permite crear o brindar a tributos a un control de tipo InputExtensions
/// Recibe como  parámetro un arreglo de propiedades para el objeto que se crea o se modifica 
function CajaTexto(apo) {
	//Parámetro del identificador del control 
	var namep = ValDatos('namep', apo);
	namep = (namep != '') ? namep : "";
	//Parámetro del identificador del control 
	var idp = ValDatos('idp', apo);
	idp = (idp != '') ? idp : "";
	//Parámetro que indica el tipo de control que  se creara 
	var tipo = ValDatos('tipo', apo);
	tipo = (tipo != '') ? tipo : "text";
	
    this.datos = apo;
	var TextBoxSifel;
	//Se valida si el control existe o se crea. Parámetro que requerido para el buen funcionamiento
	var crear = ValDatos('crear', apo);
	if(crear == "true"){
		TextBoxSifel = document.createElement('input');
		TextBoxSifel.id = idp;
		TextBoxSifel.name = namep;
		var idArea = ValDatos('idArea', apo);
		if (!document.getElementById(idArea)) {
			var msg = new VentanaMsj({ titulo: 'Mensaje Excepcion', mensaje: 'No existe el objeto' });
				return true;
		};
		
	//Área en donde se pintara el control generado
		this.area = document.getElementById(idArea);
		this.area.appendChild(TextBoxSifel);		
	}
	else{
		//Obtener el elemento con el ID especificado
		var idTextBoxSifel = ValDatos('idTextBoxSifel', apo);
	 TextBoxSifel = document.getElementById(idTextBoxSifel);
	}
	
	//ValDatos Obtiene la palabra clave para la configuración del control 
	var alto = ValDatos('alto', apo);
    var ancho = ValDatos('ancho', apo);
	//Se define el tamaño del objeto por default  en caso de que el arreglo no contenga las propiedades asignadas 
    alto = (alto != '') ? alto : 45;    
    ancho = (ancho != '') ? ancho : 200;
	//Se asigna el orden de tabulación para saltar al siguiente control en el formulario
	 var tabulador = ValDatos('tabulador', apo);
	 tabulador = (tabulador != '') ? tabulador : 1;
	 //describe el valor esperado de un campo de entrada
	 var tooltipp = ValDatos('tooltipp', apo);
	 tooltipp = (tooltipp != '') ? tooltipp : '';
	 //El valor que recibe el control para el contenido 
	 var verdatos = ValDatos('verdatos', apo);
	 verdatos = (verdatos != '') ? verdatos : " ";
	//Estado del control para edición Activo Inactivo  
	 var habilitadoedicion    = ValDatos('habilitadoedicion   ', apo);
	 habilitadoedicion    = (habilitadoedicion    != '') ? habilitadoedicion    : true;
	
	//Estado del control para edición Activo Inactivo  
	 var alineaciontexto    = ValDatos('alineaciontexto   ', apo);
	 alineaciontexto    = (alineaciontexto    != '') ? alineaciontexto    : "left";
	
	//Segmento de atributos genéricos 
	TextBoxSifel.style.textAlign = alineaciontexto; ;	
	TextBoxSifel.style.width = ancho + 'px';
    TextBoxSifel.style.height = alto + 'px';
	TextBoxSifel.value =verdatos;
	TextBoxSifel.readonly =habilitadoedicion;
	
	
	switch (tipo) {
        case 'texto':
            TextBoxSifel.type = 'text';
			TextBoxSifel.setAttribute('onkeypress', 'return SoloAlfanumerico(event);');
			TextBoxSifel.setAttribute('onkeydown','enterToTab(this.tabIndex, event);'); 
			TextBoxSifel.setAttribute('onkeyup','this.value = this.value.toUpperCase();'); 
			TextBoxSifel.addEventListener("blur", SoloAlfanumericoblur);
			TextBoxSifel.setAttribute('tabindex',tabulador); 
			break;
        case 'numerico':
		    TextBoxSifel.type = 'text';
            TextBoxSifel.setAttribute('onkeypress', 'return SoloNumero(event);');
			TextBoxSifel.setAttribute('onkeydown','enterToTab(this.tabIndex, event);');
           	TextBoxSifel.setAttribute('tabindex',tabulador); 
			break;
        case 'fecha':
            TextBoxSifel.type = 'text';
            TextBoxSifel.maxLength = 11;
			TextBoxSifel.setAttribute('onkeydown','enterToTab(this.tabIndex, event);');
           	TextBoxSifel.setAttribute('tabindex',tabulador); 
			new FechaPicker(TextBoxSifel.id).Calendario([
                  {
                      conValor: false
                      , altoCaja: 45
                  }
				]);	
			break;
        case 'bandera':
            TextBoxSifel.type = 'checkbox';
            break;
        case 'formulario':
            TextBoxSifel.type = 'checkbox';
            break;
        case 'porcentaje':
            TextBoxSifel.type = 'text';
            TextBoxSifel.maxLength = 7;
            TextBoxSifel.setAttribute('onkeypress', 'return SoloNumero(event);');
			TextBoxSifel.setAttribute('onkeydown','enterToTab(this.tabIndex, event);');
            TextBoxSifel.onblur = function (e) { this.value = (this.value >= 100) ? 100 : this.value; }
          	TextBoxSifel.setAttribute('tabindex',tabulador); 
			break;
        case 'moneda':
            TextBoxSifel.type = 'number';
			TextBoxSifel.setAttribute('onkeydown','enterToTab(this.tabIndex, event);');
           	TextBoxSifel.setAttribute('tabindex',tabulador); 
			break;
    }
	if(crear == "true"){
		return TextBoxSifel;
	}
}


function ProponeId(idP, n) {	
	var idPropuesto = idP + '-' + n;
	if(document.getElementById(idPropuesto)){		
		n += 1;
		return ProponeId(idP, n);
	}	
	return idPropuesto;
}


function SumaTablaHtml(aConf){
	var idTablaSumable = ValDatos('idTablaSumable', aConf);
	var idTablaResultado = ValDatos('idTablaResultado', aConf);
	
	if(!document.getElementById(idTablaSumable)){
		return 0;
	}	
	
	var tbl = document.getElementById(idTablaSumable);
	var datosResultado = new Array();
	var regresaArr = false;	
	if(!document.getElementById(idTablaResultado)){
		regresaArr = true;
	}
	
	var renglones = tbl.getElementsByTagName('tr');
	for(var i=0;i<renglones.length;i++){
		try {
			var renglon = renglones[i];
			var celdas = renglon.getElementsByTagName('td');
			for(var j=0;j<celdas.length;j++){
				try {
					var celda = celdas[j];
					var columna = celda.getAttribute('data-col');
					var valor = celda.getAttribute('data-val');
					var tipo = celda.getAttribute('data-tip');  
					var Sumable = celda.getAttribute('data-smt');  
					
					if(Sumable == 'S'){
						var total = valor;					
						if(datosResultado[j]){
							total = SumDatosXTip(tipo, datosResultado[j].RESULTADO, valor);
							datosResultado[j].RESULTADO = total;
						} else {				
							datosResultado.push({ RESULTADO: total, TIPO:tipo, SUMABLE: Sumable, COLUMNA: columna });
						}
					} else {
						datosResultado.push({ RESULTADO: '', TIPO:tipo, SUMABLE: Sumable, COLUMNA: columna });
					}
					
					//alert(JSON.stringify(datosResultado, null, 4));
				} catch(e){ continue; }
				//datosResultado.unshift();
			}
		} catch(e){ continue; }
	}
	//alert(JSON.stringify(datosResultado, null, 4));
	if(regresaArr == false){
		var tblR = document.getElementById(idTablaResultado);
		var renR = tblR.getElementsByTagName('tr');
		for(i in renR){
			try{
				var rn = renR[i];
				var cels = rn.getElementsByTagName('td');
				for(j in cels){		
					try {
						var celda = cels[j];
						var Rs = datosResultado[j];
						var columna = celda.getAttribute('data-col');				
						var tipo = celda.getAttribute('data-tip');  
						var Sumable = celda.getAttribute('data-smt');  
						
						if(Rs.COLUMNA == columna){
							celda.innerHTML = Rs.RESULTADO;			
						}
						//	datosResultado.push({ RESULTADO: '', TIPO:tipo, SUMABLE: Sumable, COLUMNA: columna });				
						//datosResultado.unshift();
					} catch(e){ continue; }
				}
			} catch(e){ continue; }
		}
	} else {
		return datosResultado;
	}
	
}


