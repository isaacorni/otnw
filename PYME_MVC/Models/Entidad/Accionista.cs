using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Web;


namespace PYME_MVC.Models.Entidad
{
    public class Accionista : Persona
    {

        [Display(Name = "Número Cliente")]
        public string num_cliente { get; set; }

        [Display(Name = "No. Accionista")]
        public string num_accionista { get; set; }

        public string tip_accionistas { get; set; }

        [Display(Name = "% Acciones")]
        public string porc_acciones { get; set; }
        [Display(Name = "Importe Capital")]
        public string importe_capital { get; set; } 
    }
}