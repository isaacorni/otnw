$(document).ready(function () {
    /*Campos con solo valores de dígitos  y numéricos sin caracteres ¡”#$%&/(())=?¡  Evita que se desencadene el evento enter en las cajas de texto    */
    document.getElementById("num_credito").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("num_credito").setAttribute('onkeyup', 'this.value = this.value.toUpperCase();');
});
$("#btnBuscar").click(function (e) {
    var p_cadena_busqueda = $("#num_credito").val();
    if (p_cadena_busqueda != '') {
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
                des_estado: { type: "string", editable: true }
            }
        });
        $("#grid").kendoGrid({
            dataSource: {
                transport: {
                    read: function (options) {                                     /*PR002	FACTORAJE FINANCIERO*/
                        $.ajax({                                                   /*SIM	SIMPLE*/
                            url: '../Busqueda/ObtieneCreditoTipo/001/PR002/SIM/' + p_cadena_busqueda, //la liga busca solo creditos de Factoraje    
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
                { field: "num_cliente", title: "No. Cliente" },
                { field: "nombre", title: "Nombre" },
                { field: "tip_cliente", hidden: true },
                { field: "num_credito", title: "No. Crédito" },
                { field: "tip_credito", hidden: true },
                { field: "des_tip_credito", title: "Tipo Crédito" },
                { field: "rfc", title: "RFC" },
                { field: "ind_estado", hidden: true },
                { field: "des_estado", title: "Estado" },
                { command: { text: "Disposición", click: fn_Disposicion }, title: " " },
                { field: "btnAltaFactura", command: { text: "Alta Factura", click: fn_AltaFactura }, title: " "},
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


function fn_Disposicion(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var url = '../Creditos/DisposicionFactoraje';
    var form = $('<form action="' + url + '" method="post">' +
      '<input type="text" name="p_cod_empresa" value="001"   style = "width:1px;" />' +
      '<input type="text" name="p_num_cliente" value="' + dataItem.num_cliente + '"   style = "width:1px;" />' +
      '<input type="text" name="p_num_credito" value="' + dataItem.num_credito + '"   style = "width:1px;" />' +
      '</form>');
    $('body').append(form);
    form.submit();
}

function fn_AltaFactura(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var url = '../Creditos/AltaFactura';
    var form = $('<form action="' + url + '" method="post">' +
      '<input type="text" name="p_cod_empresa" value="001"   style = "width:1px;" />' +
      '<input type="text" name="p_num_cliente" value="' + dataItem.num_cliente + '"   style = "width:1px;" />' +
      '<input type="text" name="p_num_credito" value="' + dataItem.num_credito + '"   style = "width:1px;" />' +
      '</form>');
    $('body').append(form);
    form.submit();

}
