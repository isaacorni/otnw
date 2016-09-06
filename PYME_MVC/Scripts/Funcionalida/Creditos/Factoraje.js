$(document).ready(function () {
    /*Campos con solo valores de dígitos  y numéricos sin caracteres ¡”#$%&/(())=?¡  Evita que se desencadene el evento enter en las cajas de texto    */
    document.getElementById("cod_agencia").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    /*Obliga a introducir solo caracteres en mayúsculas */
    document.getElementById("cod_agencia").setAttribute('onkeyup', 'this.value = this.value.toUpperCase();');

    $('#cod_agencia').prop('disabled', 'disabled');
    $('#num_credito').prop('disabled', 'disabled');
    $('#nombre').prop('disabled', 'disabled');
    $('#rfc').prop('disabled', 'disabled');
    $('#id_factura').prop('disabled', 'disabled');

    $('#por_tasa_mensual').prop('disabled', 'disabled');
    $('#mon_aforo').prop('disabled', 'disabled');
    $('#mon_valor_fact').prop('disabled', 'disabled');
    $('#mon_intereses').prop('disabled', 'disabled');
    $('#mon_iva').prop('disabled', 'disabled');
    $('#mon_entregado').prop('disabled', 'disabled');

    $("#fec_inicio").kendoDatePicker({ culture: "es-MX" });
    $("#fec_vencimiento").kendoDatePicker({ culture: "es-MX" });
    $("#fec_pago").kendoDatePicker({ culture: "es-MX" });

    $("#btnShowModalFactura").on("click", ShowModalFacturas);

    $('#fec_inicio').on('change', function () {
        cal_fec_vencimiento();
        cal_mon_intereses();
        cal_monto_iva();
        cal_mon_entregado();
    });
    $('#por_tasa_anual').on('change', function () {
        cal_por_tasa_mensual();
        cal_mon_intereses();
        cal_monto_iva();
        cal_mon_entregado();
    });
    $('#mon_real_fact').on('change', function () {
        cal_mon_aforo();
        cal_mon_valor_fact();
        cal_mon_intereses();
        cal_monto_iva();
        cal_mon_entregado();
    });
    $('#por_aforo').on('change', function () {
        cal_mon_aforo();
        cal_mon_valor_fact();
        cal_mon_entregado();
    });
    $('#fec_vencimiento').on('change', function () {
        cal_mon_intereses();
        cal_monto_iva();
        cal_mon_entregado();
    });
    $('#por_iva').on('change', function () {
        cal_monto_iva();
        cal_mon_entregado();
    });

    $('#dia_int').on('change', function () {
        cal_fec_vencimiento();
        cal_mon_intereses();
        cal_mon_entregado();
    });

    var modelClientes = new kendo.data.Model.define({
        id: "num_cuenta",
        fields: {
            cod_empresa: { type: "string", editable: true },
            num_credito: { type: "string", editable: true },
            id_factura: { type: "string", editable: true },
            num_factura: { type: "string", editable: true },
            num_movimiento: { type: "string", editable: true },
            mon_real_fact: { type: "string", editable: true },
            mon_valor_fact: { type: "string", editable: true },
            mon_entregado: { type: "string", editable: true },
            mon_a_pagar: { type: "string", editable: true },
            mon_aforo: { type: "string", editable: true },
            mon_iva: { type: "string", editable: true },
            mon_intereses: { type: "string", editable: true },
            por_aforo: { type: "string", editable: true },
            por_iva: { type: "string", editable: true },
            por_tasa_anual: { type: "string", editable: true },
            por_tasa_mensual: { type: "string", editable: true },
            dia_int: { type: "string", editable: true },
            fec_inicio: { type: "date", editable: false, format: 'dd/MM/yyyy' },
            fec_vencimiento: { type: "date", editable: false, format: 'dd/MM/yyyy' },
            fec_pago: { type: "date", editable: false, format: 'dd/MM/yyyy' },
            fec_alta: { type: "date", editable: false, format: 'dd/MM/yyyy' },
            estatus: { type: "boolean", editable: true, validation: { required: true }, defaultValue: 0 }
        }
    });


    $("#grid").kendoGrid({
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        url: '../Busqueda/ObtieneFactoraje/001/' + $("#num_credito").val() + '/2',
                        type: 'GET',
                        success: function (result) {
                            options.success(result);
                        }
                    });
                }
            },
            batch: true,
            schema: { model: modelClientes }
        },
        autoBind: true,
        scrollable: true,
        dataBound: onDataBound,
        columns: [
            { field: "cod_empresa", hidden: true },
            { field: "num_credito", hidden: true },
            { field: "id_factura", title: "Id", width: "50px" },
            { field: "num_factura", title: "Núm. Factura" },
            { field: "num_movimiento", hidden: true },
            { field: "mon_real_fact", title: "Val Factura" },
            { field: "mon_valor_fact", title: "Val Fact - Aforo" },
            { field: "mon_entregado", hidden: true },
            { field: "mon_a_pagar", title: "Monto a Pagar" },
            { field: "mon_aforo", title: "Monto Aforo" },
            { field: "mon_iva", hidden: true },
            { field: "mon_intereses", hidden: true },
            { field: "por_aforo", hidden: true },
            { field: "por_iva", hidden: true },
            { field: "por_tasa_anual", hidden: true },
            { field: "por_tasa_mensual", hidden: true },
            { field: "dia_int", hidden: true },
            { field: "fec_inicio", title: "Fec Factura", format: '{0:dd/MM/yyyy}' },
            { field: "fec_vencimiento", title: "Fec Término", format: '{0:dd/MM/yyyy}' },
            { field: "fec_pago", title: "Fec Pago", format: '{0:dd/MM/yyyy}' },
            { field: "fec_alta", hidden: true, format: '{0:dd/MM/yyyy}' },
            { field: "estatus", hidden: true },
            { field: "edit", command: { text: "Editar", click: EditFacturas }, hidden: true, title: "Editar", width: "90px" }
        ]
    });

    if ($("#num_cliente").val() != '') {
        var grid = $("#grid").data("kendoGrid");
        grid.showColumn("edit");
    }
});

