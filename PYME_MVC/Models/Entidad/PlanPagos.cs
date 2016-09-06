using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
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
    public class PlanPagos : Credito
    {
        //[JsonConverter(typeof(StringEnumConverter))]
        public new int num_cuota { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<DateTime> fec_cuota { get; set; }
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
    }
}