$(document).ready(function () {
    /*Campos con solo valores de dígitos  y numéricos sin caracteres ¡”#$%&/(())=?¡  Evita que se desencadene el evento enter en las cajas de texto    */
    document.getElementById("num_credito").setAttribute('onkeypress', 'return SoloAlfanumerico(this,event);');
    document.getElementById("num_credito").setAttribute('onkeyup', 'this.value = this.value.toUpperCase();');
});
$("#btnGererar").click(function (e) {
    var p_num_credito = $("#num_credito").val();
    if (p_num_credito != '') {
        var url = '../Reportes/PlanPagosReporte';
        var form = $('<form action="' + url + '" method="post">' +
          '<input type="text" name="p_cod_empresa" value="001"   style = "width:1px;" />' +
          '<input type="text" name="p_num_credito" value="' + p_num_credito + '"   style = "width:1px;" />' +
          '</form>');
        $('body').append(form);
        form.submit();
    } else {
        MostrarAlerta("¡Información! ", " Favor de introducir un crédito valido para generar el reporte ", "alert-info");
    }
});
  