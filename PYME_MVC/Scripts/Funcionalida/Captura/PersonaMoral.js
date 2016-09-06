$(document).ready(function () {
    /*Campos con solo valores de dígitos  y numéricos sin caracteres ¡”#$%&/(())=?¡  Evita que se desencadene el evento enter en las cajas de texto    */
    document.getElementById("nombre").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("num_acta").setAttribute('onkeypress', 'return SoloNumero(this,event);');
    document.getElementById("gpo_empresarial").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("fec_constitucion").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("rfc").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("calle").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("num_ext").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("num_int").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("cp").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("tel_local").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("tel_celular").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("tel_otro").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("calle_f").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("num_ext_f").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("num_int_f").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("cp_f").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("tel_local_f").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("tel_celular_f").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("tel_otro_f").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txtnum_cuenta").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txtclabe").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txtnombre_regperson").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txtseg_nombre_regperson").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txtape_paterno_regperson").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txtape_materno_regperson").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txtrfc_regperson").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txtcurp_regperson").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    //document.getElementById("txtporc_acciones_acc").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txtimporte_capital_acc").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txtnum_escritura_rpl").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txtfolio_mercantil_rpl").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txtcod_tipo_facultades_rpl").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txtcod_ejercimiento_rpl").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txtpuesto_rp").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txtcalle_regperson").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txtnum_ext_regperson").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txtnum_int_regperson").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txtcp_regperson").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txttel_local_regperson").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txttel_celular_regperson").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txttel_otro_regperson").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');



    /*Obliga a introducir solo caracteres en mayúsculas */
    document.getElementById("nombre").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("num_acta").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("gpo_empresarial").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("fec_constitucion").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("rfc").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("calle").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("num_ext").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("num_int").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("cp").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("tel_local").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("tel_celular").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("tel_otro").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("calle_f").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("num_ext_f").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("num_int_f").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("cp_f").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("tel_local_f").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("tel_celular_f").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("tel_otro_f").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("txtnum_cuenta").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("txtclabe").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("txtnombre_regperson").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("txtseg_nombre_regperson").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("txtape_paterno_regperson").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("txtape_materno_regperson").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("txtrfc_regperson").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("txtcurp_regperson").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("txtporc_acciones_acc").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("txtimporte_capital_acc").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("txtnum_escritura_rpl").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("txtfolio_mercantil_rpl").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("txtcod_tipo_facultades_rpl").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("txtcod_ejercimiento_rpl").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("txtpuesto_rp").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("txtcalle_regperson").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("txtnum_ext_regperson").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("txtnum_int_regperson").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("txtcp_regperson").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("txttel_local_regperson").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("txttel_celular_regperson").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');
    document.getElementById("txttel_otro_regperson").setAttribute('onkeyup', 'this.value=this.value.toUpperCase();');

    /*Se agrega la propiedad de calendario al control  */
    $("#fec_constitucion").kendoDatePicker({ culture: "es-MX" });

    /*Se delega el evento a los botones dependiendo de su funcionalidad */
    $("#btnShowModalCuentaBancaria").on("click", ShowModalCuentaBancaria);
    $("#btnShowModalAccionista").on("click", ShowModalRegPerson);
    $("#btnShowModalRepresentanteLegal").on("click", ShowModalRegPerson);
    $("#btnShowModalsAval").on("click", ShowModalRegPerson);
    $("#btnShowModalsResponsablePago").on("click", ShowModalRegPerson);


    /* Inicia Se delega el evento de la búsqueda de direcciones al evento “Enter” del control Código postal Para la dirección cliente*/
    $(document).on("keypress", "#cp", function (e) {
        cod_postal = $('#cp').val();
        if (e.which == 13 && cod_postal != "") {
            var items = "<option value=''>Selecciona colonia...</option>";
            $.ajax({
                url: '../Captura/CatalogoColonia/' + cod_postal,
                type: 'GET',
                success: function (data) {
                    $.each(data, function (i, item) {
                        items += "<option value = '" + item.cod_colonia + "'>" + item.des_colonia + "</option>";
                    });
                    $("#cod_colonia").html(items);
                    var _vacio = "<option></option>";
                    $("#cod_estado").html(_vacio);
                    $("#cod_municipio").html(_vacio);
                },
                error: function () { alert('No se recuperó  Información del Código Postal '); },
            });
            return false;
        }
    });

    $("#cod_colonia").on('change', function () {
        p_cp = $('#cp').val();
        p_cod_colonia = $('#cod_colonia').val();
        if (p_cp != "" && p_cod_colonia != "") {
            $.getJSON('../Captura/ObtieneDomicilioSepomex/' + p_cp + '/' + p_cod_colonia, function (data) {
                var item1;
                var item2;
                $.each(data, function (i, item) {
                    item1 = item1 + " <option value = '" + item.cod_estado + "'>" + item.nom_estado + "</option> ";
                    item2 = item2 + " <option value = '" + item.cod_municipio + "'>" + item.des_municipio + "</option> ";
                });
                $("#cod_estado").html(item1);
                $("#cod_municipio").html(item2);
            });
        }
        else {
            var _vacio = "<option></option>";
            $("#cod_estado").html(_vacio);
            $("#cod_municipio").html(_vacio);
        }
    });

    /* Termina Se delega el evento de la búsqueda de direcciones al evento “Enter” del control Código postal Para la dirección cliente*/


    /* Inicia Se delega el evento de la búsqueda de direcciones al evento “Enter” del control Código postal Para la dirección fiscal */
    $(document).on("keypress", "#cp_f", function (e) {
        cod_postal_f = $('#cp_f').val();
        if (e.which == 13 && cod_postal_f != "") {
            var items = "<option value=''>Selecciona colonia...</option>";
            $.ajax({
                url: '../Captura/CatalogoColonia/' + cod_postal_f,
                type: 'GET',
                success: function (data) {
                    $.each(data, function (i, item) {
                        items += "<option value = '" + item.cod_colonia + "'>" + item.des_colonia + "</option>";
                    });
                    $("#cod_colonia_f").html(items);
                    var _vacio = "<option></option>";
                    $("#cod_estado_f").html(_vacio);
                    $("#cod_municipio_f").html(_vacio);
                },
                error: function () { alert('No se recuperó  Información del Código Postal '); },
            });
            return false;
        }
    });

    $("#cod_colonia_f").on('change', function () {
        p_cp_f = $('#cp_f').val();
        p_cod_colonia_f = $('#cod_colonia').val();
        if (p_cod_colonia_f != "" && p_cp_f != "") {
            $.getJSON('../Captura/ObtieneDomicilioSepomex/' + p_cp_f + '/' + p_cod_colonia_f, function (data) {
                var item1;
                var item2;
                $.each(data, function (i, item) {
                    item1 = item1 + " <option value = '" + item.cod_estado + "'>" + item.nom_estado + "</option> ";
                    item2 = item2 + " <option value = '" + item.cod_municipio + "'>" + item.des_municipio + "</option> ";
                });
                $("#cod_estado_f").html(item1);
                $("#cod_municipio_f").html(item2);
            });
        }
        else {
            var _vacio = "<option></option>";
            $("#cod_estado_f").html(_vacio);
            $("#cod_municipio_f").html(_vacio);
        }
    });

    /* Termina Se delega el evento de la búsqueda de direcciones al evento “Enter” del control Código postal Para la dirección fiscal */


    /* Inicia Se delega el evento de la búsqueda de direcciones al evento “Enter” del control Código postal Para la dirección de la persona relacionada con el cliente */
    $(document).on("keypress", "#txtcp_regperson", function (e) {
        cod_postal_regperson = $('#txtcp_regperson').val();
        if (e.which == 13 && cod_postal_regperson != "") {
            var items = "<option value=''>Selecciona colonia...</option>";
            $.ajax({
                url: '../Captura/CatalogoColonia/' + cod_postal_regperson,
                type: 'GET',
                success: function (data) {
                    $.each(data, function (i, item) {
                        items += "<option value = '" + item.cod_colonia + "'>" + item.des_colonia + "</option>";
                    });
                    $("#ddlcod_colonia_regperson").html(items);
                    var _vacio = "<option></option>";
                    $("#ddlcod_estado_regperson").html(_vacio);
                    $("#ddlcod_municipio_regperson").html(_vacio);
                },
                error: function () { alert('No se recuperó  Información del Código Postal '); },
            });
            return false;
        }
    });

    $("#ddlcod_colonia_regperson").on('change', function () {
        p_cp_regperson = $('#txtcp_regperson').val();
        p_cod_colonia_regperson = $('#ddlcod_colonia_regperson').val();
        if (p_cod_colonia_regperson != "" && p_cp_regperson != "") {
            $.getJSON('../Captura/ObtieneDomicilioSepomex/' + p_cp_regperson + '/' + p_cod_colonia_regperson, function (data) {
                var item1;
                var item2;
                $.each(data, function (i, item) {
                    item1 = item1 + " <option value = '" + item.cod_estado + "'>" + item.nom_estado + "</option> ";
                    item2 = item2 + " <option value = '" + item.cod_municipio + "'>" + item.des_municipio + "</option> ";
                });
                $("#ddlcod_estado_regperson").html(item1);
                $("#ddlcod_municipio_regperson").html(item2);
            });
        }
        else {
            var _vacio = "<option></option>";
            $("#ddlcod_estado_regperson").html(_vacio);
            $("#ddlcod_municipio_regperson").html(_vacio);
        }
    });

    /* Termina Se delega el evento de la búsqueda de direcciones al evento “Enter” del control Código postal Para la dirección de la persona relacionada con el cliente */

    $("#cod_actividad").on('change', function () {
        var valor_giro = $("#cod_actividad").val();
        var cod_actividad = valor_giro.substring(0, valor_giro.indexOf(':'))
        $.getJSON('../Captura/ObtenerSector/' + cod_actividad, function (data) {
            var items;
            $.each(data, function (i, item) {
                items += "<option value='" + item.cod_actividad + "'>" + item.des_actividad + "</option>";
            });
            $("#cod_sector").html(items);
        });
    });


    /*<<<<<<<<<<<Inicia Sección de grid para las cuentas bancarias, accionista, avales, representante legal, responsable de pago>>>>>>>>>>>>>>>>*/

    var num_cliente = ($('#num_cliente').val() == '') ? 0 : $('#num_cliente').val();


    /*Modelos para el grid de kendo*/
    var modelCuentaBancaria = new kendo.data.Model.define({
        id: "num_cuenta",
        fields: {
            cod_num_cuenta: { type: "string", editable: true },
            num_cliente: { type: "string", editable: true },
            cod_banco: { type: "string", editable: true },
            num_cuenta: { type: "string", editable: true },
            clabe: { type: "string", editable: true },
            banco_pral: { type: "boolean", editable: true, validation: { required: true }, defaultValue: 0 }
        }
    });

    var modelaccionistas = new kendo.data.Model.define({
        id: "num_accionista",
        fields: {
            cod_empresa: { type: "string", editable: true },
            num_cliente: { type: "string", editable: true },
            num_accionista: { type: "string", editable: true },
            nombre: { type: "string", editable: true },
            seg_nombre: { type: "string", editable: true },
            ape_paterno: { type: "string", editable: true },
            ape_materno: { type: "string", editable: true },
            tip_accionistas: { type: "string", editable: true },
            rfc: { type: "string", editable: true },
            curp: { type: "string", editable: true },
            porc_acciones: { type: "string", editable: true },
            importe_capital: { type: "string", editable: true },
            cod_nacionalidad: { type: "string", editable: true },
            cod_usuario: { type: "string", editable: true },
            fec_alta: { type: "string", editable: true },
            estatus: { type: "string", editable: true },
            cod_usuario_modifica: { type: "string", editable: true },
            fec_modificacion: { type: "string", editable: true },
            cod_direccion: { type: "string", editable: true },
            tip_cliente: { type: "string", editable: true },
            tip_direccion: { type: "string", editable: true },
            calle: { type: "string", editable: true },
            num_ext: { type: "string", editable: true },
            num_int: { type: "string", editable: true },
            cod_estado: { type: "string", editable: true },
            cp: { type: "string", editable: true },
            cod_municipio: { type: "string", editable: true },
            cod_colonia: { type: "string", editable: true },
            tel_local: { type: "string", editable: true },
            tel_celular: { type: "string", editable: true },
            tel_otro: { type: "string", editable: true }
        }
    });



    var modelrepre_legal = new kendo.data.Model.define({
        id: "num_repre_legal",
        fields: {
            cod_empresa: { type: "string", editable: true },
            num_cliente: { type: "string", editable: true },
            num_repre_legal: { type: "string", editable: true },
            nombre: { type: "string", editable: true },
            seg_nombre: { type: "string", editable: true },
            ape_paterno: { type: "string", editable: true },
            ape_materno: { type: "string", editable: true },
            tip_repre_legal: { type: "string", editable: true },
            rfc: { type: "string", editable: true },
            curp: { type: "string", editable: true },
            num_escritura: { type: "string", editable: true },
            folio_mercantil: { type: "string", editable: true },
            cod_tipo_facultades: { type: "string", editable: true },
            cod_ejercimiento: { type: "string", editable: true },
            cod_usuario: { type: "string", editable: true },
            fec_alta: { type: "string", editable: true },
            estatus: { type: "string", editable: true },
            cod_usuario_modifica: { type: "string", editable: true },
            fec_modificacion: { type: "string", editable: true },
            cod_direccion: { type: "string", editable: true },
            tip_cliente: { type: "string", editable: true },
            tip_direccion: { type: "string", editable: true },
            calle: { type: "string", editable: true },
            num_ext: { type: "string", editable: true },
            num_int: { type: "string", editable: true },
            cod_estado: { type: "string", editable: true },
            cp: { type: "string", editable: true },
            cod_municipio: { type: "string", editable: true },
            cod_colonia: { type: "string", editable: true },
            tel_local: { type: "string", editable: true },
            tel_celular: { type: "string", editable: true },
            tel_otro: { type: "string", editable: true }
        }
    });

    var modelaval = new kendo.data.Model.define({
        id: "num_aval",
        fields: {
            cod_empresa: { type: "string", editable: true },
            num_cliente: { type: "string", editable: true },
            num_aval: { type: "string", editable: true },
            nombre: { type: "string", editable: true },
            seg_nombre: { type: "string", editable: true },
            ape_paterno: { type: "string", editable: true },
            ape_materno: { type: "string", editable: true },
            tip_aval: { type: "string", editable: true },
            rfc: { type: "string", editable: true },
            curp: { type: "string", editable: true },
            cod_nacionalidad: { type: "string", editable: true },
            cod_usuario: { type: "string", editable: true },
            fec_alta: { type: "string", editable: true },
            estatus: { type: "string", editable: true },
            cod_usuario_modifica: { type: "string", editable: true },
            fec_modificacion: { type: "string", editable: true },
            cod_direccion: { type: "string", editable: true },
            tip_cliente: { type: "string", editable: true },
            tip_direccion: { type: "string", editable: true },
            calle: { type: "string", editable: true },
            num_ext: { type: "string", editable: true },
            num_int: { type: "string", editable: true },
            cod_estado: { type: "string", editable: true },
            cp: { type: "string", editable: true },
            cod_municipio: { type: "string", editable: true },
            cod_colonia: { type: "string", editable: true },
            tel_local: { type: "string", editable: true },
            tel_celular: { type: "string", editable: true },
            tel_otro: { type: "string", editable: true }
        }
    });

    var modelresp_pago = new kendo.data.Model.define({
        id: "num_resp_pago",
        fields: {
            cod_empresa: { type: "string", editable: true },
            num_cliente: { type: "string", editable: true },
            num_resp_pago: { type: "string", editable: true },
            nombre: { type: "string", editable: true },
            seg_nombre: { type: "string", editable: true },
            ape_paterno: { type: "string", editable: true },
            ape_materno: { type: "string", editable: true },
            tip_resp_pago: { type: "string", editable: true },
            rfc: { type: "string", editable: true },
            curp: { type: "string", editable: true },
            puesto: { type: "string", editable: true },
            correo_electronico: { type: "string", editable: true },
            cod_usuario: { type: "string", editable: true },
            fec_alta: { type: "string", editable: true },
            estatus: { type: "string", editable: true },
            cod_usuario_modifica: { type: "string", editable: true },
            fec_modificacion: { type: "string", editable: true },
            cod_direccion: { type: "string", editable: true },
            tip_cliente: { type: "string", editable: true },
            tip_direccion: { type: "string", editable: true },
            calle: { type: "string", editable: true },
            num_ext: { type: "string", editable: true },
            num_int: { type: "string", editable: true },
            cod_estado: { type: "string", editable: true },
            cp: { type: "string", editable: true },
            cod_municipio: { type: "string", editable: true },
            cod_colonia: { type: "string", editable: true },
            tel_local: { type: "string", editable: true },
            tel_celular: { type: "string", editable: true },
            tel_otro: { type: "string", editable: true }
        }
    });


    /*Declaración y configuración de los grid de kendo para los diferentes segmentos de información */

    $("#gvCuentasBancarias").kendoGrid({
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        url: '../Busqueda/ObtieneCtaBancarias/001/0/' + num_cliente + '/M/1',
                        type: 'GET',
                        success: function (result) {
                            options.success(result);
                        }
                    });
                }
            },
            batch: true,
            schema: { model: modelCuentaBancaria }
        },
        autoBind: true,
        scrollable: true,
        columns: [
          { field: "cod_num_cuenta", title: "Id. Cuenta" },
          { field: "num_cliente", hidden: true },
          { field: "cod_banco", title: "Banco" },
          { field: "num_cuenta", title: "No. Cuenta" },
          { field: "clabe", title: "clabe" },
          { template: "<input type='checkbox'    style='height:10px'  #=(banco_pral)?checked ='checked' : '' #  disabled />", title: "Principal " },
          { field: "edit", command: { text: "Editar", click: EditCuentaBancaria }, hidden: true, title: "Editar" },
          { field: "Remover", command: { text: "Remover", click: RemoveCuentaBancaria }, title: "Remover" }
        ]
    });


    $("#gvAccionistas").kendoGrid({
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        url: '../Busqueda/ObtieneAccionistas/001/' + num_cliente + '/0/1',
                        type: 'GET',
                        success: function (result) {
                            options.success(result);
                        }
                    });
                }
            },
            batch: true,
            schema: { model: modelaccionistas }
        },
        autoBind: true,
        scrollable: true,
        columns: [
              { field: "cod_empresa", hidden: true },
              { field: "num_cliente", hidden: true },
              { field: "num_accionista", title: "Num Accionista" },
              { field: "nombre", title: "Nombre" },
              { field: "seg_nombre", title: "2° Nombre" },
              { field: "ape_paterno", title: "Ape. Paterno" },
              { field: "ape_materno", title: "Ape. Materno" },
              { field: "tip_accionistas", hidden: true },
              { field: "rfc", title: "RFC" },
              { field: "curp", title: "CUR" },
              { field: "porc_acciones", title: "% Acciones" },
              { field: "importe_capital", title: "Capital" },
              { field: "cod_nacionalidad", hidden: true },
              { field: "cod_usuario", hidden: true },
              { field: "fec_alta", hidden: true },
              { field: "estatus", hidden: true },
              { field: "cod_usuario_modifica", hidden: true },
              { field: "fec_modificacion", hidden: true },
              { field: "cod_direccion", hidden: true },
              { field: "tip_cliente", hidden: true },
              { field: "tip_direccion", hidden: true },
              { field: "calle", hidden: true },
              { field: "num_ext", hidden: true },
              { field: "num_int", hidden: true },
              { field: "cod_estado", hidden: true },
              { field: "cp", hidden: true },
              { field: "cod_municipio", hidden: true },
          { field: "edit", command: { text: "Editar", click: EditRegPerson }, hidden: true, title: "Editar" },
          { field: "RemoverAC", command: { text: "Remover", click: RemoveRegPerson }, title: "Remover" }
        ]
    });




    $("#gvRepresentanteLegal").kendoGrid({
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        url: '../Busqueda/ObtieneRepresentanteLegal/001/' + num_cliente + '/0/1',
                        type: 'GET',
                        success: function (result) {
                            options.success(result);
                        }
                    });
                }
            },
            batch: true,
            schema: { model: modelrepre_legal }
        },
        autoBind: true,
        scrollable: true,
        columns: [
           { field: "cod_empresa", hidden: true },
           { field: "num_cliente", hidden: true },
           { field: "num_repre_legal", title: "Num Representante" },
           { field: "nombre", title: "Nombre" },
           { field: "seg_nombre", title: "2° Nombre" },
           { field: "ape_paterno", title: "Ape. Paterno" },
           { field: "ape_materno", title: "Ape. Materno" },
           { field: "tip_repre_legal", hidden: true },
           { field: "rfc", title: "RFC" },
           { field: "curp", title: "CUR" },
           { field: "num_escritura", title: "No. Escritura" },
           { field: "folio_mercantil", title: "No. Mercantil" },
           { field: "cod_tipo_facultades", hidden: true },
           { field: "cod_ejercimiento", hidden: true },
           { field: "cod_usuario", hidden: true },
           { field: "fec_alta", hidden: true },
           { field: "estatus", hidden: true },
           { field: "cod_usuario_modifica", hidden: true },
           { field: "fec_modificacion", hidden: true },
           { field: "cod_direccion", hidden: true },
           { field: "tip_cliente", hidden: true },
           { field: "tip_direccion", hidden: true },
           { field: "calle", hidden: true },
           { field: "num_ext", hidden: true },
           { field: "num_int", hidden: true },
           { field: "cod_estado", hidden: true },
           { field: "cp", hidden: true },
           { field: "cod_municipio", hidden: true },
           { field: "cod_colonia", hidden: true },
           { field: "tel_local", hidden: true },
           { field: "tel_celular", hidden: true },
           { field: "tel_otro", hidden: true },
          { field: "edit", command: { text: "Editar", click: EditRegPerson }, hidden: true, title: "Editar" },
          { field: "RemoverRL", command: { text: "Remover", click: RemoveRegPerson }, title: "Remover" }
        ]
    });


    $("#gvsAval").kendoGrid({
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        url: '../Busqueda/ObtieneAvales/001/' + num_cliente + '/0/1',
                        type: 'GET',
                        success: function (result) {
                            options.success(result);
                        }
                    });
                }
            },
            batch: true,
            schema: { model: modelaval }
        },
        autoBind: true,
        scrollable: true,
        columns: [
           { field: "cod_empresa", hidden: true },
           { field: "num_cliente", hidden: true },
           { field: "num_aval", title: "Num Aval" },
           { field: "nombre", title: "Nombre" },
           { field: "seg_nombre", title: "2° Nombre" },
           { field: "ape_paterno", title: "Ape. Paterno" },
           { field: "ape_materno", title: "Ape. Materno" },
           { field: "tip_aval", hidden: true },
           { field: "rfc", title: "RFC" },
           { field: "curp", title: "CUR" },
           { field: "cod_nacionalidad", hidden: true },
           { field: "cod_usuario", hidden: true },
           { field: "fec_alta", hidden: true },
           { field: "estatus", hidden: true },
           { field: "cod_usuario_modifica", hidden: true },
           { field: "fec_modificacion", hidden: true },
           { field: "cod_direccion", hidden: true },
           { field: "tip_cliente", hidden: true },
           { field: "tip_direccion", hidden: true },
           { field: "calle", hidden: true },
           { field: "num_ext", hidden: true },
           { field: "num_int", hidden: true },
           { field: "cod_estado", hidden: true },
           { field: "cp", hidden: true },
           { field: "cod_municipio", hidden: true },
           { field: "cod_colonia", hidden: true },
           { field: "tel_local", hidden: true },
           { field: "tel_celular", hidden: true },
           { field: "tel_otro", hidden: true },
          { field: "edit", command: { text: "Editar", click: EditRegPerson }, hidden: true, title: "Editar" },
          { field: "RemoverAV", command: { text: "Remover", click: RemoveRegPerson }, title: "Remover" }
        ]
    });


    $("#gvsResponsablePago").kendoGrid({
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        url: '../Busqueda/ObtieneResponsablePago/001/' + num_cliente + '/0/1',
                        type: 'GET',
                        success: function (result) {
                            options.success(result);
                        }
                    });
                }
            },
            batch: true,
            schema: { model: modelresp_pago }
        },
        autoBind: true,
        scrollable: true,
        columns: [
          { field: "cod_empresa", hidden: true },
          { field: "num_cliente", hidden: true },
          { field: "num_resp_pago", title: "Num Responsable" },
          { field: "nombre", title: "Nombre" },
          { field: "seg_nombre", title: "2° Nombre" },
          { field: "ape_paterno", title: "Ape. Paterno" },
          { field: "ape_materno", title: "Ape. Materno" },
          { field: "tip_resp_pago", hidden: true },
          { field: "rfc", title: "RFC" },
          { field: "curp", title: "CUR" },
          { field: "puesto", hidden: true },
          { field: "correo_electronico", hidden: true },
          { field: "cod_usuario", hidden: true },
          { field: "fec_alta", hidden: true },
          { field: "estatus", hidden: true },
          { field: "cod_usuario_modifica", hidden: true },
          { field: "fec_modificacion", hidden: true },
          { field: "cod_direccion", hidden: true },
          { field: "tip_cliente", hidden: true },
          { field: "tip_direccion", hidden: true },
          { field: "calle", hidden: true },
          { field: "num_ext", hidden: true },
          { field: "num_int", hidden: true },
          { field: "cod_estado", hidden: true },
          { field: "cp", hidden: true },
          { field: "cod_municipio", hidden: true },
          { field: "cod_colonia", hidden: true },
          { field: "tel_local", hidden: true },
          { field: "tel_celular", hidden: true },
          { field: "tel_otro", hidden: true },
          { field: "edit", command: { text: "Editar", click: EditRegPerson }, hidden: true, title: "Editar" },
          { field: "RemoverRP", command: { text: "Remover", click: RemoveRegPerson }, title: "Remover" }
        ]
    });



    if ($("#num_cliente").val() != '') {
        var gridCB = $("#gvCuentasBancarias").data("kendoGrid");
        gridCB.showColumn("edit");

        var gridAC = $("#gvAccionistas").data("kendoGrid");
        gridAC.showColumn("edit");

        var gridRL = $("#gvRepresentanteLegal").data("kendoGrid");
        gridRL.showColumn("edit");

        var gridAV = $("#gvsAval").data("kendoGrid");
        gridAV.showColumn("edit");

        var gridRP = $("#gvsResponsablePago").data("kendoGrid");
        gridRP.showColumn("edit");

    }

    /*<<<<<<<<<<<Termina Sección de grid para las cuentas bancarias, accionista, avales, representante legal, responsable de pago>>>>>>>>>>>>>>>>*/


    /*Guardar o actualiza el cliente moral  */
    $("#btnGuardar").click(function () {
        var v_cod_actividad = $("#cod_actividad").val();
        /*Se recupera la parte que corresponde a  sub actividad en la cadena compuesta */
        var cod_subactiv_econo = v_cod_actividad.substring(v_cod_actividad.indexOf(':') + 1)

        if ($("#num_cliente").val() == '') {
            var datosCuentaBancaria = $("#gvCuentasBancarias").data().kendoGrid.dataSource.view()
            var json_cuentas = JSON.stringify(datosCuentaBancaria);

            var datosAccionistas = $("#gvAccionistas").data().kendoGrid.dataSource.view()
            var json_Accionistas = JSON.stringify(datosAccionistas);

            var datosRepresentanteLegal = $("#gvRepresentanteLegal").data().kendoGrid.dataSource.view()
            var json_RepresentanteLegal = JSON.stringify(datosRepresentanteLegal);

            var datosAval = $("#gvsAval").data().kendoGrid.dataSource.view()
            var json_Aval = JSON.stringify(datosAval);

            var datosResponsablePago = $("#gvsResponsablePago").data().kendoGrid.dataSource.view()
            var json_ResponsablePago = JSON.stringify(datosResponsablePago);

            /*Sección dedicada para el almacenamiento de la información    */
            $.ajax({
                url: '../Captura/InsertarPersonaMoral/',
                type: 'POST',
                data: {
                    cod_empresa: '001',
                    cod_agencia: $("#cod_agencia").val(),
                    nombre: $("#nombre").val(),
                    num_acta: $("#num_acta").val(),
                    fec_constitucion: $("#fec_constitucion").val(),
                    rfc: $("#rfc").val(),
                    cod_actividad: cod_subactiv_econo,
                    cod_sector: $("#cod_sector").val(),
                    correo_electronico: $("#correo_electronico").val(),
                    con_sindicato: $("#con_sindicato")[0].checked,
                    gpo_empresarial: $("#gpo_empresarial").val(),
                    cod_direccion: $("#cod_direccion").val(),
                    tip_direccion: $("#tip_direccion").val(),
                    calle: $("#calle").val(),
                    num_ext: $("#num_ext").val(),
                    num_int: $("#num_int").val(),
                    cod_estado: $("#cod_estado").val(),
                    cp: $("#cp").val(),
                    cod_municipio: $("#cod_municipio").val(),
                    cod_colonia: $("#cod_colonia").val(),
                    tel_local: $("#tel_local").val(),
                    tel_celular: $("#tel_celular").val(),
                    tel_otro: $("#tel_otro").val(),
                    cod_direccion_f: $("#cod_direccion_f").val(),
                    tip_direccion_f: $("#tip_direccion_f").val(),
                    calle_f: $("#calle_f").val(),
                    num_ext_f: $("#num_ext_f").val(),
                    num_int_f: $("#num_int_f").val(),
                    cod_estado_f: $("#cod_estado_f").val(),
                    cp_f: $("#cp_f").val(),
                    cod_municipio_f: $("#cod_municipio_f").val(),
                    cod_colonia_f: $("#cod_colonia_f").val(),
                    tel_local_f: $("#tel_local_f").val(),
                    tel_celular_f: $("#tel_celular_f").val(),
                    tel_otro_f: $("#tel_otro_f").val(),
                    json_cuentas: json_cuentas,
                    json_Accionistas: json_Accionistas,
                    json_RepresentanteLegal: json_RepresentanteLegal,
                    json_Aval: json_Aval,
                    json_ResponsablePago: json_ResponsablePago
                },
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

                                $("#num_cliente").val(data[i]["des_realizado"].substring(data[i]["des_realizado"].lastIndexOf('[') + 1, data[i]["des_realizado"].lastIndexOf(']')));
                                num_cliente = $("#num_cliente").val();

                                var gridCB = $("#gvCuentasBancarias").data("kendoGrid");
                                gridCB.showColumn("edit");
                                gridCB.dataSource.read();

                                var gridAC = $("#gvAccionistas").data("kendoGrid");
                                gridAC.showColumn("edit");
                                gridAC.dataSource.read();

                                var gridRL = $("#gvRepresentanteLegal").data("kendoGrid");
                                gridRL.showColumn("edit");
                                gridRL.dataSource.read();

                                var gridAV = $("#gvsAval").data("kendoGrid");
                                gridAV.showColumn("edit");
                                gridAV.dataSource.read();

                                var gridRP = $("#gvsResponsablePago").data("kendoGrid");
                                gridRP.showColumn("edit");
                                gridRP.dataSource.read();
                            }
                        }
                    }
                    else {
                        MostrarAlerta("¡Error! ", " Error: Script, No recupero información del proceso", "alert-danger");
                    }
                }
            });
        }
        else {
            /*Sección dedicada para la Actualizar la información del cliente     */
            $.ajax({
                url: '../Captura/ActualizaPersonaMoral/',
                type: 'POST',
                data: {
                    cod_empresa: '001',
                    cod_agencia: $("#cod_agencia").val(),
                    num_cliente: $("#num_cliente").val(),
                    nombre: $("#nombre").val(),
                    num_acta: $("#num_acta").val(),
                    fec_constitucion: $("#fec_constitucion").val(),
                    rfc: $("#rfc").val(),
                    cod_actividad: cod_subactiv_econo,
                    cod_sector: $("#cod_sector").val(),
                    correo_electronico: $("#correo_electronico").val(),
                    con_sindicato: $("#con_sindicato")[0].checked,
                    gpo_empresarial: $("#gpo_empresarial").val(),
                    cod_direccion: $("#cod_direccion").val(),
                    tip_direccion: $("#tip_direccion").val(),
                    calle: $("#calle").val(),
                    num_ext: $("#num_ext").val(),
                    num_int: $("#num_int").val(),
                    cod_estado: $("#cod_estado").val(),
                    cp: $("#cp").val(),
                    cod_municipio: $("#cod_municipio").val(),
                    cod_colonia: $("#cod_colonia").val(),
                    tel_local: $("#tel_local").val(),
                    tel_celular: $("#tel_celular").val(),
                    tel_otro: $("#tel_otro").val(),
                    cod_direccion_f: $("#cod_direccion_f").val(),
                    tip_direccion_f: $("#tip_direccion_f").val(),
                    calle_f: $("#calle_f").val(),
                    num_ext_f: $("#num_ext_f").val(),
                    num_int_f: $("#num_int_f").val(),
                    cod_estado_f: $("#cod_estado_f").val(),
                    cp_f: $("#cp_f").val(),
                    cod_municipio_f: $("#cod_municipio_f").val(),
                    cod_colonia_f: $("#cod_colonia_f").val(),
                    tel_local_f: $("#tel_local_f").val(),
                    tel_celular_f: $("#tel_celular_f").val(),
                    tel_otro_f: $("#tel_otro_f").val(),
                },
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
                                num_cliente = $("#num_cliente").val();
                                var gridCB = $("#gvCuentasBancarias").data("kendoGrid");
                                gridCB.showColumn("edit");
                                gridCB.dataSource.read();

                                var gridAC = $("#gvAccionistas").data("kendoGrid");
                                gridAC.showColumn("edit");
                                gridAC.dataSource.read();

                                var gridRL = $("#gvRepresentanteLegal").data("kendoGrid");
                                gridRL.showColumn("edit");
                                gridRL.dataSource.read();

                                var gridAV = $("#gvsAval").data("kendoGrid");
                                gridAV.showColumn("edit");
                                gridAV.dataSource.read();

                                var gridRP = $("#gvsResponsablePago").data("kendoGrid");
                                gridRP.showColumn("edit");
                                gridRP.dataSource.read();

                            }
                        }
                    }
                    else {
                        MostrarAlerta("¡Error! ", " Error: Script, No recupero información del proceso", "alert-danger");
                    }
                }
            });
        }
    });
    ///<<<<<<<<Fin del evento click para guardar >>>>>>>>>>>>>>
});


