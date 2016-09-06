//EVITA QUE SE DESENCADENE EL EVENTO ENTER EN LAS CAJAS DE TEXTO
function NoAceptaEnter(textbox, evento) {
    var keyCode;
    if (evento.which || evento.charCode) {
        keyCode = evento.which ? evento.which : evento.charCode;
    }
    else if (window.event) {
        keyCode = event.keyCode;
        if (keyCode == 13) {
            if (event.keyCode)
                event.keyCode = 9;
        }
    }
    if (keyCode == 13) {
        return false;
    }

    return true;
};


//FUNCION QUE VALIDA ALFANUMERICO
//diseñara para el evento onkeypress
function SoloAlfanumerico(textbox, evento) {
    //Captura el evento de presión de una tecla recupera el código que genera y solo se permite Backspace
    var keynum = window.event ? window.event.keyCode : evento.which;
    if (keynum == 8 || keynum == 0) {//if ((keynum == 8) || (keynum == 46)){
        return true;
    }
    else if (keynum == 13) {
        return false;
    }
    //Valida si el carácter cuenta con la restricción de la expresión regular  
    return /^([a-zA-Z0-9\s])/.test(String.fromCharCode(keynum));
};

//FUNCION QUE VALIDA CONTROL SOLO NUMERO
function SoloNumero(textbox, evento) {
    var keynum = window.event ? window.event.keyCode : evento.which;
    if (keynum == 8 || keynum == 0) {//if ((keynum == 8) || (keynum == 46))
        return true;
    }
    else if (keynum == 13) {
        return false;
    }
    return /\d/.test(String.fromCharCode(keynum));
};

//FUNCION QUE VALIDA ALFANUMERICO
//diseñara para el evento blur
function SoloAlfanumericoblur(e) {
    //Evalúa  el contenido de la caja de texto mediante expresión
    // regular, en caso de no cumplir elimina el contenido de la caja de texto   
    var m = this.value;
    var regex = /^([a-zA-Z0-9 ]+)$/;
    this.value = (regex.test(m)) ? m.toUpperCase() : '';
};

function MostrarAlerta(etiquetamensaje, mensaje, tipoalerta, tiempo, callback) {
    //alerttype => alert-success
    //alerttype => alert-info
    //alerttype => alert-warning
    //alerttype => alert-danger
    _tiempo = tiempo || 5000;
    $('#alert_placeholder').append('<div id="alertdiv" class="alert ' + tipoalerta + '"><a class="close" data-dismiss="alert">×</a><span><strong>' + etiquetamensaje + '</strong>' + mensaje + '</span></div>')
    setTimeout(function () { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs
        $("#alertdiv").remove();
        callback && callback();
    }, _tiempo);
};


function MostrarAlertaModal(etiquetamensaje, mensaje, tipoalerta, tiempo, callback) {
    //alerttype => alert-success
    //alerttype => alert-info
    //alerttype => alert-warning
    //alerttype => alert-danger
    _tiempo = tiempo || 5000;
    $('#alert_modal').append('<div id="alertdiv" class="alert ' + tipoalerta + '"><a class="close" data-dismiss="alert">×</a><span><strong>' + etiquetamensaje + '</strong>' + mensaje + '</span></div>')
    setTimeout(function () { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs
        $("#alertdiv").remove();
        callback && callback();
    }, _tiempo);
};

function isValidForm(form) {
    var validForm = true;
    $.each(form.find('*[required]'), function (idx, item) {
        var item = $(item);
        if (item.val() === "") {
            if (typeof item.prev() != "undefined") {
                var lbl = item.prev().html();
                MostrarAlerta("Error<br>", "El campo <strong>" + lbl + "</strong> no puede quedar vacío", "alert-danger", 5000, false);
            }
            validForm = false;
        }
    });
    return validForm;
}