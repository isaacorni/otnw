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
    public class Factura : Credito
    {
        [Required(ErrorMessage = "Favor de capturar comentario en observaciones")]
        [Display(Name = "Observaciones del  Crédito")]
        public string observacion { get; set; }

        [Display(Name = "No. Movimiento")]
        public string num_movimiento { get; set; }

        [Display(Name = "Código de Usuario")]
        public string cod_usuario { get; set; }

        [Display(Name = "Numero de Factura")]
        public string num_factura { get; set; }

        [Required(ErrorMessage = "Favor de indicar el monto aprobado para la factura")]
        [Display(Name = "Monto Aprobado")]
        public string mon_factura_aprobado { get; set; }

        public bool estatus { get; set; }

        [Display(Name = "Id")]
        public string id_factura { get; set; }

        [Display(Name = "Valor de la Factura")]
        public string mon_real_fact { get; set; }

        [Display(Name = "Valor Factura – Aforo ")]
        public string mon_valor_fact { get; set; }

        [Display(Name = "Monto Entregado")]
        public string mon_entregado { get; set; }

        [Display(Name = "Monto a pagar Cliente")]
        public string mon_a_pagar { get; set; }


        [Display(Name = "Monto de Aforo")]
        public string mon_aforo { get; set; }

        [Display(Name = "Monto de IVA")]
        public string mon_iva { get; set; }

        [Display(Name = "Monto de Interés")]
        public string mon_intereses { get; set; }

        [Display(Name = "% de Aforo")]
        public string por_aforo { get; set; }
      
        [Display(Name = "% de Tasa Anual")]
        public string por_tasa_anual { get; set; }
       
        [Display(Name = "% de Tasa Mensual")]
        public string por_tasa_mensual { get; set; }

        [Display(Name = "% de IVA")]
        public string por_iva { get; set; }

        [Required(ErrorMessage = "Favor de indicar la fecha de la factura")]
        [Display(Name = "Fecha de factura")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<DateTime> fec_inicio { get; set; }

        [Required(ErrorMessage = "Favor de indicar la fecha de vencimiento de la factura")]
        [Display(Name = "Fecha de Vencimiento")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public new Nullable<DateTime> fec_vencimiento { get; set; }

        [Required(ErrorMessage = "Favor de indicar la fecha de pagos")]
        [Display(Name = "Fecha de pago")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<DateTime> fec_pago { get; set; }


        [Display(Name = "Fecha de Alta")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public new Nullable<DateTime> fec_alta { get; set; }


        [Display(Name = "Fecha  de Modificación")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<DateTime> fec_modificacion { get; set; }

        [Display(Name = "Día de Interés ")]
        public string dia_int { get; set; }
    }
}