/*Asigna la clase de activo  a la sección que se esté editando Solo funciona con los link de siguiente y atrás  que se muestran en la parte inferior derecha */
function fnActivarSeccion(seccion) {
    document.getElementById("liDatosPersonales").className = "";
    document.getElementById("liDireccionFiscal").className = "";
    document.getElementById("liDatosBancarios").className = "";
    document.getElementById("liDatosAccionista").className = "";
    document.getElementById("liDatosRepresentanteLegal").className = "";
    document.getElementById("liDatosAval").className = "";
    document.getElementById("liDatosResponsablePago").className = "";

    switch (seccion) {
        case 'liDatosPersonales':
            document.getElementById("liDatosPersonales").className = "active";

            break;
        case 'liDireccionFiscal':
            document.getElementById("liDireccionFiscal").className = "active";
            break;
        case 'liDatosBancarios':
            document.getElementById("liDatosBancarios").className = "active";
            break;
        case 'liDatosAccionista':
            document.getElementById("liDatosAccionista").className = "active";
            break;
        case 'liDatosRepresentanteLegal':
            document.getElementById("liDatosRepresentanteLegal").className = "active";
            break;
        case 'liDatosAval':
            document.getElementById("liDatosAval").className = "active";
            break;
        case 'liDatosResponsablePago':
            document.getElementById("liDatosResponsablePago").className = "active";
            break;
    }
}

