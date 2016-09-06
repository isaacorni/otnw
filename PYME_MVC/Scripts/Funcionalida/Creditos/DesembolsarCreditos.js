$(document).ready(function () {
    var p_cod_empresa = '001';
    var p_ind_estado = 'A';

    var modelClientes = new kendo.data.Model.define({
        id: "num_credito",
        fields: {
            cod_empresa: { type: "string", editable: true },
            num_cliente: { type: "string", editable: true },
            tip_cliente: { type: "string", editable: true },
            num_credito: { type: "string", editable: true },
            tip_credito: { type: "string", editable: true },
            des_tip_credito: { type: "string", editable: true },
            nombre: { type: "string", editable: true },
            rfc: { type: "string", editable: true },
            ind_estado: { type: "string", editable: true },
            des_estado: { type: "string", editable: true },
            tasa_anual: { type: "string", editable: true },
            plazo_credito: { type: "string", editable: true },
            mon_solicitado: { type: "string", editable: true },
            fec_solicitud: { type: "date", editable: false, format: 'dd/MM/yyyy' }
        }
    });

    $("#grid").kendoGrid({
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        url: '../Busqueda/ObtieneCredParaDesembolsar',
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
        sortable: {
            mode: "multiple",
            allowUnsort: true
        },
        autoBind: true,
        scrollable: true,
        columns: [
            { field: "cod_empresa", hidden: true },
            { field: "num_cliente", hidden: true },
            { field: "nombre", title: "Nombre" },
            { field: "tip_cliente", hidden: true },
            { field: "num_credito", title: "No. Crédito" },
            { field: "tip_credito", title: "Tipo Crédito" },
            { field: "des_tip_credito", hidden: true },
            { field: "rfc", title: "RFC" },
            { field: "ind_estado", hidden: true },
            { field: "des_estado", title: "Estado" },
            { field: "tasa_anual", title: "Tasa Anual" },
            { field: "plazo_credito", title: "Plazo" },
            { field: "mon_solicitado", title: "Monto Solicitado" },
            { field: "fec_solicitud", title: "Solicitado", format: '{0:dd/MM/yyyy}' },
            { field: "btnProcesar", command: { text: "Desembolsar", click: fn_ProcesaDesembolso }, title: "Procesar", width: "100px" },
        ],
    });

    if (p_ind_estado == '' || p_ind_estado == 'S') {

    }

});

function fn_ProcesaDesembolso(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    if (dataItem.tip_cliente == 'M') {
        var url = '../Creditos/ProcesarDesembolso';
        var form = $('<form action="' + url + '" method="get">' +
          '<input type="text" name="p_cod_empresa" value="001"   style = "width:1px;" />' +
          '<input type="text" name="p_num_cliente" value="' + dataItem.num_cliente + '"   style = "width:1px;" />' +
          '<input type="text" name="p_num_credito" value="' + dataItem.num_credito + '"   style = "width:1px;" />' +
          '</form>');
        $('body').append(form);
        form.submit();
    } else {
        MostrarAlerta("¡Información! ", 'No se puede otorgar crédito a' + dataItem.tipo_persona, "alert-info");
    }
}

function btn_return() {
    e.preventDefault();

}
