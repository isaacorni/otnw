$(document).ready(function () {
    /*Campos con solo valores de dígitos  y numéricos sin caracteres ¡”#$%&/(())=?¡  Evita que se desencadene el evento enter en las cajas de texto    */
    document.getElementById("nombre").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');

    /*Obliga a introducir solo caracteres en mayúsculas */
    document.getElementById("nombre").setAttribute('onkeyup', 'this.value = this.value.toUpperCase();');

    $('#cod_agencia').prop('disabled', 'disabled');
    $('#tip_cliente').prop('disabled', 'disabled');
    $('#num_credito').prop('disabled', 'disabled');
    $('#ind_estado').prop('disabled', 'disabled');
    $('#num_cliente').prop('disabled', 'disabled');
    $('#nombre').prop('disabled', 'disabled');
    $('#rfc').prop('disabled', 'disabled');
    $('#dias_mora_permitidos').prop('disabled', 'disabled');
    $('#plazo_credito').prop('disabled', 'disabled');
    $('#num_referencia').prop('disabled', 'disabled');
    $('#tip_comision').prop('disabled', 'disabled');
    $('#max_comision').prop('disabled', 'disabled');
    $('#dias_mora_permitidos').prop('disabled', 'disabled');
    $('#tasa_mora').prop('disabled', 'disabled');
    $('#dia_pago').prop('disabled', 'disabled');
    $('#tip_cuota').prop('disabled', 'disabled');
    $('#mon_cuota').prop('disabled', 'disabled');
    $('#tip_calendario').prop('disabled', 'disabled');
    $('#mon_comision').prop('disabled', 'disabled');
    $('#tasa_mensual').prop('disabled', 'disabled');

    $("#fec_apertura").kendoDatePicker({ culture: "es-MX" });
    $("#fec_vencimiento").kendoDatePicker({ culture: "es-MX" });
   
    $('#tip_calendario').val('2');
    $('#divaforo').hide();
    $('#divind_estado').hide();
    $('#divpagos_a_capital').hide();
    $('#divgracia_principal').hide();


    if ($('#num_credito').val() != '') {
        $('#divind_estado').show();
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

    }
    else {
        $('#gracia_principal').val('');
        $('#aforo').val('');
        $('#pagos_a_capital').val('');
    }
    /*Se carga el tipo de crédito dependiendo del producto seleccionado  */
    $('#cod_producto').on('change', function () {
        var p_cod_empresa = '001';
        var p_cod_producto = $("#cod_producto").val();
        var p_tip_credito = 'none';
        var p_estatus = '1';
        $.getJSON('../Captura/ObtieneTipoCredito/' + p_cod_empresa + "/" + p_cod_producto + "/" + p_tip_credito + "/" + p_estatus, function (data) {
            var items = '<option value="">Selecciona Tipo Crédito...</option>';
            $.each(data, function (i, item) {
                items += "<option value = '" + item.tip_credito + "'>" + item.des_tip_credito + "</option>";
            });
            $("#tip_credito").html(items);

            $("#tip_cuota").val('');
            $('#tip_comision').val('');
            $('#max_comision').val('');
            $("#dias_mora_permitidos").val('');
        });
    });

    $('#tip_credito').on('change', function () {

        $('#pagos_a_capital').val('');
        $('#divpagos_a_capital').hide();

        $('#gracia_principal').val('');
        $('#divgracia_principal').hide();

        $('#aforo').val('');
        $('#divaforo').hide();

        $('#dias_mora_permitidos').val('');

        $("#tip_cuota").val('');
        $('#tip_comision').val('');
        $('#max_comision').val('');
        $("#dias_mora_permitidos").val('');

        var p_cod_empresa = '001';
        var p_cod_producto = $("#cod_producto").val();
        var p_tip_credito = $("#tip_credito").val();
        var p_estatus = '1';
        $.getJSON('../Captura/ObtieneTipoCredito/' + p_cod_empresa + "/" + p_cod_producto + "/" + p_tip_credito + "/" + p_estatus, function (data) {
            $.each(data, function (i, item) {
                $('#tip_comision').val(item.tip_comision);
                $('#max_comision').val(item.max_comision);
                $('#tip_cuota').val(item.tip_cuota);
                $('#dias_mora_permitidos').val(item.dias_mora_permitidos);
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
    });

    $('#per_cuota').on('change', function () {
        Cal_plazo_fec_vencimiento();
    });

    $('#num_cuotas').on('change', function () {
        Cal_plazo_fec_vencimiento();
        cal_monto_cuota();
    });

    $('#fec_apertura').on('change', function () {
        Cal_plazo_fec_vencimiento();
    });

    $('#tasa_anual').on('change', function () {
        if (this.value == "") {
            $("#tasa_mora").val("");
            $("#tasa_mensual").val("");
        }
        else {
            var Doble = $("#tasa_anual").val() * 2;
            $("#tasa_mora").val(Doble);
            $("#tasa_mensual").val(parseFloat(parseFloat($("#tasa_anual").val()) / 12).toFixed(2));
            cal_monto_cuota();
        }
    });

    $('#mon_solicitado').on('change', function () {
        cal_monto_cuota();
        cal_mon_comision();
    });

    $('#por_comision').on('change', function () {
        cal_mon_comision();
    });
   

    $("#btnGuardar").click(function () {
        /*Recuperación de la información necesaria*/
        var p_cod_empresa = '001';
        var p_tip_cliente = $('#tip_cliente').val();
        var p_num_cliente = ($('#num_cliente').val() == '') ? 0 : $('#num_cliente').val();
        var p_num_credito = $('#num_credito').val();
        var p_mon_comision = $('#mon_comision').val();
        var p_tasa_anual = $('#tasa_anual').val();
        var p_tasa_mora = $('#tasa_mora').val();
        var p_plazo_credito = $('#plazo_credito').val();
        var p_per_cuota = $('#per_cuota').val();
        var p_mon_solicitado = $('#mon_solicitado').val();
        var p_fec_apertura = $('#fec_apertura').val();
        var p_aforo = ($('#aforo').val() == '') ? 0 : $('#aforo').val();
        var p_dia_pago = $('#dia_pago').val();
        var p_por_iva = ($('#por_iva').val() == '') ? 0 : $('#por_iva').val();
        var p_cod_producto = $('#cod_producto').val();
        var p_tip_credito = $('#tip_credito').val();
        var p_pagos_a_capital = ($('#pagos_a_capital').val() == '') ? 0 : $('#pagos_a_capital').val();
        var p_gracia_principal = ($('#gracia_principal').val() == '') ? 0 : $('#gracia_principal').val();
        var p_dias_mora_permitidos = ($('#dias_mora_permitidos').val() == '') ? 0 : $('#dias_mora_permitidos').val();
        var p_num_cuotas = $('#num_cuotas').val();
        var p_fec_vencimiento = $('#fec_vencimiento').val();
        var p_tip_calendario = $('#tip_calendario').val();
        var p_tip_cob_comision = $('#tip_cob_comision').val();
        var p_max_comision = $('#max_comision').val();
        var p_por_comision = $('#por_comision').val();
        var p_tip_cuota = $('#tip_cuota').val();
        var p_mon_cuota = $('#mon_cuota').val();

        /*
            Validando el número de plazo_creditos entre el pago capital si el resultado es  entero es posible realizar el 
            pago esto aplica para el crédito Modelo Ballon 
        */
        if (p_tip_credito == 'MB') {
            var plazo_creditoEntrePagos = esEntero(p_plazo_credito / p_pagos_a_capital);
            if (!plazo_creditoEntrePagos) {
                $('#pagos_a_capital').val('');
                MostrarAlerta("¡Información! ", " Pagos a Capital Erroneo, NO es Posible Realizar el Número de Pagos a ese plazo", "alert-info");
                return;
            }
        }
        /*Validación del máximo valor permitido para cobrar la comisión */
        if (parseFloat(p_por_comision) > parseFloat(p_max_comision)) {
            MostrarAlerta("¡Advertencia! ", " La comisión por apertura no puede ser superior al tope de la comisión ", "alert-warning");
            return;
        }
        if (p_num_credito == '') {
            /*insertar  Variable que contiene la información del POST*/
            var datos = {
                "cod_empresa": p_cod_empresa,                                
                "num_cliente": p_num_cliente,                              
                "tip_cliente": p_tip_cliente,                               
                "cod_producto": p_cod_producto,                             
                "tip_credito": p_tip_credito,                               
                "mon_comision": p_mon_comision,                             
                "tasa_anual": p_tasa_anual,                                 
                "tasa_mora": p_tasa_mora,                                   
                "plazo_credito": p_plazo_credito,                           
                "per_cuota": p_per_cuota,                                   
                "num_cuotas": p_num_cuotas,                                 
                "mon_solicitado": p_mon_solicitado,                         
                "fec_solicitud": p_fec_apertura,                            
                "por_iva": p_por_iva,                                       
                "aforo": p_aforo,                                           
                "pagos_a_capital": p_pagos_a_capital,                       
                "gracia_principal": p_gracia_principal,                     
                "dia_pago": p_dia_pago,                                     
                "dias_mora_permitidos": p_dias_mora_permitidos,             
                "fec_vencimiento": p_fec_vencimiento,                       
                "tip_calendario": p_tip_calendario,                         
                "tip_cob_comision": p_tip_cob_comision,                     
                "por_comision": p_por_comision,                             
                "tip_cuota": p_tip_cuota,                                    
                "mon_cuota": p_mon_cuota
                
            };
            $.ajax({
                url: '../Creditos/InsertarCredito/',
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

                                $("#num_credito").val(data[i]["des_realizado"].substring(data[i]["des_realizado"].lastIndexOf('[') + 1, data[i]["des_realizado"].lastIndexOf(']')));
                                ///Cuando el crédito se capturo de forma correcta se recarga la pantalla para habilitar la opción de actualizar  
                                setTimeout(function () {
                                    var url = '../Creditos/ActualizaCredito';
                                    var form = $('<form action="' + url + '" method="post">' +
                                      '<input type="text" name="p_cod_empresa" value="001"   style = "width:1px;" />' +
                                      '<input type="text" name="p_num_cliente" value="' + p_num_cliente + '"   style = "width:1px;" />' +
                                      '<input type="text" name="p_num_credito" value="' + $('#num_credito').val() + '"   style = "width:1px;" />' +
                                      '</form>');
                                    $('body').append(form);
                                    form.submit();
                                }, 3000);
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
            /*Variable que contiene la información del POST*/
            var datos = {
                "cod_empresa": p_cod_empresa,
                "num_cliente": p_num_cliente,
                "tip_cliente": p_tip_cliente,
                "num_credito": p_num_credito,
                "cod_producto": p_cod_producto,
                "tip_credito": p_tip_credito,
                "mon_comision": p_mon_comision,
                "tasa_anual": p_tasa_anual,
                "tasa_mora": p_tasa_mora,
                "plazo_credito": p_plazo_credito,
                "per_cuota": p_per_cuota,
                "num_cuotas": p_num_cuotas,
                "mon_solicitado": p_mon_solicitado,
                "fec_solicitud": p_fec_apertura,
                "fec_apertura": p_fec_apertura,
                "por_iva": p_por_iva,
                "aforo": p_aforo,
                "pagos_a_capital": p_pagos_a_capital,
                "gracia_principal": p_gracia_principal,
                "dia_pago": p_dia_pago,
                "dias_mora_permitidos": p_dias_mora_permitidos,
                "tip_calendario": p_tip_calendario,
                "tip_cob_comision": p_tip_cob_comision,
                "fec_vencimiento": p_fec_vencimiento,
                "tip_calendario": p_tip_calendario,
                "tip_cob_comision": p_tip_cob_comision,
                "por_comision": p_por_comision,
                "tip_cuota": p_tip_cuota,
                "mon_cuota": p_mon_cuota
            };
            $.ajax({
                url: '../Creditos/ActualizarCredito/',
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
                                $("#num_credito").val(data[i]["des_realizado"].substring(data[i]["des_realizado"].lastIndexOf('[') + 1, data[i]["des_realizado"].lastIndexOf(']')));
                            }
                        }
                    }
                    else {
                        MostrarAlerta("¡Error! ", " Error: Script, No recupero información del proceso", "alert-danger");
                    }
                }
            });
        }
        /*<<<<<<<<<<<<<<<<<<<<<<<<<<Termina evento de guardado >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

    });
});

/*Función que retorna si el número que recibe como parámetro es entero */
function esEntero(numero) {
    if (numero % 1 == 0) {
        return true;
    } else {
        return false;
    }
}

///Calculo del plazo en días y determina la fecha de vencimiento  el crédito
function Cal_plazo_fec_vencimiento() {
    $('#plazo_credito').val('');
    //$("#fec_vencimiento").val('');
    $("#dia_pago").val('');
    var p_fec_apertura = $("#fec_apertura").val();
    var p_cod_producto = $("#per_cuota").val();
    var p_num_cuotas = $("#num_cuotas").val();
    if (p_cod_producto != '' && p_num_cuotas != '') {
        var Numdias = 0;
        switch (p_cod_producto) {
            case 'ME':      //=>Mensual
                Numdias = p_num_cuotas * 30;
                break;
            case 'QU':     // =>Quincenal
                Numdias = p_num_cuotas * 15;
                break;
            case 'SM':   //=>Semanal
                Numdias = p_num_cuotas * 7;
                break;
            case 'BS':   // =>Catorcenal
                Numdias = p_num_cuotas * 14;
                break;
        }
        $("#plazo_credito").val(Numdias);

        if (p_fec_apertura != '') {
            var arregloDeCadenas = p_fec_apertura.split('/');
            $("#dia_pago").val(arregloDeCadenas[0]);
        }
    }
}

///Calculo de monto de la cuota 
function cal_monto_cuota() {
    var v_num_cuotas = $("#num_cuotas").val();
    var v_mon_solicitado = $("#mon_solicitado").val();
    var v_tasa_anual = $("#tasa_anual").val();
    if (v_mon_solicitado != '' && v_tasa_anual != '' && v_num_cuotas != '') {
        //parseFloat( ).toFixed(2)
        var intereses_sin_iva = parseFloat(v_mon_solicitado).toFixed(2) * (parseFloat(v_tasa_anual).toFixed(2) / 360) * (360 / 100);
        var v_iva = intereses_sin_iva * (0.16);
        var v_sumas = parseFloat(v_mon_solicitado).toFixed(2) + parseFloat(intereses_sin_iva).toFixed(2) + parseFloat(v_iva).toFixed(2);
        var v_mon_cuota = parseFloat(v_sumas).toFixed(2) / parseFloat(v_num_cuotas).toFixed(2);
        $("#mon_cuota").val(parseFloat(v_mon_cuota).toFixed(2));
    }
    else { $("#mon_cuota").val(''); }
}

///Calculo de monto de la cuota 
function cal_mon_comision() {
    var v_por_comision = $("#por_comision").val();
    var v_mon_solicitado = $("#mon_solicitado").val();
    if (v_mon_solicitado != '' && v_por_comision != '') {
        //parseFloat( ).toFixed(2)
        var v_mon_comision = parseFloat(v_mon_solicitado).toFixed(2) * (parseFloat(v_por_comision).toFixed(2)/100);
        $("#mon_comision").val(parseFloat(v_mon_comision).toFixed(2));
}
    else { $("#mon_comision").val(''); }
}