/*<<<<<<<<<<<<<<<<<<Inicia funciones cuentas bancarias >>>>>>>>>>>>>>>>>>>>>>*/
function ShowModalCuentaBancaria() {
    $("#txtcod_num_cuenta").val("");
    document.getElementById("dllcod_banco").selectedIndex = "-1";
    $("#chkbanco_pral").attr('checked', false);
    $("#txtnum_cuenta").val("");
    $("#txtclabe").val("");
    $("#divModalCuentasBancarias").modal("show");
}

function EditCuentaBancaria(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    $("#txtcod_num_cuenta").val(dataItem.cod_num_cuenta);
    $("#dllcod_banco").val(dataItem.cod_banco);
    $("#chkbanco_pral")[0].checked = dataItem.banco_pral;
    $("#txtnum_cuenta").val(dataItem.num_cuenta);
    $("#txtclabe").val(dataItem.clabe);
    $("#divModalCuentasBancarias").modal("show");
}

function RemoveCuentaBancaria(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    if ($("#num_cliente").val() != '') {
        p_cod_num_cuenta = dataItem.cod_num_cuenta;
        p_num_cliente = $("#num_cliente").val();
        p_num_cuenta = dataItem.num_cuenta;
        $.ajax({
            url: '../Captura/DelCuentaBancaria/',
            type: 'POST',
            data: {
                cod_num_cuenta: p_cod_num_cuenta,
                num_cliente: p_num_cliente,
                num_cuenta: p_num_cuenta
            },
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
                            var grid = $("#gvCuentasBancarias").data("kendoGrid");
                            grid.dataSource.read();
                        }
                    }
                }
                else {
                    MostrarAlerta("¡Error! ", " Error: Script, No recupero información del proceso", "alert-danger");
                }
            }
        });
    }
    else {
        var grid = $("#gvCuentasBancarias").data("kendoGrid");
        grid.dataSource.remove(dataItem);
    }
}

