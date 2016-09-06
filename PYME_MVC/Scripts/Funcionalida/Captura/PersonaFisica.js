$(document).ready(function () {
    /*Campos con solo valores de dígitos  y numéricos sin caracteres ¡”#$%&/(())=?¡  Evita que se desencadene el evento enter en las cajas de texto    */
    document.getElementById("nombre").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("seg_nombre").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("ape_paterno").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("ape_materno").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("fec_nacimiento").setAttribute('onkeypress', 'return NoAceptaEnter(this,event);');
    document.getElementById("curp").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("rfc").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("num_id").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("calle").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("num_ext").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("num_int").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("tel_local").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("tel_celular").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("tel_otro").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txtnum_cuenta").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("txtclabe").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');

    /*Obliga a introducir solo caracteres en mayúsculas */
    document.getElementById("nombre").setAttribute('onkeyup', 'this.value = this.value.toUpperCase();');
    document.getElementById("seg_nombre").setAttribute('onkeyup', 'this.value = this.value.toUpperCase();');
    document.getElementById("ape_paterno").setAttribute('onkeyup', 'this.value = this.value.toUpperCase();');
    document.getElementById("ape_materno").setAttribute('onkeyup', 'this.value = this.value.toUpperCase();');
    document.getElementById("edo_civil").setAttribute('onkeyup', 'this.value = this.value.toUpperCase();');
    document.getElementById("rfc").setAttribute('onkeyup', 'this.value = this.value.toUpperCase();');
    document.getElementById("curp").setAttribute('onkeyup', 'this.value = this.value.toUpperCase();');
    document.getElementById("calle").setAttribute('onkeyup', 'this.value = this.value.toUpperCase();');
    document.getElementById("num_ext").setAttribute('onkeyup', 'this.value = this.value.toUpperCase();');
    document.getElementById("num_int").setAttribute('onkeyup', 'this.value = this.value.toUpperCase();');
    document.getElementById("cp").setAttribute('onkeyup', 'this.value = this.value.toUpperCase();');
    document.getElementById("tel_celular").setAttribute('mask', '"(99) 9999-9999?9"');
    document.getElementById("txtnum_cuenta").setAttribute('onkeyup', 'this.value = this.value.toUpperCase();');
    document.getElementById("txtclabe").setAttribute('onkeyup', 'this.value = this.value.toUpperCase();');


    $("#fec_nacimiento").kendoDatePicker({ culture: "es-MX" });
    $("#btnShowModalCuentaBancaria").on("click", ShowModalCuentaBancaria);
    

    /************************************************************************************************
    Autor: Juan Muñoz
    Fecha de creación:: 13 de Julio de 2016
    Descripción:  Se recupera el valor del giro y se extrae solo código de actividad que se encuentra antes de los dos puntos 
    ************************************************************************************************/
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


    var modelClientes = new kendo.data.Model.define({
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

    var num_cliente = ($('#num_cliente').val() == '') ? 0 : $('#num_cliente').val();
    $("#gvCuentasBancarias").kendoGrid({
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        url: '../Busqueda/ObtieneCtaBancarias/001/0/' + num_cliente + '/F/1',
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
          { field: "cod_num_cuenta", title: "Id. Cuenta" },
          { field: "num_cliente", title: "No. Cliente" },
          { field: "cod_banco", title: "Banco" },
          { field: "num_cuenta", title: "No. Cuenta" },
          { field: "clabe", title: "clabe" },
          { template: "<input type='checkbox'    style='height:10px'  #=(banco_pral)?checked ='checked' : '' #  disabled />", title: "Principal " },
          { field: "edit", command: { text: "Editar", click: EditCuentaBancaria }, hidden: true, title: "Editar" },
          { field: "Remover", command: { text: "Remover", click: RemoveCuentaBancaria }, title: "Remover" }
        ]
    });

    if ($("#num_cliente").val() != '') {
        var grid = $("#gvCuentasBancarias").data("kendoGrid");
        grid.showColumn("edit");
    }


    $("#btnGuardar").click(function () {
        var valor_giro = $("#cod_actividad").val();
        /*Se recupera la parte que corresponde a  sub actividad en la cadena compuesta */
        var cod_subactiv_econo = valor_giro.substring(valor_giro.indexOf(':') + 1)
        var displayedData = $("#gvCuentasBancarias").data().kendoGrid.dataSource.view()
        var json_cuentas = JSON.stringify(displayedData);

        if ($("#num_cliente").val() == '') {

            /*Sección dedicada para el almacenamiento de la información    */
            $.ajax({
                url: '../Captura/InsertarPersonaFisica/',
                type: 'POST',
                data: {
                    cod_agencia: $("#cod_agencia").val(),
                    nombre: $("#nombre").val(),
                    seg_nombre: $("#seg_nombre").val(),
                    ape_paterno: $("#ape_paterno").val(),
                    ape_materno: $("#ape_materno").val(),
                    fec_nacimiento: $("#fec_nacimiento").val(),
                    sexo: $("#sexo").val(),
                    edo_civil: $("#edo_civil").val(),
                    cod_nacionalidad: $("#cod_nacionalidad").val(),
                    rfc: $("#rfc").val(),
                    curp: $("#curp").val(),
                    tip_id: $("#tip_id").val(),
                    num_id: $("#num_id").val(),
                    correo_electronico: $("#correo_electronico").val(),
                    cod_actividad: cod_subactiv_econo,
                    cod_sector: $("#cod_sector").val(),
                    tip_direccion: $("#tip_direccion").val(),
                    calle: $("#calle").val(),
                    num_ext: $("#num_ext").val(),
                    num_int: $("#num_int").val(),
                    cp: $("#cp").val(),
                    cod_estado: $("#cod_estado").val(),
                    cod_municipio: $("#cod_municipio").val(),
                    cod_colonia: $("#cod_colonia").val(),
                    tel_local: $("#tel_local").val(),
                    tel_celular: $("#tel_celular").val(),
                    tel_otro: $("#tel_otro").val(),
                    json_cuentas: json_cuentas
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
                                var grid = $("#gvCuentasBancarias").data("kendoGrid");
                                grid.showColumn("edit");
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
            /*Sección dedicada para la Actualizar la información del cliente     */
            $.ajax({
                url: '../Captura/ActualizaPersonaFisica/',
                type: 'POST',
                data: {
                    cod_agencia: $("#cod_agencia").val(),
                    num_cliente: $("#num_cliente").val(),
                    nombre: $("#nombre").val(),
                    seg_nombre: $("#seg_nombre").val(),
                    ape_paterno: $("#ape_paterno").val(),
                    ape_materno: $("#ape_materno").val(),
                    fec_nacimiento: $("#fec_nacimiento").val(),
                    sexo: $("#sexo").val(),
                    edo_civil: $("#edo_civil").val(),
                    cod_nacionalidad: $("#cod_nacionalidad").val(),
                    rfc: $("#rfc").val(),
                    curp: $("#curp").val(),
                    tip_id: $("#tip_id").val(),
                    num_id: $("#num_id").val(),
                    correo_electronico: $("#correo_electronico").val(),
                    cod_actividad: cod_subactiv_econo,
                    cod_sector: $("#cod_sector").val(),
                    tip_direccion: $("#tip_direccion").val(),
                    calle: $("#calle").val(),
                    num_ext: $("#num_ext").val(),
                    num_int: $("#num_int").val(),
                    cp: $("#cp").val(),
                    cod_estado: $("#cod_estado").val(),
                    cod_municipio: $("#cod_municipio").val(),
                    cod_colonia: $("#cod_colonia").val(),
                    tel_local: $("#tel_local").val(),
                    tel_celular: $("#tel_celular").val(),
                    tel_otro: $("#tel_otro").val(),
                    json_cuentas: json_cuentas
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
                                var grid = $("#gvCuentasBancarias").data("kendoGrid");
                                grid.showColumn("edit");
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

  
    });
    ///<<<<<<<<Fin del evento click para guardar >>>>>>>>>>>>>>



    });

/*Asigna la clase de activo  a la sección que se esté editando Solo funciona con los link de siguiente y atrás  que se muestran en la parte inferior derecha */
function fnActivarSeccion(seccion) {
    document.getElementById("liDatosPersonales").className = "";
    document.getElementById("liDireccion").className = "";
    document.getElementById("liDatosBancarios").className = "";
    switch (seccion) {
        case 'liDatosPersonales':
            document.getElementById("liDatosPersonales").className = "active";

            break;
        case 'liDireccion':
            document.getElementById("liDireccion").className = "active";
            break;
        case 'liDatosBancarios':
            document.getElementById("liDatosBancarios").className = "active";
            break;
    }
}

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
            
            var datos ;

            if (v_cod_num_cuenta != '') {
                /*Actualización de la cuenta */
                datos=   {
                    cod_empresa: '001',
                    cod_num_cuenta: v_cod_num_cuenta,
                    num_cliente: v_num_cliente,
                    num_cuenta: v_num_cuenta,
                    clabe: v_clabe,
                    cod_banco: v_cod_banco,
                    banco_pral: v_banco_pral,
                    tip_cliente: 'F'
                }   ;

            } else {
                /*Alta de la cuenta */
                
                datos=   {
                    cod_empresa: '001',
                    num_cliente: v_num_cliente,
                    num_cuenta: v_num_cuenta,
                    clabe: v_clabe,
                    cod_banco: v_cod_banco,
                    banco_pral: v_banco_pral,
                    tip_cliente: 'F'

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