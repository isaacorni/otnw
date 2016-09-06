using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Web;


namespace PYME_MVC.Models.Entidad
{
    public class SolicitudCredito : Credito
    {
        [Required(ErrorMessage = "Favor de capturar comentario en observaciones")]
        [Display(Name = "Observaciones del  Crédito")]
        public string observacion { get; set; }

        [Required(ErrorMessage = "Favor de capturar el monto aprobado para el crédito")]
        [Display(Name = "Monto aprobado")]
        public new  string mon_aprobado { get; set; }

        public static SolicitudCredito operator *(SolicitudCredito solicitud, Credito credito)
        {
            solicitud.cod_empresa = credito.cod_empresa;
            solicitud.cod_agencia = credito.cod_agencia;
            solicitud.num_credito = credito.num_credito;
            solicitud.num_cliente = credito.num_cliente;
            solicitud.tip_cliente = credito.tip_cliente;
            solicitud.tip_credito = credito.tip_credito;
            solicitud.mon_comision = credito.mon_comision;
            solicitud.por_comision = credito.por_comision;
            solicitud.tasa_anual = credito.tasa_anual;
            solicitud.tasa_mensual = credito.tasa_mensual;
            solicitud.tasa_mora = credito.tasa_mora;
            solicitud.plazo_credito = credito.plazo_credito;
            solicitud.per_cuota = credito.per_cuota;
            solicitud.num_cuotas = credito.num_cuotas;
            solicitud.mon_solicitado = credito.mon_solicitado;
            solicitud.fec_solicitud = credito.fec_solicitud;
            solicitud.fec_apertura = credito.fec_apertura;
            solicitud.fec_vencimiento = credito.fec_vencimiento;
            solicitud.por_iva = credito.por_iva;
            solicitud.aforo = credito.aforo;
            solicitud.pagos_a_capital = credito.pagos_a_capital;
            solicitud.gracia_principal = credito.gracia_principal;
            solicitud.dia_pago = credito.dia_pago;
            solicitud.dias_mora_permitidos = credito.dias_mora_permitidos;
            solicitud.cod_usuario_reg = credito.cod_usuario_reg;
            solicitud.num_referencia = credito.num_referencia;
            solicitud.nombre = credito.nombre;
            solicitud.rfc = credito.rfc;
            solicitud.correo_electronico = credito.correo_electronico;
            solicitud.ind_estado = credito.ind_estado;
            solicitud.num_ciclo = credito.num_ciclo;
            solicitud.mom_aprobado = credito.mom_aprobado;
            solicitud.mon_desembolsado = credito.mon_desembolsado;
            solicitud.mon_saldo = credito.mon_saldo;
            solicitud.mon_cuota = credito.mon_cuota;
            solicitud.mon_mora_acumulada = credito.mon_mora_acumulada;
            solicitud.fec_cancelacion = credito.fec_cancelacion;
            solicitud.fec_aprobacion = credito.fec_aprobacion;
            solicitud.cod_usuario_aprueba = credito.cod_usuario_aprueba;
            solicitud.fec_alta = credito.fec_alta;
            solicitud.cod_usuario_modifica = credito.cod_usuario_modifica;
            solicitud.fec_ult_modificacion = credito.fec_ult_modificacion;
            solicitud.cod_producto = credito.cod_producto;
            solicitud.nom_producto = credito.nom_producto;
            solicitud.clave_prod = credito.clave_prod;
            solicitud.des_tip_credito = credito.des_tip_credito;
            solicitud.des_estado = credito.des_estado;
            solicitud.tip_cuota = credito.tip_cuota;
            solicitud.mon_credito = credito.mon_credito;
            solicitud.tip_calendario = credito.tip_calendario;
            solicitud.tip_cob_comision = credito.tip_cob_comision;
            solicitud.tip_comision = credito.tip_comision;
            solicitud.max_comision = credito.max_comision;
            solicitud.mon_aprobado = credito.mon_aprobado;
            solicitud.num_cuota = credito.num_cuota;
             
            return solicitud;
        }
    }
}