function SaveCuentaBancaria() {
    if (!$("#txtnum_cuenta").val() || !$("#txtclabe").val() || $("#dllcod_banco").is(":empty")) {
        alert("Número de cuenta,  clave    y banco son campos obligatorios");
    }
    else {
        /*Sección que se ejecuta en caso de que los campos este requisito*/
        var v_cod_banco = $("#dllcod_banco").val();
        var v_banco_pral = $("#chkbanco_pral")[0].checked;
        var v_num_cuenta = $("#txtnum_cuenta").val();
        var v_clabe = $("#txtclabe").val();
        var v_cod_num_cuenta = $("#txtcod_num_cuenta").val();

        if ($("#num_cliente").val() != '') {
            var v_num_cliente = $("#num_cliente").val();
            var url_evento = url_evento = '../Captura/GuardaCuentaBancaria/'

            var datos;

            if (v_cod_num_cuenta != '') {
                /*Actualización de la cuenta */
                datos = {
                    cod_empresa: '001',
                    cod_num_cuenta: v_cod_num_cuenta,
                    num_cliente: v_num_cliente,
                    num_cuenta: v_num_cuenta,
                    clabe: v_clabe,
                    cod_banco: v_cod_banco,
                    banco_pral: v_banco_pral,
                    tip_cliente: 'M'
                };

            } else {
                /*Alta de la cuenta */

                datos = {
                    cod_empresa: '001',
                    num_cliente: v_num_cliente,
                    num_cuenta: v_num_cuenta,
                    clabe: v_clabe,
                    cod_banco: v_cod_banco,
                    banco_pral: v_banco_pral,
                    tip_cliente: 'M'

                };
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
                                var grid = $("#gvCuentasBancarias").data("kendoGrid");
                                grid.dataSource.read();
                            }
                        }
                    }
                    else {
                        MostrarAlerta("¡Error! ", " Error: Script, No recupero información del proceso", "alert-danger");
                    }
                }
            });

            $("#divModalCuentasBancarias").modal("hide");
        }
        else {
            /*Se agrega solo al grid para el almacenamiento masivo */
            document.getElementById("dllcod_banco").selectedIndex = "-1";
            $("#chkbanco_pral").attr('checked', false);
            $("#txtnum_cuenta").val("");
            $("#txtclabe").val("");
            var grid = $("#gvCuentasBancarias").data("kendoGrid");
            grid.dataSource.add({ cod_num_cuenta: '', num_cliente: '', num_cuenta: v_num_cuenta, clabe: v_clabe, cod_banco: v_cod_banco, banco_pral: v_banco_pral });
            $("#divModalCuentasBancarias").modal("hide");
        }



    }
}
/*<<<<<<<<<<<<<<<<<<Termina funciones cuentas bancarias >>>>>>>>>>>>>>>>>>>>>>*/


