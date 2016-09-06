$(document).ready(function () {
    $('#cod_agencia').prop('disabled', 'disabled');
    $('#tip_cliente').prop('disabled', 'disabled');
    $('#num_credito').prop('disabled', 'disabled');
    $('#ind_estado').prop('disabled', 'disabled');
    $('#num_cliente').prop('disabled', 'disabled');
    $('#nombre').prop('disabled', 'disabled');
    $('#rfc').prop('disabled', 'disabled');
    $('#num_referencia').prop('disabled', 'disabled');
    $('#cod_producto').prop('disabled', 'disabled');
    $('#tip_credito').prop('disabled', 'disabled');
    $('#tip_cuota').prop('disabled', 'disabled');
    $('#tip_calendario').prop('disabled', 'disabled');
    $('#per_cuota').prop('disabled', 'disabled');
    $('#fec_apertura').prop('disabled', 'disabled');
    $('#num_cuotas').prop('disabled', 'disabled');
    $('#plazo_credito').prop('disabled', 'disabled');
    $('#dia_pago').prop('disabled', 'disabled');
    $('#fec_vencimiento').prop('disabled', 'disabled');
    $('#dias_mora_permitidos').prop('disabled', 'disabled');
    $('#mon_solicitado').prop('disabled', 'disabled');
    $('#tasa_anual').prop('disabled', 'disabled');
    $('#por_iva').prop('disabled', 'disabled');
    $('#por_comision').prop('disabled', 'disabled');
    $('#mon_cuota').prop('disabled', 'disabled');
    $('#tip_cob_comision').prop('disabled', 'disabled');
    $('#mon_comision').prop('disabled', 'disabled');
    $('#tip_comision').prop('disabled', 'disabled');
    $('#max_comision').prop('disabled', 'disabled');
    $('#tasa_mensual').prop('disabled', 'disabled');
    $('#tasa_mora').prop('disabled', 'disabled');
    $('#pagos_a_capital').prop('disabled', 'disabled');
    $('#gracia_principal').prop('disabled', 'disabled');
    $('#aforo').prop('disabled', 'disabled');

    $("#fec_apertura").kendoDatePicker({ culture: "es-MX" });
    $("#fec_vencimiento").kendoDatePicker({ culture: "es-MX" });

    document.getElementById('liDesembolso').style.visibility = 'hidden';

    $('#tip_calendario').val('2');
    $('#divaforo').hide();
    $('#divpagos_a_capital').hide();
    $('#divgracia_principal').hide();

    $("#tasa_mensual").val(parseFloat(parseFloat($("#tasa_anual").val()) / 12).toFixed(2));

    $.getJSON('../Captura/ObtieneTipoCredito/001/' + $("#cod_producto").val() + "/" + $("#tip_credito").val() + "/1", function (data) {
        $.each(data, function (i, item) {
            if (item.ind_aforo == "S") {
                $('#divaforo').show();
            }
            if (item.ind_mes_gracia == "S") {
                $('#divgracia_principal').show();
            }
            if (item.ind_pago_capital == "S") {
                $('#divpagos_a_capital').show();
            }
        });
    });

    var modelClientes = new kendo.data.Model.define({
        id: "id_factura",
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
            fec_inicio: { type: "date", editable: false, format: 'dd/MM/yyyy' },
            fec_vencimiento: { type: "date", editable: false, format: 'dd/MM/yyyy' },
            fec_pago: { type: "date", editable: false, format: 'dd/MM/yyyy' },
            fec_alta: { type: "date", editable: false, format: 'dd/MM/yyyy' },
            estatus: { type: "boolean", editable: true, validation: { required: true }, defaultValue: 0 }
        }
    });


    $("#gridFactUtilizadas").kendoGrid({
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        url: '../Busqueda/ObtieneFactoraje/001/' + $("#num_credito").val() + '/0',
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
            { field: "fec_inicio", title: "Fec Factura", format: '{0:dd/MM/yyyy}' },
            { field: "fec_vencimiento", title: "Fec Término", format: '{0:dd/MM/yyyy}' },
            { field: "fec_pago", title: "Fec Pago", format: '{0:dd/MM/yyyy}' },
            { field: "fec_alta", hidden: true, format: '{0:dd/MM/yyyy}' },
            { field: "estatus", hidden: true }
        ]
    });
    var grid = $("#gridDisponibles").kendoGrid({
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        url: '../Busqueda/ObtieneFactoraje/001/' + $("#num_credito").val() + '/1',
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
        columns: [
            { template: "<input type='checkbox' class='checkbox'   style='height:10px' />", width: "30px" },
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
            { field: "fec_inicio", title: "Fec Factura", format: '{0:dd/MM/yyyy}' },
            { field: "fec_vencimiento", title: "Fec Término", format: '{0:dd/MM/yyyy}' },
            { field: "fec_pago", title: "Fec Pago", format: '{0:dd/MM/yyyy}' },
            { field: "fec_alta", hidden: true, format: '{0:dd/MM/yyyy}' },
            { field: "estatus", hidden: true }
        ]
    }).data("kendoGrid");
    //bind click event to the checkbox
    grid.table.on("click", ".checkbox", selectRow);
});