function ShowModalFacturas() {
    $("#id_factura").val("");
    $("#num_factura").val("");
    $("#mon_real_fact").val("");
    $("#por_aforo").val("");
    $("#por_iva").val("");
    $("#por_tasa_anual").val("");
    $("#dia_int").val("");
    $("#fec_inicio").val("");
    $("#fec_vencimiento").val("");
    $("#fec_pago").val("");
    $("#mon_aforo").val("");
    $("#mon_iva").val("");
    $("#por_tasa_mensual").val("");
    $("#mon_intereses").val("");
    $("#mon_valor_fact").val("");
    $("#mon_entregado").val("");
    $('#lbltituloFactura').text('Nueva Factura');
    $("#divModalFactura").modal("show");
}

function EditFacturas(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    $("#id_factura").val("");
    $("#num_factura").val("");
    $("#mon_real_fact").val("");
    $("#por_aforo").val("");
    $("#por_iva").val("");
    $("#por_tasa_anual").val("");
    $("#dia_int").val("");
    $("#fec_inicio").val("");
    $("#fec_vencimiento").val("");
    $("#fec_pago").val("");
    $("#mon_aforo").val("");
    $("#mon_iva").val("");
    $("#por_tasa_mensual").val("");
    $("#mon_intereses").val("");
    $("#mon_valor_fact").val("");
    $("#mon_entregado").val("");

    $("#id_factura").val(dataItem.id_factura);
    $("#num_factura").val(dataItem.num_factura);
    $("#mon_real_fact").val(dataItem.mon_real_fact);
    $("#por_aforo").val(dataItem.por_aforo);
    $("#por_iva").val(dataItem.por_iva);
    $("#por_tasa_anual").val(dataItem.por_tasa_anual);
    $("#dia_int").val(dataItem.dia_int);
    $("#fec_inicio").val(GetFormattedDate(dataItem.fec_inicio));
    $("#fec_vencimiento").val(GetFormattedDate(dataItem.fec_vencimiento));
    $("#fec_pago").val(GetFormattedDate(dataItem.fec_pago));
    $("#mon_aforo").val(dataItem.mon_aforo);
    $("#mon_iva").val(dataItem.mon_iva);
    $("#por_tasa_mensual").val(dataItem.por_tasa_mensual);
    $("#mon_intereses").val(dataItem.mon_intereses);
    $("#mon_valor_fact").val(dataItem.mon_valor_fact);
    $("#mon_entregado").val(dataItem.mon_entregado);

    $('#lbltituloFactura').text('Editar Factura');
    $("#divModalFactura").modal("show");
}

