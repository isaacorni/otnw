$(document).ready(function () {
    /*Campos con solo valores de dígitos  y numéricos sin caracteres ¡”#$%&/(())=?¡  Evita que se desencadene el evento enter en las cajas de texto    */
    document.getElementById("num_credito").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("num_credito").setAttribute('onkeyup', 'this.value = this.value.toUpperCase();');
});
$("#btnBuscar").click(function (e) {
    var p_cod_empresa = '001';
    var p_ind_estado = $("#ind_estado").val();;
    var p_cadena_busqueda = $("#num_credito").val();
    if (p_cadena_busqueda != '') {
        if (p_ind_estado == '') {
            p_ind_estado = 'none';
        }
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
                cod_producto: { type: "string", editable: true }
            }
        });
        $("#grid").kendoGrid({
            dataSource: {
                transport: {
                    read: function (options) {
                        $.ajax({
                            url: '../Busqueda/ObtieneCredito/' + p_cod_empresa + '/' + p_ind_estado + '/' + p_cadena_busqueda,
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
                { command: { text: "Editar", click: fn_EditarCredito }, title: " ", width: "80px" },
                { field: "cod_empresa", hidden: true },
                { field: "num_cliente", title: "No. Cliente" },
                { field: "nombre", title: "Nombre" },
                { field: "tip_cliente", hidden: true },
                { field: "num_credito", title: "No. Crédito" },
                { field: "tip_credito", hidden: true },
                { field: "des_tip_credito", title: "Tipo Crédito" },
                { field: "rfc", title: "RFC" },
                { field: "ind_estado", hidden: true },
                { field: "des_estado", title: "Estado" },
                { field: "cod_producto", hidden: true },
                { field: "btnPlanPagos", command: { text: "Plan Pagos", click: fn_PlanPagos }, title: "Plan Pagos", width: "120px" },
            ],
        });
    }
    else {
        $("#grid").kendoGrid({
            columns: [],
            dataSource: []
        });
        MostrarAlerta("¡Información! ", " Favor de introducir un criterio de búsqueda", "alert-info");
    }
});

function onDataBound(e) {
    var grid = this; //e.detailRow.find("[data-role=grid]").data("kendoGrid");        
    var gridData = grid.dataSource.view();
    for (var i = 0; i < gridData.length; i++) {
        var ind_estado = gridData[i].ind_estado;
        var cod_producto = gridData[i].cod_producto;
        if (ind_estado != 'A'   ) {
            var currentUid = gridData[i].uid;
            var currentRow = grid.table.find("tr[data-uid='" + currentUid + "']");
            var deleteButton = $(currentRow).find("Plan Pagos");
            //12 es el Índice  de la columna en el orden del grid
            deleteButton.prevObject[0].children[12].hidden = "true";
        }
        else if (cod_producto == 'PR002') {
            var currentUid = gridData[i].uid;
            var currentRow = grid.table.find("tr[data-uid='" + currentUid + "']");
            var deleteButton = $(currentRow).find("Plan Pagos");
            //12 es el Índice  de la columna en el orden del grid
            deleteButton.prevObject[0].children[12].hidden = "true";
        }
    }
  
}


function fn_EditarCredito(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    if (dataItem.tip_cliente == 'M') {
        var url = '../Creditos/ActualizaCredito';
        var form = $('<form action="' + url + '" method="post">' +
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

function fn_PlanPagos(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var url = '';
    if (dataItem.tip_credito == 'CS' || dataItem.tip_credito == 'MG' || dataItem.tip_credito == 'SIM') {
        url = '../Creditos/CalculaPlanPago';
    }
    else if (dataItem.tip_credito == 'MGSI' || dataItem.tip_credito == 'MB') {
        url = '../Creditos/SeleccionCuotasPlanPagos';
    }

        var form = $('<form action="' + url + '" method="post">' +
          '<input type="text" name="p_cod_empresa" value="001"   style = "width:1px;" />' +
          '<input type="text" name="p_num_cliente" value="' + dataItem.num_cliente + '"   style = "width:1px;" />' +
          '<input type="text" name="p_num_credito" value="' + dataItem.num_credito + '"   style = "width:1px;" />' +
          '</form>');
        $('body').append(form);
        form.submit();
     
}