/*<<<<<<<<<<<<<<<<<<Inicia Registro de personas ligadas con el cliente moral  >>>>>>>>>>>>>>>>>>>>>>*/
function ShowModalRegPerson(e) {
    document.getElementById('txtnum_accionista_regperson').style.visibility = 'hidden';
    document.getElementById('txtnum_repre_legal_regperson').style.visibility = 'hidden';
    document.getElementById('txtnum_aval_regperson').style.visibility = 'hidden';
    document.getElementById('txtnum_resp_pago_regperson').style.visibility = 'hidden';
    $('#divregperson_acc').hide();
    $('#divregperson_rpl').hide();
    $('#divregperson_rp').hide();
    $('#divnacionalidad_acc_ava').hide();

    switch (e.target.attributes[1].value) {
        case 'btnShowModalAccionista':
            $('#lbltituloRegPerson').text('Accionista');
            document.getElementById('txtnum_accionista_regperson').style.visibility = 'visible';
            $('#divregperson_acc').show();
            $('#divnacionalidad_acc_ava').show();
            break;
        case 'btnShowModalRepresentanteLegal':
            $('#lbltituloRegPerson').text('Represéntate Legal');
            document.getElementById('txtnum_repre_legal_regperson').style.visibility = 'visible';
            $('#divregperson_rpl').show();
            break;
        case 'btnShowModalsAval':
            $('#lbltituloRegPerson').text('Aval');
            document.getElementById('txtnum_aval_regperson').style.visibility = 'visible';
            $('#divnacionalidad_acc_ava').show();
            break;
        case 'btnShowModalsResponsablePago':
            $('#lbltituloRegPerson').text('Responsable de Pago');
            document.getElementById('txtnum_resp_pago_regperson').style.visibility = 'visible';
            $('#divregperson_rp').show();
            break;
    }
    /*Limpia campos para la captura de un nuevo registro */
    $("#txtnum_accionista_regperson").val("");
    $("#txtnum_repre_legal_regperson").val("");
    $("#txtnum_aval_regperson").val("");
    $("#txtnum_resp_pago_regperson").val("");
    document.getElementById("ddltip_persona").selectedIndex = "-1";
    $("#txtnombre_regperson").val("");
    $("#txtseg_nombre_regperson").val("");
    $("#txtape_paterno_regperson").val("");
    $("#txtape_materno_regperson").val("");
    $("#txtrfc_regperson").val("");
    $("#txtcurp_regperson").val("");
    document.getElementById("ddlcod_nacionalidad_acc_ava").selectedIndex = "-1";
    $("#txtporc_acciones_acc").val("");
    $("#txtimporte_capital_acc").val("");
    $("#txtnum_escritura_rpl").val("");
    $("#txtfolio_mercantil_rpl").val("");
    $("#txtcod_tipo_facultades_rpl").val("");
    $("#txtcod_ejercimiento_rpl").val("");
    $("#txtpuesto_rp").val("");
    $("#txtcorreo_electronico_rp").val("");
    $("#txtcod_direccion").val("");
    document.getElementById("ddltip_direccion_regperson").selectedIndex = "-1";
    $("#txtcalle_regperson").val("");
    $("#txtnum_ext_regperson").val("");
    $("#txtnum_int_regperson").val("");
    $("#txtcp_regperson").val("");
    var _vacio = "<option></option>";
    $("#ddlcod_colonia_regperson").html(_vacio);
    $("#ddlcod_estado_regperson").html(_vacio);
    $("#ddlcod_municipio_regperson").html(_vacio);
    document.getElementById("ddlcod_colonia_regperson").selectedIndex = "-1";
    document.getElementById("ddlcod_estado_regperson").selectedIndex = "-1";
    document.getElementById("ddlcod_municipio_regperson").selectedIndex = "-1";
    $("#txttel_local_regperson").val("");
    $("#txttel_celular_regperson").val("");
    $("#txttel_otro_regperson").val("");

    $("#divModalRegPerson").modal("show");
}

function EditRegPerson(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

    document.getElementById('txtnum_accionista_regperson').style.visibility = 'hidden';
    document.getElementById('txtnum_repre_legal_regperson').style.visibility = 'hidden';
    document.getElementById('txtnum_aval_regperson').style.visibility = 'hidden';
    document.getElementById('txtnum_resp_pago_regperson').style.visibility = 'hidden';
    $('#divregperson_acc').hide();
    $('#divregperson_rpl').hide();
    $('#divregperson_rp').hide();
    $('#divnacionalidad_acc_ava').hide();

    switch (dataItem.idField) {
        case 'num_accionista':
            $('#lbltituloRegPerson').text('Accionista');
            document.getElementById('txtnum_accionista_regperson').style.visibility = 'visible';
            $('#divregperson_acc').show();
            $('#divnacionalidad_acc_ava').show();
            break;
        case 'num_repre_legal':
            $('#lbltituloRegPerson').text('Represéntate Legal');
            document.getElementById('txtnum_repre_legal_regperson').style.visibility = 'visible';
            $('#divregperson_rpl').show();
            break;
        case 'num_aval':
            $('#lbltituloRegPerson').text('Aval');
            document.getElementById('txtnum_aval_regperson').style.visibility = 'visible';
            $('#divnacionalidad_acc_ava').show();
            break;
        case 'num_resp_pago':
            $('#lbltituloRegPerson').text('Responsable de Pago');
            document.getElementById('txtnum_resp_pago_regperson').style.visibility = 'visible';
            $('#divregperson_rp').show();
            break;
    }

    $("#txtnombre_regperson").val(dataItem.nombre);
    $("#txtseg_nombre_regperson").val(dataItem.seg_nombre);
    $("#txtape_paterno_regperson").val(dataItem.ape_paterno);
    $("#txtape_materno_regperson").val(dataItem.ape_materno);
    $("#txtrfc_regperson").val(dataItem.rfc);
    $("#txtcurp_regperson").val(dataItem.curp);
    $("#txtcod_direccion").val(dataItem.cod_direccion);
    $("#ddltip_direccion_regperson").val(dataItem.tip_direccion);
    $("#txtcalle_regperson").val(dataItem.calle);
    $("#txtnum_ext_regperson").val(dataItem.num_ext);
    $("#txtnum_int_regperson").val(dataItem.num_int);
    $("#txtcp_regperson").val(dataItem.cp);

    $.getJSON('../Captura/ObtieneDomicilioSepomex/' + dataItem.cp + '/' + dataItem.cod_municipio, function (data) {
        var item1; var item2; var item3;
        $.each(data, function (i, item) {
            item1 = item1 + " <option value = '" + item.cod_estado + "'>" + item.nom_estado + "</option> ";
            item2 = item2 + " <option value = '" + item.cod_municipio + "'>" + item.des_municipio + "</option> ";
            item3 = item3 + " <option value = '" + item.cod_colonia + "'>" + item.des_colonia + "</option> ";
        });
        $("#ddlcod_estado_regperson").html(item1);
        $("#ddlcod_municipio_regperson").html(item2);
        $("#ddlcod_colonia_regperson").html(item3);
    });

    $("#ddlcod_estado_regperson").val(dataItem.cod_estado);
    $("#ddlcod_municipio_regperson").val(dataItem.cod_municipio);
    $("#ddlcod_colonia_regperson").val(dataItem.cod_colonia);
    $("#txttel_local_regperson").val(dataItem.tel_local);
    $("#txttel_celular_regperson").val(dataItem.tel_celular);
    $("#txttel_otro_regperson").val(dataItem.tel_otro);

    switch ($('#lbltituloRegPerson').text()) {
        case 'Accionista':
            $("#txtnum_accionista_regperson").val(dataItem.num_accionista);
            $("#ddltip_persona").val(dataItem.tip_accionistas);
            $("#txtporc_acciones_acc").val(dataItem.porc_acciones);
            $("#txtimporte_capital_acc").val(dataItem.importe_capital);
            $("#ddlcod_nacionalidad_acc_ava").val(dataItem.cod_nacionalidad);
            break;
        case 'Represéntate Legal':
            $("#txtnum_repre_legal_regperson").val(dataItem.num_repre_legal);
            $("#ddltip_persona").val(dataItem.tip_repre_legal);
            $("#txtnum_escritura_rpl").val(dataItem.num_escritura);
            $("#txtfolio_mercantil_rpl").val(dataItem.folio_mercantil);
            $("#txtcod_tipo_facultades_rpl").val(dataItem.cod_tipo_facultades);
            $("#txtcod_ejercimiento_rpl").val(dataItem.cod_ejercimiento);
            break;
        case 'Aval':
            $("#txtnum_aval_regperson").val(dataItem.num_aval);
            $("#ddltip_persona").val(dataItem.tip_aval);
            $("#ddlcod_nacionalidad_acc_ava").val(dataItem.cod_nacionalidad);
            break;
        case 'Responsable de Pago':
            $("#txtnum_resp_pago_regperson").val(dataItem.num_resp_pago);
            $("#ddltip_persona").val(dataItem.tip_resp_pago);
            $("#txtpuesto_rp").val(dataItem.puesto);
            $("#txtcorreo_electronico_rp").val(dataItem.correo_electronico);
            break;
    }

    $("#divModalRegPerson").modal("show");
}

function RemoveRegPerson(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    if ($("#num_cliente").val() != '') {
        switch (dataItem.idField) {
            case 'num_accionista':
                delRequeridosAcc(dataItem.cod_empresa,dataItem.num_cliente,dataItem.num_accionista,dataItem.tip_cliente);
                break;
            case 'num_repre_legal':
                delRequeridosRL(dataItem.cod_empresa,dataItem.num_cliente,dataItem.num_repre_legal,dataItem.tip_cliente);
                break;
            case 'num_aval':
                delRequeridosAV(dataItem.cod_empresa, dataItem.num_cliente, dataItem.num_aval, dataItem.tip_cliente);
                break;
            case 'num_resp_pago':
                delRequeridosRP(dataItem.cod_empresa, dataItem.num_cliente, dataItem.num_resp_pago, dataItem.tip_cliente);
                break;
        }
    }
    else {

        switch (dataItem.idField) {
            case 'num_accionista':
                var grid = $("#gvAccionistas").data("kendoGrid");
                grid.dataSource.remove(dataItem);
                break;
            case 'num_repre_legal':
                var grid = $("#gvRepresentanteLegal").data("kendoGrid");
                grid.dataSource.remove(dataItem);
                break;
            case 'num_aval':
                var grid = $("#gvsAval").data("kendoGrid");
                grid.dataSource.remove(dataItem);
                break;
            case 'num_resp_pago':
                var grid = $("#gvsResponsablePago").data("kendoGrid");
                grid.dataSource.remove(dataItem);
                break;
        }
    }
}

function SaveRegPerson() {
    if (CamposRequeridos()) {
        /*Actualiza registro directo a base de datos */
        if ($("#num_cliente").val() != '') {
            switch ($('#lbltituloRegPerson').text()) {
                case 'Accionista':
                    updRequeridosAcc();
                    break;
                case 'Represéntate Legal':
                    updRequeridosRL();
                    break;
                case 'Aval':
                    updRequeridosAV();
                    break;
                case 'Responsable de Pago':
                    updRequeridosRP();
                    break;
            }
            $("#divModalRegPerson").modal("hide");
        }
        else {
            /*Agrega registro al grid para la inserción masiva */
            switch ($('#lbltituloRegPerson').text()) {
                case 'Accionista':
                    addRequeridosAcc();
                    break;
                case 'Represéntate Legal':
                    addRequeridosRL();
                    break;
                case 'Aval':
                    addRequeridosAV();
                    break;
                case 'Responsable de Pago':
                    addRequeridosRP();
                    break;
            }
            $("#divModalRegPerson").modal("hide");
        }
    }
}
/*<<<<<<<<<<<<<<<<<<Termina Registro de personas ligadas con el cliente moral  >>>>>>>>>>>>>>>>>>>>>>*/