function SaveFacturas() {
    if (CamposRequeridos()) {
        var v_cod_empresa = '001';
        var v_id_factura = $("#id_factura").val();
        var v_num_credito = $("#num_credito").val();
        var v_num_factura = $("#num_factura").val();
        var v_mon_real_fact = $("#mon_real_fact").val();
        var v_mon_valor_fact = $("#mon_valor_fact").val();      //   v_mon_real_fact- aforo 

        var v_mon_entregado = $("#mon_entregado").val();
        var v_mon_aforo = $("#mon_aforo").val();
        var v_mon_iva = $("#mon_iva").val();
        var v_mon_intereses = $("#mon_intereses").val();
        var v_por_aforo = $("#por_aforo").val();
        var v_por_iva = $("#por_iva").val();
        var v_por_tasa_anual = $("#por_tasa_anual").val();
        var v_por_tasa_mensual = $("#por_tasa_mensual").val();
        
        var v_dia_int = $("#dia_int").val();

        var v_fec_inicio = $("#fec_inicio").val();
        var v_fec_vencimiento = $("#fec_vencimiento").val();
        var v_fec_pago = $("#fec_pago").val();

        var url_evento = url_evento = '../Captura/GuardaFactura/'

        //El mon_a_pagar = v_mon_entregado  +  montonto de interes +  monto de iva
        
        var v_mon_a_pagar = parseFloat(parseFloat(v_mon_entregado) + parseFloat(v_mon_intereses) + parseFloat(v_mon_iva)).toFixed(2);
        var datos;
        datos = {
            cod_empresa: v_cod_empresa,
            num_credito: v_num_credito,
            id_factura: v_id_factura,
            num_factura: v_num_factura,
            mon_real_fact: v_mon_real_fact,
            mon_valor_fact: v_mon_valor_fact,
            mon_entregado: v_mon_entregado,
            mon_a_pagar: v_mon_a_pagar,
            mon_aforo: v_mon_aforo,
            mon_iva: v_mon_iva,
            mon_intereses: v_mon_intereses,
            por_aforo: v_por_aforo,
            por_iva: v_por_iva,
            por_tasa_anual: v_por_tasa_anual,
            por_tasa_mensual: v_por_tasa_mensual,
            dia_int: v_dia_int,
            fec_inicio: v_fec_inicio,
            fec_vencimiento: v_fec_vencimiento,
            fec_pago: v_fec_pago
        }

        /*Se ejecuta la petición al controlador */

        $.ajax({
            url: url_evento,
            type: 'POST',
            data: datos,
            success: function (data) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i]["advertencia"] != null) {
                            MostrarAlertaModal("¡Advertencia! ", " " + data[i]["advertencia"] + ": " + data[i]["des_advertencia"], "alert-warning");
                        }
                        else if (data[i]["error"] != null) {
                            MostrarAlertaModal("¡Error! ", " " + data[i]["error"] + ": " + data[i]["des_error"], "alert-danger");
                        }
                        else if (data[i]["informativo"] != null) {
                            MostrarAlertaModal("¡Información! ", " " + data[i]["informativo"] + ": " + data[i]["des_informativo"], "alert-info");
                        }
                        else if (data[i]["realizado"] != null) {
                            $("#id_factura").val(data[i]["des_realizado"].substring(data[i]["des_realizado"].lastIndexOf('[') + 1, data[i]["des_realizado"].lastIndexOf(']')));
                            var grid = $("#grid").data("kendoGrid");
                            grid.dataSource.read();
                            MostrarAlertaModal("¡Éxito! ", " " + data[i]["realizado"] + ": " + data[i]["des_realizado"], "alert-success");
                            setTimeout(function () {
                                $("#divModalFactura").modal("hide");
                            }, 3000);
                        }
                    }
                }
                else {
                    MostrarAlertaModal("¡Error! ", " Error: Script, No recupero información del proceso", "alert-danger");
                }
            }
        });
    }
}

