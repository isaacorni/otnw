$(document).ready(function () {
    /*Campos con solo valores de dígitos  y numéricos sin caracteres ¡”#$%&/(())=?¡  Evita que se desencadene el evento enter en las cajas de texto    */
    document.getElementById("cadenabusqueda").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("cadenabusqueda").setAttribute('onkeyup', 'this.value = this.value.toUpperCase();');
});
$("#btnBuscar").click(function (e) {
    var p_cod_empresa = '001';
    var p_tipo_cliente = $("#tip_cliente").val();;
    var p_cadena_busqueda = $("#cadenabusqueda").val();
    if (p_cadena_busqueda != '') {
        if (p_tipo_cliente == '') {
            $("#grid").kendoGrid({
                columns: [],
                dataSource: []
            });
            MostrarAlerta("¡Información! ", " Seleccionar el tipo de cliente que desea consultar", "alert-info");
        }
        else {
            var modelClientes = new kendo.data.Model.define({
                id: "rfc",
                fields: {
                    num_cliente: { type: "string", editable: true },
                    nombre: { type: "string", editable: true },
                    rfc: { type: "string", editable: true },
                    correo_electronico: { type: "string", editable: true },
                    tipo_persona: { type: "string", editable: true },
                    tip_cliente: { type: "string", editable: true }
                }
            });
            $("#grid").kendoGrid({
                dataSource: {
                    transport: {
                        read: function (options) {
                            $.ajax({
                                url: '../Busqueda/ObtieneCliente/' + p_cod_empresa + '/' + p_tipo_cliente + '/' + p_cadena_busqueda,
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
                    { command: { text: "Editar", click: fn_EditarCliente }, title: " ", width: "80px" },
                    { command: { text: "Credito", click: fn_CrearCredito }, title: " ", width: "80px" },
                    { field: "num_cliente", title: "No. Cliente" },
                    { field: "nombre", title: "Nombre" },
                    { field: "rfc", title: "RFC" },
                    { field: "correo_electronico", title: "Correo" },
                    { field: "tipo_persona", title: "Persona" },
                    { field: "tip_cliente", title: "Cliente" }
                ],
            });
        
        }
    }
    else {
        $("#grid").kendoGrid({
            columns: [],
            dataSource: []
        });
        MostrarAlerta("¡Información! ", " Favor de introducir un criterio de búsqueda", "alert-info");
    }
});

function fn_EditarCliente(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var url;
    if (dataItem.tip_cliente == 'F') {
        url = '../Captura/PersonaFisica';
    }
    else if (dataItem.tip_cliente == 'M') {
        url = '../Captura/PersonaMoral';
    }
    else if (dataItem.tip_cliente == 'RL') {
        url = '../Captura/PersonaResponLegal';
    }
    else if (dataItem.tip_cliente == 'RL') {
        url = '../Captura/PersonaAval';
    }

    var form = $('<form action="' + url + '" method="post">' +
         '<input type="text" name="cod_empresa" value="001"   style = "width:1px;" />' +
         '<input type="text" name="num_cliente" value="' + dataItem.num_cliente + '"   style = "width:1px;" />' +
         '</form>');
    $('body').append(form);
    form.submit();
}

function fn_CrearCredito(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    if (dataItem.tip_cliente == 'M') {
        var url = '../Creditos/CrearCredito';
        var form = $('<form action="' + url + '" method="post">' +
          '<input type="text" name="cod_empresa" value="001"   style = "width:1px;" />' +
          '<input type="text" name="num_cliente" value="' + dataItem.num_cliente + '"   style = "width:1px;" />' +
          '</form>');
        $('body').append(form);
        form.submit();
    } else {
        MostrarAlerta("¡Información! ", 'No se puede otorgar crédito a' + dataItem.tipo_persona, "alert-info");
    }
}