function CamposRequeridos() {
    var continuar = true;
    if (!$("#ddltip_persona").val() || $("#ddltip_persona").val() == "0") {
        continuar = false;
        MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Tipo Persona ", "alert-warning");
    }

    if (!$("#txtnombre_regperson").val()) {
        continuar = false;
        MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Nombre ", "alert-warning");
    }
    if (!$("#txtape_paterno_regperson").val()) {
        continuar = false;
        MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Apellido Paterno ", "alert-warning");
    }
    if (!$("#txtrfc_regperson").val()) {
        continuar = false;
        MostrarAlertaModal("¡Advertencia! ", " Campo requerido: RFC ", "alert-warning");
    }

    switch ($('#lbltituloRegPerson').text()) {
        case 'Accionista':
            if (!$("#txtporc_acciones_acc").val()) {
                continuar = false;
                MostrarAlertaModal("¡Advertencia! ", " Campo requerido: % Acciones ", "alert-warning");
            }
            if (!$("#ddlcod_nacionalidad_acc_ava").val() || $("#ddlcod_nacionalidad_acc_ava").val() == "0") {
                continuar = false;
                MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Nacionalidad", "alert-warning");
            }
            break;

        case 'Aval':
            if (!$("#ddlcod_nacionalidad_acc_ava").val() || $("#ddlcod_nacionalidad_acc_ava").val() == "0") {
                continuar = false;
                MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Nacionalidad", "alert-warning");
            }
            break;
        case 'Responsable de Pago':
            if (!$("#txtpuesto_rp").val()) {
                continuar = false;
                MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Puesto ", "alert-warning");
            }
            if (!$("#txtcorreo_electronico_rp").val()) {
                continuar = false;
                MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Correo ", "alert-warning");
            }
            break;
    }


    /*Validación de  la requisición   dirección */
    if (!$("#ddltip_direccion_regperson").val()) {
        continuar = false;
        MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Tipo Dirección ", "alert-warning");
    }
    if (!$("#txtcalle_regperson").val()) {
        continuar = false;
        MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Calle ", "alert-warning");
    }
    if (!$("#txtnum_ext_regperson").val()) {
        continuar = false;
        MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Núm. Exterior ", "alert-warning");
    }
    //if (!$("#txtnum_int_regperson").val()) {
    //    continuar = false;
    //    MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Núm. Interior ", "alert-warning");
    //}
    if (!$("#txtcp_regperson").val()) {
        continuar = false;
        MostrarAlertaModal("¡Advertencia! ", " Campo requerido: CP ", "alert-warning");
    }
    if (!$("#ddlcod_colonia_regperson").val() || $("#ddlcod_colonia_regperson").val() == "0") {
        continuar = false;
        MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Colonia ", "alert-warning");
    }
    if (!$("#ddltip_direccion_regperson").val() || $("#ddltip_direccion_regperson").val() == "0") {
        continuar = false;
        MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Estado ", "alert-warning");
    }
    if (!$("#ddlcod_municipio_regperson").val() || $("#ddlcod_municipio_regperson").val() == "0") {
        continuar = false;
        MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Municipio ", "alert-warning");
    }
    if (!$("#txttel_local_regperson").val()) {
        continuar = false;
        MostrarAlertaModal("¡Advertencia! ", " Campo requerido: Teléfono ", "alert-warning");
    }

    return continuar;
}

function addRequeridosAcc() {

    var v_cod_empresa = '001';
    var v_num_cliente = '';
    var v_num_accionista = '';
    var v_nombre = $("#txtnombre_regperson").val();
    var v_seg_nombre = $("#txtseg_nombre_regperson").val();
    var v_ape_paterno = $("#txtape_paterno_regperson").val();
    var v_ape_materno = $("#txtape_materno_regperson").val();
    var v_tip_accionistas = $("#ddltip_persona").val();
    var v_rfc = $("#txtrfc_regperson").val();
    var v_curp = $("#txtcurp_regperson").val();
    var v_porc_acciones = $("#txtporc_acciones_acc").val();
    var v_importe_capital = $("#txtimporte_capital_acc").val();
    var v_cod_nacionalidad = $("#ddlcod_nacionalidad_acc_ava").val();
    var v_cod_usuario = '';
    var v_fec_alta = '';
    var v_estatus = '1';
    var v_cod_usuario_modifica = '';
    var v_fec_modificacion = '';
    var v_cod_direccion = '';
    var v_tip_cliente = 'M3';
    var v_tip_direccion = $("#ddltip_direccion_regperson").val();
    var v_calle = $("#txtcalle_regperson").val();
    var v_num_ext = $("#txtnum_ext_regperson").val();
    var v_num_int = $("#txtnum_int_regperson").val();
    var v_cod_estado = $("#ddlcod_estado_regperson").val();
    var v_cp = $("#txtcp_regperson").val();
    var v_cod_municipio = $("#ddlcod_municipio_regperson").val();
    var v_cod_colonia = $("#ddlcod_estado_regperson").val();
    var v_tel_local = $("#txttel_local_regperson").val();
    var v_tel_celular = $("#txttel_celular_regperson").val();
    var v_tel_otro = $("#txttel_otro_regperson").val();

    var grid = $("#gvAccionistas").data("kendoGrid");
    grid.dataSource.add({
        cod_empresa: v_cod_empresa,
        num_cliente: v_num_cliente,
        num_accionista: v_num_accionista,
        nombre: v_nombre,
        seg_nombre: v_seg_nombre,
        ape_paterno: v_ape_paterno,
        ape_materno: v_ape_materno,
        tip_accionistas: v_tip_accionistas,
        rfc: v_rfc,
        curp: v_curp,
        porc_acciones: v_porc_acciones,
        importe_capital: v_importe_capital,
        cod_nacionalidad: v_cod_nacionalidad,
        cod_usuario: v_cod_usuario,
        fec_alta: v_fec_alta,
        estatus: v_estatus,
        cod_usuario_modifica: v_cod_usuario_modifica,
        fec_modificacion: v_fec_modificacion,
        cod_direccion: v_cod_direccion,
        tip_cliente: v_tip_cliente,
        tip_direccion: v_tip_direccion,
        calle: v_calle,
        num_ext: v_num_ext,
        num_int: v_num_int,
        cod_estado: v_cod_estado,
        cp: v_cp,
        cod_municipio: v_cod_municipio,
        cod_colonia: v_cod_colonia,
        tel_local: v_tel_local,
        tel_celular: v_tel_celular,
        tel_otro: v_tel_otro
    });

}
function addRequeridosRL() {
    var v_cod_empresa = '001';
    var v_num_cliente = '';
    var v_num_repre_legal = '';
    var v_nombre = $("#txtnombre_regperson").val();
    var v_seg_nombre = $("#txtseg_nombre_regperson").val();
    var v_ape_paterno = $("#txtape_paterno_regperson").val();
    var v_ape_materno = $("#txtape_materno_regperson").val();
    var v_tip_repre_legal = $("#ddltip_persona").val();
    var v_rfc = $("#txtrfc_regperson").val();
    var v_curp = $("#txtcurp_regperson").val();
    var v_num_escritura = $("#txtnum_escritura_rpl").val();
    var v_folio_mercantil = $("#txtfolio_mercantil_rpl").val();
    var v_cod_tipo_facultades = $("#txtcod_tipo_facultades_rpl").val();
    var v_cod_ejercimiento = $("#txtcod_ejercimiento_rpl").val();
    var v_cod_usuario = '';
    var v_fec_alta = '';
    var v_estatus = '';
    var v_cod_usuario_modifica = '';
    var v_fec_modificacion = '';
    var v_cod_direccion = '';
    var v_tip_cliente = 'M4';
    var v_tip_direccion = $("#ddltip_direccion_regperson").val();
    var v_calle = $("#txtcalle_regperson").val();
    var v_num_ext = $("#txtnum_ext_regperson").val();
    var v_num_int = $("#txtnum_int_regperson").val();
    var v_cod_estado = $("#ddlcod_estado_regperson").val();
    var v_cp = $("#txtcp_regperson").val();
    var v_cod_municipio = $("#ddlcod_municipio_regperson").val();
    var v_cod_colonia = $("#ddlcod_colonia_regperson").val();
    var v_tel_local = $("#txttel_local_regperson").val();
    var v_tel_celular = $("#txttel_celular_regperson").val();
    var v_tel_otro = $("#txttel_otro_regperson").val();

    var grid = $("#gvRepresentanteLegal").data("kendoGrid");
    grid.dataSource.add({
        cod_empresa: v_cod_empresa,
        num_cliente: v_num_cliente,
        num_repre_legal: v_num_repre_legal,
        nombre: v_nombre,
        seg_nombre: v_seg_nombre,
        ape_paterno: v_ape_paterno,
        ape_materno: v_ape_materno,
        tip_repre_legal: v_tip_repre_legal,
        rfc: v_rfc,
        curp: v_curp,
        num_escritura: v_num_escritura,
        folio_mercantil: v_folio_mercantil,
        cod_tipo_facultades: v_cod_tipo_facultades,
        cod_ejercimiento: v_cod_ejercimiento,
        cod_usuario: v_cod_usuario,
        fec_alta: v_fec_alta,
        estatus: v_estatus,
        cod_usuario_modifica: v_cod_usuario_modifica,
        fec_modificacion: v_fec_modificacion,
        cod_direccion: v_cod_direccion,
        tip_cliente: v_tip_cliente,
        tip_direccion: v_tip_direccion,
        calle: v_calle,
        num_ext: v_num_ext,
        num_int: v_num_int,
        cod_estado: v_cod_estado,
        cp: v_cp,
        cod_municipio: v_cod_municipio,
        cod_colonia: v_cod_colonia,
        tel_local: v_tel_local,
        tel_celular: v_tel_celular,
        tel_otro: v_tel_otro
    });

}
function addRequeridosAV() {
    var v_cod_empresa = '001';
    var v_num_cliente = '';
    var v_num_aval = '';
    var v_nombre = $("#txtnombre_regperson").val();
    var v_seg_nombre = $("#txtseg_nombre_regperson").val();
    var v_ape_paterno = $("#txtape_paterno_regperson").val();
    var v_ape_materno = $("#txtape_materno_regperson").val();
    var v_tip_aval = $("#ddltip_persona").val();
    var v_rfc = $("#txtrfc_regperson").val();
    var v_curp = $("#txtcurp_regperson").val();
    var v_cod_nacionalidad = $("#ddlcod_nacionalidad_acc_ava").val();
    var v_cod_usuario = '';
    var v_fec_alta = '';
    var v_estatus = '';
    var v_cod_usuario_modifica = '';
    var v_fec_modificacion = '';
    var v_cod_direccion = '';
    var v_tip_cliente = 'M2';
    var v_tip_direccion = $("#ddltip_direccion_regperson").val();
    var v_calle = $("#txtcalle_regperson").val();
    var v_num_ext = $("#txtnum_ext_regperson").val();
    var v_num_int = $("#txtnum_int_regperson").val();
    var v_cod_estado = $("#ddlcod_estado_regperson").val();
    var v_cp = $("#txtcp_regperson").val();
    var v_cod_municipio = $("#ddlcod_municipio_regperson").val();
    var v_cod_colonia = $("#ddlcod_colonia_regperson").val();
    var v_tel_local = $("#txttel_local_regperson").val();
    var v_tel_celular = $("#txttel_celular_regperson").val();
    var v_tel_otro = $("#txttel_otro_regperson").val();
    var grid = $("#gvsAval").data("kendoGrid");
    grid.dataSource.add({
        cod_empresa: v_cod_empresa,
        num_cliente: v_num_cliente,
        num_aval: v_num_aval,
        nombre: v_nombre,
        seg_nombre: v_seg_nombre,
        ape_paterno: v_ape_paterno,
        ape_materno: v_ape_materno,
        tip_aval: v_tip_aval,
        rfc: v_rfc,
        curp: v_curp,
        cod_nacionalidad: v_cod_nacionalidad,
        cod_usuario: v_cod_usuario,
        fec_alta: v_fec_alta,
        estatus: v_estatus,
        cod_usuario_modifica: v_cod_usuario_modifica,
        fec_modificacion: v_fec_modificacion,
        cod_direccion: v_cod_direccion,
        tip_cliente: v_tip_cliente,
        tip_direccion: v_tip_direccion,
        calle: v_calle,
        num_ext: v_num_ext,
        num_int: v_num_int,
        cod_estado: v_cod_estado,
        cp: v_cp,
        cod_municipio: v_cod_municipio,
        cod_colonia: v_cod_colonia,
        tel_local: v_tel_local,
        tel_celular: v_tel_celular,
        tel_otro: v_tel_otro
    });

}
function addRequeridosRP() {
    var v_cod_empresa = '001';
    var v_num_cliente = '';
    var v_num_resp_pago = '';
    var v_nombre = $("#txtnombre_regperson").val();
    var v_seg_nombre = $("#txtseg_nombre_regperson").val();
    var v_ape_paterno = $("#txtape_paterno_regperson").val();
    var v_ape_materno = $("#txtape_materno_regperson").val();
    var v_tip_resp_pago = $("#ddltip_persona").val();
    var v_rfc = $("#txtrfc_regperson").val();
    var v_curp = $("#txtcurp_regperson").val();
    var v_puesto = $("#txtpuesto_rp").val();
    var v_correo_electronico = $("#txtcorreo_electronico_rp").val();
    var v_cod_usuario = '';
    var v_fec_alta = '';
    var v_estatus = '';
    var v_cod_usuario_modifica = '';
    var v_fec_modificacion = '';
    var v_cod_direccion = '';
    var v_tip_cliente = 'M5';
    var v_tip_direccion = $("#ddltip_direccion_regperson").val();
    var v_calle = $("#txtcalle_regperson").val();
    var v_num_ext = $("#txtnum_ext_regperson").val();
    var v_num_int = $("#txtnum_int_regperson").val();
    var v_cod_estado = $("#ddlcod_estado_regperson").val();
    var v_cp = $("#txtcp_regperson").val();
    var v_cod_municipio = $("#ddlcod_municipio_regperson").val();
    var v_cod_colonia = $("#ddlcod_colonia_regperson").val();
    var v_tel_local = $("#txttel_local_regperson").val();
    var v_tel_celular = $("#txttel_celular_regperson").val();
    var v_tel_otro = $("#txttel_otro_regperson").val();

    var grid = $("#gvsResponsablePago").data("kendoGrid");
    grid.dataSource.add({
        cod_empresa: v_cod_empresa,
        num_cliente: v_num_cliente,
        num_resp_pago: v_num_resp_pago,
        nombre: v_nombre,
        seg_nombre: v_seg_nombre,
        ape_paterno: v_ape_paterno,
        ape_materno: v_ape_materno,
        tip_resp_pago: v_tip_resp_pago,
        rfc: v_rfc,
        curp: v_curp,
        puesto: v_puesto,
        correo_electronico: v_correo_electronico,
        cod_usuario: v_cod_usuario,
        fec_alta: v_fec_alta,
        estatus: v_estatus,
        cod_usuario_modifica: v_cod_usuario_modifica,
        fec_modificacion: v_fec_modificacion,
        cod_direccion: v_cod_direccion,
        tip_cliente: v_tip_cliente,
        tip_direccion: v_tip_direccion,
        calle: v_calle,
        num_ext: v_num_ext,
        num_int: v_num_int,
        cod_estado: v_cod_estado,
        cp: v_cp,
        cod_municipio: v_cod_municipio,
        cod_colonia: v_cod_colonia,
        tel_local: v_tel_local,
        tel_celular: v_tel_celular,
        tel_otro: v_tel_otro
    });

}

