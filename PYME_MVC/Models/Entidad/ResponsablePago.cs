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
    public class ResponsablePago:Persona
    {
        [Display(Name = "Número Cliente")]
        public string num_cliente { get; set; }

        [Display(Name = "No. Responsable de Pago ")]
        public string num_resp_pago { get; set; }
        public string tip_resp_pago { get; set; }
        
        [Display(Name = "Puesto ")]
        public string puesto { get; set; }

            
    }
}