//Determina la fecha de vencimiento de la factura calculando 90 días más a la fecha seleccionada  
function cal_fec_vencimiento() {
    var p_fec_inicio = $("#fec_inicio").val();
    var Numdias = parseFloat($("#dia_int").val());
    var NumdiasPago = parseFloat($("#dia_int").val()) + 2; // Solo para apoyar la usabilidad de la pantalla se asigna más días   a  la fecha de pago 
    if (p_fec_inicio != '' && Numdias != '') {
        $("#fec_vencimiento").val(sumaFecha(Numdias, p_fec_inicio));
        $("#fec_pago").val(sumaFecha(NumdiasPago, p_fec_inicio));
    }
    else {
        $("#fec_vencimiento").val('');
        $("#fec_pago").val('');
    }
}

///Calculo de monto Aforo
function cal_por_tasa_mensual() {
    var v_por_tasa_anual = $("#por_tasa_anual").val();
    if (v_por_tasa_anual != '') {
        var v_por_tasa_mensual = parseFloat(v_por_tasa_anual).toFixed(2) / 12;
        $("#por_tasa_mensual").val(parseFloat(v_por_tasa_mensual).toFixed(2));
    }
    else { $("#por_tasa_mensual").val(''); }
}

///Calculo de monto Aforo
function cal_mon_aforo() {
    var v_mon_real_fact = $("#mon_real_fact").val();
    var v_por_aforo = $("#por_aforo").val();
    if (v_por_aforo != '' && v_mon_real_fact != '') {
        var v_mon_aforo = (parseFloat(v_por_aforo).toFixed(2) * parseFloat(v_mon_real_fact).toFixed(2)) / 100;
        $("#mon_aforo").val(parseFloat(v_mon_aforo).toFixed(2));
    }
    else { $("#mon_aforo").val(''); }
}

///Calculo de monto Para el valor de la factura
function cal_mon_valor_fact() {
    var v_mon_real_fact = $("#mon_real_fact").val();
    var v_mon_aforo = $("#mon_aforo").val();
    if (v_mon_real_fact != '' && v_mon_aforo != '') {
        var v_mon_valor_fact = parseFloat(v_mon_real_fact).toFixed(2) - parseFloat(v_mon_aforo).toFixed(2);
        $("#mon_valor_fact").val(parseFloat(v_mon_valor_fact).toFixed(2));
    }
    else { $("#mon_valor_fact").val(''); }
}

///Calculo de monto Para los intereses
function cal_mon_intereses() {

    var v_por_tasa_anual = $("#por_tasa_anual").val();
    var v_mon_valor_fact = $("#mon_valor_fact").val();
    // var v_fec_vencimiento = $("#fec_vencimiento").val();
    //var v_fec_inicio = $("#fec_inicio").val();
    var v_dia_int = $("#dia_int").val();
    ///Se modifica la funcionalidad para que no calcule la diferencia en días de las fechas inicio y fin y solo tome el valor del campo días de interés 


    //if (v_por_tasa_anual != '' && v_mon_valor_fact != '' && v_fec_vencimiento != '' && v_fec_inicio != '') {
    if (v_por_tasa_anual != '' && v_mon_valor_fact != '' && v_dia_int != '') {

        var v_tasa_x_monto = (parseFloat(v_por_tasa_anual).toFixed(2) / 360) * parseFloat(v_mon_valor_fact).toFixed(2);

        //var aFecha1 = v_fec_inicio.split('/');
        //var aFecha2 = v_fec_vencimiento.split('/');
        //var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
        //var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
        //var dif = fFecha2 - fFecha1;
        //var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
        //var v_dif_dias = dias / 100;
        var v_dif_dias = parseFloat($("#dia_int").val()) / 100;

        var v_mon_intereses = parseFloat(v_tasa_x_monto).toFixed(2) * parseFloat(v_dif_dias).toFixed(2);

        $("#mon_intereses").val(parseFloat(v_mon_intereses).toFixed(2));
    }
    else { $("#mon_intereses").val(''); }
}

///Calculo de monto IVA
function cal_monto_iva() {
    var v_mon_intereses = $("#mon_intereses").val();
    var v_por_iva = $("#por_iva").val();

    if (v_mon_intereses != '' && v_por_iva != '') {
        var v_mon_iva = parseFloat(v_mon_intereses).toFixed(2) * (parseFloat(v_por_iva).toFixed(2) / 100);
        $("#mon_iva").val(parseFloat(v_mon_iva).toFixed(2));
    }
    else { $("#mon_iva").val(''); }
}

