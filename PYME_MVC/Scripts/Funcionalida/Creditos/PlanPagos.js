$(document).ready(function () {

    $('#cod_agencia').prop('disabled', 'disabled');
    $('#tip_cliente').prop('disabled', 'disabled');
    $('#num_credito').prop('disabled', 'disabled');
    $('#num_cliente').prop('disabled', 'disabled');
    $('#nombre').prop('disabled', 'disabled');
    $('#rfc').prop('disabled', 'disabled');
    $('#num_referencia').prop('disabled', 'disabled');
    $('#cod_producto').prop('disabled', 'disabled');
    $('#tip_credito').prop('disabled', 'disabled');
    $('#tip_comision').prop('disabled', 'disabled');
    $('#max_comision').prop('disabled', 'disabled');
    $('#dias_mora_permitidos').prop('disabled', 'disabled');
    $('#plazo_credito').prop('disabled', 'disabled');
    $('#per_cuota').prop('disabled', 'disabled');
    $('#num_cuotas').prop('disabled', 'disabled');
    $('#plazo_credito').prop('disabled', 'disabled');
    $('#tip_calendario').prop('disabled', 'disabled');
    $('#fec_apertura').prop('disabled', 'disabled');
    $('#dia_pago').prop('disabled', 'disabled');
    $('#fec_vencimiento').prop('disabled', 'disabled');
    $('#tip_cob_comision').prop('disabled', 'disabled');
    $('#mon_comision').prop('disabled', 'disabled');
    $('#tasa_anual').prop('disabled', 'disabled');
    $('#tasa_mora').prop('disabled', 'disabled');
    $('#mon_solicitado').prop('disabled', 'disabled');
    $('#por_iva').prop('disabled', 'disabled');
    $('#gracia_principal').prop('disabled', 'disabled');
    $('#aforo').prop('disabled', 'disabled');
    $('#pagos_a_capital').prop('disabled', 'disabled');

    $("#fec_apertura").kendoDatePicker({ culture: "es-MX" });
    $("#fec_vencimiento").kendoDatePicker({ culture: "es-MX" });
    $('#divPlanPagoAlterno').hide();
    

    $('#divaforo').hide();
    $('#divpagos_a_capital').hide();
    $('#divgracia_principal').hide();

    /*Recuperación de la información necesaria*/
    var p_cod_empresa = '001';
    var p_num_credito = $('#num_credito').val();

    var modelPlanPagos = new kendo.data.Model.define({
        id: "num_cuota",
        fields: {
            cod_empresa: { type: "string", editable: true },
            num_credito: { type: "string", editable: true },
            num_cuota: { type: "string", editable: true },
            fec_cuota: { type: "date", editable: false, format: 'dd/MM/yyyy' },
            fec_real_cuota: { type: "date", editable: false, format: 'dd/MM/yyyy' },
            dia_pago: { type: "string", editable: true },
            tip_cuota: { type: "string", editable: true },
            fec_cancelacion: { type: "date", editable: false, format: 'dd/MM/yyyy' },
            fec_ult_pago_mora: { type: "date", editable: false, format: 'dd/MM/yyyy' },
            fec_prorroga: { type: "date", editable: false, format: 'dd/MM/yyyy' },
            mon_cuota: { type: "string", editable: true },
            mon_capital: { type: "string", editable: true },
            mon_int: { type: "string", editable: true },
            mon_iva: { type: "string", editable: true },
            mon_comision: { type: "string", editable: true },
            sal_capital: { type: "string", editable: true },
            sal_int: { type: "string", editable: true },
            sal_iva: { type: "string", editable: true },
            sal_comision: { type: "string", editable: true },
            sal_credito: { type: "string", editable: true },
            tasa_int: { type: "string", editable: true },
            dia_int: { type: "string", editable: true },
            per_cuota: { type: "string", editable: true },
            per_comision: { type: "string", editable: true },
            mon_mora: { type: "string", editable: true },
            dias_mora: { type: "string", editable: true },
            fec_pago: { type: "date", editable: false, format: 'dd/MM/yyyy' },
            ind_estado: { type: "string", editable: true },
        }
    });

    $("#grid").kendoGrid({
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        url: '../Busqueda/ObtienePlanPagos/' + p_cod_empresa + '/' + p_num_credito,
                        type: 'GET',
                        success: function (result) {
                            options.success(result);
                        }
                    });
                }
            },
            batch: true,
            schema: { model: modelPlanPagos }
        },
        autoBind: true,
        scrollable: true,
        columns: [
            { field: "cod_empresa", hidden: true },
            { field: "num_credito", hidden: true },
            { field: "num_cuota", title: "No.", width: "30px" },
            { field: "fec_cuota", title: "Fec Cuota", format: '{0:dd/MM/yyyy}', width: "90px" },
            { field: "fec_real_cuota", hidden: true, title: "Fec Real Cuota", format: '{0:dd/MM/yyyy}', width: "90px" },
            { field: "dia_pago", hidden: true },
            { field: "tip_cuota", hidden: true },
            { field: "fec_cancelacion", hidden: true, format: '{0:dd/MM/yyyy}', width: "90px" },
            { field: "fec_ult_pago_mora", hidden: true, format: '{0:dd/MM/yyyy}', width: "90px" },
            { field: "fec_prorroga", hidden: true, format: '{0:dd/MM/yyyy}', width: "90px" },
            { field: "mon_cuota", title: "Cuota", width: "90px" },
            { field: "mon_capital", title: "Capital", width: "90px" },
            { field: "mon_int", title: "Interes", width: "90px" },
            { field: "mon_iva", title: "IVA", width: "90px" },
            { field: "mon_comision", title: "Comision", width: "90px" },
            { field: "sal_capital", title: "Sal Capital", width: "90px" },
            { field: "sal_int", title: "Sal Interes", width: "90px" },
            { field: "sal_iva", title: "Sal IVA", width: "90px" },
            { field: "sal_comision", title: "Sal comision", width: "90px" },
            { field: "sal_credito", title: "Sal Total", width: "90px" },
            { field: "tasa_int", title: "Tasa Interes", width: "90px" },
            { field: "dia_int", title: "Dia/Interes", width: "80px" },
            { field: "per_cuota", hidden: true },
            { field: "per_comision", hidden: true },
            { field: "mon_mora", title: "Mora", width: "90px", hidden: true },
            { field: "dias_mora", title: "Dia/Mora", width: "70px", hidden: true },
            { field: "fec_pago", hidden: true, format: '{0:dd/MM/yyyy}', width: "90px" },
            { field: "ind_estado", hidden: true }
        ],
    });


    if ($('#num_credito').val() != '') {
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

    }

    $("#btnGenerar").click(function () {


        var datos = {
            "cod_empresa": p_cod_empresa,
            "num_credito": p_num_credito
        };

      
        $.ajax({
            url: '../Creditos/GeneraPlanPagos',
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
                            var grid = $("#grid").data("kendoGrid");
                            grid.dataSource.read();
                            //$('#divPlanPagoAlterno').show();
                        }
                    }
                }
                else {
                    MostrarAlerta("¡Error! ", " Error: Script, No recupero información del proceso", "alert-danger");
                }
            }
        });

    });


    $("#btnPlanPagoAlterno").click(function () {
        var p_cod_empresa = '001';
        var p_num_cliente = $('#num_cliente').val();
        var p_num_credito = $('#num_credito').val();
        var url = '../Creditos/SeleccionCuotasPlanPagos';
        var form = $('<form action="' + url + '" method="post">' +
          '<input type="text" name="p_cod_empresa" value="' + p_cod_empresa + '"  style = "width:1px;" />' +
          '<input type="text" name="p_num_cliente" value="' + p_num_cliente + '"   style = "width:1px;" />' +
          '<input type="text" name="p_num_credito" value="' + p_num_credito + '"   style = "width:1px;" />' +
          '</form>');
        $('body').append(form);
        form.submit();
    });
});

