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
    public class Aval: Persona
    {
        [Display(Name = "Número Cliente")]
        public string num_cliente { get; set; }

        [Display(Name = "No. Aval")]
        public string num_aval { get; set; }
        public string tip_aval { get; set; }

        
    }
}