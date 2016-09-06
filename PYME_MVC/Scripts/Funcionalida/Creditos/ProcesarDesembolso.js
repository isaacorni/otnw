$(function () {
    var ppData = JSON.parse(ppDataString);

    //Deshabilitar todos los campos necesarios
    $.each($('form').find("*"), function (idx, item) {
        var item = $(item);
        if (item.hasClass('disabled'))
            item.attr('disabled', true);
    });
    
    function editCredito() {
        var num_credito = $("#DatosCredito_num_credito").val();
        var num_cliente = $("#DatosCredito_num_cliente").val();
        var new_fec_apertura = $("#DatosCredito_fec_apertura").val();
        var cod_empresa = $("input#cod_empresa").val();

        $.ajax({
            url: '/Creditos/RecalculaPlanPagosRapido',
            type: 'POST',
            data: {
                p_cod_empresa: cod_empresa,
                p_num_credito: num_credito,
                p_num_cliente: num_cliente,
                p_new_fec_apertura: new_fec_apertura 
            },
        })
        .always(function (result) {
            console.log("complete");
            if (typeof result != 'undefined')
            {
                switch (result.resultCode) {
                    case "error":
                        alert(result.message);
                        break;

                    case "success":
                        var url = "/Creditos/ProcesarDesembolso?p_cod_empresa=" + cod_empresa + "&p_num_credito=" + num_credito + "&p_num_cliente=" + num_cliente;
                        window.location = url;
                        break;

                    default:

                }
            }
            console.log("algo salió mal");
        });

    }

    //Evento de cambio en la fecha de apertura para hacer el recálculo del plan de pagos
    function onchange(e) {
        $("#btnGuardar").addClass('disabled');
        MostrarAlerta("Alerta!! Cambio de fecha<br>", "Ha modificado la <strong>Fecha de apertura</strong> del crédito. <strong>Se recalculará el plan de pagos.</strong>", "alert-warning", 4000, editCredito);
    }

    $("#DatosCredito_fec_apertura").kendoDatePicker({
        culture: "es-MX",
        change: onchange
    });

    $("#DatosCredito_observacion").focus();

    $("#DatosCredito_fec_vencimiento").kendoDatePicker({ culture: "es-MX" });

    var modelPlanPagos = new kendo.data.Model.define({
        id: "num_cuota",
        fields: {
            cod_empresa: { type: "string", editable: true },
            num_credito: { type: "string", editable: true },
            num_cuota: { type: "number", editable: true },
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
        dataSource: ppData,
        autoBind: true,
        scrollable: true,
        sortable: true,
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

    $("#btnGuardar").on('click', function (e) {
        $.each($('form').find("*"), function (idx, item) {
            var item = $(item);
            if (item.hasClass('disabled'))
                item.attr('disabled', false);
        });
        $(this).addClass('disabled');



    });
});