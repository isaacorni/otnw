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
    public class Credito
    {
        [Display(Name = "Empresa")]
        [DefaultValue("001")]
        public string cod_empresa { get; set; }

        [Display(Name = "No. Agencia")]
        public string cod_agencia { get; set; }

        [Display(Name = "Numero Credito")]
        public string num_credito { get; set; }

        [Required(ErrorMessage = "El número del cliente es obligatorio")]
        [Display(Name = "Numero Cliente")]
        public string num_cliente { get; set; }

        [Required(ErrorMessage = "Favor de indicar el tipo de cliente")]
        [Display(Name = "Tipo de Cliente")]
        public string tip_cliente { get; set; }

        [Required(ErrorMessage = "Favor de indicar el tipo de crédito que se desea generar ")]
        [Display(Name = "Tipo de Crédito")]
        public string tip_credito { get; set; }

        [Required(ErrorMessage = "Favor de indicar el monto de comisión")]
        [Display(Name = "Monto Comisión")]
        public string mon_comision { get; set; }

        [Required(ErrorMessage = "Favor de capturar el porcentaje de la comisión")]
        [Display(Name = "Porcentaje Comisión")]
        public string por_comision { get; set; }

        [Required(ErrorMessage = "Favor de indicar la tasa anual")]
        [Display(Name = "Tasa Anual")]
        public string tasa_anual { get; set; }


        [Display(Name = "Tasa Mensual")]
        public string tasa_mensual { get; set; }


        [Required(ErrorMessage = "Favor de indicar la tasa de mora")]
        [Display(Name = "Tasa de Mora")]
        public string tasa_mora { get; set; }

        [Required(ErrorMessage = "El plazo es un campo obligatorio")]
        [Display(Name = "Plazo")]
        public string plazo_credito { get; set; }

        [Required(ErrorMessage = "Favor de indicar el periodo de cuotas")]
        [Display(Name = "Periodo de Cuotas ")]
        public string per_cuota { get; set; }

        [Required(ErrorMessage = "El número de cuotas es un campo obligatorio ")]
        [Display(Name = "Numero de Cuotas")]
        public string num_cuotas { get; set; }

        [Required(ErrorMessage = "Favor de indicar el monto solicitado")]
        [Display(Name = "Monto Solicitado")]
        public string mon_solicitado { get; set; }

        [Required(ErrorMessage = "Favor de indicar la fecha de solicitud del crédito")]
        [Display(Name = "Fecha de Solicitud")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<DateTime> fec_solicitud { get; set; }


        [Display(Name = "Fecha de Apertura")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<DateTime> fec_apertura { get; set; }


        [Display(Name = "Fecha de Vencimiento")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<DateTime> fec_vencimiento { get; set; }


        [Required(ErrorMessage = "Favor de indicar el valor de IVA ")]
        [Display(Name = "Porcentaje IVA")]
        public string por_iva { get; set; }


        [Display(Name = "Aforo")]
        public string aforo { get; set; }

        [Display(Name = "Pago a Capital")]
        public string pagos_a_capital { get; set; }


        [Display(Name = "Meses de Gracia")]
        public string gracia_principal { get; set; }

        [Required(ErrorMessage = "Favor de indicar los días de pago")]
        [Display(Name = "Día de Pago")]
        public string dia_pago { get; set; }

        [Required(ErrorMessage = "Favor de indicar los días de mora permitidos")]
        [Display(Name = "Días Mora Permitidos")]
        public string dias_mora_permitidos { get; set; }


        public string cod_usuario_reg { get; set; }

        [Display(Name = "Referencia")]
        public string num_referencia { get; set; }


        [Display(Name = "Nombre")]
        public string nombre { get; set; }
        [Display(Name = "RFC")]
        public string rfc { get; set; }
        [Display(Name = "Correo Electrónico")]
        public string correo_electronico { get; set; }


        [Display(Name = "Estatus del Crédito")]
        public string ind_estado { get; set; }


        public string num_ciclo { get; set; }
        public string mom_aprobado { get; set; }
        public string mon_desembolsado { get; set; }
        public string mon_saldo { get; set; }

        [Required(ErrorMessage = "Favor de capturar el monto de la cuota")]
        [Display(Name = "Monto Cuota")]
        public string mon_cuota { get; set; }


        public string mon_mora_acumulada { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<DateTime> fec_cancelacion { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<DateTime> fec_aprobacion { get; set; }
        public string cod_usuario_aprueba { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<DateTime> fec_alta { get; set; }
        public string cod_usuario_modifica { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<DateTime> fec_ult_modificacion { get; set; }

        [Display(Name = "Producto")]
        public string cod_producto { get; set; }
        public string nom_producto { get; set; }
        public string clave_prod { get; set; }
        public string des_tip_credito { get; set; }
        public string des_estado { get; set; }

        [Required(ErrorMessage = "Favor de indicar el tipo de cuota")]
        [Display(Name = "Tipo de Cuota")]
        public int tip_cuota { get; set; }
        /*1 => PRINCIPAL NIVELADA (ALEMAN)
            2 => NIVELADA (FRANCESA)
            3 => MULTIPERIODO
            4 => AL VENCIMIENTO (AMERICANA)
            5 => UN SOLO PAGO
            6 => LIBRE
            7 => GLOBAL*/


        //[Required(ErrorMessage = "Favor de calcular el monto del crédito")]
        [Display(Name = "Monto del Crédito")]
        public string mon_credito { get; set; } //…DEL TIPO DE MON_DESEMBOLSADO

        [Required(ErrorMessage = "Favor de indicar el tipo de calendario para el crédito")]
        [Display(Name = "Tipo de Calendario")]
        public string tip_calendario { get; set; }  ///(1-FINANCIERO=360, 2-NATURAL=365)

        [Required(ErrorMessage = "Favor de indicar el tipo en que se pagara la comisión")]
        [Display(Name = "Cobro de Comisión")]
        public string tip_cob_comision { get; set; }     //(FORMA EN QUE SE VA A COBRAR D=AL DESEMBOLSO,F= FINANCIADO, L=AL LIQUIDAR)

        [Display(Name = "Tipo de Comisión ")]
        public string tip_comision { get; set; }     //(FORMA EN QUE SE VA A COBRAR D=AL DESEMBOLSO,F= FINANCIADO, L=AL LIQUIDAR)

        [Display(Name = "Tope de comisión")]
        public string max_comision { get; set; }

        [Display(Name = "Monto aprobado")]
        public string mon_aprobado { get; set; }

        public string num_cuota { get; set; }
    }
}