///Calculo de monto a Pagar
function cal_mon_entregado() {
    var v_mon_valor_fact = $("#mon_valor_fact").val();
    var v_mon_intereses = $("#mon_intereses").val();
    var v_mon_iva = $("#mon_iva").val();
    if (v_mon_valor_fact != '' && v_mon_intereses != '' && v_mon_iva != '') {
        var v_mon_entregado = parseFloat(parseFloat(v_mon_valor_fact).toFixed(2) - parseFloat(v_mon_intereses).toFixed(2) - parseFloat(v_mon_iva).toFixed(2)).toFixed(2);
        $("#mon_entregado").val(v_mon_entregado);
    }
    else { $("#mon_entregado").val(''); }
}

function CamposRequeridos() {
    var continuar = true;
    if (!$("#num_factura").val()) { continuar = false; MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Numero de Factura ", "alert-warning"); }
    if (!$("#mon_real_fact").val()) { continuar = false; MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Valor de la Factura ", "alert-warning"); }
    if (!$("#por_aforo").val()) { continuar = false; MostrarAlertaModal("¡Advertencia! ", " Campo requerido: % de Aforo ", "alert-warning"); }
    if (!$("#por_iva").val()) { continuar = false; MostrarAlertaModal("¡Advertencia! ", " Campo requerido: % de IVA ", "alert-warning"); }
    if (!$("#por_tasa_anual").val()) { continuar = false; MostrarAlertaModal("¡Advertencia! ", " Campo requerido: % de Tasa Anual  ", "alert-warning"); }
    if (!$("#dia_int").val()) { continuar = false; MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Día de Interés ", "alert-warning"); }
    if (!$("#fec_inicio").val()) { continuar = false; MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Fecha de factura  ", "alert-warning"); }
    if (!$("#fec_vencimiento").val()) { continuar = false; MostrarAlertaModal("¡Advertencia! ", " Campo requerido:  Fecha de Vencimiento ", "alert-warning"); }
    if (!$("#fec_pago").val()) { continuar = false; MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Fecha de pago  ", "alert-warning"); }
    if (!$("#mon_aforo").val()) { continuar = false; MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Monto de Aforo ", "alert-warning"); }
    if (!$("#mon_iva").val()) { continuar = false; MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Monto de IVA  ", "alert-warning"); }
    if (!$("#por_tasa_mensual").val()) { continuar = false; MostrarAlertaModal("¡Advertencia! ", " Campo requerido: % de Tasa Mensual  ", "alert-warning"); }
    if (!$("#mon_intereses").val()) { continuar = false; MostrarAlertaModal("¡Advertencia! ", " Campo requerido:  Monto de Interés ", "alert-warning"); }
    if (!$("#mon_valor_fact").val()) { continuar = false; MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Valor Factura – Aforo  ", "alert-warning"); }
    if (!$("#mon_entregado").val()) { continuar = false; MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Monto Entregado ", "alert-warning"); }
    return continuar;
}

function GetFormattedDate(todayTime) {
    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    return ("00" + day).slice(-2) + "/" + ("00" + month).slice(-2) + "/" + year;
}

function onDataBound(e) {
    var view = this.dataSource.view();
    for (var i = 0; i < view.length; i++) {
        if (view[i].estatus) {
            this.tbody.find("tr[data-uid='" + view[i].uid + "']")
            .addClass("alert-success");
        }
        else {
            var currentRow = this.tbody.find("tr[data-uid='" + view[i].uid + "']");
            var editButton = $(currentRow).find("Editar");
            editButton.prevObject[0].children[21].hidden = "true";

        }
    }
}


// Función que suma o resta días a la fecha indicada

sumaFecha = function (d, fecha) {
    var Fecha = new Date();
    var sFecha = fecha || (Fecha.getDate() + "/" + (Fecha.getMonth() + 1) + "/" + Fecha.getFullYear());
    var sep = sFecha.indexOf('/') != -1 ? '/' : '-';
    var aFecha = sFecha.split(sep);
    var fecha = aFecha[2] + '/' + aFecha[1] + '/' + aFecha[0];
    fecha = new Date(fecha);
    fecha.setDate(fecha.getDate() + parseInt(d));
    var anno = fecha.getFullYear();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();
    mes = (mes < 10) ? ("0" + mes) : mes;
    dia = (dia < 10) ? ("0" + dia) : dia;
    var fechaFinal = dia + sep + mes + sep + anno;
    return (fechaFinal);
}