function updRequeridosAcc() {
    var v_cod_empresa = '001';
    var v_num_cliente = $("#num_cliente").val();
    var v_num_accionista = $("#txtnum_accionista_regperson").val();
    var v_nombre = $("#txtnombre_regperson").val();
    var v_seg_nombre = $("#txtseg_nombre_regperson").val();
    var v_ape_paterno = $("#txtape_paterno_regperson").val();
    var v_ape_materno = $("#txtape_materno_regperson").val();
    var v_tip_accionistas = $("#ddltip_persona").val();
    var v_rfc = $("#txtrfc_regperson").val();
    var v_curp = $("#txtcurp_regperson").val();
    var v_porc_acciones = $("#txtporc_acciones_acc").val();
    var v_importe_capital = $("#txtimporte_capital_acc").val();
    var v_cod_nacionalidad = $("#ddlcod_nacionalidad_acc_ava").val();
    var v_cod_direccion = $("#txtcod_direccion").val();
    var v_tip_cliente = 'M3';
    var v_tip_direccion = $("#ddltip_direccion_regperson").val();
    var v_calle = $("#txtcalle_regperson").val();
    var v_num_ext = $("#txtnum_ext_regperson").val();
    var v_num_int = $("#txtnum_int_regperson").val();
    var v_cod_estado = $("#ddlcod_estado_regperson").val();
    var v_cp = $("#txtcp_regperson").val();
    var v_cod_municipio = $("#ddlcod_municipio_regperson").val();
    var v_cod_colonia = $("#ddlcod_colonia_regperson").val();
    var v_tel_local = $("#txttel_local_regperson").val();
    var v_tel_celular = $("#txttel_celular_regperson").val();
    var v_tel_otro = $("#txttel_otro_regperson").val();

    var url_evento = url_evento = '../Captura/GuardaAccionistas/'

    var datos;
    datos = {
        cod_empresa: v_cod_empresa,
        num_cliente: v_num_cliente,
        num_accionista: v_num_accionista,
        nombre: v_nombre,
        seg_nombre: v_seg_nombre,
        ape_paterno: v_ape_paterno,
        ape_materno: v_ape_materno,
        tip_accionistas: v_tip_accionistas,
        rfc: v_rfc,
        curp: v_curp,
        porc_acciones: v_porc_acciones,
        importe_capital: v_importe_capital,
        cod_nacionalidad: v_cod_nacionalidad,
        cod_direccion: v_cod_direccion,
        tip_cliente: v_tip_cliente,
        tip_direccion: v_tip_direccion,
        calle: v_calle,
        num_ext: v_num_ext,
        num_int: v_num_int,
        cod_estado: v_cod_estado,
        cp: v_cp,
        cod_municipio: v_cod_municipio,
        cod_colonia: v_cod_colonia,
        tel_local: v_tel_local,
        tel_celular: v_tel_celular,
        tel_otro: v_tel_otro
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
                        var grid = $("#gvAccionistas").data("kendoGrid");
                        grid.dataSource.read();
                    }
                }
            }
            else {
                MostrarAlerta("¡Error! ", " Error: Script, No recupero información del proceso", "alert-danger");
            }
        }
    });

}
function updRequeridosRL() {

    var v_cod_empresa = '001';
    var v_num_cliente = $("#num_cliente").val();
    var v_num_repre_legal = $("#txtnum_repre_legal_regperson").val();
    var v_nombre = $("#txtnombre_regperson").val();
    var v_seg_nombre = $("#txtseg_nombre_regperson").val();
    var v_ape_paterno = $("#txtape_paterno_regperson").val();
    var v_ape_materno = $("#txtape_materno_regperson").val();
    var v_tip_repre_legal = $("#ddltip_persona").val();
    var v_rfc = $("#txtrfc_regperson").val();
    var v_curp = $("#txtcurp_regperson").val();
    var v_num_escritura = $("#txtnum_escritura_rpl").val();
    var v_folio_mercantil = $("#txtfolio_mercantil_rpl").val();
    var v_cod_tipo_facultades = $("#txtcod_tipo_facultades_rpl").val();
    var v_cod_ejercimiento = $("#txtcod_ejercimiento_rpl").val();
    var v_cod_direccion = $("#txtcod_direccion").val();
    var v_tip_cliente = 'M4';
    var v_tip_direccion = $("#ddltip_direccion_regperson").val();
    var v_calle = $("#txtcalle_regperson").val();
    var v_num_ext = $("#txtnum_ext_regperson").val();
    var v_num_int = $("#txtnum_int_regperson").val();
    var v_cod_estado = $("#ddlcod_estado_regperson").val();
    var v_cp = $("#txtcp_regperson").val();
    var v_cod_municipio = $("#ddlcod_municipio_regperson").val();
    var v_cod_colonia = $("#ddlcod_colonia_regperson").val();
    var v_tel_local = $("#txttel_local_regperson").val();
    var v_tel_celular = $("#txttel_celular_regperson").val();
    var v_tel_otro = $("#txttel_otro_regperson").val();

    var url_evento = url_evento = '../Captura/GuardaRepresentanteLegal/'
    var datos;
    datos = {
        cod_empresa: v_cod_empresa,
        num_cliente: v_num_cliente,
        num_repre_legal: v_num_repre_legal,
        nombre: v_nombre,
        seg_nombre: v_seg_nombre,
        ape_paterno: v_ape_paterno,
        ape_materno: v_ape_materno,
        tip_repre_legal: v_tip_repre_legal,
        rfc: v_rfc,
        curp: v_curp,
        num_escritura: v_num_escritura,
        folio_mercantil: v_folio_mercantil,
        cod_tipo_facultades: v_cod_tipo_facultades,
        cod_ejercimiento: v_cod_ejercimiento,
        cod_direccion: v_cod_direccion,
        tip_cliente: v_tip_cliente,
        tip_direccion: v_tip_direccion,
        calle: v_calle,
        num_ext: v_num_ext,
        num_int: v_num_int,
        cod_estado: v_cod_estado,
        cp: v_cp,
        cod_municipio: v_cod_municipio,
        cod_colonia: v_cod_colonia,
        tel_local: v_tel_local,
        tel_celular: v_tel_celular,
        tel_otro: v_tel_otro,
    };
    /*Se ejecuta la petición al controlador */

    $.ajax({
        url: url_evento,
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
                        var grid = $("#gvRepresentanteLegal").data("kendoGrid");
                        grid.dataSource.read();
                    }
                }
            }
            else {
                MostrarAlerta("¡Error! ", " Error: Script, No recupero información del proceso", "alert-danger");
            }
        }
    });

}
function updRequeridosAV() {
    var v_cod_empresa = '001';
    var v_num_cliente = $("#num_cliente").val();
    var v_num_aval = $("#txtnum_aval_regperson").val();
    var v_nombre = $("#txtnombre_regperson").val();
    var v_seg_nombre = $("#txtseg_nombre_regperson").val();
    var v_ape_paterno = $("#txtape_paterno_regperson").val();
    var v_ape_materno = $("#txtape_materno_regperson").val();
    var v_tip_aval = $("#ddltip_persona").val();
    var v_rfc = $("#txtrfc_regperson").val();
    var v_curp = $("#txtcurp_regperson").val();
    var v_cod_nacionalidad = $("#ddlcod_nacionalidad_acc_ava").val();
    var v_cod_direccion = $("#txtcod_direccion").val();
    var v_tip_cliente = 'M2';
    var v_tip_direccion = $("#ddltip_direccion_regperson").val();
    var v_calle = $("#txtcalle_regperson").val();
    var v_num_ext = $("#txtnum_ext_regperson").val();
    var v_num_int = $("#txtnum_int_regperson").val();
    var v_cod_estado = $("#ddlcod_estado_regperson").val();
    var v_cp = $("#txtcp_regperson").val();
    var v_cod_municipio = $("#ddlcod_municipio_regperson").val();
    var v_cod_colonia = $("#ddlcod_colonia_regperson").val();
    var v_tel_local = $("#txttel_local_regperson").val();
    var v_tel_celular = $("#txttel_celular_regperson").val();
    var v_tel_otro = $("#txttel_otro_regperson").val();

    var url_evento = url_evento = '../Captura/GuardaAval/'

    var datos;
    datos = {
        cod_empresa: v_cod_empresa,
        num_cliente: v_num_cliente,
        num_aval: v_num_aval,
        nombre: v_nombre,
        seg_nombre: v_seg_nombre,
        ape_paterno: v_ape_paterno,
        ape_materno: v_ape_materno,
        tip_aval: v_tip_aval,
        rfc: v_rfc,
        curp: v_curp,
        cod_nacionalidad: v_cod_nacionalidad,
        cod_direccion: v_cod_direccion,
        tip_cliente: v_tip_cliente,
        tip_direccion: v_tip_direccion,
        calle: v_calle,
        num_ext: v_num_ext,
        num_int: v_num_int,
        cod_estado: v_cod_estado,
        cp: v_cp,
        cod_municipio: v_cod_municipio,
        cod_colonia: v_cod_colonia,
        tel_local: v_tel_local,
        tel_celular: v_tel_celular,
        tel_otro: v_tel_otro
    };

    /*Se ejecuta la petición al controlador */
    $.ajax({
        url: url_evento,
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
                        var grid = $("#gvsAval").data("kendoGrid");
                        grid.dataSource.read();
                    }
                }
            }
            else {
                MostrarAlerta("¡Error! ", " Error: Script, No recupero información del proceso", "alert-danger");
            }
        }
    });
}
function updRequeridosRP() {
    var v_cod_empresa = '001';
    var v_num_cliente = $("#num_cliente").val();
    var v_num_resp_pago = $("#txtnum_resp_pago_regperson").val();
    var v_nombre = $("#txtnombre_regperson").val();
    var v_seg_nombre = $("#txtseg_nombre_regperson").val();
    var v_ape_paterno = $("#txtape_paterno_regperson").val();
    var v_ape_materno = $("#txtape_materno_regperson").val();
    var v_tip_resp_pago = $("#ddltip_persona").val();
    var v_rfc = $("#txtrfc_regperson").val();
    var v_curp = $("#txtcurp_regperson").val();
    var v_puesto = $("#txtpuesto_rp").val();
    var v_correo_electronico = $("#txtcorreo_electronico_rp").val();
    var v_cod_direccion = $("#txtcod_direccion").val();
    var v_tip_cliente = 'M5';
    var v_tip_direccion = $("#ddltip_direccion_regperson").val();
    var v_calle = $("#txtcalle_regperson").val();
    var v_num_ext = $("#txtnum_ext_regperson").val();
    var v_num_int = $("#txtnum_int_regperson").val();
    var v_cod_estado = $("#ddlcod_estado_regperson").val();
    var v_cp = $("#txtcp_regperson").val();
    var v_cod_municipio = $("#ddlcod_municipio_regperson").val();
    var v_cod_colonia = $("#ddlcod_colonia_regperson").val();
    var v_tel_local = $("#txttel_local_regperson").val();
    var v_tel_celular = $("#txttel_celular_regperson").val();
    var v_tel_otro = $("#txttel_otro_regperson").val();

    var url_evento = url_evento = '../Captura/GuardaResponsablePago/'

    var datos;
    datos = {
        cod_empresa: v_cod_empresa,
        num_cliente: v_num_cliente,
        num_resp_pago: v_num_resp_pago,
        nombre: v_nombre,
        seg_nombre: v_seg_nombre,
        ape_paterno: v_ape_paterno,
        ape_materno: v_ape_materno,
        tip_resp_pago: v_tip_resp_pago,
        rfc: v_rfc,
        curp: v_curp,
        puesto: v_puesto,
        correo_electronico: v_correo_electronico,
        cod_direccion: v_cod_direccion,
        tip_cliente: v_tip_cliente,
        tip_direccion: v_tip_direccion,
        calle: v_calle,
        num_ext: v_num_ext,
        num_int: v_num_int,
        cod_estado: v_cod_estado,
        cp: v_cp,
        cod_municipio: v_cod_municipio,
        cod_colonia: v_cod_colonia,
        tel_local: v_tel_local,
        tel_celular: v_tel_celular,
        tel_otro: v_tel_otro
    };

    /*Se ejecuta la petición al controlador */

    $.ajax({
        url: url_evento,
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
                        var grid = $("#gvsResponsablePago").data("kendoGrid");
                        grid.dataSource.read();
                    }
                }
            }
            else {
                MostrarAlerta("¡Error! ", " Error: Script, No recupero información del proceso", "alert-danger");
            }
        }
    });

}

