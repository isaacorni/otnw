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
    public class ReportePlanPagos : Credito
    {
        public new string num_cuota { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<DateTime> fec_inicio { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<DateTime> fec_real_cuota { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<DateTime> fec_ult_pago_mora { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<DateTime> fec_prorroga { get; set; }
        public string mon_capital { get; set; }
        public string mon_int { get; set; }
        public string mon_iva { get; set; }
        public string sal_capital { get; set; }
        public string sal_int { get; set; }
        public string sal_iva { get; set; }
        public string sal_comision { get; set; }
        public string sal_credito { get; set; }
        public string tasa_int { get; set; }
        public string dia_int { get; set; }
        public string per_comision { get; set; }
        public string mon_mora { get; set; }
        public string dias_mora { get; set; }
        public bool cuota_activa { get; set; }
        public string cod_agencia { get; set; }
        public string nombre { get; set; }
        public string num_acta { get; set; }
        

        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<DateTime> fec_constitucion { get; set; }
        public string rfc { get; set; }
        public string correo_electronico { get; set; }
        public string cod_direccion { get; set; }
        public string des_dir { get; set; }
        public string cod_estado { get; set; }
        public string cod_municipio { get; set; }
        public string cod_colonia { get; set; }
        public string tel_local { get; set; }
        public string tel_celular { get; set; }
        public string tel_otro { get; set; }
        public string int_credito { get; set; }
        public string mon_a_pagar { get; set; }
        public string nom_estado { get; set; }
        public string abr_estado { get; set; }
        public string des_municipio { get; set; }
        public string des_asent { get; set; }
        public string tasa_mensual { get; set; }
 

    }
}