function SaveFacturas() {

    var p_cod_empresa = '001';
    var p_num_credito = $('#num_credito').val();
 
    var checked = [];
    for (var i in checkedIds) {
        if (checkedIds[i]) {
            checked.push(i);
        }
    }

    if (checked.length == 0) {
        MostrarAlerta("¡Información! ", " Favor de seleccionar  como mínimo  una factura para poder generar la disposición   ", "alert-info");
        return;
    }

    var json_Id_factura = JSON.stringify(checked);
    var datos = {
        cod_empresa: p_cod_empresa,
        num_credito: p_num_credito,
        Id_factura: json_Id_factura
    };
    /*Se ejecuta la petición al controlador */

    $.ajax({
        url: '../Creditos/GenerarDispersionFactoraje',
        type: 'POST',
        data: datos,
        success: function (data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i]["advertencia"] != null) {
                        MostrarAlerta("¡Advertencia! ", " " + data[i]["advertencia"] + ": " + data[i]["des_advertencia"], "alert-warning");
                    }
                    else if (data[i]["error"] != null) {
                        MostrarAlerta("¡Error! ", " " + data[i]["error"] + ": " + data[i]["des_error"], "alert-danger");
                    }
                    else if (data[i]["informativo"] != null) {
                        MostrarAlerta("¡Información! ", " " + data[i]["informativo"] + ": " + data[i]["des_informativo"], "alert-info");
                    }
                    else if (data[i]["realizado"] != null) {
                        MostrarAlerta("¡Éxito! ", " " + data[i]["realizado"] + ": " + data[i]["des_realizado"], "alert-success");
                        var gridDisponibles = $("#gridDisponibles").data("kendoGrid");
                        gridDisponibles.dataSource.read();
                        var gridFactUtilizadas = $("#gridFactUtilizadas").data("kendoGrid");
                        gridFactUtilizadas.dataSource.read();
                        document.getElementById('liDesembolso').style.visibility = 'visible';
                    }
                }
            }
            else {
                MostrarAlertaModal("¡Error! ", " Error: Script, No recupero información del proceso", "alert-danger");
            }
        }
    });
}


/*Asigna la clase de activo  a la sección que se esté editando Solo funciona con los link de siguiente y atrás  que se muestran en la parte inferior derecha */
function fnActivarSeccion(seccion) {
    document.getElementById("liDatosCredito").className = "";
    document.getElementById("liFacturasUtilizadas").className = "";
    document.getElementById("liFacturasDisponibles").className = "";
    document.getElementById("liDesembolso").className = "";
    switch (seccion) {
        case 'liDatosCredito':
            document.getElementById("liDatosCredito").className = "active";

            break;
        case 'liFacturasUtilizadas':
            document.getElementById("liFacturasUtilizadas").className = "active";
            break;
        case 'liFacturasDisponibles':
            document.getElementById("liFacturasDisponibles").className = "active";
            break;
        case 'liDesembolso':
            document.getElementById("liDesembolso").className = "active";
            break;
    }
}

var checkedIds = {};

//on click of the checkbox:
function selectRow() {
    var checked = this.checked,
    row = $(this).closest("tr"),
    grid = $("#gridDisponibles").data("kendoGrid"),
    dataItem = grid.dataItem(row);
    checkedIds[dataItem.id] = checked;
    if (checked) {
        //-select the row
        row.addClass("alert-info");
    } else {
        //-remove selection
        row.removeClass("alert-info");
    }
}