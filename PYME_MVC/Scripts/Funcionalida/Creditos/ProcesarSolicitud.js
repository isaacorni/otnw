$(document).ready(function () {
    /*Campos con solo valores de dígitos  y numéricos sin caracteres ¡”#$%&/(())=?¡  Evita que se desencadene el evento enter en las cajas de texto    */
    document.getElementById("observacion").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    /*Obliga a introducir solo caracteres en mayúsculas */
    document.getElementById("observacion").setAttribute('onkeyup', 'this.value = this.value.toUpperCase();');

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
    $('#divpagos_a_capital').hide();
    $('#divgracia_principal').hide();
    $('#divaforo').hide();
 
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
    $("#btnGuardar").click(function () {
        /*Recuperación de la información necesaria*/
        var p_cod_empresa = '001';
        var p_num_credito = $('#num_credito').val();
        var p_ind_estado = $('#ind_estado').val();
        var p_observacion = $('#observacion').val();
        var p_mon_aprobado = $('#mon_aprobado').val();

        var continuar = true;
        if (p_observacion == '') {
            MostrarAlerta("¡Información! ", " Favor de capturar comentario en observaciones ", "alert-info");
            continuar = false;
        }
        if (p_mon_aprobado == '' && p_ind_estado == 'A') {
            MostrarAlerta("¡Información! ", " Favor de capturar el monto aprobado para el crédito ", "alert-info");
            continuar = false;
        }

        if (!continuar)
        {
            return;
        }
        /*Validación del máximo valor permitido para cobrar la comisión */
        if (parseFloat(p_mon_aprobado) > parseFloat($('#mon_solicitado').val())) {
            MostrarAlerta("¡Advertencia! ", " El monto aprobado no puede ser mayor que el monto solicitado ", "alert-warning");
            return;
        }

            /*insertar  Variable que contiene la información del POST*/
            var datos = {
                "cod_empresa": p_cod_empresa,
                "num_credito": p_num_credito,
                "ind_estado": p_ind_estado,
                "observacion": p_observacion,
                "mon_aprobado": p_mon_aprobado
                
            };
            $.ajax({
                url: '../Creditos/CreditosCambioEstatus/',
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
                                /*Cuando el crédito ha cambiado a estatus  aprobado se redirige al cliente a generar la tabla de amortización  
                                en caso de que sea rechazado solo se bloquean los controles para que no se pueda editar */
                                if (p_ind_estado == 'A') {
                                    $('#ind_estado').prop('disabled', 'disabled');
                                    $('#observacion').prop('disabled', 'disabled');
                                    $('#mon_aprobado').prop('disabled', 'disabled');
                                    $('#btnGuardar').prop('disabled', 'disabled');
                                    var url = '';
                                    if ($('#tip_credito').val() == 'MB' || $('#tip_credito').val() == 'MGSI') {
                                        url = '../Creditos/SeleccionCuotasPlanPagos';
                                    } else {
                                        url = '../Creditos/CalculaPlanPago';
                                    }

                                    setTimeout(function () {

                                        var form = $('<form action="' + url + '" method="post">' +
                                          '<input type="text" name="p_cod_empresa" value="001"   style = "width:1px;" />' +
                                          '<input type="text" name="p_num_cliente" value="' + $('#num_cliente').val() + '"   style = "width:1px;" />' +
                                          '<input type="text" name="p_num_credito" value="' + $('#num_credito').val() + '"   style = "width:1px;" />' +
                                          '</form>');
                                        $('body').append(form);
                                        form.submit();
                                    }, 3000);
                                }
                                else if (p_ind_estado == 'R') {
                                    $('#ind_estado').prop('disabled', 'disabled');
                                    $('#observacion').prop('disabled', 'disabled');
                                    $('#mon_aprobado').prop('disabled', 'disabled');
                                    $('#btnGuardar').prop('disabled', 'disabled');

                                }
                            }
                        }
                    }
                    else {
                        MostrarAlerta("¡Error! ", " Error: Script, No recupero información del proceso", "alert-danger");
                    }
                }
            });
        /*<<<<<<<<<<<<<<<<<<<<<<<<<<Termina evento de guardado >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

    });
});


 