function delRequeridosAcc(v_cod_empresa, v_num_cliente, v_num_accionista, v_tip_cliente) {
    $.ajax({
        url: '../Captura/DelAccionista/',
        type: 'POST',
        data: {
            cod_empresa: v_cod_empresa,
            num_cliente: v_num_cliente,
            num_accionista: v_num_accionista,
            tip_cliente: v_tip_cliente
        },
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
                        var grid = $("#gvAccionistas").data("kendoGrid");
                        grid.dataSource.read();
                    }
                }
            }
            else {
                MostrarAlerta("¡Error! ", " Error: Script, No recupero información del proceso", "alert-danger");
            }
        }
    });
}
function delRequeridosRL(v_cod_empresa, v_num_cliente, v_num_repre_legal, v_tip_cliente) {
    $.ajax({
        url: '../Captura/DelRepresentanteLegal/',
        type: 'POST',
        data: {
            cod_empresa: v_cod_empresa,
            num_cliente: v_num_cliente,
            num_repre_legal: v_num_repre_legal,
            tip_cliente: v_tip_cliente
        },
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
                        var grid = $("#gvRepresentanteLegal").data("kendoGrid");
                        grid.dataSource.read();
                    }
                }
            }
            else {
                MostrarAlerta("¡Error! ", " Error: Script, No recupero información del proceso", "alert-danger");
            }
        }
    });
}
function delRequeridosAV(v_cod_empresa, v_num_cliente, v_num_aval, v_tip_cliente) {
  $.ajax({
        url: '../Captura/DelAval/',
        type: 'POST',
        data: {
            cod_empresa: v_cod_empresa,
            num_cliente: v_num_cliente,
            num_aval: v_num_aval,
            tip_cliente: v_tip_cliente
        },
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
                        var grid = $("#gvsAval").data("kendoGrid");
                        grid.dataSource.read();
                    }
                }
            }
            else {
                MostrarAlerta("¡Error! ", " Error: Script, No recupero información del proceso", "alert-danger");
            }
        }
    });

}
function delRequeridosRP(v_cod_empresa, v_num_cliente, v_num_resp_pago, v_tip_cliente) {
    $.ajax({
        url: '../Captura/DelResponsablePago/',
        type: 'POST',
        data: {
            cod_empresa: v_cod_empresa,
            num_cliente: v_num_cliente,
            num_resp_pago: v_num_resp_pago,
            tip_cliente: v_tip_cliente
        },
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
                        var grid = $("#gvsResponsablePago").data("kendoGrid");
                        grid.dataSource.read();
                    }
                }
            }
            else {
                MostrarAlerta("¡Error! ", " Error: Script, No recupero información del proceso", "alert-danger");
            }
        }
    });
}